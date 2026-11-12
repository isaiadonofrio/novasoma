/**
 * PULLUPPERBODY
 * Modular Exercise Sub-Database
 */

import { MOVEMENT_PATTERNS } from '../exerciseConstants.js';

export const PULLUPPERBODY_EXERCISES = [
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
    }
];
