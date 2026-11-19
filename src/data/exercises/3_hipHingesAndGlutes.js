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
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '8-10/side',
      defaultRestSeconds: 45,
      rpe: '',
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
    },

  {
      id: 'ex-barbell-sumo-deadlift',
      name: 'Barbell Sumo Deadlift',
      scientificName: 'Bilateral Closed-Chain Wide-Stance Externally Rotated Barbell Pull — Reduced Lumbar Moment Arm',
      subtitle: 'Wide-stance sumo floor pull emphasizing hips, adductors & upright torso',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Barbell',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'glutes',
      defaultSets: 4,
      defaultReps: '5-8',
      defaultRestSeconds: 150,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus', 'Adductor Magnus'],
        secondary: ['Quadriceps (Vastus Lateralis & Medialis)', 'Biceps Femoris & Semitendinosus'],
        stabilizers: ['Erector Spinae', 'Latissimus Dorsi', 'Gluteus Medius']
      },
      execution: {
        setup: 'Take a wide stance with toes angled out 30–45° so shins stay vertical and knees track strictly over toes. Grip the smooth-knurling border vertically inside the thighs, wedge hips close to the bar, and lift the chest tall.',
        eccentric: 'Push hips back softly while unlocking the knees evenly to guide the bar straight down the vertical shin track back to a quiet floor rest.',
        concentric: 'Spread the floor laterally with both feet ("open the taint"), pull slack cleanly out of the sleeves, and finish with simultaneous hip and knee lockout.',
        breathing: 'Set a firm Valsalva abdominal brace before breaking the barbell off the floor; reset breath between floor dead-stop reps.',
        commonMistakes: [
          'Hips rising faster than shoulders so the pull collapses into a wide-leg stiff-legged lift',
          'Knees caving inward away from the second-toe alignment',
          'Grip hands rubbing directly against rough inner thighs'
        ],
        proTip: 'Think of patient leg drive off the floor while pinning your shoulders over the bar—the wider stance reduces torso lean by ~15–20% and slashes lumbar shear force.'
      }
    },

  {
      id: 'ex-barbell-good-morning',
      name: 'Barbell Good Morning',
      scientificName: 'Bilateral Closed-Chain High-Bar Long-Lever Hip Hinge — Extended Spinal-Erector & Hamstring Moment',
      subtitle: 'Long-lever posterior-chain hinge placing heavy isometric & eccentric torque on hamstrings',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Barbell',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'hamstrings',
      defaultSets: 3,
      defaultReps: '8-10',
      defaultRestSeconds: 120,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Semitendinosus & Semimembranosus', 'Biceps Femoris (Long Head)', 'Gluteus Maximus'],
        secondary: ['Erector Spinae (Longissimus & Iliocostalis)'],
        stabilizers: ['Transverse Abdominis', 'Obliques', 'Rhomboids']
      },
      execution: {
        setup: 'Unrack the barbell firmly across the mid-trapezius / rear-deltoid shelf (slightly lower than a high-bar squat) with elbows pulled down tight. Stand with feet hip-width and knees unlocked ~15°.',
        eccentric: 'Hinge slowly backward through the hips over 3 seconds, keeping the neutral spine flat and bar path anchored directly above midfoot until torso reaches 20–30° above horizontal.',
        concentric: 'Drive your hips strongly forward and press the upper back up against the barbell to return upright without hyperextending the lower back.',
        breathing: 'Take a deep abdominal breath into the core at the top, hold intra-abdominal pressure throughout the hinge, and exhale past the sticking point.',
        commonMistakes: [
          'Rounding the lumbar spine at the bottom instead of stopping when hamstring end-range is reached',
          'Squatting the knees deeply forward to chase fake torso depth',
          'Placing the barbell high across the cervical neck vertebrae'
        ],
        proTip: 'Because the load sits near C7–T3, its horizontal moment arm relative to the hip pivot is far longer than a deadlift—use modest weight and prioritize crisp hamstring stretch.'
      }
    },

  {
      id: 'ex-b-stance-rdl',
      name: 'B-Stance (Kickstand) Romanian Deadlift',
      scientificName: 'Asymmetric Split-Stance (90/10 Load) Dumbbell Hip Hinge — Unilateral Overload with Stability',
      subtitle: 'Kickstand hip hinge isolating 90% load on one hamstring without balance bottlenecks',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Dumbbells',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'hamstrings',
      defaultSets: 3,
      defaultReps: '10-12/leg',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hamstrings (Lead Leg: Biceps Femoris, Semitendinosus)', 'Gluteus Maximus'],
        secondary: ['Adductor Magnus', 'Gluteus Medius'],
        stabilizers: ['Erector Spinae', 'Core Anti-Rotation Bracing']
      },
      execution: {
        setup: 'Hold dumbbells along the sides of your thighs. Shift ~85–90% of weight onto your flat working lead foot and place the rear trailing toes ~15–20 cm behind, aligned with your lead heel purely as a light kickstand.',
        eccentric: 'Push the working-side hip straight backward toward the wall behind you over 3 seconds while maintaining a soft ~15° front knee bend and square pelvis.',
        concentric: 'Press cleanly through the flat front heel and drive hips smoothly forward to full tall extension without leaning weight back onto the kickstand toes.',
        breathing: 'Inhale while hinging into the front hamstring stretch; exhale driving back tall.',
        commonMistakes: [
          'Stepping the rear leg too far back and turning the movement into an RDL-lunge',
          'Shifting weight evenly onto both feet instead of bias-loading the lead hip',
          'Twisting the pelvis open toward the kickstand side'
        ],
        proTip: 'Cue yourself to "tuck your lead hip pocket back toward the corner behind you"—that maximizes working hamstring lengthening and cancels pelvic rotation.'
      }
    },

  {
      id: 'ex-single-leg-kettlebell-rdl',
      name: 'Single-Leg Kettlebell Romanian Deadlift',
      scientificName: 'Unilateral Single-Leg Contralateral Kettlebell Hip Hinge — Anti-Rotation Hip Control',
      subtitle: 'Free single-leg hinge building unilateral hamstring strength & glute medius stability',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Kettlebell',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'hamstrings',
      defaultSets: 3,
      defaultReps: '8-10/leg',
      defaultRestSeconds: 90,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Biceps Femoris & Semimembranosus', 'Gluteus Maximus', 'Gluteus Medius'],
        secondary: ['Piriformis & Deep Hip External Rotators', 'Adductor Magnus'],
        stabilizers: ['Intrinsic Foot Muscles', 'Obliques', 'Spinal Erectors']
      },
      execution: {
        setup: 'Stand on your working leg holding a single kettlebell in the opposite (contralateral) hand so the handle hovers vertically beneath your hip crease. Pack both shoulder blades subtly down.',
        eccentric: 'Hinge cleanly from the stance hip as the free trailing leg sweeps straight back as one rigid plank with your spine over 3 seconds until torso nears parallel.',
        concentric: 'Drive through the stance tripod foot and snap the hips back upright while pulling the rear hip smoothly into alignment.',
        breathing: 'Inhale before breaking into the hinge with core lightly braced; exhale on the drive back tall.',
        commonMistakes: [
          'Opening the non-stance hip toward the ceiling ("airplane pelvis") instead of keeping shoelaces pointed straight down',
          'Reaching the kettlebell arm down ahead of the foot with a rounded upper back',
          'Looking straight forward and cranking cervical spine extension'
        ],
        proTip: 'Point the toes of the raised trail leg strictly straight down at the floor—that instantly levels the pelvis and fires the stance glute medius.'
      }
    },

  {
      id: 'ex-b-stance-hip-thrust',
      name: 'B-Stance Barbell Hip Thrust',
      scientificName: 'Asymmetric Bench-Supported Barbell Hip Extension — Unilateral Lead-Glute Bias',
      subtitle: 'Heavy single-leg biased barbell hip thrust using a light trailing kickstand',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Barbell + Flat Bench',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '10-12/leg',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus (Working Lead Hip)', 'Gluteus Medius'],
        secondary: ['Semitendinosus & Biceps Femoris', 'Adductor Magnus'],
        stabilizers: ['Rectus Abdominis (Posterior Pelvic Tilt)', 'Quadriceps']
      },
      execution: {
        setup: 'Sit with upper shoulder blades anchored across a flat bench and padded barbell centered across the hip crease. Place the working foot flat so shin is vertical at top lockout; slide the opposite foot forward 15 cm resting lightly on the heel/ball.',
        eccentric: 'Lower the barbell with control as one rigid rib-to-pelvis torso unit over 2 seconds while maintaining ~85% weight pressure through the working flat foot.',
        concentric: 'Drive vertically through the working heel, locking hips completely horizontal with a crisp posterior pelvic tilt and holding 1 full second at peak lockout.',
        breathing: 'Inhale bracing ribs down at the bottom hinge; exhale sharply as you lock out.',
        commonMistakes: [
          'Tilting the barbell unevenly down toward the non-working hip',
          'Pushing mostly with the forward kickstand heel instead of isolating the working leg',
          'Overarching the lower back to fake extra lockout height'
        ],
        proTip: 'Keep your gaze pinned forward at a point on the opposite wall—chasing the ceiling with your eyes guarantees lumbar hyperextension.'
      }
    },

  {
      id: 'ex-glute-bridge-walkout',
      name: 'Glute Bridge Hamstring Walkout',
      scientificName: 'Supine Isometrically Bridged Eccentric Heel Walkout — Incremental Knee-Flexor Loading',
      subtitle: 'Bodyweight bridge-to-extension walkout loading stretched hamstrings under tension',
      pattern: MOVEMENT_PATTERNS.KNEE_FLEXION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'hamstrings',
      defaultSets: 3,
      defaultReps: '8-10',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Biceps Femoris', 'Semitendinosus', 'Semimembranosus'],
        secondary: ['Gluteus Maximus (Isometric Bridge Hold)'],
        stabilizers: ['Core Cylinder', 'Tibialis Anterior']
      },
      execution: {
        setup: 'Lie supine with knees bent at 90°, heels pressed into the mat, and lift into a strong glute bridge with pelvis tucked slightly under.',
        eccentric: 'Keeping hips lifted off the floor, take 4–6 small alternating steps outward onto your heels until knees are nearly straight (~160°) and hamstrings feel intense tension.',
        concentric: 'Walk the heels systematically back toward the glutes step-by-step without letting the hips sag toward the mat.',
        breathing: 'Take steady, controlled breaths throughout each extended step cycle.',
        commonMistakes: [
          'Dropping hips right down to hover 1 cm off the floor during outward steps',
          'Taking huge sloppy jumps outward that snap out of hamstring control',
          'Overarching the lumbar spine instead of maintaining posterior pelvic tuck'
        ],
        proTip: 'Never let your hips dip at the furthest extension point—just 4 deliberate steps out and back creates profound eccentric stimulus with zero equipment.'
      }
    },

  {
      id: 'ex-sliding-hamstring-curl',
      name: 'Supine Sliding Hamstring Bridge Curl',
      scientificName: 'Supine Closed-Chain Biarticular Hip-Extension & Slider Knee-Flexion Curl',
      subtitle: 'High-tension closed-chain slider curl recruiting hamstrings simultaneously at hip & knee',
      pattern: MOVEMENT_PATTERNS.KNEE_FLEXION,
      equipment: 'Floor Sliders / Mat',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'hamstrings',
      defaultSets: 3,
      defaultReps: '8-12',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Biceps Femoris', 'Semitendinosus', 'Semimembranosus'],
        secondary: ['Gluteus Maximus', 'Gastrocnemius'],
        stabilizers: ['Transverse Abdominis', 'Spinal Erectors']
      },
      execution: {
        setup: 'Lie supine on a mat with heels resting securely on floor sliders (or socks on hardwood) with knees bent ~90°. Press palms into the floor beside hips and bridge up.',
        eccentric: 'Slowly glide both heels straight out over 3–4 seconds while driving hips higher relative to knee angle until legs reach near-straight.',
        concentric: 'Pull the heels aggressively back underneath your glutes while elevating the pelvis simultaneously into a peak bridge.',
        breathing: 'Inhale slowly as legs extend outward; exhale powerfully while sliding heels back underneath.',
        commonMistakes: [
          'Hips sagging straight to the floor during the return pull, bypassing concentric hamstring-hip co-contraction',
          'Allowing toes to flare outward into external rotation instead of tracking straight',
          'Rushing through the eccentric glide'
        ],
        proTip: 'Think of pushing the heels straight down through the floor while sliding them back—that keeps glutes and hamstrings firing together continuously.'
      }
    },

  {
      id: 'ex-nordic-hamstring-curl',
      name: 'Nordic Hamstring Curl',
      scientificName: 'Kneeling Ankle-Anchored Supramaximal Eccentric Knee Extension — Distal Biceps Femoris Adaptation',
      subtitle: 'Gold-standard eccentric hamstring strength builder and strain-injury shield',
      pattern: MOVEMENT_PATTERNS.KNEE_FLEXION,
      equipment: 'Ankle Anchor / Mat',
      requiresEquipment: false,
      mechanics: 'Isolation',
      level: 'Advanced',
      muscleKey: 'hamstrings',
      defaultSets: 3,
      defaultReps: '5-6',
      defaultRestSeconds: 120,
      rpe: '9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Biceps Femoris (Long & Short Heads)', 'Semitendinosus', 'Semimembranosus'],
        secondary: ['Gastrocnemius', 'Gluteus Maximus (Isometric Hip Lock)'],
        stabilizers: ['Rectus Abdominis', 'Erector Spinae']
      },
      execution: {
        setup: 'Kneel upright on a thick pad with ankles locked immobile under a padded anchor or partner grip. Squeeze glutes and brace core tightly so knees, hips, and shoulders form one stiff straight line.',
        eccentric: 'Lower the entire straight body forward strictly by opening the knee joint as slowly as possible (3–5 seconds), resisting gravity all the way until hands catch softly at the floor.',
        concentric: 'Give a light push-up off the floor only as needed to re-engage the hamstrings, then pull cleanly back up to kneeling without hinging at the waist.',
        breathing: 'Inhale and lock intra-abdominal pressure at the top; hold brace through the deepest eccentric phase and exhale on recovery.',
        commonMistakes: [
          'Breaking/folding forward at the hip joint ("pike") to shorten the torso lever arm',
          'Free-falling the final 30° straight onto the chest without tension',
          'Allowing ankles to lift off the anchor pad'
        ],
        proTip: 'Peer-reviewed sports medicine trials show consistent Nordic eccentric work increases biceps femoris fascicle length and reduces acute hamstring strain risk by over 50%.'
      }
    },

  {
      id: 'ex-prone-banded-leg-curl',
      name: 'Prone Banded Hamstring Curl',
      scientificName: 'Prone Extended-Hip Open-Chain Knee Flexion — Short-Head Biceps Femoris & Gastroc Synergy',
      subtitle: 'Lying knee flexion curl isolating distal hamstrings with minimal lumbar tension',
      pattern: MOVEMENT_PATTERNS.KNEE_FLEXION,
      equipment: 'Resistance Band + Mat',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'hamstrings',
      defaultSets: 3,
      defaultReps: '12-15',
      defaultRestSeconds: 60,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Biceps Femoris (Long & Short Heads)', 'Semitendinosus'],
        secondary: ['Semimembranosus', 'Gastrocnemius'],
        stabilizers: ['Pelvic Core Floor Brace']
      },
      execution: {
        setup: 'Anchor a resistance band low behind a mat, lie completely prone with pelvis pressed firmly into the floor (slight glute squeeze), and hook the band around both ankles.',
        eccentric: 'Lower both heels smoothly over 2–3 seconds back toward extended knees without letting the elastic band snap shut.',
        concentric: 'Flex both knees forcefully to draw heels toward glutes while keeping hips pinned flat onto the mat throughout the full arc.',
        breathing: 'Exhale while curling heels toward glutes; inhale smoothly on the eccentric descent.',
        commonMistakes: [
          'Lifting the hips off the floor and arching the lower back at peak flexion',
          'Allowing ankles to swing asymmetrically outward',
          'Cutting the final inches of knee extension short'
        ],
        proTip: 'Drive your pubic bone lightly into the floor before starting each rep—that blocks lumbar hyperextension and channels 100% torque into knee flexion.'
      }
    },

  {
      id: 'ex-quadruped-banded-glute-kickback',
      name: 'Quadruped Banded Glute Kickback',
      scientificName: 'Quadruped Open-Chain Hip Extension Against Elastic Vector — Shortened Gluteus Maximus Peak',
      subtitle: 'All-fours banded hip extension targeting peak gluteus maximus contraction',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Resistance Band + Mat',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '12-15/leg',
      defaultRestSeconds: 60,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus'],
        secondary: ['Biceps Femoris & Semitendinosus'],
        stabilizers: ['Transverse Abdominis', 'Contralateral Gluteus Medius', 'Serratus Anterior']
      },
      execution: {
        setup: 'Set up on hands and knees with a resistance band looped around the working heel/midfoot and anchored under the stance hand or knee. Lock ribs softly down to keep a flat neutral lower back.',
        eccentric: 'Return the working knee cleanly under the hip over 2 seconds without twisting the pelvis or losing band tension.',
        concentric: 'Drive the heel straight back and slightly upward toward the ceiling by squeezing the working glute until thigh aligns horizontally with the spine.',
        breathing: 'Exhale gently while extending the leg; inhale on return.',
        commonMistakes: [
          'Kicking high past horizontal by overarching the lower lumbar spine',
          'Rotating hips outward toward the lifted side instead of keeping pelvis level',
          'Swinging the leg rapidly using momentum'
        ],
        proTip: 'Stop hip extension as soon as your femur reaches horizontal inline with your torso—going higher produces lumbar extension, not extra glute recruitment.'
      }
    },

  {
      id: 'ex-prone-alternating-hip-extension',
      name: 'Prone Alternating Straight-Leg Hip Extension',
      scientificName: 'Prone Open-Chain Unilateral Straight-Leg Hip Extension With Neutral Pelvis Lock',
      subtitle: 'Targeted glute-maximus isolation teaching pure hip extension without lumbar arch',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '12-15/side',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus'],
        secondary: ['Hamstrings (Proximal Extensors)'],
        stabilizers: ['Transverse Abdominis', 'Contralateral Lumbar Erectors']
      },
      execution: {
        setup: 'Lie prone on a mat with arms extended softly overhead or folded under your forehead, legs straight, and pelvis anchored gently with a subtle posterior tilt.',
        eccentric: 'Lower the lifted straight leg slowly back to the mat over 2 seconds without relaxing your hip bones.',
        concentric: 'Keeping the knee straight and both hip bones glued to the mat, squeeze one glute to lift that entire leg 10–15 cm off the floor; pause 1 second and alternate.',
        breathing: 'Exhale smoothly on each controlled leg lift; inhale as you lower.',
        commonMistakes: [
          'Lifting the leg excessively high by twisting the pelvis and arching the lower back',
          'Bending the knee instead of extending cleanly from the hip joint',
          'Rushing alternating reps with momentum'
        ],
        proTip: 'Imagine lengthening your heel backward toward the far wall before lifting—axial length keeps the work 100% in your glute instead of your low back.'
      }
    },

  {
      id: 'ex-side-lying-unilateral-leg-lift',
      name: 'Side-Lying Unilateral Leg Lift',
      scientificName: 'Side-Lying Open-Chain Frontal-Plane Hip Abduction Raise',
      subtitle: 'Strict glute medius & lateral-hip endurance isolation on the mat',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '15-20/side',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Medius', 'Gluteus Minimus'],
        secondary: ['Tensor Fasciae Latae', 'Obliques'],
        stabilizers: ['Quadratus Lumborum', 'Bottom Hip Stabilizers']
      },
      execution: {
        setup: 'Lie on your side in one straight line with your bottom leg slightly bent for stability, top hip stacked vertically directly over the bottom hip, and top leg extended long.',
        eccentric: 'Lower the top leg slowly over 2–3 seconds stopping just before resting weight back onto the bottom leg.',
        concentric: 'Lead with your heel (toes neutral or slightly angled down) and raise the top leg ~35–45° smoothly without letting the top hip roll backward.',
        breathing: 'Exhale on the controlled abduction lift; inhale on the descent.',
        commonMistakes: [
          'Rolling the pelvis backward and turning toes up toward the ceiling (shifts load to hip flexors)',
          'Hiking the top hip toward the ribs to manufacture fake height',
          'Swinging the leg rapidly past 45°'
        ],
        proTip: 'Press your top hip gently away from your ribs to create a tiny "mouse house" space under your bottom waist—this locks pure glute medius recruitment.'
      }
    },

  {
      id: 'ex-straight-leg-lateral-abduction',
      name: 'Standing Straight-Leg Lateral Abduction Raise',
      scientificName: 'Standing Open-Chain Unilateral Frontal-Plane Hip Abduction With Stance Pelvic Stabilization',
      subtitle: 'Upright hip-abductor strength training both moving and stance-leg glute medius',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight',
      requiresEquipment: false,
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '12-15/side',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Medius (Working & Stance Side)', 'Gluteus Minimus'],
        secondary: ['Tensor Fasciae Latae', 'Obliques'],
        stabilizers: ['Stance Foot Tripod', 'Lumbo-Pelvic Core']
      },
      execution: {
        setup: 'Stand tall on one grounded leg with light fingertip balance if needed, torso completely upright and working leg straight with toes pointing forward.',
        eccentric: 'Lower the raised leg slowly back toward midline without dropping weight onto the floor between reps.',
        concentric: 'Sweep the straight leg cleanly out to the side (and ~10° back) without tilting your torso away from the working leg; pause 1 second at peak.',
        breathing: 'Exhale while abducting the leg smoothly outward; inhale on the controlled return.',
        commonMistakes: [
          'Leaning the entire torso sharply sideways to lift the foot higher',
          'Turning the foot outward so the quads and hip flexors take over',
          'Letting the stance hip drop out laterally'
        ],
        proTip: 'You should feel intense activation in your standing glute too—that isometric pelvic stabilization directly transfers to running and single-leg squats.'
      }
    },

  {
      id: 'ex-supine-to-seated-hip-extension',
      name: 'Supine-to-Seated Reverse Tabletop Hip Extension',
      scientificName: 'Closed-Chain Reverse Tabletop Bilateral Hip Extension & Anterior Shoulder Opener',
      subtitle: 'Full posterior-chain bridge opening tight chest & shoulders while firing glutes',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus', 'Hamstrings'],
        secondary: ['Posterior Deltoids', 'Triceps Brachii', 'Pectoralis Major (Stretched)'],
        stabilizers: ['Thoracic Erectors', 'Scapular Retractors']
      },
      execution: {
        setup: 'Sit on the mat with knees bent, feet planted hip-width flat, and palms planted behind your hips with fingers pointing outward or slightly back.',
        eccentric: 'Lower your hips smoothly back down toward the mat with control without collapsing your shoulders forward.',
        concentric: 'Press firmly through both heels and hands to lift your pelvis cleanly into a flat reverse tabletop inline from knees to shoulders; pause 2 seconds.',
        breathing: 'Exhale as you drive hips into tabletop extension; inhale on the controlled descent.',
        commonMistakes: [
          'Letting the head drop uncontrollably backward instead of keeping gaze diagonal/neutral',
          'Hyperextending the lower back while hips stay sagged below knee height',
          'Shrugging shoulders tightly into the ears'
        ],
        proTip: 'Think about pushing your knees forward over your toes as your glutes lift—this aligns the shins vertically and opens tight anterior shoulders cleanly.'
      }
    }
];
