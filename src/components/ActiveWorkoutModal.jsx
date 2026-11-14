import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Check,
  Volume2,
  VolumeX,
  Clock,
  Trophy,
  Wind,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon,
  BookOpen,
  Lightbulb,
  Activity,
  ListChecks,
  Maximize2,
  Minimize2,
  Flame,
  Link2,
  Timer,
  TimerOff,
  ChevronRight,
  Dumbbell,
  Sparkles,
  Plus,
  Minus,
  SkipForward
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { MUSCLE_LABELS } from '../data/muscleLabels';
import { isAnimatedGifUrl, isBodyweightEquipment } from '../utils/exerciseImport';
import { calculateSessionVolumeKg } from '../utils/analytics';
import { STORAGE_KEYS, safeReadJson, safeWriteJson } from '../utils/storage';
import {
  buildInitialExerciseSets,
  getEffectiveRestSeconds,
  getSupersetInfoMap,
  isRestTimerEnabledForExercise,
  parseExerciseTargetSeconds
} from '../utils/workoutSets';
import { MediaViewer } from './MediaViewer';
import { MiniBodyMap } from './MiniBodyMap';

const EMPTY_EXERCISES = [];

function getLatestExerciseHistorySets(workoutHistory, exercise) {
  if (!Array.isArray(workoutHistory) || !exercise) return null;
  const candidateKeys = Array.from(new Set([
    exercise.id,
    exercise.sourceId,
    String(exercise.id || '').replace(/-\d{10,}$/, '')
  ].filter(Boolean)));

  for (const session of workoutHistory) {
    if (!session?.loggedSets) continue;
    for (const key of candidateKeys) {
      const sets = session.loggedSets[key];
      if (Array.isArray(sets) && sets.some((s) => s.completed)) {
        return sets;
      }
    }
  }
  return null;
}

function formatPrevSetSummary(prevSet) {
  if (!prevSet) return '-';
  const weight = String(prevSet.weight ?? '').trim();
  const reps = String(prevSet.reps ?? '').trim();
  if (weight && reps) return `${weight}kg × ${reps}`;
  if (weight) return `${weight}kg`;
  if (reps) return `${reps} reps`;
  return '-';
}

function parsePrevString(prevStr = '') {
  const s = String(prevStr || '').trim();
  if (!s || s === '-') return { weight: '', reps: '' };
  const kgRepsMatch = s.match(/^([\d.,]+)\s*kg\s*[×x]\s*([\d.,]+)/i);
  if (kgRepsMatch) {
    return { weight: kgRepsMatch[1], reps: kgRepsMatch[2] };
  }
  const kgOnlyMatch = s.match(/^([\d.,]+)\s*kg$/i);
  if (kgOnlyMatch) {
    return { weight: kgOnlyMatch[1], reps: '' };
  }
  const repsOnlyMatch = s.match(/^([\d.,]+)\s*reps?$/i);
  if (repsOnlyMatch) {
    return { weight: '', reps: repsOnlyMatch[1] };
  }
  return { weight: '', reps: '' };
}

export function ActiveWorkoutModal({
  routine,
  initialIndex = 0,
  workoutHistory = [],
  theme = 'dark',
  onToggleTheme,
  onUpdateRoutine,
  onClose,
  onCompleteWorkout
}) {
  const [localExercises, setLocalExercises] = useState(() => routine?.exercises || EMPTY_EXERCISES);
  const exercises = onUpdateRoutine ? (routine?.exercises || EMPTY_EXERCISES) : localExercises;

  const savedDraft = (() => {
    const draft = safeReadJson(STORAGE_KEYS.ACTIVE_DRAFT, null);
    return draft && draft.routineId === routine?.id ? draft : null;
  })();

  const safeInitialIndex = Math.min(
    Math.max(0, initialIndex > 0 ? initialIndex : (savedDraft?.currentIndex ?? initialIndex)),
    Math.max(0, exercises.length - 1)
  );

  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const initialElapsed = Number.isFinite(savedDraft?.workoutElapsedSeconds)
    ? savedDraft.workoutElapsedSeconds
    : 0;
  const initialElapsedRef = useRef(initialElapsed);
  const [sessionStartTime] = useState(() => Date.now());
  const startedAtRef = useRef(sessionStartTime);
  const elapsedSecondsRef = useRef(initialElapsed);
  const [workoutElapsedSeconds, setWorkoutElapsedSeconds] = useState(initialElapsed);

  // Outline starts collapsed so the live stage remains a calm, spacious 2-column studio view
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isMobileDemoExpanded, setIsMobileDemoExpanded] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideTab, setGuideTab] = useState('cues');
  const [flowNotice, setFlowNotice] = useState(null);

  const currentExercise = exercises[currentIndex] || null;
  const isTimerEnabled = isRestTimerEnabledForExercise(currentExercise);
  const defaultRest = getEffectiveRestSeconds(currentExercise);
  const targetHoldSeconds = parseExerciseTargetSeconds(currentExercise?.defaultReps);

  const [timerMode, setTimerMode] = useState('rest'); // 'rest' | 'work'
  const [restSecondsLeft, setRestSecondsLeft] = useState(defaultRest);
  const [restInitialSeconds, setRestInitialSeconds] = useState(defaultRest);
  const [isResting, setIsResting] = useState(false);
  const restTargetTimestampRef = useRef(null);

  const supersetMap = useMemo(() => getSupersetInfoMap(exercises), [exercises]);
  const currentSuperset = supersetMap.get(currentIndex) || null;

  const [loggedSets, setLoggedSets] = useState(() => {
    const initial = {};
    (routine?.exercises || EMPTY_EXERCISES).forEach((ex) => {
      const draftSets = Array.isArray(savedDraft?.loggedSets?.[ex.id]) ? savedDraft.loggedSets[ex.id] : null;
      const historySets = getLatestExerciseHistorySets(workoutHistory, ex);
      const fallbackPrev = ex.lastRecord ? ex.lastRecord.split('·')[0]?.trim() : '-';

      initial[ex.id] = buildInitialExerciseSets({
        exercise: ex,
        draftSets,
        historySets,
        fallbackPrev,
        parsePrevFn: parsePrevString,
        formatPrevFn: formatPrevSetSummary
      });
    });
    return initial;
  });

  // Persist draft immediately when exercise index or logged sets change
  useEffect(() => {
    if (!routine?.id) return;
    safeWriteJson(STORAGE_KEYS.ACTIVE_DRAFT, {
      routineId: routine.id,
      currentIndex,
      workoutElapsedSeconds: elapsedSecondsRef.current,
      loggedSets,
      updatedAt: new Date().toISOString(),
    });
  }, [routine?.id, currentIndex, loggedSets]);

  // Periodic draft save every 30 seconds to persist running elapsed time without lag
  useEffect(() => {
    if (!routine?.id) return;
    const interval = setInterval(() => {
      safeWriteJson(STORAGE_KEYS.ACTIVE_DRAFT, {
        routineId: routine.id,
        currentIndex,
        workoutElapsedSeconds: elapsedSecondsRef.current,
        loggedSets,
        updatedAt: new Date().toISOString(),
      });
    }, 30000);
    return () => clearInterval(interval);
  }, [routine?.id, currentIndex, loggedSets]);

  const commitExercisesUpdate = useCallback((nextExercises) => {
    setLocalExercises(nextExercises);
    if (onUpdateRoutine && routine) {
      onUpdateRoutine({
        ...routine,
        exercises: nextExercises
      });
    }
  }, [onUpdateRoutine, routine]);

  const goToExercise = useCallback((nextIndex) => {
    if (nextIndex < 0 || nextIndex >= exercises.length) return;
    const nextEx = exercises[nextIndex];
    const nextRest = getEffectiveRestSeconds(nextEx);
    setCurrentIndex(nextIndex);
    setTimerMode('rest');
    setRestInitialSeconds(nextRest);
    setRestSecondsLeft(nextRest);
    setIsResting(false);
    setFlowNotice(null);
    setIsGuideOpen(false);
    setIsMobileDemoExpanded(false);
    setIsQueueOpen(false);
  }, [exercises, setCurrentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < exercises.length - 1) {
      goToExercise(currentIndex + 1);
    }
  }, [currentIndex, exercises.length, goToExercise]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      goToExercise(currentIndex - 1);
    }
  }, [currentIndex, goToExercise]);

  const toggleRestTimer = useCallback(() => {
    if (restSecondsLeft === 0) {
      setRestSecondsLeft(restInitialSeconds);
      restTargetTimestampRef.current = Date.now() + restInitialSeconds * 1000;
      setIsResting(true);
    } else {
      setIsResting((prev) => {
        if (!prev) {
          restTargetTimestampRef.current = Date.now() + restSecondsLeft * 1000;
        } else {
          restTargetTimestampRef.current = null;
        }
        return !prev;
      });
    }
  }, [restSecondsLeft, restInitialSeconds]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const updateElapsed = useCallback(() => {
    const elapsed = initialElapsedRef.current + Math.floor((Date.now() - startedAtRef.current) / 1000);
    elapsedSecondsRef.current = elapsed;
    setWorkoutElapsedSeconds(elapsed);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateElapsed, 1000);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        updateElapsed();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [updateElapsed]);

  useEffect(() => {
    if (!isResting) {
      restTargetTimestampRef.current = null;
      return;
    }

    if (!restTargetTimestampRef.current) {
      restTargetTimestampRef.current = Date.now() + restSecondsLeft * 1000;
    }

    let lastTickSecond = restSecondsLeft;
    const checkRest = () => {
      if (!restTargetTimestampRef.current) return;
      const left = Math.max(0, Math.ceil((restTargetTimestampRef.current - Date.now()) / 1000));
      setRestSecondsLeft(left);
      if (left === 0) {
        setIsResting(false);
        restTargetTimestampRef.current = null;
        if (soundEnabled) sounds.playTimerComplete();
      } else if (left <= 3 && left !== lastTickSecond && soundEnabled) {
        lastTickSecond = left;
        sounds.playTick();
      }
    };

    const interval = setInterval(checkRest, 500);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkRest();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isResting, soundEnabled, restSecondsLeft]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
      if (e.key === 'Escape') {
        if (isGuideOpen) {
          setIsGuideOpen(false);
        } else if (isQueueOpen) {
          setIsQueueOpen(false);
        } else {
          onClose();
        }
      } else if (!isInput && e.key === 'ArrowRight') {
        goToNext();
      } else if (!isInput && e.key === 'ArrowLeft') {
        goToPrev();
      } else if (!isInput && e.code === 'Space' && (isTimerEnabled || targetHoldSeconds)) {
        e.preventDefault();
        toggleRestTimer();
      } else if (!isInput && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault();
        setIsGuideOpen((prev) => !prev);
      } else if (!isInput && (e.key === 'q' || e.key === 'Q')) {
        e.preventDefault();
        setIsQueueOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGuideOpen, isQueueOpen, isTimerEnabled, targetHoldSeconds, onClose, goToNext, goToPrev, toggleRestTimer]);

  if (!currentExercise) {
    return null;
  }

  const resetTimer = (secs = defaultRest, mode = 'rest', autoStart = false) => {
    setTimerMode(mode);
    setRestInitialSeconds(secs);
    setRestSecondsLeft(secs);
    if (autoStart) {
      restTargetTimestampRef.current = Date.now() + secs * 1000;
      setIsResting(true);
    } else {
      restTargetTimestampRef.current = null;
      setIsResting(false);
    }
  };

  const adjustRestTime = (delta) => {
    setRestSecondsLeft((prev) => {
      const next = Math.max(0, prev + delta);
      if (next > restInitialSeconds) {
        setRestInitialSeconds(next);
      }
      if (restTargetTimestampRef.current) {
        restTargetTimestampRef.current = Date.now() + next * 1000;
      }
      return next;
    });
  };

  const toggleExerciseTimerPreference = () => {
    const nextEnabled = !isTimerEnabled;
    const nextExercises = exercises.map((ex, idx) => {
      if (idx !== currentIndex) return ex;
      const nextRestSeconds = nextEnabled
        ? (Number(ex.defaultRestSeconds) > 0 ? Number(ex.defaultRestSeconds) : 60)
        : 0;
      return {
        ...ex,
        timerEnabled: nextEnabled,
        defaultRestSeconds: nextRestSeconds
      };
    });
    commitExercisesUpdate(nextExercises);

    if (nextEnabled) {
      const secs = Number(currentExercise.defaultRestSeconds) > 0 ? Number(currentExercise.defaultRestSeconds) : 60;
      resetTimer(secs, 'rest', false);
    } else {
      setIsResting(false);
    }
  };

  const toggleSetComplete = (setIndex) => {
    const exId = currentExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    if (!currentSets[setIndex]) return;

    const targetSet = { ...currentSets[setIndex], completed: !currentSets[setIndex].completed };
    currentSets[setIndex] = targetSet;

    setLoggedSets((prev) => ({
      ...prev,
      [exId]: currentSets
    }));

    if (targetSet.completed) {
      if (soundEnabled) sounds.playSetComplete();

      const nextSetInExercise = currentSets[setIndex + 1];
      if (nextSetInExercise?.isDropset) {
        setIsResting(false);
        setFlowNotice({
          type: 'dropset',
          text: 'Drop set next — lower weight (~20%) and continue.'
        });
        return;
      }

      if (currentSuperset && !currentSuperset.isLast) {
        const nextPartnerPos = (currentSuperset.position + 1) % currentSuperset.size;
        const nextPartnerIdx = currentSuperset.memberIndices[nextPartnerPos];
        const nextPartnerEx = exercises[nextPartnerIdx];
        if (nextPartnerEx) {
          setIsResting(false);
          setFlowNotice({
            type: 'superset',
            targetIndex: nextPartnerIdx,
            code: `${currentSuperset.letter}${nextPartnerPos + 1}`,
            text: `Superset ${currentSuperset.letter} — continue to ${currentSuperset.letter}${nextPartnerPos + 1} (${nextPartnerEx.name})`
          });
          return;
        }
      }

      setFlowNotice(null);
      if (isTimerEnabled) {
        resetTimer(defaultRest, 'rest', true);
      }
    } else {
      setFlowNotice(null);
    }
  };

  const updateSetInput = (setIndex, field, value) => {
    const exId = currentExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    if (!currentSets[setIndex]) return;

    currentSets[setIndex] = {
      ...currentSets[setIndex],
      [field]: value
    };
    setLoggedSets((prev) => ({
      ...prev,
      [exId]: currentSets
    }));
  };

  const adjustSetReps = (setIndex, delta) => {
    const exId = currentExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    if (!currentSets[setIndex]) return;
    const currentReps = parseInt(currentSets[setIndex].reps, 10) || 0;
    const nextReps = Math.max(1, currentReps + delta);
    updateSetInput(setIndex, 'reps', String(nextReps));
  };

  const adjustSetWeight = (setIndex, delta) => {
    const exId = currentExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    if (!currentSets[setIndex]) return;
    const currentWeight = parseFloat(String(currentSets[setIndex].weight).replace(',', '.')) || 0;
    const nextWeight = Math.max(0, Math.round((currentWeight + delta) * 10) / 10);
    updateSetInput(setIndex, 'weight', nextWeight > 0 ? String(nextWeight) : '');
  };

  const applyPrevToSet = (setIndex) => {
    const exId = currentExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    const target = currentSets[setIndex];
    if (!target) return;
    const parsed = parsePrevString(target.prev);
    const nextWeight = target.prevWeight || parsed.weight;
    const nextReps = target.prevReps || parsed.reps;
    if (!nextWeight && !nextReps) return;

    currentSets[setIndex] = {
      ...target,
      weight: nextWeight || target.weight,
      reps: nextReps || target.reps,
    };
    setLoggedSets((prev) => ({
      ...prev,
      [exId]: currentSets
    }));
  };

  const addSetToExercise = (asDropset = false) => {
    const exId = currentExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    const lastSet = currentSets[currentSets.length - 1];
    const nextNum = currentSets.length + 1;
    const defaultRepTarget = String(currentExercise.defaultReps ?? '10').split('-')[0]?.trim() || '10';
    const suggestedWeight = lastSet?.weight ?? '';

    currentSets.push({
      setNum: nextNum,
      exerciseName: currentExercise.name,
      sourceId: currentExercise.sourceId || currentExercise.id,
      completed: false,
      isDropset: asDropset,
      reps: lastSet?.reps ?? defaultRepTarget,
      weight: suggestedWeight,
      prev: asDropset ? '-' : (lastSet?.prev ?? '-'),
      prevWeight: asDropset ? '' : (lastSet?.prevWeight ?? ''),
      prevReps: asDropset ? '' : (lastSet?.prevReps ?? ''),
    });
    setLoggedSets((prev) => ({
      ...prev,
      [exId]: currentSets
    }));
  };

  const removeLastSetFromExercise = () => {
    const exId = currentExercise.id;
    const currentSets = loggedSets[exId] || [];
    if (currentSets.length <= 1) return;
    setLoggedSets((prev) => ({
      ...prev,
      [exId]: currentSets.slice(0, -1)
    }));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const totalSetsAcrossWorkout = Object.values(loggedSets).reduce(
    (acc, list) => acc + (Array.isArray(list) ? list.length : 0),
    0
  );
  const completedSetsCount = Object.values(loggedSets).flat().filter((s) => s.completed).length;
  const sessionVolumeKg = Math.round(calculateSessionVolumeKg(loggedSets));

  const currentExerciseSets = loggedSets[currentExercise.id] || [];
  const currentCompletedCount = currentExerciseSets.filter((s) => s.completed).length;
  const nextIncompleteSetIndex = currentExerciseSets.findIndex((s) => !s.completed);
  const allCurrentSetsDone = currentExerciseSets.length > 0 && currentCompletedCount === currentExerciseSets.length;

  const isTimedReps = /(?:\d\s*s\b|sec|secondi|\bmin\b)/i.test(String(currentExercise.defaultReps || ''));
  const primaryMuscleName = MUSCLE_LABELS[currentExercise.muscleKey] || currentExercise.muscleKey;
  const execution = currentExercise.execution || {};
  const commonMistakes = Array.isArray(execution.commonMistakes) ? execution.commonMistakes : [];
  const hasAnyImages = Boolean(currentExercise.illustration || currentExercise.illustrationEnd);
  const hasTwoImages = Boolean(currentExercise.illustration && currentExercise.illustrationEnd);
  const hasMedia = hasAnyImages || Boolean(currentExercise.customVideoUrl);
  const prevExercise = currentIndex > 0 ? exercises[currentIndex - 1] : null;
  const nextExercise = currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null;

  const isBodyweightEx =
    currentExercise.requiresEquipment === false ||
    currentExercise.usesEquipment === false ||
    isBodyweightEquipment(currentExercise.equipment || '');

  const timerRatio = restInitialSeconds > 0
    ? Math.min(1, Math.max(0, restSecondsLeft / restInitialSeconds))
    : 0;
  const restPresets = Array.from(new Set([defaultRest, 60, 90, 120])).sort((a, b) => a - b).slice(0, 3);

  const finishPayload = {
    durationSeconds: workoutElapsedSeconds,
    completedSets: completedSetsCount,
    totalSets: totalSetsAcrossWorkout,
    loggedSets
  };

  const warmupQueueItems = [];
  const mainQueueItems = [];
  exercises.forEach((ex, idx) => {
    const entry = { ex, idx, ssInfo: supersetMap.get(idx) || null };
    if (ex.phase === 'warmup' || ex.isWarmup) {
      warmupQueueItems.push(entry);
    } else {
      mainQueueItems.push(entry);
    }
  });

  const renderQueueButton = ({ ex, idx, ssInfo }) => {
    const exSets = loggedSets[ex.id] || [];
    const doneSets = exSets.filter((s) => s.completed).length;
    const isComplete = exSets.length > 0 && doneSets === exSets.length;
    const isCurrent = idx === currentIndex;
    const mLabel = MUSCLE_LABELS[ex.muscleKey] || ex.muscleKey || '';
    const exDrops = exSets.filter((s) => s.isDropset).length;
    const exUntimed = !isRestTimerEnabledForExercise(ex);

    return (
      <button
        key={ex.id || idx}
        type="button"
        className={`player-queue-item ${isCurrent ? 'active' : ''} ${isComplete ? 'done' : ''} ${ssInfo ? 'in-superset' : ''}`}
        onClick={() => goToExercise(idx)}
      >
        <div className="queue-item-thumb">
          {ex.illustration ? (
            <img src={ex.illustration} alt="" loading="lazy" />
          ) : (
            <span>{ssInfo ? ssInfo.code : idx + 1}</span>
          )}
        </div>
        <div className="queue-item-copy">
          <strong>
            {ssInfo && <span className="queue-ss-tag">{ssInfo.code}</span>}
            {ex.name}
          </strong>
          <span>
            {mLabel ? `${mLabel} · ` : ''}{exSets.length} × {ex.defaultReps || '10'}
            {exDrops > 0 ? ' · Drop' : ''}
            {exUntimed ? ' · Untimed' : ''}
          </span>
        </div>
        <span className={`queue-item-status ${isComplete ? 'complete' : ''}`}>
          {isComplete ? <Check size={12} strokeWidth={3} /> : `${doneSets}/${exSets.length}`}
        </span>
      </button>
    );
  };

  const showStickyTimerRow = isTimerEnabled || isResting;

  return (
    <div className="workout-player-overlay">
      {/* Balanced Studio Top Navigation Bar */}
      <header className="player-header">
        <div className="player-header-inner">
          <div className="player-header-left">
            <button
              type="button"
              className="player-icon-btn"
              onClick={onClose}
              title="Close session (Esc)"
              aria-label="Close session"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              className={`player-queue-toggle-btn ${isQueueOpen ? 'open' : ''}`}
              onClick={() => setIsQueueOpen((prev) => !prev)}
              aria-expanded={isQueueOpen}
              title="Workout outline (Q)"
              aria-label="Toggle workout outline"
            >
              <ListChecks size={15} />
              <span className="queue-toggle-label">Outline</span>
              <span className="queue-toggle-count">{currentIndex + 1}/{exercises.length}</span>
            </button>
          </div>

          <div className="player-session-meta">
            <span className="player-routine-name">{routine.shortTitle || routine.title}</span>
            <span className="player-elapsed-clock">
              <Clock size={12} />
              {formatTime(workoutElapsedSeconds)}
            </span>
          </div>

          <div className="player-header-right">
            {sessionVolumeKg > 0 && (
              <span className="player-volume-chip" title="Session tonnage lifted">
                {sessionVolumeKg.toLocaleString()} kg
              </span>
            )}
            {onToggleTheme && (
              <button
                type="button"
                className="player-icon-btn"
                onClick={onToggleTheme}
                title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}
            <button
              type="button"
              className="player-icon-btn"
              onClick={() => setSoundEnabled((prev) => !prev)}
              title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
              aria-label="Audio"
            >
              {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>
            <button
              type="button"
              className="player-finish-btn"
              onClick={() => onCompleteWorkout(finishPayload)}
            >
              <Trophy size={15} />
              <span>Finish</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hairline Segmented Progress Bar */}
      <div className="player-segmented-track" role="navigation" aria-label="Exercise progress">
        {exercises.map((ex, idx) => {
          const exSets = loggedSets[ex.id] || [];
          const isDone = exSets.length > 0 && exSets.every((s) => s.completed);
          const isCurrent = idx === currentIndex;
          const ss = supersetMap.get(idx);
          return (
            <button
              key={ex.id || idx}
              type="button"
              className={`player-segment-pill ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''} ${ss ? 'superset-seg' : ''}`}
              onClick={() => goToExercise(idx)}
              title={`${ss ? `[${ss.code}] ` : `${idx + 1}. `}${ex.name}`}
              aria-label={`Jump to ${ex.name}`}
            />
          );
        })}
      </div>

      {/* Main Focused Studio Stage */}
      <main className="player-main-stage">
        <div className="studio-container">
          {/* Active Superset Switcher (rendered cleanly only when planned) */}
          {currentSuperset && (
            <div className="player-superset-banner">
              <div className="superset-banner-head">
                <div className="superset-banner-title">
                  <Link2 size={14} />
                  <span>{currentSuperset.label.toUpperCase()}</span>
                  <span className="superset-banner-sub">Alternate before resting</span>
                </div>
              </div>
              <div className="superset-partners-strip">
                {currentSuperset.memberIndices.map((mIdx, pos) => {
                  const member = exercises[mIdx];
                  if (!member) return null;
                  const mSets = loggedSets[member.id] || [];
                  const mDone = mSets.filter((s) => s.completed).length;
                  const isMe = mIdx === currentIndex;
                  return (
                    <button
                      key={member.id || mIdx}
                      type="button"
                      className={`superset-partner-pill ${isMe ? 'active' : ''}`}
                      onClick={() => goToExercise(mIdx)}
                    >
                      <span className="partner-code">{currentSuperset.letter}{pos + 1}</span>
                      <span className="partner-name">{member.name}</span>
                      <span className="partner-prog">{mDone}/{mSets.length}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="studio-grid">
            {/* LEFT COLUMN: Serene Visual Showcase + Concise Coach Cue + Guide Button */}
            <section className={`studio-visual-col studio-visual-card ${isMobileDemoExpanded ? 'mobile-demo-open' : ''}`}>
              {hasMedia ? (
                <div className="studio-media-frame">
                  {hasAnyImages && (
                    <div className={`studio-pose-grid ${hasTwoImages ? 'dual' : 'single'}`}>
                      {currentExercise.illustration && (
                        <div className="studio-pose-box">
                          <span className="studio-muscle-overlay-pill">{primaryMuscleName}</span>
                          {currentExercise.isWarmup && <span className="studio-phase-overlay-pill">Warm-Up</span>}
                          {(hasTwoImages || isAnimatedGifUrl(currentExercise.illustration)) && (
                            <span className="studio-pose-tag">
                              {hasTwoImages ? 'Start' : 'GIF'}
                            </span>
                          )}
                          <img
                            src={currentExercise.illustration}
                            alt={`${currentExercise.name} demonstration`}
                            className="studio-pose-img"
                            loading="eager"
                          />
                        </div>
                      )}
                      {currentExercise.illustrationEnd && (
                        <div className="studio-pose-box">
                          <span className="studio-pose-tag highlight">Peak</span>
                          <img
                            src={currentExercise.illustrationEnd}
                            alt={`${currentExercise.name} peak position`}
                            className="studio-pose-img"
                            loading="eager"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {currentExercise.customVideoUrl && (
                    <div className="spotlight-video-wrapper">
                      <MediaViewer
                        src={currentExercise.customVideoUrl}
                        alt={currentExercise.name}
                        className="spotlight-video-frame"
                        autoPlay={false}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="studio-media-placeholder">
                  <Dumbbell size={36} color="var(--faint)" />
                  <span>{primaryMuscleName}</span>
                </div>
              )}

              {/* Integrated Somatic Coaching Anchor (Directly docked under visual media) */}
              <div className="studio-somatic-anchor">
                <div className="somatic-anchor-header">
                  <div className="somatic-anchor-title">
                    <Sparkles size={13} className="somatic-sparkle-icon" />
                    <span>COACHING &amp; SOMATIC CUE</span>
                  </div>
                  {currentExercise.tempo && (
                    <span className="somatic-tempo-badge">Tempo: {currentExercise.tempo}</span>
                  )}
                </div>
                <p className="somatic-anchor-cue">
                  {execution.proTip || execution.setup || 'Maintain tension through full range of motion. Control the eccentric phase.'}
                </p>
                {execution.breathing && (
                  <div className="somatic-breathing-strip">
                    <Wind size={12} />
                    <span><b>Breathe:</b> {execution.breathing}</span>
                  </div>
                )}
                <button
                  type="button"
                  className="somatic-guide-link-btn"
                  onClick={() => setIsGuideOpen(true)}
                >
                  <BookOpen size={13} />
                  <span>Form, Muscles &amp; Biomechanics Guide (G)</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </section>

            {/* RIGHT COLUMN: Unified Studio Console Card */}
            <section className="studio-console-col studio-console-card">
              {/* Exercise Identity Block */}
              <div className="studio-exercise-head">
                <div className="studio-head-main">
                  {hasAnyImages && currentExercise.illustration && (
                    <button
                      type="button"
                      className="player-mobile-thumb-btn"
                      onClick={() => setIsMobileDemoExpanded((prev) => !prev)}
                      title={isMobileDemoExpanded ? 'Hide demo' : 'Show demo'}
                      aria-label="Toggle demonstration image"
                    >
                      <img src={currentExercise.illustration} alt={currentExercise.name} />
                      <span className="mobile-thumb-zoom">
                        {isMobileDemoExpanded ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
                      </span>
                    </button>
                  )}

                  <div className="studio-head-copy">
                    <div className="studio-eyebrow">
                      {currentSuperset && (
                        <span className="studio-eyebrow-ss">{currentSuperset.code}</span>
                      )}
                      <span>{primaryMuscleName}</span>
                      <span>·</span>
                      <span>{currentExercise.equipment || 'Bodyweight'}</span>
                      {currentExercise.rpe && (
                        <>
                          <span>·</span>
                          <span>RPE {currentExercise.rpe}</span>
                        </>
                      )}
                    </div>

                    <h1 className="studio-exercise-title">{currentExercise.name}</h1>

                    <div className="studio-prescription-row">
                      <span className="prescription-pill">
                        <b>{currentExerciseSets.length}</b> sets
                      </span>
                      <span className="prescription-dot">·</span>
                      <span className="prescription-pill">
                        Target <b>{currentExercise.defaultReps || '8-12'}</b>
                      </span>
                      {currentExercise.lastRecord && (
                        <>
                          <span className="prescription-dot">·</span>
                          <span className="prescription-ref">Ref: {currentExercise.lastRecord}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile quick actions (hidden on desktop) */}
                <div className="player-mobile-quick-actions">
                  <div className="mobile-compact-targets">
                    <span>{isTimerEnabled ? <>Rest <b>{defaultRest}s</b></> : 'No timer'}</span>
                  </div>
                  <div className="mobile-quick-btns">
                    {hasMedia && (
                      <button
                        type="button"
                        className={`player-mini-action-btn ${isMobileDemoExpanded ? 'active' : ''}`}
                        onClick={() => setIsMobileDemoExpanded((prev) => !prev)}
                      >
                        {isMobileDemoExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                        <span>{isMobileDemoExpanded ? 'Hide' : 'Demo'}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="player-mini-action-btn guide"
                      onClick={() => setIsGuideOpen(true)}
                    >
                      <BookOpen size={12} />
                      <span>Form</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Clean Contextual 1-Row Rest / Work Timer (expands smoothly only while active!) */}
              {isTimerEnabled || isResting ? (
                <div className={`studio-timer-bar ${isResting ? 'running' : ''} ${timerMode === 'work' ? 'work-mode' : ''}`}>
                  <div className="studio-timer-top">
                    <div className="studio-timer-readout">
                      <span className="studio-timer-label">
                        {isResting
                          ? (timerMode === 'work' ? 'WORK HOLD' : 'RESTING')
                          : (timerMode === 'work' ? 'HOLD TIMER' : 'REST TIMER')}
                      </span>
                      <strong className="studio-timer-clock">{formatTime(restSecondsLeft)}</strong>
                    </div>

                    <div className="studio-timer-actions">
                      {!isResting && targetHoldSeconds && (
                        <button
                          type="button"
                          className={`studio-tbtn hold ${timerMode === 'work' ? 'active' : ''}`}
                          onClick={() => resetTimer(targetHoldSeconds, 'work', true)}
                          title={`Start ${targetHoldSeconds}s hold timer`}
                        >
                          Hold {targetHoldSeconds}s
                        </button>
                      )}
                      {!isResting && restPresets.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`studio-tbtn preset ${timerMode === 'rest' && restInitialSeconds === s ? 'active' : ''}`}
                          onClick={() => resetTimer(s, 'rest', false)}
                        >
                          {s}s
                        </button>
                      ))}
                      {isResting && (
                        <>
                          <button type="button" className="studio-tbtn" onClick={() => adjustRestTime(-15)}>
                            -15s
                          </button>
                          <button type="button" className="studio-tbtn" onClick={() => adjustRestTime(15)}>
                            +15s
                          </button>
                          <button
                            type="button"
                            className="studio-tbtn skip-rest-btn"
                            onClick={() => {
                              setIsResting(false);
                              setRestSecondsLeft(0);
                            }}
                            title="Skip remaining rest"
                          >
                            <SkipForward size={12} />
                            <span>Skip</span>
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        className={`studio-timer-main-btn ${isResting ? 'active' : ''}`}
                        onClick={toggleRestTimer}
                      >
                        {isResting ? (
                          <>
                            <Pause size={13} />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play size={13} fill="currentColor" />
                            <span>{restSecondsLeft === 0 ? 'Restart' : 'Start'}</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="studio-tbtn icon"
                        onClick={() => resetTimer(timerMode === 'work' && targetHoldSeconds ? targetHoldSeconds : defaultRest, timerMode, false)}
                        title="Reset timer"
                        aria-label="Reset timer"
                      >
                        <RotateCcw size={13} />
                      </button>
                      <button
                        type="button"
                        className="player-timer-off-btn studio-tbtn off"
                        onClick={toggleExerciseTimerPreference}
                        title="Turn off timer for this exercise"
                        aria-label="Turn off timer"
                      >
                        <TimerOff size={13} />
                        <span>Off</span>
                      </button>
                    </div>
                  </div>

                  {isResting && (
                    <div className="studio-timer-progress" aria-hidden="true">
                      <span style={{ width: `${Math.round(timerRatio * 100)}%` }} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="player-timer-off-card studio-timer-muted">
                  <div className="timer-off-summary">
                    <TimerOff size={14} />
                    <span>No timer needed for this exercise</span>
                  </div>
                  <div className="timer-off-actions">
                    {targetHoldSeconds && (
                      <button
                        type="button"
                        className="player-timer-enable-btn work"
                        onClick={() => {
                          toggleExerciseTimerPreference();
                          resetTimer(targetHoldSeconds, 'work', true);
                        }}
                      >
                        <Play size={11} fill="currentColor" />
                        <span>Hold {targetHoldSeconds}s</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="player-timer-enable-btn"
                      onClick={toggleExerciseTimerPreference}
                    >
                      <Timer size={13} />
                      <span>Enable Timer</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Focused Set Logger Card */}
              <div className="player-logger-card studio-logger-card">
                <div className="player-logger-header">
                  <div className="logger-title-group">
                    <h3>Sets</h3>
                    <span className={`player-sets-progress ${allCurrentSetsDone ? 'complete' : ''}`}>
                      {currentCompletedCount} / {currentExerciseSets.length} done
                    </span>
                  </div>

                  <div className="studio-logger-tools">
                    <button
                      type="button"
                      className="player-set-adj-btn"
                      onClick={() => addSetToExercise(false)}
                    >
                      + Set
                    </button>
                    {currentExerciseSets.length > 1 && (
                      <button
                        type="button"
                        className="player-set-adj-btn is-subtle"
                        onClick={removeLastSetFromExercise}
                        title="Remove last set"
                      >
                        −
                      </button>
                    )}
                  </div>
                </div>

                {flowNotice && (
                  <div className={`player-flow-notice ${flowNotice.type}`}>
                    <span className="flow-notice-text">{flowNotice.text}</span>
                    {flowNotice.type === 'superset' && Number.isInteger(flowNotice.targetIndex) && (
                      <button
                        type="button"
                        className="flow-notice-cta"
                        onClick={() => goToExercise(flowNotice.targetIndex)}
                      >
                        <span>Go to {flowNotice.code}</span>
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                )}

                <div className="player-sets-col-heads" aria-hidden="true">
                  <span>SET</span>
                  <span>PREV</span>
                  <span>{isTimedReps ? 'SEC' : 'REPS'}</span>
                  <span>{isBodyweightEx ? '+KG' : 'KG'}</span>
                  <span>DONE</span>
                </div>

                <div className="player-sets-list">
                  {currentExerciseSets.map((set, sIdx) => {
                    const hasPrevData = set.prev && set.prev !== '-';
                    const isNextUp = sIdx === nextIncompleteSetIndex;
                    return (
                      <div
                        key={set.setNum}
                        className={`player-set-row ${set.completed ? 'completed' : ''} ${set.isDropset ? 'is-dropset' : ''} ${isNextUp ? 'next-up' : ''}`}
                      >
                        <span
                          className={`set-num-tag ${set.isDropset ? 'drop' : ''}`}
                          title={set.isDropset ? 'Planned Drop Set' : `Set #${set.setNum}`}
                        >
                          {set.isDropset ? 'DROP' : `${set.setNum}`}
                        </span>

                        {hasPrevData ? (
                          <button
                            type="button"
                            className="set-prev-copy-btn"
                            onClick={() => applyPrevToSet(sIdx)}
                            title={`Copy previous (${set.prev})`}
                          >
                            {set.prev}
                          </button>
                        ) : (
                          <span className="set-prev-empty">—</span>
                        )}

                        <div className="set-stepper-field reps-field">
                          <button
                            type="button"
                            className="set-stepper-btn minus"
                            onClick={() => adjustSetReps(sIdx, -1)}
                            aria-label={`Decrease reps for set ${set.setNum}`}
                          >
                            <Minus size={12} strokeWidth={2.5} />
                          </button>
                          <label className="set-stepper-input-wrap">
                            <input
                              type="text"
                              inputMode="decimal"
                              className="player-set-input"
                              value={set.reps}
                              onChange={(e) => updateSetInput(sIdx, 'reps', e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  toggleSetComplete(sIdx);
                                }
                              }}
                              aria-label={`Set ${set.setNum} ${isTimedReps ? 'seconds' : 'reps'}`}
                            />
                            <span className="set-field-unit">{isTimedReps ? 's' : 'r'}</span>
                          </label>
                          <button
                            type="button"
                            className="set-stepper-btn plus"
                            onClick={() => adjustSetReps(sIdx, 1)}
                            aria-label={`Increase reps for set ${set.setNum}`}
                          >
                            <Plus size={12} strokeWidth={2.5} />
                          </button>
                        </div>

                        <div className={`set-stepper-field weight-field ${isBodyweightEx ? 'optional-weight' : ''}`}>
                          <button
                            type="button"
                            className="set-stepper-btn minus"
                            onClick={() => adjustSetWeight(sIdx, -2.5)}
                            aria-label={`Decrease weight for set ${set.setNum}`}
                          >
                            <Minus size={12} strokeWidth={2.5} />
                          </button>
                          <label className="set-stepper-input-wrap">
                            <input
                              type="text"
                              inputMode="decimal"
                              className="player-set-input"
                              placeholder={set.prevWeight || (isBodyweightEx ? 'BW' : '0')}
                              value={set.weight}
                              onChange={(e) => updateSetInput(sIdx, 'weight', e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  toggleSetComplete(sIdx);
                                }
                              }}
                              aria-label={`Set ${set.setNum} weight in kg`}
                            />
                            <span className="set-field-unit">kg</span>
                          </label>
                          <button
                            type="button"
                            className="set-stepper-btn plus"
                            onClick={() => adjustSetWeight(sIdx, 2.5)}
                            aria-label={`Increase weight for set ${set.setNum}`}
                          >
                            <Plus size={12} strokeWidth={2.5} />
                          </button>
                        </div>

                        <button
                          type="button"
                          className={`player-set-check ${set.completed ? 'checked' : ''} ${isNextUp ? 'next-up-check' : ''}`}
                          onClick={() => toggleSetComplete(sIdx)}
                          aria-label={`Complete set ${set.setNum}`}
                        >
                          <Check size={18} strokeWidth={set.completed ? 3 : 2.25} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* Inline Previous / Next Resting Directly Below the Exercise (Desktop & Tablet Landscape) */}
          <div className="studio-inline-nav">
            <button
              type="button"
              className="player-nav-prev studio-nav-prev"
              onClick={goToPrev}
              disabled={currentIndex === 0}
              title={currentIndex === 0 ? 'First exercise in workout' : `Previous: ${prevExercise?.name}`}
              aria-label={currentIndex === 0 ? 'First exercise in workout' : `Previous exercise: ${prevExercise?.name}`}
            >
              <span className="nav-prev-icon-wrap" aria-hidden="true">
                <ArrowLeft size={16} />
              </span>
              <span className="nav-btn-copy">
                <small className="nav-btn-kicker">
                  {currentIndex === 0 ? 'START' : 'PREVIOUS'}
                </small>
                <strong className="nav-btn-name">
                  {currentIndex === 0 ? 'First Exercise' : (prevExercise ? prevExercise.name : 'Start')}
                </strong>
              </span>
            </button>

            {nextExercise ? (
              <button
                type="button"
                className={`player-nav-next studio-nav-next ${allCurrentSetsDone ? 'ready-advance' : ''}`}
                onClick={goToNext}
                aria-label={`Next exercise: ${nextExercise.name}`}
              >
                <span className="nav-btn-copy">
                  <small className="nav-btn-kicker">
                    {allCurrentSetsDone ? 'ALL SETS DONE · NEXT' : 'NEXT EXERCISE'}
                  </small>
                  <strong className="nav-btn-name">{nextExercise.name}</strong>
                </span>
                <span className="nav-next-arrow-badge" aria-hidden="true">
                  <ArrowRight size={17} />
                </span>
              </button>
            ) : (
              <button
                type="button"
                className="player-nav-next finish-mode ready-advance studio-nav-next"
                onClick={() => onCompleteWorkout(finishPayload)}
                aria-label="Finish and save workout"
              >
                <span className="nav-btn-copy">
                  <small className="nav-btn-kicker">FINAL EXERCISE</small>
                  <strong className="nav-btn-name">Finish &amp; Save Workout</strong>
                </span>
                <span className="nav-next-arrow-badge" aria-hidden="true">
                  <Trophy size={17} />
                </span>
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Mobile & Tablet Portrait Sticky Bottom HUD (<= 960px only) */}
      <div className={`player-sticky-dock ${isResting ? 'is-resting' : ''} ${!showStickyTimerRow ? 'no-timer-bar' : ''}`}>
          {showStickyTimerRow && (
            <div className="sticky-dock-timer-row">
              <div className="sticky-dock-timer-left">
                <span className="sticky-timer-badge">
                  {timerMode === 'work' ? 'WORK' : (isResting ? 'REST' : 'TIMER')}
                </span>
                <strong className="sticky-timer-clock">{formatTime(restSecondsLeft)}</strong>
              </div>
              <div className="sticky-dock-timer-bar" aria-hidden="true">
                <span style={{ width: `${Math.round(timerRatio * 100)}%` }} />
              </div>
              <div className="sticky-dock-timer-btns">
                <button type="button" className="dock-mini-btn" onClick={() => adjustRestTime(-15)}>
                  -15s
                </button>
                <button
                  type="button"
                  className={`dock-play-btn ${isResting ? 'active' : ''}`}
                  onClick={toggleRestTimer}
                  aria-label={isResting ? 'Pause timer' : 'Start timer'}
                >
                  {isResting ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
                </button>
                <button type="button" className="dock-mini-btn" onClick={() => adjustRestTime(15)}>
                  +15s
                </button>
                <button
                  type="button"
                  className="dock-mini-btn off"
                  onClick={toggleExerciseTimerPreference}
                  title="Turn off timer for this exercise"
                  aria-label="Turn off timer"
                >
                  <TimerOff size={12} />
                </button>
              </div>
            </div>
          )}

          <div className="sticky-dock-nav-row">
            <button
              type="button"
              className="player-nav-prev dock-nav-prev"
              onClick={goToPrev}
              disabled={currentIndex === 0}
              title={currentIndex === 0 ? 'First exercise in workout' : `Previous: ${prevExercise?.name}`}
              aria-label={currentIndex === 0 ? 'First exercise in workout' : `Previous exercise: ${prevExercise?.name}`}
            >
              <span className="nav-prev-icon-wrap" aria-hidden="true">
                <ArrowLeft size={16} />
              </span>
              <span className="nav-btn-copy">
                <small className="nav-btn-kicker">
                  {currentIndex === 0 ? 'START' : 'PREVIOUS'}
                </small>
                <strong className="nav-btn-name">
                  {currentIndex === 0 ? 'First Exercise' : (prevExercise ? prevExercise.name : 'Start')}
                </strong>
              </span>
            </button>

            {!showStickyTimerRow && (
              <button
                type="button"
                className="dock-enable-timer-pill"
                onClick={toggleExerciseTimerPreference}
                title="Enable timer for this exercise"
                aria-label="Enable rest timer"
              >
                <Timer size={14} />
              </button>
            )}

            {nextExercise ? (
              <button
                type="button"
                className={`player-nav-next dock-nav-next ${allCurrentSetsDone ? 'ready-advance' : ''}`}
                onClick={goToNext}
                aria-label={`Next exercise: ${nextExercise.name}`}
              >
                <span className="nav-btn-copy">
                  <small className="nav-btn-kicker">
                    {allCurrentSetsDone ? 'ALL SETS DONE · NEXT' : 'NEXT EXERCISE'}
                  </small>
                  <strong className="nav-btn-name">{nextExercise.name}</strong>
                </span>
                <span className="nav-next-arrow-badge" aria-hidden="true">
                  <ArrowRight size={17} />
                </span>
              </button>
            ) : (
              <button
                type="button"
                className="player-nav-next finish-mode ready-advance dock-nav-next"
                onClick={() => onCompleteWorkout(finishPayload)}
                aria-label="Finish and save workout"
              >
                <span className="nav-btn-copy">
                  <small className="nav-btn-kicker">FINAL EXERCISE</small>
                  <strong className="nav-btn-name">Finish &amp; Save Workout</strong>
                </span>
                <span className="nav-next-arrow-badge" aria-hidden="true">
                  <Trophy size={17} />
                </span>
              </button>
            )}
          </div>
      </div>

      {/* Slide-Over Workout Outline Drawer (opens via Outline button or 'Q') */}
      {isQueueOpen && (
        <div
          className="guide-drawer-backdrop queue-overlay-left"
          onClick={() => setIsQueueOpen(false)}
          role="presentation"
        >
          <aside
            className="player-queue-rail overlay-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Workout exercise outline"
          >
            <div className="player-queue-head">
              <div className="player-queue-head-title">
                <ListChecks size={15} color="var(--clay)" />
                <span>WORKOUT OUTLINE</span>
              </div>
              <div className="player-queue-head-meta">
                <span>{completedSetsCount}/{totalSetsAcrossWorkout} sets</span>
                <button
                  type="button"
                  className="player-queue-close-btn"
                  onClick={() => setIsQueueOpen(false)}
                  aria-label="Close outline"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            <div className="player-queue-scroll">
              {warmupQueueItems.length > 0 && (
                <div className="player-queue-group">
                  <div className="player-queue-group-label">
                    <Flame size={12} color="var(--clay)" />
                    <span>WARM-UP &amp; MOBILITY ({warmupQueueItems.length})</span>
                  </div>
                  <div className="player-queue-items">
                    {warmupQueueItems.map(renderQueueButton)}
                  </div>
                </div>
              )}

              {mainQueueItems.length > 0 && (
                <div className="player-queue-group">
                  <div className="player-queue-group-label">
                    <Dumbbell size={12} color="var(--sage)" />
                    <span>MAIN WORKOUT ({mainQueueItems.length})</span>
                  </div>
                  <div className="player-queue-items">
                    {mainQueueItems.map(renderQueueButton)}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* Pull-Out Form, Anatomy & Guide Drawer (opens via Form button or 'G') */}
      {isGuideOpen && (
        <div
          className="guide-drawer-backdrop"
          onClick={() => setIsGuideOpen(false)}
          role="presentation"
        >
          <aside
            className="guide-pullout-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Exercise Technique & Anatomy Guide"
          >
            <div className="drawer-sheet-handle" aria-hidden="true" />
            <div className="guide-drawer-header">
              <div>
                <span className="guide-drawer-kicker">
                  {currentExercise.pattern || primaryMuscleName}
                </span>
                <h2>{currentExercise.name}</h2>
                {currentExercise.scientificName && (
                  <p className="guide-drawer-sci">{currentExercise.scientificName}</p>
                )}
              </div>
              <button
                type="button"
                className="player-icon-btn"
                onClick={() => setIsGuideOpen(false)}
                aria-label="Close guide"
              >
                <X size={18} />
              </button>
            </div>

            {(currentExercise.muscleKey || currentExercise.targetMuscles) && (
              <div className="guide-muscles-block guide-anatomy-flex">
                {currentExercise.muscleKey && (
                  <div className="guide-anatomy-bodymap">
                    <MiniBodyMap
                      primaryKeys={[currentExercise.muscleKey]}
                      secondaryKeys={currentExercise.secondaryKeys || []}
                      className="guide-mini-body"
                    />
                  </div>
                )}
                {currentExercise.targetMuscles && (
                  <div className="guide-anatomy-tags">
                    <div className="guide-muscles-title">
                      <Activity size={13} />
                      <span>TARGET MUSCLES</span>
                    </div>
                    <div className="guide-muscle-chips">
                      {(currentExercise.targetMuscles.primary || []).map((m, i) => (
                        <span key={`p-${i}`} className="guide-chip primary">{m}</span>
                      ))}
                      {(currentExercise.targetMuscles.secondary || []).map((m, i) => (
                        <span key={`s-${i}`} className="guide-chip secondary">{m}</span>
                      ))}
                      {(currentExercise.targetMuscles.stabilizers || []).map((m, i) => (
                        <span key={`st-${i}`} className="guide-chip">{m}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="guide-tabs-bar">
              <button
                type="button"
                className={`guide-tab-btn ${guideTab === 'cues' ? 'active' : ''}`}
                onClick={() => setGuideTab('cues')}
              >
                Execution &amp; Phases
              </button>
              <button
                type="button"
                className={`guide-tab-btn ${guideTab === 'mistakes' ? 'active' : ''}`}
                onClick={() => setGuideTab('mistakes')}
              >
                Mistakes &amp; Pro Tip
              </button>
            </div>

            <div className="guide-drawer-scroll">
              {guideTab === 'cues' ? (
                <div className="cues-list">
                  {execution.setup && (
                    <div className="cue-row">
                      <span className="cue-num">1</span>
                      <div>
                        <strong>Setup &amp; Alignment</strong>
                        <p>{execution.setup}</p>
                      </div>
                    </div>
                  )}

                  {execution.eccentric && (
                    <div className="cue-row">
                      <span className="cue-num">2</span>
                      <div>
                        <strong>Lowering Phase (Eccentric)</strong>
                        <p>{execution.eccentric}</p>
                      </div>
                    </div>
                  )}

                  {execution.concentric && (
                    <div className="cue-row">
                      <span className="cue-num">3</span>
                      <div>
                        <strong>Drive Phase (Concentric)</strong>
                        <p>{execution.concentric}</p>
                      </div>
                    </div>
                  )}

                  {execution.breathing && (
                    <div className="cues-breathing-pill">
                      <Wind size={15} />
                      <span><strong>Breathing:</strong> {execution.breathing}</span>
                    </div>
                  )}

                  {!execution.setup && !execution.eccentric && !execution.concentric && !execution.breathing && (
                    <p className="cues-empty-note">No technique notes entered for this exercise.</p>
                  )}
                </div>
              ) : (
                <div className="mistakes-pane-inner">
                  <div className="mistakes-heading">
                    <AlertTriangle size={15} color="var(--danger)" />
                    <span>Common Mistakes to Avoid</span>
                  </div>
                  {commonMistakes.length > 0 ? (
                    <ul>
                      {commonMistakes.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="cues-empty-note">No common mistakes recorded.</p>
                  )}
                  {execution.proTip && (
                    <div className="pro-tip-footer">
                      <div className="protip-label-row">
                        <Lightbulb size={14} />
                        <strong>COACH CUE</strong>
                      </div>
                      <p>{execution.proTip}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default ActiveWorkoutModal;
