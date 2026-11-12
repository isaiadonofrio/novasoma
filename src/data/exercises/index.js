/**
 * UNIFIED EXERCISE REPOSITORY
 * Aggregates all modular exercise sub-databases.
 */

import { WARMUPANDMOBILITY_EXERCISES } from './1_warmupAndMobility.js';
import { SQUATSANDKNEEFLEXION_EXERCISES } from './2_squatsAndKneeFlexion.js';
import { HIPHINGESANDGLUTES_EXERCISES } from './3_hipHingesAndGlutes.js';
import { PUSHUPPERBODY_EXERCISES } from './4_pushUpperBody.js';
import { PULLUPPERBODY_EXERCISES } from './5_pullUpperBody.js';
import { LUNGESANDUNILATERAL_EXERCISES } from './6_lungesAndUnilateral.js';
import { COREANDSPINESTABILITY_EXERCISES } from './7_coreAndSpineStability.js';
import { CONDITIONINGANDPOWER_EXERCISES } from './8_conditioningAndPower.js';

export const ALL_RAW_EXERCISES = [
  ...WARMUPANDMOBILITY_EXERCISES,
  ...SQUATSANDKNEEFLEXION_EXERCISES,
  ...HIPHINGESANDGLUTES_EXERCISES,
  ...PUSHUPPERBODY_EXERCISES,
  ...PULLUPPERBODY_EXERCISES,
  ...LUNGESANDUNILATERAL_EXERCISES,
  ...COREANDSPINESTABILITY_EXERCISES,
  ...CONDITIONINGANDPOWER_EXERCISES
];
