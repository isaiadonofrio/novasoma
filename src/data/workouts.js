import { EXERCISE_DATABASE } from './exerciseDatabase';

// Helper to retrieve complete canonical exercise data from database
const getEx = (id, isWarmup = false, instanceId = null) => {
  const found = EXERCISE_DATABASE.find(e => e.id === id);
  if (!found) throw new Error(`Exercise not found: ${id}`);
  return {
    ...found,
    sourceId: id,
    id: instanceId || id,
    phase: isWarmup ? 'warmup' : 'main',
    isWarmup
  };
};

// Shared Warm-Up Sequence (integrated directly into both leg sessions)
const WARMUP_EXERCISES = [
  getEx('wu-jump-rope', true),
  getEx('wu-banded-hip-abduction', true),
  getEx('ex-copenhagen-plank', true, 'wu-copenhagen-plank'),
  getEx('ex-elevated-single-leg-glute-bridge', true, 'wu-elevated-single-leg-glute-bridge'),
  getEx('wu-ankle-hip-mobility', true)
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
    title: 'Leg Workout 1',
    shortTitle: 'Legs 1',
    description: 'Complete lower-body session pairing a 5-exercise neuromuscular warm-up with Spanish Squat, Barbell RDL, Copenhagen Plank, Bulgarian Split Squat, Step-Ups, and Standing Calf Raises.',
    category: 'Legs & Glutes',
    durationMinutes: 65,
    difficulty: 'Intermediate - Advanced',
    accentColor: '#D4FF00',
    equipmentTags: ['Barbell', 'Dumbbells', 'Bench', 'Jump Rope', 'Bands'],
    exercises: [
      ...WARMUP_EXERCISES,
      ...LEG_1_MAIN
    ]
  },
  {
    id: 'leg-workout-2',
    title: 'Leg Workout 2',
    shortTitle: 'Legs 2',
    description: 'Second weekly lower-body session combining the 5-exercise warm-up with Barbell Back Squat, Single-Leg Glute Bridge, Reverse Nordic Curl, Seated Banded Leg Curl, Copenhagen Plank, and Seated Calf Raises.',
    category: 'Legs & Glutes',
    durationMinutes: 65,
    difficulty: 'Intermediate - Advanced',
    accentColor: '#38BDF8',
    equipmentTags: ['Barbell', 'Dumbbells', 'Bench', 'Bands', 'Mat'],
    exercises: [
      ...WARMUP_EXERCISES,
      ...LEG_2_MAIN
    ]
  }
];
