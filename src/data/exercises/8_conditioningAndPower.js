/**
 * CONDITIONINGANDPOWER
 * Modular Exercise Sub-Database
 */

import { MOVEMENT_PATTERNS } from '../exerciseConstants.js';

export const CONDITIONINGANDPOWER_EXERCISES = [
  {
      id: 'ex-kettlebell-russian-swing',
      name: 'Kettlebell Swing',
      scientificName: 'Explosive sagittal ballistic hip hinge generating horizontal-to-arc force',
      subtitle: 'Two-hand Russian kettlebell swing for posterior power & conditioning',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Kettlebell',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'glutes',
      defaultSets: 4,
      defaultReps: '15-20',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus', 'Hamstrings'],
        secondary: ['Spinal Erectors', 'Anterior Core'],
        stabilizers: ['Latissimus Dorsi', 'Forearms (Grip)', 'Anterior Deltoid']
      },
      execution: {
        setup: 'Stand wider than shoulder width; hike kettlebell firmly high between thighs with packed lats, straight arms, and flat spine.',
        eccentric: 'Wait upright until forearms nearly brush the upper thighs before snapping hips sharply backward into a crisp hinge ("play chicken with your hips").',
        concentric: 'Drive hips aggressively forward standing into a tall standing plank, floating the weight weightlessly up to chest/shoulder level.',
        breathing: 'Sharp nasal inhale during back-hike hinge; forceful crisp exhale ("tsss") on explosive hip lock.',
        commonMistakes: [
          'Lifting the bell with shoulder and arm pulling rather than hip snap',
          'Squatting down vertically with bent knees instead of hinging hips back',
          'Leaning far backward over-arching lumbar spine at top'
        ],
        proTip: 'Your arms should act purely as tension cables—if the kettlebell floats weightless at chest height at the top, your hip power did all the work.'
      }
    },

  {
      id: 'ex-medicine-ball-slam',
      name: 'Medicine Ball Slam',
      scientificName: 'Total-body explosive overhead flexion slam targeting core & lats',
      subtitle: 'Explosive overhead floor slam with non-bouncing medicine ball',
      pattern: MOVEMENT_PATTERNS.CARDIO_PLYO,
      equipment: 'Medicine Ball',
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 4,
      defaultReps: '12-15',
      defaultRestSeconds: 60,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Latissimus Dorsi'],
        secondary: ['Deltoids', 'Triceps', 'Glutes & Quads'],
        stabilizers: ['Obliques', 'Lumbo-Pelvic Core']
      },
      execution: {
        setup: 'Stand shoulder-width apart and reach the medicine ball fully overhead extending onto balls of the feet with tall arms.',
        eccentric: 'Squat briskly down behind the ball cleanly through hips and knees to retrieve immediately off floor.',
        concentric: 'Whip your core and lats forcefully downward, slamming the ball straight between your feet with total power.',
        breathing: 'Inhale reaching tall overhead; sharp explosive exhale on the slam.',
        commonMistakes: [
          'Using high-bounce rubber balls that rebound rapidly toward the face',
          'Rounding low back straight down to pick up ball instead of hinging/squatting cleanly',
          'Throwing the ball far forward ahead of feet'
        ],
        proTip: 'Aim every slam directly into the floor space right between your insteps using sharp abdominal crunch and lat pull power together.'
      }
    },

  {
      id: 'ex-decompression-brisk-walk',
      name: 'Postural Decompression Brisk Walk',
      scientificName: 'Low-impact reciprocal rhythmic locomotion with synchronized diaphragmatic breath',
      subtitle: 'Nervous system downshift, spinal decompression, and synovial fluid circulation',
      pattern: MOVEMENT_PATTERNS.CARDIO_PLYO,
      equipment: 'Bodyweight',
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'calves',
      defaultSets: 1,
      defaultReps: '15-20 min',
      defaultRestSeconds: 0,
      rpe: '4 - 5',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gastrocnemius & Soleus', 'Tibialis Anterior'],
        secondary: ['Gluteus Medius', 'Hamstrings'],
        stabilizers: ['Postural Spinal Erectors', 'Diaphragm']
      },
      execution: {
        setup: 'Stand tall with relaxed shoulders, eyes on horizon. Step forward with upright, athletic posture.',
        eccentric: 'Absorb heel strike smoothly, rolling energy forward through arch to big toe.',
        concentric: 'Swing arms reciprocally from shoulders (not elbows), creating gentle natural counter-rotation through ribcage.',
        breathing: 'Breathe strictly through the nose in a 3-step inhale, 3-step exhale rhythm.',
        commonMistakes: [
          'Looking down at phone while walking with forward head posture',
          'Walking with stiff, motionless arms',
          'Overstriding with heavy heel impact'
        ],
        proTip: 'Walking is the ultimate biological reset: it flushes metabolites, restores reciprocal arm-leg coordination, and decompresses intervertebral discs.'
      }
    }
];
