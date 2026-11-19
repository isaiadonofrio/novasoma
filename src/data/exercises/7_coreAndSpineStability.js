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
      rpe: '',
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
      rpe: '',
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
      rpe: '',
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
      rpe: '',
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
      rpe: '',
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
      rpe: '',
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
      rpe: '',
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
      rpe: '',
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
      rpe: '',
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
      rpe: '',
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
      defaultReps: '30-45s',
      defaultRestSeconds: 60,
      rpe: '',
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
    },

  {
      id: 'ex-ab-wheel-rollout',
      name: 'Kneeling Ab-Wheel Rollout',
      scientificName: 'Kneeling Dynamic Long-Lever Anti-Extension Rollout — Peak Lengthened Rectus & Lat Integration',
      subtitle: 'Long-lever dynamic anti-extension challenging anterior core & lats across extended ROM',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Ab Wheel + Mat',
      mechanics: 'Compound',
      level: 'Advanced',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '8-12',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis (Long-Lever Anti-Extension)', 'Transverse Abdominis'],
        secondary: ['Latissimus Dorsi (Shoulder Extension Return)', 'Internal & External Obliques'],
        stabilizers: ['Serratus Anterior', 'Triceps Brachii (Long Head)', 'Gluteus Maximus']
      },
      execution: {
        setup: 'Kneel upright on a thick pad holding the ab-wheel handles directly underneath shoulders. Tuck pelvis aggressively posteriorly ("belt buckle up to lower ribs") and squeeze glutes before moving.',
        eccentric: 'Maintaining a hollow spinal tuck—NOT an arch—let hips and arms hinge together forward smoothly, extending the wheel straight overhead toward end controllable range.',
        concentric: 'Pull yourself smoothly back upright by tightening abs and depressing lats downward ("pull hands down toward pockets"), never rocking hips backward prematurely.',
        breathing: 'Inhale into a pressurized abdominal brace before rolling out; exhale sharply past mid-return.',
        commonMistakes: [
          'Sitting glutes backward toward heels so only arms roll forward with zero core lever',
          'Allowing lower back to sag into deep painful lumbar extension as hands go overhead',
          'Overreaching further than true anterior abdominal brace strength allows'
        ],
        proTip: 'Stop each rollout at the exact millimeter where you feel your pelvis want to tip anteriorly—rolling 10 cm shorter with locked core beats deep range with a collapsed spine.'
      }
    },

  {
      id: 'ex-hanging-leg-raise',
      name: 'Hanging Straight-Leg Raise',
      scientificName: 'Suspended Extended-Knee Full Hip & Lumbar Flexion — Max Long-Lever Core Torque',
      subtitle: 'Full extended-leg bar hang lifting pelvis upward for peak lower rectus abdominis torque',
      pattern: MOVEMENT_PATTERNS.CORE_ROTATION,
      equipment: 'Pull-Up Bar',
      mechanics: 'Compound',
      level: 'Advanced',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '8-12',
      defaultRestSeconds: 75,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis (Lower Fibers)', 'Internal & External Obliques'],
        secondary: ['Iliopsoas & Rectus Femoris (Hip Flexors)'],
        stabilizers: ['Latissimus Dorsi (Active Shoulder Brace)', 'Forearm Flexors']
      },
      execution: {
        setup: 'Take a shoulder-width pronated grip on a high pull-up bar, press shoulder blades subtly down into an active dead hang, and brace legs locked straight together.',
        eccentric: 'Lower straight legs continuously over 3 full seconds all the way down until hanging perfectly still beneath hips without swinging backward.',
        concentric: 'Lift both straight legs up to 90° and finish every rep by actively curling the tailbone/pelvis upward toward your ribcage (posterior lumbar curl).',
        breathing: 'Exhale powerfully while curling legs and pelvis upward; inhale under eccentric descent.',
        commonMistakes: [
          'Kicking backward and swinging momentum forward into the next rep',
          'Stopping legs at 90° horizontal where only hip flexors did the work and rectus stayed static',
          'Shrugging shoulders passively near earlobes'
        ],
        proTip: 'Raising straight legs to 90° is mostly iliopsoas; rounding the lower pelvis upward past 90° toward toes-to-bar is what actually shortens and loads the rectus abdominis dynamically.'
      }
    },

  {
      id: 'ex-banded-pallof-press',
      name: 'Standing Banded Pallof Press',
      scientificName: 'Standing Lateral-Tension Isometric Press-Out — Progressive Transverse Anti-Rotation Core Brace',
      subtitle: 'Anti-rotation press levering lateral resistance to build 360° rotational spinal stability',
      pattern: MOVEMENT_PATTERNS.CORE_ROTATION,
      equipment: 'Resistance Band',
      mechanics: 'Isometric',
      level: 'Beginner',
      muscleKey: 'obliques',
      defaultSets: 3,
      defaultReps: '10-12/side',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Internal & External Obliques', 'Transverse Abdominis'],
        secondary: ['Rectus Abdominis', 'Multifidus & Quadratus Lumborum'],
        stabilizers: ['Gluteus Medius (Stance Anti-Shift)', 'Anterior Deltoid', 'Scapular Stabilizers']
      },
      execution: {
        setup: 'Anchor a resistance band at chest height perpendicular to your body. Step sideways until noticeable tension pulls laterally, assume an athletic quarter-squat stance, and clasp both hands holding the band centered against sternum.',
        eccentric: 'Pull hands steadily straight back along the sternal line over 2 seconds without letting torso rotate or drift sideways.',
        concentric: 'Press hands symmetrically straight forward away from sternum to full arm extension along the midline, resisting any lateral band twist, and hold rigid for 2 full seconds.',
        breathing: 'Breathe crisply out over a tight 360° braced abdominal wall at extended hold; inhale on return.',
        commonMistakes: [
          'Allowing arms to drift crookedly sideways toward the anchor post',
          'Turning chest or hips slightly toward the resistance direction',
          'Shrugging shoulders up around neck during press-out'
        ],
        proTip: 'Narrowing your stance from wide athletic to tall hip-width intensifies rotational challenge without adding a thicker resistance band.'
      }
    },

  {
      id: 'ex-kettlebell-windmill',
      name: 'Overhead Kettlebell Windmill',
      scientificName: 'Tri-Planar Offset Hip Hinge With Overhead Scapular Stabilization — Frontal & Transverse Integration',
      subtitle: 'Tri-planar overhead hinge mobilizing posterior hips while hardening shoulder & lateral core stability',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_LATERAL,
      equipment: 'Kettlebell',
      mechanics: 'Compound',
      level: 'Advanced',
      muscleKey: 'obliques',
      defaultSets: 3,
      defaultReps: '6-8/side',
      defaultRestSeconds: 75,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Internal & External Obliques', 'Quadratus Lumborum', 'Gluteus Maximus & Medius'],
        secondary: ['Hamstrings (Back-Hip Hinge)', 'Rotator Cuff & Serratus Anterior'],
        stabilizers: ['Spinal Erectors', 'Triceps Brachii (Overhead Lockout)']
      },
      execution: {
        setup: 'Press a single kettlebell overhead with elbow locked completely vertical and palm facing forward. Pivot BOTH feet ~45° away from the overhead bell side, keeping visual eyes locked straight up onto the overhead kettlebell.',
        eccentric: 'Push hips laterally backward under the loaded side while tracing your bottom free hand cleanly down the inside of your front calf over 3 seconds—keeping the overhead bell arm perpendicular to the floor at all times.',
        concentric: 'Drive firmly through the hip/glute of the loaded rear leg and reverse the hinge smoothly upright while keeping your overhead shoulder stably packed.',
        breathing: 'Inhale tightening lateral obliques as you hinge down; exhale smoothly pressing hips back vertical.',
        commonMistakes: [
          'Bending sideways purely from the lumbar spine instead of pushing the hip back into a hinge',
          'Allowing the overhead kettlebell to drift forward away from vertical shoulder-stack alignment',
          'Dropping gaze down to the floor and losing shoulder awareness'
        ],
        proTip: 'Lock your eyes directly onto the overhead kettlebell throughout the entire rep—this automatically aligns cervical/thoracic rotation and holds the arm plumb vertical.'
      }
    },

  {
      id: 'ex-kettlebell-suitcase-carry',
      name: 'Unilateral Kettlebell Suitcase Carry',
      scientificName: 'Unilateral Loaded Gait Carry — Contralateral Quadratus Lumborum & Oblique Anti-Lateral Flexion',
      subtitle: 'Single-arm loaded walk fortifying lateral spinal pillar stability & grip endurance',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_LATERAL,
      equipment: 'Kettlebell',
      mechanics: 'Isometric',
      level: 'Intermediate',
      muscleKey: 'obliques',
      defaultSets: 3,
      defaultReps: '40-60s/side',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadratus Lumborum (Contralateral Side)', 'External & Internal Obliques'],
        secondary: ['Gluteus Medius (Pelvic Leveling)', 'Forearm Flexors (Grip)'],
        stabilizers: ['Upper & Middle Trapezius', 'Multifidus', 'Transverse Abdominis']
      },
      execution: {
        setup: 'Deadlift a single kettlebell in one hand at your side while standing completely level—do NOT lean sideways away from or toward the weight. Float the kettlebell 2–3 cm off your outer thigh.',
        eccentric: 'Control weight descent smoothly onto floor at the end of the timed interval via clean hip hinge.',
        concentric: 'Walk deliberately heel-to-toe for the target duration, holding shoulders level, hips quiet, and ribcage squared forward with zero sidebending wobble.',
        breathing: 'Take smooth rhythmic nasal breaths into the lower core brace without breaking trunk stiffness.',
        commonMistakes: [
          'Tilting torso sideways like the Leaning Tower of Pisa to counterweight the bell',
          'Letting the bell bang repeatedly against the lateral thigh',
          'Speed-walking with sloppy pelvic drop on each swing phase'
        ],
        proTip: 'Stuart McGill’s spinal stability research highlights heavy single-arm Suitcase Carries for producing strong quadratus lumborum & oblique stiffness with minimal compressive disc penalty.'
      }
    },

  {
      id: 'ex-kettlebell-front-rack-carry',
      name: 'Kettlebell Front-Rack Carry',
      scientificName: 'Anterior Thoracic-Racked Loaded Gait Carry — Thoracic Anti-Flexion & Diaphragmatic Bracing Under Load',
      subtitle: 'Front-racked kettlebell walk training upright thoracic endurance & pressured breathing',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Kettlebell',
      mechanics: 'Isometric',
      level: 'Intermediate',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '45-60s',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis & Transverse Abdominis', 'Thoracic Erector Spinae'],
        secondary: ['Biceps & Anterior Deltoid (Isometric Rack)', 'Gluteus Medius'],
        stabilizers: ['Rhomboids', 'Diaphragm (Respiration Under Chest Compression)']
      },
      execution: {
        setup: 'Clean single or dual kettlebells into tight front-rack pockets: wrists completely neutral and straight, fists tucked under chin, elbows pinned slightly forward against upper ribs, and bells nestled comfortably between forearm and biceps.',
        eccentric: 'Lower bells safely via controlled clean-down hinge at set completion.',
        concentric: 'Walk smoothly tall for full target duration pushing chest gently forward into bells and preventing elbows from sagging down.',
        breathing: 'Practice crisp diaphragmatic "sipping" breaths underneath the anterior core brace without losing rib-to-pelvis stacked posture.',
        commonMistakes: [
          'Leaning torso backward into lumbar hyperextension to let bells rest lazily on collarbone',
          'Collapsing forearms inward or bending wrists backward',
          'Holding breath rigidly for the entire walk'
        ],
        proTip: 'Maintaining neutral rib alignment while breathing cleanly against chest-level load directly builds the core pressure tolerance required for heavy Front Squats and Overhead Presses.'
      }
    },

  {
      id: 'ex-kettlebell-bottoms-up-carry',
      name: 'Kettlebell Bottoms-Up Carry',
      scientificName: 'Unilateral Inverted-Kettlebell Walk — Maximum Grip Irradiation & Reflexive Rotator Cuff Centration',
      subtitle: 'Inverted-bell carry triggering high grip irradiation and dynamic rotator cuff shoulder health',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_LATERAL,
      equipment: 'Kettlebell',
      mechanics: 'Isometric',
      level: 'Advanced',
      muscleKey: 'forearm',
      defaultSets: 3,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Forearm Flexors & Grip Irradiation', 'Rotator Cuff (Infraspinatus, Supraspinatus, Subscapularis)'],
        secondary: ['Anterior & Lateral Deltoid', 'Serratus Anterior'],
        stabilizers: ['Obliques & Core Bracing Muscles', 'Biceps Brachii']
      },
      execution: {
        setup: 'Clean a light-to-moderate kettlebell upside down ("bottoms-up") with elbow bent cleanly at 90° right in front of your shoulder, forearm strictly vertical, wrist straight, and base facing ceiling.',
        eccentric: 'Control the bell safely back down to your lower rack using your free hand if grip begins wavering.',
        concentric: 'Crush the handle relentlessly to balance the inverted top-heavy mass straight overhead while walking slowly with calm upright alignment.',
        breathing: 'Steady rhythmic breaths into core while keeping shoulder packed securely down in its socket.',
        commonMistakes: [
          'Using excessive weight so the inverted bell flips uncontrollably sideways',
          'Shrugging shoulder upward toward earlobe and tucking elbow tightly into belly',
          'Bending the wrist backward'
        ],
        proTip: 'Maximum hand-grip irradiation triggers automatic neurological co-contraction across the rotator cuff stabilizers—forcing flawless humeral centration on every step.'
      }
    },

  {
      id: 'ex-prone-cobra-hold',
      name: 'Prone Postural Cobra Hold',
      scientificName: 'Prone Thoracic Extension With Bilateral Humeral External Rotation & Scapular Retraction',
      subtitle: 'Physiotherapy anti-kyphosis extension hold targeting mid/lower traps & thoracic erectors',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Beginner',
      muscleKey: 'back',
      defaultSets: 3,
      defaultReps: '30-45s',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Thoracic Spinal Erectors', 'Middle & Lower Trapezius', 'Rhomboids'],
        secondary: ['Posterior Deltoids', 'Infraspinatus & Teres Minor'],
        stabilizers: ['Gluteus Maximus (Pelvic Anchor)', 'Deep Cervical Flexors (Chin Tuck)']
      },
      execution: {
        setup: 'Lie face down on a mat with legs straight, toes resting lightly on the floor, and arms beside your torso with palms facing downward.',
        eccentric: 'Lower smoothly back down to rest your forehead lightly on the mat once the hold interval completes.',
        concentric: 'Gently squeeze glutes to stabilize the pelvis, hover your chest only 5–10 cm off the mat (looking straight down with a subtle chin tuck), rotate thumbs outward toward the ceiling, and draw shoulder blades down toward your hips.',
        breathing: 'Breathe calmly and steadily through the nose while keeping your neck long and lower back relaxed.',
        commonMistakes: [
          'Cranking the head backward to look at the wall ahead and straining the cervical spine',
          'Hyperextending high from the lower back instead of lengthening cleanly through the mid-back',
          'Shrugging shoulders toward ears instead of depressing scapulae downward'
        ],
        proTip: 'Keep your gaze strictly straight down at the floor—lifting just a few centimeters with thumbs turned out gives maximum thoracic posture endurance with zero lumbar jamming.'
      }
    },

  {
      id: 'ex-jefferson-curl',
      name: 'Light-Loaded Jefferson Curl',
      scientificName: 'Loaded Segmental Cervical-Thoracic-Lumbar Flexion & Eccentric Posterior-Chain Articulation',
      subtitle: 'Gymnastics controlled segmental spine flexion & hamstring lengthening under very light load',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Single Dumbbell',
      mechanics: 'Mobility',
      level: 'Intermediate',
      muscleKey: 'back',
      defaultSets: 2,
      defaultReps: '5-6',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Segmental Spinal Erectors (Eccentric)', 'Thoracolumbar Fascia', 'Hamstrings'],
        secondary: ['Gastrocnemius & Soleus', 'Multifidus'],
        stabilizers: ['Deep Abdominal Bracing Cylinder', 'Forearms & Grip']
      },
      execution: {
        setup: 'Stand tall on a sturdy box or flat floor with feet hip-width and knees locked straight (softly unlocked if calves feel tight). Hold a very light dumbbell or kettlebell (2–8 kg) with relaxed straight arms in front of your thighs.',
        eccentric: 'Tuck your chin firmly to chest first, then peel down slowly ONE vertebra at a time—neck, upper back, mid-back, lower back, and finally hinging gently into the hips for a 5-second descent.',
        concentric: 'Pause 2 calm breaths at bottom end range, then reverse smoothly from the bottom up: tuck pelvis under first and restack lumbar, thoracic, and cervical vertebrae one by one.',
        breathing: 'Slow controlled exhalation as you roll downward; steady calm breaths at the bottom.',
        commonMistakes: [
          'Using heavy weight like a deadlift (this is a light mobility & segmental strength drill, never a max load lift)',
          'Hinging flat-backed at the hips instead of articulating one vertebra at a time',
          'Rushing the ascent without restacking from pelvis upward'
        ],
        proTip: 'Never load this heavy—a light 4–6 kg weight acts simply as gentle traction teaching healthy segmental spine control and hamstring tolerance.'
      }
    },

  {
      id: 'ex-butterfly-sit-up-extension',
      name: 'Butterfly Sit-Up to Leg Extension',
      scientificName: 'Supine Abducted-Hip Spinal Flexion Sit-Up Transitioning Into Extended-Lever Core Hold',
      subtitle: 'Dynamic anterior-core curl pairing butterfly hip abduction with extended-leg control',
      pattern: MOVEMENT_PATTERNS.CORE_ROTATION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Transverse Abdominis'],
        secondary: ['Iliopsoas (Controlled Extension)', 'Obliques'],
        stabilizers: ['Deep Cervical Flexors', 'Hip Adductors']
      },
      execution: {
        setup: 'Lie supine on a mat with soles of feet together and knees fallen open (butterfly position) to quiet excessive hip-flexor takeover.',
        eccentric: 'Unroll vertebra by vertebra back toward the mat while smoothly extending your legs long into controlled low hover tension.',
        concentric: 'Draw ribs firmly toward pelvis to curl smoothly up to seated while drawing soles back into butterfly compression.',
        breathing: 'Exhale decisively on the curl up; inhale smoothly as you unroll and extend.',
        commonMistakes: [
          'Whipping the arms violently upward to yank off the floor',
          'Letting the lower back arch off the mat during the leg extension phase',
          'Tucking chin aggressively into chest'
        ],
        proTip: 'Slow down the unrolling eccentric to 3 full seconds—controlled segmental lowering develops far stronger anterior core control than fast reps.'
      }
    },

  {
      id: 'ex-forearm-plank-single-arm-slide',
      name: 'Forearm Plank Single-Arm Reach Slide',
      scientificName: 'Tri-Point Closed-Chain Anti-Extension & Anti-Rotation Forearm Plank With Unilateral Reach',
      subtitle: 'Anti-rotation plank progression challenging obliques & shoulder stability',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Intermediate',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '8-10/side',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Internal & External Obliques', 'Transverse Abdominis'],
        secondary: ['Serratus Anterior (Support Arm)', 'Anterior Deltoid'],
        stabilizers: ['Gluteus Maximus', 'Quadriceps']
      },
      execution: {
        setup: 'Set a crisp forearm plank with feet slightly wider than hip width for anti-rotation leverage, glutes engaged, and ribs tucked.',
        eccentric: 'Glide the reaching hand smoothly back underneath your shoulder while keeping both hip bones perfectly level to the floor.',
        concentric: 'Brace deeply through your obliques and slide one arm straight forward overhead along the mat (or hovering 2 cm above it); pause 2 seconds and alternate.',
        breathing: 'Exhale steadily during each forward arm reach; inhale as you replant.',
        commonMistakes: [
          'Rotating the pelvis sharply toward the reaching side',
          'Sagging through the lower back or letting the support shoulder collapse',
          'Rushing side-to-side transfers without pausing'
        ],
        proTip: 'Imagine balancing a full cup of coffee on your sacrum—widening your feet slightly gives you the base to keep the pelvis 100% frozen.'
      }
    },

  {
      id: 'ex-high-plank-leg-lift',
      name: 'High Plank Alternating Leg Lift',
      scientificName: 'Tri-Point High-Plank Anti-Extension & Glute-Driven Alternating Hip Extension',
      subtitle: 'Straight-arm plank variation integrating core anti-extension with glute activation',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '10-12/side',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Transverse Abdominis', 'Gluteus Maximus'],
        secondary: ['Serratus Anterior', 'Obliques', 'Hamstrings'],
        stabilizers: ['Anterior Deltoids', 'Triceps Brachii']
      },
      execution: {
        setup: 'Assume a tall high plank with hands directly beneath shoulders, shoulder blades slightly protracted, and body aligned straight from crown to heels.',
        eccentric: 'Return the lifted foot softly to the mat without shifting weight unevenly across your hands.',
        concentric: 'Keeping lower ribs tucked so the lumbar spine cannot dip, squeeze one glute to float that straight leg 15–20 cm off the floor; pause 1 second and switch.',
        breathing: 'Exhale cleanly on each leg lift; inhale as the foot returns.',
        commonMistakes: [
          'Kicking the leg high while letting the lower back sag into hyperextension',
          'Twisting the hips open sideways',
          'Piking hips high into a downward dog'
        ],
        proTip: 'Keep the lift deliberately modest—true glute extension stops well before your lower back wants to arch.'
      }
    },

  {
      id: 'ex-hollow-body-rock',
      name: 'Hollow Body Rock',
      scientificName: 'Dynamic Supine Gymnastics Hollow-Body Posterior-Pelvic-Tilt Oscillatory Rock',
      subtitle: 'Gold-standard gymnastics core tension drill building unbreakable anterior bracing',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '12-16 rocks',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Transverse Abdominis'],
        secondary: ['Internal & External Obliques', 'Iliopsoas', 'Quadriceps'],
        stabilizers: ['Latissimus Dorsi (Overhead Reach)', 'Deep Cervical Flexors']
      },
      execution: {
        setup: 'Lie supine, press your lower back firmly into the mat (zero gap), extend legs straight together with pointed toes hovering low, and stretch arms overhead beside ears.',
        eccentric: 'Initiate a tiny smooth rocking wave backward toward your upper shoulder blades without losing the tight C-curve shape.',
        concentric: 'Rock cleanly forward onto your lower sacrum like a rigid wooden rocking chair—arms, ribs, and legs moving together as one single piece.',
        breathing: 'Short, rhythmic pressurized breaths behind a locked abdominal wall.',
        commonMistakes: [
          'Allowing the lower back to arch off the floor (breaking the hollow shape)',
          'Flapping legs or arms independently instead of rocking as a unified arc',
          'Straining the neck forward without lifting shoulder blades off the mat'
        ],
        proTip: 'If your low back lifts even a millimeter, raise your legs higher or tuck one knee in until you own a completely silent, smooth rock.'
      }
    },

  {
      id: 'ex-hollow-tuck-to-v-sit',
      name: 'Hollow Body Tuck to V-Sit',
      scientificName: 'Dynamic Supine-to-Seated Hip-Compression & Trunk-Flexion V-Sit Transition',
      subtitle: 'Dynamic gymnastics compression building explosive abs & hip-flexor control',
      pattern: MOVEMENT_PATTERNS.CORE_ROTATION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Advanced',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '8-12',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Iliopsoas', 'Rectus Femoris'],
        secondary: ['Transverse Abdominis', 'Obliques'],
        stabilizers: ['Anterior Deltoids', 'Deep Cervical Flexors']
      },
      execution: {
        setup: 'Begin in a tight hollow-body hold on a mat with lower back glued down, shoulder blades lifted, and feet hovering cleanly off the floor.',
        eccentric: 'Unfold smoothly back from the balanced V-sit into your braced hollow-body hold over 2–3 seconds without letting heels touch the mat.',
        concentric: 'Snap torso and legs simultaneously upward into a balanced seated V-sit (or tucked V-sit) reaching fingertips toward your shins; pause 1 second on your sit-bones.',
        breathing: 'Exhale forcefully as you compress into the V-sit; inhale as you open cleanly back to hollow.',
        commonMistakes: [
          'Collapsing the lower back flat to the mat with an audible thud',
          'Swinging the heels off the ground between every repetition',
          'Hunching the shoulders tightly into the ears at the top'
        ],
        proTip: 'Pause a full 1-second balance at the top V-sit on every rep—controlling the apex eliminates momentum cheating.'
      }
    },

  {
      id: 'ex-hollow-to-superman-roll',
      name: 'Hollow-to-Superman Axial Roll',
      scientificName: 'Continuous 180° Longitudinal Axial Roll Transitioning Anterior Hollow to Posterior Arch',
      subtitle: '360° gymnastics trunk-integration roll linking anterior and posterior core chains',
      pattern: MOVEMENT_PATTERNS.CORE_ROTATION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'obliques',
      defaultSets: 3,
      defaultReps: '6-8/dir',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Internal & External Obliques', 'Rectus Abdominis', 'Erector Spinae'],
        secondary: ['Gluteus Maximus', 'Quadratus Lumborum', 'Latissimus Dorsi'],
        stabilizers: ['Transverse Abdominis', 'Scapular Stabilizers']
      },
      execution: {
        setup: 'Start in a crisp supine hollow hold with arms extended overhead and feet hovering 15 cm off a wide mat.',
        eccentric: 'Keeping arms and legs off the floor at all times, initiate a smooth 180° log roll strictly through your torso until you land cleanly in a braced prone Superman arch.',
        concentric: 'Hold the Superman arch for 1–2 seconds, then reverse the roll seamlessly back to your hollow hold without letting hands or feet touch down.',
        breathing: 'Steady controlled exhale during each transitional roll phase.',
        commonMistakes: [
          'Kicking a foot or slapping a hand onto the floor to push through the roll',
          'Bending elbows or knees wildly mid-turn',
          'Forgetting to pause and own both the hollow and Superman end positions'
        ],
        proTip: 'Rolling smoothly without touching the floor forces your entire 360° abdominal cylinder—front, sides, and back—to hand off tension seamlessly.'
      }
    },

  {
      id: 'ex-inverted-plank-single-arm-hip',
      name: 'Inverted Plank Single-Arm Hip Balance',
      scientificName: 'Supine Reverse-Plank Unilateral Shoulder-Support Anti-Rotation & Posterior-Chain Hold',
      subtitle: 'Reverse-plank balance strengthening posterior chain, obliques & shoulder stability',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_LATERAL,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Advanced',
      muscleKey: 'glutes',
      defaultSets: 3,
      defaultReps: '15-25s/side',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Maximus', 'Hamstrings', 'Posterior Deltoids (Support Arm)'],
        secondary: ['Obliques (Anti-Rotation)', 'Erector Spinae', 'Triceps Brachii'],
        stabilizers: ['Scapular Stabilizers', 'Transverse Abdominis']
      },
      execution: {
        setup: 'Press up into a tall straight-leg reverse plank with heels grounded, glutes lifted cleanly inline, and hands beneath shoulders.',
        eccentric: 'Return the free hand softly back beneath your shoulder with zero hip drop before switching sides.',
        concentric: 'Shift weight smoothly over one sturdy support arm and float the opposite hand cleanly onto your hip or skyward while keeping both hip bones level.',
        breathing: 'Calm, controlled breaths keeping the chest open and support shoulder packed down.',
        commonMistakes: [
          'Letting the hips sag down toward the floor when lifting one hand',
          'Hyperextending the support elbow passively without muscular lock',
          'Dropping the head back uncontrollably'
        ],
        proTip: 'Press your heels firmly down into the floor to keep the posterior chain firing—active hamstrings prevent the pelvis from twisting.'
      }
    },

  {
      id: 'ex-leg-scissors-floor',
      name: 'Supine Floor Leg Scissors',
      scientificName: 'Supine Alternating Straight-Leg Sagittal Anti-Extension Scissor Kicks',
      subtitle: 'Lower-abdominal endurance drill resisting lumbar arch under alternating leg levers',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '30-45s',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Transverse Abdominis'],
        secondary: ['Iliopsoas', 'Rectus Femoris', 'Internal Obliques'],
        stabilizers: ['Lumbo-Pelvic Floor', 'Deep Cervical Flexors']
      },
      execution: {
        setup: 'Lie supine on a mat, press your lower back firmly flat into the floor, extend both legs straight, and rest hands comfortably beside your hips.',
        eccentric: 'Lower one straight leg smoothly toward a low hover (10–15 cm above the floor) while raising the opposite leg cleanly upward.',
        concentric: 'Alternate smoothly in a rhythmic vertical or crisp crisscross scissor pattern without ever letting your lower back peel off the mat.',
        breathing: 'Even, steady rhythmic breathing—never hold your breath during flutter/scissor sets.',
        commonMistakes: [
          'Letting the lower back arch high off the mat as the heels drop low',
          'Bending the knees lazily instead of keeping crisp long levers',
          'Straining the neck upward if head is lifted'
        ],
        proTip: 'Raise the working angle of both legs slightly higher toward 45° whenever you feel your lower back start to peel off the mat.'
      }
    },

  {
      id: 'ex-plank-body-saw-to-pike',
      name: 'Plank Body-Saw to Pike',
      scientificName: 'Forearm-Plank Long-Lever Anti-Extension Body-Saw Transitioning Into Active Hip Pike',
      subtitle: 'High-tension anterior-core progression combining long-lever saw & pike compression',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '8-12',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis', 'Transverse Abdominis', 'Serratus Anterior'],
        secondary: ['Internal & External Obliques', 'Anterior Deltoids', 'Hip Flexors'],
        stabilizers: ['Latissimus Dorsi', 'Quadriceps']
      },
      execution: {
        setup: 'Start in a strict forearm plank with elbows stacked under shoulders, ribs tucked down, and feet grounded on toes (or on sliders/socks).',
        eccentric: 'Glide your entire straight body smoothly backward behind your elbows (body-saw) to dramatically lengthen the abdominal lever without letting hips sag.',
        concentric: 'Pull smoothly forward through plank and drive hips high into a tight abdominal pike while pressing firmly through forearms; pause 1 second and reset.',
        breathing: 'Inhale on the lengthened backward body-saw; exhale forcefully while compressing into the pike.',
        commonMistakes: [
          'Allowing the lumbar spine to collapse during the backward body-saw',
          'Shrugging shoulders into the ears during the pike',
          'Rushing the transition instead of owning the stretched saw hold'
        ],
        proTip: 'Even 5–8 cm of backward shoulder travel behind your elbows multiplies rectus abdominis EMG activation dramatically—prioritize zero lumbar sag over huge distance.'
      }
    },

  {
      id: 'ex-prone-back-extension',
      name: 'Prone Back Extensions',
      scientificName: 'Prone Floor Bilateral Spinal Erector & Posterior-Chain Extension Raises',
      subtitle: 'Dynamic floor spinal-extensor strengthening building resilient lower & mid-back endurance',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'back',
      defaultSets: 3,
      defaultReps: '12-15',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Erector Spinae (Thoracic & Lumbar)', 'Multifidus'],
        secondary: ['Gluteus Maximus', 'Middle & Lower Trapezius', 'Hamstrings'],
        stabilizers: ['Deep Cervical Flexors', 'Transverse Abdominis']
      },
      execution: {
        setup: 'Lie prone on a mat with legs straight, toes anchored gently on the floor, and hands resting lightly beside your temples or folded under your chin.',
        eccentric: 'Lower your torso slowly back toward the mat over 2–3 seconds maintaining long spinal alignment.',
        concentric: 'Engage your glutes lightly to protect the pelvis and smoothly lift your chest and ribs off the floor using your back extensors; pause 1–2 seconds at top.',
        breathing: 'Exhale gently on the lift; inhale smoothly as you lower.',
        commonMistakes: [
          'Whipping upward with momentum and jamming the lumbar spine',
          'Cranking the neck backward to look up at the wall instead of gazing at the mat',
          'Letting the feet fly wildly off the ground'
        ],
        proTip: 'Keep your gaze aimed down at the mat right beneath your nose so your cervical spine remains an unbroken extension of your thoracic back.'
      }
    },

  {
      id: 'ex-seated-bent-knee-hip-lift',
      name: 'Seated Bent-Knee Hip Flexion Lift',
      scientificName: 'Seated Closed-Hand-Support Bilateral Hip-Flexor & Lower-Core Compression Lift',
      subtitle: 'Gymnastics L-sit compression prerequisite building hip-flexor & lower-ab strength',
      pattern: MOVEMENT_PATTERNS.CORE_ROTATION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Iliopsoas', 'Rectus Abdominis (Lower Compression)'],
        secondary: ['Rectus Femoris', 'Transverse Abdominis'],
        stabilizers: ['Thoracic Erectors', 'Triceps & Scapular Depressors (Hand Support)']
      },
      execution: {
        setup: 'Sit on a mat with knees bent, feet resting lightly on the floor, and palms planted smoothly behind or beside your hips to maintain an open, controlled torso angle.',
        eccentric: 'Lower both feet slowly back toward a feather-light touch over 2 seconds without slumping your chest.',
        concentric: 'Brace your lower abs firmly and draw both bent knees cleanly upward toward your chest until shins float parallel; pause 1–2 seconds at peak compression.',
        breathing: 'Exhale crisply while compressing knees upward; inhale on the controlled descent.',
        commonMistakes: [
          'Leaning far backward to make the lift effortless',
          'Dropping the heels heavily onto the floor between reps',
          'Shrugging shoulders up around the ears'
        ],
        proTip: 'Walking your hands slightly further forward toward your thighs progressively turns this into a direct precursor for full floor L-sits.'
      }
    },

  {
      id: 'ex-staggered-side-lying-hip-arm-lift',
      name: 'Staggered Side-Lying Hip & Arm Balance',
      scientificName: 'Side-Lying Unilateral Lateral-Chain Elevation & Scapular-Propped Oblique Hold',
      subtitle: 'Lateral-chain oblique & shoulder balance drill sculpting frontal-plane core stability',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_LATERAL,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Intermediate',
      muscleKey: 'obliques',
      defaultSets: 3,
      defaultReps: '20-30s/side',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Internal & External Obliques', 'Quadratus Lumborum'],
        secondary: ['Gluteus Medius', 'Hip Adductors', 'Serratus Anterior (Support Arm)'],
        stabilizers: ['Latissimus Dorsi', 'Deep Cervical Flexors']
      },
      execution: {
        setup: 'Lie on your side propped cleanly on your bottom hand with arm extended diagonally, top arm extended along your flank, and legs staggered neatly straight.',
        eccentric: 'Lower legs and lateral ribs slowly back to the mat with complete control before switching sides.',
        concentric: 'Press cleanly through your grounded hand, tighten your lateral core, and float both straight legs cleanly off the mat while extending your top arm long in balance.',
        breathing: 'Calm, controlled lateral rib breaths while holding crisp frontal-plane alignment.',
        commonMistakes: [
          'Collapsing the grounded shoulder upward into the ear',
          'Rolling backward onto the glutes instead of staying cleanly side-lying',
          'Holding breath during the lateral balance'
        ],
        proTip: 'Actively push the floor away with your support hand to pack the shoulder blade—this connects your lat directly into your lateral oblique sling.'
      }
    },

  {
      id: 'ex-superman-rock-side-turn',
      name: 'Superman Rock & Side Turn',
      scientificName: 'Prone Dynamic Posterior-Chain Arch Rock With Controlled Transverse Side-Turn Transition',
      subtitle: 'Dynamic posterior-chain arch rock integrating spinal extensors, glutes & obliques',
      pattern: MOVEMENT_PATTERNS.CORE_ROTATION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'back',
      defaultSets: 3,
      defaultReps: '8-10/side',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Erector Spinae', 'Gluteus Maximus', 'Obliques'],
        secondary: ['Hamstrings', 'Posterior Deltoids', 'Middle & Lower Trapezius'],
        stabilizers: ['Transverse Abdominis', 'Deep Cervical Flexors']
      },
      execution: {
        setup: 'Lie prone on a mat and lift smoothly into a controlled Superman arch with arms extended overhead, chest open, and straight legs hovering off the floor.',
        eccentric: 'Maintain unified posterior-chain tension as you rock gently forward/back and rotate slightly onto one lateral hip edge without letting limbs touch down.',
        concentric: 'Control the side turn smoothly through your obliques and return cleanly to centered Superman arch before turning to the opposite side.',
        breathing: 'Steady controlled breaths—avoid holding breath during arch oscillations.',
        commonMistakes: [
          'Hyperextending the neck by craning the head up',
          'Flopping onto the side with bent knees and collapsed shoulders',
          'Using jerky momentum instead of smooth rhythmic arcs'
        ],
        proTip: 'Keep legs glued tightly together and arms reaching long—the tighter your whole-body shape, the smoother the rock and side transition feels.'
      }
    },

  {
      id: 'ex-supine-neck-ribcage-tuck',
      name: 'Supine Neck-Stabilized Ribcage Tuck',
      scientificName: 'Supine Deep-Cervical-Flexor Stabilized Thoracic Curl & Rib-to-Pelvis Brace',
      subtitle: 'Clinical upper-core curl syncing deep neck flexors with crisp ribcage depression',
      pattern: MOVEMENT_PATTERNS.CORE_ANTI_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 3,
      defaultReps: '10-12 (3s hold)',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Abdominis (Upper Fibers)', 'Transverse Abdominis', 'Deep Cervical Flexors'],
        secondary: ['Internal & External Obliques'],
        stabilizers: ['Pelvic Floor', 'Diaphragm']
      },
      execution: {
        setup: 'Lie supine on a mat with knees bent, feet planted flat, and lower back resting neutrally against the floor.',
        eccentric: 'Unroll your upper shoulder blades and head slowly back to the mat over 2–3 seconds while keeping your chin gently nodded.',
        concentric: 'Exhale to draw your front lower ribs smoothly down toward your pelvis and lift strictly your head and upper shoulder blades cleanly off the mat with a soft chin tuck; hold 3 seconds.',
        breathing: 'Long deliberate exhale through pursed lips during the ribcage tuck hold; inhale as you lower.',
        commonMistakes: [
          'Jutting the chin toward the ceiling and straining the front neck muscles',
          'Yanking the head up with the hands',
          'Flattening or tilting the pelvis aggressively instead of curling cleanly from the ribcage'
        ],
        proTip: 'Think of gently holding a soft peach between your chin and collarbone—this engages your deep neck flexors so neck fatigue disappears during core work.'
      }
    }
];
