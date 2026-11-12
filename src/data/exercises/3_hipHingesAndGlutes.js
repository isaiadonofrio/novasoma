/**
 * HIPHINGESANDGLUTES
 * Modular Exercise Sub-Database
 */

import { MOVEMENT_PATTERNS } from '../exerciseConstants.js';

export const HIPHINGESANDGLUTES_EXERCISES = [
  {
      id: 'ex-romanian-deadlift',
      name: 'Barbell Romanian Deadlift (RDL)',
      scientificName: 'Eccentric-dominant barbell hip hinge with locked soft-knee flexion angle',
      subtitle: 'Barbell hip hinge targeting hamstrings and glutes',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Barbell',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'hamstrings',
      defaultSets: 4,
      defaultReps: '8-10',
      defaultRestSeconds: 120,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hamstrings (Biceps Femoris, Semitendinosus, Semimembranosus)'],
        secondary: ['Gluteus Maximus', 'Adductor Magnus'],
        stabilizers: ['Spinal Erectors', 'Latissimus Dorsi', 'Forearms & Traps']
      },
      execution: {
        setup: 'Stand hip-width apart holding the barbell just outside the thighs in shoulder-width pronated grip. Pack the lats down, keep knees softly unlocked (~15°), and brace your core.',
        eccentric: 'Push the hips straight backward over 3 seconds while dragging the bar vertically along the thighs and shins until hamstring length stops hip travel (typically mid-shin).',
        concentric: 'Drive the hips forward decisively by contracting glutes and hamstrings to return upright with neutral lumbar posture.',
        breathing: 'Take a deep bracing breath before initiating each hinge; exhale as you lock out upright.',
        commonMistakes: [
          'Allowing the barbell to drift forward away from the shins, increasing lumbar shear',
          'Flexing the knees progressively deeper and turning the hinge into a squat',
          'Rounding the lower back in pursuit of touching the plates to the floor'
        ],
        proTip: 'Stop descending the exact moment your hips stop moving backward—going lower with a rounded spine steals stretch tension directly off the hamstrings.'
      }
    },

  {
      id: 'ex-barbell-deadlift',
      name: 'Barbell Deadlift',
      scientificName: 'Maximal full-body conventional lift pulling loaded barbell cleanly from floor',
      subtitle: 'Conventional barbell deadlift for total posterior-chain power',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Barbell',
      mechanics: 'Compound',
      level: 'Advanced',
      muscleKey: 'back',
      defaultSets: 3,
      defaultReps: '5',
      defaultRestSeconds: 180,
      rpe: '8.5 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus', 'Hamstrings', 'Spinal Erectors'],
        secondary: ['Quadriceps (Floor Break)', 'Latissimus Dorsi', 'Trapezius'],
        stabilizers: ['Core Bracing Cylinder', 'Forearms (Grip)']
      },
      execution: {
        setup: 'Stand with the barbell centered strictly over midfoot (~2 cm in front of shins), grab just outside knees, drop hips until shins kiss the bar, pack lats down hard ("bend the bar"), and take slack out.',
        eccentric: 'Push hips backward first to clear knees, then hinge down in control to return plates cleanly to rest on the floor.',
        concentric: 'Push the floor away through whole feet while dragging the barbell up shins and thighs to crisp upright hip lockout without leaning backward.',
        breathing: 'Take a massive 360° Valsalva breath before lifting the slack; exhale slowly after setting down or locking out safely.',
        commonMistakes: [
          'Starting with the barbell too far forward over the toes',
          'Yanking abruptly with slack in the arms and rounding the lumbar spine',
          'Over-leaning backward violently at top lockout'
        ],
        proTip: 'Pull the slack out of the bar—hear the plates click softly upward against the bar sleeve—before pushing through your heels.'
      }
    },

  {
      id: 'ex-dumbbell-romanian-deadlift',
      name: 'Dumbbell Romanian Deadlift',
      scientificName: 'Eccentric-controlled bilateral hip hinge with free-hanging dumbbells',
      subtitle: 'Dumbbell hip hinge for hamstring stretch and glute strength',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Dumbbells',
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'hamstrings',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hamstrings'],
        secondary: ['Gluteus Maximus', 'Adductor Magnus'],
        stabilizers: ['Spinal Erectors', 'Latissimus Dorsi', 'Forearms']
      },
      execution: {
        setup: 'Hold dumbbells slightly rotated alongside/in front of your thighs, knees unlocked at a soft ~15° angle, lats packed, spine long and neutral.',
        eccentric: 'Glide the dumbbells close along legs over 3 seconds strictly by pushing hips straight back until hamstrings reach full active tension near mid-shin.',
        concentric: 'Drive hips cleanly forward until upright without forcefully over-arching the lower back.',
        breathing: 'Inhale deeply before pushing hips back; exhale smoothly standing tall.',
        commonMistakes: [
          'Letting dumbbells swing outward ahead of the shins',
          'Squatting downward by bending knees deeper instead of hinging hips back',
          'Rounding the lower back just to chase extra range'
        ],
        proTip: 'Once your hips stop moving backward toward the wall behind you, your hamstrings are maximally stretched—immediately reverse smoothly back up.'
      }
    },

  {
      id: 'ex-kettlebell-sumo-deadlift',
      name: 'Kettlebell Sumo Deadlift',
      scientificName: 'Wide-stance centered deadlift lowering vertical center-of-mass shear',
      subtitle: 'Wide-stance sumo kettlebell deadlift for glutes, adductors & quads',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Kettlebell',
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus', 'Adductor Magnus'],
        secondary: ['Quadriceps', 'Hamstrings'],
        stabilizers: ['Spinal Erectors', 'Lats & Traps', 'Core']
      },
      execution: {
        setup: 'Set feet wide (~1.5× shoulders) angled out 30–45° directly straddling a centered kettlebell between heels; brace core and pack shoulders straight down.',
        eccentric: 'Send hips smoothly backward while pushing knees outward over toes to tap the kettlebell directly straight down between the arches.',
        concentric: 'Spread the floor apart with your feet while extending knees and hips smoothly together into tall posture.',
        breathing: 'Take a deep bracing breath before each pull; exhale comfortably at top.',
        commonMistakes: [
          'Allowing knees to cave inside foot angle under load',
          'Setting the bell far forward ahead of heels and rounding lower back',
          'Raising hips swiftly first before shoulders lift ("stripper pull")'
        ],
        proTip: 'Centering load vertically between wide feet keeps lumbar lever arms compact—making sumo lifts ideal for mastering hip-hinge mechanics.'
      }
    },

  {
      id: 'ex-barbell-hip-thrust',
      name: 'Barbell Hip Thrust',
      scientificName: 'Bench-pivoted horizontal loaded hip extension targeting peak glute torque',
      subtitle: 'Bench-pivoted barbell hip thrust for maximal glute hypertrophy',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Barbell + Flat Bench',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'glutes',
      defaultSets: 4,
      defaultReps: '8-12',
      defaultRestSeconds: 120,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus'],
        secondary: ['Hamstrings', 'Adductor Magnus'],
        stabilizers: ['Anterior Core', 'Spinal Erectors']
      },
      execution: {
        setup: 'Rest inferior border of shoulder blades across a flat bench edge, place padded barbell across hip crease, plant feet shoulder-width so shins stand vertical at top extension.',
        eccentric: 'Hinge cleanly downward controlling the barbell while keeping chin tucked slightly forward and eyes fixed ahead so ribs pivot together with the hips.',
        concentric: 'Drive through heels until thighs and torso sit parallel to the floor, finishing with subtle posterior pelvic tuck and 1-second glute squeeze.',
        breathing: 'Inhale bracing down; exhale tightly during top lockout squeeze.',
        commonMistakes: [
          'Arching the lumbar spine skyward rather than completing pure hip extension',
          'Placing feet too close (quad takeover) or too far out (hamstring cramp)',
          'Tilting head backward over the bench edge and straining the neck'
        ],
        proTip: 'Keep your eyes looking straight forward toward the horizon and ribs tucked down—your upper back pivots smoothly around the bench like a hinge.'
      }
    },

  {
      id: 'ex-glute-bridge',
      name: 'Glute Bridge',
      scientificName: 'Supine floor-based bilateral hip extension targeting gluteus maximus',
      subtitle: 'Foundational floor glute bridge for posterior-chain activation',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '15-20',
      defaultRestSeconds: 45,
      rpe: '7',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus'],
        secondary: ['Hamstrings'],
        stabilizers: ['Anterior Core', 'Spinal Erectors']
      },
      execution: {
        setup: 'Lie flat on mat, knees bent with heels planted hip-width close enough so shins stand vertical at lockout, arms resting flat along sides.',
        eccentric: 'Lower pelvis evenly under control over 2 seconds keeping core gently engaged.',
        concentric: 'Tuck tailbone subtly ("ribs down"), then press cleanly through heels lifting hips to a straight knee-hip-shoulder line and squeeze 1–2 seconds.',
        breathing: 'Exhale while locking glutes tight at peak height; inhale smoothly lowering.',
        commonMistakes: [
          'Over-arching lower back high into air past neutral alignment',
          'Setting heels way too far out and cramping hamstrings',
          'Pumping swiftly without clean top-end squeeze'
        ],
        proTip: 'Think about curling your hips underneath you at top lockout—eliminates lower-back extension instantly and spotlights pure glute contraction.'
      }
    },

  {
      id: 'ex-glute-bridge-reach',
      name: 'Glute Bridge with Overhead Reach',
      scientificName: 'Supine bilateral hip extension combined with diagonal thoracic reach',
      subtitle: 'Posterior chain drive paired with thoracic opening and rotational stretch',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Bodyweight (Mat)',
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '8-10/side',
      defaultRestSeconds: 45,
      rpe: '6 - 7',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus', 'Thoracic Spine'],
        secondary: ['Hamstrings', 'Latissimus Dorsi'],
        stabilizers: ['Contralateral Glute Medius', 'Quadratus Lumborum']
      },
      execution: {
        setup: 'Lie on back, knees bent 90°, feet flat hip-width apart.',
        eccentric: 'Lower hips back toward floor with control over 2 seconds.',
        concentric: 'Drive through heels to bridge hips into full extension. At top, reach right arm diagonally across chest overhead toward floor on left side, gently rotating through ribcage. Return to center and repeat on opposite side.',
        breathing: 'Inhale lowering; exhale driving hips up and reaching across.',
        commonMistakes: [
          'Overextending lower back rather than squeezing glutes',
          'Lifting heels off mat',
          'Twisting from hips instead of rotating through upper torso'
        ],
        proTip: 'Keep your knees tracking straight forward while your upper torso rotates—this dissociates hip stability from thoracic mobility.'
      }
    },

  {
      id: 'ex-elevated-single-leg-glute-bridge',
      name: 'Single-Leg Bench Glute Bridge',
      scientificName: 'Unilateral supine hip extension with upper back/foot bench elevation',
      subtitle: 'Unilateral glute bridge from bench pivot for posterior chain strength',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Flat Bench + Mat',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '10-12/side',
      defaultRestSeconds: 60,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus'],
        secondary: ['Hamstrings', 'Adductor Magnus'],
        stabilizers: ['Lumbo-Pelvic Core', 'Gluteus Medius (Anti-Drop)']
      },
      execution: {
        setup: 'Plant one active foot firmly on the bench edge with the other leg raised straight; anchor shoulders evenly on the floor/mat with arms relaxed out for balance.',
        eccentric: 'Lower the pelvis smoothly over 2 seconds without letting the elevated hip tilt unevenly side-to-side.',
        concentric: 'Drive sharply through the grounded heel until hips reach full extension parallel with the working knee and torso.',
        breathing: 'Inhale while lowering; exhale firmly while squeezing the working glute at lockout.',
        commonMistakes: [
          'Arching the lumbar spine aggressively instead of extending strictly at the hip joint',
          'Letting the unsupported side of the pelvis drop low',
          'Racing through reps without pausing at top extension'
        ],
        proTip: 'Keep both hip bones pointed level toward the ceiling throughout the set to double down on glute medius pelvic stability.'
      }
    },

  {
      id: 'ex-seated-banded-hamstring-curl',
      name: 'Seated Banded Leg Curl',
      scientificName: 'Seated 90°-hip-flexed open-chain knee flexion against elastic loop tension',
      subtitle: 'Seated hamstring isolation curl with resistance band',
      pattern: MOVEMENT_PATTERNS.KNEE_FLEXION,
      equipment: 'Loop Resistance Band + Bench',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'hamstrings',
      defaultSets: 4,
      defaultReps: '12-15',
      defaultRestSeconds: 60,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hamstrings (Semitendinosus, Biceps Femoris, Semimembranosus)'],
        secondary: ['Gastrocnemius'],
        stabilizers: ['Core Bracing Muscles']
      },
      execution: {
        setup: 'Anchor a sturdy loop band low in front of a bench or chair, sit tall near the front edge, and wrap the free end securely behind both heels.',
        eccentric: 'Extend the knees smoothly under full elastic resistance over 3 seconds until nearly straight without snapping.',
        concentric: 'Pull both heels sharply underneath the bench seat to peak knee flexion and hold 1 solid second.',
        breathing: 'Exhale strongly as you curl the heels underneath; inhale smoothly on extension.',
        commonMistakes: [
          'Leaning backward and rounding the spine to yank the band',
          'Lifting the thighs off the bench surface',
          'Letting the band whip the legs back straight'
        ],
        proTip: 'Sitting upright with 90° hip flexion stretches the hamstrings across the hip, generating higher hypertrophy stimulus than lying prone curls.'
      }
    }
];
