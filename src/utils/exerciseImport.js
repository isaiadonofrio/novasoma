import { MOVEMENT_PATTERNS } from '../data/exerciseConstants.js';

export function isAnimatedGifUrl(src = '') {
  if (!src) return false;
  return /^data:image\/gif/i.test(src) || /\.gif(\?.*)?$/i.test(src);
}

const MUSCLE_ALIASES = {
  chest: 'chest',
  pectorals: 'chest',
  pecs: 'chest',
  petto: 'chest',
  pettorali: 'chest',
  back: 'back',
  lats: 'back',
  'middle back': 'back',
  'lower back': 'back',
  dorso: 'back',
  dorsali: 'back',
  shoulders: 'shoulders',
  delts: 'shoulders',
  deltoids: 'shoulders',
  spalle: 'shoulders',
  biceps: 'biceps',
  bicipiti: 'biceps',
  triceps: 'triceps',
  tricipiti: 'triceps',
  trapezius: 'trapezius',
  traps: 'trapezius',
  trapezi: 'trapezius',
  abdomen: 'abdomen',
  abdominals: 'abdomen',
  abs: 'abdomen',
  'abs & core': 'abdomen',
  core: 'abdomen',
  addome: 'abdomen',
  obliques: 'obliques',
  obliqui: 'obliques',
  forearm: 'forearm',
  forearms: 'forearm',
  avambracci: 'forearm',
  quads: 'quads',
  quadriceps: 'quads',
  quadricipiti: 'quads',
  hamstrings: 'hamstrings',
  femorali: 'hamstrings',
  ischiocrurali: 'hamstrings',
  glutes: 'glutes',
  glutei: 'glutes',
  calves: 'calves',
  polpacci: 'calves'
};

function mapMuscleKey(raw) {
  if (!raw || typeof raw !== 'string') return 'quads';
  const normalized = raw.toLowerCase().trim();
  return MUSCLE_ALIASES[normalized] || 'quads';
}

function slugifyId(name) {
  const slug = String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug ? `ex-${slug}` : `ex-${Date.now()}`;
}

export function isBodyweightEquipment(equipmentText = '') {
  const eq = String(equipmentText || '').toLowerCase().trim();
  if (!eq) return true;
  return (
    eq === 'none' ||
    eq === 'corpo libero' ||
    eq.includes('bodyweight')
  );
}

/**
 * Normalizes a single exercise JSON object (CORPO or free-exercise-db schema)
 * into the schema used by ExerciseEditorModal and the local exercise database.
 */
export function parseSingleExerciseJson(rawText) {
  if (!rawText || !rawText.trim()) {
    throw new Error('Paste or select a valid JSON object for a single exercise.');
  }

  let parsed = JSON.parse(rawText);
  if (Array.isArray(parsed)) {
    if (parsed.length === 0) {
      throw new Error('The JSON array is empty.');
    }
    if (parsed.length > 1) {
      throw new Error(`Found ${parsed.length} exercises in the JSON file: please import one exercise at a time.`);
    }
    parsed = parsed[0];
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('JSON root must represent a single exercise object.');
  }

  const name = String(parsed.name || parsed.title || '').trim();
  if (!name) {
    throw new Error('Missing required "name" field in the JSON object.');
  }

  const primaryList = Array.isArray(parsed.targetMuscles?.primary)
    ? parsed.targetMuscles.primary
    : Array.isArray(parsed.primaryMuscles)
      ? parsed.primaryMuscles
      : [];

  const secondaryList = Array.isArray(parsed.targetMuscles?.secondary)
    ? parsed.targetMuscles.secondary
    : Array.isArray(parsed.secondaryMuscles)
      ? parsed.secondaryMuscles
      : [];

  const stabilizersList = Array.isArray(parsed.targetMuscles?.stabilizers)
    ? parsed.targetMuscles.stabilizers
    : [];

  const instructions = Array.isArray(parsed.instructions) ? parsed.instructions : [];
  const execution = parsed.execution || {};

  const setup = execution.setup || instructions[0] || '';
  const eccentric = execution.eccentric || instructions[1] || '';
  const concentric = execution.concentric || instructions.slice(2).join(' ') || '';

  const muscleKey = parsed.muscleKey
    ? mapMuscleKey(parsed.muscleKey)
    : mapMuscleKey(primaryList[0]);

  const rawIllustration = parsed.illustration || (Array.isArray(parsed.images) ? parsed.images[0] : '') || '';
  const equipment = String(parsed.equipment || 'Bodyweight');
  const requiresEquipment =
    typeof parsed.requiresEquipment === 'boolean'
      ? parsed.requiresEquipment
      : !isBodyweightEquipment(equipment);

  return {
    id: String(parsed.id || slugifyId(name)),
    name,
    scientificName: String(parsed.scientificName || parsed.subtitle || name),
    subtitle: String(parsed.subtitle || parsed.scientificName || ''),
    pattern: String(parsed.pattern || MOVEMENT_PATTERNS.SQUAT),
    equipment,
    requiresEquipment,
    mechanics: String(parsed.mechanics || parsed.force || 'Compound'),
    level: String(parsed.level || 'Intermediate'),
    muscleKey,
    defaultSets: Number(parsed.defaultSets) || 3,
    defaultReps: String(parsed.defaultReps || '8-12'),
    defaultRestSeconds: Number(parsed.defaultRestSeconds) || 90,
    rpe: String(parsed.rpe || '8'),
    lastRecord: String(parsed.lastRecord || ''),
    illustration: String(rawIllustration),
    customVideoUrl: String(parsed.customVideoUrl || parsed.videoUrl || ''),
    isWarmup: Boolean(parsed.isWarmup),
    targetMuscles: {
      primary: primaryList.map(String),
      secondary: secondaryList.map(String),
      stabilizers: stabilizersList.map(String)
    },
    execution: {
      setup: String(setup),
      eccentric: String(eccentric),
      concentric: String(concentric),
      breathing: String(execution.breathing || ''),
      commonMistakes: Array.isArray(execution.commonMistakes) ? execution.commonMistakes.map(String) : [],
      proTip: String(execution.proTip || '')
    }
  };
}
