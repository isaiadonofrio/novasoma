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
    },

  {
      id: 'ex-chin-up',
      name: 'Supinated Chin-Up',
      scientificName: 'Suspended Supinated Closed-Chain Vertical Pull — Sagittal Shoulder Extension & Peak Biceps Torque',
      subtitle: 'Underhand shoulder-width vertical pull maximizing lats and biceps brachii recruitment',
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
        primary: ['Latissimus Dorsi', 'Biceps Brachii (Long & Short Heads)'],
        secondary: ['Lower & Middle Trapezius', 'Rhomboids', 'Brachialis'],
        stabilizers: ['Rectus Abdominis (Hollow Brace)', 'Forearm Flexors', 'Posterior Deltoid']
      },
      execution: {
        setup: 'Grasp an overhead bar with palms facing toward you (supinated) at shoulder width. Step into an active hollow hang with ribs stacked down, glutes lightly engaged, and ankles aligned underneath.',
        eccentric: 'Lower smoothly over 3 seconds maintaining active shoulder blade control until elbows reach complete dead-hang straightness and lats open overhead.',
        concentric: 'Initiate by depressing the shoulder blades down and drawing elbows tightly forward and down beside your ribs until the sternum/clavicle clears bar height.',
        breathing: 'Inhale bracing trunk in full bottom hang; exhale firmly driving chest to bar.',
        commonMistakes: [
          'Flexing forward with rounded shoulders at top lockout to push chin forward over bar',
          'Using kipping leg swing instead of strict vertical pull',
          'Cutting bottom elbow extension short'
        ],
        proTip: 'Supination aligns elbows cleanly into the sagittal shoulder-extension path of the lower latissimus fibers while bringing biceps brachii into peak mechanical advantage.'
      }
    },

  {
      id: 'ex-neutral-grip-pull-up',
      name: 'Neutral-Grip Pull-Up',
      scientificName: 'Suspended Neutral-Wrist Vertical Pull — Shoulder-Friendly Scapular Plane & Brachioradialis Bias',
      subtitle: 'Parallel palms-facing vertical pull protecting shoulder joints while hammering lats & arms',
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
        primary: ['Latissimus Dorsi', 'Teres Major', 'Brachioradialis'],
        secondary: ['Brachialis', 'Biceps Brachii', 'Middle & Lower Trapezius'],
        stabilizers: ['Core Bracing Muscles', 'Forearm Flexors', 'Infraspinatus']
      },
      execution: {
        setup: 'Hold parallel neutral handles at shoulder width with palms facing inward toward each other. Set a rigid hollow hang with shoulders depressed away from your ears.',
        eccentric: 'Descend with strict 3-second control down to straight arms while letting shoulder blades glide smoothly upward at the bottom.',
        concentric: 'Initiate with downward scapular depression and drive elbows down toward hips until chest rises evenly between the parallel handles.',
        breathing: 'Inhale deeply into the brace at bottom hang; exhale drawing sternal notch up to handle line.',
        commonMistakes: [
          'Rolling shoulders forward at top pull position',
          'Pumping rapid half-reps without bottom full-stretch reset',
          'Crossing legs and arching lower back backward'
        ],
        proTip: 'Neutral parallel grips center the humeral head optimally in the glenoid fossa (~30° scapular plane), making this the safest vertical pull variation for irritated shoulders.'
      }
    },

  {
      id: 'ex-barbell-pendlay-row',
      name: 'Barbell Pendlay Row (Dead-Stop)',
      scientificName: 'Horizontal-Torso Dead-Stop Floor Barbell Pull — Explosive Concentric Mid-Back & Erector Power',
      subtitle: 'Strict floor dead-stop horizontal barbell row for explosive upper-back thickness',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PULL,
      equipment: 'Barbell',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'back',
      defaultSets: 4,
      defaultReps: '6-8',
      defaultRestSeconds: 120,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Middle Trapezius', 'Rhomboids (Major & Minor)', 'Latissimus Dorsi'],
        secondary: ['Posterior Deltoid', 'Brachialis & Biceps Brachii'],
        stabilizers: ['Erector Spinae (Isometric Horizontal Brace)', 'Hamstrings', 'Core']
      },
      execution: {
        setup: 'Load bumper/standard 45 cm plates so the barbell rests at shin height on the floor. Hinge torso parallel (0–15° above horizontal) with neutral flat back, hips pushed back, and bar over midfoot.',
        eccentric: 'Lower the barbell crisply back down until plates come to a complete motionless rest (dead-stop) on the floor between every single repetition.',
        concentric: 'Keep torso frozen parallel and pull explosively upward by driving elbows backward until the bar touches sharply against the lower sternum/upper abdomen.',
        breathing: 'Reset abdominal breath and core brace cleanly while the plates rest momentarily on the floor before pulling each rep.',
        commonMistakes: [
          'Standing torso upright (30–45°) halfway through each explosive concentric pull',
          'Bouncing weights quickly off the floor without full dead-stop pause',
          'Rounding thoracic/lumbar spine when fatigue rises'
        ],
        proTip: 'Resting the bar dead on the floor eliminates stretch-reflex bounce and unloads prolonged lumbar fatigue—every rep is a fresh explosive concentric pull.'
      }
    },

  {
      id: 'ex-underhand-barbell-row',
      name: 'Supinated (Underhand) Barbell Row',
      scientificName: '70° Upright Supinated Barbell Row — Lower Latissimus Attachment & Biceps Alignment (Yates)',
      subtitle: 'Underhand Yates-style barbell row driving tight sagittal sweep into lower lats',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PULL,
      equipment: 'Barbell',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'back',
      defaultSets: 4,
      defaultReps: '8-10',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Latissimus Dorsi (Lower & Mid Fibers)', 'Teres Major'],
        secondary: ['Biceps Brachii', 'Rhomboids', 'Middle Trapezius'],
        stabilizers: ['Spinal Erectors', 'Brachioradialis', 'Core']
      },
      execution: {
        setup: 'Grasp barbell with a shoulder-width underhand (supinated) grip. Unlock knees softly and hinge torso slightly upright (~45–60° from floor) with elbows tucked tight beside sides.',
        eccentric: 'Lower the barbell strictly under 2–3 second control along the upper thighs down to full scapular stretch without letting torso angle drift.',
        concentric: 'Drive elbows tightly backward along your hips to pull the bar directly into your lower navel/hip crease and squeeze shoulder blades tightly back.',
        breathing: 'Exhale powerfully into belly-button bar touch; inhale controlling the lowering stretch.',
        commonMistakes: [
          'Jerking upright to 80° and shrugging bar toward chest using biceps only',
          'Flaring elbows wide sideways—underhand position forces tucked elbows',
          'Rounding forward at bottom stretch'
        ],
        proTip: 'Aim the bar cleanly into the hip crease rather than the sternum; pulling back along an arc aligns the supinated humerus perfectly with the lower latissimus fibers.'
      }
    },

  {
      id: 'ex-single-arm-kettlebell-row',
      name: 'Single-Arm Bench-Supported Kettlebell Row',
      scientificName: '3-Point Bench-Supported Unilateral Kettlebell Row — Zero Axial Spine Shear & Full Scapular ROM',
      subtitle: 'Stable 3-point unilateral kettlebell row maximizing lat protraction-to-retraction sweep',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PULL,
      equipment: 'Kettlebell + Flat Bench',
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
        secondary: ['Posterior Deltoid', 'Brachialis', 'Biceps Brachii'],
        stabilizers: ['Obliques (Anti-Rotation)', 'Serratus Anterior (Bench Support)', 'Forearm Grip']
      },
      execution: {
        setup: 'Place non-working hand and knee firmly atop a flat bench (3-point stance) with opposite working foot planted solidly behind/beside bench and flat horizontal spine. Reach down vertically for a kettlebell.',
        eccentric: 'Lower kettlebell smoothly over 2–3 seconds allowing the working shoulder blade to glide slightly forward into a controlled stretch without rotating torso.',
        concentric: 'Retract shoulder blade first, then drive elbow backward along a smooth curved arc toward your hip pocket until wrist nears lower ribcage.',
        breathing: 'Exhale firmly pulling kettlebell toward hip pocket; inhale into deep bottom stretch.',
        commonMistakes: [
          'Rotating torso sideways like starting a lawnmower to heave heavy weight up',
          'Pulling vertically straight up toward armpit (upper-trap dominance) instead of back to hip',
          'Allowing lower spine to sag into hyperextension'
        ],
        proTip: 'Sweep the handle diagonally backward rather than straight upward—imagine elbowing someone standing right behind your ipsilateral hip.'
      }
    },

  {
      id: 'ex-kettlebell-gorilla-row',
      name: 'Alternating Kettlebell Gorilla Row',
      scientificName: 'Wide Sumo-Stance Floor-Anchored Alternating Kettlebell Row — Anti-Rotation Isometric Hinge',
      subtitle: 'Grounded sumo-hinge alternating kettlebell row training explosive lats and spinal stiffness',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PULL,
      equipment: 'Kettlebells',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'back',
      defaultSets: 3,
      defaultReps: '8-10/side',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
        secondary: ['Erector Spinae', 'Gluteus Maximus & Hamstrings (Isometric Hinge)'],
        stabilizers: ['Obliques (Anti-Rotation)', 'Forearm Flexors']
      },
      execution: {
        setup: 'Take a wide sumo stance over a pair of kettlebells resting squarely between your heels. Push hips strongly back with flat spine and grasp both handles vertically beneath chest.',
        eccentric: 'Return the pulled kettlebell purposefully back down until the base settles completely flat on the floor before pulling the contralateral side.',
        concentric: 'Press the non-working arm straight downward through its floor-resting kettlebell to anchor your ribcage, while explosively rowing the working bell elbow back toward hip pocket.',
        breathing: 'Maintain steady core brace throughout alternating pulls, exhaling crisply on each row.',
        commonMistakes: [
          'Twisting chest asymmetrically open as each kettlebell clears the floor',
          'Losing hamstring/hip-hinge tension and rounding lower spine',
          'Dropping the down bell carelessly between switches'
        ],
        proTip: 'Actively push the floor-resting kettlebell down into the ground while rowing the other bell up—reciprocal pressing tension supercharges anti-rotation core stability.'
      }
    },

  {
      id: 'ex-barbell-upright-row',
      name: 'Wide-Grip Barbell Upright Row',
      scientificName: 'Standing Wide-Grip Compound Shoulder Abduction & Elbow Flexion — Deltoid/Upper-Trap Synergy',
      subtitle: 'Shoulder-width+ upright row biasing medial deltoids with reduced internal shoulder torque',
      pattern: MOVEMENT_PATTERNS.SHOULDER_ABDUCTION,
      equipment: 'Barbell',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'shoulders',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Lateral Deltoid (Acromial Fibers)', 'Upper Trapezius'],
        secondary: ['Anterior Deltoid', 'Brachialis', 'Biceps Brachii'],
        stabilizers: ['Spinal Erectors', 'Forearm Extensors', 'Core']
      },
      execution: {
        setup: 'Stand upright grasping a barbell slightly wider than shoulder width (avoid narrow inside-hip grips) with arms resting in front of upper thighs and shoulder blades depressed neutrally.',
        eccentric: 'Lower the barbell steadily over 2–3 seconds straight back down along the front torso without slumping the shoulders forward.',
        concentric: 'Lead upward purely with both elbows (not wrists) driving out to the sides until upper arms reach horizontal height (~chest level) with wrists neutral.',
        breathing: 'Exhale while pulling elbows outward and upward; inhale controlling descent.',
        commonMistakes: [
          'Using a narrow close-hands grip and forcing elbows high above ears (subacromial impingement)',
          'Curving wrists sharply above elbow height',
          'Using hip swing momentum to jerk weight past waist'
        ],
        proTip: 'Always widen hands outside shoulder width and halt ascent when upper arms reach horizontal—biomechanical analyses show this preserves high lateral-delt EMG while sparing rotator tendons.'
      }
    },

  {
      id: 'ex-kettlebell-shrug',
      name: 'Standing Kettlebell Shrug',
      scientificName: 'Standing Bilateral Vertical Scapular Elevation — Upper Trapezius & Levator Scapulae Line of Pull',
      subtitle: 'Dual-kettlebell vertical trap isolation building upper-back shelf & neck resilience',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PULL,
      equipment: 'Kettlebells',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'trapezius',
      defaultSets: 3,
      defaultReps: '12-15',
      defaultRestSeconds: 60,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Upper Trapezius (Descending Fibers)', 'Levator Scapulae'],
        secondary: ['Middle Trapezius', 'Forearm Flexors (Grip)'],
        stabilizers: ['Spinal Erectors', 'Deep Neck Flexors', 'Core']
      },
      execution: {
        setup: 'Stand tall holding two heavy kettlebells comfortably along outer thighs with elbows completely straight, chin tucked neutral, and ribcage stacked over hips.',
        eccentric: 'Lower weights slowly over 2–3 seconds letting shoulder blades open smoothly down into maximal upper-trap length.',
        concentric: 'Elevate shoulder girdles straight upward and slightly inward toward the ear line ("shrug up toward the base of skull"), holding peak squeeze for 1–2 full seconds.',
        breathing: 'Inhale deeply into braced torso at bottom stretch; exhale holding peak trap elevation.',
        commonMistakes: [
          'Rolling shoulders in sluggish circular loops that add joint grind without extra load vector',
          'Bending elbows to bounce weights upward',
          'Poking chin forward into neck protraction'
        ],
        proTip: 'Lift purely along the vertical gravity vector without rolling shoulders forward or backward—clean peak pauses outperform heavy bouncing shrugs.'
      }
    },

  {
      id: 'ex-barbell-bicep-curl',
      name: 'Standing Barbell Bicep Curl',
      scientificName: 'Standing Bilateral Fixed-Supinated Barbell Elbow Flexion — Heavy Progressive Overload Profile',
      subtitle: 'Classic bilateral supinated barbell curl for maximum biceps brachii loading',
      pattern: MOVEMENT_PATTERNS.ELBOW_FLEXION,
      equipment: 'Barbell',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'biceps',
      defaultSets: 3,
      defaultReps: '8-12',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Biceps Brachii (Long & Short Heads)'],
        secondary: ['Brachialis', 'Brachioradialis'],
        stabilizers: ['Wrist Flexors', 'Anterior Deltoid', 'Transverse Abdominis & Glutes']
      },
      execution: {
        setup: 'Stand tall with feet hip-width, glutes lightly squeezed, and grasp a barbell shoulder-width with a supinated (palms-up) grip hanging cleanly in front of thighs.',
        eccentric: 'Lower the barbell over 2–3 seconds to full near-straight elbow extension without letting torso hunch forward.',
        concentric: 'Pin elbows gently beside lower ribs and curl cleanly in an arc up to upper-chest height without kicking hips or arching lower back.',
        breathing: 'Exhale while curling upward; inhale under eccentric control.',
        commonMistakes: [
          'Leaning torso back into lumbar hyperextension to momentum-heave weights',
          'Pulling elbows backward halfway through so bar drops onto anterior deltoids at the top',
          'Stopping descent 20° short of straight arms'
        ],
        proTip: 'Squeeze your glutes gently before curling—that locks the pelvis down and strips out unconscious lower-back body English.'
      }
    },

  {
      id: 'ex-kettlebell-bicep-curl',
      name: 'Standing Kettlebell Bicep Curl',
      scientificName: 'Standing Offset Kettlebell Elbow Flexion — Anteriorly Displaced Center-of-Mass Forearm Challenge',
      subtitle: 'Kettlebell curl adding downward wrist-extension torque for peak biceps & forearm drive',
      pattern: MOVEMENT_PATTERNS.ELBOW_FLEXION,
      equipment: 'Kettlebells',
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
        primary: ['Biceps Brachii (Long & Short Heads)', 'Brachialis'],
        secondary: ['Brachioradialis', 'Flexor Carpi Radialis'],
        stabilizers: ['Wrist Flexors', 'Anterior Deltoid', 'Core']
      },
      execution: {
        setup: 'Stand upright gripping dual kettlebells with palms forward/upward so the bell spheres hang evenly off the back of your forearms.',
        eccentric: 'Lower smoothly under 3-second control down to straight arms, preventing the posterior-hanging bell weight from slamming wrists into hyperextension.',
        concentric: 'Maintain completely straight rigid wrists ("neutral punch grip") while curling handles strictly via elbow flexion upward toward front deltoids.',
        breathing: 'Exhale curling bells upward; inhale smoothly on the 3-second lowering arc.',
        commonMistakes: [
          'Letting wrists drop limply backward under the hanging bell weight',
          'Resting elbows backward and cutting range of motion',
          'Swinging the torso'
        ],
        proTip: 'Because the kettlebell center of mass lags behind the grip handle, you hold noticeable torque even near the top where dumbbells slacken.'
      }
    },

  {
      id: 'ex-banded-bicep-curl',
      name: 'Resistance Band Bicep Curl',
      scientificName: 'Standing Foot-Anchored Elastic Elbow Flexion — Ascending Peak-Shortened Tension Profile',
      subtitle: 'Ascending elastic tension curl maximizing shortened biceps contraction at top peak',
      pattern: MOVEMENT_PATTERNS.ELBOW_FLEXION,
      equipment: 'Resistance Band',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'biceps',
      defaultSets: 3,
      defaultReps: '12-15',
      defaultRestSeconds: 60,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Biceps Brachii (Short & Long Heads)'],
        secondary: ['Brachialis', 'Brachioradialis'],
        stabilizers: ['Forearm Flexors', 'Core']
      },
      execution: {
        setup: 'Stand centered squarely atop the middle of a long resistance band with feet hip-width apart and hold both sides evenly at shoulder width, palms facing forward with light starting tension.',
        eccentric: 'Lower forearms purposefully over 2–3 seconds until elbows reach full straightness against elastic recoil.',
        concentric: 'Pin elbows gently beside your waist and curl upward against escalating band resistance to a 1-second peak supinated squeeze at shoulder height.',
        breathing: 'Exhale sharply at top peak squeeze; inhale smoothly lowering.',
        commonMistakes: [
          'Standing too narrow so bottom half of range has zero elastic tension',
          'Elbows snapping backward during top contraction',
          'Pumping frantic high-speed reps'
        ],
        proTip: 'Elastic resistance surges sharply in the upper half of the rep where free weights begin unloading—pair this directly after dumbbells to train the complete strength curve.'
      }
    },

  {
      id: 'ex-dumbbell-concentration-curl',
      name: 'Seated Dumbbell Concentration Curl',
      scientificName: 'Seated Thigh-Braced Unilateral Supinated Elbow Flexion — Zero Shoulder Momentum & Short-Head Peak',
      subtitle: 'Strict thigh-braced unilateral curl eliminating anterior-delt swing',
      pattern: MOVEMENT_PATTERNS.ELBOW_FLEXION,
      equipment: 'Dumbbell + Flat Bench',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'biceps',
      defaultSets: 3,
      defaultReps: '10-12/side',
      defaultRestSeconds: 60,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Biceps Brachii (Short & Long Heads)'],
        secondary: ['Brachialis', 'Brachioradialis'],
        stabilizers: ['Wrist Flexors (Grip)', 'Rotator Cuff (Humeral Lock)']
      },
      execution: {
        setup: 'Sit on the front edge of a flat bench with knees spread wide. Anchor the upper-back triceps of your working arm flush against your inner mid-thigh so the upper arm hangs perfectly vertical.',
        eccentric: 'Lower the dumbbell over 3 seconds to near-full extension without pulling shoulder joint forward.',
        concentric: 'Keeping the upper arm glued immovably against the inner thigh, curl cleanly up toward the front deltoid while actively twisting pinky slightly higher for peak supination.',
        breathing: 'Exhale into full top squeeze; inhale lowering cleanly.',
        commonMistakes: [
          'Lifting elbow off the thigh brace and pivoting the shoulder joint upward',
          'Pushing sideways against the thigh to bounce out of bottom',
          'Swinging the torso backward at end of set'
        ],
        proTip: 'Electromyography comparative studies rank the Concentration Curl among the highest exercises for isolated biceps brachii activation because thigh bracing cancels anterior deltoid synergy.'
      }
    },

  {
      id: 'ex-dumbbell-zottman-curl',
      name: 'Dumbbell Zottman Curl',
      scientificName: 'Standing Supinated Concentric / Pronated Eccentric Hybrid Curl — Total Elbow Flexor Triad',
      subtitle: 'Dual-phase curl combining heavy biceps concentric lift with pronated forearm-overload lowering',
      pattern: MOVEMENT_PATTERNS.ELBOW_FLEXION,
      equipment: 'Dumbbells',
      mechanics: 'Isolation',
      level: 'Intermediate',
      muscleKey: 'biceps',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Biceps Brachii', 'Brachioradialis', 'Brachialis'],
        secondary: ['Pronator Teres', 'Extensor Carpi Radialis'],
        stabilizers: ['Forearm Flexors (Grip)', 'Core']
      },
      execution: {
        setup: 'Stand upright holding dumbbells at sides with palms facing forward/upward (supinated) and elbows tucked beside ribs.',
        eccentric: 'At top contraction, smoothly pronate wrists 180° (turning palms downward/forward) and lower dumbbells ultra-slowly over 3–4 seconds targeting brachioradialis and forearm extensors.',
        concentric: 'Rotate palms back up at the bottom dead-hang and curl strictly supinated up to shoulder level.',
        breathing: 'Exhale curling upward; inhale throughout the slow 3–4 second pronated descent.',
        commonMistakes: [
          'Rotating palms halfway through the concentric rise instead of waiting for top pause',
          'Dropping the pronated eccentric too fast and missing forearm/brachioradialis overload',
          'Flaring elbows out sideways during wrist rotation'
        ],
        proTip: 'Because humans are stronger eccentrically than concentrically, using your supinated strength to lift weight that your pronated forearms must lower slowly produces exceptional forearm and elbow health adaptation.'
      }
    },

  {
      id: 'ex-dumbbell-wrist-curl',
      name: 'Seated Palms-Up Dumbbell Wrist Curl',
      scientificName: 'Seated Forearm-Supported Supinated Radiocarpal Flexion — Anterior Forearm Flexor Isolation',
      subtitle: 'Supported forearm flexor curl strengthening grip stamina, wrists & medial elbow resilience',
      pattern: MOVEMENT_PATTERNS.ELBOW_FLEXION,
      equipment: 'Dumbbells + Flat Bench',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'forearm',
      defaultSets: 3,
      defaultReps: '15-20',
      defaultRestSeconds: 45,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Flexor Carpi Radialis', 'Flexor Carpi Ulnaris', 'Flexor Digitorum Superficialis'],
        secondary: ['Palmaris Longus', 'Pronator Teres'],
        stabilizers: ['Brachioradialis (Bench Anchoring)']
      },
      execution: {
        setup: 'Sit on bench end and rest both supinated (palms-up) forearms flat across thighs or bench edge so wrists hang completely clear just past kneecaps.',
        eccentric: 'Slowly open the wrists backward and let the dumbbells roll lightly down onto fingertips for an extra deep anterior forearm stretch.',
        concentric: 'Close fingers tightly around handles first, then flex both wrists straight upward toward forearms squeezing firmly for 1 full second.',
        breathing: 'Exhale smoothly curling wrists upward; inhale during controlled opening stretch.',
        commonMistakes: [
          'Lifting entire forearms upward off the thighs to use biceps momentum',
          'Bouncing wrists aggressively with heavy ego weight',
          'Skipping full bottom finger-to-palm curl stretch'
        ],
        proTip: 'Glue the backs of your forearms immovably into your thighs/bench—the entire movement takes place strictly across the 4–5 cm radiocarpal joint arc.'
      }
    },

  {
      id: 'ex-dumbbell-wrist-extension',
      name: 'Seated Reverse Dumbbell Wrist Extension',
      scientificName: 'Seated Forearm-Supported Pronated Radiocarpal Extension — Posterior Forearm & Epicondyle Prehab',
      subtitle: 'Pronated wrist extension balancing grip flexors and shielding lateral elbow tendons',
      pattern: MOVEMENT_PATTERNS.ELBOW_FLEXION,
      equipment: 'Dumbbells + Flat Bench',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'forearm',
      defaultSets: 3,
      defaultReps: '15-20',
      defaultRestSeconds: 45,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Extensor Carpi Radialis Longus & Brevis', 'Extensor Carpi Ulnaris', 'Extensor Digitorum'],
        secondary: ['Brachioradialis'],
        stabilizers: ['Forearm Flexors (Grip Hold)']
      },
      execution: {
        setup: 'Rest both pronated (palms-down) forearms comfortably across thighs or a flat bench so wrists hang smoothly just past the support edge holding light dumbbells.',
        eccentric: 'Lower knuckles slowly over 2–3 seconds down into maximal wrist flexion stretch while maintaining a calm grip.',
        concentric: 'Raise the backs of your knuckles cleanly straight up toward your forearms without lifting elbows/forearms off support and hold 1 second.',
        breathing: 'Exhale raising knuckles; inhale smoothly lowering into stretch.',
        commonMistakes: [
          'Using heavy loads that pull shoulders and biceps into the movement',
          'Rushing fast reps without full bottom wrist stretch',
          'Letting forearm shift laterally off support'
        ],
        proTip: 'Strengthening wrist extensors balances heavy barbell gripping volume and serves as direct tendon prehabilitation against lateral epicondylitis ("tennis elbow").'
      }
    }
];
