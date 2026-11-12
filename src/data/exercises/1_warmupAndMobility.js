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
      rpe: '5 - 6',
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
      rpe: '5 - 6',
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
      rpe: '5 - 6',
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
    }
];
