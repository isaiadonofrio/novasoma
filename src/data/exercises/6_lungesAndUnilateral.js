/**
 * LUNGESANDUNILATERAL
 * Modular Exercise Sub-Database
 */

import { MOVEMENT_PATTERNS } from '../exerciseConstants.js';

export const LUNGESANDUNILATERAL_EXERCISES = [
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
    }
];
