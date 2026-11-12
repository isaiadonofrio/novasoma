/**
 * SCIENTIFIC EXERCISE DATABASE - NOVA SOMA
 * Functional kinesiology, joint mechanics, and execution cues.
 * 
 * Organized into modular category files under ./exercises/:
 * - 1_warmupAndMobility.js     (Joint priming, 90/90, Cat-Cow, World's Greatest Stretch)
 * - 2_squatsAndKneeFlexion.js  (Back Squat, Goblet Squat, Spanish Squat, Box Squat...)
 * - 3_hipHingesAndGlutes.js    (Romanian Deadlift, Barbell Deadlift, Glute Bridges...)
 * - 4_pushUpperBody.js         (Bench Press, Push-Ups, Overhead Press, Floor Press...)
 * - 5_pullUpperBody.js         (Pull-Ups, Bent-Over Rows, Reverse Snow Angel, Curls...)
 * - 6_lungesAndUnilateral.js   (Bulgarian Split Squats, Reverse Lunges, Step-Ups, Cossacks...)
 * - 7_coreAndSpineStability.js (Planks, Bear Plank, Copenhagen, McGill Curl-Up...)
 * - 8_conditioningAndPower.js  (Jump Rope, Kettlebell Swings, Slam Ball, Brisk Walk...)
 */

import { EXERCISE_MEDIA } from './exerciseMedia.js';
import {
  MOVEMENT_PATTERNS,
  EXERCISE_MECHANICS,
  EXERCISE_LEVELS,
  EQUIPMENT_TYPES
} from './exerciseConstants.js';
import { ALL_RAW_EXERCISES } from './exercises/index.js';

export {
  MOVEMENT_PATTERNS,
  EXERCISE_MECHANICS,
  EXERCISE_LEVELS,
  EQUIPMENT_TYPES
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

export const EXERCISE_DATABASE = ALL_RAW_EXERCISES.map(ex => ({
  ...ex,
  requiresEquipment:
    typeof ex.requiresEquipment === 'boolean'
      ? ex.requiresEquipment
      : inferRequiresEquipment(ex.equipment),
  mechanics: ex.mechanics || 'Compound',
  level: ex.level || 'Intermediate',
  illustration: ex.illustration || EXERCISE_MEDIA[ex.id] || ''
}));
