/**
 * EXERCISE TAXONOMY & BIOMECHANICAL STANDARDIZATION
 * Authoritative kinesiology nomenclature, movement families, and mechanical vectors.
 * Designed to scale cleanly to 1,000+ exercises via relational `familyId` grouping.
 */

export const SCIENTIFIC_SOURCES = [
  {
    id: 'nsca',
    citation: 'NSCA — Essentials of Strength Training and Conditioning (4th Ed., Haff & Triplett)',
    scope: 'Kinetic chain classification (CKC/OKC), external force vectors, resistance curves, and breathing/bracing standards.'
  },
  {
    id: 'exrx',
    citation: 'ExRx.net — Kinesiology & Joint Articulation Directory',
    scope: 'Anatomical planes of motion, joint actions, and agonist / synergist / stabilizer roles.'
  },
  {
    id: 'terminologia-anatomica',
    citation: 'FIPAT — Terminologia Anatomica (2nd Ed.)',
    scope: 'Standardized international Latin/English anatomical muscle and muscle-head nomenclature.'
  },
  {
    id: 'biomechanics-lit',
    citation: 'Peer-Reviewed Spine & Hypertrophy Biomechanics (McGill; Schoenfeld; Contreras; Bourne et al.)',
    scope: 'Lumbar shear/anti-stability classification, length-tension regional hypertrophy, and loaded carry mechanics.'
  }
];

export const VARIATION_TYPES = [
  'Base',
  'Equipment',
  'Angle / Stance',
  'Grip',
  'Unilateral',
  'Progression'
];

export const MOVEMENT_FAMILIES = {
  'fam-jump-rope': {
    id: 'fam-jump-rope',
    name: 'Elastic Ankle Plyometrics'
  },
  'fam-hip-abduction': {
    id: 'fam-hip-abduction',
    name: 'Frontal-Plane Hip Abduction'
  },
  'fam-hip-mobility': {
    id: 'fam-hip-mobility',
    name: 'Tri-Planar Hip & Ankle Mobility'
  },
  'fam-glute-step-down': {
    id: 'fam-glute-step-down',
    name: 'Lateral Pelvic-Control Glute Step-Down'
  },
  'fam-elevated-ankle-dorsiflexion': {
    id: 'fam-elevated-ankle-dorsiflexion',
    name: 'Foot-Elevated Closed-Chain Talocrural Dorsiflexion'
  },
  'fam-thoracic-mobility': {
    id: 'fam-thoracic-mobility',
    name: 'Thoracic & Glenohumeral Mobility'
  },
  'fam-spinal-decompression': {
    id: 'fam-spinal-decompression',
    name: 'Spinal Decompression & Restoration'
  },
  'fam-bilateral-squat': {
    id: 'fam-bilateral-squat',
    name: 'Bilateral Knee-Dominant Squat'
  },
  'fam-box-squat': {
    id: 'fam-box-squat',
    name: 'Box-Delimited Squat'
  },
  'fam-unilateral-squat': {
    id: 'fam-unilateral-squat',
    name: 'Unilateral Free-Space Squat'
  },
  'fam-quad-knee-extension': {
    id: 'fam-quad-knee-extension',
    name: 'Biarticular Rectus Femoris Extension'
  },
  'fam-floor-deadlift': {
    id: 'fam-floor-deadlift',
    name: 'Floor-Pull Deadlift'
  },
  'fam-rdl': {
    id: 'fam-rdl',
    name: 'Romanian Deadlift & Hip Hinge'
  },
  'fam-hip-thrust': {
    id: 'fam-hip-thrust',
    name: 'Bench-Supported Hip Thrust'
  },
  'fam-glute-bridge': {
    id: 'fam-glute-bridge',
    name: 'Floor Glute Bridge & Hip Extension'
  },
  'fam-hamstring-curl': {
    id: 'fam-hamstring-curl',
    name: 'Isolated Knee-Flexion Hamstring Curl'
  },
  'fam-bench-press': {
    id: 'fam-bench-press',
    name: 'Bench Press (Horizontal & Incline)'
  },
  'fam-floor-press': {
    id: 'fam-floor-press',
    name: 'Scapula-Anchored Floor Press'
  },
  'fam-push-up': {
    id: 'fam-push-up',
    name: 'Closed-Chain Horizontal Press & Dip'
  },
  'fam-chest-fly': {
    id: 'fam-chest-fly',
    name: 'Glenohumeral Horizontal Adduction Fly'
  },
  'fam-overhead-press': {
    id: 'fam-overhead-press',
    name: 'Vertical Overhead Press'
  },
  'fam-lateral-deltoid': {
    id: 'fam-lateral-deltoid',
    name: 'Lateral Deltoid Humeral Abduction'
  },
  'fam-posterior-deltoid': {
    id: 'fam-posterior-deltoid',
    name: 'Posterior Deltoid & Scapular Retraction'
  },
  'fam-triceps-extension': {
    id: 'fam-triceps-extension',
    name: 'Elbow Extension Triceps Isolation'
  },
  'fam-vertical-pull': {
    id: 'fam-vertical-pull',
    name: 'Vertical Pull & Shoulder Extension'
  },
  'fam-horizontal-row': {
    id: 'fam-horizontal-row',
    name: 'Bilateral Bent-Over Barbell Row'
  },
  'fam-unilateral-row': {
    id: 'fam-unilateral-row',
    name: 'Unilateral & Alternating Horizontal Row'
  },
  'fam-trapezius-shrug': {
    id: 'fam-trapezius-shrug',
    name: 'Scapular Elevation Shrug'
  },
  'fam-elbow-flexion': {
    id: 'fam-elbow-flexion',
    name: 'Elbow Flexion Curl'
  },
  'fam-forearm-wrist': {
    id: 'fam-forearm-wrist',
    name: 'Radiocarpal Forearm Curl & Extension'
  },
  'fam-split-squat': {
    id: 'fam-split-squat',
    name: 'Stationary Split Squat'
  },
  'fam-dynamic-lunge': {
    id: 'fam-dynamic-lunge',
    name: 'Dynamic Stepping Lunge'
  },
  'fam-step-up': {
    id: 'fam-step-up',
    name: 'Elevated Box Step-Up & Step-Down'
  },
  'fam-calf-plantarflexion': {
    id: 'fam-calf-plantarflexion',
    name: 'Ankle Plantarflexion Calf Raise'
  },
  'fam-ankle-dorsiflexion': {
    id: 'fam-ankle-dorsiflexion',
    name: 'Ankle Dorsiflexion Tibialis Raise'
  },
  'fam-plank-anti-extension': {
    id: 'fam-plank-anti-extension',
    name: 'Sagittal Anti-Extension Core Stabilization'
  },
  'fam-hanging-hip-spinal-flexion': {
    id: 'fam-hanging-hip-spinal-flexion',
    name: 'Suspended Hip & Lumbar Curl'
  },
  'fam-lateral-core': {
    id: 'fam-lateral-core',
    name: 'Frontal-Plane Lateral Core Stabilization'
  },
  'fam-core-rotation': {
    id: 'fam-core-rotation',
    name: 'Transverse Anti-Rotation & Thoracic Twist'
  },
  'fam-posterior-spine': {
    id: 'fam-posterior-spine',
    name: 'Prone Spinal Erector Isometric'
  },
  'fam-loaded-carry': {
    id: 'fam-loaded-carry',
    name: 'Locomotive Loaded Carry'
  },
  'fam-lower-plyo': {
    id: 'fam-lower-plyo',
    name: 'Lower-Limb Triple-Extension Plyometrics'
  },
  'fam-plank-conditioning': {
    id: 'fam-plank-conditioning',
    name: 'Full-Body Conditioning & Power Flow'
  }
};

function entry(
  scientificName,
  familyId,
  variationType,
  variationLabel,
  plane,
  chain,
  laterality,
  loadVector,
  resistanceProfile,
  jointActions
) {
  return {
    scientificName,
    familyId,
    variationType,
    variationLabel,
    biomechanics: {
      plane,
      chain,
      laterality,
      loadVector,
      resistanceProfile,
      jointActions
    }
  };
}

export const EXERCISE_TAXONOMY = {
  // === 1. WARM-UP & MOBILITY ===
  'wu-jump-rope': entry(
    'Bilateral Closed-Chain Elastic Ankle Plantarflexion Hop — Vertical Impact Recoil',
    'fam-jump-rope',
    'Base',
    'Standard Alternating/Bilateral Rope Skip',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Axial Vertical Gravity',
    'Stretch-Shortening Elastic Recoil',
    'Ankle Plantarflexion / Dorsiflexion (Stiffness)'
  ),
  'wu-banded-hip-abduction': entry(
    'Standing Open-Chain Hip Abduction — Frontal Plane Elastic Resistance',
    'fam-hip-abduction',
    'Base',
    'Standing Banded Hip Abduction',
    'Frontal',
    'Mixed (CKC Stance / OKC Swing)',
    'Unilateral',
    'Medial-Lateral Elastic Tension',
    'Ascending (Peak at Max Abduction)',
    'Hip Abduction & Pelvic Leveling'
  ),
  'wu-banded-lateral-walk': entry(
    'Bilateral Semi-Squat Closed-Chain Lateral Gait — Frontal Elastic Hip Abduction',
    'fam-hip-abduction',
    'Angle / Stance',
    'Dynamic Lateral Monster Walk',
    'Frontal',
    'Closed Kinetic Chain (CKC)',
    'Alternating Bilateral',
    'Medial-Lateral Elastic Tension',
    'Ascending with Step Width',
    'Isometric Knee/Hip Flexion + Dynamic Hip Abduction'
  ),
  'wu-ankle-hip-mobility': entry(
    'Closed-Chain Dorsiflexion & Seated 90/90 Hip Capsule Internal/External Rotation',
    'fam-hip-mobility',
    'Base',
    'Seated 90/90 & Kneeling Ankle Flow',
    'Multi-Planar',
    'Closed Kinetic Chain (CKC)',
    'Alternating Unilateral',
    'Low-Load End-Range Articular Shear',
    'End-Range Capsular Tension',
    'Ankle Dorsiflexion + Hip Internal & External Rotation'
  ),
  'wu-lateral-glute-step-down': entry(
    'Unilateral Closed-Chain Eccentric Pelvic-Leveling Step-Down — Frontal-Plane Gluteus Medius Stabilization',
    'fam-glute-step-down',
    'Base',
    'Bodyweight Lateral Step-Down',
    'Frontal / Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Vertical Bodyweight Over Stance Tripod Foot',
    'Ascending Control Through Mid-Range Knee & Hip Flexion',
    'Pelvic Drop Control (Eccentric/Concentric Hip Abduction) + Knee Flexion'
  ),
  'wu-dumbbell-glute-step-down': entry(
    'Light-Loaded Unilateral Closed-Chain Eccentric Step-Down — Contralateral/Goblet Gluteus Medius Integration',
    'fam-glute-step-down',
    'Equipment',
    'Light Dumbbell Glute Step-Down',
    'Frontal / Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Axial Light Dumbbell (Contralateral / Goblet Offset)',
    'Constant Frontal Pelvic Stabilization Torque Under Descent',
    'Anti-Trendelenburg Hip Stabilization + Controlled Knee Flexion/Extension'
  ),
  'wu-kettlebell-glute-step-down': entry(
    'Contralateral Kettlebell-Loaded Closed-Chain Step-Down — Asymmetric Frontal-Plane Hip Stabilization',
    'fam-glute-step-down',
    'Equipment',
    'Light Kettlebell Offset Step-Down',
    'Frontal / Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Contralateral Asymmetric Kettlebell Moment Arm',
    'Sustained Lateral Hip & Anti-Rotation Demand',
    'Hip Abduction & External Rotation Stabilization + Stance Extension'
  ),
  'wu-banded-glute-step-down': entry(
    'Closed-Chain Eccentric Step-Down With Reactive Neuromuscular Training (RNT) Medial Band Vector',
    'fam-glute-step-down',
    'Angle / Stance',
    'RNT Banded Lateral Glute Step-Down',
    'Frontal / Multi-Planar',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Vertical Body Mass + Medial Elastic Valgus Cue',
    'Continuous Outward Torque Demand Across Full Tempo',
    'Reactive Hip External Rotation & Abduction Against Valgus Pull'
  ),
  'wu-elevated-ankle-dorsiflexion': entry(
    'Closed-Chain Weight-Bearing Talocrural Dorsiflexion Mobilization (Foot-Elevated Split Stance)',
    'fam-elevated-ankle-dorsiflexion',
    'Base',
    'Foot-Elevated Bodyweight Knee-Over-Toe Stretch',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Forward Shift Body Weight With Anchored Calcaneus',
    'End-Range Capsular & Soleus Elongation Yield',
    'Talocrural Dorsiflexion & Anterior Tibial Translation'
  ),
  'wu-dumbbell-ankle-dorsiflexion': entry(
    'Externally Loaded Closed-Chain Talocrural Dorsiflexion Mobilization (Distal Femur Dumbbell Load)',
    'fam-elevated-ankle-dorsiflexion',
    'Equipment',
    'Dumbbell Knee-Loaded Ankle Dorsiflexion',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Vertical Distal Femur Dumbbell Compression Vector',
    'Enhanced End-Range Soleus & Capsule Yield',
    'Talocrural Dorsiflexion With Compressive Calcaneal Anchoring'
  ),
  'wu-kettlebell-ankle-dorsiflexion': entry(
    'Externally Loaded Closed-Chain Talocrural Dorsiflexion Mobilization (Anterior Knee Kettlebell Load)',
    'fam-elevated-ankle-dorsiflexion',
    'Equipment',
    'Kettlebell Knee-Loaded Ankle Dorsiflexion',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Vertical Distal Thigh Kettlebell Load Over Anchored Heel',
    'Deep Bent-Knee Myotendinous & Articular Yield',
    'Talocrural Dorsiflexion + Active End-Range Tibialis Pull'
  ),
  'wu-banded-ankle-dorsiflexion': entry(
    'Mulligan Mobilization-With-Movement (MWM) — Anterior Tibial / Posterior Talar Glide Dorsiflexion',
    'fam-elevated-ankle-dorsiflexion',
    'Progression',
    'Banded Posterior Talar Glide (MWM)',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Combined Anterior Tibial Shift + Posterior Elastic Talar Traction',
    'Joint-Cleared End-Range Arthrokinematic Glide',
    'Posterior Talar Glide With Anterior Closed-Chain Tibial Advancement'
  ),
  'wu-cat-cow-child-pose': entry(
    'Quadruped Global Spinal Flexion/Extension & Lat/Thoracic Posterior Rock-Back',
    'fam-thoracic-mobility',
    'Base',
    'Quadruped Cat-Cow & Child Pose Decompression',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Minimal Gravity-Assisted Lumbar Traction',
    'Active End-Range Articular Glide',
    'Cervical, Thoracic & Lumbar Flexion/Extension + Hip Flexion'
  ),
  'wu-thoracic-open-book': entry(
    'Sidelying Thoracic Axial Rotation With Hip-Locked Lumbar Neutralization',
    'fam-thoracic-mobility',
    'Angle / Stance',
    'Sidelying Hip-Blocked Thoracic Open-Book',
    'Transverse',
    'Open / Mixed Kinetic Chain',
    'Unilateral',
    'Gravity-Assisted End-Range Ribcage Opening',
    'Smooth End-Range Rotational Yield',
    'Thoracic Rotation & Pectoral Horizontal Extension'
  ),
  'wu-wall-angel-slides': entry(
    'Dorsally Braced Closed-Chain Overhead Scapular Upward Rotation & Lower-Trapezius Activation',
    'fam-thoracic-mobility',
    'Progression',
    'Wall-Braced Scapular Upward Rotation Slide',
    'Frontal / Sagittal',
    'Closed Kinetic Chain (Dorsal Wall Reference)',
    'Bilateral',
    'Wall-Guided Isometric Anti-Extension Alignment',
    'Peak Demand at Overhead End-Range Flexion',
    'Scapular Upward Rotation, Posterior Tilt & Shoulder Flexion'
  ),
  'wu-scapular-pull-up': entry(
    'Suspended Closed-Chain Scapular Depression & Upward/Downward Rotation Control',
    'fam-vertical-pull',
    'Progression',
    'Straight-Arm Active Hang Scapular Pull-Up',
    'Frontal / Vertical',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Axial Vertical Bodyweight Suspension',
    'Ascending Squeeze at Peak Scapular Depression',
    'Scapular Depression & Retraction (Extended Elbows)'
  ),
  'wu-worlds-greatest-stretch': entry(
    'Split-Stance Hip Extension, Ankle Dorsiflexion & Thoracic Transverse Rotation Flow',
    'fam-hip-mobility',
    'Progression',
    'Tri-Planar Lunge & Thoracic Rotation',
    'Multi-Planar',
    'Closed Kinetic Chain (CKC)',
    'Alternating Unilateral',
    'Bodyweight Tri-Planar End-Range Stretch',
    'Active Myofascial Lengthening',
    'Hip Flexion/Extension + Thoracic Rotation + Knee Extension'
  ),
  'wu-kettlebell-halo': entry(
    'Standing Multi-Planar Glenohumeral Circumduction & Scapular Upward/Downward Glide',
    'fam-thoracic-mobility',
    'Equipment',
    'Orbital Kettlebell Scapular Halo',
    'Multi-Planar',
    'Open Kinetic Chain (OKC)',
    'Bilateral / Orbital',
    '360° Orbital Centrifugal Load',
    'Constant Anti-Extension Core Demand',
    'Shoulder Circumduction, Flexion, Abduction & Scapular Glide'
  ),
  'wu-passive-dead-hang': entry(
    'Suspended Overhead Glenohumeral Flexion & Axial Lumbar Intervertebral Traction',
    'fam-spinal-decompression',
    'Base',
    'Overhead Pull-Up Bar Hang',
    'Sagittal / Axial',
    'Closed Kinetic Chain (Arms Fixed)',
    'Bilateral',
    'Vertical Inferior Axial Traction',
    'Constant Bodyweight Decompression',
    'Full Shoulder Elevation, Scapular Upward Rotation & Spinal Traction'
  ),

  // === 2. SQUATS & KNEE FLEXION ===
  'ex-spanish-squat': entry(
    'Bilateral Closed-Chain Anchored Knee Extension — Anterior Tibial Strap Shear Elimination',
    'fam-bilateral-squat',
    'Equipment',
    'Posterior-Band Anchored Upright Squat',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Postero-Anterior Knee Tether + Vertical Gravity',
    'Descending/Peak Tension in Mid-Flexion',
    'Knee Flexion/Extension with Vertical Shank Alignment'
  ),
  'ex-back-squat': entry(
    'Bilateral Closed-Chain High/Low-Bar Barbell Squat — Axial Spinal Compression',
    'fam-bilateral-squat',
    'Base',
    'Axial Posterior-Chain Balanced Back Squat',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Axial Compressive Load',
    'Descending (Hardest at Parallel Sticking Point)',
    'Simultaneous Hip Flexion/Extension, Knee Flexion/Extension & Ankle Dorsiflexion'
  ),
  'ex-barbell-front-squat': entry(
    'Bilateral Closed-Chain Anterior-Shelf Barbell Squat — Vertical Torso Knee-Dominant',
    'fam-bilateral-squat',
    'Angle / Stance',
    'Anterior Clavicular-Rack Squat',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Anterior-Superior Axial Load',
    'Descending (Peak Knee Moment Arm at Bottom)',
    'Maximal Knee Flexion/Extension & Thoracic Extension'
  ),
  'ex-barbell-box-squat': entry(
    'Bilateral Closed-Chain Box-Delimited Barbell Squat — Pause-Initiated Hip Extension',
    'fam-box-squat',
    'Equipment',
    'Loaded Barbell Box Squat',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Axial Load + Bench Pause Deload',
    'Concentric Break from Static Box Pause',
    'Vertical-Shin Hip Flexion/Extension & Knee Extension'
  ),
  'ex-barbell-zercher-squat': entry(
    'Bilateral Closed-Chain Antecubital-Rack Barbell Squat — Anterior Core & Upper-Back Torque',
    'fam-bilateral-squat',
    'Angle / Stance',
    'Cubital Fossa Anterior Barbell (Zercher)',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Low Anterior Torso Moment Arm',
    'Descending (High Thoracic Anti-Flexion Demand)',
    'Deep Hip & Knee Flexion/Extension + Isometric Elbow Flexion'
  ),
  'ex-dumbbell-cyclist-squat': entry(
    'Bilateral Closed-Chain Heels-Elevated Narrow-Stance Squat — Maximal Anterior Knee Moment',
    'fam-bilateral-squat',
    'Angle / Stance',
    'Heels-Elevated Narrow Cyclist Squat (VMO)',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Bilateral Dumbbell Hang',
    'Descending (Lengthened Quad Overload)',
    'Extreme Knee Flexion/Extension with Minimal Ankle Constraint'
  ),
  'ex-dumbbell-goblet-squat': entry(
    'Bilateral Closed-Chain Anterior Sternal Dumbbell Squat — Counterbalanced Upright Torso',
    'fam-bilateral-squat',
    'Equipment',
    'Sternal Counterbalance Dumbbell Goblet',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Anterior Center-of-Mass Counterbalance',
    'Descending (Uniform Bottom Range)',
    'Full-Depth Hip & Knee Flexion/Extension + Ankle Dorsiflexion'
  ),
  'ex-kettlebell-goblet-squat': entry(
    'Bilateral Closed-Chain Anterior Kettlebell Prying Squat — Hip Adductor Capsular Opening',
    'fam-bilateral-squat',
    'Equipment',
    'Prying Kettlebell Goblet Squat',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Anterior Kettlebell Counterbalance + Isometric Prying',
    'End-Range Lengthened Mobility + Strength',
    'Deep Knee/Hip Flexion + Active Hip External Rotation'
  ),
  'ex-bodyweight-box-squat': entry(
    'Bilateral Closed-Chain Unloaded Box Squat — Posterior Sit-Back Motor Patterning',
    'fam-box-squat',
    'Base',
    'Bodyweight Box Control Squat',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Bodyweight Vertical Vector',
    'Uniform Controlled Eccentric',
    'Hip-Initiated Flexion/Extension to Parallel Target'
  ),
  'ex-wall-sit': entry(
    'Bilateral Closed-Chain Isometric 90° Knee-Flexion Hold — Shear-Reduced Quad Endurance',
    'fam-bilateral-squat',
    'Progression',
    '90° Wall-Braced Isometric Hold',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Gravity + Horizontal Wall Reaction',
    'Constant Isometric Knee Extensor Torque',
    'Isometric 90° Hip & Knee Flexion Hold'
  ),
  'ex-pistol-squat': entry(
    'Unilateral Closed-Chain Full-Depth Free-Space Single-Leg Squat — High Balance & Strength',
    'fam-unilateral-squat',
    'Base',
    'Free-Space Single-Leg Pistol Squat',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    '100% Unilateral Bodyweight Vertical Vector',
    'Descending (Peak Force in Bottom Hole)',
    'Maximal Unilateral Hip/Knee Flexion & Ankle Dorsiflexion'
  ),
  'ex-reverse-nordic-curl': entry(
    'Bilateral Kneeling Closed-Chain Eccentric Knee Extension — Biarticular Rectus Femoris Stretch',
    'fam-quad-knee-extension',
    'Base',
    'Kneeling Full-Length Quad Eccentric',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Posterior Gravity Torque Over Knee Axis',
    'Ascending Lever Arm with Backward Lean',
    'Pure Knee Flexion (Eccentric) / Extension (Concentric) at Fixed Extended Hip'
  ),

  // === 3. HIP HINGES & GLUTES ===
  'ex-romanian-deadlift': entry(
    'Bilateral Closed-Chain Top-Down Barbell Hip Hinge — Peak Mid-Range Hamstring Torque',
    'fam-rdl',
    'Base',
    'Conventional Bilateral Barbell RDL',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Gravity (Max Hip Moment at Horizontal Torso)',
    'Peak Tension at 60–90° Hip Flexion (Lengthened)',
    'Hip Flexion/Extension with Fixed 15° Knee Angle'
  ),
  'ex-barbell-deadlift': entry(
    'Bilateral Closed-Chain Floor-Pull Conventional Deadlift — Total Posterior Chain Max Force',
    'fam-floor-deadlift',
    'Base',
    'Conventional Stance Barbell Floor Pull',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Axial/Shear Floor Pull',
    'Peak Difficulty Off Floor (Overcoming Inertia)',
    'Coordinated Hip Extension, Knee Extension & Spinal Isometric Bracing'
  ),
  'ex-barbell-sumo-deadlift': entry(
    'Bilateral Closed-Chain Wide-Stance Externally Rotated Barbell Pull — Reduced Lumbar Moment Arm',
    'fam-floor-deadlift',
    'Angle / Stance',
    'Wide Sumo Stance · Barbell',
    'Sagittal / Frontal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Floor Pull with Shorter Horizontal Torso',
    'Max Starting Drive From Floor (Adductors/Quads/Glutes)',
    'Abducted Hip Extension + Knee Extension'
  ),
  'ex-dumbbell-romanian-deadlift': entry(
    'Bilateral Closed-Chain Neutral-Hand Dumbbell Hip Hinge — Center-of-Mass Aligned Path',
    'fam-rdl',
    'Equipment',
    'Dual Dumbbell Lateral-Thigh Hinge',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Gravity Aligned with Hip Pivot',
    'Peak Tension in Lengthened Bottom Position',
    'Pure Hip Flexion/Extension'
  ),
  'ex-barbell-good-morning': entry(
    'Bilateral Closed-Chain High-Bar Long-Lever Hip Hinge — Extended Spinal-Erector & Hamstring Moment',
    'fam-rdl',
    'Angle / Stance',
    'C7 Cervical-Rack Long-Lever Hinge (Good Morning)',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Gravity at Upper-Trapezius Bar Lever',
    'Extreme Peak Moment at Horizontal Torso',
    'Hip Flexion/Extension Against Long Torso Moment Arm'
  ),
  'ex-b-stance-rdl': entry(
    'Asymmetric Split-Stance (90/10 Load) Dumbbell Hip Hinge — Unilateral Overload with Stability',
    'fam-rdl',
    'Angle / Stance',
    'Asymmetric Kickstand (B-Stance)',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Asymmetric Unilateral Bias',
    'Vertical Bilateral Dumbbell Load on Lead Hip',
    'Lengthened Mid/Bottom Range Bias',
    'Unilateral Lead-Leg Hip Flexion/Extension + Anti-Rotation'
  ),
  'ex-single-leg-kettlebell-rdl': entry(
    'Unilateral Single-Leg Contralateral Kettlebell Hip Hinge — Anti-Rotation Hip Control',
    'fam-rdl',
    'Unilateral',
    'Contralateral Single-Leg Kettlebell',
    'Sagittal / Transverse',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Contralateral Vertical Vector Creating Internal-Rotation Demand',
    'Peak Tension in Lengthened Hinge + Stance Stability',
    'Unilateral Hip Flexion/Extension + Hip Medius/Rotator Anti-Rotation'
  ),
  'ex-kettlebell-sumo-deadlift': entry(
    'Bilateral Closed-Chain Wide-Stance Kettlebell Floor Pull — Vertical Torso Hinge-Squat Hybrid',
    'fam-floor-deadlift',
    'Equipment',
    'Wide Sumo Stance · Kettlebell',
    'Sagittal / Frontal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Centered Vertical Line of Pull Between Heels',
    'Even Quad/Adductor/Glute Load Curve',
    'Externally Rotated Hip & Knee Extension'
  ),
  'ex-barbell-hip-thrust': entry(
    'Bilateral Bench-Supported Horizontal-Vector Hip Extension — Peak Shortened Glute Torque',
    'fam-hip-thrust',
    'Base',
    'Standard Bilateral Barbell Hip Thrust',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Antero-Posterior Horizontal Vector Relative to Spine',
    'Ascending (Max Hip Extension Moment at 0° Lockout)',
    'Isolated Hip Extension with Isometric 90° Knee Flexion'
  ),
  'ex-b-stance-hip-thrust': entry(
    'Asymmetric Bench-Supported Barbell Hip Extension — Unilateral Lead-Glute Bias',
    'fam-hip-thrust',
    'Angle / Stance',
    'Asymmetric B-Stance Hip Thrust',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Asymmetric Unilateral Bias',
    'Antero-Posterior Horizontal Pelvic Vector',
    'Ascending (Max Lockout Unilateral Peak)',
    'Unilateral Hip Extension + Pelvic Anti-Tilt'
  ),
  'ex-glute-bridge': entry(
    'Bilateral Floor-Supported Supine Hip Extension — Neutral Lumbar Pelvic Posterior Tilt',
    'fam-glute-bridge',
    'Base',
    'Bilateral Floor Glute Bridge',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Pelvis Lift Against Floor Fulcrum',
    'Ascending (Peak Tension at Full Hip Lockout)',
    'Hip Extension & Active Posterior Pelvic Tilt'
  ),
  'ex-glute-bridge-reach': entry(
    'Supine Floor Hip Extension Coupled with Diagonal Overhead Thoracic Rotation & Reach',
    'fam-glute-bridge',
    'Progression',
    'Bridge + Overhead Thoracic Reach Mobility',
    'Multi-Planar',
    'Closed Kinetic Chain (CKC)',
    'Alternating Diagonal',
    'Vertical Pelvic Lift + Diagonal Upper-Spine Reach',
    'End-Range Anterior Chain & T-Spine Opening',
    'Hip Extension + Thoracic Rotation & Shoulder Flexion'
  ),
  'ex-elevated-single-leg-glute-bridge': entry(
    'Unilateral Heel-Elevated Bench Hip Extension — Extended Hip ROM & Hamstring Co-Drive',
    'fam-glute-bridge',
    'Unilateral',
    'Single-Leg Heel-Elevated Bench Bridge',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Vertical/Diagonal Heel-Fulcrum Extension',
    'Ascending (Peak Shortened Lockout)',
    'Full-ROM Unilateral Hip Extension + Pelvic Anti-Drop'
  ),
  'ex-quadruped-banded-glute-kickback': entry(
    'Quadruped Open-Chain Hip Extension Against Elastic Vector — Shortened Gluteus Maximus Peak',
    'fam-glute-bridge',
    'Unilateral',
    'Quadruped Open-Chain Elastic Kickback',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Unilateral',
    'Diagonal Postero-Superior Elastic Vector',
    'Ascending (Max Band Stretch at Full Hip Extension)',
    'Pure Hip Extension at Fixed Lumbar Neutrality'
  ),
  'ex-seated-banded-hamstring-curl': entry(
    'Seated Flexed-Hip Open-Chain Knee Flexion — Pre-Stretched Long-Head Hamstring Bias',
    'fam-hamstring-curl',
    'Base',
    'Seated Flexed-Hip Banded Curl',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Anterior Elastic Pulling Line',
    'Ascending Toward Peak 110° Knee Flexion',
    'Pure Knee Flexion at 90° Fixed Hip Flexion'
  ),
  'ex-prone-banded-leg-curl': entry(
    'Prone Extended-Hip Open-Chain Knee Flexion — Short-Head Biceps Femoris & Gastroc Synergy',
    'fam-hamstring-curl',
    'Angle / Stance',
    'Prone Extended-Hip Banded Curl',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Distal Posterior Elastic Line',
    'Ascending Toward Full Heel-to-Glute Flexion',
    'Isolated Knee Flexion at 0° Extended Hip'
  ),
  'ex-glute-bridge-walkout': entry(
    'Supine Isometrically Bridged Eccentric Heel Walkout — Incremental Knee-Flexor Loading',
    'fam-hamstring-curl',
    'Angle / Stance',
    'Eccentric Bridge Heel Walkout',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Alternating Bilateral',
    'Posterior Pelvic Isometric + Elongating Hamstring Lever',
    'Max Tension at Long Knee-Extended Stride',
    'Alternating Knee Extension/Flexion Under Sustained Hip Extension'
  ),
  'ex-sliding-hamstring-curl': entry(
    'Supine Closed-Chain Biarticular Hip-Extension & Slider Knee-Flexion Curl',
    'fam-hamstring-curl',
    'Progression',
    'Closed-Chain Biarticular Slider Curl',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Bodyweight Shear & Vertical Support',
    'Ascending During Concentric Bridge Draw',
    'Simultaneous Knee Flexion & Isometric/Dynamic Hip Extension'
  ),
  'ex-nordic-hamstring-curl': entry(
    'Kneeling Ankle-Anchored Supramaximal Eccentric Knee Extension — Distal Biceps Femoris Adaptation',
    'fam-hamstring-curl',
    'Progression',
    'Supramaximal Eccentric Nordic Curl',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Full Torso Bodyweight Forward Cantilever',
    'Exponentially Ascending Gravity Lever Toward Floor',
    'Eccentric-Emphasized Knee Extension at Neutral 0° Hip'
  ),

  // === 4. UPPER BODY PUSH ===
  'ex-barbell-bench-press': entry(
    'Supine Bilateral Horizontal Shoulder Adduction & Elbow Extension — Fixed Barbell Path',
    'fam-bench-press',
    'Base',
    'Flat Barbell Sternal Bench Press',
    'Transverse / Horizontal',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Vertical Gravity Perpendicular to Torso',
    'Descending (Peak Pectoral Moment at Bottom Chest Touch)',
    'Shoulder Horizontal Adduction + Elbow Extension'
  ),
  'ex-incline-barbell-bench-press': entry(
    '30° Incline Bilateral Barbell Press — Clavicular Pectoralis & Anterior Deltoid Alignment',
    'fam-bench-press',
    'Angle / Stance',
    '30° Incline · Barbell',
    'Transverse / Oblique',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Vertical Gravity Relative to 30° Inclined Torso',
    'Descending (Lower Clavicular Touch Sticking Point)',
    'Oblique Shoulder Flexion/Horizontal Adduction + Elbow Extension'
  ),
  'ex-incline-dumbbell-bench-press': entry(
    '30° Incline Independent Dumbbell Press — Unrestricted Scapular-Plane Convergence Path',
    'fam-bench-press',
    'Equipment',
    '30° Incline · Independent Dumbbells',
    'Transverse / Oblique',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Independent Vertical Dumbbell Vectors',
    'Descending + Peak Adduction Convergence at Lockout',
    'Shoulder Flexion/Horizontal Adduction with Independent Stabilization'
  ),
  'ex-dumbbell-floor-press': entry(
    'Supine Floor-Stopped Bilateral Dumbbell Press — Elbow-Depth Limited Lockout & Triceps Emphasis',
    'fam-floor-press',
    'Base',
    'Bilateral Floor-Stopped Dumbbell Press',
    'Transverse',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Vertical Gravity Deloaded at Floor Triceps Touch',
    'Dead-Stop Mid-Range to Lockout Curve',
    'Mid-Range Shoulder Horizontal Adduction + Triceps Elbow Extension'
  ),
  'ex-kettlebell-floor-press': entry(
    'Supine Alternating Floor-Stopped Kettlebell Press — Anti-Rotation Torso & Wrist Stability',
    'fam-floor-press',
    'Equipment',
    'Alternating Offset Kettlebells',
    'Transverse / Anti-Rotation',
    'Open Kinetic Chain (OKC)',
    'Alternating Unilateral',
    'Vertical Gravity with Offset Posterior Bell Mass',
    'Dead-Stop Floor Concentric + Anti-Rotation Core',
    'Alternating Horizontal Adduction + Elbow Extension + Core Anti-Twist'
  ),
  'ex-push-up': entry(
    'Prone Closed-Chain Horizontal Push — Unrestricted Scapular Protraction & Serriatus Action',
    'fam-push-up',
    'Base',
    'Standard Floor Bodyweight Push-Up',
    'Transverse',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Bodyweight (~64–70% Load Distribution)',
    'Uniform to Descending Near Chest Touch',
    'Shoulder Horizontal Adduction + Elbow Extension + Scapular Protraction'
  ),
  'ex-incline-push-up': entry(
    'Elevated-Hand Closed-Chain Push-Up — Reduced Leverage & Lower-Sternal Force Vector',
    'fam-push-up',
    'Angle / Stance',
    'Hands Elevated (~40–50% Bodyweight Load)',
    'Transverse / Declined Torso',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Gravity at Elevated Fulcrum',
    'Scaled Closed-Chain Resistance Curve',
    'Horizontal Adduction + Elbow Extension + Core Anti-Extension'
  ),
  'ex-decline-push-up': entry(
    'Elevated-Foot Closed-Chain Push-Up — Increased Bodyweight Load & Clavicular Fiber Shift',
    'fam-push-up',
    'Angle / Stance',
    'Feet Elevated (Clavicular Bias, ~75%+ Load)',
    'Transverse / Oblique',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Gravity Shifted Toward Upper Torso',
    'Descending (Peak Clavicular Pec & Anterior Delt Demand)',
    'Declined-Torso Shoulder Flexion/Adduction + Elbow Extension'
  ),
  'ex-parallel-bar-dip': entry(
    'Suspended Forward-Leaning Closed-Chain Compound Press — Maximal Lower Pectoral Extension',
    'fam-push-up',
    'Progression',
    'Parallel Bar Full-Bodyweight Chest Dip',
    'Sagittal / Oblique',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    '100% Bodyweight Suspended Vertical Gravity',
    'Descending (Max Pectoral Stretch in Deep Bottom)',
    'Shoulder Flexion + Scapular Depression + Elbow Extension'
  ),
  'ex-dumbbell-chest-fly': entry(
    'Supine Open-Chain Single-Joint Glenohumeral Horizontal Adduction — Long-Length Pec Stretch',
    'fam-chest-fly',
    'Base',
    'Flat Bench · Dumbbell Stretch Curve',
    'Transverse',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Vertical Gravity (Max Horizontal Moment Arm at Full Abduction)',
    'Descending (Max Tension at Bottom Stretch, Zero at Lockout)',
    'Pure Glenohumeral Horizontal Adduction at Fixed 15° Elbow Flexion'
  ),
  'ex-incline-dumbbell-chest-fly': entry(
    '30° Incline Open-Chain Glenohumeral Horizontal Adduction — Clavicular Pectoral Alignment',
    'fam-chest-fly',
    'Angle / Stance',
    '30° Incline · Clavicular Fiber Alignment',
    'Transverse / Oblique',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Vertical Gravity Perpendicular to Upper Pectoral Fibers',
    'Descending (Deep Upper-Chest Stretch Peak)',
    'Oblique Shoulder Horizontal Adduction at Fixed Soft Elbow'
  ),
  'ex-banded-chest-fly': entry(
    'Standing Open-Chain Elastic Horizontal Adduction — Ascending Peak-Shortened Contraction',
    'fam-chest-fly',
    'Equipment',
    'Standing Band (Peak Contraction Curve)',
    'Transverse',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Horizontal Postero-Anterior Elastic Tension',
    'Ascending (Maximum Tension When Hands Cross Midline)',
    'Full-ROM Shoulder Horizontal Adduction Against Elastic Vector'
  ),
  'ex-barbell-overhead-press': entry(
    'Standing Strict Bilateral Vertical Shoulder Press — Axial Trunk & Upward Scapular Drive',
    'fam-overhead-press',
    'Base',
    'Standing Bilateral Barbell Strict Press',
    'Frontal / Scapular',
    'Open Kinetic Chain (OKC Hands / CKC Legs)',
    'Bilateral',
    'Vertical Axial Gravity Vector',
    'Descending (Hardest Clearing Chin/Forehead)',
    'Shoulder Abduction/Flexion + Scapular Upward Rotation + Elbow Extension'
  ),
  'ex-seated-dumbbell-overhead-press': entry(
    'Seated Bilateral Dumbbell Vertical Press — Scapular-Plane Overhead Alignment',
    'fam-overhead-press',
    'Equipment',
    'Seated Neutral/Scapular Plane Dumbbells',
    'Frontal / Scapular (~30°)',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Independent Vertical Vectors Above Glenoid',
    'Descending (Bottom-Mid Range Deltoid Peak)',
    'Scapular-Plane Shoulder Abduction + Elbow Extension'
  ),
  'ex-pike-push-up': entry(
    'Inverted V-Hinge Closed-Chain Overhead Press — Bodyweight Deltoid & Upper-Trap Loading',
    'fam-overhead-press',
    'Progression',
    'Closed-Chain Inverted Pike Press',
    'Frontal / Vertical',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Inverted Vertical Bodyweight Vector',
    'Descending (Max Demand Near Floor Crown Touch)',
    'Overhead Shoulder Flexion/Abduction + Upward Scapular Rotation + Elbow Extension'
  ),
  'ex-dumbbell-lateral-raise': entry(
    'Standing Scapular-Plane Open-Chain Shoulder Abduction — Medial Deltoid Long Moment Arm',
    'fam-lateral-deltoid',
    'Base',
    'Scapular-Plane Dumbbell Abduction',
    'Frontal / Scapular (~30°)',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Vertical Gravity (Max Horizontal Lever at 90° Abduction)',
    'Ascending (Peak Torque at 75–90° Horizontal)',
    'Pure Glenohumeral Abduction in the Scapular Plane'
  ),
  'ex-barbell-upright-row': entry(
    'Standing Wide-Grip Compound Shoulder Abduction & Elbow Flexion — Deltoid/Upper-Trap Synergy',
    'fam-lateral-deltoid',
    'Equipment',
    'Wide-Grip Multi-Joint Barbell Abduction Pull',
    'Frontal',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Vertical Barbell Lift Along Anterior Torso',
    'Ascending Toward Lower Chest Height',
    'Shoulder Abduction + Scapular Elevation + Elbow Flexion'
  ),
  'ex-triceps-chair-dip': entry(
    'Bench-Supported Closed-Chain Vertical Push — Triceps Lateral & Medial Head Emphasis',
    'fam-triceps-extension',
    'Angle / Stance',
    'Bench-Supported Closed-Chain Bodyweight Dip',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Gravity Distributed Across Hands & Heels',
    'Mid-Range Extension Lockout Focus',
    'Elbow Extension Coupled with Shoulder Extension'
  ),
  'ex-lying-dumbbell-triceps-extension': entry(
    'Supine 90° Shoulder-Flexed Open-Chain Elbow Extension — Mid-Length Triceps Long-Head Bias',
    'fam-triceps-extension',
    'Base',
    'Supine Flat Bench Dumbbell Skullcrusher',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral (Overhead Bar/DB Arc)',
    'Vertical Gravity Creating Rotational Elbow Moment',
    'Peak Tension at Forearm Horizontal (~90° Elbow)',
    'Pure Humero-Ulnar Elbow Extension with Stabilized 90–110° Humerus'
  ),
  'ex-overhead-dumbbell-triceps-extension': entry(
    'Seated/Standing 170° Overhead Elbow Extension — Maximal Biarticular Long-Head Lengthening',
    'fam-triceps-extension',
    'Angle / Stance',
    'Overhead Long-Head Stretch · Dumbbell',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral Symmetrical Hold',
    'Vertical Gravity Behind Cervical Flexed Elbow Axis',
    'Descending (Peak Long-Head Stretch Tension Behind Head)',
    'Full-ROM Elbow Extension Under Maximal Shoulder Flexion'
  ),
  'ex-overhead-kettlebell-triceps-extension': entry(
    'Standing Overhead Horn-Grip Kettlebell Elbow Extension — Posterior Bell Pendulum Stretch',
    'fam-triceps-extension',
    'Equipment',
    'Overhead Long-Head Stretch · Kettlebell',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral Symmetrical Hold',
    'Vertical Gravity on Offset Kettlebell Bell Sphere',
    'Descending (Deep Long-Head Stretch Behind Neck)',
    'Full-ROM Elbow Extension with Core Ribcage Stabilization'
  ),
  'ex-kettlebell-floor-skullcrusher': entry(
    'Supine Floor-Stopped Kettlebell Elbow Extension — Constant Scapular Support & Neutral Grip',
    'fam-triceps-extension',
    'Equipment',
    'Supine Floor Dead-Stop · Kettlebell',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral Hold',
    'Vertical Gravity Deloaded at Floor Touch',
    'Mid-Range Concentric Acceleration',
    'Isolated Elbow Extension with Neutral Wrists'
  ),
  'ex-sphinx-push-up': entry(
    'Prone Forearm-Plank Closed-Chain Elbow Extension — Bodyweight Triceps & Anti-Extension Core',
    'fam-triceps-extension',
    'Progression',
    'Closed-Chain Bodyweight Forearm Extension',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Diagonal Bodyweight Lever Over Forearms',
    'Ascending Leverage Demand Toward Plank Bottom',
    'Bilateral Elbow Extension Combined with Anterior Core Bracing'
  ),

  // === 5. UPPER BODY PULL ===
  'ex-pull-up': entry(
    'Suspended Pronated Closed-Chain Vertical Pull — Glenohumeral Adduction & Scapular Depression',
    'fam-vertical-pull',
    'Base',
    'Pronated Overhand Grip (Lats & Lower Traps)',
    'Frontal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Gravity Lifting 100% Bodyweight',
    'Ascending Difficulty Clearing Chin Above Bar',
    'Shoulder Adduction + Scapular Depression/Retraction + Elbow Flexion'
  ),
  'ex-chin-up': entry(
    'Suspended Supinated Closed-Chain Vertical Pull — Sagittal Shoulder Extension & Peak Biceps Torque',
    'fam-vertical-pull',
    'Grip',
    'Supinated Underhand Grip (Biceps & Lat Extension)',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Gravity Against Supinated Flexors & Lats',
    'Ascending Peak Near Clavicular Bar Touch',
    'Shoulder Extension + Scapular Depression + Supinated Elbow Flexion'
  ),
  'ex-neutral-grip-pull-up': entry(
    'Suspended Neutral-Wrist Vertical Pull — Shoulder-Friendly Scapular Plane & Brachioradialis Bias',
    'fam-vertical-pull',
    'Grip',
    'Parallel Neutral Grip (Joint-Friendly Lats)',
    'Sagittal / Scapular',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Gravity Aligned with Neutral Humerus',
    'Balanced Mid-Range & Top Lockout Drive',
    'Shoulder Extension/Adduction + Neutral-Grip Elbow Flexion'
  ),
  'ex-dumbbell-pullover': entry(
    'Supine Open-Chain Overhead Shoulder Extension Arc — Stretched Latissimus & Serratus Torque',
    'fam-vertical-pull',
    'Equipment',
    'Supine Open-Chain Arc Pullover',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral Symmetrical Hold',
    'Vertical Gravity Creating Rotational Shoulder Moment',
    'Descending (Max Lat/Pec Stretch Overhead)',
    'Pure Shoulder Extension from 170° Overhead to 90° Vertical'
  ),
  'ex-barbell-bent-over-row': entry(
    'Bilateral Suspended 45° Hinge Barbell Horizontal Pull — Mid-Trapezius & Lat Mass Builder',
    'fam-horizontal-row',
    'Base',
    '45° Pronated Barbell Bent-Over Row',
    'Sagittal / Horizontal',
    'Open Kinetic Chain (Arms) / CKC Isometric Hinge',
    'Bilateral',
    'Vertical Gravity Opposite 45° Torso Angle',
    'Ascending (Max Lever When Bar Touches Lower Ribcage)',
    'Shoulder Extension + Scapular Retraction + Elbow Flexion'
  ),
  'ex-barbell-pendlay-row': entry(
    'Horizontal-Torso Dead-Stop Floor Barbell Pull — Explosive Concentric Mid-Back & Erector Power',
    'fam-horizontal-row',
    'Angle / Stance',
    'Horizontal Torso · Floor Dead-Stop (Pendlay)',
    'Sagittal / Horizontal',
    'Open Kinetic Chain (Arms) / CKC Static Hinge',
    'Bilateral',
    'Perpendicular 90° Vertical Pull Against Parallel Spine',
    'Uniform High Concentric Acceleration Off Floor',
    'Rapid Shoulder Extension & Scapular Retraction From Static Dead-Stop'
  ),
  'ex-underhand-barbell-row': entry(
    '70° Upright Supinated Barbell Row — Lower Latissimus Attachment & Biceps Alignment (Yates)',
    'fam-horizontal-row',
    'Grip',
    'Supinated Grip · Upright Torso (Yates)',
    'Sagittal',
    'Open Kinetic Chain (Arms) / CKC Hinge',
    'Bilateral',
    'Vertical Gravity Along Tucked Sagittal Elbow Path',
    'Ascending (Peak Contraction at Lower Abdomen)',
    'Tight-Elbow Shoulder Extension + Supinated Elbow Flexion'
  ),
  'ex-dumbbell-bent-over-row': entry(
    '3-Point Bench-Supported Unilateral Dumbbell Pull — Zero Axial Spine Shear & Full Scapular ROM',
    'fam-unilateral-row',
    'Base',
    '3-Point Bench Support · Dumbbell',
    'Sagittal',
    'Open Kinetic Chain (Working Arm)',
    'Unilateral',
    'Vertical Gravity Sweeping Arc Toward Ipsilateral Hip',
    'Ascending (Peak Tension in Retracted Top Position)',
    'Unilateral Shoulder Extension + Scapular Protraction/Retraction'
  ),
  'ex-single-arm-kettlebell-row': entry(
    '3-Point Bench-Supported Unilateral Kettlebell Row — Deep Offset Hanging Protraction Stretch',
    'fam-unilateral-row',
    'Equipment',
    '3-Point Bench Support · Kettlebell',
    'Sagittal',
    'Open Kinetic Chain (Working Arm)',
    'Unilateral',
    'Vertical Gravity With Extended Kettlebell Handle Drop',
    'Ascending (Anti-Rotation Trunk Bracing Peak)',
    'Unilateral Shoulder Extension + Scapular Gliding'
  ),
  'ex-kettlebell-gorilla-row': entry(
    'Wide Sumo-Stance Floor-Anchored Alternating Kettlebell Row — Anti-Rotation Isometric Hinge',
    'fam-unilateral-row',
    'Angle / Stance',
    'Wide Sumo Hinge · Contralateral Bell Brace',
    'Sagittal / Anti-Rotation',
    'Open Kinetic Chain (Pull Arm) / CKC Floor Brace',
    'Alternating Unilateral',
    'Floor Reaction Stabilization + Vertical Alternating Pull',
    'Dead-Stop Acceleration + Oblique Anti-Rotation',
    'Alternating Shoulder Extension & Scapular Retraction in Deep Hinge'
  ),
  'ex-reverse-snow-angel': entry(
    'Prone Floor Open-Chain Horizontal Abduction & External Rotation — Lower Trap & Rhomboid Control',
    'fam-posterior-deltoid',
    'Angle / Stance',
    'Prone Gravity-Resisted Scapular Sweep',
    'Transverse / Frontal Arc',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Horizontal Gravity Over Long Straight-Arm Lever',
    'Constant End-Range Isometric Scapular Depression',
    'Shoulder Extension, External Rotation & Scapular Retraction/Depression'
  ),
  'ex-dumbbell-rear-delt-fly': entry(
    'Hinged Open-Chain Glenohumeral Horizontal Abduction — Isolated Posterior Deltoid Moment',
    'fam-posterior-deltoid',
    'Base',
    'Hinged Bilateral Rear-Delt Fly',
    'Transverse',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Vertical Gravity Opposite Hinged Spine',
    'Ascending (Peak Torque at Horizontal Arm Elevation)',
    'Pure Shoulder Horizontal Abduction at Fixed Soft Elbow'
  ),
  'ex-incline-dumbbell-ytw-raise': entry(
    'Chest-Supported Prone Incline Multi-Vector Scapular Raise (Y-T-W) — Rotator & Lower-Trap Prehab',
    'fam-posterior-deltoid',
    'Equipment',
    'Chest-Supported Incline Bench Y-T-W',
    'Multi-Planar (Scapular/Transverse)',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Vertical Gravity at Extended Lever Angles (135°/90°/45°)',
    'Ascending (Peak Moment at Full Horizontal Elevation)',
    'Scapular Upward Rotation (Y), Retraction (T), & External Rotation (W)'
  ),
  'ex-kettlebell-shrug': entry(
    'Standing Bilateral Vertical Scapular Elevation — Upper Trapezius & Levator Scapulae Line of Pull',
    'fam-trapezius-shrug',
    'Base',
    'Standing Dual-Kettlebell Scapular Elevation',
    'Frontal / Vertical',
    'Open Kinetic Chain (Shoulder Girdle)',
    'Bilateral',
    'Vertical Gravity Through Extended Arms',
    'Constant Linear Vertical Tension',
    'Pure Scapular Elevation & Upward Rotation'
  ),
  'ex-dumbbell-bicep-curl': entry(
    'Standing Bilateral Independent Elbow Flexion & Radioulnar Supination — Mid-Range Peak',
    'fam-elbow-flexion',
    'Base',
    'Supinating Independent Dumbbells',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Vertical Gravity (Max Forearm Lever at 90° Horizontal)',
    'Bell Curve (Peak Torque at 90° Elbow Flexion)',
    'Elbow Flexion + Radioulnar Supination'
  ),
  'ex-barbell-bicep-curl': entry(
    'Standing Bilateral Fixed-Supinated Barbell Elbow Flexion — Heavy Progressive Overload Profile',
    'fam-elbow-flexion',
    'Equipment',
    'Fixed Supinated Barbell',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Vertical Gravity at Symmetrical Fixed Grip',
    'Bell Curve (Peak Torque at 90° Elbow Flexion)',
    'Pure Symmetrical Elbow Flexion in Supination'
  ),
  'ex-kettlebell-bicep-curl': entry(
    'Standing Offset Kettlebell Elbow Flexion — Anteriorly Displaced Center-of-Mass Forearm Challenge',
    'fam-elbow-flexion',
    'Equipment',
    'Offset Center-of-Mass Kettlebells',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Vertical Gravity With Posterior-Hanging Kettlebell Sphere',
    'Bell Curve With Enhanced Peak Supination Torque',
    'Elbow Flexion + Wrist Neutral Stabilization'
  ),
  'ex-banded-bicep-curl': entry(
    'Standing Foot-Anchored Elastic Elbow Flexion — Ascending Peak-Shortened Tension Profile',
    'fam-elbow-flexion',
    'Equipment',
    'Ascending Elastic Resistance Band',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Vertical Elastic Line of Pull',
    'Ascending (Maximum Tension at Top Peak Contraction)',
    'Full-ROM Elbow Flexion Against Progressive Elastic Stretch'
  ),
  'ex-dumbbell-hammer-curl': entry(
    'Standing Neutral Radioulnar Elbow Flexion — Brachialis & Brachioradialis Geometric Advantage',
    'fam-elbow-flexion',
    'Grip',
    'Neutral Hammer Grip (Brachialis & Brachioradialis)',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Vertical Gravity With Forearm Midway Between Pronation/Supination',
    'Bell Curve (Peak Torque at 90° Elbow Flexion)',
    'Neutral-Wrist Humero-Ulnar/Radial Flexion'
  ),
  'ex-dumbbell-concentration-curl': entry(
    'Seated Thigh-Braced Unilateral Supinated Elbow Flexion — Zero Shoulder Momentum & Short-Head Peak',
    'fam-elbow-flexion',
    'Angle / Stance',
    'Thigh-Braced Unilateral Peak Contraction',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Unilateral',
    'Vertical Gravity Under Strictly Immobilized Humerus',
    'Bell Curve + Active Terminal Supination Twist',
    'Isolated Unilateral Elbow Flexion + Terminal Supination'
  ),
  'ex-dumbbell-zottman-curl': entry(
    'Standing Supinated Concentric / Pronated Eccentric Hybrid Curl — Total Elbow Flexor Triad',
    'fam-elbow-flexion',
    'Grip',
    'Supinated Concentric · Pronated Eccentric (Zottman)',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral Independent',
    'Vertical Gravity Paired with Top Pronation Shift',
    'Bell Curve (Dual Agonist-Shift Load)',
    'Supinated Elbow Flexion Concentric -> Pronated Forearm-Biased Eccentric'
  ),
  'ex-dumbbell-wrist-curl': entry(
    'Seated Forearm-Supported Supinated Radiocarpal Flexion — Anterior Forearm Flexor Isolation',
    'fam-forearm-wrist',
    'Base',
    'Supinated Wrist Flexion (Flexor Carpi)',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Vertical Gravity Perpendicular to Palms-Up Palm',
    'Bell Curve (Peak Torque at Horizontal Wrist)',
    'Isolated Wrist Flexion + Finger Curl Tension'
  ),
  'ex-dumbbell-wrist-extension': entry(
    'Seated Forearm-Supported Pronated Radiocarpal Extension — Posterior Forearm & Epicondyle Prehab',
    'fam-forearm-wrist',
    'Grip',
    'Pronated Wrist Extension (Extensor Carpi)',
    'Sagittal',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Vertical Gravity Opposite Pronated Knuckles',
    'Bell Curve (Peak Torque at Horizontal Forearm)',
    'Isolated Wrist Extension Under Stabilized Elbow'
  ),

  // === 6. LUNGES & UNILATERAL ===
  'ex-bulgarian-split-squat': entry(
    'Unilateral Rear-Foot-Elevated Closed-Chain Split Squat — Maximal Single-Leg Hip/Knee Moment',
    'fam-split-squat',
    'Base',
    'Rear-Foot-Elevated Dual Dumbbell Split Squat',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Vertical Bilateral Dumbbell Gravity (~85% Lead Limb)',
    'Descending (Max Lengthened Glute & Quad Stretch)',
    'Deep Unilateral Hip/Knee Flexion & Frontal Pelvic Stabilization'
  ),
  'ex-kettlebell-rack-split-squat': entry(
    'Unilateral Contralateral Front-Rack Split Squat — Vertical Torso & Anti-Lateral Spine Brace',
    'fam-split-squat',
    'Equipment',
    'Anterior Kettlebell Front-Rack',
    'Sagittal / Anti-Lateral',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Asymmetric Anterior-Rack Gravity Vector',
    'Descending (Vertical Torso Quad & Core Brace Peak)',
    'Unilateral Split-Stance Hip/Knee Extension + Trunk Anti-Lateral Flexion'
  ),
  'ex-kettlebell-goblet-lunge': entry(
    'Unilateral Split-Stance Sternal-Goblet Kettlebell Squat — Anterior Core Counterbalance',
    'fam-split-squat',
    'Equipment',
    'Anterior Sternal Kettlebell Goblet',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Anterior Sternum-Anchored Vertical Vector',
    'Uniform to Descending Bottom Lunge Control',
    'Vertical-Torso Unilateral Knee & Hip Extension'
  ),
  'ex-dumbbell-reverse-lunge': entry(
    'Dynamic Posterior-Stepping Split-Stance Lunge — Knee-Shear Friendly Hip/Quad Propulsion',
    'fam-dynamic-lunge',
    'Base',
    'Posterior Step · Dual Dumbbells',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Alternating Unilateral',
    'Vertical Gravity Over Anchored Anterior Foot',
    'Descending (Concentric Drive Through Stationary Lead Heel)',
    'Controlled Eccentric Step-Back Hip/Knee Flexion + Lead-Leg Extension'
  ),
  'ex-barbell-reverse-lunge': entry(
    'Dynamic Posterior-Stepping Axial Barbell Lunge — High Bilateral-Style Overload in Unilateral Stance',
    'fam-dynamic-lunge',
    'Equipment',
    'Posterior Step · Axial Barbell',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Alternating Unilateral',
    'Vertical Axial Compressive Spinal Load',
    'Descending (Max Unilateral Hip Extension Torque at Bottom)',
    'Loaded Posterior-Step Hip/Knee Flexion & Frontal Pelvic Stabilization'
  ),
  'ex-walking-lunge': entry(
    'Dynamic Alternating Forward Locomotion Lunge — Sequential Eccentric Deceleration & Hip Drive',
    'fam-dynamic-lunge',
    'Progression',
    'Forward Locomotive Bodyweight/Loaded Lunge',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Alternating Unilateral',
    'Vertical Gravity + Forward Momentum Braking Forces',
    'Dynamic Eccentric Deceleration + Concentric Propulsion',
    'Alternating Forward-Step Knee/Hip Flexion & Extension'
  ),
  'ex-kettlebell-forward-lunge': entry(
    'Dynamic Anterior-Stepping Dual Kettlebell Lunge — High Patellofemoral Deceleration Control',
    'fam-dynamic-lunge',
    'Angle / Stance',
    'Anterior Deceleration Step · Kettlebells',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Alternating Unilateral',
    'Vertical Hand-Level Kettlebell Vector + Anterior Braking Impulse',
    'High Eccentric Quad Deceleration + Push-Back Concentric',
    'Anterior Step Absorption, Deep Knee Flexion & Return Drive'
  ),
  'ex-step-ups': entry(
    'Unilateral Closed-Chain Elevated Box Ascent — Knee-to-Hip Concentric Initiation Without Momentum',
    'fam-step-up',
    'Base',
    'Concentric Elevated Box Ascent · Dumbbells',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Vertical Gravity Through Elevated Stance Foot',
    'Peak Difficulty at Bottom Knee-Over-Toe Break',
    'Isolated Lead-Leg Hip & Knee Extension With Trailing-Foot Minimal Push'
  ),
  'ex-poliquin-step-down': entry(
    'Unilateral Heels-Elevated Anterior Eccentric Step-Down — VMO & Patellar Tendon Capacity',
    'fam-step-up',
    'Angle / Stance',
    'Anterior Eccentric Step-Down (VMO & Patellar Tendon)',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Vertical Gravity Over Steeply Dorsiflexed Ankle Wedge',
    'Peak Terminal Knee Extension & Eccentric Control',
    'Pure Forward-Knee Tibial Translation (Flexion/Extension) at Upright Spine'
  ),
  'ex-cossack-squat': entry(
    'Alternating Frontal-Plane Lateral Squat — Adductor Flexibility & Unilateral Squat Strength',
    'fam-unilateral-squat',
    'Angle / Stance',
    'Frontal-Plane Deep Lateral Squat',
    'Frontal / Multi-Planar',
    'Closed Kinetic Chain (CKC)',
    'Alternating Unilateral',
    'Vertical Bodyweight Over Lateral Working Stance Foot',
    'Descending (Peak Strength + Adductor Stretch at Bottom)',
    'Unilateral Deep Knee/Hip Flexion + Contralateral Hip Abduction/Stretch'
  ),
  'ex-standing-dumbbell-calf-raise': entry(
    'Bilateral Extended-Knee Closed-Chain Ankle Plantarflexion — Biarticular Gastrocnemius Peak',
    'fam-calf-plantarflexion',
    'Base',
    'Bilateral Straight-Knee · Dumbbells',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Vertical Axial Load Through Forefoot Metatarsal Heads',
    'Peak Stretch (Bottom) to Peak Shortened Contraction',
    'Full-ROM Ankle Plantarflexion from Maximal Dorsiflexion'
  ),
  'ex-single-leg-calf-raise-step': entry(
    'Unilateral Extended-Knee Ankle Plantarflexion — Full Bodyweight + Dumbbell Gastrocnemius Load',
    'fam-calf-plantarflexion',
    'Unilateral',
    'Unilateral Straight-Knee · Dumbbells',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Vertical Unilateral Forefoot Loading',
    'Peak Stretch Bottom Pause + Full Plantarflexion Rise',
    'Full-ROM Unilateral Ankle Plantarflexion with Straight Knee'
  ),
  'ex-kettlebell-single-leg-calf-raise': entry(
    'Unilateral Extended-Knee Single-Kettlebell Plantarflexion — Contralateral Hand Free for Balance',
    'fam-calf-plantarflexion',
    'Equipment',
    'Unilateral Straight-Knee · Kettlebell',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Ipsilateral Vertical Kettlebell Load Over Stance Foot',
    'Lengthened Stretch-Pause Accentuation',
    'Full-ROM Unilateral Ankle Plantarflexion at 0° Knee Extension'
  ),
  'ex-seated-single-leg-calf-raise': entry(
    'Unilateral 90°-Flexed-Knee Ankle Plantarflexion — Biarticular Gastroc Slackened Soleus Isolation',
    'fam-calf-plantarflexion',
    'Angle / Stance',
    'Bent-Knee (90°) Soleus Isolation',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Unilateral',
    'Vertical Axial Load Positioned Directly Over Distal Femur',
    'Full Ankle Arc Concentrating Force on Uniarticular Soleus',
    'Pure Ankle Plantarflexion at Fixed 90° Knee Flexion'
  ),
  'ex-wall-tibialis-raise': entry(
    'Bilateral Closed-Chain Wall-Supported Ankle Dorsiflexion — Anterior Compartment Shin Prehab',
    'fam-ankle-dorsiflexion',
    'Base',
    'Wall-Supported Closed-Chain Dorsiflexion',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Leaning Bodyweight Fulcrum Around Calcaneus Axis',
    'Ascending (Max Dorsiflexion Torque at Foot Clearance)',
    'Pure Ankle Dorsiflexion Against Leaning Bodyweight'
  ),

  // === 7. CORE & SPINE STABILITY ===
  'ex-forearm-plank': entry(
    'Prone Elbow-Supported Sagittal Anti-Extension Isometric — McGill Anterior Brace Endurance',
    'fam-plank-anti-extension',
    'Base',
    'Standard Elbow-Supported Front Plank',
    'Sagittal (Anti-Extension)',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Horizontal Span Gravity Pull on Neutral Lumbar Spine',
    'Constant Isometric Bracing',
    'Isometric Lumbar Neutrality & Posterior Pelvic Stabilization'
  ),
  'ex-high-plank': entry(
    'Prone Extended-Arm Anti-Extension & Serratus Protraction Isometric — Shoulder-Girdle Integration',
    'fam-plank-anti-extension',
    'Angle / Stance',
    'Straight-Arm High Plank (Serratus & Wrist)',
    'Sagittal (Anti-Extension)',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Elevated Horizontal Span Gravity Load',
    'Constant Isometric Trunk + Scapular Protraction',
    'Isometric Trunk Anti-Extension & Serratus Scapular Stabilization'
  ),
  'ex-bear-plank': entry(
    'Quadruped Hovering Deep Core Anti-Extension & Anti-Rotation Hold — Short-Lever Abdominal Tensegrity',
    'fam-plank-anti-extension',
    'Angle / Stance',
    'Quadruped Hovering Bear Plank',
    'Sagittal / Anti-Rotation',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Compact 4-Point Vertical Suspension Over Knees',
    'Constant Transverse Abdominis & Quadriceps Co-Contraction',
    'Isometric Hip Flexion (90°) + Thoracic Protraction + Lumbar Neutral'
  ),
  'ex-hollow-body-hold': entry(
    'Supine Posterior-Pelvic-Tilt Crescent Hold — Long-Lever Rectus Abdominis Anti-Extension',
    'fam-plank-anti-extension',
    'Progression',
    'Supine Long-Lever Hollow Hold',
    'Sagittal (Anti-Extension)',
    'Open Kinetic Chain (Limbs) / CKC Spine Floor Brace',
    'Bilateral',
    'Long Dual-Limb Gravity Cantilever Against Lumbar Brace',
    'Scalable Cantilever Progression',
    'Isometric Posterior Pelvic Tilt & Thoracic Curl Against Extended Limbs'
  ),
  'ex-ab-wheel-rollout': entry(
    'Kneeling Dynamic Long-Lever Anti-Extension Rollout — Peak Lengthened Rectus & Lat Integration',
    'fam-plank-anti-extension',
    'Progression',
    'Dynamic Long-Lever Anti-Extension Rollout',
    'Sagittal (Anti-Extension)',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Horizontal Moment Arm Lengthening Toward Overhead Floor Reach',
    'Exponentially Ascending Gravity Lever at Full Extension',
    'Dynamic Shoulder Flexion/Extension Over Strictly Locked Neutral Lumbar Spine'
  ),
  'ex-mcgill-curl-up': entry(
    'Supine Neutral-Lordosis Thoracic Curl Hold — Spine-Sparing Minimal-Shear Rectus Endurance',
    'fam-plank-anti-extension',
    'Angle / Stance',
    'McGill Spine-Sparing Neutral Brace Hold',
    'Sagittal',
    'Open Kinetic Chain (Upper Trunk)',
    'Bilateral',
    'Vertical Gravity Lift of Cranial/Thoracic Mass (~2–3 cm)',
    'Constant Isometric Abdominal Stiffness',
    'Minimal Upper Thoracic Lift With Zero Lumbar Flexion (Hands Brace Arch)'
  ),
  'ex-hanging-knee-raise': entry(
    'Suspended Flexed-Knee Hip Flexion & Posterior Pelvic Curl — Short-Lever Lower Abdominal Flexion',
    'fam-hanging-hip-spinal-flexion',
    'Base',
    'Flexed-Knee Lever Hanging Raise',
    'Sagittal',
    'Open Kinetic Chain (Lower Body) / CKC Grip',
    'Bilateral',
    'Vertical Gravity Against Suspended Pelvic Lift',
    'Ascending (Max Pelvic-Curl Moment Above Horizontal)',
    'Hip Flexion Followed by Posterior Pelvic Tilt & Lumbar Curl'
  ),
  'ex-hanging-leg-raise': entry(
    'Suspended Extended-Knee Full Hip & Lumbar Flexion — Max Long-Lever Core Torque',
    'fam-hanging-hip-spinal-flexion',
    'Progression',
    'Extended-Knee Long Moment Arm',
    'Sagittal',
    'Open Kinetic Chain (Lower Body) / CKC Grip',
    'Bilateral',
    'Long Extended-Leg Vertical Gravity Lever',
    'Ascending (Extreme Torque at Horizontal Toes-to-Bar)',
    'Straight-Leg Hip Flexion + Posterior Pelvic Tilt Against Scapular Depression'
  ),
  'ex-side-plank': entry(
    'Lateral Forearm-Supported Frontal-Plane Anti-Lateral Flexion Hold — Quadratus Lumborum & Obliques',
    'fam-lateral-core',
    'Base',
    'Standard Lateral Forearm Hold',
    'Frontal (Anti-Lateral Flexion)',
    'Closed Kinetic Chain (CKC)',
    'Unilateral Side',
    'Lateral Gravity Attempting Pelvic Sag',
    'Constant Isometric Lateral Pillar Stiffness',
    'Isometric Spinal & Pelvic Neutrality Against Lateral Sag'
  ),
  'ex-copenhagen-plank': entry(
    'Suspended Top-Leg Bench-Anchored Lateral Plank — High-Torque Hip Adductor & Oblique Pillar',
    'fam-lateral-core',
    'Progression',
    'Suspended Adductor-Biased Lateral Plank',
    'Frontal (Anti-Lateral Flexion)',
    'Closed Kinetic Chain (CKC)',
    'Unilateral Side',
    'Full Lower-Body Gravity Moment Across Adductor Longus & Obliques',
    'Constant High-Tension Isometric Adduction + Core Brace',
    'Isometric Hip Adduction + Lateral Spinal Stabilization'
  ),
  'ex-kettlebell-windmill': entry(
    'Tri-Planar Offset Hip Hinge With Overhead Scapular Stabilization — Frontal & Transverse Integration',
    'fam-lateral-core',
    'Progression',
    'Tri-Planar Overhead Hinge & Thoracic Rotation',
    'Multi-Planar (Frontal/Transverse)',
    'Closed Kinetic Chain (Legs) / Isometric Overhead OKC',
    'Unilateral Load',
    'Constant Vertical Kettlebell Vector Through Vertical Stacking Arm',
    'Dynamic Hip/Oblique Lengthening Under Constant Overhead Alignment',
    'Ipsilateral Hip Hinge + Contralateral Trunk Lateral Flexion & Thoracic Rotation'
  ),
  'ex-bird-dog': entry(
    'Quadruped Contralateral Limb Extension — McGill Low-Shear Multifidus & Anti-Rotation Stability',
    'fam-core-rotation',
    'Angle / Stance',
    'Quadruped Contralateral Brace (McGill Big 3)',
    'Multi-Planar (Anti-Rotation)',
    'Open Kinetic Chain (Extended Limbs) / CKC Support',
    'Alternating Diagonal',
    'Asymmetric Diagonal Limb Torque',
    'Peak Isometric End-Range Anti-Twist Hold',
    'Contralateral Shoulder Flexion + Hip Extension Around Rigid Lumbar Pillar'
  ),
  'ex-banded-pallof-press': entry(
    'Standing Lateral-Tension Isometric Press-Out — Progressive Transverse Anti-Rotation Core Brace',
    'fam-core-rotation',
    'Base',
    'Transverse Anti-Rotation Isometric Press',
    'Transverse (Anti-Rotation)',
    'Closed Kinetic Chain (Stance) / Anti-Rotation Arms',
    'Unilateral Cable/Band Pull',
    'Lateral-to-Center Horizontal Elastic Force',
    'Ascending Moment Arm as Elbows Extend Forward',
    'Shoulder/Elbow Press-Out Resisting Thoracic/Pelvic Horizontal Twist'
  ),
  'ex-bicycle-crunch': entry(
    'Supine Alternating Contralateral Trunk Flexion & Thoracic Rotation — Reciprocal Oblique Synergy',
    'fam-core-rotation',
    'Progression',
    'Dynamic Contralateral Thoracic Rotation Crunch',
    'Transverse / Sagittal',
    'Open Kinetic Chain (OKC)',
    'Alternating Bilateral',
    'Gravity Load on Elevated Shoulder Girdle & Extended Leg',
    'Peak Tension in Full Contralateral Scapular Clearance',
    'Thoracic Flexion/Rotation Paired With Alternating Hip/Knee Flexion'
  ),
  'ex-medicine-ball-russian-twist': entry(
    'Seated Isometric V-Sit Coupled With Loaded Transverse Thoracic Rotation — Concentric/Eccentric Obliques',
    'fam-core-rotation',
    'Equipment',
    'Loaded Ball Seated Rotational Arc',
    'Transverse',
    'Open Kinetic Chain (Torso/Arms)',
    'Alternating Rotation',
    'Rotational Arc + Anti-Flexion V-Sit Hip Brace',
    'Constant Rotational Deceleration & Acceleration',
    'Transverse Thoracic Rotation Above Stabilized Flexed Hip Angle'
  ),
  'ex-superman-hold': entry(
    'Prone Floor Posterior-Chain Extension Isometric — Spinal Erector & Gluteal Muscular Endurance',
    'fam-posterior-spine',
    'Base',
    'Prone Bilateral Spinal Extension Hold',
    'Sagittal',
    'Open Kinetic Chain (Limbs)',
    'Bilateral',
    'Vertical Gravity Acting on Elevated Torso & Femurs',
    'Constant Posterior Isometric Contraction',
    'Mild Global Thoracic/Lumbar Extension + Hip Extension'
  ),
  'ex-prone-cobra-hold': entry(
    'Prone Thoracic Extension With Bilateral Humeral External Rotation & Scapular Retraction',
    'fam-posterior-spine',
    'Angle / Stance',
    'Thoracic Cobra + Humeral External Rotation',
    'Sagittal / Transverse',
    'Open Kinetic Chain (OKC)',
    'Bilateral',
    'Horizontal Gravity Over Mid-Thoracic Spine & Arms',
    'Constant Isometric Postural Retraction Torque',
    'Thoracic Extension, Scapular Retraction/Depression & External Rotation'
  ),
  'ex-farmers-carry': entry(
    'Bilateral Standing Loaded Gait Carry — Axial Grip, Trap, & Tri-Planar Core Endurance',
    'fam-loaded-carry',
    'Base',
    'Symmetrical Dual-Side Loaded Walk',
    'Multi-Planar Gait Stabilization',
    'Closed Kinetic Chain (Gait)',
    'Bilateral Symmetrical',
    'Symmetrical Vertical Axial Hand Traction',
    'Continuous Dynamic Postural Stiffness & Grip Time-Under-Tension',
    'Isometric Scapular Depression, Neutral Spinal Pillar & Reciprocal Gait'
  ),
  'ex-kettlebell-suitcase-carry': entry(
    'Unilateral Loaded Gait Carry — Contralateral Quadratus Lumborum & Oblique Anti-Lateral Flexion',
    'fam-loaded-carry',
    'Unilateral',
    'Unilateral Suitcase (Quadratus Lumborum Anti-Lateral)',
    'Frontal (Anti-Lateral Gait)',
    'Closed Kinetic Chain (Gait)',
    'Unilateral',
    'Asymmetric Ipsilateral Lateral-Tilt Torque',
    'Continuous Anti-Sidebend Core Stabilization Over Walking Cycles',
    'Contralateral Lateral Pillar Bracing + Isometric Grip & Scapular Leveling'
  ),
  'ex-kettlebell-front-rack-carry': entry(
    'Anterior Thoracic-Racked Loaded Gait Carry — Thoracic Anti-Flexion & Diaphragmatic Bracing Under Load',
    'fam-loaded-carry',
    'Angle / Stance',
    'Anterior Thoracic Front-Rack Load',
    'Sagittal (Anti-Flexion Gait)',
    'Closed Kinetic Chain (Gait)',
    'Bilateral / Unilateral Rack',
    'Anterior Ribcage-Compressive Vertical Load',
    'Constant Core Bracing & Thoracic Extension Stiffness',
    'Isometric Anterior Core & Upper-Back Brace During Gait'
  ),
  'ex-kettlebell-bottoms-up-carry': entry(
    'Unilateral Inverted-Kettlebell Walk — Maximum Grip Irradiation & Reflexive Rotator Cuff Centration',
    'fam-loaded-carry',
    'Progression',
    'Inverted Bell (Irradiation & Rotator Cuff Reflex)',
    'Tri-Planar Micro-Perturbation',
    'Closed Kinetic Chain (Gait) / OKC Dynamic Stabilization',
    'Unilateral',
    'Unstable Top-Heavy Center of Mass Above Fist',
    'Continuous High-Frequency Neuromuscular Balance Correction',
    'Isometric 90° Shoulder/Elbow Flexion + Maximal Forearm Irradiation + Gait'
  ),

  // === 8. CONDITIONING & POWER ===
  'ex-kettlebell-russian-swing': entry(
    'Explosive Ballistic Sagittal Hip Hinge — Rapid Stretch-Shortening Posterior-Chain Power Arc',
    'fam-rdl',
    'Progression',
    'Explosive Ballistic Kettlebell Hinge',
    'Sagittal',
    'Closed Kinetic Chain (Stance) / Ballistic Arc',
    'Bilateral',
    'Horizontal-to-Arc Centrifugal Bell Momentum',
    'Ballistic Concentric Hip Snap + High-Speed Eccentric Overspeed Catch',
    'Max-Velocity Concentric Hip & Knee Lockout From Loaded Hinge'
  ),
  'ex-vertical-jump': entry(
    'Bilateral Countermovement Triple-Extension Plyometric Jump — Stretch-Shortening Rate of Force Development',
    'fam-lower-plyo',
    'Base',
    'Bilateral Countermovement Stretch-Shortening Jump',
    'Sagittal',
    'Closed Kinetic Chain (Takeoff & Landing)',
    'Bilateral',
    'Vertical Ground Reaction Impulse & Landing Eccentric Absorption',
    'Ballistic Explosive Concentric Drive',
    'Rapid Ankle/Knee/Hip Triple Extension + Soft Eccentric Deceleration'
  ),
  'ex-box-jump': entry(
    'Bilateral Explosive Triple-Extension Elevated-Landing Jump — Reduced Eccentric Landing Impact',
    'fam-lower-plyo',
    'Angle / Stance',
    'Elevated Box Landing (Reduced Eccentric Impact)',
    'Sagittal',
    'Closed Kinetic Chain (Takeoff & Elevated Catch)',
    'Bilateral',
    'Vertical Ground Reaction Impulse With Box Height Cut-Off',
    'Maximal Concentric Power With Minimized Eccentric Joint Trauma',
    'Rapid Triple Extension Followed by High-Hip Flexed Landing Absorption'
  ),
  'ex-medicine-ball-slam': entry(
    'Total-Body Explosive Overhead-to-Floor Flexion Power Slam — Non-Bouncing Concentric Rate of Force',
    'fam-plank-conditioning',
    'Equipment',
    'Non-Elastic Concentric Ball Slam',
    'Sagittal',
    'Closed Kinetic Chain (Feet) / Dynamic Trunk-Arms',
    'Bilateral',
    'Vertical Downward Acceleration & Momentum Transfer',
    'Explosive Full-ROM Concentric Trunk/Shoulder Power',
    'Overhead Triple Extension Into Explosive Shoulder Extension & Trunk Flexion'
  ),
  'ex-mountain-climber': entry(
    'Prone High-Plank Dynamic Alternating Hip Flexion — Anti-Extension Core & Anaerobic Conditioning',
    'fam-plank-conditioning',
    'Base',
    'Alternating Sagittal High-Plank Drive',
    'Sagittal',
    'Closed Kinetic Chain (Hands Fixed)',
    'Alternating Bilateral',
    'Alternating Single-Leg Shear Within Static Plank Frame',
    'Continuous Aerobic/Anaerobic Core Bracing',
    'Rapid Alternating Hip/Knee Flexion Over Neutral Stabilized Spine'
  ),
  'ex-plank-jack': entry(
    'Prone High-Plank Dynamic Frontal-Plane Foot Hop — Lateral Hip Abduction/Adduction Conditioning',
    'fam-plank-conditioning',
    'Angle / Stance',
    'Frontal-Plane Hip Abduction/Adduction Hop',
    'Frontal / Anti-Extension',
    'Closed Kinetic Chain (Hands Fixed)',
    'Bilateral',
    'Dynamic Impact Micro-Perturbation Against Static Core Brace',
    'Rhythmic Plyometric Conditioning With Pelvic Control',
    'Symmetric Hip Abduction/Adduction Jumps Around Isometric Core Pillar'
  ),
  'ex-decompression-brisk-walk': entry(
    'Bilateral Cyclic Postural Locomotion & Diaphragmatic Cooldown — Parasympathetic Cardiac Down-Regulation',
    'fam-spinal-decompression',
    'Progression',
    'Rhythmic Upright Postural Decompression Walk',
    'Multi-Planar Reciprocal Gait',
    'Closed Kinetic Chain (CKC)',
    'Alternating Bilateral',
    'Low-Impact Axial Vertical Compressive Pumping (Disc Hydration)',
    'Aerobic Zone 1–2 Active Recovery & Thoracolumbar Fascia Glide',
    'Reciprocal Contralateral Arm Swing, Pelvic Rotation & Diaphragmatic Breath'
  ),
  'ex-jefferson-curl': entry(
    'Loaded Segmental Cervical-Thoracic-Lumbar Flexion & Eccentric Posterior-Chain Articulation',
    'fam-spinal-decompression',
    'Angle / Stance',
    'Light-Loaded Segmental Jefferson Curl',
    'Sagittal',
    'Closed Kinetic Chain (CKC)',
    'Bilateral',
    'Anterior Light Axial Distraction Vector',
    'Progressive Eccentric End-Range Spinal Articulation',
    'Sequential Vertebral Flexion/Extension & Posterior-Chain Elongation'
  )
};

/**
 * Attaches standardized taxonomy & biomechanical metadata to any canonical exercise object.
 * Falls back cleanly so custom/user-created exercises also remain compatible.
 */
export function enrichExerciseWithTaxonomy(ex) {
  if (!ex || typeof ex !== 'object') return ex;
  const tax = EXERCISE_TAXONOMY[ex.id];
  if (!tax) {
    return {
      ...ex,
      familyId: ex.familyId || null,
      familyName: ex.familyName || null,
      variationType: ex.variationType || null,
      variationLabel: ex.variationLabel || null,
      biomechanics: ex.biomechanics || null
    };
  }

  const family = MOVEMENT_FAMILIES[tax.familyId];
  return {
    ...ex,
    scientificName: tax.scientificName || ex.scientificName,
    familyId: tax.familyId,
    familyName: family ? family.name : tax.familyId,
    variationType: tax.variationType,
    variationLabel: tax.variationLabel,
    biomechanics: tax.biomechanics
  };
}

/**
 * Returns sorted sibling variations belonging to the same `familyId`, excluding the current exercise.
 * Base variations appear first, then ordered by variationType and name.
 */
export function getExerciseVariations(exercise, allExercises = []) {
  if (!exercise?.familyId || !Array.isArray(allExercises) || allExercises.length === 0) {
    return [];
  }
  const typePriority = {
    Base: 0,
    Equipment: 1,
    'Angle / Stance': 2,
    Grip: 3,
    Unilateral: 4,
    Progression: 5
  };

  return allExercises
    .filter((item) => item && item.id !== exercise.id && item.familyId === exercise.familyId)
    .sort((a, b) => {
      const pa = typePriority[a.variationType] ?? 9;
      const pb = typePriority[b.variationType] ?? 9;
      if (pa !== pb) return pa - pb;
      return String(a.name || '').localeCompare(String(b.name || ''));
    });
}
