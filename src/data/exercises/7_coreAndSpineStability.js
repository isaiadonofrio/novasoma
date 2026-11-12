/**
 * COREANDSPINESTABILITY
 * Modular Exercise Sub-Database
 */

import { MOVEMENT_PATTERNS } from '../exerciseConstants.js';

export const COREANDSPINESTABILITY_EXERCISES = [
  {
      id: 'ex-forearm-plank',
      name: 'Forearm Plank',
      scientificName: 'Prone axial anti-extension isometric hold supported on forearms and toes',
      subtitle: 'Foundational core anti-extension & pelvic brace hold',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '30-60s',
      defaultRestSeconds: 45,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Transverse Abdominis'],
        secondary: ['Internal & External Obliques', 'Gluteus Maximus'],
        stabilizers: ['Serratus Anterior', 'Quadriceps', 'Spinal Erectors']
      },
      execution: {
        setup: 'Rest on forearms with elbows directly beneath shoulders, toes planted hip-width behind, building a stiff head-to-heel line.',
        eccentric: 'Resist sagging against gravity by holding subtle posterior pelvic tilt ("tuck tail slightly") throughout the timer.',
        concentric: 'Generate tension isometrically ("pull elbows toward toes and toes toward elbows") while squeezing glutes and quads hard.',
        breathing: 'Shallow, rhythmic diaphragmatic breathing behind a tight abdominal brace without breath holding.',
        commonMistakes: [
          'Letting lower back arch heavily toward the mat under fatigue',
          'Piking hips high upward into an inverted V to unload abs',
          'Dropping ribcage between shoulder blades and hunching the neck'
        ],
        proTip: 'Thirty seconds of maximal active RKC-style bracing produces dramatically higher core stimulus than two passive minutes hanging on lumbar ligaments.'
      }
    },

  {
      id: 'ex-high-plank',
      name: 'High Plank',
      scientificName: 'Straight-arm prone axial anti-extension & serratus protraction isometric',
      subtitle: 'Straight-arm push-up plank for anterior core & shoulder stability',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '40-60s',
      defaultRestSeconds: 45,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Transverse Abdominis'],
        secondary: ['Serratus Anterior', 'Anterior Deltoids', 'Glutes'],
        stabilizers: ['Obliques', 'Quadriceps', 'Wrists & Forearms']
      },
      execution: {
        setup: 'Spread fingers beneath wrists stacked cleanly under shoulders, arms straight without harsh hyperextension, rigid head-to-heel plank line.',
        eccentric: 'Resist downward belly or hip sag through active glute and quadriceps tension.',
        concentric: 'Push floor actively away lifting shoulder space subtly ("protract scapulae slightly") and screw palms outward for shoulder stability.',
        breathing: 'Controlled steady rib-cage breaths while maintaining taut midline brace.',
        commonMistakes: [
          'Sinking chest between collapsed shoulder blades ("winging scapulae")',
          'Dropping hips into painful lower-back sway',
          'Placing hands way out ahead of shoulder vertical line'
        ],
        proTip: 'Pressing the ground actively away in High Plank makes it one of the highest-value drills for serratus anterior strength and overhead shoulder stability.'
      }
    },

  {
      id: 'ex-bear-plank',
      name: 'Bear Plank',
      scientificName: 'Quadruped hovering anti-extension & anti-rotation deep core isometric',
      subtitle: 'Quadruped knee-hover plank targeting transverse abdominis',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '30-45s',
      defaultRestSeconds: 45,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Transverse Abdominis', 'Rectus Abdominis'],
        secondary: ['Serratus Anterior', 'Quadriceps'],
        stabilizers: ['Obliques', 'Multifidus', 'Shoulder Stabilizers']
      },
      execution: {
        setup: 'Set hands vertically below shoulders and knees bent 90° squarely below hips with toes tucked, flattening spine like a rigid tabletop.',
        eccentric: 'Maintain knees hovering only 2–4 cm clear above mat opposing any spinal wobble or tilt.',
        concentric: 'Press palms and toes evenly into floor locking spine neutral and midsection solid.',
        breathing: 'Smooth, quiet nasal breaths as if balancing a full glass of water safely across your lower back.',
        commonMistakes: [
          'Floating knees high upward so knees extend out of 90° alignment',
          'Rounding mid-back high or letting belly arch low',
          'Drifting knees backward away from hip line'
        ],
        proTip: 'Hovering just an inch off the mat amplifies deep transverse abdominis engagement dramatically compared to higher hips.'
      }
    },

  {
      id: 'ex-side-plank',
      name: 'Side Plank',
      scientificName: 'Forearm-supported lateral core isometric hold in frontal-plane alignment',
      subtitle: 'Lateral core isometric hold for obliques and quadratus lumborum',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_LATERAL,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Beginner',
      muscleKey: 'obliques',
      defaultSets: 3,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 45,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Internal & External Obliques', 'Quadratus Lumborum'],
        secondary: ['Gluteus Medius', 'Transverse Abdominis'],
        stabilizers: ['Rotator Cuff & Lats (Support Arm)']
      },
      execution: {
        setup: 'Lie on your side with forearm stacked strictly under shoulder, ankles stacked cleanly together (or staggered scissor-style), pressing hips high into straight alignment.',
        eccentric: 'Hold height rigidly resisting gravity downward without letting hips roll forward or sag.',
        concentric: 'Drive forearm firmly into mat pulling bottom shoulder away from ear while holding glutes and abs engaged.',
        breathing: 'Calm, even breaths without holding tension in the neck.',
        commonMistakes: [
          'Rotating upper hip backward or forward off vertical alignment',
          'Placing bottom elbow too far outside shoulder line',
          'Letting waist bow downward toward the floor'
        ],
        proTip: 'Reach the top arm cleanly straight toward the ceiling—it instantly aligns shoulder stacking and stops anterior rounding.'
      }
    },

  {
      id: 'ex-copenhagen-plank',
      name: 'Copenhagen Plank',
      scientificName: 'Isometric lateral plank with top medial leg suspended on bench for hip adductor torque',
      subtitle: 'Bench-supported adductor & lateral core isometric hold',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_LATERAL,
      equipment: 'Flat Bench + Mat',
      mechanics: 'Isometric',
      level: 'Intermediate',
      muscleKey: 'obliques',
      defaultSets: 3,
      defaultReps: '20-30s/side',
      defaultRestSeconds: 60,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hip Adductors (Longus, Brevis, Magnus, Gracilis)'],
        secondary: ['Internal & External Obliques', 'Quadratus Lumborum'],
        stabilizers: ['Gluteus Medius', 'Shoulder Stabilizers']
      },
      execution: {
        setup: 'Position on your side on a mat with your bottom forearm beneath the shoulder and the medial ankle or shin of your top leg resting on a flat bench.',
        eccentric: 'Resist gravity smoothly without letting the pelvis drop toward the floor or rotate open.',
        concentric: 'Press the top inner foot/shin firmly downward into the bench to float the lower leg parallel underneath and maintain a crisp straight body line.',
        breathing: 'Maintain calm, continuous nasal breaths while keeping lateral core tension solid.',
        commonMistakes: [
          'Letting the pelvis sink or twist forward off vertical alignment',
          'Allowing the bottom elbow to slide too far away from the shoulder line',
          'Supporting only the toes instead of the solid medial ankle/knee surface'
        ],
        proTip: 'To scale down the lever arm safely, rest your top knee on the bench instead of the ankle until your adductor strength builds up.'
      }
    },

  {
      id: 'ex-bird-dog',
      name: 'Bird-Dog',
      scientificName: 'Quadruped opposite-limb extension training anti-rotation & multifidus stability',
      subtitle: 'Cross-pattern quadruped core & lower-back stability drill',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '8-10/side',
      defaultRestSeconds: 45,
      rpe: '6 - 7',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Multifidus & Spinal Erectors', 'Transverse Abdominis'],
        secondary: ['Gluteus Maximus', 'Posterior Deltoid & Lower Traps'],
        stabilizers: ['Obliques (Anti-Rotation)', 'Serratus Anterior']
      },
      execution: {
        setup: 'Start in quadruped tabletop position with hands under shoulders, knees under hips, spine neutral, and eyes down at mat.',
        eccentric: 'Draw outstretched limbs smoothly back under torso without letting stance hip sway laterally.',
        concentric: 'Reach opposite arm forward ("make a tight fist") and push heel straight backward into a level horizontal line—never above hip height—holding 2 seconds.',
        breathing: 'Exhale gently throughout the 2-second extension lock; inhale returning smoothly.',
        commonMistakes: [
          'Swinging back heel high above horizontal and hyperextending lumbar spine',
          'Opening and twisting pelvis sideways toward the raised leg',
          'Lifting chin forward and cranking cervical spine'
        ],
        proTip: 'Focus on length over height: imagine pushing your heel into the far wall behind you while reaching fingers forward.'
      }
    },

  {
      id: 'ex-mcgill-curl-up',
      name: 'McGill Modified Curl-Up',
      scientificName: 'Supine thoracic elevation with neutral lumbar lordosis maintained via hand placement',
      subtitle: 'Spine-sparing rectus abdominis activation with zero disc compression',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '6-8 holds (8s)',
      defaultRestSeconds: 45,
      rpe: '6 - 7',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Transverse Abdominis'],
        secondary: ['Internal & External Obliques'],
        stabilizers: ['Deep Neck Flexors (Longus Colli)']
      },
      execution: {
        setup: 'Lie on your back on a mat. Place both hands palms-down underneath your lower back to maintain natural spinal arch. Bend one knee with foot flat; extend other leg straight.',
        eccentric: 'Lower head and upper shoulders back to mat smoothly without losing hand pressure.',
        concentric: 'Lift head and upper shoulders just 2–3 cm off floor as one rigid unit without tucking chin to chest or flattening lower back. Hold for 7–8 seconds.',
        breathing: 'Breathe shallowly over a braced abdominal wall during the hold.',
        commonMistakes: [
          'Flattening lower back into floor and crushing hands',
          'Yanking neck with chin poking out',
          'Holding breath completely (Valsalva) instead of controlled breathing'
        ],
        proTip: 'Pick a spot on the ceiling directly above you and lift straight up toward it to preserve neck neutrality.'
      }
    },

  {
      id: 'ex-superman-hold',
      name: 'Superman Hold',
      scientificName: 'Prone posterior-chain extension isometric hold loading spinal erectors & glutes',
      subtitle: 'Prone floor extension hold for lower back, glutes & upper back',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Beginner',
      muscleKey: 'back',
      defaultSets: 3,
      defaultReps: '25-40s',
      defaultRestSeconds: 45,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Spinal Erectors (Lumbar & Thoracic)', 'Gluteus Maximus'],
        secondary: ['Hamstrings', 'Posterior Delts & Trapezius'],
        stabilizers: ['Anterior Core Pressure', 'Rotator Cuff']
      },
      execution: {
        setup: 'Lie facedown on a mat with arms extended ahead (or angled wide in a gentle Y if shoulders feel tight), legs straight together, forehead neutral toward mat.',
        eccentric: 'Set limbs smoothly back down onto mat in control after completing hold duration.',
        concentric: 'Engage glutes and belly brace first, then float chest, arms, and straight thighs slightly (~5–8 cm) off floor as one harmonious long arc.',
        breathing: 'Maintain slow, controlled breaths against mild abdominal pressure onto the mat.',
        commonMistakes: [
          'Bending extreme height sharply upward to jam lumbar vertebrae together',
          'Tilting chin forward and craning the neck upward',
          'Bending knees sharply rather than squeezing straight legs long'
        ],
        proTip: 'Reach fingers far ahead and toes far behind rather than chasing high vertical lift—just a few centimeters off the floor delivers optimal safe tension.'
      }
    },

  {
      id: 'ex-hollow-body-hold',
      name: 'Hollow Body Hold',
      scientificName: 'Gymnastic supine crescent isometric hold locking posterior pelvic tilt',
      subtitle: 'Gymnastics core hold with lower back pressed flush to floor',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Intermediate',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '25-40s',
      defaultRestSeconds: 60,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Transverse Abdominis'],
        secondary: ['Obliques', 'Hip Flexors & Quads'],
        stabilizers: ['Deep Neck Flexors', 'Lats']
      },
      execution: {
        setup: 'Lie supine, press belly button forcefully downward stamping lower back 100% flat onto mat, peel shoulder blades clear off floor, and extend straight arms overhead and straight legs out.',
        eccentric: 'Lower legs ONLY as close to floor as your abs can keep lower spine glued flat with zero air gap underneath.',
        concentric: 'Hold whole tight banana/crescent arc with toes pointed, inner thighs squeezed, and shoulder blades off mat.',
        breathing: 'Short, controlled chest breaths while maintaining full abdominal pressure.',
        commonMistakes: [
          'Arching low back off the mat because legs dropped too low',
          'Tucking chin to strain neck instead of curling shoulder blades up',
          'Letting legs separate loosely'
        ],
        proTip: 'Golden rule: if someone could slide fingers under your lower back, raise your legs higher or tuck one knee until lumbar contact stays locked flat.'
      }
    },

  {
      id: 'ex-hanging-knee-raise',
      name: 'Hanging Knee Raise',
      scientificName: 'Bar-suspended hip flexion combined with active posterior pelvic curl',
      subtitle: 'Hanging pull-up bar knee & pelvis tuck for lower abs & grip',
      pattern: MOVEMENT_PATTERNS.CORE_ROTATION,
      equipment: 'Pull-Up Bar',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '10-15',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis'],
        secondary: ['Obliques', 'Hip Flexors'],
        stabilizers: ['Forearms (Grip)', 'Latissimus Dorsi & Scapulae']
      },
      execution: {
        setup: 'Hang from an overhand bar grip shoulder-width apart with active slightly-depressed shoulder blades to halt swinging.',
        eccentric: 'Lower legs slowly over 2–3 seconds without swinging backward into an arched sway.',
        concentric: 'Drive knees upward past hip height and actively curl the tailbone forward toward the ribs ("show your tailbone ahead") at the top.',
        breathing: 'Exhale thoroughly while curling the pelvis upward; inhale on slow descent.',
        commonMistakes: [
          'Stopping knees at 90° horizontal where only hip flexors work and abs stay passive',
          'Swinging rhythmically like a pendulum between reps',
          'Hanging passively with shoulders jammed into ears'
        ],
        proTip: 'Real abdominal work doesn’t even start until the thighs lift above 90° and the lower spine actively curls upward.'
      }
    },

  {
      id: 'ex-bicycle-crunch',
      name: 'Bicycle Crunch',
      scientificName: 'Controlled supine alternating trunk flexion and thoracic rotation',
      subtitle: 'Cross-body alternating crunch for obliques and rectus abdominis',
      pattern: MOVEMENT_PATTERNS.CORE_ROTATION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'obliques',
      defaultSets: 3,
      defaultReps: '16-24',
      defaultRestSeconds: 45,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['External & Internal Obliques', 'Rectus Abdominis'],
        secondary: ['Transverse Abdominis', 'Rectus Femoris'],
        stabilizers: ['Iliopsoas']
      },
      execution: {
        setup: 'Lie supine with lower back pressed down, fingertips resting lightly beside ears (elbows wide—never pull head!), shoulder blades floated gently off mat.',
        eccentric: 'Extend one leg low and long just above mat while rotating evenly toward the opposite knee.',
        concentric: 'Turn your shoulder—not merely your elbow—cleanly across toward the bent raised knee.',
        breathing: 'Exhale through each shoulder-to-knee cross; inhale switching through center.',
        commonMistakes: [
          'Yanking the neck forward tightly with clasped hands',
          'Pedaling fast and wildly while only flapping elbows forward',
          'Arching low back off mat while straightening legs'
        ],
        proTip: 'Performing each cross slowly with a deliberate 2-second cadence produces dramatically greater EMG activation in both abs and obliques.'
      }
    },

  {
      id: 'ex-mountain-climber',
      name: 'Mountain Climber',
      scientificName: 'High-plank dynamic alternating hip flexion for core & metabolic conditioning',
      subtitle: 'Dynamic plank knee drives for abs, hip flexors & cardio',
      pattern: MOVEMENT_PATTERNS.CARDIO_PLYO,
      equipment: 'Bodyweight',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '30-45s',
      defaultRestSeconds: 45,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Iliopsoas'],
        secondary: ['Obliques', 'Serratus Anterior & Delts'],
        stabilizers: ['Quadriceps', 'Gluteus Maximus']
      },
      execution: {
        setup: 'Hold a sturdy High Plank with hands directly beneath shoulders, straight arms, and torso flat parallel to floor.',
        eccentric: 'Extend each leg cleanly back to straight plank alignment without letting hips bounce upward or sag low.',
        concentric: 'Drive alternating knees briskly forward toward your chest in smooth cadence while holding shoulders rock-steady.',
        breathing: 'Continuous crisp rhythmic breathing matching foot cadence.',
        commonMistakes: [
          'Piking hips high into an A-frame bounce with each switch',
          'Shifting shoulders far behind hands',
          'Dropping gaze back between knees rather than looking slightly ahead'
        ],
        proTip: 'Slow down the tempo with a 1-second pause knee-to-chest for pure strength, or drive rapidly with quiet hips for conditioning.'
      }
    },

  {
      id: 'ex-medicine-ball-russian-twist',
      name: 'Medicine Ball Russian Twist',
      scientificName: 'Seated isometric V-sit anti-flexion paired with loaded thoracic rotation',
      subtitle: 'Controlled seated torso twists with medicine ball for obliques',
      pattern: MOVEMENT_PATTERNS.CORE_ROTATION,
      equipment: 'Medicine Ball + Mat',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'obliques',
      defaultSets: 3,
      defaultReps: '16-20',
      defaultRestSeconds: 60,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['External & Internal Obliques', 'Rectus Abdominis'],
        secondary: ['Transverse Abdominis', 'Iliopsoas'],
        stabilizers: ['Anterior Deltoid', 'Quadratus Lumborum']
      },
      execution: {
        setup: 'Sit on mat leaning torso ~45° back with long flat neutral back (not hunched!), knees bent and heels floating slightly (or lightly grounded for beginners).',
        eccentric: 'Decelerate rotation cleanly side-to-side while holding knees completely locked steady forward.',
        concentric: 'Turn the entire chest and shoulders smoothly left and right—following the ball with your eyes—without merely waving hands laterally.',
        breathing: 'Exhale gently into each crisp rotation; inhale passing center.',
        commonMistakes: [
          'Only shifting arms side-to-side while chest faces straight ahead',
          'Collapsing lumbar spine into a slumped C-curve',
          'Swinging knees opposite the ball violently to counterbalance'
        ],
        proTip: 'Imagine a flashlight mounted on the center of your sternum sweeping left and right across the room—real oblique strength comes from ribcage rotation.'
      }
    },

  {
      id: 'ex-farmers-carry',
      name: "Farmer's & Suitcase Loaded Carry",
      scientificName: 'Locomotive dynamic core anti-lateral flexion and axial postural endurance',
      subtitle: 'Full-body loaded walking carry for posture, grip, and core stability',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_LATERAL,
      equipment: 'Kettlebell',
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'forearm',
      defaultSets: 3,
      defaultReps: '30-45 sec',
      defaultRestSeconds: 60,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Forearm Flexors & Grip', 'Trapezius (Upper & Middle)'],
        secondary: ['Quadratus Lumborum', 'Obliques'],
        stabilizers: ['Gluteus Medius', 'Full Core Cylinder']
      },
      execution: {
        setup: 'Pick up a pair of kettlebells or dumbbells (Farmer’s Carry) or one single bell (Suitcase Carry). Stand tall with shoulders pulled down and back.',
        eccentric: 'Walk in a straight line with slow, heel-to-toe deliberate strides, preventing weights from swinging.',
        concentric: 'Resist leaning forward or sideways. Maintain level pelvis and horizontal shoulders for full target duration.',
        breathing: 'Take steady, rhythmic breaths into belly while maintaining 360-degree core stiffness.',
        commonMistakes: [
          'Slumping shoulders forward into thoracic kyphosis',
          'Tilting torso sideways when carrying single weight',
          'Rushing steps and losing balance'
        ],
        proTip: 'Imagine walking with a glass of water balanced on each shoulder—smooth, stable, unwavering strides.'
      }
    }
];
