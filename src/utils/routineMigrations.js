import { insertExerciseByPhase } from './workoutSets.js';

export const LEG_WARMUP_ADDITION_GROUPS = [
  {
    canonicalId: 'wu-dumbbell-glute-step-down',
    matchIds: [
      'wu-lateral-glute-step-down',
      'wu-dumbbell-glute-step-down',
      'wu-kettlebell-glute-step-down',
      'wu-banded-glute-step-down',
    ],
  },
  {
    canonicalId: 'wu-elevated-ankle-dorsiflexion',
    matchIds: [
      'wu-elevated-ankle-dorsiflexion',
      'wu-dumbbell-ankle-dorsiflexion',
      'wu-kettlebell-ankle-dorsiflexion',
      'wu-banded-ankle-dorsiflexion',
    ],
  },
];

/**
 * Non-destructively appends the two added leg warm-up movements to
 * `leg-workout-1` and `leg-workout-2` without duplicating or touching custom routines.
 */
export function applyLegWarmupAdditions(routines = [], exerciseCatalog = []) {
  const targetIds = new Set(['leg-workout-1', 'leg-workout-2']);
  return routines.map((routine) => {
    if (!routine || !targetIds.has(routine.id)) return routine;
    let nextExercises = Array.isArray(routine.exercises) ? [...routine.exercises] : [];

    for (const group of LEG_WARMUP_ADDITION_GROUPS) {
      const alreadyPresent = nextExercises.some(
        (ex) => group.matchIds.includes(ex?.sourceId || ex?.id) || group.matchIds.includes(ex?.id)
      );
      if (alreadyPresent) continue;

      const canonical = exerciseCatalog.find((c) => c.id === group.canonicalId);
      if (!canonical) continue;

      nextExercises = insertExerciseByPhase(nextExercises, {
        ...canonical,
        sourceId: canonical.id,
        id: canonical.id,
        phase: 'warmup',
        isWarmup: true,
      });
    }

    return {
      ...routine,
      exercises: nextExercises,
    };
  });
}
