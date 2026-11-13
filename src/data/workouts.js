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

// Full Body Movement Restoration Warm-Up Sequence (Joint mobilization & neuromuscular priming)
const FULL_BODY_WARMUP = [
  { ...getEx('wu-ankle-hip-mobility', true), defaultSets: 2, defaultReps: '8/side' },
  { ...getEx('ex-bird-dog', true, 'wu-bird-dog'), defaultSets: 2, defaultReps: '8/side' },
  { ...getEx('ex-reverse-snow-angel', true, 'wu-reverse-snow-angel'), defaultSets: 2, defaultReps: '10-12' },
  { ...getEx('ex-glute-bridge', true, 'wu-glute-bridge'), defaultSets: 2, defaultReps: '12' }
];

// Full Body Movement Restoration Main Exercises (The 5 Fundamental Movement Patterns + Core)
const FULL_BODY_MAIN = [
  { ...getEx('ex-dumbbell-goblet-squat', false), defaultSets: 3, defaultReps: '8-10' },
  { ...getEx('ex-dumbbell-romanian-deadlift', false), defaultSets: 3, defaultReps: '10' },
  { ...getEx('ex-push-up', false), defaultSets: 3, defaultReps: '8-10' },
  { ...getEx('ex-dumbbell-bent-over-row', false), defaultSets: 3, defaultReps: '10/side' },
  { ...getEx('ex-dumbbell-reverse-lunge', false), defaultSets: 3, defaultReps: '8/leg' },
  { ...getEx('ex-bear-plank', false), defaultSets: 3, defaultReps: '30s' }
];

// 1. Zero-Equipment Bodyweight & Movement Flow
const BODYWEIGHT_FLOW_WARMUP = [
  { ...getEx('wu-cat-cow-child-pose', true), defaultSets: 2, defaultReps: '6-8 flows' },
  { ...getEx('wu-worlds-greatest-stretch', true), defaultSets: 2, defaultReps: '5/side' },
  { ...getEx('wu-ankle-hip-mobility', true), defaultSets: 2, defaultReps: '8/side' }
];

const BODYWEIGHT_FLOW_MAIN = [
  { ...getEx('ex-bodyweight-box-squat', false), defaultSets: 3, defaultReps: '10-12' },
  { ...getEx('ex-incline-push-up', false), defaultSets: 3, defaultReps: '8-10' },
  { ...getEx('ex-glute-bridge', false), defaultSets: 3, defaultReps: '12-15' },
  { ...getEx('ex-cossack-squat', false), defaultSets: 2, defaultReps: '6/side' },
  { ...getEx('ex-reverse-snow-angel', false), defaultSets: 3, defaultReps: '10-12' },
  { ...getEx('ex-side-plank', false), defaultSets: 3, defaultReps: '20-30s/side' }
];

// 2. Minimalist Kettlebell & Loaded Carry Framework
const KETTLEBELL_CARRY_WARMUP = [
  { ...getEx('wu-kettlebell-halo', true), defaultSets: 2, defaultReps: '6/side' },
  { ...getEx('wu-ankle-hip-mobility', true), defaultSets: 2, defaultReps: '8/side' },
  { ...getEx('ex-bird-dog', true, 'wu-bird-dog'), defaultSets: 2, defaultReps: '8/side' }
];

const KETTLEBELL_CARRY_MAIN = [
  { ...getEx('ex-kettlebell-goblet-squat', false), defaultSets: 3, defaultReps: '8-10' },
  { ...getEx('ex-kettlebell-russian-swing', false), defaultSets: 4, defaultReps: '12' },
  { ...getEx('ex-farmers-carry', false), defaultSets: 3, defaultReps: '30-45s' },
  { ...getEx('ex-dumbbell-floor-press', false), defaultSets: 3, defaultReps: '8-10' },
  { ...getEx('ex-kettlebell-goblet-lunge', false), defaultSets: 3, defaultReps: '8/leg' },
  { ...getEx('ex-bear-plank', false), defaultSets: 3, defaultReps: '30s' }
];

// 3. McGill Big 3 & Spinal Decompression Reset
const MCGILL_WARMUP = [
  { ...getEx('wu-cat-cow-child-pose', true), defaultSets: 2, defaultReps: '6 flows' },
  { ...getEx('ex-glute-bridge-reach', true, 'wu-glute-bridge-reach'), defaultSets: 2, defaultReps: '8/side' }
];

const MCGILL_MAIN = [
  { ...getEx('ex-mcgill-curl-up', false), defaultSets: 3, defaultReps: '6 holds (8s)' },
  { ...getEx('ex-side-plank', false), defaultSets: 3, defaultReps: '20s/side' },
  { ...getEx('ex-bird-dog', false), defaultSets: 3, defaultReps: '8/side' },
  { ...getEx('ex-decompression-brisk-walk', false), defaultSets: 1, defaultReps: '15-20 min' }
];

export const INITIAL_ROUTINES = [
  {
    id: 'full-body-movement-restoration',
    title: 'Full Body · Movement Restoration',
    shortTitle: 'Full Body · Reset',
    description: 'Evidence-based functional movement routine engineered to re-establish physical form, joint mobility, posture, and full-body strength. Combines joint articulation and McGill spinal stabilizers with the 5 core human movement patterns.',
    category: 'Full Body',
    durationMinutes: 50,
    difficulty: 'Beginner - Intermediate',
    accentColor: '#E5A93C',
    equipmentTags: ['Dumbbells', 'Mat', 'Bench', 'Bodyweight'],
    exercises: [
      ...FULL_BODY_WARMUP,
      ...FULL_BODY_MAIN
    ]
  },
  {
    id: 'bodyweight-movement-flow',
    title: 'Full Body · Calisthenics Flow',
    shortTitle: 'Full Body · Flow',
    description: 'Zero-equipment calisthenics and spatial movement flow designed for mobility, joint lubrication, and foundational body control. Perfect for home, hotel, or travel.',
    category: 'Full Body',
    durationMinutes: 40,
    difficulty: 'Beginner',
    accentColor: '#E5A93C',
    equipmentTags: ['Bodyweight', 'Mat', 'Chair'],
    exercises: [
      ...BODYWEIGHT_FLOW_WARMUP,
      ...BODYWEIGHT_FLOW_MAIN
    ]
  },
  {
    id: 'kettlebell-functional-carry',
    title: 'Full Body · Kettlebell & Carry',
    shortTitle: 'Full Body · Carry',
    description: 'Athletic functional session pairing rhythmic kettlebell hinge power and deep goblet squat prying with anti-lateral core carries and floor pressing.',
    category: 'Full Body',
    durationMinutes: 45,
    difficulty: 'Intermediate',
    accentColor: '#E5A93C',
    equipmentTags: ['Kettlebell', 'Dumbbells', 'Mat'],
    exercises: [
      ...KETTLEBELL_CARRY_WARMUP,
      ...KETTLEBELL_CARRY_MAIN
    ]
  },
  {
    id: 'mcgill-decompression-reset',
    title: 'Core · McGill Spine Decompression',
    shortTitle: 'Core · McGill',
    description: 'Clinical spine-sparing restoration protocol based on Dr. Stuart McGill’s spine biomechanics research. Rebuilds torso stiffness, stabilizes the lumbar spine, and decompresses intervertebral discs.',
    category: 'Core & Functional',
    durationMinutes: 35,
    difficulty: 'Beginner',
    accentColor: '#E5674C',
    equipmentTags: ['Bodyweight', 'Mat'],
    exercises: [
      ...MCGILL_WARMUP,
      ...MCGILL_MAIN
    ]
  },
  {
    id: 'leg-workout-1',
    title: 'Legs · Squat & Posterior Chain',
    shortTitle: 'Legs · Squat',
    description: 'Complete lower-body session pairing a 5-exercise neuromuscular warm-up with Spanish Squat, Barbell RDL, Copenhagen Plank, Bulgarian Split Squat, Step-Ups, and Standing Calf Raises.',
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
    description: 'Second weekly lower-body session combining the 5-exercise warm-up with Barbell Back Squat, Single-Leg Glute Bridge, Reverse Nordic Curl, Seated Banded Leg Curl, Copenhagen Plank, and Seated Calf Raises.',
    category: 'Legs & Glutes',
    durationMinutes: 65,
    difficulty: 'Intermediate - Advanced',
    accentColor: '#C28E52',
    equipmentTags: ['Barbell', 'Dumbbells', 'Bench', 'Bands', 'Mat'],
    exercises: [
      ...WARMUP_EXERCISES,
      ...LEG_2_MAIN
    ]
  }
];
