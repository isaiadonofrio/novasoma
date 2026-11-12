/**
 * SCIENTIFIC EXERCISE DATABASE - CORPO
 * Functional kinesiology, joint mechanics, and execution cues.
 */

import { EXERCISE_MEDIA } from './exerciseMedia';
import {
  MOVEMENT_PATTERNS,
  EXERCISE_MECHANICS,
  EXERCISE_LEVELS,
  EQUIPMENT_TYPES
} from './exerciseConstants';

export {
  MOVEMENT_PATTERNS,
  EXERCISE_MECHANICS,
  EXERCISE_LEVELS,
  EQUIPMENT_TYPES
};

const RAW_EXERCISE_DATABASE = [
  // ==========================================
  // WARM-UP & ACTIVATION
  // ==========================================
  {
    id: 'wu-jump-rope',
    name: 'Jump Rope',
    scientificName: 'Rhythmic bilateral plyometric hopping utilizing Achilles tendon elastic recoil',
    subtitle: 'Cardio activation & ankle stiffness priming',
    pattern: MOVEMENT_PATTERNS.CARDIO_PLYO,
    equipment: 'Jump Rope',
    mechanics: 'Plyometric',
    level: 'Beginner',
    muscleKey: 'calves',
    defaultSets: 3,
    defaultReps: '60-90s',
    defaultRestSeconds: 45,
    rpe: '6 - 7',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Gastrocnemius', 'Soleus'],
      secondary: ['Tibialis Anterior', 'Quadriceps'],
      stabilizers: ['Core Bracing Muscles', 'Forearms & Wrists']
    },
    execution: {
      setup: 'Hold the handles lightly at hip height with elbows tucked close to your ribs. Keep chest lifted, gaze forward, and knees softly unlocked.',
      eccentric: 'Absorb each landing strictly through the forefoot and balls of the feet; never allow the heels to collapse flat onto the floor.',
      concentric: 'Rebound quickly with minimal ground contact time, rotating the rope from small crisp wrist circles rather than whole-arm swings.',
      breathing: 'Smooth, steady nasal or rhythmic mouth breathing synchronized to your jump cadence.',
      commonMistakes: [
        'Jumping excessively high with bent knees like a tuck jump',
        'Landing flat-footed on the heels and overloading the shins',
        'Swinging from the shoulders with wide flared elbows'
      ],
      proTip: 'Bounce only 2–3 cm off the floor while keeping elastic tension in the calves to turn warm-up skips into Achilles stiffness prep.'
    }
  },
  {
    id: 'wu-banded-hip-abduction',
    name: 'Banded Hip Abduction',
    scientificName: 'Standing open-chain frontal-plane hip abduction against elastic resistance',
    subtitle: 'Glute medius activation with mini loop band',
    pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
    equipment: 'Loop Resistance Band',
    mechanics: 'Isolation',
    level: 'Beginner',
    muscleKey: 'glutes',
    defaultSets: 3,
    defaultReps: '12-15/side',
    defaultRestSeconds: 45,
    rpe: '6 - 7',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Gluteus Medius', 'Gluteus Minimus'],
      secondary: ['Tensor Fasciae Latae', 'Contralateral Stance Glute Medius'],
      stabilizers: ['Lumbo-Pelvic Core', 'Stance Quadriceps']
    },
    execution: {
      setup: 'Loop a resistance band just above the knees or ankles. Stand upright on one leg with light balance support if needed and toes pointed straight forward.',
      eccentric: 'Return the raised leg smoothly toward midline over 2 seconds without letting the band snap shut or slacken.',
      concentric: 'Sweep the working leg out and slightly back (~15° diagonal) against band tension without hitching the pelvis sideways.',
      breathing: 'Exhale while pressing the leg outward against resistance; inhale on the controlled return.',
      commonMistakes: [
        'Leaning the torso heavily toward the stance side to manufacture fake range',
        'Externally rotating the toes outward so the hip flexors take over',
        'Snapping the leg back inward without eccentric control'
      ],
      proTip: 'Keep the working foot neutral or slightly turned inward and lead with the heel to target the posterior glute medius rather than the TFL.'
    }
  },
  {
    id: 'wu-ankle-hip-mobility',
    name: 'Ankle & Hip 90/90 Mobility',
    scientificName: 'Closed-chain ankle dorsiflexion paired with internal/external hip capsule rotation',
    subtitle: 'Deep squat & 90/90 joint capsule mobility flow',
    pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
    equipment: 'Bodyweight',
    requiresEquipment: false,
    mechanics: 'Mobility',
    level: 'Beginner',
    muscleKey: 'glutes',
    defaultSets: 2,
    defaultReps: '8-10/side',
    defaultRestSeconds: 30,
    rpe: '5',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Deep Hip Rotators', 'Ankle Dorsiflexors'],
      secondary: ['Hip Adductors', 'Gluteus Maximus', 'Soleus'],
      stabilizers: ['Lumbar & Thoracic Erectors']
    },
    execution: {
      setup: 'Sink into a controlled deep squat with heels grounded, using elbows gently against inner knees to open the hips cleanly.',
      eccentric: 'Shift slowly side-to-side driving one knee forward past the toes while keeping the heel glued down for ankle dorsiflexion.',
      concentric: 'Rotate cleanly through tall posture or transition smoothly without forcing joint pinching.',
      breathing: 'Slow, deep exhalations in bottom end-ranges to lower nervous system guarding.',
      commonMistakes: [
        'Forcing painful front-of-hip pinching instead of adjusting stance width',
        'Lifting the heels during ankle mobilization shifts',
        'Rushing repetitions instead of owning each end-range breath'
      ],
      proTip: 'Two focused minutes of deep-squat ankle rocks before Squat sessions immediately unlock better depth and upright torso mechanics.'
    }
  },

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
    id: 'ex-bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    scientificName: 'Unilateral sagittal split squat with rear foot elevated on bench support',
    subtitle: 'Rear-foot elevated split squat with dumbbells',
    pattern: MOVEMENT_PATTERNS.LUNGE,
    equipment: 'Dumbbells + Flat Bench',
    mechanics: 'Compound',
    level: 'Intermediate',
    muscleKey: 'quads',
    defaultSets: 4,
    defaultReps: '8-10/side',
    defaultRestSeconds: 90,
    rpe: '8 - 9',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Quadriceps', 'Gluteus Maximus'],
      secondary: ['Adductor Magnus', 'Soleus', 'Hamstrings'],
      stabilizers: ['Gluteus Medius', 'Lumbo-Pelvic Core']
    },
    execution: {
      setup: 'Stand roughly two foot-lengths ahead of a flat bench holding dumbbells at your sides, resting the top shoelaces of the back foot lightly on the bench.',
      eccentric: 'Lower under control for 2–3 seconds with a subtle 15° forward torso hinge until the rear knee hovers just clear of the mat.',
      concentric: 'Press firmly through the full front foot—heel and midfoot anchored—driving both knee and hip extension.',
      breathing: 'Inhale on the descent with core braced; exhale sharply through the drive upward.',
      commonMistakes: [
        'Standing too close to the bench (jams the front knee) or too far (overstretches the rear hip flexor)',
        'Allowing the front knee to cave inward (dynamic knee valgus)',
        'Pushing off aggressively with the back foot'
      ],
      proTip: 'Keep ~90% of your bodyweight on the lead leg; treat the back bench purely as a light kickstand for balance.'
    }
  },
  {
    id: 'ex-step-ups',
    name: 'Dumbbell Step-Up',
    scientificName: 'Unilateral vertical closed-chain step ascent on elevated box or bench',
    subtitle: 'Controlled single-leg box step-ups with dumbbells',
    pattern: MOVEMENT_PATTERNS.LUNGE,
    equipment: 'Dumbbells + Step Box',
    mechanics: 'Compound',
    level: 'Beginner',
    muscleKey: 'quads',
    defaultSets: 3,
    defaultReps: '10-12/side',
    defaultRestSeconds: 75,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Quadriceps', 'Gluteus Maximus'],
      secondary: ['Soleus', 'Hamstrings'],
      stabilizers: ['Gluteus Medius', 'Core & Foot Intrinsics']
    },
    execution: {
      setup: 'Place one entire foot flat atop a knee-high box or bench holding dumbbells naturally along your sides, keeping torso inclined slightly forward over the working foot.',
      eccentric: 'Lower your trailing leg slowly in 3 seconds down toward the floor without bouncing or crashing onto your toes.',
      concentric: 'Press exclusively through the elevated lead foot without pushing off from the floor with the back calf.',
      breathing: 'Inhale before starting or lowering down; exhale smoothly while extending atop the box.',
      commonMistakes: [
        'Launching off the floor with the trailing calf instead of pulling up through the lead hip and quad',
        'Dropping swiftly down under gravity during the eccentric phase',
        'Allowing the lead knee to dive inward during initial drive'
      ],
      proTip: 'Keep the back toes pulled slightly up toward your shin (dorsiflexed) at the bottom so you literally cannot cheat with an ankle bounce.'
    }
  },
  {
    id: 'ex-single-leg-calf-raise-step',
    name: 'Single-Leg Standing Calf Raise',
    scientificName: 'Unilateral straight-knee plantarflexion on elevated step edge with dumbbells',
    subtitle: 'Full-ROM single-leg calf raise on raised block',
    pattern: MOVEMENT_PATTERNS.CALF_ISOLATION,
    equipment: 'Dumbbells + Step Box',
    mechanics: 'Isolation',
    level: 'Intermediate',
    muscleKey: 'calves',
    defaultSets: 4,
    defaultReps: '12-15/side',
    defaultRestSeconds: 60,
    rpe: '8 - 9',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Gastrocnemius'],
      secondary: ['Soleus', 'Tibialis Posterior'],
      stabilizers: ['Flexor Hallucis Longus', 'Forearms (Grip)']
    },
    execution: {
      setup: 'Balance the ball of one foot squarely on the edge of a raised wooden step or platform with the knee straight, holding dumbbells evenly alongside your thighs.',
      eccentric: 'Sink the heel slowly over 3 seconds into the deepest possible stretch beneath step height and pause 1–2 seconds cleanly.',
      concentric: 'Drive vertically up onto the big toe mound to maximal plantarflexion height and squeeze for 1 full second.',
      breathing: 'Inhale into the deep bottom stretch; exhale as you press up to full contraction.',
      commonMistakes: [
        'Bouncing swiftly out of the bottom using Achilles tendon elasticity',
        'Bending the working knee during drive and unloading the gastrocnemius',
        'Rolling weight onto the outside pinky edge of the foot'
      ],
      proTip: 'A crisp 2-second dead pause in the bottom stretch shuts off elastic rebound and forces every muscle fiber to initiate the lift.'
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
    id: 'ex-seated-single-leg-calf-raise',
    name: 'Seated Single-Leg Calf Raise',
    scientificName: 'Bent-knee (90°) unilateral ankle plantarflexion targeting the deep soleus',
    subtitle: 'Seated single-leg soleus raise with dumbbell over knee',
    pattern: MOVEMENT_PATTERNS.CALF_ISOLATION,
    equipment: 'Single Dumbbell + Bench + Step Box',
    mechanics: 'Isolation',
    level: 'Beginner',
    muscleKey: 'calves',
    defaultSets: 4,
    defaultReps: '15-20/side',
    defaultRestSeconds: 45,
    rpe: '8 - 9',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Soleus'],
      secondary: ['Gastrocnemius (Reduced Mechanical Leverage)', 'Tibialis Posterior'],
      stabilizers: ['Foot Intrinsics']
    },
    execution: {
      setup: 'Sit tall near the edge of a flat bench with the ball of one foot on a raised block/plate (~5–10 cm) so the heel clears freely, resting a dumbbell upright atop the distal thigh.',
      eccentric: 'Lower the heel slowly over 3 seconds into full dorsiflexion below the step level and hold 1 full second.',
      concentric: 'Press cleanly through the big toe ball to max plantarflexion peak and squeeze for 1–2 seconds.',
      breathing: 'Inhale into the bottom stretch; exhale strongly as you raise the dumbbell.',
      commonMistakes: [
        'Bouncing rhythmically off the bottom stretch reflex',
        'Using the arms to lift or assist the dumbbell weight up',
        'Rushing top contraction with partial range of motion'
      ],
      proTip: 'Because a 90° bent knee shortens and Slackens the bi-articular gastrocnemius, seated raises isolate the thick underlying soleus directly.'
    }
  },

  // ==========================================
  // UPPER BODY, COMPOUNDS, KETTLEBELL & CORE
  // ==========================================
  {
    id: 'ex-barbell-bench-press',
    name: 'Barbell Bench Press',
    scientificName: 'Supine multi-joint horizontal press on flat bench with barbell',
    subtitle: 'Primary flat barbell chest, anterior delt, and triceps press',
    pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
    equipment: 'Barbell + Flat Bench',
    mechanics: 'Compound',
    level: 'Intermediate',
    muscleKey: 'chest',
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSeconds: 150,
    rpe: '8 - 9',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Pectoralis Major (Sternal & Clavicular Heads)'],
      secondary: ['Anterior Deltoid', 'Triceps Brachii'],
      stabilizers: ['Rotator Cuff', 'Serratus Anterior', 'Latissimus Dorsi']
    },
    execution: {
      setup: 'Lie supine with eyes under the bar, retract and depress shoulder blades onto the bench, plant heels firmly for leg drive, and grip just outside shoulder width.',
      eccentric: 'Lower the barbell over 2–3 seconds to lightly touch the lower sternum/nipple line with elbows tucked roughly 45–60° to the torso.',
      concentric: 'Press smoothly upward and slightly back toward shoulder line while keeping glutes and shoulder blades anchored to the bench.',
      breathing: 'Brace full breath before un-racking/lowering; exhale cleanly past the mid-range sticking point.',
      commonMistakes: [
        'Flaring elbows wide to 90° and straining the anterior shoulder capsule',
        'Bouncing the bar off the sternum or lifting the hips high off the bench',
        'Allowing the wrists to bend far backward instead of stacked forearms'
      ],
      proTip: 'Imagine bending the barbell slightly into a U-shape during setup to engage the lats and lock vertical forearm alignment.'
    }
  },
  {
    id: 'ex-push-up',
    name: 'Push-Up',
    scientificName: 'Closed-chain horizontal push-up maintaining full-body core anti-extension',
    subtitle: 'Classic bodyweight chest, shoulder, and core press',
    pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
    equipment: 'Bodyweight',
    requiresEquipment: false,
    mechanics: 'Compound',
    level: 'Beginner',
    muscleKey: 'chest',
    defaultSets: 3,
    defaultReps: '12-20',
    defaultRestSeconds: 60,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Pectoralis Major'],
      secondary: ['Triceps Brachii', 'Anterior Deltoid', 'Serratus Anterior'],
      stabilizers: ['Rectus & Transverse Abdominis', 'Glutes']
    },
    execution: {
      setup: 'Hands stacked beneath shoulders slightly wider than shoulder-width, fingers splayed, rigid head-to-heel plank line with glutes and abs tightened.',
      eccentric: 'Lower your entire straight torso smoothly over 2–3 seconds with elbows angled back at ~45° until your chest nearly kisses the floor.',
      concentric: 'Drive the floor straight away to elbow extension, finishing with subtle scapular protraction at top lockout.',
      breathing: 'Inhale descending; exhale cleanly while pushing back up.',
      commonMistakes: [
        'Letting the lower back sag ahead of the chest ("worming")',
        'Flaring elbows perpendicular at 90° forming a T-shape',
        'Stopping half-way down instead of full chest depth'
      ],
      proTip: 'Push-ups allow your shoulder blades to move freely around the ribcage unlike a pinned bench, making them stellar for serrated shoulder health.'
    }
  },
  {
    id: 'ex-barbell-overhead-press',
    name: 'Barbell Overhead Press',
    scientificName: 'Standing vertical overhead press requiring full axial core stability',
    subtitle: 'Strict standing overhead barbell press for shoulders & triceps',
    pattern: MOVEMENT_PATTERNS.VERTICAL_PUSH,
    equipment: 'Barbell',
    mechanics: 'Compound',
    level: 'Intermediate',
    muscleKey: 'shoulders',
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSeconds: 120,
    rpe: '8 - 9',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Anterior & Lateral Deltoids'],
      secondary: ['Triceps Brachii', 'Upper Pectorals', 'Upper Trapezius'],
      stabilizers: ['Core Bracing Cylinder', 'Glutes', 'Serratus Anterior']
    },
    execution: {
      setup: 'Unrack with grip just outside shoulder width, forearms vertical, elbows angled slightly in front of the bar; squeeze glutes and abs tight.',
      eccentric: 'Lower the barbell smoothly back to upper-chest/clavicle touch while sliding the chin gently backward clear of the bar path.',
      concentric: 'Press strictly vertically upward, nudging the head slightly forward through the window as the bar clears forehead height to stack overhead.',
      breathing: 'Brace deep breath before pressing; hold tension until past sticking point and exhale near lockout.',
      commonMistakes: [
        'Over-arching the lumbar spine to press the weight forward instead of overhead',
        'Allowing elbows to drop backward behind the bar in bottom rack position',
        'Dipping the knees into an unintentional push press'
      ],
      proTip: 'Clench your glutes maximally throughout every strict overhead set—it physically blocks dangerous lower-back hyperextension.'
    }
  },
  {
    id: 'ex-seated-dumbbell-overhead-press',
    name: 'Seated Dumbbell Overhead Press',
    scientificName: 'Seated bilateral vertical shoulder press along the scapular plane',
    subtitle: 'Seated overhead dumbbell press for hypertrophy',
    pattern: MOVEMENT_PATTERNS.VERTICAL_PUSH,
    equipment: 'Dumbbells + Flat Bench',
    mechanics: 'Compound',
    level: 'Beginner',
    muscleKey: 'shoulders',
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSeconds: 90,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Anterior & Lateral Deltoids'],
      secondary: ['Triceps Brachii', 'Upper Chest'],
      stabilizers: ['Rotator Cuff', 'Core Stabilizers']
    },
    execution: {
      setup: 'Sit tall on a bench (upright or ~80° back pad), hold dumbbells at shoulder/ear level with elbows positioned ~30° forward in the natural scapular plane.',
      eccentric: 'Lower slowly over 2–3 seconds under total control until weights return smoothly to deltoid height.',
      concentric: 'Press upward smoothly overhead until arms straighten cleanly above your shoulders without clanking weights together.',
      breathing: 'Inhale lowering; exhale smoothly driving weights overhead.',
      commonMistakes: [
        'Flaring elbows wide inline with the ears and pinching the shoulder joint',
        'Arching mid-back strongly away from the bench',
        'Cutting depth short at eye level'
      ],
      proTip: 'Pressing with elbows slightly forward (~30° scapular plane) aligns perfectly with shoulder socket geometry for maximal comfort.'
    }
  },
  {
    id: 'ex-barbell-bent-over-row',
    name: 'Barbell Bent-Over Row',
    scientificName: 'Unsupported hip-hinged horizontal row loading entire upper and mid back',
    subtitle: 'Pronated barbell row for back thickness and lats',
    pattern: MOVEMENT_PATTERNS.HORIZONTAL_PULL,
    equipment: 'Barbell',
    mechanics: 'Compound',
    level: 'Intermediate',
    muscleKey: 'back',
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRestSeconds: 120,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Latissimus Dorsi', 'Rhomboids', 'Mid & Lower Trapezius'],
      secondary: ['Posterior Deltoid', 'Biceps Brachii', 'Brachialis'],
      stabilizers: ['Spinal Erectors', 'Hamstrings & Glutes (Hinge Hold)']
    },
    execution: {
      setup: 'Hinge cleanly from the hips to roughly a 35–45° torso angle with a flat neutral back, holding the bar slightly wider than shoulder-width.',
      eccentric: 'Lower the barbell over 2 seconds to full arm hang and controlled scapular stretch without dropping your chest posture.',
      concentric: 'Row the barbell decisively back toward your belly button/lower ribs by driving the elbows backward and squeezing the shoulder blades.',
      breathing: 'Brace air before pulling; exhale smoothly upon pulling into the abdomen.',
      commonMistakes: [
        'Standing nearly upright and shrugging reps up with momentum',
        'Rounding the lumbar spine under heavy fatigue',
        'Pulling straight toward the upper chest with flared elbows instead of toward the hip crease'
      ],
      proTip: 'Drive elbows back toward your hip pockets rather than curling hands upward—that cue transforms arm pulling into direct lat work.'
    }
  },
  {
    id: 'ex-dumbbell-bent-over-row',
    name: 'Single-Arm Dumbbell Row',
    scientificName: 'Bench-braced unilateral horizontal pull eliminating spinal axial fatigue',
    subtitle: 'One-arm bench-supported dumbbell row for lats and rhomboids',
    pattern: MOVEMENT_PATTERNS.HORIZONTAL_PULL,
    equipment: 'Single Dumbbell + Flat Bench',
    mechanics: 'Compound',
    level: 'Beginner',
    muscleKey: 'back',
    defaultSets: 3,
    defaultReps: '10-12/side',
    defaultRestSeconds: 75,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
      secondary: ['Posterior Deltoid', 'Biceps Brachii'],
      stabilizers: ['Core Obliques (Anti-Rotation)', 'Supporting Shoulder']
    },
    execution: {
      setup: 'Place one hand and the matching knee squarely on a flat bench, torso parallel to the ground with a flat back, and hold a dumbbell hanging freely below the working shoulder.',
      eccentric: 'Lower the dumbbell slowly for 2–3 seconds letting the shoulder blade gently protract downward for an unrestricted lat stretch.',
      concentric: 'Sweep the elbow in an arc backward toward your back hip pocket while keeping shoulders square and avoiding torso twisting.',
      breathing: 'Inhale descending into the stretch; exhale while driving the elbow past the ribcage.',
      commonMistakes: [
        'Twisting the ribcage heavily sideways to heave oversized dumbbells up',
        'Curling the weight straight up vertically toward the chest',
        'Rounding the lower back on the bench'
      ],
      proTip: 'Think of moving the dumbbell in a smooth sweeping J-curve back toward your hip rather than straight up and down.'
    }
  },
  {
    id: 'ex-pull-up',
    name: 'Pull-Up',
    scientificName: 'Open-chain vertical pulling suspension of bodyweight via pronated overhead grip',
    subtitle: 'Strict overhand pull-up for lats, upper back & grip',
    pattern: MOVEMENT_PATTERNS.VERTICAL_PULL,
    equipment: 'Pull-Up Bar',
    mechanics: 'Compound',
    level: 'Intermediate',
    muscleKey: 'back',
    defaultSets: 4,
    defaultReps: '6-10',
    defaultRestSeconds: 120,
    rpe: '8 - 9',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Latissimus Dorsi', 'Teres Major'],
      secondary: ['Lower & Mid Trapezius', 'Rhomboids', 'Biceps & Brachialis'],
      stabilizers: ['Forearms (Grip)', 'Anterior Core (Hollow Tension)']
    },
    execution: {
      setup: 'Hang from an overhand grip slightly wider than shoulder-width, keep legs together slightly in front in a solid hollow tension, and start each rep by depressing your shoulder blades.',
      eccentric: 'Lower smoothly for 3 full seconds back down to a controlled dead-hang stretch without dropping rapidly.',
      concentric: 'Pull elbows down and slightly forward toward your flanks until your chin cleanly clears bar height.',
      breathing: 'Inhale in bottom hang; exhale smoothly through the pull.',
      commonMistakes: [
        'Kipping or swinging the knees to get the chin above the bar',
        'Halting halfway down and doing partial top-half pulses',
        'Curling the shoulders inward toward the ears at the top'
      ],
      proTip: 'Lead every pull-up by lifting your chest upward toward the bar and depressing your scapulae before bending the elbows.'
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
    id: 'ex-dumbbell-bicep-curl',
    name: 'Dumbbell Bicep Curl',
    scientificName: 'Supinated elbow flexion isolating the biceps brachii against gravity',
    subtitle: 'Standing alternating or bilateral supinated dumbbell curl',
    pattern: MOVEMENT_PATTERNS.ELBOW_FLEXION,
    equipment: 'Dumbbells',
    mechanics: 'Isolation',
    level: 'Beginner',
    muscleKey: 'biceps',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 60,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Biceps Brachii (Long & Short Heads)'],
      secondary: ['Brachialis', 'Brachioradialis'],
      stabilizers: ['Anterior Deltoid', 'Forearm Flexors', 'Core']
    },
    execution: {
      setup: 'Stand tall with dumbbells resting outside thighs in supinated (palms forward) or semi-neutral grip, pinning elbows comfortably beside your ribs.',
      eccentric: 'Lower the weights under complete control over 2–3 seconds all the way down until triceps subtly engage for true full extension.',
      concentric: 'Curl smoothly upward without swinging elbows far behind or swinging torso back, pausing briefly to squeeze peak tension.',
      breathing: 'Exhale while curling up; inhale smoothly during the 3-second descent.',
      commonMistakes: [
        'Swinging the hips and lower back to momentum-launch weights',
        'Cutting reps early and leaving bottom range unworked',
        'Shrugging shoulders forward at the top'
      ],
      proTip: 'Slightly rotate the pinkies upward toward the shoulders near peak contraction to exploit the biceps’ secondary forearm supination function.'
    }
  },
  {
    id: 'ex-triceps-chair-dip',
    name: 'Bench Triceps Dip',
    scientificName: 'Bodyweight vertical press with hands anchored behind torso on bench edge',
    subtitle: 'Bench-supported dip targeting all three triceps heads',
    pattern: MOVEMENT_PATTERNS.ELBOW_EXTENSION,
    equipment: 'Bench / Chair',
    mechanics: 'Compound',
    level: 'Beginner',
    muscleKey: 'triceps',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Triceps Brachii (Lateral, Medial & Long Heads)'],
      secondary: ['Anterior Deltoid', 'Pectoralis Major'],
      stabilizers: ['Scapular Depressors', 'Core']
    },
    execution: {
      setup: 'Grip the front edge of a sturdy bench just outside hip-width, stretch legs straight out on heels (or bend knees 90° to scale lighter), and lift hips slightly clear.',
      eccentric: 'Slide hips straight vertically downward close to the bench edge over 2 seconds until upper arms hit roughly parallel (elbows pointed directly behind).',
      concentric: 'Drive heels of palms straight downward to extend triceps strongly without shrugging shoulders toward your ears.',
      breathing: 'Inhale descending carefully; exhale while locking arms overhead.',
      commonMistakes: [
        'Drifting hips far forward away from the bench and over-stretching the front shoulder capsule',
        'Sinking deeply past parallel and rolling shoulders anteriorly',
        'Flaring elbows out sideways'
      ],
      proTip: 'Keep your back gliding straight down within 2–3 cm of the bench edge and pull shoulder blades down—never let the shoulders roll forward.'
    }
  },
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
    id: 'ex-incline-barbell-bench-press',
    name: 'Incline Barbell Bench Press',
    scientificName: 'Angled 30° bench barbell press biasing clavicular pectoralis fibers',
    subtitle: 'Incline barbell press for upper chest & front delts',
    pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
    equipment: 'Barbell + Incline Bench',
    mechanics: 'Compound',
    level: 'Intermediate',
    muscleKey: 'chest',
    defaultSets: 4,
    defaultReps: '6-10',
    defaultRestSeconds: 120,
    rpe: '8 - 9',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Pectoralis Major (Clavicular / Upper Chest)'],
      secondary: ['Anterior Deltoid', 'Triceps Brachii'],
      stabilizers: ['Serratus Anterior', 'Middle & Lower Trapezius', 'Rotator Cuff']
    },
    execution: {
      setup: 'Adjust incline bench to ~30°, pull shoulder blades down and back against padding, grip slightly wider than shoulders with forearms stacked vertical.',
      eccentric: 'Lower the bar deliberately over 2–3 seconds to touch the upper sternum just beneath the collarbones with elbows tucked at ~45–60°.',
      concentric: 'Press smoothly upward back over the shoulder joint until arms reach solid lockout.',
      breathing: 'Inhale and brace upper ribcage during descent; exhale smoothly toward lockout.',
      commonMistakes: [
        'Setting the bench excessively steep (45–60°) and turning it into an anterior delt lift',
        'Bouncing the barbell swiftly off the upper sternum',
        'Losing shoulder blade retraction when locking out'
      ],
      proTip: 'A moderate 30° bench angle consistently triggers superior upper-chest muscle activation while staying far friendlier on shoulders than 45°.'
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
    id: 'ex-dumbbell-floor-press',
    name: 'Dumbbell Floor Press',
    scientificName: 'Supine floor-terminated horizontal press protecting anterior shoulder capsule',
    subtitle: 'Floor-supported dumbbell chest & triceps lockout press',
    pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
    equipment: 'Dumbbells + Mat',
    mechanics: 'Compound',
    level: 'Beginner',
    muscleKey: 'chest',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 90,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Pectoralis Major', 'Triceps Brachii'],
      secondary: ['Anterior Deltoid'],
      stabilizers: ['Core Stabilizers', 'Rotator Cuff']
    },
    execution: {
      setup: 'Lie supine on a mat with knees bent (or legs straight), shoulder blades anchored to the floor, dumbbells held neutral or slightly angled at 45°.',
      eccentric: 'Lower smoothly for 2–3 seconds until the back of both upper arms rests softly on the floor without slamming the elbows.',
      concentric: 'Pause calmly for half a second at floor contact to kill stretch momentum, then press explosively back to full arm extension.',
      breathing: 'Inhale descending; pause briefly at bottom; exhale firmly pressing upward.',
      commonMistakes: [
        'Bouncing elbows sharply off the floor to cheat upward',
        'Flaring upper arms out to a stiff 90° T-angle',
        'Lifting hips or head violently off the mat'
      ],
      proTip: 'Floor termination provides an automatic shoulder-friendly depth stop while aggressively training triceps lockout strength.'
    }
  },
  {
    id: 'ex-dumbbell-chest-fly',
    name: 'Dumbbell Chest Fly',
    scientificName: 'Supine horizontal shoulder adduction across wide arc isolating pectoralis major',
    subtitle: 'Flat-bench dumbbell fly for deep chest stretch & isolation',
    pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
    equipment: 'Dumbbells + Flat Bench',
    mechanics: 'Isolation',
    level: 'Beginner',
    muscleKey: 'chest',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 75,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Pectoralis Major'],
      secondary: ['Anterior Deltoid', 'Coracobrachialis'],
      stabilizers: ['Biceps Brachii (Soft Elbow Brace)', 'Serratus Anterior']
    },
    execution: {
      setup: 'Lie on a flat bench with shoulder blades packed, arms extended over chest with palms facing each other and a locked slight elbow bend (~15–20°).',
      eccentric: 'Sweep arms open wide in a broad arc over 3 seconds keeping elbow angle constant until feeling a full chest stretch inline with torso level.',
      concentric: 'Pull arms smoothly back inward along the identical wide arc ("hugging a wide barrel"), stopping before dumbbells collide.',
      breathing: 'Inhale fully expanding the chest while opening wide; exhale closing cleanly.',
      commonMistakes: [
        'Bending elbows deeply at bottom and converting the fly into a press',
        'Dropping far below shoulder level and straining the anterior shoulder tendon',
        'Clanking dumbbells together overhead and losing constant chest tension'
      ],
      proTip: 'Stop each rep with hands still ~15–20 cm apart at top—beyond that point gravity drops vertical and pectoral tension disappears.'
    }
  },
  {
    id: 'ex-dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    scientificName: 'Standing open-chain humeral abduction in scapular plane isolating lateral deltoid',
    subtitle: 'Standing dumbbell raise targeting side/lateral deltoid width',
    pattern: MOVEMENT_PATTERNS.SHOULDER_ABDUCTION,
    equipment: 'Dumbbells',
    mechanics: 'Isolation',
    level: 'Beginner',
    muscleKey: 'shoulders',
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    rpe: '8 - 9',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Lateral / Middle Deltoid'],
      secondary: ['Anterior Deltoid', 'Supraspinatus'],
      stabilizers: ['Upper & Mid Trapezius', 'Core Bracing']
    },
    execution: {
      setup: 'Stand tall with a slight ~5–10° hip lean forward, dumbbells resting alongside or just ahead of hips, elbows lightly unlocked.',
      eccentric: 'Lower smoothly over 2–3 seconds resisting gravity without resting dumbbells completely dead on your thighs.',
      concentric: 'Sweep weights outward slightly ahead of the torso (~20–30° scapular plane) by reaching toward the sidewalls up to shoulder height.',
      breathing: 'Exhale while raising arms without shrugging traps; inhale smoothly lowering.',
      commonMistakes: [
        'Shrugging the shoulders up toward the ears and letting upper traps dominate',
        'Swinging body weight rhythmically to launch heavy weights up',
        'Turning thumbs sharply downward ("pouring pitchers") into shoulder impingement'
      ],
      proTip: 'Push the dumbbells outward away toward opposite walls rather than simply straight up—upper traps relax instantly while lateral delts ignite.'
    }
  },
  {
    id: 'ex-dumbbell-rear-delt-fly',
    name: 'Dumbbell Rear Delt Fly',
    scientificName: 'Bent-over horizontal shoulder abduction targeting posterior deltoid fibers',
    subtitle: 'Bent-over reverse dumbbell fly for rear delts & upper-back balance',
    pattern: MOVEMENT_PATTERNS.SHOULDER_ABDUCTION,
    equipment: 'Dumbbells',
    mechanics: 'Isolation',
    level: 'Beginner',
    muscleKey: 'shoulders',
    defaultSets: 3,
    defaultReps: '15-20',
    defaultRestSeconds: 60,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Posterior Deltoid'],
      secondary: ['Rhomboids', 'Mid & Lower Trapezius', 'Infraspinatus'],
      stabilizers: ['Spinal Erectors', 'Hamstrings (Hip Hinge Support)']
    },
    execution: {
      setup: 'Hinge cleanly from hips until torso sits nearly parallel to floor with neutral back, arms hanging vertically under shoulders, palms facing inward.',
      eccentric: 'Lower dumbbells back under shoulders slowly in 2 seconds avoiding passive swinging.',
      concentric: 'Sweep straight/softly-bent arms wide outward ("sweeping the floor away") until arms reach shoulder level without pinching shoulder blades heavily.',
      breathing: 'Exhale smoothly sweeping outward; inhale controlling return.',
      commonMistakes: [
        'Overloading weights and rowing with bent elbows instead of wide sweeps',
        'Standing torso upright during repetitions',
        'Slamming shoulder blades together so rhomboids overpower rear delts'
      ],
      proTip: 'Go lighter than your ego wants and reach the backs of your hands far outward away from the ribs rather than high toward the ceiling.'
    }
  },
  {
    id: 'ex-dumbbell-pullover',
    name: 'Dumbbell Pullover',
    scientificName: 'Long-ROM sagittal shoulder extension on flat bench targeting lats & serratus',
    subtitle: 'Supine bench dumbbell pullover for lats, lower chest & serratus',
    pattern: MOVEMENT_PATTERNS.VERTICAL_PULL,
    equipment: 'Single Dumbbell + Flat Bench',
    mechanics: 'Isolation',
    level: 'Intermediate',
    muscleKey: 'back',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 75,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Latissimus Dorsi', 'Pectoralis Major (Sternal)'],
      secondary: ['Teres Major', 'Long Head Triceps', 'Serratus Anterior'],
      stabilizers: ['Anterior Core (Anti-Extension)']
    },
    execution: {
      setup: 'Lie flat on bench with abs braced down, diamond-cup the underside of a dumbbell top head straight over chest with elbows mildly bent and fixed.',
      eccentric: 'Keep ribcage locked down with abs while arching the dumbbell overhead behind your skull over 3 seconds to comfortable shoulder extension.',
      concentric: 'Initiate pull cleanly from the armpits/lats back over chest height stopping over upper sternum without bending elbows further.',
      breathing: 'Inhale expanding thoracic stretch behind head; exhale pulling forcefully over chest.',
      commonMistakes: [
        'Flaring ribs upward and arching low back excessively to chase fake depth behind head',
        'Flexing elbows heavily into a tricep extension',
        'Forcing arms deeper overhead than healthy shoulder mobility permits'
      ],
      proTip: 'Keep your lower ribs pinned downward toward your belt line while lowering—that preserves pure lat stretch instead of faking motion via back extension.'
    }
  },
  {
    id: 'ex-dumbbell-hammer-curl',
    name: 'Dumbbell Hammer Curl',
    scientificName: 'Neutral-grip (semi-pronated) elbow flexion prioritizing brachialis & brachioradialis',
    subtitle: 'Neutral-grip dumbbell curl for arm thickness and forearms',
    pattern: MOVEMENT_PATTERNS.ELBOW_FLEXION,
    equipment: 'Dumbbells',
    mechanics: 'Isolation',
    level: 'Beginner',
    muscleKey: 'biceps',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 60,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Brachialis', 'Brachioradialis'],
      secondary: ['Biceps Brachii (Long Head)'],
      stabilizers: ['Wrist Stabilizers', 'Anterior Deltoid', 'Core']
    },
    execution: {
      setup: 'Stand tall holding dumbbells along sides with palms facing inward toward your thighs (neutral hammer grip) and elbows tucked comfortably beside ribs.',
      eccentric: 'Lower dumbbells over 2–3 seconds down to straight arms while maintaining firm neutral wrist alignment.',
      concentric: 'Curl smoothly upward keeping palms facing inward cleanly until thumbs near shoulder level without drifting elbows backward.',
      breathing: 'Exhale while curling upward; inhale smoothly lowering back down.',
      commonMistakes: [
        'Rotating palms upward mid-rep into a regular curl',
        'Swinging the torso backward for momentum',
        'Flexing wrists inward at the top'
      ],
      proTip: 'Keeping a pure neutral grip places the underlying brachialis at optimal mechanical advantage, visibly thickening the outer upper arm.'
    }
  },
  {
    id: 'ex-lying-dumbbell-triceps-extension',
    name: 'Lying Dumbbell Triceps Extension',
    scientificName: 'Supine overhead triceps elbow extension maximizing long-head stretch',
    subtitle: 'Supine flat-bench overhead extension with single dumbbell',
    pattern: MOVEMENT_PATTERNS.ELBOW_EXTENSION,
    equipment: 'Single Dumbbell + Flat Bench',
    mechanics: 'Isolation',
    level: 'Intermediate',
    muscleKey: 'triceps',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 75,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Triceps Brachii (Long, Lateral & Medial Heads)'],
      secondary: ['Anconeus'],
      stabilizers: ['Latissimus Dorsi', 'Rotator Cuff', 'Wrist Flexors']
    },
    execution: {
      setup: 'Lie supine on flat bench cupping a single dumbbell overhead with both hands; angle upper arms slightly backward past vertical (~100° shoulder angle).',
      eccentric: 'Bend strictly at the elbows over 3 seconds lowering the weight smoothly behind the head while keeping elbows stacked parallel until full triceps stretch.',
      concentric: 'Extend forearms strongly upward back to full triceps contraction while holding upper arms stationary.',
      breathing: 'Inhale descending smoothly behind head; exhale driving cleanly up.',
      commonMistakes: [
        'Flaring elbows wide sideways and stressing the inner elbow joint',
        'Turning shoulder joints up and down rather than rotating purely around the elbow hinge',
        'Dropping weights fast at the bottom'
      ],
      proTip: 'Tilting your upper arms ~10° backward behind vertical keeps continuous tension across the triceps long head even at top lockout.'
    }
  },
  {
    id: 'ex-dumbbell-reverse-lunge',
    name: 'Dumbbell Reverse Lunge',
    scientificName: 'Unilateral posterior step lunge minimizing patellofemoral anterior shear',
    subtitle: 'Alternating step-back lunges with dumbbells for quads & glutes',
    pattern: MOVEMENT_PATTERNS.LUNGE,
    equipment: 'Dumbbells',
    mechanics: 'Compound',
    level: 'Beginner',
    muscleKey: 'quads',
    defaultSets: 3,
    defaultReps: '10-12/side',
    defaultRestSeconds: 90,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Quadriceps', 'Gluteus Maximus'],
      secondary: ['Hamstrings', 'Adductor Magnus'],
      stabilizers: ['Gluteus Medius', 'Core & Calves']
    },
    execution: {
      setup: 'Stand hip-width tall holding dumbbells at your sides with chest upright and eyes fixed forward.',
      eccentric: 'Step one foot smoothly backward onto the forefoot and drop the pelvis vertically until both knees reach ~90°, hovering back knee cleanly clear of floor.',
      concentric: 'Drive strongly upward through the grounded front foot to bring the trailing leg cleanly back to standing.',
      breathing: 'Inhale stepping back and descending; exhale firmly pushing forward upright.',
      commonMistakes: [
        'Stepping back on a narrow tightrope line directly behind the front heel ("loss of balance")',
        'Slamming the trailing knee hard into the floor',
        'Pushing off heavily from the back foot rather than the lead leg'
      ],
      proTip: 'Reverse lunges naturally keep your front shin vertical and knee comfortable while encouraging deep glute engagement.'
    }
  },
  {
    id: 'ex-standing-dumbbell-calf-raise',
    name: 'Standing Calf Raise',
    scientificName: 'Bilateral straight-knee plantarflexion off raised platform with dumbbells',
    subtitle: 'Two-leg standing calf raise on elevated block with dumbbells',
    pattern: MOVEMENT_PATTERNS.CALF_ISOLATION,
    equipment: 'Dumbbells + Step Box',
    mechanics: 'Isolation',
    level: 'Beginner',
    muscleKey: 'calves',
    defaultSets: 4,
    defaultReps: '15-20',
    defaultRestSeconds: 60,
    rpe: '8 - 9',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Gastrocnemius (Medial & Lateral Heads)'],
      secondary: ['Soleus', 'Peroneals'],
      stabilizers: ['Upper Traps & Forearms (Grip)', 'Core']
    },
    execution: {
      setup: 'Position both balls of feet firmly across a sturdy raised wood block or step edge with knees straight, holding dumbbells along both sides.',
      eccentric: 'Lower heels gradually over 3 seconds into maximal ankle stretch below platform level and hold cleanly for 1–2 seconds.',
      concentric: 'Drive high vertically across the big-toe balls to top peak contraction and squeeze for 1 full second.',
      breathing: 'Inhale into deep stretch; exhale rising into peak calf contraction.',
      commonMistakes: [
        'Using fast bouncing tempo with zero bottom pause',
        'Shifting bodyweight onto the outer fifth toes instead of pressing across the big-toe arch',
        'Unlocking and bending knees during each press'
      ],
      proTip: 'Slow down the lowest inch and pause completely dead at bottom—that removes elastic tendon momentum and builds true gastroc density.'
    }
  },
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
    id: 'ex-kettlebell-goblet-lunge',
    name: 'Kettlebell Goblet Lunge',
    scientificName: 'Unilateral split-stance lunge counterbalanced at sternum with goblet kettlebell',
    subtitle: 'Chest-loaded kettlebell lunge for quads, glutes & upright core',
    pattern: MOVEMENT_PATTERNS.LUNGE,
    equipment: 'Kettlebell',
    mechanics: 'Compound',
    level: 'Beginner',
    muscleKey: 'quads',
    defaultSets: 3,
    defaultReps: '10/side',
    defaultRestSeconds: 75,
    rpe: '8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Quadriceps', 'Gluteus Maximus'],
      secondary: ['Hamstrings', 'Anterior Core'],
      stabilizers: ['Gluteus Medius', 'Thoracic Erectors', 'Biceps & Grip']
    },
    execution: {
      setup: 'Hold kettlebell horns solidly against your sternum with elbows tucked compactly to your sides and upright spine.',
      eccentric: 'Step smoothly into a balanced lunge while keeping trunk tall against the anterior weight until trailing knee nears floor.',
      concentric: 'Press briskly through the lead foot keeping elbows tucked tight to stand back tall.',
      breathing: 'Inhale stepping smoothly down; exhale strongly while driving back up.',
      commonMistakes: [
        'Dropping weight forward away from sternum and hunching thoracic spine',
        'Walking feet along one narrow line and losing balance',
        'Letting lead knee buckle inward'
      ],
      proTip: 'Front-racking at the sternum instantly forces anterior abs and upper-back posture muscles to stabilize every step.'
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
    id: 'ex-pike-push-up',
    name: 'Pike Push-Up',
    scientificName: 'Inverted-V closed-chain vertical push prioritizing anterior & lateral deltoids',
    subtitle: 'Bodyweight inverted-V shoulder press for vertical pushing strength',
    pattern: MOVEMENT_PATTERNS.VERTICAL_PUSH,
    equipment: 'Bodyweight',
    requiresEquipment: false,
    mechanics: 'Compound',
    level: 'Intermediate',
    muscleKey: 'shoulders',
    defaultSets: 4,
    defaultReps: '8-12',
    defaultRestSeconds: 90,
    rpe: '8 - 9',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Anterior & Lateral Deltoids'],
      secondary: ['Triceps Brachii', 'Upper Pectorals'],
      stabilizers: ['Upper Trapezius', 'Serratus Anterior', 'Core']
    },
    execution: {
      setup: 'Start in a crisp inverted-V pike with hips high over hands, knees nearly straight, hands shoulder-width, gaze directed back between your feet.',
      eccentric: 'Lower diagonally forward ("triangle path") bending elbows back at ~45° so the crown of your head taps gently out in front of your hands.',
      concentric: 'Press forcefully along the exact same angled path up into tall overhead shoulder protraction.',
      breathing: 'Inhale descending forward into the triangle vertex; exhale pressing firmly away.',
      commonMistakes: [
        'Dropping face straight down between hands instead of ahead of fingers',
        'Flaring elbows out 90° laterally',
        'Dropping hips down into a standard flat push-up mid-set'
      ],
      proTip: 'Form a clean triangle between your two hands and the top of your head on the mat—that diagonal path matches a standing barbell overhead press.'
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
    id: 'ex-cossack-squat',
    name: 'Cossack Squat',
    scientificName: 'Deep frontal-plane lateral squat combining unilateral loading & adductor mobility',
    subtitle: 'Deep side-to-side lateral squat for quads, hips & adductor flexibility',
    pattern: MOVEMENT_PATTERNS.SQUAT,
    equipment: 'Bodyweight',
    requiresEquipment: false,
    mechanics: 'Compound',
    level: 'Intermediate',
    muscleKey: 'quads',
    defaultSets: 3,
    defaultReps: '8-10/side',
    defaultRestSeconds: 60,
    rpe: '7 - 8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Quadriceps', 'Gluteus Maximus'],
      secondary: ['Hip Adductors (Loaded Stretch)', 'Hamstrings'],
      stabilizers: ['Gluteus Medius', 'Core & Ankle Dorsiflexors']
    },
    execution: {
      setup: 'Take a wide stance (~2× shoulder width) with toes turned slightly outward and arms forward for balance.',
      eccentric: 'Shift full weight over one side sinking deeply over that heel while keeping the opposite straight leg extended with toes rotated up toward ceiling.',
      concentric: 'Drive firmly out of the squatted heel back to tall wide standing before alternating smoothly to the opposite leg.',
      breathing: 'Inhale sinking deep laterally; exhale driving strongly back upright.',
      commonMistakes: [
        'Peeling the heel of the working squatted leg off the floor',
        'Leaving the opposite foot flat and collapsing the straight knee inward',
        'Folding chest excessively downward over thighs'
      ],
      proTip: 'Works brilliantly both as multi-planar mobility prep and as loaded unilateral strength when holding a kettlebell or dumbbell in goblet grip.'
    }
  },
  {
    id: 'ex-walking-lunge',
    name: 'Walking Lunge',
    scientificName: 'Continuous forward alternating split-squat locomotion pattern',
    subtitle: 'Dynamic bodyweight walking lunges for legs & hip stability',
    pattern: MOVEMENT_PATTERNS.LUNGE,
    equipment: 'Bodyweight',
    requiresEquipment: false,
    mechanics: 'Compound',
    level: 'Beginner',
    muscleKey: 'quads',
    defaultSets: 3,
    defaultReps: '16-20 steps',
    defaultRestSeconds: 75,
    rpe: '7 - 8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Quadriceps', 'Gluteus Maximus'],
      secondary: ['Hamstrings', 'Adductors'],
      stabilizers: ['Gluteus Medius', 'Core & Calves']
    },
    execution: {
      setup: 'Stand tall before an open floor lane with gaze straight ahead and balanced natural posture.',
      eccentric: 'Step smoothly forward to natural stride width dropping hips cleanly so both knees bend roughly 90° without striking back knee onto ground.',
      concentric: 'Drive upward and forward cleanly through the front flat foot stepping immediately into the next lunge step.',
      breathing: 'Maintain smooth, continuous rhythmic breathing matching step pace.',
      commonMistakes: [
        'Stepping straight inline foot-in-front-of-foot causing side wobble',
        'Crashing rear kneecap hard onto the floor on every rep',
        'Taking short choppy steps that jam knees far past toes'
      ],
      proTip: 'A 15° upright torso lean shifts extra emphasis toward the glutes; staying bolt upright targets anterior quadriceps.'
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
    rpe: '8 - 9',
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
    id: 'ex-reverse-snow-angel',
    name: 'Reverse Snow Angel',
    scientificName: 'Prone scapular retraction & external humeral arc for upper-back endurance',
    subtitle: 'Prone bodyweight back-and-shoulder sweep for posture & rear delts',
    pattern: MOVEMENT_PATTERNS.HORIZONTAL_PULL,
    equipment: 'Bodyweight (Mat)',
    requiresEquipment: false,
    mechanics: 'Isolation',
    level: 'Beginner',
    muscleKey: 'back',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    rpe: '7 - 8',
    lastRecord: '',
    illustration: '',
    mediaType: 'image',
    targetMuscles: {
      primary: ['Middle & Lower Trapezius', 'Posterior Deltoid'],
      secondary: ['Rhomboids', 'Thoracic Erectors', 'Rotator Cuff'],
      stabilizers: ['Glutes & Abs (Pelvic Anchor)']
    },
    execution: {
      setup: 'Lie facedown on mat with chest floated subtly (~3–5 cm), glutes gently tight, arms hovered clear of floor either overhead or beside hips.',
      eccentric: 'Sweep straight arms cleanly back overhead along wide semicircular arc keeping hands floated above floor.',
      concentric: 'Draw arms around back beside hips with thumbs rotated upward toward ceiling while pulling shoulder blades smoothly down and together.',
      breathing: 'Keep smooth even breaths with neck relaxed long toward mat.',
      commonMistakes: [
        'Hyperextending lower back violently by lifting ribs far off mat',
        'Letting fingertips drag along the floor and unloading muscles',
        'Hiking shoulders upward toward ears during sweep'
      ],
      proTip: 'Keep thumbs pointing toward the ceiling throughout the sweep to promote healthy shoulder external rotation and combat desk posture.'
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
  }
];

function inferRequiresEquipment(equipment = '') {
  const normalized = String(equipment || '').toLowerCase().trim();
  if (!normalized) return false;
  return !(
    normalized === 'bodyweight' ||
    normalized === 'bodyweight (mat)' ||
    normalized === 'bodyweight (wall)' ||
    normalized === 'corpo libero' ||
    normalized === 'none'
  );
}

export const EXERCISE_DATABASE = RAW_EXERCISE_DATABASE.map(ex => ({
  ...ex,
  requiresEquipment:
    typeof ex.requiresEquipment === 'boolean'
      ? ex.requiresEquipment
      : inferRequiresEquipment(ex.equipment),
  mechanics: ex.mechanics || 'Compound',
  level: ex.level || 'Intermediate',
  illustration: ex.illustration || EXERCISE_MEDIA[ex.id] || ''
}));
