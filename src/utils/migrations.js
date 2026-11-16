import { INITIAL_ROUTINES } from '../data/workouts.js';
import { EXERCISE_DATABASE } from '../data/exerciseDatabase.js';
import { formatLoggedSetSummary } from './workoutSets.js';
import {
  STORAGE_KEYS,
  safeReadJson,
  safeReadString,
  safeWriteJson,
  safeWriteString,
  safeRemoveItem,
} from './storage.js';

export const EXTRA_SEEDED_ROUTINE_IDS = new Set([
  'full-body-movement-restoration',
  'bodyweight-movement-flow',
  'kettlebell-functional-carry',
  'mcgill-decompression-reset',
]);

export const LEGACY_ROUTINE_TITLES = {
  'Leg Workout 1 (Focus Squat & Catena Posteriore)': 'Legs · Squat & Posterior Chain',
  'Leg Workout 2 (Focus Squat Pesante & Flessione Ginocchio)': 'Legs · Back Squat & Knee Flexion',
  'Leg Workout 1': 'Legs · Squat & Posterior Chain',
  'Leg Workout 2': 'Legs · Back Squat & Knee Flexion',
  'Full Body Movement & Health Restoration': 'Full Body · Movement Restoration',
  'Zero-Equipment Bodyweight & Movement Flow': 'Full Body · Calisthenics Flow',
  'Minimalist Kettlebell & Loaded Carry Framework': 'Full Body · Kettlebell & Carry',
  'McGill Big 3 & Spinal Decompression Reset': 'Core · McGill Spine Decompression',
};

const LEGACY_STORAGE_KEYS = [
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
  'corpo_user_routines_clean',
];

const LEGACY_REPLACED_EXERCISES = {
  'wu-side-plank-leg-raise': {
    canonicalId: 'ex-copenhagen-plank',
    warmupId: 'wu-copenhagen-plank',
  },
  'wu-feet-elevated-glute-bridge': {
    canonicalId: 'ex-elevated-single-leg-glute-bridge',
    warmupId: 'wu-elevated-single-leg-glute-bridge',
  },
};

export function normalizeRoutineTitle(title) {
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

export function deriveLastRecordFromSets(sets, exercise = null) {
  if (!Array.isArray(sets)) return null;
  const completed = sets.filter((s) => s.completed);
  if (completed.length === 0) return null;

  let best = completed[completed.length - 1];
  const hasPositiveWeight = completed.some((s) => {
    const w = parseFloat(String(s.weight ?? '').replace(',', '.'));
    return Number.isFinite(w) && w > 0;
  });

  if (hasPositiveWeight) {
    let maxWeight = -1;
    completed.forEach((s) => {
      const w = parseFloat(String(s.weight ?? '').replace(',', '.'));
      if (Number.isFinite(w) && w >= maxWeight) {
        maxWeight = w;
        best = s;
      }
    });
  } else {
    let maxReps = -1;
    completed.forEach((s) => {
      const r = parseFloat(String(s.reps ?? '').replace(',', '.'));
      if (Number.isFinite(r) && r >= maxReps) {
        maxReps = r;
        best = s;
      }
    });
  }

  const formatted = formatLoggedSetSummary(best, exercise);
  return formatted && formatted !== '-' ? formatted : null;
}

export function mergeMissingCanonical(ex) {
  const legacyReplacement = LEGACY_REPLACED_EXERCISES[ex.id];
  if (legacyReplacement) {
    const replacement = EXERCISE_DATABASE.find((c) => c.id === legacyReplacement.canonicalId);
    if (replacement) {
      return {
        ...replacement,
        sourceId: replacement.id,
        id: ex.isWarmup ? legacyReplacement.warmupId : replacement.id,
        phase: ex.isWarmup ? 'warmup' : 'main',
        isWarmup: Boolean(ex.isWarmup),
      };
    }
  }
  const lookupId = ex.sourceId || ex.id;
  const canonical = EXERCISE_DATABASE.find((c) => c.id === lookupId);
  if (!canonical) return ex;
  return {
    ...canonical,
    ...ex,
    name: canonical.name,
    subtitle: canonical.subtitle,
    scientificName: canonical.scientificName,
    pattern: canonical.pattern,
    equipment: canonical.equipment,
    requiresEquipment:
      typeof canonical.requiresEquipment === 'boolean'
        ? canonical.requiresEquipment
        : typeof ex.requiresEquipment === 'boolean'
          ? ex.requiresEquipment
          : true,
    mechanics: canonical.mechanics,
    level: canonical.level,
    muscleKey: canonical.muscleKey,
    targetMuscles: canonical.targetMuscles,
    execution: canonical.execution,
    illustration: canonical.illustration,
    rpe: canonical.rpe,
    familyId: canonical.familyId,
    familyName: canonical.familyName,
    variationType: canonical.variationType,
    variationLabel: canonical.variationLabel,
    biomechanics: canonical.biomechanics,
    customVideoUrl: canonical.customVideoUrl || ex.customVideoUrl,
    id: ex.id || canonical.id,
    sourceId: canonical.id,
    phase: ex.phase || (canonical.isWarmup ? 'warmup' : 'main'),
    isWarmup: typeof ex.isWarmup === 'boolean' ? ex.isWarmup : Boolean(canonical.isWarmup),
    defaultSets: ex.defaultSets ?? canonical.defaultSets ?? 3,
    defaultReps: ex.defaultReps ? normalizeRepUnits(ex.defaultReps) : (canonical.defaultReps || '8-12'),
    defaultRestSeconds: ex.defaultRestSeconds ?? canonical.defaultRestSeconds ?? 90,
    defaultDropSets: ex.defaultDropSets ?? 0,
    supersetGroup: ex.supersetGroup ?? null,
    lastRecord: ex.lastRecord ?? null,
  };
}

export function hydrateExercisesFromStorage() {
  const saved = safeReadJson(STORAGE_KEYS.EXERCISES, null);
  if (saved && Array.isArray(saved) && saved.length > 0) {
    const savedMap = new Map(saved.map((ex) => [ex.id, ex]));
    const mergedCanonical = EXERCISE_DATABASE.map((canEx) => {
      const savedEx = savedMap.get(canEx.id);
      if (!savedEx) return canEx;
      savedMap.delete(canEx.id);
      return {
        ...savedEx,
        ...canEx,
        lastRecord: savedEx.lastRecord || canEx.lastRecord,
        customVideoUrl: canEx.customVideoUrl || savedEx.customVideoUrl || '',
      };
    });
    const customExercises = Array.from(savedMap.values());
    return [...mergedCanonical, ...customExercises];
  }
  return EXERCISE_DATABASE;
}

export function hydrateRoutinesFromStorage() {
  const saved = safeReadJson(STORAGE_KEYS.ROUTINES, null);
  if (saved && Array.isArray(saved)) {
    try {
      const alreadyPruned = safeReadString(STORAGE_KEYS.PRUNED_EXTRA_DEFAULTS, '') === '1';
      const filteredSaved = alreadyPruned
        ? saved
        : saved.filter((r) => !EXTRA_SEEDED_ROUTINE_IDS.has(r?.id));

      if (!alreadyPruned) {
        safeWriteString(STORAGE_KEYS.PRUNED_EXTRA_DEFAULTS, '1');
      }

      const savedIds = new Set(filteredSaved.map((r) => r.id));
      const missingInitial = INITIAL_ROUTINES.filter((initR) => !savedIds.has(initR.id));
      const mappedSaved = filteredSaved.map((routine) => {
        const canonicalRoutine = INITIAL_ROUTINES.find((r) => r.id === routine.id);
        const normalizedTitle = normalizeRoutineTitle(routine.title);
        return {
          ...routine,
          title: normalizedTitle,
          shortTitle: normalizedTitle,
          category: canonicalRoutine ? canonicalRoutine.category : routine.category,
          difficulty: canonicalRoutine ? canonicalRoutine.difficulty : routine.difficulty,
          equipmentTags: canonicalRoutine ? canonicalRoutine.equipmentTags : routine.equipmentTags,
          description: canonicalRoutine ? canonicalRoutine.description : routine.description,
          exercises: (routine.exercises || []).map((ex) => mergeMissingCanonical(ex)),
        };
      });
      return [...mappedSaved, ...missingInitial];
    } catch {
      // Fallback to initial routines
    }
  }
  safeWriteString(STORAGE_KEYS.PRUNED_EXTRA_DEFAULTS, '1');
  return INITIAL_ROUTINES;
}

export function registerCurrentCatalogInStorage() {
  try {
    LEGACY_STORAGE_KEYS.forEach((k) => safeRemoveItem(k));
    const prevSeeded = safeReadJson(STORAGE_KEYS.SEEDED_CANONICAL, []);
    const mergedSeeded = Array.from(
      new Set([...(Array.isArray(prevSeeded) ? prevSeeded : []), ...EXERCISE_DATABASE.map((e) => e.id)])
    );
    safeWriteJson(STORAGE_KEYS.SEEDED_CANONICAL, mergedSeeded);
    safeWriteString(STORAGE_KEYS.EN_LOCALIZATION, '1');
  } catch {
    // Ignore storage restrictions
  }
}
