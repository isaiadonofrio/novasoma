import { EXERCISE_DATABASE } from './exerciseDatabase';

/**
 * Retrieve complete canonical exercise data from database with phase override.
 * @param {string} id
 * @param {boolean | 'warmup' | 'main' | 'decompression'} [phaseOrWarmup=false]
 * @param {string | null} [instanceId=null]
 */
const getEx = (id, phaseOrWarmup = false, instanceId = null) => {
  const found = EXERCISE_DATABASE.find(e => e.id === id);
  if (!found) throw new Error(`Exercise not found: ${id}`);
  const phase = typeof phaseOrWarmup === 'string'
    ? phaseOrWarmup
    : (phaseOrWarmup ? 'warmup' : 'main');
  return {
    ...found,
    sourceId: id,
    id: instanceId || id,
    phase,
    isWarmup: phase === 'warmup'
  };
};

// Shared Warm-Up Sequence (integrated directly into both leg sessions)
const WARMUP_EXERCISES = [
  getEx('wu-jump-rope', true),
  getEx('wu-banded-hip-abduction', true),
  getEx('wu-dumbbell-glute-step-down', true),
  getEx('ex-copenhagen-plank', true, 'wu-copenhagen-plank'),
  getEx('ex-elevated-single-leg-glute-bridge', true, 'wu-elevated-single-leg-glute-bridge'),
  getEx('wu-ankle-hip-mobility', true),
  getEx('wu-elevated-ankle-dorsiflexion', true)
];

// Leg Workout 1 Main Exercises
const LEG_1_MAIN = [
  getEx('ex-spanish-squat', false),
  getEx('ex-romanian-deadlift', false),
  getEx('ex-copenhagen-plank', false),
  getEx('ex-bulgarian-split-squat', false),
  getEx('ex-step-ups', false),
  getEx('ex-single-leg-calf-raise-step', false)
];

// Leg Workout 2 Main Exercises
const LEG_2_MAIN = [
  getEx('ex-back-squat', false),
  getEx('ex-elevated-single-leg-glute-bridge', false),
  getEx('ex-reverse-nordic-curl', false),
  getEx('ex-seated-banded-hamstring-curl', false),
  getEx('ex-copenhagen-plank', false),
  getEx('ex-seated-single-leg-calf-raise', false)
];

export const INITIAL_ROUTINES = [
  {
    id: 'leg-workout-1',
    title: 'Legs · Squat & Posterior Chain',
    shortTitle: 'Legs · Squat',
    description: 'Complete lower-body session pairing a 7-exercise neuromuscular warm-up with Spanish Squat, Barbell RDL, Copenhagen Plank, Bulgarian Split Squat, Step-Ups, and Standing Calf Raises.',
    category: 'Legs & Glutes',
    durationMinutes: 65,
    difficulty: 'Intermediate - Advanced',
    accentColor: '#C28E52',
    equipmentTags: ['Barbell', 'Dumbbells', 'Bench', 'Jump Rope', 'Bands'],
    exercises: [
      ...WARMUP_EXERCISES,
      ...LEG_1_MAIN
    ]
  },
  {
    id: 'leg-workout-2',
    title: 'Legs · Back Squat & Knee Flexion',
    shortTitle: 'Legs · Back Squat',
    description: 'Second weekly lower-body session combining the 7-exercise warm-up with Barbell Back Squat, Single-Leg Glute Bridge, Reverse Nordic Curl, Seated Banded Leg Curl, Copenhagen Plank, and Seated Calf Raises.',
    category: 'Legs & Glutes',
    durationMinutes: 65,
    difficulty: 'Intermediate - Advanced',
    accentColor: '#C28E52',
    equipmentTags: ['Barbell', 'Dumbbells', 'Bench', 'Bands', 'Mat'],
    exercises: [
      ...WARMUP_EXERCISES,
      ...LEG_2_MAIN
    ]
  },
  {
    id: 'posture-spine-foundation',
    title: 'Full Body · Posture, Spine & Upper Back',
    shortTitle: 'Posture & Spine',
    description: 'Physiotherapy and gymnastics-inspired active postural routine pairing thoracic & hip mobility warm-ups, scapular pulling, zero-shear upper-back strength, McGill spine stability, and overhead decompression.',
    category: 'Posture & Full Body',
    durationMinutes: 50,
    difficulty: 'All Levels',
    accentColor: '#176A63',
    equipmentTags: ['Dumbbells', 'Bench', 'Pull-Up Bar', 'Mat'],
    exercises: [
      getEx('wu-cat-cow-child-pose', 'warmup'),
      getEx('wu-thoracic-open-book', 'warmup'),
      getEx('wu-wall-angel-slides', 'warmup'),
      getEx('wu-worlds-greatest-stretch', 'warmup'),
      getEx('wu-scapular-pull-up', 'main'),
      getEx('ex-dumbbell-bent-over-row', 'main'),
      getEx('ex-push-up', 'main'),
      getEx('ex-incline-dumbbell-ytw-raise', 'main'),
      getEx('ex-prone-cobra-hold', 'main'),
      getEx('ex-bird-dog', 'main'),
      getEx('ex-hollow-body-hold', 'main'),
      getEx('wu-passive-dead-hang', 'decompression', 'dc-passive-dead-hang'),
      getEx('ex-decompression-brisk-walk', 'decompression')
    ]
  }
];
