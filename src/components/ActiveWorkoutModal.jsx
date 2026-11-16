import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Trophy,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Link2,
  Timer,
  TimerOff,
  Dumbbell,
  Plus,
  Minus,
  SkipForward
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { haptics } from '../utils/haptics';
import { useWakeLock } from '../utils/useWakeLock';
import { useUndoToast } from '../utils/useUndoToast';
import { MUSCLE_LABELS } from '../data/muscleLabels';
import { EXERCISE_DATABASE } from '../data/exerciseDatabase';
import { enrichExerciseWithTaxonomy, getExerciseVariations } from '../data/exerciseTaxonomy';
import { isAnimatedGifUrl, getRequiresEquipment } from '../utils/exerciseImport';
import { calculateSessionVolumeKg } from '../utils/analytics';
import { STORAGE_KEYS, safeReadJson, safeWriteJson } from '../utils/storage';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';
import {
  buildInitialExerciseSets,
  doesExerciseUseExternalWeight,
  formatLoggedSetSummary,
  formatTargetPrescription,
  getEffectiveRestSeconds,
  getExercisePhaseInfo,
  getExerciseSetLoggingProfile,
  getExerciseTimerConfig,
  getSupersetInfoMap,
  isRestTimerEnabledForExercise,
  shouldShowExerciseRpe
} from '../utils/workoutSets';
import { MediaViewer } from './MediaViewer';
import { PlayerHeader } from './player/PlayerHeader';
import { PlayerQueueDrawer } from './player/PlayerQueueDrawer';
import { PlayerGuideDrawer } from './player/PlayerGuideDrawer';
import { FinishWorkoutModal } from './player/FinishWorkoutModal';
import { UndoToast } from './UndoToast';

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

function formatPrevSetSummary(prevSet, exercise = null) {
  return formatLoggedSetSummary(prevSet, exercise);
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
  const statOnlyMatch = s.match(/^([\d.,]+)\s*(?:reps?|s|sec|min|flows?|steps?|\/side|\/leg)?$/i);
  if (statOnlyMatch) {
    return { weight: '', reps: statOnlyMatch[1] };
  }
  return { weight: '', reps: '' };
}

function resolveCuedTimerState(exercise, sets = []) {
  if (!exercise) return { mode: 'rest', seconds: 60 };
  const nextIdx = sets.findIndex((s) => !s.completed);
  const activeSet = nextIdx >= 0 ? sets[nextIdx] : sets[sets.length - 1];
  const cfg = getExerciseTimerConfig(exercise, activeSet);
  if (cfg.hasWorkTimer && nextIdx >= 0) {
    return { mode: 'work', seconds: cfg.workSeconds };
  }
  return { mode: 'rest', seconds: cfg.restSeconds };
}

function formatTimerPresetChip(secs) {
  if (secs >= 120 && secs % 60 === 0) {
    return `${secs / 60}m`;
  }
  return `${secs}s`;
}

export function ActiveWorkoutModal({
  routine,
  initialIndex = 0,
  workoutHistory = [],
  onUpdateRoutine,
  onClose,
  onCompleteWorkout
}) {
  const [localExercises, setLocalExercises] = useState(() => routine?.exercises || EMPTY_EXERCISES);
  const exercises = onUpdateRoutine ? (routine?.exercises || EMPTY_EXERCISES) : localExercises;

  useWakeLock(true);
  const {
    toast: undoToast,
    showUndoToast,
    triggerUndo,
    dismissToast,
    pauseTimer: pauseUndoTimer,
    resumeTimer: resumeUndoTimer,
  } = useUndoToast();

  const [savedDraft] = useState(() => {
    const draft = safeReadJson(STORAGE_KEYS.ACTIVE_DRAFT, null);
    if (!draft || draft.routineId !== routine?.id) return null;
    // Expire drafts older than 24 hours
    if (draft.updatedAt) {
      const ageMs = Date.now() - new Date(draft.updatedAt).getTime();
      if (ageMs > 24 * 60 * 60 * 1000 || isNaN(ageMs)) {
        safeWriteJson(STORAGE_KEYS.ACTIVE_DRAFT, null);
        return null;
      }
    }
    return draft;
  });

  const safeInitialIndex = Math.min(
    Math.max(0, initialIndex > 0 ? initialIndex : (savedDraft?.currentIndex ?? initialIndex)),
    Math.max(0, exercises.length - 1)
  );

  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = safeReadJson(STORAGE_KEYS.SOUND_ENABLED, true);
    return saved !== false;
  });
  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
    safeWriteJson(STORAGE_KEYS.SOUND_ENABLED, soundEnabled);
  }, [soundEnabled]);

  const initialElapsed = Number.isFinite(savedDraft?.workoutElapsedSeconds)
    ? savedDraft.workoutElapsedSeconds
    : 0;
  const initialElapsedRef = useRef(initialElapsed);
  const [sessionStartTime] = useState(() => Date.now());
  const startedAtRef = useRef(sessionStartTime);
  const elapsedSecondsRef = useRef(initialElapsed);
  const [workoutElapsedSeconds, setWorkoutElapsedSeconds] = useState(initialElapsed);
  const [confirmFinishOpen, setConfirmFinishOpen] = useState(false);

  // Outline starts collapsed so the live stage remains a calm, spacious 2-column studio view
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isMobileDemoExpanded, setIsMobileDemoExpanded] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideExerciseIdx, setGuideExerciseIdx] = useState(null);
  const [guideTab, setGuideTab] = useState('cues');
  const [flowNotice, setFlowNotice] = useState(null);
  const [weightColumnOverrides, setWeightColumnOverrides] = useState({});
  const activeRibbonRef = useRef(null);

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
        formatPrevFn: (prevSet) => formatPrevSetSummary(prevSet, ex)
      });
    });
    return initial;
  });
  const loggedSetsRef = useRef(loggedSets);
  useEffect(() => {
    loggedSetsRef.current = loggedSets;
  }, [loggedSets]);

  const currentExercise = exercises[currentIndex] || null;
  const currentExerciseSets = currentExercise ? (loggedSets[currentExercise.id] || EMPTY_EXERCISES) : EMPTY_EXERCISES;
  const nextIncompleteSetIdx = currentExerciseSets.findIndex((s) => !s.completed);
  const activeWorkSet = nextIncompleteSetIdx >= 0
    ? currentExerciseSets[nextIncompleteSetIdx]
    : currentExerciseSets[currentExerciseSets.length - 1];
  const timerConfig = getExerciseTimerConfig(currentExercise, activeWorkSet);
  const isTimerEnabled = timerConfig.restEnabled;
  const defaultRest = timerConfig.restSeconds;

  const [timerMode, setTimerMode] = useState(() => {
    const ex = exercises[safeInitialIndex];
    return resolveCuedTimerState(ex, loggedSets[ex?.id] || []).mode;
  }); // 'rest' | 'work'
  const [restSecondsLeft, setRestSecondsLeft] = useState(() => {
    const ex = exercises[safeInitialIndex];
    return resolveCuedTimerState(ex, loggedSets[ex?.id] || []).seconds;
  });
  const restSecondsLeftRef = useRef(restSecondsLeft);
  useEffect(() => {
    restSecondsLeftRef.current = restSecondsLeft;
  }, [restSecondsLeft]);
  const [restInitialSeconds, setRestInitialSeconds] = useState(() => {
    const ex = exercises[safeInitialIndex];
    return resolveCuedTimerState(ex, loggedSets[ex?.id] || []).seconds;
  });
  const [isResting, setIsResting] = useState(false);
  const restTargetTimestampRef = useRef(null);
  const onTimerZeroRef = useRef(null);

  const supersetMap = useMemo(() => getSupersetInfoMap(exercises), [exercises]);
  const currentSuperset = supersetMap.get(currentIndex) || null;

  useEffect(() => {
    if (activeRibbonRef.current && typeof activeRibbonRef.current.scrollIntoView === 'function') {
      activeRibbonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentIndex]);

  const isWeightShownForExercise = useCallback((targetEx) => {
    if (!targetEx) return false;
    if (typeof weightColumnOverrides[targetEx.id] === 'boolean') {
      return weightColumnOverrides[targetEx.id];
    }
    const exSets = loggedSets[targetEx.id] || [];
    if (exSets.some((s) => {
      const w = parseFloat(String(s.weight ?? '').replace(',', '.'));
      return Number.isFinite(w) && w > 0;
    })) {
      return true;
    }
    return doesExerciseUseExternalWeight(targetEx);
  }, [weightColumnOverrides, loggedSets]);

  const toggleWeightColumnForExercise = useCallback((targetEx) => {
    if (!targetEx) return;
    const currentlyShown = isWeightShownForExercise(targetEx);
    setWeightColumnOverrides((prev) => ({
      ...prev,
      [targetEx.id]: !currentlyShown
    }));
  }, [isWeightShownForExercise]);

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

  const cueTimerForExercise = useCallback((targetIndex, setsMap = loggedSetsRef.current) => {
    const targetEx = exercises[targetIndex];
    if (!targetEx) return;
    const cued = resolveCuedTimerState(targetEx, setsMap[targetEx.id] || []);
    setTimerMode(cued.mode);
    setRestInitialSeconds(cued.seconds);
    setRestSecondsLeft(cued.seconds);
    restTargetTimestampRef.current = null;
    setIsResting(false);
  }, [exercises]);

  const focusSupersetPartner = useCallback((partnerIdx) => {
    if (partnerIdx < 0 || partnerIdx >= exercises.length) return;
    setCurrentIndex(partnerIdx);
    cueTimerForExercise(partnerIdx);
    setFlowNotice(null);
  }, [exercises.length, cueTimerForExercise]);

  const goToExercise = useCallback((nextIndex) => {
    if (nextIndex < 0 || nextIndex >= exercises.length) return;
    setCurrentIndex(nextIndex);
    cueTimerForExercise(nextIndex);
    setFlowNotice(null);
    setIsGuideOpen(false);
    setGuideExerciseIdx(null);
    setIsMobileDemoExpanded(false);
    setIsQueueOpen(false);
  }, [exercises.length, cueTimerForExercise]);

  const prevNavRawIndex = currentSuperset ? currentSuperset.memberIndices[0] - 1 : currentIndex - 1;
  const nextNavRawIndex = currentSuperset
    ? currentSuperset.memberIndices[currentSuperset.memberIndices.length - 1] + 1
    : currentIndex + 1;
  const prevNavIndex = prevNavRawIndex >= 0
    ? (supersetMap.get(prevNavRawIndex)?.memberIndices[0] ?? prevNavRawIndex)
    : -1;
  const nextNavIndex = nextNavRawIndex < exercises.length
    ? (supersetMap.get(nextNavRawIndex)?.memberIndices[0] ?? nextNavRawIndex)
    : -1;
  const prevBlockExercise = prevNavIndex >= 0 ? exercises[prevNavIndex] : null;
  const nextBlockExercise = nextNavIndex >= 0 ? exercises[nextNavIndex] : null;

  const goToNextBlock = useCallback(() => {
    if (nextNavIndex >= 0) {
      goToExercise(nextNavIndex);
    }
  }, [nextNavIndex, goToExercise]);

  const goToPrevBlock = useCallback(() => {
    if (prevNavIndex >= 0) {
      goToExercise(prevNavIndex);
    }
  }, [prevNavIndex, goToExercise]);

  const toggleRestTimer = useCallback(() => {
    if (restSecondsLeft === 0) {
      const restartSecs = restInitialSeconds > 0
        ? restInitialSeconds
        : (timerMode === 'work' ? timerConfig.workSeconds : defaultRest);
      setRestInitialSeconds(restartSecs);
      setRestSecondsLeft(restartSecs);
      restTargetTimestampRef.current = Date.now() + restartSecs * 1000;
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
  }, [restSecondsLeft, restInitialSeconds, timerMode, timerConfig.workSeconds, defaultRest]);

  useBodyScrollLock(true);

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
      restTargetTimestampRef.current = Date.now() + restSecondsLeftRef.current * 1000;
    }

    let lastTickSecond = -1;
    const checkRest = () => {
      if (!restTargetTimestampRef.current) return;
      const left = Math.max(0, Math.ceil((restTargetTimestampRef.current - Date.now()) / 1000));
      setRestSecondsLeft(left);
      if (left === 0) {
        lastTickSecond = -1;
        setIsResting(false);
        restTargetTimestampRef.current = null;
        if (typeof onTimerZeroRef.current === 'function') {
          onTimerZeroRef.current();
        }
      } else if (left <= 3 && left !== lastTickSecond && soundEnabledRef.current) {
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
  }, [isResting]);

  const handleClose = useCallback(() => {
    if (routine?.id) {
      safeWriteJson(STORAGE_KEYS.ACTIVE_DRAFT, {
        routineId: routine.id,
        currentIndex,
        workoutElapsedSeconds: elapsedSecondsRef.current,
        loggedSets,
        updatedAt: new Date().toISOString(),
      });
    }
    onClose();
  }, [routine, currentIndex, loggedSets, onClose]);

  const openGuideDrawer = useCallback((targetIdx = null) => {
    setIsQueueOpen(false);
    setGuideExerciseIdx(targetIdx);
    setIsGuideOpen(true);
  }, []);

  const closeGuideDrawer = useCallback(() => {
    setIsGuideOpen(false);
    setGuideExerciseIdx(null);
  }, []);

  const toggleGuideDrawer = useCallback(() => {
    setIsQueueOpen(false);
    setGuideExerciseIdx(null);
    setIsGuideOpen((prev) => !prev);
  }, []);

  const toggleQueueDrawer = useCallback(() => {
    setIsGuideOpen(false);
    setGuideExerciseIdx(null);
    setIsQueueOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (confirmFinishOpen) {
          setConfirmFinishOpen(false);
        } else if (isGuideOpen) {
          closeGuideDrawer();
        } else if (isQueueOpen) {
          setIsQueueOpen(false);
        } else if (isMobileDemoExpanded) {
          setIsMobileDemoExpanded(false);
        } else {
          handleClose();
        }
        return;
      }

      if (confirmFinishOpen) return;

      if (!isInput && e.key === 'ArrowRight') {
        goToNextBlock();
      } else if (!isInput && e.key === 'ArrowLeft') {
        goToPrevBlock();
      } else if (!isInput && e.code === 'Space' && (isTimerEnabled || timerConfig.hasWorkTimer || isResting)) {
        e.preventDefault();
        toggleRestTimer();
      } else if (!isInput && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault();
        toggleGuideDrawer();
      } else if (!isInput && (e.key === 'q' || e.key === 'Q')) {
        e.preventDefault();
        toggleQueueDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmFinishOpen, isGuideOpen, isQueueOpen, isMobileDemoExpanded, isTimerEnabled, timerConfig.hasWorkTimer, isResting, closeGuideDrawer, toggleGuideDrawer, toggleQueueDrawer, handleClose, goToNextBlock, goToPrevBlock, toggleRestTimer]);

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
    if (!currentExercise) return;
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
      if (timerMode === 'rest') {
        resetTimer(secs, 'rest', false);
      }
    } else if (timerMode === 'rest') {
      setIsResting(false);
    }
  };

  const toggleSetComplete = (setIndex, targetExercise = currentExercise, { fromWorkTimer = false } = {}) => {
    if (!targetExercise) return;
    const exId = targetExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    if (!currentSets[setIndex]) return;

    const targetSet = { ...currentSets[setIndex], completed: !currentSets[setIndex].completed };
    currentSets[setIndex] = targetSet;

    // Auto-prefill next incomplete set in this exercise for zero-friction 1-tap logging
    if (targetSet.completed) {
      const nextSetInExercise = currentSets[setIndex + 1];
      if (nextSetInExercise && !nextSetInExercise.completed) {
        const shouldPrefillWeight = !nextSetInExercise.weight || nextSetInExercise.weight === '0';
        const shouldPrefillReps = !nextSetInExercise.reps || nextSetInExercise.reps === '0';
        if (shouldPrefillWeight || shouldPrefillReps) {
          currentSets[setIndex + 1] = {
            ...nextSetInExercise,
            weight: shouldPrefillWeight ? (targetSet.weight || '') : nextSetInExercise.weight,
            reps: shouldPrefillReps ? (targetSet.reps || '') : nextSetInExercise.reps
          };
        }
      }
    }

    const nextLoggedSets = {
      ...loggedSets,
      [exId]: currentSets
    };
    setLoggedSets(nextLoggedSets);

    if (targetSet.completed) {
      if (fromWorkTimer) {
        haptics.timerComplete();
      } else {
        haptics.setComplete();
      }
      if (soundEnabled) {
        if (fromWorkTimer) {
          sounds.playTimerComplete();
        } else {
          sounds.playSetComplete();
        }
      }

      const nextSetInExercise = currentSets[setIndex + 1];
      if (nextSetInExercise?.isDropset) {
        setIsResting(false);
        setFlowNotice({
          type: 'dropset',
          text: 'Drop set next — lower weight (~20%) and continue.'
        });
        return;
      }

      const targetIdx = exercises.findIndex((ex) => ex.id === exId);
      const targetSuperset = targetIdx >= 0 ? (supersetMap.get(targetIdx) || null) : null;
      if (targetSuperset) {
        let pendingPartnerIdx = null;
        for (let offset = 1; offset < targetSuperset.size; offset += 1) {
          const pPos = (targetSuperset.position + offset) % targetSuperset.size;
          const pIdx = targetSuperset.memberIndices[pPos];
          const pEx = exercises[pIdx];
          const pSets = pEx ? (nextLoggedSets[pEx.id] || []) : [];
          if (pSets[setIndex] && !pSets[setIndex].completed) {
            pendingPartnerIdx = pIdx;
            break;
          }
        }

        if (pendingPartnerIdx !== null) {
          const nextPartnerEx = exercises[pendingPartnerIdx];
          const nextPartnerInfo = supersetMap.get(pendingPartnerIdx);
          setCurrentIndex(pendingPartnerIdx);
          cueTimerForExercise(pendingPartnerIdx, nextLoggedSets);
          setFlowNotice(
            nextPartnerEx
              ? {
                type: 'superset',
                text: `${fromWorkTimer ? 'Set logged! ' : ''}Up next in Superset ${targetSuperset.rangeLabel}: ${nextPartnerInfo?.code ? `#${nextPartnerInfo.code} ` : ''}${nextPartnerEx.name}`
              }
              : null
          );
          return;
        }

        const roundFirstIdx = targetSuperset.memberIndices[0];
        const roundFirstEx = exercises[roundFirstIdx];
        if (roundFirstEx) {
          setCurrentIndex(roundFirstIdx);
        }
        setFlowNotice(null);
        const timerOwner = isRestTimerEnabledForExercise(targetExercise)
          ? targetExercise
          : roundFirstEx;
        if (isRestTimerEnabledForExercise(timerOwner)) {
          resetTimer(getEffectiveRestSeconds(timerOwner), 'rest', true);
        } else if (roundFirstEx) {
          cueTimerForExercise(roundFirstIdx, nextLoggedSets);
        }
        return;
      }

      if (isRestTimerEnabledForExercise(targetExercise)) {
        setFlowNotice(
          fromWorkTimer
            ? { type: 'superset', text: 'Set logged — recovery rest started.' }
            : null
        );
        resetTimer(getEffectiveRestSeconds(targetExercise), 'rest', true);
      } else {
        setFlowNotice(null);
        if (targetIdx >= 0) {
          cueTimerForExercise(targetIdx, nextLoggedSets);
        }
      }
    } else {
      setFlowNotice(null);
      if (!isResting && targetExercise.id === currentExercise?.id) {
        cueTimerForExercise(currentIndex, nextLoggedSets);
      }
    }
  };

  useEffect(() => {
    onTimerZeroRef.current = () => {
      if (timerMode === 'work') {
        if (!timerConfig.isRepHoldDuration && nextIncompleteSetIdx >= 0 && currentExercise) {
          toggleSetComplete(nextIncompleteSetIdx, currentExercise, { fromWorkTimer: true });
        } else {
          haptics.timerComplete();
          if (soundEnabled) sounds.playTimerComplete();
          if (timerConfig.isRepHoldDuration) {
            resetTimer(timerConfig.workSeconds, 'work', false);
          }
        }
        return;
      }

      haptics.timerComplete();
      if (soundEnabled) sounds.playTimerComplete();
      if (timerConfig.hasWorkTimer && nextIncompleteSetIdx >= 0) {
        resetTimer(timerConfig.workSeconds, 'work', false);
      }
    };
  });

  if (!currentExercise) {
    return null;
  }

  const updateSetInput = (setIndex, field, value, targetExercise = currentExercise) => {
    if (!targetExercise) return;
    const exId = targetExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    if (!currentSets[setIndex]) return;

    currentSets[setIndex] = {
      ...currentSets[setIndex],
      [field]: value
    };
    const nextLogged = {
      ...loggedSets,
      [exId]: currentSets
    };
    setLoggedSets(nextLogged);

    if (
      targetExercise.id === currentExercise.id &&
      field === 'reps' &&
      timerMode === 'work' &&
      !isResting &&
      setIndex === nextIncompleteSetIdx
    ) {
      const updatedCfg = getExerciseTimerConfig(targetExercise, currentSets[setIndex]);
      if (updatedCfg.hasWorkTimer) {
        setRestInitialSeconds(updatedCfg.workSeconds);
        setRestSecondsLeft(updatedCfg.workSeconds);
      }
    }
  };

  const adjustSetReps = (setIndex, delta, targetExercise = currentExercise) => {
    if (!targetExercise) return;
    const exId = targetExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    if (!currentSets[setIndex]) return;
    const profile = getExerciseSetLoggingProfile(targetExercise);
    const stepDelta = Math.abs(delta) === 1 ? delta * profile.repStep : delta;
    const minVal = profile.isSeconds ? 5 : 1;
    const currentReps = parseInt(currentSets[setIndex].reps, 10) || 0;
    const nextReps = Math.max(minVal, currentReps + stepDelta);
    updateSetInput(setIndex, 'reps', String(nextReps), targetExercise);
  };

  const adjustSetWeight = (setIndex, delta, targetExercise = currentExercise) => {
    if (!targetExercise) return;
    const exId = targetExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    if (!currentSets[setIndex]) return;
    const currentWeight = parseFloat(String(currentSets[setIndex].weight).replace(',', '.')) || 0;
    const nextWeight = Math.max(0, Math.round((currentWeight + delta) * 10) / 10);
    updateSetInput(setIndex, 'weight', nextWeight > 0 ? String(nextWeight) : '', targetExercise);
  };

  const applyPrevToSet = (setIndex, targetExercise = currentExercise) => {
    if (!targetExercise) return;
    const exId = targetExercise.id;
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

  const addSetToExercise = (asDropset = false, targetExercise = currentExercise) => {
    if (!targetExercise) return;
    const exId = targetExercise.id;
    const currentSets = [...(loggedSets[exId] || [])];
    const lastSet = currentSets[currentSets.length - 1];
    const nextNum = currentSets.length + 1;
    const defaultRepTarget = String(targetExercise.defaultReps ?? '10').split('-')[0]?.trim() || '10';
    const suggestedWeight = lastSet?.weight ?? '';

    currentSets.push({
      setNum: nextNum,
      exerciseName: targetExercise.name,
      sourceId: targetExercise.sourceId || targetExercise.id,
      completed: false,
      isDropset: asDropset,
      reps: lastSet?.reps ?? defaultRepTarget,
      weight: suggestedWeight,
      prev: asDropset ? '-' : (lastSet?.prev ?? '-'),
      prevWeight: asDropset ? '' : (lastSet?.prevWeight ?? ''),
      prevReps: asDropset ? '' : (lastSet?.prevReps ?? ''),
    });
    const nextLogged = {
      ...loggedSets,
      [exId]: currentSets
    };
    setLoggedSets(nextLogged);

    if (targetExercise.id === currentExercise.id && !isResting && nextIncompleteSetIdx === -1) {
      cueTimerForExercise(currentIndex, nextLogged);
    }
  };

  const removeLastSetFromExercise = (targetExercise = currentExercise) => {
    if (!targetExercise) return;
    const exId = targetExercise.id;
    const currentSets = loggedSets[exId] || [];
    if (currentSets.length <= 1) return;
    const removedSet = currentSets[currentSets.length - 1];
    const nextLogged = {
      ...loggedSets,
      [exId]: currentSets.slice(0, -1)
    };
    setLoggedSets(nextLogged);

    if (targetExercise.id === currentExercise.id && !isResting) {
      cueTimerForExercise(currentIndex, nextLogged);
    }

    showUndoToast(`Removed Set ${removedSet.setNum} (${targetExercise.name})`, () => {
      setLoggedSets((prev) => {
        const list = prev[exId] || [];
        return {
          ...prev,
          [exId]: [...list, removedSet]
        };
      });
      haptics.undo();
    });
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

  const completedExercisesCount = exercises.filter((ex) => {
    const sets = loggedSets[ex.id] || [];
    return sets.length > 0 && sets.every((s) => s.completed);
  }).length;

  const currentCompletedCount = currentExerciseSets.filter((s) => s.completed).length;
  const allCurrentSetsDone = currentExerciseSets.length > 0 && currentCompletedCount === currentExerciseSets.length;

  const currentPhase = getExercisePhaseInfo(currentExercise);
  const primaryMuscleName = MUSCLE_LABELS[currentExercise.muscleKey] || currentExercise.muscleKey;
  const hasAnyImages = Boolean(currentExercise.illustration || currentExercise.illustrationEnd);
  const hasTwoImages = Boolean(currentExercise.illustration && currentExercise.illustrationEnd);
  const hasMedia = hasAnyImages || Boolean(currentExercise.customVideoUrl);

  // Interactive Workout Ribbon Nodes (grouping supersets together numerically with phase metadata)
  const ribbonNodes = [];
  exercises.forEach((ex, idx) => {
    const ss = supersetMap.get(idx);
    const phaseInfo = getExercisePhaseInfo(ex);
    if (ss && !ss.isFirst) return;
    if (ss && ss.isFirst) {
      const members = ss.memberIndices.map((mIdx) => exercises[mIdx]).filter(Boolean);
      const totalSets = members.reduce((sum, mEx) => sum + (loggedSets[mEx.id]?.length || 0), 0);
      const doneSets = members.reduce(
        (sum, mEx) => sum + (loggedSets[mEx.id]?.filter((s) => s.completed).length || 0),
        0
      );
      ribbonNodes.push({
        type: 'superset',
        key: ss.groupId,
        ss,
        startIdx: idx,
        members,
        doneSets,
        totalSets,
        isCurrent: ss.memberIndices.includes(currentIndex),
        isDone: totalSets > 0 && doneSets === totalSets,
        isWarmup: phaseInfo.key === 'warmup',
        phaseInfo
      });
    } else {
      const exSets = loggedSets[ex.id] || [];
      const doneSets = exSets.filter((s) => s.completed).length;
      const totalSets = exSets.length;
      ribbonNodes.push({
        type: 'single',
        key: ex.id || idx,
        idx,
        ex,
        doneSets,
        totalSets,
        isCurrent: idx === currentIndex,
        isDone: totalSets > 0 && doneSets === totalSets,
        isWarmup: phaseInfo.key === 'warmup',
        phaseInfo
      });
    }
  });

  // Dedicated Superset Studio State (members & round-by-round next up)
  const supersetMembers = currentSuperset
    ? currentSuperset.memberIndices
      .map((mIdx, pos) => {
        const ex = exercises[mIdx];
        if (!ex) return null;
        return {
          mIdx,
          pos,
          code: `${mIdx + 1}`,
          ex,
          sets: loggedSets[ex.id] || []
        };
      })
      .filter(Boolean)
    : [];
  const supersetMaxRounds = supersetMembers.length > 0
    ? Math.max(1, ...supersetMembers.map((m) => m.sets.length))
    : 0;
  let supersetNextUp = null;
  if (supersetMembers.length > 0) {
    for (let r = 0; r < supersetMaxRounds; r += 1) {
      const pendingMember = supersetMembers.find((m) => m.sets[r] && !m.sets[r].completed);
      if (pendingMember) {
        supersetNextUp = {
          mIdx: pendingMember.mIdx,
          setIndex: r,
          roundNumber: r + 1,
          code: pendingMember.code
        };
        break;
      }
    }
  }
  const supersetTotalSets = supersetMembers.reduce((sum, m) => sum + m.sets.length, 0);
  const supersetDoneSets = supersetMembers.reduce(
    (sum, m) => sum + m.sets.filter((s) => s.completed).length,
    0
  );
  const allSupersetSetsDone = supersetTotalSets > 0 && supersetDoneSets === supersetTotalSets;
  const otherSupersetPartners = currentSuperset
    ? supersetMembers.filter((m) => m.mIdx !== currentIndex)
    : [];
  const activeNavSetsDone = currentSuperset ? allSupersetSetsDone : allCurrentSetsDone;

  const timerRatio = restInitialSeconds > 0
    ? Math.min(1, Math.max(0, restSecondsLeft / restInitialSeconds))
    : 0;
  const restPresets = [30, 45, 60, 90];
  const workPresets = timerConfig.isMinutes
    ? [600, 900, 1200]
    : [15, 30, 60];
  const isWorkMode = timerMode === 'work';
  const showActiveTimerFace = isWorkMode || isTimerEnabled || isResting;
  const workBumpDelta = timerConfig.isMinutes ? 60 : 15;
  const stickyTimerStep = isWorkMode ? workBumpDelta : 15;

  const finishPayload = {
    durationSeconds: workoutElapsedSeconds,
    completedSets: completedSetsCount,
    totalSets: totalSetsAcrossWorkout,
    loggedSets
  };

  const handleRequestFinish = () => {
    if (completedSetsCount < totalSetsAcrossWorkout || completedSetsCount === 0) {
      setConfirmFinishOpen(true);
    } else {
      onCompleteWorkout(finishPayload);
    }
  };

  const handleDiscardWorkout = () => {
    safeWriteJson(STORAGE_KEYS.ACTIVE_DRAFT, null);
    setConfirmFinishOpen(false);
    onClose();
  };

  const handleConfirmFinish = () => {
    setConfirmFinishOpen(false);
    onCompleteWorkout(finishPayload);
  };

  const resolvedGuideIdx = (
    guideExerciseIdx !== null &&
    currentSuperset?.memberIndices.includes(guideExerciseIdx)
  )
    ? guideExerciseIdx
    : currentIndex;
  const rawGuideExercise = exercises[resolvedGuideIdx] || currentExercise;
  const guideExercise = isGuideOpen && rawGuideExercise
    ? (rawGuideExercise.biomechanics ? rawGuideExercise : enrichExerciseWithTaxonomy(rawGuideExercise))
    : rawGuideExercise;
  const guideVariations = isGuideOpen && guideExercise
    ? getExerciseVariations(guideExercise, EXERCISE_DATABASE)
    : [];
  const guidePhaseInfo = getExercisePhaseInfo(guideExercise);
  const guidePrimaryMuscleName = MUSCLE_LABELS[guideExercise.muscleKey] || guideExercise.muscleKey;
  const guideExecution = guideExercise.execution || {};
  const guideCommonMistakes = Array.isArray(guideExecution.commonMistakes) ? guideExecution.commonMistakes : [];

  const warmupQueueItems = [];
  const mainQueueItems = [];
  const decompressionQueueItems = [];
  exercises.forEach((ex, idx) => {
    const entry = { ex, idx, ssInfo: supersetMap.get(idx) || null };
    const phaseKey = getExercisePhaseInfo(ex).key;
    if (phaseKey === 'warmup') {
      warmupQueueItems.push(entry);
    } else if (phaseKey === 'decompression') {
      decompressionQueueItems.push(entry);
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
    const pct = exSets.length > 0 ? Math.round((doneSets / exSets.length) * 100) : 0;

    return (
      <button
        key={ex.id || idx}
        type="button"
        className={`player-queue-item ${isCurrent ? 'active' : ''} ${isComplete ? 'done' : ''} ${ssInfo ? 'in-superset' : ''}`}
        onClick={() => goToExercise(idx)}
      >
        <span className="queue-item-idx-badge">
          {ssInfo ? `#${ssInfo.code}` : idx + 1}
        </span>
        <div className="queue-item-thumb">
          {ex.illustration ? (
            <img src={ex.illustration} alt="" loading="lazy" />
          ) : (
            <Dumbbell size={16} color="var(--faint)" />
          )}
        </div>
        <div className="queue-item-copy">
          <strong>{ex.name}</strong>
          <span>
            {mLabel ? `${mLabel} · ` : ''}
            {ex.equipment || 'Bodyweight'} · {exSets.length} × {ex.defaultReps || '10'}
            {exDrops > 0 ? ' · Drop' : ''}
            {exUntimed ? ' · Untimed' : ''}
          </span>
          {doneSets > 0 && !isComplete && (
            <div className="queue-item-mini-bar" aria-hidden="true">
              <span style={{ width: `${pct}%` }} />
            </div>
          )}
        </div>
        <span className={`queue-item-status ${isComplete ? 'complete' : isCurrent ? 'active-now' : ''}`}>
          {isComplete ? <Check size={12} strokeWidth={3} /> : isCurrent ? `NOW · ${doneSets}/${exSets.length}` : `${doneSets}/${exSets.length}`}
        </span>
      </button>
    );
  };

  const renderPhaseQueueEntries = (entries) => {
    const rendered = [];
    let i = 0;
    while (i < entries.length) {
      const entry = entries[i];
      if (entry.ssInfo?.isFirst) {
        const groupId = entry.ssInfo.groupId;
        const ssEntries = [];
        while (i < entries.length && entries[i].ssInfo?.groupId === groupId) {
          ssEntries.push(entries[i]);
          i += 1;
        }
        rendered.push(
          <div key={`ss-card-${groupId}`} className="queue-superset-card">
            <div className="queue-superset-header">
              <Link2 size={11} />
              <span>SUPERSET {entry.ssInfo.rangeLabel || entry.ssInfo.letter} · PAIRED ROUNDS</span>
            </div>
            <div className="queue-superset-members">
              {ssEntries.map(renderQueueButton)}
            </div>
          </div>
        );
      } else {
        rendered.push(renderQueueButton(entry));
        i += 1;
      }
    }
    return rendered;
  };

  const renderExerciseSetTable = (targetEx) => {
    const targetSets = loggedSets[targetEx.id] || [];
    const profile = getExerciseSetLoggingProfile(targetEx);
    const showWeightCol = isWeightShownForExercise(targetEx);
    const targetBodyweight = !getRequiresEquipment(targetEx);
    const targetNextIdx = targetSets.findIndex((s) => !s.completed);
    const colModeClass = showWeightCol ? 'has-weight-col' : 'no-weight-col';

    return (
      <>
        <div className={`player-sets-col-heads ${colModeClass}`} aria-hidden="true">
          <span className="col-head-set">SET</span>
          <span className="col-head-prev">PREVIOUS</span>
          <span className="col-head-stat">{profile.statHeader}</span>
          {showWeightCol && <span className="col-head-weight">{targetBodyweight ? '+KG (OPT)' : 'WEIGHT (KG)'}</span>}
          <span className="col-head-done">DONE</span>
        </div>

        <div className="player-sets-list">
          {targetSets.map((set, sIdx) => {
            const hasPrevData = set.prev && set.prev !== '-';
            const isNextUp = sIdx === targetNextIdx;
            const isUpcoming = !set.completed && targetNextIdx !== -1 && sIdx > targetNextIdx;

            return (
              <div
                key={set.setNum}
                className={`player-set-row ${colModeClass} ${set.completed ? 'completed' : ''} ${set.isDropset ? 'is-dropset' : ''} ${isNextUp ? 'next-up' : ''} ${isUpcoming ? 'is-upcoming' : ''}`}
              >
                <div className="set-num-cell-wrap">
                  <span
                    className={`set-num-tag ${set.isDropset ? 'drop' : ''} ${isNextUp ? 'active-num' : ''}`}
                    title={set.isDropset ? 'Planned Drop Set' : `Set #${set.setNum}`}
                  >
                    {set.isDropset ? 'DROP' : `${set.setNum}`}
                  </span>
                </div>

                {hasPrevData ? (
                  <button
                    type="button"
                    className="set-prev-copy-btn"
                    onClick={() => applyPrevToSet(sIdx, targetEx)}
                    title={`Copy previous (${set.prev})`}
                  >
                    <span className="set-prev-val">{set.prev}</span>
                  </button>
                ) : (
                  <span className="set-prev-empty" title={targetEx.defaultReps ? `Target: ${targetEx.defaultReps}` : 'First set'}>
                    —
                  </span>
                )}

                <div className="set-stepper-field reps-field">
                  <button
                    type="button"
                    className="set-stepper-btn minus"
                    onClick={() => adjustSetReps(sIdx, -1, targetEx)}
                    aria-label={`Decrease ${profile.statHeader.toLowerCase()} for set ${set.setNum}`}
                  >
                    <Minus size={15} strokeWidth={2.5} />
                  </button>
                  <label className="set-stepper-input-wrap" htmlFor={`player-reps-${targetEx.id}-${set.setNum}`}>
                    <input
                      id={`player-reps-${targetEx.id}-${set.setNum}`}
                      name={`reps-${targetEx.id}-${set.setNum}`}
                      type="text"
                      inputMode="decimal"
                      className="player-set-input"
                      value={set.reps}
                      onChange={(e) => updateSetInput(sIdx, 'reps', e.target.value, targetEx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          toggleSetComplete(sIdx, targetEx);
                        }
                      }}
                      aria-label={`${targetEx.name} Set ${set.setNum} ${profile.unitSuffix}`}
                    />
                  </label>
                  <button
                    type="button"
                    className="set-stepper-btn plus"
                    onClick={() => adjustSetReps(sIdx, 1, targetEx)}
                    aria-label={`Increase ${profile.statHeader.toLowerCase()} for set ${set.setNum}`}
                  >
                    <Plus size={15} strokeWidth={2.5} />
                  </button>
                </div>

                {showWeightCol && (
                  <div className={`set-stepper-field weight-field ${targetBodyweight ? 'optional-weight' : ''}`}>
                    <button
                      type="button"
                      className="set-stepper-btn minus"
                      onClick={() => adjustSetWeight(sIdx, -2.5, targetEx)}
                      aria-label={`Decrease weight for set ${set.setNum}`}
                    >
                      <Minus size={15} strokeWidth={2.5} />
                    </button>
                    <label className="set-stepper-input-wrap" htmlFor={`player-weight-${targetEx.id}-${set.setNum}`}>
                      <input
                        id={`player-weight-${targetEx.id}-${set.setNum}`}
                        name={`weight-${targetEx.id}-${set.setNum}`}
                        type="text"
                        inputMode="decimal"
                        className="player-set-input"
                        placeholder={set.prevWeight || (targetBodyweight ? 'BW' : '0')}
                        value={set.weight}
                        onChange={(e) => updateSetInput(sIdx, 'weight', e.target.value, targetEx)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            toggleSetComplete(sIdx, targetEx);
                          }
                        }}
                        aria-label={`${targetEx.name} Set ${set.setNum} weight in kg`}
                      />
                    </label>
                    <button
                      type="button"
                      className="set-stepper-btn plus"
                      onClick={() => adjustSetWeight(sIdx, 2.5, targetEx)}
                      aria-label={`Increase weight for set ${set.setNum}`}
                    >
                      <Plus size={15} strokeWidth={2.5} />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  className={`player-set-check ${set.completed ? 'checked' : ''} ${isNextUp ? 'next-up-check' : ''}`}
                  onClick={() => toggleSetComplete(sIdx, targetEx)}
                  aria-label={`Complete ${targetEx.name} set ${set.setNum}`}
                >
                  <Check size={16} strokeWidth={set.completed ? 3 : 2.5} />
                  <span>{set.completed ? 'Done' : (isNextUp ? 'Complete' : 'Log')}</span>
                </button>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderConsoleExerciseCard = (targetEx, memberMeta = null) => {
    const targetIdx = memberMeta ? memberMeta.mIdx : currentIndex;
    const isActiveCard = !memberMeta || memberMeta.mIdx === currentIndex;
    const targetSets = loggedSets[targetEx.id] || [];
    const targetDoneCount = targetSets.filter((s) => s.completed).length;
    const targetAllSetsDone = targetSets.length > 0 && targetDoneCount === targetSets.length;
    const targetMuscleName = MUSCLE_LABELS[targetEx.muscleKey] || targetEx.muscleKey;
    const targetHasImages = Boolean(targetEx.illustration || targetEx.illustrationEnd);

    return (
      <div
        key={targetEx.id || targetIdx}
        className={`studio-console-card ${memberMeta ? 'is-superset-member-card' : ''} ${memberMeta && isActiveCard ? 'is-active-superset-card' : ''}`}
      >
        <div
          className="studio-console-header"
          onClick={memberMeta && !isActiveCard ? () => focusSupersetPartner(targetIdx) : undefined}
        >
          <div className="studio-hero-info">
            <div className="studio-hero-main-row">
              {targetHasImages && targetEx.illustration && (
                <button
                  type="button"
                  className="player-mobile-thumb-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (memberMeta && !isActiveCard) {
                      focusSupersetPartner(targetIdx);
                      setIsMobileDemoExpanded(true);
                    } else {
                      setIsMobileDemoExpanded((prev) => !prev);
                    }
                  }}
                  title={isMobileDemoExpanded && isActiveCard ? 'Hide illustration' : 'Expand illustration'}
                  aria-label="Toggle exercise illustration"
                >
                  <img src={targetEx.illustration} alt={targetEx.name} />
                </button>
              )}

              <div className="studio-hero-copy">
                <div className="studio-header-top-row">
                  <h1 className="studio-exercise-title">{targetEx.name}</h1>

                  <div className="studio-header-actions">
                    <button
                      type="button"
                      className="studio-header-guide-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openGuideDrawer(memberMeta ? targetIdx : null);
                      }}
                      title={`Open Form Guide for ${targetEx.name} (G)`}
                    >
                      <BookOpen size={14} />
                      <span className="guide-btn-label-desktop">Form Guide</span>
                      <span className="guide-btn-label-mobile">Form</span>
                      {isActiveCard && <kbd className="guide-key-hint">G</kbd>}
                    </button>
                  </div>
                </div>

                <div className="studio-header-title-row">
                  <div className="studio-prescription-row">
                    <span className="prescription-pill">
                      <span className="prescription-type">Muscle</span>
                      <strong className="prescription-val">{targetMuscleName}</strong>
                    </span>
                    <span className="prescription-dot">·</span>
                    <span className="prescription-pill">
                      <span className="prescription-type">Equipment</span>
                      <strong className="prescription-val">{targetEx.equipment || 'Bodyweight'}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="player-logger-card studio-logger-card">
          <div className="player-logger-header">
            <div className="logger-title-group">
              <span className="prescription-pill">
                <span className="prescription-type">{memberMeta ? `#${memberMeta.code} Sets` : 'Sets'}</span>
                <strong className={`prescription-val ${targetAllSetsDone ? 'is-complete' : ''}`}>
                  {targetDoneCount}/{targetSets.length}
                </strong>
              </span>
              <span className="prescription-dot">·</span>
              <span className="prescription-pill">
                <span className="prescription-type">Target</span>
                <strong className="prescription-val">{formatTargetPrescription(targetEx)}</strong>
              </span>
              {shouldShowExerciseRpe(targetEx) && (
                <>
                  <span className="prescription-dot">·</span>
                  <span className="prescription-pill">
                    <span className="prescription-type">RPE</span>
                    <strong className="prescription-val">{targetEx.rpe}</strong>
                  </span>
                </>
              )}
              {targetEx.tempo && (
                <>
                  <span className="prescription-dot">·</span>
                  <span className="prescription-pill">
                    <span className="prescription-type">Tempo</span>
                    <strong className="prescription-val">{targetEx.tempo}</strong>
                  </span>
                </>
              )}
              {targetEx.lastRecord && (
                <>
                  <span className="prescription-dot">·</span>
                  <span className="prescription-pill">
                    <span className="prescription-type">Last</span>
                    <strong className="prescription-val">{targetEx.lastRecord}</strong>
                  </span>
                </>
              )}
            </div>

            <div className="studio-logger-tools">
              {(!doesExerciseUseExternalWeight(targetEx) || weightColumnOverrides[targetEx.id] !== undefined) && (
                <button
                  type="button"
                  className={`player-set-adj-btn is-subtle ${isWeightShownForExercise(targetEx) ? 'active' : ''}`}
                  onClick={() => toggleWeightColumnForExercise(targetEx)}
                  title={isWeightShownForExercise(targetEx) ? 'Hide weight column' : 'Log added weight'}
                >
                  {isWeightShownForExercise(targetEx) ? 'Hide Kg' : '+ Kg'}
                </button>
              )}
              <button
                type="button"
                className="player-set-adj-btn"
                onClick={() => addSetToExercise(false, targetEx)}
              >
                + Set
              </button>
              {targetSets.length > 1 && (
                <button
                  type="button"
                  className="player-set-adj-btn is-subtle"
                  onClick={() => removeLastSetFromExercise(targetEx)}
                  title="Remove last set"
                  aria-label="Remove last set"
                >
                  −
                </button>
              )}
            </div>
          </div>

          {isActiveCard && flowNotice && (
            <div className={`player-flow-notice ${flowNotice.type}`}>
              <span className="flow-notice-text">{flowNotice.text}</span>
            </div>
          )}

          {renderExerciseSetTable(targetEx)}
        </div>
      </div>
    );
  };

  const previewPartner = otherSupersetPartners.length > 0
    ? (otherSupersetPartners.find((p) => p.mIdx === supersetNextUp?.mIdx) || otherSupersetPartners[0])
    : null;

  const supersetPipDock = previewPartner ? (
    <div className="superset-pip-dock" aria-label="Superset partner preview">
      <button
        type="button"
        className={`superset-pip-card ${supersetNextUp?.mIdx === previewPartner.mIdx ? 'is-next-turn' : ''}`}
        onClick={() => focusSupersetPartner(previewPartner.mIdx)}
        title={`Switch preview to #${previewPartner.code}: ${previewPartner.ex.name}`}
        aria-label={`Switch preview to #${previewPartner.code} ${previewPartner.ex.name}`}
      >
        <div className="superset-pip-thumb">
          {previewPartner.ex.illustration ? (
            <img src={previewPartner.ex.illustration} alt={previewPartner.ex.name} loading="eager" />
          ) : (
            <Dumbbell size={20} color="var(--faint)" />
          )}
        </div>
      </button>
    </div>
  ) : null;

  const showStickyTimerRow = isTimerEnabled || timerConfig.hasWorkTimer || isResting;

  const handleResetActiveTimer = () => {
    resetTimer(isWorkMode ? timerConfig.workSeconds : defaultRest, timerMode, false);
  };

  const handleSkipRest = () => {
    setIsResting(false);
    restTargetTimestampRef.current = null;
    if (timerConfig.hasWorkTimer && nextIncompleteSetIdx >= 0) {
      resetTimer(timerConfig.workSeconds, 'work', false);
    } else {
      setRestSecondsLeft(0);
    }
  };

  const handleCompleteWorkTimerSet = () => {
    if (nextIncompleteSetIdx < 0) return;
    setIsResting(false);
    restTargetTimestampRef.current = null;
    toggleSetComplete(nextIncompleteSetIdx, currentExercise, { fromWorkTimer: true });
  };

  return (
    <div className="workout-player-overlay">
      <PlayerHeader
        routineTitle={routine.title}
        workoutElapsedSeconds={workoutElapsedSeconds}
        sessionVolumeKg={sessionVolumeKg}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onClose={handleClose}
        onRequestFinish={handleRequestFinish}
        formatTime={formatTime}
        isQueueOpen={isQueueOpen}
        onToggleQueueDrawer={toggleQueueDrawer}
        completedSetsCount={completedSetsCount}
        totalSetsAcrossWorkout={totalSetsAcrossWorkout}
        prevBlockExercise={prevBlockExercise}
        nextBlockExercise={nextBlockExercise}
        onGoToPrevBlock={goToPrevBlock}
        onGoToNextBlock={goToNextBlock}
        ribbonNodes={ribbonNodes}
        activeRibbonRef={activeRibbonRef}
        onGoToExercise={goToExercise}
        activeNavSetsDone={activeNavSetsDone}
      />

      {/* Main Focused Studio Stage */}
      <main className="player-main-stage">
        <div className="studio-container">
          <div className={`studio-grid ${currentSuperset && supersetMembers.length > 1 ? 'is-superset-grid' : ''}`}>
            {/* LEFT COLUMN: Hero Movement Stage (~65%) + Chronograph HUD Dock (~35%) */}
            <section className={`studio-visual-col studio-visual-card ${isMobileDemoExpanded ? 'mobile-demo-open' : ''}`}>
              {hasMedia ? (
                <div className={`studio-media-frame ${currentSuperset ? 'is-superset-media' : ''}`}>
                  <span className={`studio-phase-overlay-pill is-${currentPhase.key}`}>{currentPhase.label}</span>
                  {hasAnyImages && (
                    <div className={`studio-pose-grid ${hasTwoImages ? 'dual' : 'single'}`}>
                      {currentExercise.illustration && (
                        <div className="studio-pose-box">
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

                  {supersetPipDock}
                </div>
              ) : (
                <div className={`studio-media-placeholder ${currentSuperset ? 'is-superset-media' : ''}`}>
                  <span className={`studio-phase-overlay-pill is-${currentPhase.key}`}>{currentPhase.label}</span>
                  <Dumbbell size={36} color="var(--faint)" />
                  <span>{primaryMuscleName}</span>
                  {supersetPipDock}
                </div>
              )}

              {/* Precision Chronograph HUD Dock (Dial + Digital Readout & Dual Work/Rest Controls) */}
              <div className={`studio-ring-timer-box chrono-hud-dock ${isResting ? 'is-resting' : ''} ${isWorkMode ? 'is-work-mode' : 'is-rest-mode'} ${!showActiveTimerFace ? 'is-disabled' : ''}`}>
                <div className="chrono-dial-wrap">
                  <svg className="chrono-dial-svg" viewBox="0 0 100 100" aria-hidden="true">
                    <defs>
                      <linearGradient id="novaSomaChronoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#176A63" />
                        <stop offset="65%" stopColor="#24948A" />
                        <stop offset="100%" stopColor="#8C673A" />
                      </linearGradient>
                      <linearGradient id="novaSomaWorkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8C673A" />
                        <stop offset="65%" stopColor="#B8864D" />
                        <stop offset="100%" stopColor="#D6A96E" />
                      </linearGradient>
                    </defs>
                    {/* Fine Outer Watch Tick Marks */}
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="var(--border-hi)"
                      strokeWidth="2"
                      strokeDasharray="1.2 4.82"
                      opacity="0.55"
                    />
                    {/* Track Ring */}
                    <circle
                      cx="50"
                      cy="50"
                      r="39"
                      fill="none"
                      stroke="rgba(140, 103, 58, 0.2)"
                      strokeWidth="4.5"
                    />
                    {/* Active Progress Arc */}
                    {showActiveTimerFace && (
                      <circle
                        cx="50"
                        cy="50"
                        r="39"
                        fill="none"
                        stroke={isWorkMode ? 'url(#novaSomaWorkGrad)' : 'url(#novaSomaChronoGrad)'}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="245.04"
                        strokeDashoffset={245.04 * (1 - Math.max(0, Math.min(1, timerRatio)))}
                        className="chrono-progress-arc"
                      />
                    )}
                  </svg>

                  {showActiveTimerFace ? (
                    <button
                      type="button"
                      className={`chrono-play-btn ${isWorkMode ? 'is-work' : ''} ${isResting ? 'active' : ''}`}
                      onClick={toggleRestTimer}
                      title={
                        isWorkMode
                          ? (isResting ? `Pause ${timerConfig.workShortLabel.toLowerCase()} timer (Space)` : `Start ${timerConfig.workShortLabel.toLowerCase()} timer (Space)`)
                          : (isResting ? 'Pause rest timer (Space)' : 'Start rest timer (Space)')
                      }
                      aria-label={
                        isWorkMode
                          ? (isResting ? `Pause ${timerConfig.workShortLabel.toLowerCase()} timer` : `Start ${timerConfig.workShortLabel.toLowerCase()} timer`)
                          : (isResting ? 'Pause rest timer' : 'Start rest timer')
                      }
                    >
                      {isResting ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="chrono-play-btn is-off"
                      onClick={toggleExerciseTimerPreference}
                      title="Enable auto-rest timer for this exercise"
                      aria-label="Enable auto-rest timer"
                    >
                      <TimerOff size={17} />
                    </button>
                  )}
                </div>

                <div className="chrono-readout-col">
                  <div className="chrono-top-bar">
                    <span
                      className="chrono-kicker"
                      title={isWorkMode && nextIncompleteSetIdx >= 0 ? `Set ${nextIncompleteSetIdx + 1}` : undefined}
                    >
                      {isWorkMode ? (
                        isResting ? timerConfig.workActiveLabel : timerConfig.workLabel
                      ) : !isTimerEnabled && !isResting ? (
                        'REST TIMER OFF'
                      ) : isResting ? (
                        currentSuperset ? 'ROUND RESTING' : 'RESTING NOW'
                      ) : currentSuperset ? (
                        'ROUND REST'
                      ) : (
                        'REST TIMER'
                      )}
                    </span>

                    <div className="chrono-top-actions">
                      {timerConfig.hasWorkTimer && (
                        <div className="chrono-mode-switcher" role="group" aria-label="Timer purpose">
                          <button
                            type="button"
                            className={`chrono-mode-pill is-work ${isWorkMode ? 'active' : ''}`}
                            onClick={() => resetTimer(timerConfig.workSeconds, 'work', false)}
                            title={`Time the ${timerConfig.workShortLabel.toLowerCase()} (${formatTimerPresetChip(timerConfig.workSeconds)})`}
                          >
                            {timerConfig.workShortLabel}
                          </button>
                          <button
                            type="button"
                            className={`chrono-mode-pill is-rest ${!isWorkMode ? 'active' : ''}`}
                            onClick={() => resetTimer(defaultRest, 'rest', false)}
                            title={`Time recovery rest (${defaultRest}s)`}
                          >
                            Rest
                          </button>
                        </div>
                      )}

                      <div className="chrono-utility-btns">
                        {showActiveTimerFace && (
                          <button
                            type="button"
                            className="ring-timer-icon-btn"
                            onClick={handleResetActiveTimer}
                            title={isWorkMode ? `Reset ${timerConfig.workShortLabel.toLowerCase()} timer` : 'Reset rest timer'}
                            aria-label="Reset timer"
                          >
                            <RotateCcw size={13} />
                          </button>
                        )}
                        <button
                          type="button"
                          className={`ring-timer-icon-btn ${!isTimerEnabled ? 'off' : ''}`}
                          onClick={toggleExerciseTimerPreference}
                          title={isTimerEnabled ? 'Disable auto-rest timer after sets' : 'Enable auto-rest timer after sets'}
                          aria-label={isTimerEnabled ? 'Disable auto-rest timer' : 'Enable auto-rest timer'}
                        >
                          {isTimerEnabled ? <TimerOff size={13} /> : <Timer size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="chrono-clock-row">
                    <strong className="chrono-digital-clock">
                      {showActiveTimerFace ? formatTime(restSecondsLeft) : 'OFF'}
                    </strong>
                  </div>

                  <div className="chrono-presets-strip">
                    {showActiveTimerFace ? (
                      <div className="ring-timer-pills">
                        {isResting ? (
                          isWorkMode ? (
                            <>
                              <button type="button" className="ring-timer-chip" onClick={() => adjustRestTime(-workBumpDelta)}>
                                {timerConfig.isMinutes ? '-1m' : '-15s'}
                              </button>
                              <button type="button" className="ring-timer-chip" onClick={() => adjustRestTime(workBumpDelta)}>
                                {timerConfig.isMinutes ? '+1m' : '+15s'}
                              </button>
                              <button type="button" className="ring-timer-chip" onClick={() => adjustRestTime(workBumpDelta * 2)}>
                                {timerConfig.isMinutes ? '+2m' : '+30s'}
                              </button>
                              {nextIncompleteSetIdx >= 0 && (
                                <button
                                  type="button"
                                  className="ring-timer-chip skip is-log-set"
                                  onClick={handleCompleteWorkTimerSet}
                                  title={`Mark Set ${nextIncompleteSetIdx + 1} complete`}
                                >
                                  <Check size={12} strokeWidth={2.75} />
                                  <span>Log Set</span>
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              <button type="button" className="ring-timer-chip" onClick={() => adjustRestTime(-15)}>
                                -15s
                              </button>
                              <button type="button" className="ring-timer-chip" onClick={() => adjustRestTime(15)}>
                                +15s
                              </button>
                              <button type="button" className="ring-timer-chip" onClick={() => adjustRestTime(30)}>
                                +30s
                              </button>
                              <button
                                type="button"
                                className="ring-timer-chip skip"
                                onClick={handleSkipRest}
                                title="Skip remaining rest"
                              >
                                <SkipForward size={12} />
                                <span>Skip</span>
                              </button>
                            </>
                          )
                        ) : isWorkMode ? (
                          <>
                            {workPresets.map((s) => (
                              <button
                                key={s}
                                type="button"
                                className={`ring-timer-chip ${restInitialSeconds === s ? 'active' : ''}`}
                                onClick={() => resetTimer(s, 'work', false)}
                              >
                                {formatTimerPresetChip(s)}
                              </button>
                            ))}
                            <button type="button" className="ring-timer-chip bump" onClick={() => adjustRestTime(workBumpDelta)}>
                              {timerConfig.isMinutes ? '+1m' : '+15s'}
                            </button>
                          </>
                        ) : (
                          <>
                            {restPresets.map((s) => (
                              <button
                                key={s}
                                type="button"
                                className={`ring-timer-chip ${restInitialSeconds === s ? 'active' : ''}`}
                                onClick={() => resetTimer(s, 'rest', false)}
                              >
                                {s}s
                              </button>
                            ))}
                            <button type="button" className="ring-timer-chip bump" onClick={() => adjustRestTime(15)}>
                              +15s
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="ring-timer-enable-btn"
                        onClick={toggleExerciseTimerPreference}
                      >
                        Enable Rest Timer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT COLUMN: Unified Studio Console Card (or Stacked Superset Cards) */}
            <section className={`studio-console-col ${currentSuperset && supersetMembers.length > 1 ? 'is-superset-stack' : 'is-single-card'}`}>
              {currentSuperset && supersetMembers.length > 1
                ? supersetMembers.map((member) => renderConsoleExerciseCard(member.ex, member))
                : renderConsoleExerciseCard(currentExercise, null)}
            </section>
          </div>
        </div>
      </main>

      {/* Mobile & Tablet Portrait Sticky Bottom HUD (<= 720px only) */}
      <div className={`player-sticky-dock ${isResting ? 'is-resting' : ''} ${isWorkMode ? 'is-work-mode' : 'is-rest-mode'} ${!showStickyTimerRow ? 'no-timer-bar' : ''}`}>
        {showStickyTimerRow && (
          <div className="dock-timer-surface">
            <div className="dock-timer-meta-row">
              <div className="dock-meta-left">
                {timerConfig.hasWorkTimer ? (
                  <div className="dock-mode-segmented" role="group" aria-label="Timer purpose">
                    <button
                      type="button"
                      className={`dock-mode-seg-btn is-work ${isWorkMode ? 'active' : ''}`}
                      onClick={() => resetTimer(timerConfig.workSeconds, 'work', false)}
                    >
                      {timerConfig.workShortLabel}
                    </button>
                    <button
                      type="button"
                      className={`dock-mode-seg-btn is-rest ${!isWorkMode ? 'active' : ''}`}
                      onClick={() => resetTimer(defaultRest, 'rest', false)}
                    >
                      Rest
                    </button>
                  </div>
                ) : (
                  <span className="dock-timer-kicker">
                    {isResting && <span className="dock-live-dot" aria-hidden="true" />}
                    {currentSuperset ? 'ROUND REST' : isResting ? 'RESTING NOW' : 'REST TIMER'}
                  </span>
                )}
              </div>

              <div className="dock-meta-actions">
                <button
                  type="button"
                  className="dock-icon-util-btn"
                  onClick={handleResetActiveTimer}
                  title={isWorkMode ? `Reset ${timerConfig.workShortLabel.toLowerCase()} timer` : 'Reset rest timer'}
                  aria-label="Reset timer"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  type="button"
                  className={`dock-icon-util-btn ${!isTimerEnabled ? 'is-off' : ''}`}
                  onClick={toggleExerciseTimerPreference}
                  title={isTimerEnabled ? 'Disable auto-rest timer' : 'Enable auto-rest timer'}
                  aria-label="Toggle auto-rest timer"
                >
                  {isTimerEnabled ? <TimerOff size={13} /> : <Timer size={13} />}
                </button>
              </div>
            </div>

            <div className="dock-progress-rail" aria-hidden="true">
              <span style={{ width: `${Math.round(timerRatio * 100)}%` }} />
            </div>

            <div className="dock-timer-main-row">
                <div className="dock-clock-group">
                  <strong className="sticky-timer-clock">{formatTime(restSecondsLeft)}</strong>
                  <span className="dock-clock-sub">
                    {isResting
                      ? (isWorkMode ? (timerConfig.isHold ? 'Holding' : 'Working') : 'Recovering')
                      : `${formatTimerPresetChip(isWorkMode ? timerConfig.workSeconds : defaultRest)} target`}
                  </span>
                </div>

                <div className="sticky-dock-timer-btns">
                  <button
                    type="button"
                    className="dock-step-btn"
                    onClick={() => adjustRestTime(-stickyTimerStep)}
                    aria-label={`Decrease timer by ${formatTimerPresetChip(stickyTimerStep)}`}
                  >
                    −{formatTimerPresetChip(stickyTimerStep)}
                  </button>
                  <button
                    type="button"
                    className={`dock-play-btn ${isResting ? 'active' : ''}`}
                    onClick={toggleRestTimer}
                    aria-label={isResting ? 'Pause timer' : 'Start timer'}
                  >
                    {isResting ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
                  </button>
                  <button
                    type="button"
                    className="dock-step-btn"
                    onClick={() => adjustRestTime(stickyTimerStep)}
                    aria-label={`Increase timer by ${formatTimerPresetChip(stickyTimerStep)}`}
                  >
                    +{formatTimerPresetChip(stickyTimerStep)}
                  </button>
                  {isResting && isWorkMode && nextIncompleteSetIdx >= 0 && (
                    <button
                      type="button"
                      className="dock-context-pill is-log"
                      onClick={handleCompleteWorkTimerSet}
                      title={`Mark Set ${nextIncompleteSetIdx + 1} complete`}
                    >
                      <Check size={13} strokeWidth={2.75} />
                      <span>Log</span>
                    </button>
                  )}
                  {isResting && !isWorkMode && (
                    <button
                      type="button"
                      className="dock-context-pill is-skip"
                      onClick={handleSkipRest}
                      title="Skip remaining rest"
                    >
                      <SkipForward size={13} />
                      <span>Skip</span>
                    </button>
                  )}
              </div>
            </div>
          </div>
        )}

        <div className="sticky-dock-nav-row">
          <button
            type="button"
            className="player-nav-prev dock-nav-prev"
            onClick={goToPrevBlock}
            disabled={!prevBlockExercise}
            title={!prevBlockExercise ? 'First block in workout' : `Previous: ${prevBlockExercise.name}`}
            aria-label={!prevBlockExercise ? 'First block in workout' : `Previous exercise: ${prevBlockExercise.name}`}
          >
            <span className="nav-prev-icon-wrap" aria-hidden="true">
              <ArrowLeft size={16} />
            </span>
            <span className="nav-btn-copy">
              <small className="nav-btn-kicker">
                {!prevBlockExercise ? 'START' : 'PREVIOUS'}
              </small>
              <strong className="nav-btn-name">
                {!prevBlockExercise ? 'First Exercise' : prevBlockExercise.name}
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

          {nextBlockExercise ? (
            <button
              type="button"
              className={`player-nav-next dock-nav-next ${activeNavSetsDone ? 'ready-advance' : ''}`}
              onClick={goToNextBlock}
              aria-label={`Next: ${nextBlockExercise.name}`}
            >
              <span className="nav-btn-copy">
                <small className="nav-btn-kicker">
                  {activeNavSetsDone ? 'DONE · NEXT' : 'NEXT'}
                </small>
                <strong className="nav-btn-name">{nextBlockExercise.name}</strong>
              </span>
              <span className="nav-next-arrow-badge" aria-hidden="true">
                <ArrowRight size={17} />
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="player-nav-next finish-mode ready-advance dock-nav-next"
              onClick={handleRequestFinish}
              aria-label="Finish and save workout"
            >
              <span className="nav-btn-copy">
                <small className="nav-btn-kicker">FINAL BLOCK</small>
                <strong className="nav-btn-name">Finish &amp; Save Workout</strong>
              </span>
              <span className="nav-next-arrow-badge" aria-hidden="true">
                <Trophy size={17} />
              </span>
            </button>
          )}
        </div>
      </div>

      <PlayerQueueDrawer
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        currentPhase={currentPhase}
        routineTitle={routine.title}
        completedSetsCount={completedSetsCount}
        totalSetsAcrossWorkout={totalSetsAcrossWorkout}
        completedExercisesCount={completedExercisesCount}
        totalExercisesCount={exercises.length}
        workoutElapsedSeconds={workoutElapsedSeconds}
        formatTime={formatTime}
        warmupQueueItems={warmupQueueItems}
        mainQueueItems={mainQueueItems}
        decompressionQueueItems={decompressionQueueItems}
        renderPhaseQueueEntries={renderPhaseQueueEntries}
      />

      <PlayerGuideDrawer
        isOpen={isGuideOpen}
        onClose={closeGuideDrawer}
        guideExercise={guideExercise}
        guidePhaseInfo={guidePhaseInfo}
        guidePrimaryMuscleName={guidePrimaryMuscleName}
        guideVariations={guideVariations}
        currentSuperset={currentSuperset}
        supersetMembers={supersetMembers}
        resolvedGuideIdx={resolvedGuideIdx}
        onSelectGuideExercise={setGuideExerciseIdx}
        guideTab={guideTab}
        onSelectGuideTab={setGuideTab}
        guideExecution={guideExecution}
        guideCommonMistakes={guideCommonMistakes}
      />

      <FinishWorkoutModal
        isOpen={confirmFinishOpen}
        completedSetsCount={completedSetsCount}
        totalSetsAcrossWorkout={totalSetsAcrossWorkout}
        onClose={() => setConfirmFinishOpen(false)}
        onDiscard={handleDiscardWorkout}
        onConfirmFinish={handleConfirmFinish}
      />

      <UndoToast
        toast={undoToast}
        onUndo={triggerUndo}
        onDismiss={dismissToast}
        onPause={pauseUndoTimer}
        onResume={resumeUndoTimer}
        inPlayer
      />
    </div>
  );
}

export default ActiveWorkoutModal;
