/**
 * SQUATSANDKNEEFLEXION
 * Modular Exercise Sub-Database
 */

import { MOVEMENT_PATTERNS } from '../exerciseConstants.js';

export const SQUATSANDKNEEFLEXION_EXERCISES = [
  // ==========================================
    // LOWER BODY & LEG STRENGTH
    // ==========================================
    {
      id: 'ex-spanish-squat',
      name: 'Spanish Squat',
      scientificName: 'Vertical-tibia closed-chain squat with posterior strap anchor at tibial tuberosity',
      subtitle: 'Strap-anchored squat for maximal quad & patellar tendon loading',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Anchored Resistance Strap',
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'quads',
      defaultSets: 4,
      defaultReps: '10-12',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps (Rectus Femoris, Vastus Lateralis, Vastus Medialis)'],
        secondary: ['Gluteus Maximus'],
        stabilizers: ['Lumbo-Pelvic Core', 'Tibialis Anterior']
      },
      execution: {
        setup: 'Anchor a thick strap around a rigid upright post, step behind both loops and seat the strap securely behind the upper calves just under the knee crease. Walk back into tension.',
        eccentric: 'Sit backward and down over 3 seconds while trusting the strap to hold your shins completely vertical until thighs hit parallel.',
        concentric: 'Drive vertically upward by extending the knees hard against the strap tension while maintaining an upright chest.',
        breathing: 'Inhale as you sit back and down; exhale cleanly as you drive back up.',
        commonMistakes: [
          'Placing the strap directly inside the soft tissue crease too tightly without comfort padding',
          'Failing to lean back into strap tension so the knees drift forward anyway',
          'Cutting depth short above 90°'
        ],
        proTip: 'Because the strap removes ankle dorsiflexion limits and keeps shins vertical, Spanish Squats build huge quad tension with minimal anterior knee shear.'
      }
    },

  {
      id: 'ex-back-squat',
      name: 'Barbell Back Squat',
      scientificName: 'Bilateral closed-chain lower-limb flexion-extension with high/mid barbell placement',
      subtitle: 'Foundational barbell squat for lower-body strength & hypertrophy',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Barbell',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'quads',
      defaultSets: 4,
      defaultReps: '6-8',
      defaultRestSeconds: 150,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps', 'Gluteus Maximus'],
        secondary: ['Adductor Magnus', 'Spinal Erectors'],
        stabilizers: ['Core Bracing Cylinder', 'Calves & Upper Back']
      },
      execution: {
        setup: 'Set the barbell securely across the upper traps, hands gripping narrow-to-moderate to lock upper-back tightness, feet shoulder-width with toes turned out 15–30°.',
        eccentric: 'Initiate simultaneously by unlocking knees and hips, descending smoothly in 2–3 seconds while tracking knees directly over the toes past parallel.',
        concentric: 'Drive evenly out of the hole through midfoot and heel, matching hip and shoulder ascent rate smoothly to lockout.',
        breathing: 'Take a 360° bracing breath at the top before descending; hold pressure past the sticking point and exhale near completion.',
        commonMistakes: [
          'Collapsing the knees inward toward midline out of the bottom',
          'Shifting forward onto the toes and lifting the heels off the floor',
          'Allowing the hips to shoot up faster than the chest ("good morning" squat)'
        ],
        proTip: 'Screw both feet outward into the floor before every rep to pre-activate your external hip rotators and lock in clean knee tracking.'
      }
    },

  {
      id: 'ex-barbell-front-squat',
      name: 'Barbell Front Squat',
      scientificName: 'Anterior-racked vertical barbell squat maximizing knee flexion & thoracic uprightness',
      subtitle: 'Front-racked barbell squat targeting quads & upper-back posture',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Barbell',
      mechanics: 'Compound',
      level: 'Advanced',
      muscleKey: 'quads',
      defaultSets: 4,
      defaultReps: '6-8',
      defaultRestSeconds: 120,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps'],
        secondary: ['Gluteus Maximus', 'Thoracic Erectors'],
        stabilizers: ['Anterior Core', 'Scapular Retractors']
      },
      execution: {
        setup: 'Seat the barbell snugly across the anterior deltoid shelf with high elbows parallel to the floor (clean grip or cross-arm grip) and feet shoulder-width.',
        eccentric: 'Drop straight down between your heels over 2–3 seconds keeping torso maximally upright until hip crease drops below knees.',
        concentric: 'Drive vertically upward through midfoot while driving elbows skyward out of the hole to keep the bar locked back.',
        breathing: 'Full 360° brace at top before descending; exhale as you clear the toughest upward segment.',
        commonMistakes: [
          'Dropping elbows toward the floor at bottom depth and rounding the upper back',
          'Lifting heels off the floor due to tight ankles',
          'Allowing knees to collapse inward under drive'
        ],
        proTip: 'Keep driving elbows aggressively upward throughout the entire ascent—if the elbows stay up, your chest literally cannot fold forward.'
      }
    },

  {
      id: 'ex-dumbbell-goblet-squat',
      name: 'Dumbbell Goblet Squat',
      scientificName: 'Deep anterior-loaded squat with single dumbbell held vertically against chest',
      subtitle: 'Front-counterbalanced dumbbell squat for depth and quad focus',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Single Dumbbell',
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'quads',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 75,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps', 'Gluteus Maximus'],
        secondary: ['Adductors', 'Thoracic Erectors'],
        stabilizers: ['Core Bracing Cylinder', 'Biceps & Forearms']
      },
      execution: {
        setup: 'Cup the top head of a single dumbbell snugly against your upper chest with elbows tucked down between knees, feet shoulder-width and slightly turned out.',
        eccentric: 'Sit deep between your heels over 2–3 seconds letting elbows track smoothly inside your thighs while torso remains tall.',
        concentric: 'Drive evenly upward through midfoot maintaining chest height until standing straight.',
        breathing: 'Inhale before and during descent; exhale smoothly coming back up.',
        commonMistakes: [
          'Letting the dumbbell drift forward away from the chest and collapsing torso uprightness',
          'Rounding the lumbar spine sharply at maximum depth ("butt wink")',
          'Collapsing arches and knees inward'
        ],
        proTip: 'Because front loading naturally moves your center of mass forward, Goblet Squats teach deep upright squatting almost effortlessly.'
      }
    },

  {
      id: 'ex-kettlebell-goblet-squat',
      name: 'Kettlebell Goblet Squat (Prying)',
      scientificName: 'Anterior kettlebell squat with deep-squat adductor prying and upright posture',
      subtitle: 'Anterior-loaded squat with bottom pause to open hip capsules',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Kettlebell',
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'quads',
      defaultSets: 3,
      defaultReps: '8-10',
      defaultRestSeconds: 75,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps', 'Gluteus Maximus'],
        secondary: ['Adductors', 'Thoracic Spine Erectors'],
        stabilizers: ['Anterior Core Cylinder', 'Biceps & Forearms']
      },
      execution: {
        setup: 'Grip kettlebell by the horns tight against your sternum. Feet slightly wider than shoulder-width with toes angled out 20–30°.',
        eccentric: 'Descend smoothly between your heels over 3 seconds, keeping elbows tucked inside your knees at depth.',
        concentric: 'In the bottom position, gently use elbows to press knees outward (prying open hips) for 1–2 seconds, then drive through midfoot to stand tall.',
        breathing: 'Inhale deep into belly descending; exhale driving through floor.',
        commonMistakes: [
          'Allowing kettlebell to drift away from chest, loading lower back',
          'Collapsing arches of feet inward',
          'Bouncing out of bottom pause'
        ],
        proTip: 'The 2-second bottom pause transforms this from a pure quad exercise into an incredible hip-mobility developer.'
      }
    },

  {
      id: 'ex-bodyweight-box-squat',
      name: 'Bodyweight Box Squat',
      scientificName: 'Closed-chain knee flexion & hip extension to a calibrated box/chair threshold',
      subtitle: 'Safe depth-controlled bodyweight squat teaching pelvic control',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Chair / Bench',
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'quads',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 60,
      rpe: '6 - 7',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps', 'Gluteus Maximus'],
        secondary: ['Hamstrings', 'Adductors'],
        stabilizers: ['Core Bracing Cylinder', 'Soleus']
      },
      execution: {
        setup: 'Stand facing away from a knee-height box or sturdy chair with feet shoulder-width and toes flared slightly outward 15–20°.',
        eccentric: 'Push hips back and bend knees over 3 seconds, descending with a proud chest until hips lightly tap the box without collapsing weight down.',
        concentric: 'Pause for a microsecond to eliminate momentum, then drive through midfoot and heels to stand tall, locking hips and glutes at the top.',
        breathing: 'Inhale bracing core descending; exhale forcefully standing tall.',
        commonMistakes: [
          'Rocking back and relaxing core when touching the box',
          'Allowing knees to cave inward during the ascent',
          'Lifting heels off the floor'
        ],
        proTip: 'Treat the box as a tactile depth sensor, not a recliner: keep muscular tension in the legs throughout the contact.'
      }
    },

  {
      id: 'ex-wall-sit',
      name: 'Wall Sit',
      scientificName: 'Sustained 90° isometric knee-flexion hold braced dorsally against wall',
      subtitle: 'Isometric 90° wall hold for quad endurance and tendon health',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Bodyweight (Wall)',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Beginner',
      muscleKey: 'quads',
      defaultSets: 3,
      defaultReps: '45-60s',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps (Vastus Medialis, Lateralis, Rectus Femoris)'],
        secondary: ['Gluteus Maximus', 'Tibialis Anterior'],
        stabilizers: ['Core Stabilizers', 'Soleus']
      },
      execution: {
        setup: 'Press shoulder blades, lower back, and back of head cleanly against a flat wall; slide down until thighs sit parallel to the floor and shins stay vertical at 90°.',
        eccentric: 'Hold position motionless distributing force evenly through heels and midfeet while keeping knees stacked straight over ankles.',
        concentric: 'Push gently forward through feet as if gluing your lower spine even firmer into the wall for the entire hold.',
        breathing: 'Slow, controlled steady breaths even under deep quad burn—avoid holding breath.',
        commonMistakes: [
          'Pressing hands down onto thighs to assist holding bodyweight',
          'Holding hips high at a shallow 120° angle',
          'Peeling lower back off wall or rising onto tiptoes'
        ],
        proTip: 'Sustained 45–60 second isometric holds at 90° create significant metabolic stress and also provide proven analgesic conditioning for patellar tendons.'
      }
    },

  {
      id: 'ex-pistol-squat',
      name: 'Pistol Squat',
      scientificName: 'Full-depth single-leg squat with contralateral leg held extended forward',
      subtitle: 'Advanced single-leg full-depth bodyweight squat',
      pattern: MOVEMENT_PATTERNS.LUNGE,
      equipment: 'Bodyweight',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Advanced',
      muscleKey: 'quads',
      defaultSets: 3,
      defaultReps: '4-8/side',
      defaultRestSeconds: 120,
      rpe: '9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps', 'Gluteus Maximus'],
        secondary: ['Soleus (Ankle Mobility)', 'Extended-Leg Hip Flexors'],
        stabilizers: ['Gluteus Medius', 'Core', 'Foot Intrinsics']
      },
      execution: {
        setup: 'Stand solidly on one planted foot with toes spread wide, arms reaching straight forward as counterweight, free leg lifted straight ahead.',
        eccentric: 'Sit under full control for 3 seconds down until hamstrings cover the calf while keeping the standing heel firmly glued to the ground.',
        concentric: 'Drive vertically upward cleanly from midfoot maintaining aligned knee tracking and keeping free heel lifted off ground.',
        breathing: 'Inhale braced before descent; exhale firmly clearing sticking point upward.',
        commonMistakes: [
          'Popping onto the forefoot and peeling heel upward at the bottom',
          'Collapsing the standing knee dramatically inward',
          'Plummeting loosely into bottom hole without control'
        ],
        proTip: 'Holding a light 2–4 kg dumbbell straight out at arms’ length acts as an instant counterbalance if ankle dorsiflexion tries to tip you backward.'
      }
    },

  {
      id: 'ex-reverse-nordic-curl',
      name: 'Reverse Nordic Curl',
      scientificName: 'Kneeling eccentric-length knee extension focusing on rectus femoris tension',
      subtitle: 'Kneeling bodyweight quad stretch-extension movement',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Isolation',
      level: 'Intermediate',
      muscleKey: 'quads',
      defaultSets: 3,
      defaultReps: '8-10',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rectus Femoris', 'Vastus Lateralis & Medialis'],
        secondary: ['Iliopsoas (Antagonist Stretch)'],
        stabilizers: ['Rectus Abdominis', 'Glutes (Locked Hip Extension)']
      },
      execution: {
        setup: 'Kneel upright on a thick mat with shins flat behind you, squeeze glutes and brace abs hard so knees, hips, and shoulders form one rigid straight plank.',
        eccentric: 'Hinge strictly at the knees—leaning the entire straight plank backward as far as your quad strength allows over 3 seconds.',
        concentric: 'Pull yourself smoothly back upright by contracting the quads hard while keeping hips completely straight and glutes engaged.',
        breathing: 'Inhale before leaning back with core braced; exhale cleanly as you drive back vertical.',
        commonMistakes: [
          'Bending at the waist and sitting back toward the heels instead of hinging strictly at the knees',
          'Arching the lower back when fatigue sets in',
          'Dropping too deep beyond active quad control'
        ],
        proTip: 'Start with partial lean angles (20–30°) and add depth gradually over weeks—loaded long-length stretching makes Reverse Nordics unmatched for rectus femoris hypertrophy.'
      }
    },

  {
      id: 'ex-barbell-box-squat',
      name: 'Barbell Box Squat',
      scientificName: 'Bilateral Closed-Chain Box-Delimited Barbell Squat — Pause-Initiated Hip Extension',
      subtitle: 'Concentric rate-of-force pause squat with vertical shin posterior bias',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Barbell + Flat Bench',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'quads',
      defaultSets: 4,
      defaultReps: '6-8',
      defaultRestSeconds: 120,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps (Vastus Lateralis, Vastus Medialis, Rectus Femoris)', 'Gluteus Maximus'],
        secondary: ['Adductor Magnus', 'Biceps Femoris & Semitendinosus'],
        stabilizers: ['Erector Spinae', 'Transverse Abdominis', 'Obliques']
      },
      execution: {
        setup: 'Set the barbell across the upper-to-mid trapezius shelf and position a sturdy box or flat bench behind you at parallel hip crease height. Adopt a slightly wider stance than your free squat with toes turned 15–20° out.',
        eccentric: 'Initiate by pushing the hips backward rather than knees forward, keeping shins near-vertical. Control the final 5 cm gently onto the box—never plop onto your sacrum.',
        concentric: 'Pause smoothly for 1 full second while keeping spinal brace, quads, and hip abductors tight (hip flexor loaded), then explode upward driving elbows under the bar.',
        breathing: 'Take a deep 360° diaphragmatic brace at the top before descending; hold tightness through the pause and exhale near lockout.',
        commonMistakes: [
          'Collapsing lumbar tension and rocking backward as soon as glutes touch the bench',
          'Bouncing off the box instead of resetting static concentric drive',
          'Setting a bench far too low and rounding the lumbar spine into butt wink'
        ],
        proTip: 'Think of touching down lightly onto a sheet of glass—keep hamstring and spinal tension live during the pause so the hips fire cleanly off the box.'
      }
    },

  {
      id: 'ex-barbell-zercher-squat',
      name: 'Barbell Zercher Squat',
      scientificName: 'Bilateral Closed-Chain Antecubital-Rack Barbell Squat — Anterior Core & Upper-Back Torque',
      subtitle: 'Elbow-crook anterior-loaded squat for quads, thoracic erectors & core',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Barbell',
      mechanics: 'Compound',
      level: 'Advanced',
      muscleKey: 'quads',
      defaultSets: 4,
      defaultReps: '6-8',
      defaultRestSeconds: 120,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps (Vastus Lateralis, Vastus Medialis Obliquus, Rectus Femoris)', 'Gluteus Maximus'],
        secondary: ['Thoracic Erector Spinae', 'Biceps Brachii (Isometric)'],
        stabilizers: ['Rectus Abdominis', 'Rhomboids', 'Middle Trapezius']
      },
      execution: {
        setup: 'Cradle the barbell securely in the crooks of both flexed elbows (antecubital fossae) tucked close against the lower ribs, locking forearms vertically with fists pulled toward the shoulders.',
        eccentric: 'Descend between the hips over 2–3 seconds while driving elbows upward to keep the torso stacked upright above the midfoot.',
        concentric: 'Drive vertically through full foot tripod pressure while fighting thoracic rounding until hips and knees reach full lockout.',
        breathing: 'Take a firm abdominal breath into the belt line between reps; maintain strong upper-back protraction/brace against the bar.',
        commonMistakes: [
          'Allowing elbows to drop downward so the upper torso folds forward',
          'Interlocking fingers loosely and losing radial wrist/elbow stabilization',
          'Rising onto toes to clear the bar past the thighs'
        ],
        proTip: 'Positioning the load directly in front of the center of mass permits deeper upright knee flexion than a back squat while forging fierce thoracic extension strength.'
      }
    },

  {
      id: 'ex-dumbbell-cyclist-squat',
      name: 'Dumbbell Cyclist Squat (Heels Elevated)',
      scientificName: 'Bilateral Closed-Chain Heels-Elevated Narrow-Stance Squat — Maximal Anterior Knee Moment',
      subtitle: 'Heels-elevated narrow knee-dominant squat maximizing VMO and quad lengthening',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Dumbbells + Heel Wedge',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'quads',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Vastus Medialis Obliquus (VMO)', 'Vastus Lateralis', 'Rectus Femoris'],
        secondary: ['Gluteus Maximus (Deep Stance Assist)'],
        stabilizers: ['Spinal Erectors', 'Soleus (Isometric)']
      },
      execution: {
        setup: 'Elevate both heels 4–6 cm onto a slant wedge or weight plates with feet narrow (hip-width or closer) and toes nearly parallel. Hold dumbbells comfortably at your sides.',
        eccentric: 'Initiate immediately by bending the knees forward over the toes while keeping the spine completely vertical and sliding the torso straight down over 3 seconds.',
        concentric: 'Drive forcefully through the midfoot and heel wedge to extend the knees to near-lockout without turning the movement into a hip hinge.',
        breathing: 'Inhale deeply into the brace before descent; exhale through the upper sticking point.',
        commonMistakes: [
          'Pushing hips backward like a traditional back squat and stealing tension from the quads',
          'Shifting bodyweight onto the extreme toes with heels lifting off the wedge',
          'Bouncing uncontrollably at extreme knee flexion'
        ],
        proTip: 'Slanting the heels removes ankle dorsiflexion restrictions and amplifies knee-to-bar moment arm distance, concentrating overload straight onto the quadriceps.'
      }
    },

  {
      id: 'ex-kettlebell-rack-split-squat',
      name: 'Kettlebell Front-Rack Split Squat',
      scientificName: 'Unilateral Contralateral Front-Rack Split Squat — Vertical Torso & Anti-Lateral Spine Brace',
      subtitle: 'Single-kettlebell front-rack split squat integrating quad strength & core anti-tilt',
      pattern: MOVEMENT_PATTERNS.LUNGE,
      equipment: 'Kettlebell',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'quads',
      defaultSets: 3,
      defaultReps: '8-10/leg',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps (Lead Limb)', 'Gluteus Maximus'],
        secondary: ['Gluteus Medius (Frontal Pelvic Control)', 'Obliques (Contralateral Anti-Lateral Flexion)'],
        stabilizers: ['Anterior Deltoid', 'Serratus Anterior', 'Erector Spinae']
      },
      execution: {
        setup: 'Clean one kettlebell into the front-rack pocket resting securely between forearm and biceps with wrist neutral and elbow tucked forward of ribs. Step into a stable hip-width split stance.',
        eccentric: 'Lower vertically over 2–3 seconds until the rear knee hovers ~2 cm off the floor while keeping the front-racked elbow elevated and pelvis perfectly square.',
        concentric: 'Drive firmly through the full front foot to rise straight up without side-bending toward or away from the kettlebell.',
        breathing: 'Inhale into a braced ribcage while descending; exhale forcibly as you press back to split stance.',
        commonMistakes: [
          'Leaning laterally away from the kettlebell when unilateral leg fatigue sets in',
          'Letting the wrist bend backward or resting the bell heavily out onto the shoulder joint',
          'Walking on a narrow tightrope stance rather than train-track hip width'
        ],
        proTip: 'Loading the kettlebell on the arm opposite your lead leg demands extra oblique and glute medius stability to prevent hip shift.'
      }
    },

  {
      id: 'ex-deep-squat-isometric-bounce',
      name: 'Deep Squat Isometric Bounce Hold',
      scientificName: 'Deep Closed-Chain Full-Flexion Squat Isometric With Low-Amplitude End-Range Pulses',
      subtitle: 'Full-depth quad, glute & ankle tolerance drill building bottom-position control',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Bodyweight',
      requiresEquipment: false,
      mechanics: 'Isometric',
      level: 'Beginner',
      muscleKey: 'quads',
      defaultSets: 3,
      defaultReps: '30-45s',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps', 'Gluteus Maximus'],
        secondary: ['Hip Adductors', 'Soleus & Ankle Dorsiflexors'],
        stabilizers: ['Thoracic Erectors', 'Anterior Core']
      },
      execution: {
        setup: 'Stand at your comfortable squat stance with toes slightly turned out and sink smoothly into a deep bottom squat with heels planted flat.',
        eccentric: 'Maintain active muscular tension just above passive collapse so knees track cleanly over toes 2–3.',
        concentric: 'Perform tiny, controlled 3–5 cm rhythmic pulses or hold an active isometric hover in the deep pocket for the full interval.',
        breathing: 'Steady controlled breathing maintaining a gentle core brace.',
        commonMistakes: [
          'Letting heels lift off the floor during pulses',
          'Bouncing passively off the knee ligaments instead of keeping quads engaged',
          'Collapsing the chest completely onto the thighs'
        ],
        proTip: 'Holding active tension 2 cm above rock bottom transforms a resting squat into potent lengthened-range quad and glute hypertrophy work.'
      }
    },

  {
      id: 'ex-rolling-pistol-squat',
      name: 'Rolling Pistol Squat',
      scientificName: 'Dynamic Momentum-Assisted Unilateral Full-Depth Single-Leg Squat (Deck Squat Transition)',
      subtitle: 'Dynamic gymnastics pistol progression linking supine roll momentum to single-leg ascent',
      pattern: MOVEMENT_PATTERNS.SQUAT,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      mechanics: 'Compound',
      level: 'Advanced',
      muscleKey: 'quads',
      defaultSets: 3,
      defaultReps: '5-8/side',
      defaultRestSeconds: 75,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Quadriceps', 'Gluteus Maximus'],
        secondary: ['Hip Flexors (Extended Leg)', 'Anterior Core', 'Soleus'],
        stabilizers: ['Gluteus Medius', 'Intrinsic Foot Arch']
      },
      execution: {
        setup: 'Start at the bottom of a tuck or stand upright on a padded mat; roll smoothly backward onto your rounded upper back while keeping one knee hugged tight.',
        eccentric: 'Absorb the controlled backward roll smoothly along your rounded spine without slamming the lower back.',
        concentric: 'Whip your arms forward and plant one foot flat close to your glutes while keeping the opposite leg extended straight out, driving powerfully up to standing on one leg.',
        breathing: 'Exhale forcefully as you plant the foot and drive upward to full lock-out.',
        commonMistakes: [
          'Planting the working foot too far forward so center of mass stays stuck behind the heel',
          'Slamming onto a flat lower back instead of rolling softly through a tucked curve',
          'Letting the stance knee cave inward on ascent'
        ],
        proTip: 'Reach both arms aggressively forward toward your extended toes the instant your working heel plants—forward counterbalance makes the stand-up effortless.'
      }
    }
];
