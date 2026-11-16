/**
 * PUSHUPPERBODY
 * Modular Exercise Sub-Database
 */

import { MOVEMENT_PATTERNS } from '../exerciseConstants.js';

export const PUSHUPPERBODY_EXERCISES = [
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
      id: 'ex-incline-push-up',
      name: 'Incline Bench Push-Up',
      scientificName: 'Angle-reduced closed-chain horizontal pressing with active plank stabilization',
      subtitle: 'Joint-friendly elevated push-up maintaining strict core anti-extension',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
      equipment: 'Flat Bench',
      mechanics: 'Compound',
      level: 'Beginner',
      muscleKey: 'chest',
      defaultSets: 3,
      defaultReps: '8-12',
      defaultRestSeconds: 60,
      rpe: '6 - 7',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Pectoralis Major (Lower & Mid)', 'Anterior Deltoid'],
        secondary: ['Triceps Brachii', 'Serratus Anterior'],
        stabilizers: ['Transverse Abdominis', 'Gluteus Maximus', 'Quadriceps']
      },
      execution: {
        setup: 'Place hands slightly wider than shoulder-width on the edge of a sturdy bench or box. Step feet back into a rigid head-to-heel plank.',
        eccentric: 'Lower chest toward bench edge over 2–3 seconds with elbows tracking backward at roughly 45° to torso.',
        concentric: 'Press palms firmly into bench to return to full lockout, spreading shoulder blades apart at top.',
        breathing: 'Inhale on the way down; exhale driving away from the bench.',
        commonMistakes: [
          'Sagging hips into lumbar hyperextension',
          'Flaring elbows out at 90° stressing the rotator cuff',
          'Dropping head forward to touch bench before chest'
        ],
        proTip: 'Squeeze glutes and pull belly button to spine—the incline push-up is a moving plank as much as a chest builder.'
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
      id: 'ex-incline-dumbbell-bench-press',
      name: 'Incline Dumbbell Bench Press',
      scientificName: '30° Incline Independent Dumbbell Press — Unrestricted Scapular-Plane Convergence Path',
      subtitle: 'Low-incline dumbbell press biasing clavicular upper chest and anterior delts',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
      equipment: 'Dumbbells + Incline Bench',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'chest',
      defaultSets: 4,
      defaultReps: '8-12',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Pectoralis Major (Clavicular Head)', 'Anterior Deltoid'],
        secondary: ['Triceps Brachii', 'Pectoralis Major (Sternal Head)'],
        stabilizers: ['Rotator Cuff', 'Serratus Anterior', 'Rhomboids']
      },
      execution: {
        setup: 'Adjust bench backrest strictly to 30° (~2 notches up) so clavicular pectoral fibers align horizontally with gravity. Retract shoulder blades gently into the pad, plant feet flat, and kick dumbbells above upper chest.',
        eccentric: 'Lower dumbbells smoothly over 2–3 seconds with elbows tucked ~45° from torso until bells graze outside the upper chest into a full stretch.',
        concentric: 'Drive forearms upward along a subtle converging arc over the upper sternum until elbows reach strong soft lockout without clanging bells.',
        breathing: 'Inhale into the braced chest during descent; exhale smoothly past mid-press.',
        commonMistakes: [
          'Setting the bench at a steep 45–60° angle where anterior deltoids hijack the load',
          'Flaring elbows out 90° sideways into shoulder impingement',
          'Lifting glutes off the seat to manufacture decline leverage'
        ],
        proTip: 'EMG literature consistently confirms a 30° incline maximizes clavicular pectoralis excitation without excessive anterior deltoid takeover.'
      }
    },

  {
      id: 'ex-kettlebell-floor-press',
      name: 'Kettlebell Alternating Floor Press',
      scientificName: 'Supine Alternating Floor-Stopped Kettlebell Press — Anti-Rotation Torso & Wrist Stability',
      subtitle: 'Joint-friendly floor press adding offset bell resistance and unilateral core bracing',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
      equipment: 'Kettlebells',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'chest',
      defaultSets: 3,
      defaultReps: '8-10/side',
      defaultRestSeconds: 90,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Pectoralis Major (Sternal & Clavicular Heads)', 'Triceps Brachii'],
        secondary: ['Anterior Deltoid', 'Obliques (Anti-Rotation)'],
        stabilizers: ['Forearm Flexors & Wrist', 'Rotator Cuff', 'Scapular Stabilizers']
      },
      execution: {
        setup: 'Lie flat on a mat with knees bent and both kettlebells pressed straight up over shoulders so each bell sphere rests gently against the back of a straight neutral wrist and forearm.',
        eccentric: 'Keeping one kettlebell locked steady overhead, lower the active elbow smoothly over 2–3 seconds at ~45° from ribs until upper arm kisses the floor.',
        concentric: 'Pause briefly without slamming into the floor, then drive upward forcefully to lockout before alternating sides.',
        breathing: 'Inhale as active arm descends; exhale crisp breath bracing obliques while pressing.',
        commonMistakes: [
          'Letting the wrist collapse into hyperextension under the offset bell weight',
          'Rolling torso sideways toward the resting floor elbow',
          'Bouncing triceps aggressively off the hardwood'
        ],
        proTip: 'Punch knuckles straight toward the ceiling to lock the forearm perpendicular beneath the kettlebell handle—this instantly recruits deep wrist and cuff stabilizers.'
      }
    },

  {
      id: 'ex-decline-push-up',
      name: 'Decline Push-Up (Feet Elevated)',
      scientificName: 'Elevated-Foot Closed-Chain Push-Up — Increased Bodyweight Load & Clavicular Fiber Shift',
      subtitle: 'Feet-elevated push-up shifting higher bodyweight percentage onto upper chest & front delts',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
      equipment: 'Flat Bench / Step Box',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'chest',
      defaultSets: 3,
      defaultReps: '10-15',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Pectoralis Major (Clavicular Head)', 'Anterior Deltoid'],
        secondary: ['Triceps Brachii', 'Serratus Anterior'],
        stabilizers: ['Rectus Abdominis', 'Transverse Abdominis', 'Glutes']
      },
      execution: {
        setup: 'Place both balls of feet firmly atop a sturdy flat bench or plyo box (~40–50 cm high) and plant palms just outside shoulder width on the floor beneath the upper chest. Squeeze glutes and tuck pelvis subtly into a rigid plank.',
        eccentric: 'Lower torso straight down over 2–3 seconds with elbows tucked ~45° until upper chest/chin lightly skims floor level.',
        concentric: 'Push palms aggressively through the floor, allowing shoulder blades to spread cleanly at the top into strong serratus protraction.',
        breathing: 'Inhale bracing core while lowering; exhale pushing away from floor.',
        commonMistakes: [
          'Sagging hips into lumbar hyperextension because of elevated feet',
          'Flaring elbows straight out at 90° and shrugging shoulders toward ears',
          'Cutting depth short by dropping the chin only'
        ],
        proTip: 'Elevating the feet by ~45 cm raises effective hands push load from ~64% to nearly ~75% of bodyweight while shifting the pressing vector toward the clavicular fibers.'
      }
    },

  {
      id: 'ex-parallel-bar-dip',
      name: 'Parallel Bar Chest Dip',
      scientificName: 'Suspended Forward-Leaning Closed-Chain Compound Press — Maximal Lower Pectoral Extension',
      subtitle: 'Full-bodyweight compound chest and triceps builder with deep shoulder stretch',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
      equipment: 'Dip Bars',
      mechanics: 'Compound',
      level: 'Intermediate',
      muscleKey: 'chest',
      defaultSets: 3,
      defaultReps: '8-12',
      defaultRestSeconds: 90,
      rpe: '8 - 9',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Pectoralis Major (Sternal & Costal Heads)', 'Triceps Brachii'],
        secondary: ['Anterior Deltoid', 'Pectoralis Minor'],
        stabilizers: ['Lower Trapezius (Scapular Depression)', 'Latissimus Dorsi', 'Core']
      },
      execution: {
        setup: 'Grip parallel dip bars near shoulder width, press to straight arms with shoulders packed firmly down away from your ears, cross ankles softly behind knees, and lean torso forward ~25–30°.',
        eccentric: 'Lower steadily over 3 seconds maintaining the forward chest-over-hands angle until upper arms break just past parallel to the floor (~90–100° elbow bend) within pain-free shoulder comfort.',
        concentric: 'Drive vertically through the palms maintaining strong scapular depression until reaching full smooth lockout.',
        breathing: 'Inhale bracing ribs before descending; exhale steadily through top half of drive.',
        commonMistakes: [
          'Shrugging shoulders up toward earlobes at the bottom, pinching anterior shoulder capsule',
          'Dropping recklessly past safe anterior humeral glide depth',
          'Swinging knees up and down like a kipping leg raise'
        ],
        proTip: 'Maintain active downward shoulder depression throughout the bottom position—imagine sliding your armpits toward your back pockets.'
      }
    },

  {
      id: 'ex-incline-dumbbell-chest-fly',
      name: 'Incline Dumbbell Chest Fly',
      scientificName: '30° Incline Open-Chain Glenohumeral Horizontal Adduction — Clavicular Pectoral Alignment',
      subtitle: 'Long-length incline pectoral isolation stretching upper-chest fibers under load',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
      equipment: 'Dumbbells + Incline Bench',
      mechanics: 'Isolation',
      level: 'Intermediate',
      muscleKey: 'chest',
      defaultSets: 3,
      defaultReps: '10-15',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Pectoralis Major (Clavicular Head)', 'Pectoralis Major (Sternal Head)'],
        secondary: ['Anterior Deltoid', 'Biceps Brachii (Isometric)'],
        stabilizers: ['Rotator Cuff', 'Scapular Retractors']
      },
      execution: {
        setup: 'Set bench to 30° incline, retract shoulder blades into the pad, and hold dumbbells vertically above the clavicles with palms facing inward and elbows locked at a fixed 15–20° bend.',
        eccentric: 'Sweep the arms outward along a wide lateral arc over 3 seconds while opening the sternum until elbows drift slightly below upper torso height in a deep upper-chest stretch.',
        concentric: 'Draw the upper arms smoothly back together ("hug a wide tree trunk") stopping right when dumbbells reach shoulder width overhead where gravity torque still lives.',
        breathing: 'Inhale fully into upper chest on the wide opening arc; exhale squeezing inward.',
        commonMistakes: [
          'Bending elbows deeply at bottom and accidentally converting the fly into a press',
          'Clanking dumbbells together vertically over the face where gravity resistance drops to zero',
          'Protracting shoulders forward off the incline bench'
        ],
        proTip: 'Stop your top convergence just outside shoulder width so constant horizontal gravity torque never turns off between reps.'
      }
    },

  {
      id: 'ex-banded-chest-fly',
      name: 'Standing Resistance Band Chest Fly',
      scientificName: 'Standing Open-Chain Elastic Horizontal Adduction — Ascending Peak-Shortened Contraction',
      subtitle: 'Standing band fly complementing free weights with peak inward squeeze tension',
      pattern: MOVEMENT_PATTERNS.HORIZONTAL_PUSH,
      equipment: 'Resistance Band',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'chest',
      defaultSets: 3,
      defaultReps: '12-15',
      defaultRestSeconds: 60,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Pectoralis Major (Sternal & Clavicular Heads)'],
        secondary: ['Anterior Deltoid', 'Serratus Anterior'],
        stabilizers: ['Rectus Abdominis (Anti-Extension Split Stance)', 'Biceps Brachii']
      },
      execution: {
        setup: 'Anchor a resistance band safely behind torso height (or wrap behind upper back across scapulae), step forward into an athletic staggered split stance until the band has light starting tension with arms spread wide.',
        eccentric: 'Let the hands resist smoothly back along the wide horizontal arc over 2–3 seconds to full chest stretch without shrugging shoulders forward.',
        concentric: 'Sweep straight/softly-bent arms forcefully forward and slightly across midline until wrists cross slightly in front of sternum and hold peak contraction for 1 full second.',
        breathing: 'Exhale powerfully during peak midline cross-over squeeze; inhale on controlled opening.',
        commonMistakes: [
          'Turning the fly into a staggered standing punch by flexing elbows backward',
          'Leaning forward excessively with the entire torso when tension peaks',
          'Losing rib-to-pelvis alignment'
        ],
        proTip: 'Unlike dumbbells—which go weightless at the top—elastic band resistance reaches maximum tension at midline crossover, making them a perfect biomechanical superset or finisher.'
      }
    },

  {
      id: 'ex-incline-dumbbell-ytw-raise',
      name: 'Prone Incline Dumbbell Y-T-W Raise',
      scientificName: 'Chest-Supported Prone Incline Multi-Vector Scapular Raise (Y-T-W) — Rotator & Lower-Trap Prehab',
      subtitle: 'Chest-supported shoulder prehab complex strengthening lower traps, rear delts & cuff',
      pattern: MOVEMENT_PATTERNS.SHOULDER_ABDUCTION,
      equipment: 'Dumbbells + Incline Bench',
      mechanics: 'Isolation',
      level: 'Intermediate',
      muscleKey: 'shoulders',
      defaultSets: 3,
      defaultReps: '8-10/position',
      defaultRestSeconds: 60,
      rpe: '7 - 8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Lower & Middle Trapezius', 'Posterior Deltoid', 'Rhomboids'],
        secondary: ['Infraspinatus & Teres Minor (External Rotators)', 'Supraspinatus'],
        stabilizers: ['Thoracic Erectors', 'Lumbar Core']
      },
      execution: {
        setup: 'Lie chest-down across a 30–45° incline bench with chin tucked neutral and light dumbbells hanging cleanly underneath the shoulders.',
        eccentric: 'Lower cleanly under 2-second control back to full vertical arm hang between each letter angle without dropping weights slack.',
        concentric: 'Execute thumbs-up overhead 135° "Y" raises (lower traps), 90° lateral "T" raises (mid-traps/rear delts), and externally rotated 45° bent-elbow "W" pulls (rotator cuff).',
        breathing: 'Exhale softly on each raise with ribcage anchored against pad; inhale lowering.',
        commonMistakes: [
          'Using heavy dumbbells and jerking the chest off the bench pad',
          'Shrugging the upper traps toward ears on the "Y" phase',
          'Craning the neck forward looking straight ahead'
        ],
        proTip: 'Use very light loads (1–4 kg)—rotator cuff and lower trapezius motor units fire best under clean slow tempos without momentum.'
      }
    },

  {
      id: 'ex-overhead-dumbbell-triceps-extension',
      name: 'Overhead Dumbbell Triceps Extension',
      scientificName: 'Seated/Standing 170° Overhead Elbow Extension — Maximal Biarticular Long-Head Lengthening',
      subtitle: 'Single-dumbbell overhead extension maximizing long-head triceps hypertrophy',
      pattern: MOVEMENT_PATTERNS.ELBOW_EXTENSION,
      equipment: 'Dumbbell',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'triceps',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Triceps Brachii (Long Head Maximal Stretch)', 'Triceps Brachii (Medial & Lateral Heads)'],
        secondary: ['Anconeus'],
        stabilizers: ['Anterior Core (Rib-Down Brace)', 'Rotator Cuff', 'Wrist Flexors']
      },
      execution: {
        setup: 'Stand tall or sit upright locking ribcage down over pelvis. Cup the inner top plate of one vertical dumbbell symmetrically with both hands pressed straight overhead.',
        eccentric: 'Keeping upper arms near vertical beside ears, hinge strictly at the elbows over 3 seconds lowering the dumbbell smoothly behind the neck into a full deep long-head triceps stretch.',
        concentric: 'Drive forearms upward via pure triceps contraction to full crisp extension without flaring the lower ribs forward.',
        breathing: 'Inhale into deep overhead triceps stretch; exhale while extending overhead.',
        commonMistakes: [
          'Flaring lower ribs and hyperextending the lumbar spine when elbows bend deep',
          'Letting elbows spread wide like wings away from the ears',
          'Only bending half-range behind the crown'
        ],
        proTip: 'Recent MRI hypertrophy studies demonstrate ~40% greater long-head triceps growth from overhead extensions versus neutral-arm pushdowns due to extreme biarticular stretch.'
      }
    },

  {
      id: 'ex-overhead-kettlebell-triceps-extension',
      name: 'Overhead Kettlebell Triceps Extension',
      scientificName: 'Standing Overhead Horn-Grip Kettlebell Elbow Extension — Posterior Bell Pendulum Stretch',
      subtitle: 'Horn-grip overhead triceps extension with deep kettlebell center-of-mass stretch',
      pattern: MOVEMENT_PATTERNS.ELBOW_EXTENSION,
      equipment: 'Kettlebell',
      mechanics: 'Isolation',
      level: 'Beginner',
      muscleKey: 'triceps',
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSeconds: 75,
      rpe: '8',
      lastRecord: '',
      illustration: '',
      mediaType: 'image',
      targetMuscles: {
        primary: ['Triceps Brachii (Long Head)', 'Triceps Brachii (Lateral & Medial Heads)'],
        secondary: ['Anconeus'],
        stabilizers: ['Transverse Abdominis', 'Glutes (Standing Brace)', 'Upper Back']
      },
      execution: {
        setup: 'Grip both side horns of a single kettlebell (bell pointing upward) and press it overhead with glutes squeezed, knees soft, and ribs pinned flat.',
        eccentric: 'Bend cleanly at the elbows over 3 seconds letting the heavy bell pendulum smoothly behind the occiput into deep triceps stretch while holding upper arms still.',
        concentric: 'Contract triceps powerfully to press the kettlebell straight upward overhead until elbows lock softly out.',
        breathing: 'Inhale smoothly during bottom stretch; exhale crisp breath pushing overhead.',
        commonMistakes: [
          'Tipping elbows forward so shoulders swing instead of isolating the elbow hinge',
          'Arching lower back to compensate for tight lats/thoracic spine',
          'Using loose grip around top handle rather than firm side-horn compression'
        ],
        proTip: 'Squeezing the side horns tightly inward ("crush the kettlebell") stabilizes the shoulder joint via irradiation and deepens triceps tension.'
      }
    },

  {
      id: 'ex-kettlebell-floor-skullcrusher',
      name: 'Supine Kettlebell Floor Skullcrusher',
      scientificName: 'Supine Floor-Stopped Kettlebell Elbow Extension — Constant Scapular Support & Neutral Grip',
      subtitle: 'Joint-safe supine floor skullcrusher eliminating shoulder hyperextension risk',
      pattern: MOVEMENT_PATTERNS.ELBOW_EXTENSION,
      equipment: 'Kettlebell + Mat',
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
        stabilizers: ['Forearm Flexors (Offset Handle Torque)', 'Anterior Deltoid']
      },
      execution: {
        setup: 'Lie flat on your back with knees bent and hold a kettlebell by both side horns (or two bells neutral-grip) slightly angled backward past vertical (~100° shoulder angle).',
        eccentric: 'Hinge cleanly at the elbows over 2–3 seconds lowering the bell behind the crown until the kettlebell sphere lightly touches the floor.',
        concentric: 'Pause softly against the floor without bouncing and extend elbows firmly back to full triceps lockout.',
        breathing: 'Inhale lowering behind crown; exhale extending arms vertical.',
        commonMistakes: [
          'Crashing the kettlebell bell abruptly onto the floor',
          'Dropping upper arms toward the hips when starting the concentric drive',
          'Flaring elbows wide sideways'
        ],
        proTip: 'The floor dead-stop dissipates elastic stretch bounce and enforces a controlled concentric triceps drive from a deep flexed elbow angle.'
      }
    },

  {
      id: 'ex-sphinx-push-up',
      name: 'Sphinx Triceps Push-Up',
      scientificName: 'Prone Forearm-Plank Closed-Chain Elbow Extension — Bodyweight Triceps & Anti-Extension Core',
      subtitle: 'Bodyweight closed-chain triceps extension bridging plank core brace with arm isolation',
      pattern: MOVEMENT_PATTERNS.ELBOW_EXTENSION,
      equipment: 'Bodyweight (Mat)',
      requiresEquipment: false,
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
        primary: ['Triceps Brachii (Lateral, Medial & Long Heads)'],
        secondary: ['Anconeus', 'Anterior Deltoid'],
        stabilizers: ['Rectus Abdominis', 'Transverse Abdominis', 'Serratus Anterior']
      },
      execution: {
        setup: 'Assume a shoulder-width forearm plank on a mat with palms flat in front of elbows and body braced straight from ears to ankles. (To scale easier, step feet back slightly or elevate hands onto a box).',
        eccentric: 'Keeping forearms parallel—not flaring sideways—lower both elbows synchronously back down to lightly kiss the mat over 2–3 seconds.',
        concentric: 'Press cleanly through both palms simultaneously to extend elbows and rise back into an elongated plank without rocking hips left or right.',
        breathing: 'Inhale lowering elbows onto mat; exhale forcefully pressing symmetrically upright.',
        commonMistakes: [
          'Pressing one arm up ahead of the other like an uneven command crawl',
          'Flaring elbows out 45–60° sideways instead of tracking straight backward',
          'Allowing lower hips to sag toward the mat on ascent'
        ],
        proTip: 'Walking feet subtly closer toward hands shortens the lever; stepping hands slightly further ahead of your face dramatically amplifies triceps torque.'
      }
    }
];
