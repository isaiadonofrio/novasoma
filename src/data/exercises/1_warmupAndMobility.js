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
    }
];
