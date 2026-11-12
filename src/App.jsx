import React, { useState, useEffect } from 'react';
import { HardDrive, AlertTriangle, X } from 'lucide-react';
import { INITIAL_ROUTINES } from './data/workouts';
import { EXERCISE_DATABASE } from './data/exerciseDatabase';
import { calculateSessionVolumeKg } from './utils/analytics';
import {
  STORAGE_KEYS,
  STORAGE_ERROR_EVENT,
  safeReadString,
  safeReadJson,
  safeWriteJson,
  safeWriteString,
  safeRemoveItem,
} from './utils/storage';
import { insertExerciseByPhase } from './utils/workoutSets';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { WorkoutOverviewView } from './components/WorkoutOverviewView';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';
import { WorkoutSummaryModal } from './components/WorkoutSummaryModal';
import { ExerciseDatabaseView } from './components/ExerciseDatabaseView';
import { DataBackupModal } from './components/DataBackupModal';
import { WorkoutHistoryModal } from './components/WorkoutHistoryModal';
import './App.css';

function parseHashRoute() {
  if (typeof window === 'undefined') {
    return { view: 'home', routineId: null };
  }
  const hash = window.location.hash || '';
  if (hash === '#library') {
    return { view: 'database', routineId: null };
  }
  if (hash.startsWith('#workout/')) {
    const id = decodeURIComponent(hash.slice('#workout/'.length));
    if (id) return { view: 'overview', routineId: id };
  }
  return { view: 'home', routineId: null };
}

function buildHashRoute(view, routineId) {
  if (view === 'database') return '#library';
  if (view === 'overview' && routineId) {
    return `#workout/${encodeURIComponent(routineId)}`;
  }
  return '#home';
}

const ROUTINES_STORAGE_KEY = STORAGE_KEYS.ROUTINES;
const EXERCISES_STORAGE_KEY = STORAGE_KEYS.EXERCISES;
const HISTORY_STORAGE_KEY = STORAGE_KEYS.HISTORY;
const SEEDED_CANONICAL_KEY = STORAGE_KEYS.SEEDED_CANONICAL;
const EN_LOCALIZATION_KEY = STORAGE_KEYS.EN_LOCALIZATION;

function deriveLastRecordFromSets(sets) {
  if (!Array.isArray(sets)) return null;
  const completed = sets.filter((s) => s.completed);
  if (completed.length === 0) return null;

  let best = completed[completed.length - 1];
  let maxWeight = -1;
  completed.forEach((s) => {
    const w = parseFloat(String(s.weight ?? '').replace(',', '.'));
    if (Number.isFinite(w) && w >= maxWeight) {
      maxWeight = w;
      best = s;
    }
  });

  const weightStr = String(best.weight ?? '').trim();
  const repsStr = String(best.reps ?? '').trim();
  if (weightStr && repsStr) return `${weightStr}kg × ${repsStr}`;
  if (weightStr) return `${weightStr}kg`;
  if (repsStr) return `${repsStr} reps`;
  return null;
}

const LEGACY_ROUTINE_TITLES = {
  'Leg Workout 1 (Focus Squat & Catena Posteriore)': 'Leg Workout 1',
  'Leg Workout 2 (Focus Squat Pesante & Flessione Ginocchio)': 'Leg Workout 2'
};

function normalizeRoutineTitle(title) {
  return LEGACY_ROUTINE_TITLES[title] || title;
}

function normalizeRepUnits(reps) {
  if (!reps) return reps;
  return String(reps)
    .replace(/\/lato\b|per lato/gi, '/side')
    .replace(/\/gamba\b|per gamba/gi, '/leg')
    .replace(/secondi/gi, 'sec')
    .trim();
}

const LEGACY_REPLACED_EXERCISES = {
  'wu-side-plank-leg-raise': {
    canonicalId: 'ex-copenhagen-plank',
    warmupId: 'wu-copenhagen-plank'
  },
  'wu-feet-elevated-glute-bridge': {
    canonicalId: 'ex-elevated-single-leg-glute-bridge',
    warmupId: 'wu-elevated-single-leg-glute-bridge'
  }
};

function mergeMissingCanonical(ex) {
  const legacyReplacement = LEGACY_REPLACED_EXERCISES[ex.id];
  if (legacyReplacement) {
    const replacement = EXERCISE_DATABASE.find(c => c.id === legacyReplacement.canonicalId);
    if (replacement) {
      return {
        ...replacement,
        sourceId: replacement.id,
        id: ex.isWarmup ? legacyReplacement.warmupId : replacement.id,
        phase: ex.isWarmup ? 'warmup' : 'main',
        isWarmup: Boolean(ex.isWarmup)
      };
    }
  }
  const lookupId = ex.sourceId || ex.id;
  const canonical = EXERCISE_DATABASE.find(c => c.id === lookupId);
  if (!canonical) return ex;
  return {
    ...canonical,
    ...ex,
    // Canonical data from code always takes precedence for reference guide content:
    name: canonical.name,
    subtitle: canonical.subtitle,
    scientificName: canonical.scientificName,
    pattern: canonical.pattern,
    equipment: canonical.equipment,
    requiresEquipment: typeof canonical.requiresEquipment === 'boolean' ? canonical.requiresEquipment : (typeof ex.requiresEquipment === 'boolean' ? ex.requiresEquipment : true),
    mechanics: canonical.mechanics,
    level: canonical.level,
    targetMuscles: canonical.targetMuscles,
    execution: canonical.execution,
    illustration: canonical.illustration,
    customVideoUrl: canonical.customVideoUrl || ex.customVideoUrl,
    // Workout composition fields preserved from user planning:
    id: ex.id || canonical.id,
    sourceId: canonical.id,
    phase: ex.phase || (canonical.isWarmup ? 'warmup' : 'main'),
    isWarmup: typeof ex.isWarmup === 'boolean' ? ex.isWarmup : Boolean(canonical.isWarmup),
    defaultSets: ex.defaultSets ?? canonical.defaultSets ?? 3,
    defaultReps: ex.defaultReps ? normalizeRepUnits(ex.defaultReps) : (canonical.defaultReps || '8-12'),
    defaultRestSeconds: ex.defaultRestSeconds ?? canonical.defaultRestSeconds ?? 90,
    defaultDropSets: ex.defaultDropSets ?? 0,
    supersetGroup: ex.supersetGroup ?? null,
    lastRecord: ex.lastRecord ?? null
  };
}

export function App() {
  // Pulizia iniziale di eventuali chiavi legacy e registrazione catalogo seed corrente
  useEffect(() => {
    try {
      [
        'corpo_routines',
        'corpo_routines_v1',
        'corpo_routines_v2',
        'corpo_routines_v3',
        'corpo_routines_v4',
        'corpo_user_routines_v5',
        'corpo_user_routines_v6',
        'corpo_custom_database',
        'corpo_custom_database_v1',
        'corpo_custom_database_v2',
        'corpo_custom_database_v3',
        'corpo_custom_database_v4',
        'corpo_user_exercises_v5',
        'corpo_user_routines_clean'
      ].forEach(k => safeRemoveItem(k));

      const prevSeeded = safeReadJson(SEEDED_CANONICAL_KEY, []);
      const mergedSeeded = Array.from(new Set([
        ...(Array.isArray(prevSeeded) ? prevSeeded : []),
        ...EXERCISE_DATABASE.map(e => e.id)
      ]));
      safeWriteJson(SEEDED_CANONICAL_KEY, mergedSeeded);
      safeWriteString(EN_LOCALIZATION_KEY, '1');
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  // Canonical exercise database (always sourced from modular code)
  const [exerciseDatabase, setExerciseDatabase] = useState(() => {
    return EXERCISE_DATABASE;
  });

  // User workout routines
  const [routines, setRoutines] = useState(() => {
    const saved = safeReadJson(ROUTINES_STORAGE_KEY, null);
    if (saved && Array.isArray(saved)) {
      try {
        const savedIds = new Set(saved.map(r => r.id));
        const missingInitial = INITIAL_ROUTINES.filter(initR => !savedIds.has(initR.id));
        const mappedSaved = saved.map(routine => {
          const canonicalRoutine = INITIAL_ROUTINES.find(r => r.id === routine.id);
          return {
            ...routine,
            title: normalizeRoutineTitle(routine.title),
            category: canonicalRoutine ? canonicalRoutine.category : routine.category,
            difficulty: canonicalRoutine ? canonicalRoutine.difficulty : routine.difficulty,
            equipmentTags: canonicalRoutine ? canonicalRoutine.equipmentTags : routine.equipmentTags,
            description: canonicalRoutine ? canonicalRoutine.description : routine.description,
            exercises: (routine.exercises || []).map(ex => mergeMissingCanonical(ex))
          };
        });
        return [...mappedSaved, ...missingInitial];
      } catch {
        // Fallback to initial routines
      }
    }
    return INITIAL_ROUTINES;
  });

  // Theme: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    return safeReadString(STORAGE_KEYS.THEME, 'dark') || 'dark';
  });
  const [weeklyGoal, setWeeklyGoal] = useState(() => {
    const savedGoal = Number(safeReadString(STORAGE_KEYS.WEEKLY_GOAL, '4'));
    return Number.isFinite(savedGoal) && savedGoal >= 1 && savedGoal <= 7 ? savedGoal : 4;
  });
  const [storageWarning, setStorageWarning] = useState(null);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const handleStorageError = (e) => {
      if (e?.detail) setStorageWarning(e.detail);
    };
    window.addEventListener(STORAGE_ERROR_EVENT, handleStorageError);
    return () => window.removeEventListener(STORAGE_ERROR_EVENT, handleStorageError);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    safeWriteString(STORAGE_KEYS.THEME, theme);
    const metaTheme = document.getElementById('meta-theme-color');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0A0908' : '#F7F4F0');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    safeWriteString(STORAGE_KEYS.WEEKLY_GOAL, String(weeklyGoal));
  }, [weeklyGoal]);

  // Active view: 'home' | 'overview' | 'database'
  const [initialRoute] = useState(() => parseHashRoute());
  const [currentView, setCurrentView] = useState(initialRoute.view);
  const [activeRoutineId, setActiveRoutineId] = useState(initialRoute.routineId);

  useEffect(() => {
    const syncFromHash = () => {
      const next = parseHashRoute();
      setCurrentView(next.view);
      setActiveRoutineId(next.routineId);
    };
    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);
    return () => {
      window.removeEventListener('popstate', syncFromHash);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  const handleChangeWeeklyGoal = (nextGoal) => {
    const parsed = Math.min(7, Math.max(1, Math.round(Number(nextGoal) || 4)));
    setWeeklyGoal(parsed);
  };

  // Modal di allenamento live
  const [isPresentationActive, setIsPresentationActive] = useState(false);
  const [liveRoutine, setLiveRoutine] = useState(null);
  const [startExerciseIndex, setStartExerciseIndex] = useState(0);

  // Riepilogo a fine allenamento
  const [completedSummary, setCompletedSummary] = useState(null);

  // Storico allenamenti
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = safeReadJson(HISTORY_STORAGE_KEY, null);
    if (saved && Array.isArray(saved)) {
      try {
        return saved.map((entry) => ({
          ...entry,
          routineTitle: normalizeRoutineTitle(entry.routineTitle)
        }));
      } catch {
        // Ignore malformed history
      }
    }
    return [];
  });

  useEffect(() => {
    safeWriteJson(ROUTINES_STORAGE_KEY, routines);
  }, [routines]);

  useEffect(() => {
    safeWriteJson(EXERCISES_STORAGE_KEY, exerciseDatabase);
  }, [exerciseDatabase]);

  useEffect(() => {
    safeWriteJson(HISTORY_STORAGE_KEY, workoutHistory);
  }, [workoutHistory]);

  const currentRoutine = routines.find(r => r.id === activeRoutineId) || routines[0] || null;
  const playableRoutine = (currentView === 'overview' && currentRoutine?.exercises?.length > 0)
    ? currentRoutine
    : routines.find(r => r.exercises?.length > 0) || null;

  const navigateToView = (view, routineId = null, { scroll = true } = {}) => {
    setCurrentView(view);
    setActiveRoutineId(routineId);
    const nextHash = buildHashRoute(view, routineId);
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    if (scroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigation & routine management
  const handleNavigateHome = () => {
    navigateToView('home', null);
  };

  const handleNavigateToDatabase = () => {
    navigateToView('database', null);
  };

  const handleSelectRoutineToView = (id) => {
    navigateToView('overview', id);
  };

  const handleStartRoutineLive = (id, index = 0) => {
    const target = routines.find(r => r.id === id) || routines[0];
    if (!target) return;
    if (!target.exercises || target.exercises.length === 0) {
      handleSelectRoutineToView(target.id);
      return;
    }
    setLiveRoutine(target);
    setStartExerciseIndex(index);
    setIsPresentationActive(true);
  };

  const handleCreateRoutine = (newWorkout) => {
    setRoutines(prev => [newWorkout, ...prev]);
    navigateToView('overview', newWorkout.id, { scroll: false });
  };

  const handleUpdateRoutine = (updatedWorkout) => {
    setRoutines(prev => prev.map(r => r.id === updatedWorkout.id ? updatedWorkout : r));
    setLiveRoutine(prev => (prev?.id === updatedWorkout.id ? updatedWorkout : prev));
  };

  const handleDuplicateRoutine = (routineId) => {
    const source = routines.find(r => r.id === routineId);
    if (!source) return;
    const baseTitle = source.title.replace(/\s*\(Copy(?:\s+\d+)?\)$/i, '');
    const copy = {
      ...source,
      id: `routine-${Date.now()}`,
      title: `${baseTitle} (Copy)`,
      shortTitle: `${source.shortTitle || baseTitle} (Copy)`,
      exercises: (source.exercises || []).map((ex) => ({
        ...ex,
        sourceId: ex.sourceId || ex.id,
      })),
    };
    setRoutines(prev => [copy, ...prev]);
  };

  const handleDeleteRoutine = (routineId) => {
    setRoutines(prev => prev.filter(r => r.id !== routineId));
    if (activeRoutineId === routineId) {
      navigateToView('home', null, { scroll: false });
    }
  };

  const handleDeleteWorkoutSession = (sessionId) => {
    setWorkoutHistory(prev => prev.filter(s => (s.id || s.date) !== sessionId));
  };

  const handleAddExerciseToRoutine = (routineId, exerciseData) => {
    setRoutines(prev => prev.map(routine => {
      if (routine.id !== routineId) return routine;
      const existing = routine.exercises || [];
      const alreadyExists = existing.some(ex => ex.id === exerciseData.id);
      const instance = {
        ...exerciseData,
        sourceId: exerciseData.sourceId || exerciseData.id,
        id: alreadyExists ? `${exerciseData.id}-${Date.now()}` : exerciseData.id,
        phase: exerciseData.isWarmup ? 'warmup' : 'main',
        isWarmup: Boolean(exerciseData.isWarmup)
      };
      return {
        ...routine,
        exercises: insertExerciseByPhase(existing, instance)
      };
    }));
  };

  const handleWorkoutComplete = (summaryData) => {
    const nowIso = new Date().toISOString();
    const newEntry = {
      ...summaryData,
      id: `w-${Date.now()}`,
      routineId: liveRoutine?.id || null,
      routineTitle: liveRoutine?.title || 'Workout',
      volumeKg: typeof summaryData?.volumeKg === 'number'
        ? summaryData.volumeKg
        : calculateSessionVolumeKg(summaryData?.loggedSets),
      date: nowIso,
      completedAt: nowIso
    };

    safeRemoveItem(STORAGE_KEYS.ACTIVE_DRAFT);

    // Update lastRecord on matching exercises in routines & exercise library
    const recordsByKey = {};
    if (summaryData?.loggedSets && typeof summaryData.loggedSets === 'object') {
      Object.entries(summaryData.loggedSets).forEach(([exId, sets]) => {
        const record = deriveLastRecordFromSets(sets);
        if (!record) return;
        recordsByKey[exId] = record;
        const strippedId = exId.replace(/-\d{10,}$/, '').replace(/^wu-/, 'ex-');
        recordsByKey[strippedId] = record;
        if (Array.isArray(sets)) {
          const sourceId = sets.find((s) => s?.sourceId)?.sourceId;
          if (sourceId) recordsByKey[sourceId] = record;
        }
      });
    }

    if (Object.keys(recordsByKey).length > 0) {
      setRoutines(prev => prev.map(r => ({
        ...r,
        exercises: (r.exercises || []).map((ex) => {
          const matchedRecord = recordsByKey[ex.id] || (ex.sourceId ? recordsByKey[ex.sourceId] : null);
          return matchedRecord ? { ...ex, lastRecord: matchedRecord } : ex;
        })
      })));
      setExerciseDatabase(prev => prev.map((ex) => {
        const matchedRecord = recordsByKey[ex.id] || (ex.sourceId ? recordsByKey[ex.sourceId] : null);
        return matchedRecord ? { ...ex, lastRecord: matchedRecord } : ex;
      }));
    }

    setWorkoutHistory(prev => [newEntry, ...prev]);
    setIsPresentationActive(false);
    setCompletedSummary(newEntry);
  };

  const handleRestoreBackup = (restored) => {
    safeRemoveItem(STORAGE_KEYS.ACTIVE_DRAFT);
    setStorageWarning(null);
    setRoutines(restored.routines);
    setExerciseDatabase(restored.exerciseDatabase);
    setWorkoutHistory(restored.workoutHistory);
    setTheme(restored.theme);
    if (Number.isFinite(restored.weeklyGoal)) {
      handleChangeWeeklyGoal(restored.weeklyGoal);
    }
    navigateToView('home', null, { scroll: false });
  };

  return (
    <div className="gymmane-app">
      {/* Top Navigation */}
      <Navbar 
        currentView={currentView}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigateHome={handleNavigateHome}
        onNavigateDatabase={handleNavigateToDatabase}
        onStartPresentation={() => {
          if (playableRoutine) {
            handleStartRoutineLive(playableRoutine.id, 0);
          } else {
            handleNavigateHome();
          }
        }}
        hasPlayableRoutine={Boolean(playableRoutine)}
      />

      {storageWarning && (
        <div className="storage-warning-banner" role="alert">
          <div className="gymmane-wrap storage-warning-inner">
            <div className="storage-warning-text">
              <AlertTriangle size={16} />
              <span>{storageWarning}</span>
            </div>
            <div className="storage-warning-actions">
              <button
                type="button"
                className="storage-warning-btn"
                onClick={() => setIsDataModalOpen(true)}
              >
                Backup Data
              </button>
              <button
                type="button"
                className="storage-warning-close"
                onClick={() => setStorageWarning(null)}
                aria-label="Dismiss warning"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="app-main-content">
        {currentView === 'home' && (
          <HomeView 
            routines={routines}
            exerciseDatabase={exerciseDatabase}
            workoutHistory={workoutHistory}
            weeklyGoal={weeklyGoal}
            onChangeWeeklyGoal={handleChangeWeeklyGoal}
            onOpenHistory={() => setIsHistoryOpen(true)}
            onSelectRoutineToView={handleSelectRoutineToView}
            onStartRoutineLive={(id) => handleStartRoutineLive(id, 0)}
            onCreateRoutine={handleCreateRoutine}
            onDuplicateRoutine={handleDuplicateRoutine}
            onDeleteRoutine={handleDeleteRoutine}
          />
        )}

        {currentView === 'overview' && (
          currentRoutine ? (
            <WorkoutOverviewView 
              workout={currentRoutine}
              exerciseDatabase={exerciseDatabase}
              onBack={handleNavigateHome}
              onStartLive={(idx) => handleStartRoutineLive(currentRoutine.id, idx)}
              onUpdateWorkout={handleUpdateRoutine}
              onDeleteWorkout={handleDeleteRoutine}
            />
          ) : (
            <div className="gymmane-wrap" style={{ padding: '40px 0', textAlign: 'center' }}>
              <p>No workout selected.</p>
              <button 
                type="button" 
                className="btn-gymmane-primary"
                onClick={handleNavigateHome}
                style={{ marginTop: '16px' }}
              >
                Back to Home
              </button>
            </div>
          )
        )}

        {currentView === 'database' && (
          <ExerciseDatabaseView 
            exercisesList={exerciseDatabase}
            routines={routines}
            workoutHistory={workoutHistory}
            onAddExerciseToRoutine={handleAddExerciseToRoutine}
            onBack={handleNavigateHome}
          />
        )}
      </main>

      {/* Presentation Fullscreen Mode (1 exercise at a time) */}
      {isPresentationActive && liveRoutine && (
        <ActiveWorkoutModal 
          key={`${liveRoutine.id}-${startExerciseIndex}`}
          routine={liveRoutine}
          initialIndex={startExerciseIndex}
          workoutHistory={workoutHistory}
          theme={theme}
          onToggleTheme={toggleTheme}
          onUpdateRoutine={handleUpdateRoutine}
          onClose={() => setIsPresentationActive(false)}
          onCompleteWorkout={handleWorkoutComplete}
        />
      )}

      {/* Celebration Modal */}
      {completedSummary && liveRoutine && (
        <WorkoutSummaryModal 
          summary={completedSummary}
          routine={liveRoutine}
          onClose={() => setCompletedSummary(null)}
          onRestart={() => {
            safeRemoveItem(STORAGE_KEYS.ACTIVE_DRAFT);
            setCompletedSummary(null);
            handleStartRoutineLive(liveRoutine.id, 0);
          }}
        />
      )}

      {/* Local Data & Backup Modal */}
      {isDataModalOpen && (
        <DataBackupModal
          routines={routines}
          exerciseDatabase={exerciseDatabase}
          workoutHistory={workoutHistory}
          theme={theme}
          weeklyGoal={weeklyGoal}
          onRestoreBackup={handleRestoreBackup}
          onClose={() => setIsDataModalOpen(false)}
        />
      )}

      {/* Workout History Log Modal */}
      {isHistoryOpen && (
        <WorkoutHistoryModal
          workoutHistory={workoutHistory}
          exerciseDatabase={exerciseDatabase}
          onDeleteSession={handleDeleteWorkoutSession}
          onClose={() => setIsHistoryOpen(false)}
        />
      )}

      {/* Minimal Footer */}
      <footer className="gymmane-footer">
        <div className="gymmane-wrap footer-inner">
          <div>
            <span className="footer-brand-title">NOVA SOMA</span>
            <p>Minimalist biomechanics & personal workout journal • A Nova Psiche project</p>
          </div>
          <div className="footer-right-group">
            <span className="footer-right-note">
              Stored locally on your device • No account • No cloud tracking
            </span>
            <button
              type="button"
              className="footer-data-btn"
              onClick={() => setIsDataModalOpen(true)}
            >
              <HardDrive size={14} />
              <span>Local Data &amp; Backup</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
