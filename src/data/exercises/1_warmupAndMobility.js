/**
 * WARMUPANDMOBILITY
 * Modular Exercise Sub-Database
 */

import { MOVEMENT_PATTERNS } from '../exerciseConstants.js';

export const WARMUPANDMOBILITY_EXERCISES = [
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
      rpe: '',
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
      rpe: '',
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
      rpe: '',
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

  {
      id: 'wu-cat-cow-child-pose',
      name: "Cat-Cow to Child's Pose Flow",
      scientificName: 'Quadruped segmental spinal flexion-extension transitioning to passive lumbar flexion',
      subtitle: 'Rhythmic spinal articulation and lat/thoracic decompression flow',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'back',
      defaultSets: 2,
      defaultReps: '6-8 flows',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Spinal Erectors', 'Thoracic Spine'],
        secondary: ['Latissimus Dorsi', 'Rectus Abdominis'],
        stabilizers: ['Serratus Anterior', 'Hip Capsule']
      },
      execution: {
        setup: 'Start on hands and knees with wrists stacked under shoulders and knees directly beneath hips.',
        eccentric: 'Inhale to drop the belly, lift the chest, and gaze slightly forward (Cow). Exhale to tuck the tailbone and press the floor away, rounding the spine toward the ceiling (Cat).',
        concentric: 'From peak Cat flexion, glide the hips smoothly backward onto your heels into Child’s Pose with arms extended long, taking a deep diaphragmatic breath into the back ribs.',
        breathing: 'Synchronize breathing: Inhale Cow, exhale Cat, full slow inhale in Child’s Pose.',
        commonMistakes: [
          'Aggressively cranking the neck backward during Cow',
          'Shrugging shoulders into the ears during Child’s Pose',
          'Rushing the flow without pausing in thoracic extension'
        ],
        proTip: 'Focus on segmenting individual vertebrae rather than hinging only at the lower back.'
      }
    },

  {
      id: 'wu-worlds-greatest-stretch',
      name: "World's Greatest Stretch",
      scientificName: 'Multi-planar lunge with thoracic rotation, hip flexor elongation & hamstring extension',
      subtitle: 'Comprehensive multi-joint dynamic mobility complex',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 2,
      defaultReps: '5/side',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hip Flexors & Psoas', 'Thoracic Spine', 'Hamstrings'],
        secondary: ['Gluteus Medius', 'Adductors', 'Calves'],
        stabilizers: ['Shoulder Girdle', 'Core Cylindrical Stabilizers']
      },
      execution: {
        setup: 'Step forward into a deep runner’s lunge with right foot outside your right hand. Drop back left knee to floor (or keep elevated).',
        eccentric: 'Lower right elbow toward right instep to stretch hip adductors and groin.',
        concentric: 'Rotate chest open toward right knee, sweeping right hand toward ceiling while tracking thumb with your eyes. Return hand down and press hips back into a brief hamstring stretch.',
        breathing: 'Inhale dropping elbow; exhale rotating chest toward ceiling; inhale returning.',
        commonMistakes: [
          'Rotating solely from the lumbar spine rather than opening the ribcage',
          'Allowing front heel to peel off floor',
          'Collapsing the supportive shoulder girdle'
        ],
        proTip: 'Actively squeeze the glute of the rear trailing leg to release the anterior hip flexor via reciprocal inhibition.'
      }
    },

  {
      id: 'wu-kettlebell-halo',
      name: 'Kettlebell Halo',
      scientificName: 'Tri-planar circumduction of external mass around cervical-thoracic axis',
      subtitle: 'Shoulder capsule mobilization and rotational core priming',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Kettlebell',
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'shoulders',
      defaultSets: 2,
      defaultReps: '6-8 circles/dir',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rotator Cuff (Supraspinatus, Infraspinatus, Teres Minor)', 'Deltoids'],
        secondary: ['Upper Trapezius', 'Rhomboids'],
        stabilizers: ['Obliques (Anti-Rotation)', 'Thoracic Spine']
      },
      execution: {
        setup: 'Stand tall with ribs stacked over pelvis. Hold a light kettlebell upside down by the horns at chest level (or light dumbbell horizontally).',
        eccentric: 'Circle the bell smoothly around the side and back of your head, grazing the nape of the neck.',
        concentric: 'Bring the bell around the opposite ear back to starting chest position, then immediately reverse direction.',
        breathing: 'Breathe steadily and rhythmically throughout the circular path.',
        commonMistakes: [
          'Moving torso and swaying hips instead of isolating the arms',
          'Craning head aggressively forward to dodge the weight',
          'Using excessive weight that strains elbows'
        ],
        proTip: 'Keep your chin neutral and move the bell around your head—never move your head around the bell.'
      }
    },

  {
      id: 'wu-banded-lateral-walk',
      name: 'Banded Lateral Monster Walk',
      scientificName: 'Bilateral Semi-Squat Closed-Chain Lateral Gait — Frontal Elastic Hip Abduction',
      subtitle: 'Dynamic glute medius and external rotator activation walk',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Loop Resistance Band',
      isWarmup: true,
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 2,
      defaultReps: '12-15 steps/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Medius (Posterior & Middle Fibers)', 'Gluteus Minimus'],
        secondary: ['Gluteus Maximus (Upper Fibers)', 'Tensor Fasciae Latae'],
        stabilizers: ['Vastus Lateralis & Medialis', 'Lumbo-Pelvic Core']
      },
      execution: {
        setup: 'Place a mini loop resistance band symmetrically just above the knees or ankles. Descend into an athletic quarter-squat with shins vertical, toes pointed straight ahead, and ribcage stacked over pelvis.',
        eccentric: 'Control the trailing leg inward only half-width after each step so constant elastic band tension never drops to slack.',
        concentric: 'Drive sideways out through the lead heel and lateral hip without swinging the shoulders or hiking the pelvis vertically.',
        breathing: 'Maintain continuous relaxed nasal or rhythmic breathing while holding subtle abdominal brace.',
        commonMistakes: [
          'Turning toes outward into external rotation and letting the quads and TFL dominate',
          'Bringing the feet too close together between steps so the band goes loose',
          'Tilting the upper torso sideways to manufacture wider steps'
        ],
        proTip: 'Keep your belt buckle level like a spirit level and push the floor sideways rather than lifting your foot through the air.'
      }
    },

  {
      id: 'wu-passive-dead-hang',
      name: 'Overhead Bar Dead Hang',
      scientificName: 'Suspended Overhead Glenohumeral Flexion & Axial Lumbar Intervertebral Traction',
      subtitle: 'Passive overhead shoulder decompression and axial spinal unloading',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Pull-Up Bar',
      isWarmup: true,
      mechanics: 'Isometric',
      level: 'Beginner',
      muscleKey: 'back',
      defaultSets: 2,
      defaultReps: '30-45s',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Latissimus Dorsi (Passive Stretch)', 'Flexor Digitorum Profundus & Superficialis'],
        secondary: ['Teres Major', 'Pectoralis Minor (Overhead Elevation Stretch)'],
        stabilizers: ['Lower Trapezius', 'Thoracolumbar Fascia']
      },
      execution: {
        setup: 'Grasp an overhead pull-up bar slightly wider than shoulder width with a full pronated thumb-wrapped grip. Step cleanly off the support platform until feet hang free.',
        eccentric: 'Allow the ribcage, pelvis, and femurs to gently lengthen downward under gravity while breathing smoothly into the lower lateral ribs.',
        concentric: 'Maintain active finger flexion around the bar without shrugging anteriorly; step gently onto the platform when completing the timed hang.',
        breathing: 'Slow 4-second nasal inhales followed by long 6-second exhales to encourage pelvic drop and thoracic decompression.',
        commonMistakes: [
          'Hyperextending the lumbar spine by kicking the legs backward instead of keeping a softly hollow rib position',
          'Dropping suddenly off a high bar instead of stepping down with control',
          'Holding breath rigidly and fighting scapular upward rotation'
        ],
        proTip: 'Long exhalations relax high-tone paraspinal muscles and allow gentle gravitational traction across lumbar discs and the subacromial space.'
      }
    },

  {
      id: 'wu-lateral-glute-step-down',
      name: 'Lateral Glute Step-Down',
      scientificName: 'Unilateral Closed-Chain Eccentric Pelvic-Leveling Step-Down — Frontal-Plane Gluteus Medius Stabilization',
      subtitle: 'Bodyweight lateral step-down training pelvis control & stance-hip gluteus medius activation',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Step Box / Bench',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Medius (Stance Hip)', 'Gluteus Maximus'],
        secondary: ['Vastus Medialis & Lateralis', 'Gluteus Minimus'],
        stabilizers: ['Quadratus Lumborum', 'Deep External Hip Rotators']
      },
      execution: {
        setup: 'Stand sideways on the outer edge of a low 10–15 cm step or stable plate. Stack ribcage directly over your stance pelvis with weight centered across heel, big toe, and little toe.',
        eccentric: 'Initiate by unlocking the stance hip backward slightly while bending the stance knee in line with the second toe; slowly lower the free heel down for 3 seconds until it lightly skims the floor without shifting weight onto it.',
        concentric: 'Press cleanly through the stance midfoot and squeeze the stance glute to lock the pelvis level and extend smoothly back to tall standing posture.',
        breathing: 'Inhale under controlled descent; exhale cleanly while driving upward through the stance hip.',
        commonMistakes: [
          'Allowing the unsupported hip to drop diagonally (Trendelenburg drop) or the stance knee to cave inward',
          'Pushing explosively off the bottom floor foot instead of holding constant tension on the stance hip',
          'Rounding the lower back or flexing only at the ankle without sitting slightly into the hip'
        ],
        proTip: 'Imagine headlights on both hip bones shining straight forward — keep them dead level while your stance glute controls every millimeter of descent.'
      }
    },

  {
      id: 'wu-dumbbell-glute-step-down',
      name: 'Dumbbell Light-Loaded Glute Step-Down',
      scientificName: 'Light-Loaded Unilateral Closed-Chain Eccentric Step-Down — Contralateral/Goblet Gluteus Medius Integration',
      subtitle: 'Light dumbbell-loaded step-down heightening gluteus medius neuromuscular activation & pelvic stability',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Single Dumbbell',
      isWarmup: true,
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Medius (Stance Hip)', 'Gluteus Maximus'],
        secondary: ['Vastus Medialis Obliquus (VMO)', 'Adductor Magnus'],
        stabilizers: ['Contralateral Obliques', 'Quadratus Lumborum']
      },
      execution: {
        setup: 'Hold a light dumbbell either in goblet position at chest height or in the hand opposite your stance leg (contralateral load increases lateral hip demand). Stand balanced near the side edge of a 10–20 cm step.',
        eccentric: 'Keep torso upright and pelvis square; sink smoothly down over 3 seconds with knees tracking cleanly over toes until the free heel kisses the floor silently.',
        concentric: 'Drive vertically through the working tripod foot, extending knee and hip together while pulling the lateral hip firmly over the stance femur.',
        breathing: 'Smooth nasal inhale during the slow 3-second lowering phase; exhale softly as you rise.',
        commonMistakes: [
          'Using an excessively heavy dumbbell that turns neuromuscular priming into heavy fatigue',
          'Letting the loaded side lean or twist inward around the stance hip',
          'Heel bouncing off the ground between reps instead of silent eccentric control'
        ],
        proTip: 'Holding one light dumbbell on the non-working hand side amplifies frontal-plane torque cleanly—forcing the stance gluteus medius to fire aggressively right away.'
      }
    },

  {
      id: 'wu-kettlebell-glute-step-down',
      name: 'Kettlebell Light-Loaded Glute Step-Down',
      scientificName: 'Contralateral Kettlebell-Loaded Closed-Chain Step-Down — Asymmetric Frontal-Plane Hip Stabilization',
      subtitle: 'Light kettlebell rack or suitcase-loaded step-down challenging pelvic & rotational hip control',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Kettlebell',
      isWarmup: true,
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'glutes',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Medius (Posterior Fibers)', 'Gluteus Maximus'],
        secondary: ['Quadriceps', 'Deep External Hip Rotators'],
        stabilizers: ['Obliques (Anti-Lateral Flexion)', 'Intrinsic Foot Arch']
      },
      execution: {
        setup: 'Clean a light kettlebell into a comfortable contralateral front-rack or suitcase hold and step laterally onto a low box or stacked plates.',
        eccentric: 'Lower the free leg slowly under steady tempo, maintaining a vertical shin-hip alignment and zero pelvic tilt toward the hanging leg.',
        concentric: 'Push downward through the whole stance heel and outer arch to glide upright cleanly without snapping the knee back.',
        breathing: 'Keep steady ribcage bracing with nasal inhale on lowering and controlled exhale on ascent.',
        commonMistakes: [
          'Swinging the bell outward to counterbalance instead of holding it still against the torso',
          'Rotating the free hip outward to shorten step depth',
          'Collapsing the stance medial foot arch inward'
        ],
        proTip: 'Pair slow timed sets with barefoot or flat-sole stance feedback to maximize intrinsic foot arch and posterior glute medius co-contraction.'
      }
    },

  {
      id: 'wu-banded-glute-step-down',
      name: 'Banded Lateral Glute Step-Down',
      scientificName: 'Closed-Chain Eccentric Step-Down With Reactive Neuromuscular Training (RNT) Medial Band Vector',
      subtitle: 'Mini loop band cue forcing lateral hip external rotation throughout eccentric descent',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Loop Resistance Band',
      isWarmup: true,
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Gluteus Medius', 'Gluteus Minimus'],
        secondary: ['Gluteus Maximus (Upper Fibers)', 'Quadriceps'],
        stabilizers: ['Deep Hip External Rotators', 'Pelvic Floor & Core']
      },
      execution: {
        setup: 'Place a light mini loop band just above both knees (or attach a lateral band pulling the stance knee gently inward for RNT feedback) while standing atop a low step.',
        eccentric: 'Actively press the stance knee outward against the elastic pull so the patella tracks over the second and third toes as you slowly descend toward a soft heel touch.',
        concentric: 'Hold continuous outward torque on the knee while rising smoothly back to full hip extension.',
        breathing: 'Breathe steadily while maintaining constant outward knee-to-band tension across the full interval.',
        commonMistakes: [
          'Allowing the band tension to win and snap the knee into valgus collapse',
          'Rushing repetitions instead of keeping continuous 30–45s time under tension',
          'Twisting the pelvis away from the step edge'
        ],
        proTip: 'Pulling a band medially ("feed the mistake" / RNT) wires reflexive gluteus medius firing faster than verbal cues alone.'
      }
    },

  {
      id: 'wu-elevated-ankle-dorsiflexion',
      name: 'Elevated Ankle Dorsiflexion Mobilization',
      scientificName: 'Closed-Chain Weight-Bearing Talocrural Dorsiflexion Mobilization (Foot-Elevated Split Stance)',
      subtitle: 'Foot-elevated knee-over-toe talocrural glide & soleus mobilization',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Step Box / Bench',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'calves',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Ankle Dorsiflexors & Talocrural Capsule', 'Soleus'],
        secondary: ['Gastrocnemius (Distal Myotendinous Junction)', 'Flexor Hallucis Longus'],
        stabilizers: ['Intrinsic Foot Arch', 'Hip Flexors (Contralateral Stance)']
      },
      execution: {
        setup: 'Place the working whole foot flat atop a sturdy plyo box, weight bench, or 25–40 cm step in front of you. Keep your torso tall and your rear trailing leg anchored stably behind.',
        eccentric: 'Lean your weight smoothly forward to drive the elevated knee directly over and past the second and third toes while keeping your front heel pressed solidly down into the step.',
        concentric: 'Hold the deepest pain-free end-range ankle flexion for 2–3 slow breaths (or oscillate smoothly in and out for the entire timed interval) before easing gently back.',
        breathing: 'Deep, calm nasal inhales with long relaxed exhales while sinking slightly further forward over the toes.',
        commonMistakes: [
          'Letting the working heel peel upward off the box to fake extra knee travel',
          'Collapsing the medial foot arch inward (pronation twist) instead of tracking over toes 2–3',
          'Pushing aggressively into sharp front-of-ankle pinching instead of posterior calf tension'
        ],
        proTip: 'Keep your heel glued down with light downward fingertip pressure if needed—true talocrural dorsiflexion clears deeper squat positions immediately.'
      }
    },

  {
      id: 'wu-dumbbell-ankle-dorsiflexion',
      name: 'Dumbbell Elevated Ankle Dorsiflexion Mobilization',
      scientificName: 'Externally Loaded Closed-Chain Talocrural Dorsiflexion Mobilization (Distal Femur Dumbbell Load)',
      subtitle: 'Foot-elevated knee-over-toe ankle stretch with light distal thigh dumbbell load',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Single Dumbbell',
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'calves',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Soleus', 'Talocrural Posterior Joint Capsule'],
        secondary: ['Achilles Tendon', 'Gastrocnemius'],
        stabilizers: ['Tibialis Anterior', 'Plantar Intrinsic Muscles']
      },
      execution: {
        setup: 'Elevate the target foot flat on a box or bench and rest a light dumbbell vertically across the distal thigh just above the kneecap so gravity assists vertical heel compression.',
        eccentric: 'Shift torso weight patiently forward, steering knee over middle toes as the dumbbell weight anchors the heel firmly down to deepen bent-knee soleus stretch.',
        concentric: 'Maintain calm isometric end-range pressure or gentle rhythmic pulses throughout the timed block before lifting out cleanly.',
        breathing: 'Slow 4-second nasal inhale followed by a long 5–6s exhale to release protective calf stretch reflex.',
        commonMistakes: [
          'Using a heavy dumbbell that compresses the patella uncomfortably or peels the heel off',
          'Resting the weight directly onto the kneecap instead of the flat distal quadriceps muscle belly',
          'Holding breath rigidly against the stretch sensation'
        ],
        proTip: 'Even a light 6–12 kg dumbbell over the lower thigh multiplies soleus & ankle capsule yield effortlessly compared to unweighted pushing.'
      }
    },

  {
      id: 'wu-kettlebell-ankle-dorsiflexion',
      name: 'Kettlebell Elevated Ankle Dorsiflexion Mobilization',
      scientificName: 'Externally Loaded Closed-Chain Talocrural Dorsiflexion Mobilization (Anterior Knee Kettlebell Load)',
      subtitle: 'Foot-elevated knee-over-toe talocrural stretch weighted via resting kettlebell',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Kettlebell',
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Intermediate',
      muscleKey: 'calves',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Soleus', 'Ankle Dorsiflexors'],
        secondary: ['Posterior Talocrural Capsule', 'Peroneals'],
        stabilizers: ['Tibialis Anterior (Active End-Range Pull)', 'Rear Leg Hip Flexor']
      },
      execution: {
        setup: 'Plant the working foot flat on a step or low bench and balance a light-to-moderate kettlebell securely by its handle on the distal thigh just behind the knee.',
        eccentric: 'Allow your chest and forearms to lean comfortably over the front thigh, gliding the shin diagonally forward while keeping the entire heel glued down.',
        concentric: 'Perform short isometric tibialis "pull-in" contractions inside the stretched angle before relaxing deeper on the exhale for the timed window.',
        breathing: 'Unrushed diaphragmatic breathing synchronized to relaxing calf guarding on every exhale.',
        commonMistakes: [
          'Heel lifting off the surface behind the bell load',
          'Letting the working hip hike or rotate away from forward alignment',
          'Forcing motion through sharp anterior bony pinching rather than easing back a few millimeters'
        ],
        proTip: 'After holding passive end-range for 20s, finish the last 10–15s actively pulling your shin forward with tibialis anterior for lasting active ROM retention.'
      }
    },

  {
      id: 'wu-banded-ankle-dorsiflexion',
      name: 'Banded Elevated Ankle Dorsiflexion (Talar Glide)',
      scientificName: 'Mulligan Mobilization-With-Movement (MWM) — Anterior Tibial / Posterior Talar Glide Dorsiflexion',
      subtitle: 'Banded joint-distracted foot-elevated ankle mobilization clearing anterior impingement',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Loop Resistance Band',
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Intermediate',
      muscleKey: 'calves',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Talocrural Joint Capsule (Posterior Glide)', 'Soleus'],
        secondary: ['Tibialis Anterior', 'Distal Tibiofibular Ligaments'],
        stabilizers: ['Intrinsic Foot Arch', 'Gluteus Maximus (Trailing Stabilizer)']
      },
      execution: {
        setup: 'Anchor a thick resistance band low behind you and loop it strictly BELOW the ankle bones (across the talus crease, NOT high on the shin). Step that foot onto a low step/plate under brisk backward band tension.',
        eccentric: 'Keeping the front heel glued flat, drive your knee forward over toes 2–3 while the backward elastic band draws the talus bone posteriorly to clear front-of-ankle pinching.',
        concentric: 'Oscillate smoothly into peak painless dorsiflexion or pause 2–3 seconds per forward drive across the timed interval.',
        breathing: 'Steady calm breathing throughout the rhythmic joint-glide waves.',
        commonMistakes: [
          'Placing the band too high above the malleoli on the tibia (which blocks glide instead of freeing it)',
          'Allowing the band tension to drag your heel off the step',
          'Using weak tension that gives zero posterior talar decompression'
        ],
        proTip: 'If you ever feel a sharp "pinch" at the front of the ankle during squats, keeping the band low right over the talus crease instantly restores pain-free forward shin travel.'
      }
    },

  {
      id: 'wu-thoracic-open-book',
      name: 'Sidelying Thoracic Open-Book Rotation',
      scientificName: 'Sidelying Thoracic Axial Rotation With Hip-Locked Lumbar Neutralization',
      subtitle: 'Physiotherapy thoracic rotation & anterior chest opening while locking the lower back',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'back',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Thoracic Spine Rotators', 'Pectoralis Major & Minor (Stretch)'],
        secondary: ['Obliques (Thoracic Rotation)', 'Posterior Deltoid & Rhomboids'],
        stabilizers: ['Lumbar Spine (Hip-Flexed Block)', 'Deep Neck Flexors']
      },
      execution: {
        setup: 'Lie on your side with your bottom leg straight and your top knee bent past 90° resting firmly on a foam roller or yoga block (this locks the lumbar spine so all rotation happens cleanly in the mid-back). Extend both arms straight in front at chest height.',
        eccentric: 'Sweep your top arm up in a wide arc across to the opposite side, rotating strictly through your sternum and ribcage while keeping your top knee pinned heavily down onto the block.',
        concentric: 'Pause for 2 calm breaths at your pain-free end range, then glide the arm smoothly back to close the book.',
        breathing: 'Inhale as you sweep upward; exhale slowly into the open chest rotation to release ribcage stiffness.',
        commonMistakes: [
          'Letting the top knee lift off the floor/block so the lower back twists instead of the thoracic spine',
          'Forcing the back of the hand to the floor by wrenching the shoulder joint',
          'Rushing repetitions without exhaling at end range'
        ],
        proTip: 'Keep your eyes tracking your moving thumb—ocular guidance naturally drives cleaner cervical-thoracic rotation.'
      }
    },

  {
      id: 'wu-wall-angel-slides',
      name: 'Wall Angel Scapular Slide',
      scientificName: 'Dorsally Braced Closed-Chain Overhead Scapular Upward Rotation & Lower-Trapezius Activation',
      subtitle: 'Physiotherapy & gymnastics posture drill restoring overhead shoulder flexion without rib flare',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Wall)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'shoulders',
      defaultSets: 2,
      defaultReps: '8-10',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Lower & Middle Trapezius', 'Serratus Anterior'],
        secondary: ['Rotator Cuff (External Rotators)', 'Thoracic Erectors'],
        stabilizers: ['Anterior Core (Rib-Down Brace)', 'Deep Cervical Flexors']
      },
      execution: {
        setup: 'Stand with heels 10–15 cm in front of a wall, knees softly bent, and press sacrum, mid-back, and back of head lightly against the wall. Gently tuck ribs down so the low back stays flat (about one finger of space). Raise arms to a 90° goalpost position.',
        eccentric: 'Slide wrists, forearms, and elbows slowly downward toward your back pockets, squeezing shoulder blades down and slightly together.',
        concentric: 'Glide arms slowly up overhead along the wall as high as possible while keeping wrists, forearms, and lower ribs in contact.',
        breathing: 'Exhale gently while pressing ribs flat and sliding arms overhead; inhale on the controlled return.',
        commonMistakes: [
          'Arching the lumbar spine aggressively away from the wall to fake overhead arm reach',
          'Shrugging upper traps toward the ears as arms rise',
          'Letting wrists peel off the wall while elbows stay pinned'
        ],
        proTip: 'If your wrists peel off overhead, stop right before that point—honest range builds genuine lower-trap & serratus upward rotation.'
      }
    },

  {
      id: 'wu-scapular-pull-up',
      name: 'Scapular Pull-Up (Active Hang)',
      scientificName: 'Suspended Closed-Chain Scapular Depression & Upward/Downward Rotation Control',
      subtitle: 'Gymnastics foundational active hang strengthening lower trapezius & shoulder-blade depression',
      pattern: MOVEMENT_PATTERNS.VERTICAL_PULL,
      equipment: 'Pull-Up Bar',
      isWarmup: false,
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'back',
      defaultSets: 3,
      defaultReps: '8-10',
      defaultRestSeconds: 60,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Lower Trapezius', 'Latissimus Dorsi (Initial Pull)', 'Serratus Anterior'],
        secondary: ['Rhomboids', 'Pectoralis Minor (Stabilizing Counter-Control)'],
        stabilizers: ['Forearm Flexors (Grip)', 'Anterior Core (Hollow Brace)']
      },
      execution: {
        setup: 'Hang from an overhead pull-up bar with straight arms, shoulder-width grip, and a gentle hollow-body rib-down brace (ribs tucked, glutes softly engaged).',
        eccentric: 'Lower slowly over 2 seconds back into a full relaxed passive shoulder stretch without shrugging violently.',
        concentric: 'Keeping elbows 100% straight, pull shoulder blades firmly down away from your ears and slightly together until your chest lifts 5–10 cm cleanly; pause 1 second at top.',
        breathing: 'Exhale crisply while depressing shoulder blades downward; inhale as you lengthen back into passive hang.',
        commonMistakes: [
          'Bending the elbows and turning the drill into a partial arm pull-up',
          'Flaring the ribcage and arching the lumbar spine to pull the chest upward',
          'Bouncing rapidly without holding the top scapular depression squeeze'
        ],
        proTip: 'Every strong pull-up and healthy overhead shoulder starts from this first 5 cm of active scapular depression.'
      }
    },

  {
      id: 'wu-bench-thoracic-extension',
      name: 'Bench-Supported Thoracic Extension & Shoulder Opener',
      scientificName: 'Kneeling Closed-Chain Thoracic Sagittal Extension & Lat-Glenohumeral Overhead Flexion Stretch',
      subtitle: 'Bench-supported upper-back extension & overhead lat mobility opener',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Flat Bench',
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'back',
      defaultSets: 2,
      defaultReps: '30-45s',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Thoracic Spine Extensors', 'Latissimus Dorsi (Lengthened)'],
        secondary: ['Pectoralis Minor', 'Triceps Long Head', 'Serratus Anterior'],
        stabilizers: ['Anterior Core (Lumbar Rib-Down Brace)', 'Gluteus Maximus']
      },
      execution: {
        setup: 'Kneel facing a flat bench at hip distance and rest both elbows and forearms shoulder-width apart on the bench pad.',
        eccentric: 'Keeping lower ribs gently tucked so the lumbar spine stays neutral, sink your sternum smoothly downward between your upper arms.',
        concentric: 'Hold the comfortable end-range stretch for 2–3 slow breaths, then lightly press elbows into the bench to rise out with control.',
        breathing: 'Inhale into the upper back ribs; exhale slowly to allow the chest to melt deeper toward the floor.',
        commonMistakes: [
          'Dumping into lower-back hyperextension instead of moving through the mid-back',
          'Forcing sharp front-shoulder pinching by shrugging traps toward ears',
          'Holding breath instead of relaxing into long exhales'
        ],
        proTip: 'Lightly press your elbows down into the bench for 5 seconds (PAILs) before exhaling deeper into thoracic extension.'
      }
    },

  {
      id: 'wu-cervical-rotations-nods',
      name: 'Cervical Rotations & Controlled Nods',
      scientificName: 'Standing Open-Chain Cervical Axial Rotation & Upper-Cervical Flexion-Extension Articulation',
      subtitle: 'Gentle neck joint-capsule priming across rotation and sagittal nods',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'trapezius',
      defaultSets: 2,
      defaultReps: '6-8/dir',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Deep Cervical Flexors', 'Suboccipitals', 'Sternocleidomastoid'],
        secondary: ['Upper Trapezius', 'Levator Scapulae', 'Splenius Capitis'],
        stabilizers: ['Thoracic Erectors', 'Scapular Depressors']
      },
      execution: {
        setup: 'Stand tall with shoulders relaxed down away from ears and gaze level on the horizon.',
        eccentric: 'Slowly rotate your chin cleanly toward one shoulder without twisting the torso, then trace gentle yes-nods through pain-free range.',
        concentric: 'Return smoothly through tall neutral alignment and repeat symmetrically to the opposite side.',
        breathing: 'Calm, slow nasal breathing throughout each controlled cervical sweep.',
        commonMistakes: [
          'Crunching the back of the neck by forcing aggressive extension',
          'Letting shoulders shrug or ribcage twist along with the head',
          'Moving too fast through tight end-ranges'
        ],
        proTip: 'Keep the movement slow and silent—imagine drawing a level horizon line with the tip of your nose.'
      }
    },

  {
      id: 'wu-standing-cervical-chin-glides',
      name: 'Standing Cervical Chin Glides (Retractions)',
      scientificName: 'Standing Horizontal Cervical Retraction (Upper-Cervical Flexion / Lower-Cervical Extension)',
      subtitle: 'Postural deep neck flexor activation correcting forward-head drift',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'trapezius',
      defaultSets: 2,
      defaultReps: '10-12',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Deep Cervical Flexors (Longus Colli & Capitis)'],
        secondary: ['Suboccipitals (Decompressed)', 'Lower Cervical Extensors'],
        stabilizers: ['Thoracic Erectors', 'Lower Trapezius']
      },
      execution: {
        setup: 'Stand upright with chest open, jaw relaxed, and eyes fixed straight ahead on a horizontal point.',
        eccentric: 'Allow the chin to glide gently forward only a few centimeters while keeping the head level.',
        concentric: 'Draw the chin straight backward horizontally as if making a gentle double chin while lengthening the crown of the head upward; pause 2 seconds.',
        breathing: 'Exhale smoothly during each horizontal retraction hold; inhale on the soft release.',
        commonMistakes: [
          'Tipping the head up or down instead of sliding straight horizontally',
          'Clenching the jaw or shrugging the shoulders',
          'Forcing aggressive neck tension rather than gentle axial elongation'
        ],
        proTip: 'Place two fingers lightly on your chin as a spatial cue so you feel the head glide straight backward away from your fingertips.'
      }
    },

  {
      id: 'wu-upper-arm-circles',
      name: 'Standing Upper-Arm Glenohumeral Circles',
      scientificName: 'Standing Open-Chain Glenohumeral Circumduction (Shoulder CARs)',
      subtitle: 'Full-circumference shoulder capsule lubrication and scapular rhythm priming',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'shoulders',
      defaultSets: 2,
      defaultReps: '6-8/dir',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Rotator Cuff Complex', 'Deltoids (Anterior, Lateral, Posterior)'],
        secondary: ['Serratus Anterior', 'Trapezius (Upper, Middle, Lower)'],
        stabilizers: ['Anterior Core (Anti-Flare Brace)', 'Glutes']
      },
      execution: {
        setup: 'Stand tall with feet hip-width apart, ribs stacked cleanly over pelvis, and arms extended long with straight elbows.',
        eccentric: 'Trace the largest smooth pain-free circle possible overhead and behind you, rotating the humerus smoothly as you pass top end-range.',
        concentric: 'Complete full forward and backward revolutions without letting your ribcage flare or torso twist.',
        breathing: 'Steady rhythmic breathing maintaining gentle abdominal tension.',
        commonMistakes: [
          'Arching the lower back to fake extra overhead shoulder flexion',
          'Swinging arms loosely with momentum instead of controlled capsular tension',
          'Bending the elbows to bypass tight arcs'
        ],
        proTip: 'Imagine moving your arms slowly through thick honey—30% muscular irradiation wakes up the rotator cuff far better than fast swings.'
      }
    },

  {
      id: 'wu-kneeling-hip-flexor-quad-stretch',
      name: 'Half-Kneeling Hip Flexor & Quad Stretch',
      scientificName: 'Half-Kneeling Biarticular Iliopsoas & Rectus Femoris Extension Stretch With Posterior Pelvic Tilt',
      subtitle: 'Deep anterior hip capsule & quad opener countering prolonged sitting',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'quads',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Iliopsoas', 'Rectus Femoris (Lengthened)'],
        secondary: ['Tensor Fasciae Latae', 'Sartorius'],
        stabilizers: ['Trailing Gluteus Maximus', 'Anterior Core']
      },
      execution: {
        setup: 'Adopt a tall half-kneeling 90/90 lunge on a mat with your back knee cushioned and torso upright.',
        eccentric: 'Squeeze your rear glute firmly to tuck your tailbone underneath (posterior pelvic tilt), then glide the hips only a few centimeters forward until a deep front-hip stretch emerges.',
        concentric: 'Optionally elevate the rear foot gently to deepen the rectus femoris bias while keeping ribs stacked directly over hips.',
        breathing: 'Long 4-second exhales while keeping the rear glute lightly engaged (reciprocal inhibition).',
        commonMistakes: [
          'Lunging excessively far forward while overarching the lower back',
          'Leaving the rear glute completely passive so the pelvis dumps anteriorly',
          'Leaning torso forward onto the front knee'
        ],
        proTip: 'A crisp posterior pelvic tilt doubles the hip-flexor stretch at half the forward lunge distance while keeping your lumbar spine 100% protected.'
      }
    },

  {
      id: 'wu-quadruped-frog-hip-compression',
      name: 'Quadruped Frog Hip Compression & Adductor Rock',
      scientificName: 'Quadruped Wide-Abducted Bilateral Hip Flexion & Adductor End-Range Mobilization',
      subtitle: 'Deep groin, inner-thigh & hip-socket mobility rock for cleaner squat depth',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 2,
      defaultReps: '30-45s',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hip Adductors (Magnus, Longus, Brevis, Gracilis)', 'Inferior Hip Capsule'],
        secondary: ['Deep Hip External Rotators', 'Pelvic Floor'],
        stabilizers: ['Serratus Anterior (Forearm Support)', 'Lumbar Neutral Core']
      },
      execution: {
        setup: 'Rest on forearms and knees on a soft mat, widening your knees comfortably apart with shins parallel and inner edges of feet grounded.',
        eccentric: 'Maintaining a flat neutral lower back, slowly rock your hips backward toward your heels until you meet a steady adductor stretch.',
        concentric: 'Pause 2–3 seconds in the back end-range, then glide gently forward to reset tension before the next slow rock.',
        breathing: 'Slow exhales as hips glide back to quiet adductor stretch reflexes.',
        commonMistakes: [
          'Rounding the lower back heavily as hips shift backward',
          'Forcing knees painfully wide before the hip joints warm up',
          'Bouncing aggressively into the groin stretch'
        ],
        proTip: 'Press your inner knees lightly into the mat for 4 seconds at the back position, then relax on an exhale to immediately gain comfortable hip depth.'
      }
    },

  {
      id: 'wu-quadruped-thoracic-tailbone-tilt',
      name: 'Quadruped Thoracic & Tailbone Articulation',
      scientificName: 'Quadruped Segmental Lumbo-Pelvic & Thoracic Flexion-Extension Mobilization',
      subtitle: 'Controlled vertebral segmentation isolating pelvic tilt and mid-back motion',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'back',
      defaultSets: 2,
      defaultReps: '8-10',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Thoracic & Lumbar Erector Spinae', 'Transverse Abdominis'],
        secondary: ['Serratus Anterior', 'Rhomboids', 'Pelvic Rotators'],
        stabilizers: ['Scapular Stabilizers', 'Hip Flexors & Glutes']
      },
      execution: {
        setup: 'Start in a crisp four-point quadruped stance with wrists stacked directly beneath shoulders and knees directly beneath hips.',
        eccentric: 'Initiate strictly from the tailbone, tipping the pelvis anteriorly and letting a smooth wave of extension ripple upward vertebra by vertebra into the upper back.',
        concentric: 'Reverse from the tailbone first, tucking the pelvis underneath and flexing segmentally upward while pushing the floor gently away.',
        breathing: 'Inhale smoothly into extension; exhale steadily through segmental flexion.',
        commonMistakes: [
          'Hinging exclusively in the lower back while the thoracic spine stays rigid',
          'Bending the elbows or shifting hips back and forth',
          'Whipping the neck up instead of letting gaze follow the chest'
        ],
        proTip: 'Slow down by 50% through your mid-back—the stiffest vertebrae benefit most from deliberate millimeter-by-millimeter focus.'
      }
    },

  {
      id: 'wu-seated-straddle-external-rotation',
      name: 'Seated Straddle External-Rotation Hip Openers',
      scientificName: 'Seated Wide-Straddle Active Femoral External Rotation & Adductor End-Range Control',
      subtitle: 'Active hip-socket rotation strengthening end-range straddle posture',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Intermediate',
      muscleKey: 'glutes',
      defaultSets: 2,
      defaultReps: '8-10/side',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Deep Hip External Rotators', 'Gluteus Medius & Maximus'],
        secondary: ['Hip Adductors (Active Lengthening)', 'Quadriceps'],
        stabilizers: ['Lumbar Erectors', 'Anterior Core']
      },
      execution: {
        setup: 'Sit tall on a mat in a comfortable wide straddle with legs straight, hands lightly supporting behind or beside your hips to keep your pelvis upright.',
        eccentric: 'Allow one thigh to roll gently inward with control without slumping your lower back.',
        concentric: 'Actively rotate the femur outward from deep inside the hip socket, pointing toes and kneecap up and slightly back; pause 2 seconds.',
        breathing: 'Exhale while squeezing into active external rotation; inhale on the controlled return.',
        commonMistakes: [
          'Rolling only the ankle instead of rotating the entire femur inside the hip socket',
          'Slumping backward onto the tailbone instead of sitting tall on the sit-bones',
          'Forcing a painfully wide straddle that locks the pelvis'
        ],
        proTip: 'Sit on a folded towel or yoga block if your lower back rounds—an upright pelvis immediately unlocks cleaner femoral rotation.'
      }
    },

  {
      id: 'wu-seated-straddle-pancake-press',
      name: 'Seated Straddle Pancake Knee Press',
      scientificName: 'Seated Wide-Straddle Anterior Pelvic Hinge & Active Quad-Engaged Pancake Compression',
      subtitle: 'Gymnastics pancake mobility drill lengthening hamstrings & adductors cleanly',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Intermediate',
      muscleKey: 'hamstrings',
      defaultSets: 2,
      defaultReps: '30-45s',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hamstrings', 'Hip Adductors (Gracilis & Adductor Magnus)'],
        secondary: ['Quadriceps (Active Knee-Lock Extension)', 'Hip Flexors'],
        stabilizers: ['Thoracic & Lumbar Erectors']
      },
      execution: {
        setup: 'Sit tall in a wide straddle with kneecaps and toes pointing vertically toward the ceiling and hands resting lightly on thighs or floor.',
        eccentric: 'Engage your quads to gently press the backs of your knees flat toward the floor, then hinge forward from the hip crease with a long proud spine.',
        concentric: 'Hold the active forward hinge for steady breaths before pressing smoothly back to upright posture.',
        breathing: 'Inhale to lengthen the spine tall; exhale to hinge a few millimeters deeper from the hips.',
        commonMistakes: [
          'Rounding the upper back aggressively to reach the head down while the pelvis stays tilted backward',
          'Letting knees roll inward and bend',
          'Holding breath under stretch tension'
        ],
        proTip: 'Think "belly button toward the floor between your thighs," not "forehead to the floor"—true pancake mobility comes from anterior pelvic tilt.'
      }
    },

  {
      id: 'wu-single-leg-bench-hamstring-stretch',
      name: 'Bench-Elevated Single-Leg Hamstring Stretch',
      scientificName: 'Standing Unilateral Elevated-Heel Anterior-Pelvic-Tilt Hamstring Lengthening',
      subtitle: 'Neutral-spine posterior-chain opener isolating hamstring length safely',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Flat Bench',
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'hamstrings',
      defaultSets: 2,
      defaultReps: '30-45s/side',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hamstrings (Biceps Femoris, Semitendinosus, Semimembranosus)'],
        secondary: ['Gastrocnemius & Posterior Capsule', 'Gluteus Maximus'],
        stabilizers: ['Stance Quadriceps', 'Lumbar Erectors']
      },
      execution: {
        setup: 'Stand tall facing a flat bench and place one heel comfortably on top of the bench with hips squared forward and a soft micro-unlock in the knee if needed.',
        eccentric: 'Keeping your chest tall and spine completely neutral, tip your pelvis slightly forward until a clean stretch appears in the mid-belly of the hamstring.',
        concentric: 'Optionally press your elevated heel gently downward into the bench for 5 seconds (isometric contract-relax) before exhaling into deeper ease.',
        breathing: 'Calm, rhythmic nasal breaths relaxing posterior-chain guarding.',
        commonMistakes: [
          'Rounding the lower back aggressively to touch the toes',
          'Opening the elevated hip sideways instead of keeping both hip bones squared',
          'Choosing a bench height so tall that the standing knee buckles'
        ],
        proTip: 'Gentle ankle dorsiflexion (pulling toes back slightly) biases the calf and sciatic tension; neutral toes isolate pure hamstring length.'
      }
    },

  {
      id: 'wu-single-leg-pendulum-swing',
      name: 'Standing Single-Leg Pendulum Swing',
      scientificName: 'Standing Dynamic Open-Chain Sagittal Hip Flexion-Extension Pendulum Mobilization',
      subtitle: 'Dynamic rhythmic hip-capsule warm-up priming hamstrings, hip flexors & stance balance',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'hamstrings',
      defaultSets: 2,
      defaultReps: '10-12/side',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hip Flexors', 'Hamstrings (Dynamic Reciprocal Stretch)', 'Gluteus Maximus'],
        secondary: ['Stance Gluteus Medius', 'Intrinsic Foot Stabilizers'],
        stabilizers: ['Lumbo-Pelvic Core', 'Torso Anti-Rotation Stabilizers']
      },
      execution: {
        setup: 'Stand tall on one grounded foot with light fingertip support against a wall or rack if needed, bracing your torso upright.',
        eccentric: 'Swing the free leg smoothly forward into controlled hip flexion without letting your lower back round.',
        concentric: 'Let gravity carry the leg cleanly backward through upright posture into glute-driven hip extension without overarching your lumbar spine.',
        breathing: 'Smooth, unforced breathing matched to the relaxed pendulum rhythm.',
        commonMistakes: [
          'Kicking violently high and collapsing the spine forward to reach toe height',
          'Twisting the pelvis wildly on the backswing',
          'Letting the stance knee collapse inward'
        ],
        proTip: 'Start with small easy arcs for the first 4 swings and gradually expand amplitude only as far as your pelvis stays completely quiet.'
      }
    },

  {
      id: 'wu-standing-pelvic-bucket-circles',
      name: 'Standing Pelvic Bucket Circles',
      scientificName: 'Standing Closed-Chain 360° Lumbo-Pelvic & Hip-Socket Circumduction Mobilization',
      subtitle: 'Smooth 360° pelvic control warming lower back, SI joints & hip capsules',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'glutes',
      defaultSets: 2,
      defaultReps: '8-10/dir',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Lumbo-Pelvic Stabilizers', 'Hip Capsule Rotators'],
        secondary: ['Obliques', 'Gluteus Medius', 'Quadratus Lumborum'],
        stabilizers: ['Transverse Abdominis', 'Foot Tripod Stabilizers']
      },
      execution: {
        setup: 'Stand with feet slightly wider than hip width, knees softly unlocked, and hands resting comfortably on your iliac crests (pelvic rim).',
        eccentric: 'Trace a smooth, continuous circular path with your pelvis—anterior tilt, right lateral glide, posterior tuck, and left lateral glide.',
        concentric: 'Keep shoulders and head relatively calm above your center of mass while completing slow circles in both directions.',
        breathing: 'Relaxed continuous diaphragmatic breathing throughout both directions.',
        commonMistakes: [
          'Locking knees rigid and whipping the upper torso around instead of moving the pelvis',
          'Rushing past stiff corners of the circle rather than smoothing them out',
          'Holding tension in the jaw or lower back'
        ],
        proTip: 'Picture your pelvis as a wide bucket of water—tilt it smoothly around the entire 360° rim without skipping the posterior tuck.'
      }
    },

  {
      id: 'wu-standing-overhead-hip-hinge',
      name: 'Standing Overhead-Arm Hip Hinge',
      scientificName: 'Long-Lever Bilateral Overhead-Arm Bodyweight Hip Hinge & Thoracic Extension Drill',
      subtitle: 'Bodyweight hinge pattern teaching flat-back mechanics & overhead thoracic control',
      pattern: MOVEMENT_PATTERNS.HIP_HINGE,
      equipment: 'Bodyweight',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'hamstrings',
      defaultSets: 2,
      defaultReps: '8-10',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Hamstrings', 'Thoracic Erector Spinae', 'Gluteus Maximus'],
        secondary: ['Lower Trapezius', 'Serratus Anterior', 'Lumbar Erectors'],
        stabilizers: ['Anterior Core (Rib-Down Brace)', 'Posterior Deltoids']
      },
      execution: {
        setup: 'Stand hip-width apart with knees softly unlocked and extend both arms straight overhead in line with your ears, palms facing inward.',
        eccentric: 'Push your hips smoothly straight backward while keeping your arms aligned tightly beside your ears and your spine arrow-straight until torso approaches horizontal.',
        concentric: 'Drive through midfoot and squeeze glutes cleanly to stand tall without dropping your arms below your ear line.',
        breathing: 'Inhale and brace ribs before hinging; exhale as you return upright.',
        commonMistakes: [
          'Letting arms droop downward as torso folds forward',
          'Turning the hinge into a knee-forward squat',
          'Overarching the lower back to compensate for tight shoulders'
        ],
        proTip: 'Extending the arms overhead triples the postural demand on your thoracic erectors—a brilliant zero-equipment primer before deadlifts or squats.'
      }
    },

  {
      id: 'wu-prone-pelvic-tilt',
      name: 'Prone Pelvic Tilt & Lumbar Decompression',
      scientificName: 'Prone Unloaded Posterior-to-Anterior Pelvic Tilt & Deep Core Motor Control',
      subtitle: 'Floor-grounded pelvic awareness drill decompressing lumbar tension',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'abdomen',
      defaultSets: 2,
      defaultReps: '10-12',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Transverse Abdominis', 'Gluteus Maximus (Gentle Posterior Tilt)'],
        secondary: ['Multifidus', 'Pelvic Floor'],
        stabilizers: ['Hamstrings (Relaxed Control)', 'Diaphragm']
      },
      execution: {
        setup: 'Lie face down on a mat with legs extended comfortably behind you and forehead resting relaxed on stacked hands.',
        eccentric: 'Relax your hips softly into the floor allowing natural gentle lumbar curve.',
        concentric: 'Exhale and gently press your pubic bone into the mat while lightly drawing your lower belly inward and engaging glutes to flatten the lower back; hold 3 seconds.',
        breathing: 'Exhale calmly into each gentle posterior pelvic tilt; inhale to soften.',
        commonMistakes: [
          'Lifting the hips high off the floor instead of subtle pure pelvic rotation',
          'Straining the neck or clenching the shoulders',
          'Holding breath during the tilt'
        ],
        proTip: 'This subtle drill teaches you exactly how to keep your lower back protected during Superman holds, prone cobras, and overhead presses.'
      }
    },

  {
      id: 'wu-prone-upper-thoracic-extension',
      name: 'Prone Sphinx Upper-Thoracic Extension',
      scientificName: 'Prone Forearm-Supported Gentle Thoracic Extension & Anterior Chest Elongation',
      subtitle: 'Supportive sphinx posture restoring gentle spinal extension after desk work',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Beginner',
      muscleKey: 'back',
      defaultSets: 2,
      defaultReps: '30-45s',
      defaultRestSeconds: 20,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Thoracic Erector Spinae', 'Anterior Longitudinal Chain (Decompressed)'],
        secondary: ['Lower Trapezius', 'Serratus Anterior'],
        stabilizers: ['Gluteus Maximus (Light Pelvic Anchor)', 'Deep Cervical Flexors']
      },
      execution: {
        setup: 'Lie prone on a mat and prop yourself comfortably onto your forearms with elbows directly beneath shoulders and palms flat.',
        eccentric: 'Keep shoulders depressed away from your ears and gently pull the floor backward with your forearms to glide your sternum forward and up.',
        concentric: 'Maintain calm breathing with a long neck and relaxed glutes/pelvis grounded smoothly onto the mat.',
        breathing: 'Slow, deep diaphragmatic breaths feeling the ribs expand evenly.',
        commonMistakes: [
          'Collapsing shoulders up toward the ears',
          'Cranking the chin high upward and compressing the cervical spine',
          'Forcing painful compression in the lower back'
        ],
        proTip: 'Gently "pull the mat toward your hips" with your forearms without moving them—this instantly shifts extension up into the stiff thoracic spine.'
      }
    },

  {
      id: 'wu-prone-core-resisted-thoracic-lift',
      name: 'Prone Core-Resisted Upper-Thoracic Hover',
      scientificName: 'Prone Posterior-Pelvic-Tilt Isolated Upper-Thoracic Extension Hover',
      subtitle: 'Strict mid-back postural lift isolating thoracic erectors with zero lumbar dump',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Isometric',
      level: 'Intermediate',
      muscleKey: 'back',
      defaultSets: 2,
      defaultReps: '8-10 (3s hold)',
      defaultRestSeconds: 30,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Thoracic Erector Spinae', 'Middle & Lower Trapezius'],
        secondary: ['Rhomboids', 'Deep Cervical Flexors'],
        stabilizers: ['Transverse Abdominis (Rib-Pelvis Lock)', 'Gluteus Maximus']
      },
      execution: {
        setup: 'Lie prone on a mat with forearms bent beside your chest, pubic bone anchored gently via a slight posterior pelvic tilt, and chin tucked smoothly.',
        eccentric: 'Lower your sternum slowly back toward the mat while keeping the lower ribs lightly braced.',
        concentric: 'Without pushing heavily through your hands, lift strictly your upper chest and head a few centimeters off the floor using mid-back muscles; hold 3 seconds.',
        breathing: 'Exhale lightly during the upper-thoracic hover; inhale as you lower.',
        commonMistakes: [
          'Pushing up high with the arms instead of using thoracic extensors',
          'Compressing the lower back by letting the belly sag into the mat',
          'Looking forward and hyperextending the neck'
        ],
        proTip: 'Keep your lower ribs touching the mat throughout—the movement is intentionally small because pure thoracic extension happens strictly between the shoulder blades.'
      }
    },

  {
      id: 'wu-shoulder-stand-hip-bend',
      name: 'Shoulder Stand Hip-Bend Articulation',
      scientificName: 'Inverted Scapular-Supported Posterior-Chain & Hip-Flexion Decompression Pose',
      subtitle: 'Inverted gymnastics decompression articulating hip hinge and spinal flexion',
      pattern: MOVEMENT_PATTERNS.WARMUP_MOBILITY,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
      isWarmup: true,
      mechanics: 'Mobility',
      level: 'Advanced',
      muscleKey: 'back',
      defaultSets: 2,
      defaultReps: '20-30s',
      defaultRestSeconds: 45,
      rpe: '',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Thoracic & Lumbar Erectors (Lengthened)', 'Hamstrings'],
        secondary: ['Anterior Core (Inverted Control)', 'Hip Flexors'],
        stabilizers: ['Upper Back & Shoulders (Weight-Bearing Shelf)', 'Triceps']
      },
      execution: {
        setup: 'Lie supine on a padded mat with arms pressed firmly beside your torso. Roll smoothly onto your upper shoulder shelf—never onto your neck—and support your hips if needed.',
        eccentric: 'Keeping weight strictly across your upper shoulder blades and gaze fixed straight up, fold gently at the hips to lower straight legs smoothly overhead.',
        concentric: 'Hold calmly within pain-free range, then slowly roll down one vertebra at a time using deep abdominal control.',
        breathing: 'Calm, quiet nasal breaths without straining the throat or neck.',
        commonMistakes: [
          'Turning the head sideways while inverted (never rotate the neck under load)',
          'Placing weight directly onto the cervical vertebrae instead of the upper shoulders',
          'Dropping rapidly out of the roll without spinal control'
        ],
        proTip: 'Skip this movement if you have cervical sensitivity; when cleared, keep a thin folded blanket under the upper shoulders so your neck remains completely uncompressed.'
      }
    }
];
