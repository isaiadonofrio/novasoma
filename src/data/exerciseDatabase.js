/**
 * SCIENTIFIC EXERCISE DATABASE - NOVA SOMA
 * Functional kinesiology, joint mechanics, and execution cues.
 *
 * Organized into modular category files under ./exercises/:
 * - 1_warmupAndMobility.js     (Joint priming, 90/90, Cat-Cow, World's Greatest Stretch...)
 * - 2_squatsAndKneeFlexion.js  (Back Squat, Goblet Squat, Zercher, Cyclist Squat, Box Squat...)
 * - 3_hipHingesAndGlutes.js    (Romanian Deadlift, Sumo Deadlift, Good Morning, Nordic Curl...)
 * - 4_pushUpperBody.js         (Bench Press, Incline DB Press, Chest Dip, Overhead Triceps...)
 * - 5_pullUpperBody.js         (Pull-Ups, Chin-Ups, Pendlay Row, Yates Row, Curls, Wrist Work...)
 * - 6_lungesAndUnilateral.js   (Bulgarian Split Squats, Reverse Lunges, Poliquin Step-Down...)
 * - 7_coreAndSpineStability.js (Planks, Ab-Wheel Rollout, Pallof Press, Windmill, Carries...)
 * - 8_conditioningAndPower.js  (Jump Rope, Vertical & Box Jumps, Slams, Conditioning...)
 */

import { EXERCISE_MEDIA } from './exerciseMedia.js';
import {
  MOVEMENT_PATTERNS,
  EXERCISE_MECHANICS,
  EXERCISE_LEVELS,
  EQUIPMENT_TYPES
} from './exerciseConstants.js';
import {
  SCIENTIFIC_SOURCES,
  MOVEMENT_FAMILIES,
  VARIATION_TYPES,
  enrichExerciseWithTaxonomy,
  getExerciseVariations
} from './exerciseTaxonomy.js';
import { ALL_RAW_EXERCISES } from './exercises/index.js';

export {
  MOVEMENT_PATTERNS,
  EXERCISE_MECHANICS,
  EXERCISE_LEVELS,
  EQUIPMENT_TYPES,
  SCIENTIFIC_SOURCES,
  MOVEMENT_FAMILIES,
  VARIATION_TYPES,
  enrichExerciseWithTaxonomy,
  getExerciseVariations
};

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

export function buildExerciseDatabase(rawExercises = ALL_RAW_EXERCISES, mediaMap = EXERCISE_MEDIA) {
  return rawExercises.map(raw => {
    const ex = enrichExerciseWithTaxonomy(raw);
    const isWarmup = typeof ex.isWarmup === 'boolean'
      ? ex.isWarmup
      : (ex.phase === 'warmup' || String(ex.id || '').startsWith('wu-'));
    return {
      ...ex,
      isWarmup,
      phase: ex.phase || (isWarmup ? 'warmup' : 'main'),
      requiresEquipment:
        typeof ex.requiresEquipment === 'boolean'
          ? ex.requiresEquipment
          : inferRequiresEquipment(ex.equipment),
      mechanics: ex.mechanics || 'Compound',
      level: ex.level || 'Intermediate',
      illustration: ex.illustration || mediaMap[ex.id] || ''
    };
  });
}

export const EXERCISE_DATABASE = buildExerciseDatabase();
