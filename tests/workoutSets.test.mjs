import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isRestTimerEnabledForExercise,
  getEffectiveRestSeconds,
  getExercisePhaseInfo,
  insertExerciseByPhase,
  getSupersetInfoMap,
  normalizeSupersetGroups,
  reorderExerciseInRoutine,
  dropExerciseInRoutine,
  toggleSupersetLinkWithNext,
  unlinkExerciseFromSuperset,
  unlinkSupersetGroup,
  suggestDropSetWeight,
  parseExerciseTargetSeconds,
  buildInitialExerciseSets,
  doesExerciseUseExternalWeight,
  getExerciseSetLoggingProfile,
  getExerciseTimerConfig,
  formatLoggedSetSummary,
  shouldShowExerciseRpe,
  formatTargetPrescription,
} from '../src/utils/workoutSets.js';

test('isRestTimerEnabledForExercise distinguishes timed vs untimed exercises clearly', () => {
  assert.equal(isRestTimerEnabledForExercise({ defaultRestSeconds: 90 }), true);
  assert.equal(isRestTimerEnabledForExercise({ defaultRestSeconds: 0 }), false);
  assert.equal(isRestTimerEnabledForExercise({ defaultRestSeconds: 90, timerEnabled: false }), false);
  assert.equal(isRestTimerEnabledForExercise({ defaultRestSeconds: 0, timerEnabled: true }), true);
  assert.equal(getEffectiveRestSeconds({ defaultRestSeconds: 0 }), 60);
  assert.equal(getEffectiveRestSeconds({ defaultRestSeconds: 120 }), 120);
});

test('superset helpers link adjacent same-phase exercises and normalize singletons', () => {
  const initial = [
    { id: 'w1', isWarmup: true, name: 'Warmup 1' },
    { id: 'm1', isWarmup: false, name: 'Squat' },
    { id: 'm2', isWarmup: false, name: 'Plank' },
    { id: 'm3', isWarmup: false, name: 'Calf Raise' },
  ];

  // Cross-phase link should be ignored
  assert.deepEqual(toggleSupersetLinkWithNext(initial, 0), initial);

  // Pair m1 + m2 into numerical Superset 2-3
  const paired = toggleSupersetLinkWithNext(initial, 1);
  let info = getSupersetInfoMap(paired);
  assert.equal(info.get(1)?.code, '2');
  assert.equal(info.get(2)?.code, '3');
  assert.equal(info.get(2)?.rangeLabel, '2-3');
  assert.equal(info.get(2)?.label, 'Superset 2-3');
  assert.equal(info.get(1)?.exerciseNumber, 2);
  assert.equal(info.get(3), undefined);

  // Extend to Tri-set m1 + m2 + m3 -> Superset 2-4
  const triset = toggleSupersetLinkWithNext(paired, 2);
  info = getSupersetInfoMap(triset);
  assert.equal(info.get(3)?.code, '4');
  assert.equal(info.get(1)?.label, 'Superset 2-4');
  assert.equal(info.get(1)?.size, 3);

  // Unlink middle m2 -> splits/removes m2; remaining [m1, m3] still share group or clean up properly
  const unlinkedM2 = unlinkExerciseFromSuperset(triset, 2);
  info = getSupersetInfoMap(unlinkedM2);
  assert.equal(info.get(2), undefined);

  // Unlink m1 from original pair clears both m1 and m2
  const cleared = toggleSupersetLinkWithNext(paired, 1);
  assert.equal(getSupersetInfoMap(cleared).size, 0);

  // Unlink entire superset group directly
  const pairedAgain = toggleSupersetLinkWithNext(initial, 1);
  const groupId = pairedAgain[1].supersetGroup;
  assert.ok(groupId);
  const dissolved = unlinkSupersetGroup(pairedAgain, groupId);
  assert.equal(getSupersetInfoMap(dissolved).size, 0);
  assert.equal(dissolved[1].supersetGroup, undefined);
  assert.equal(dissolved[2].supersetGroup, undefined);
});

test('reordering preserves contiguous superset blocks and prevents orphaned capsules', () => {
  const baseline = [
    { name: 'Jump Rope', isWarmup: true },
    { name: 'Banded Hip Abduction', isWarmup: true, supersetGroup: 'ss-warm' },
    { name: 'Copenhagen Plank', isWarmup: true, supersetGroup: 'ss-warm' },
    { name: 'Goblet Squat' },
  ];

  // Moving standalone #1 down past superset [2..3] jumps past the entire pair
  const movedDown = reorderExerciseInRoutine(baseline, 0, 1);
  assert.deepEqual(
    movedDown.map((ex) => ex.name),
    ['Banded Hip Abduction', 'Copenhagen Plank', 'Jump Rope', 'Goblet Squat'],
  );
  const downMap = getSupersetInfoMap(movedDown);
  assert.equal(downMap.get(0)?.rangeLabel, '1-2');
  assert.equal(downMap.get(1)?.rangeLabel, '1-2');
  assert.equal(downMap.has(2), false);

  // Moving #3 (Jump Rope) back up before superset [1..2] restores original order cleanly
  const movedBackUp = reorderExerciseInRoutine(movedDown, 2, -1);
  assert.deepEqual(
    movedBackUp.map((ex) => ex.name),
    ['Jump Rope', 'Banded Hip Abduction', 'Copenhagen Plank', 'Goblet Squat'],
  );
  const upMap = getSupersetInfoMap(movedBackUp);
  assert.equal(upMap.get(1)?.rangeLabel, '2-3');
  assert.equal(upMap.get(2)?.rangeLabel, '2-3');

  // Moving inside the superset swaps members while keeping them paired
  const swappedInner = reorderExerciseInRoutine(baseline, 1, 1);
  assert.deepEqual(
    swappedInner.map((ex) => ex.name),
    ['Jump Rope', 'Copenhagen Plank', 'Banded Hip Abduction', 'Goblet Squat'],
  );
  assert.equal(getSupersetInfoMap(swappedInner).get(1)?.rangeLabel, '2-3');
  assert.equal(getSupersetInfoMap(swappedInner).get(2)?.rangeLabel, '2-3');

  // Moving boundary member outward shifts the whole superset block together
  const blockMovedUp = reorderExerciseInRoutine(baseline, 1, -1);
  assert.deepEqual(
    blockMovedUp.map((ex) => ex.name),
    ['Banded Hip Abduction', 'Copenhagen Plank', 'Jump Rope', 'Goblet Squat'],
  );
  assert.equal(getSupersetInfoMap(blockMovedUp).get(0)?.rangeLabel, '1-2');
  assert.equal(getSupersetInfoMap(blockMovedUp).get(1)?.rangeLabel, '1-2');

  // Non-contiguous fragments sharing a groupId are stripped by normalizeSupersetGroups
  const broken = [
    { name: 'Banded Hip Abduction', isWarmup: true, supersetGroup: 'ss-warm' },
    { name: 'Jump Rope', isWarmup: true },
    { name: 'Copenhagen Plank', isWarmup: true, supersetGroup: 'ss-warm' },
  ];
  const normalized = normalizeSupersetGroups(broken);
  assert.equal(normalized[0].supersetGroup, undefined);
  assert.equal(normalized[2].supersetGroup, undefined);
  assert.equal(getSupersetInfoMap(normalized).size, 0);

  // Drag-and-drop snaps standalone items past a target superset without splitting it
  const droppedPast = dropExerciseInRoutine(baseline, 0, 1);
  assert.deepEqual(
    droppedPast.map((ex) => ex.name),
    ['Banded Hip Abduction', 'Copenhagen Plank', 'Jump Rope', 'Goblet Squat'],
  );
  assert.equal(getSupersetInfoMap(droppedPast).get(0)?.rangeLabel, '1-2');
  assert.equal(getSupersetInfoMap(droppedPast).get(1)?.rangeLabel, '1-2');

  // Dragging a superset member out of a 2-item superset cleanly unlinks both
  const draggedOut = dropExerciseInRoutine(baseline, 1, 3);
  assert.deepEqual(
    draggedOut.map((ex) => ex.name),
    ['Jump Rope', 'Copenhagen Plank', 'Goblet Squat', 'Banded Hip Abduction'],
  );
  assert.equal(getSupersetInfoMap(draggedOut).size, 0);
});

test('suggestDropSetWeight reduces working load ~20% to nearest 0.5kg and handles blanks', () => {
  assert.equal(suggestDropSetWeight('100'), '80');
  assert.equal(suggestDropSetWeight('25'), '20');
  assert.equal(suggestDropSetWeight('18'), '14.5');
  assert.equal(suggestDropSetWeight(''), '');
  assert.equal(suggestDropSetWeight('0'), '');
});

test('parseExerciseTargetSeconds extracts seconds or minutes cleanly', () => {
  assert.equal(parseExerciseTargetSeconds('60-90s'), 60);
  assert.equal(parseExerciseTargetSeconds('20-30s/side'), 20);
  assert.equal(parseExerciseTargetSeconds('2 min'), 120);
  assert.equal(parseExerciseTargetSeconds('10-12'), null);
});

test('buildInitialExerciseSets creates working sets plus optional planned drop sets', () => {
  const sets = buildInitialExerciseSets({
    exercise: { id: 'sq', name: 'Squat', defaultSets: 3, defaultDropSets: 1, defaultReps: '8-10' },
  });
  assert.equal(sets.length, 4);
  assert.equal(sets[0].isDropset, false);
  assert.equal(sets[2].isDropset, false);
  assert.equal(sets[3].isDropset, true);
  assert.equal(sets[3].setNum, 4);
});

test('doesExerciseUseExternalWeight, getExerciseSetLoggingProfile, and formatLoggedSetSummary adapt dynamically', () => {
  const jumpRope = { name: 'Jump Rope', equipment: 'Jump Rope', defaultReps: '60-90s' };
  const bandAbduction = { name: 'Banded Hip Abduction', equipment: 'Loop Resistance Band', defaultReps: '12-15/side' };
  const catCow = { name: 'Cat-Cow to Child\'s Pose', equipment: 'Bodyweight (Mat)', requiresEquipment: false, mechanics: 'Mobility', defaultReps: '6-8 flows' };
  const stepUp = { name: 'Dumbbell Step-Up', equipment: 'Dumbbells + Step Box', defaultReps: '10-12/leg' };

  assert.equal(doesExerciseUseExternalWeight(jumpRope), false);
  assert.equal(doesExerciseUseExternalWeight(bandAbduction), false);
  assert.equal(doesExerciseUseExternalWeight(catCow), false);
  assert.equal(doesExerciseUseExternalWeight(stepUp), true);

  const jumpProfile = getExerciseSetLoggingProfile(jumpRope);
  assert.equal(jumpProfile.statHeader, 'DURATION (SEC)');
  assert.equal(jumpProfile.repStep, 5);
  assert.equal(jumpProfile.usesExternalWeight, false);

  const bandProfile = getExerciseSetLoggingProfile(bandAbduction);
  assert.equal(bandProfile.statHeader, 'REPS / SIDE');
  assert.equal(bandProfile.repStep, 1);

  const catProfile = getExerciseSetLoggingProfile(catCow);
  assert.equal(catProfile.statHeader, 'FLOWS');

  const stepProfile = getExerciseSetLoggingProfile(stepUp);
  assert.equal(stepProfile.statHeader, 'REPS / LEG');
  assert.equal(stepProfile.usesExternalWeight, true);

  assert.equal(formatLoggedSetSummary({ reps: '60', weight: '0' }, jumpRope), '60s');
  assert.equal(formatLoggedSetSummary({ reps: '12', weight: '' }, bandAbduction), '12/side');
  assert.equal(formatLoggedSetSummary({ reps: '8', weight: '' }, catCow), '8 flows');
  assert.equal(formatLoggedSetSummary({ reps: '10', weight: '20' }, stepUp), '20kg × 10');
});

test('getExerciseTimerConfig distinguishes timed holds, timed cardio, and rep-based rest lifts', () => {
  const copenhagen = { name: 'Copenhagen Plank', mechanics: 'Isometric', defaultReps: '20-30s/side', defaultRestSeconds: 45 };
  const jumpRope = { name: 'Jump Rope', equipment: 'Jump Rope', defaultReps: '60-90s', defaultRestSeconds: 45 };
  const mcgill = { name: 'McGill Curl-Up', mechanics: 'Isometric', defaultReps: '6 holds (8s)', defaultRestSeconds: 45 };
  const backSquat = { name: 'Barbell Back Squat', equipment: 'Barbell', defaultReps: '8-10', defaultRestSeconds: 120 };
  const walk = { name: 'Decompression Brisk Walk', equipment: 'Bodyweight', defaultReps: '15-20 min', defaultRestSeconds: 0 };

  const copenhagenCfg = getExerciseTimerConfig(copenhagen, { reps: '25' });
  assert.equal(copenhagenCfg.hasWorkTimer, true);
  assert.equal(copenhagenCfg.isHold, true);
  assert.equal(copenhagenCfg.workSeconds, 25);
  assert.equal(copenhagenCfg.workLabel, 'HOLD TIMER');
  assert.equal(copenhagenCfg.workShortLabel, 'Hold');
  assert.equal(copenhagenCfg.restSeconds, 45);

  const jumpCfg = getExerciseTimerConfig(jumpRope, { reps: '60' });
  assert.equal(jumpCfg.hasWorkTimer, true);
  assert.equal(jumpCfg.isHold, false);
  assert.equal(jumpCfg.workSeconds, 60);
  assert.equal(jumpCfg.workLabel, 'EXERCISE TIMER');
  assert.equal(jumpCfg.workShortLabel, 'Exercise');

  const mcgillCfg = getExerciseTimerConfig(mcgill, { reps: '6' });
  assert.equal(mcgillCfg.hasWorkTimer, true);
  assert.equal(mcgillCfg.isHold, true);
  assert.equal(mcgillCfg.isRepHoldDuration, true);
  assert.equal(mcgillCfg.workSeconds, 8);
  assert.equal(getExerciseSetLoggingProfile(mcgill).statHeader, 'HOLDS');

  const squatCfg = getExerciseTimerConfig(backSquat, { reps: '8' });
  assert.equal(squatCfg.hasWorkTimer, false);
  assert.equal(squatCfg.restEnabled, true);
  assert.equal(squatCfg.restSeconds, 120);

  const walkCfg = getExerciseTimerConfig(walk, { reps: '15' });
  assert.equal(walkCfg.hasWorkTimer, true);
  assert.equal(walkCfg.isMinutes, true);
  assert.equal(walkCfg.workSeconds, 900);
  assert.equal(walkCfg.restEnabled, false);
});


test('getExercisePhaseInfo and insertExerciseByPhase handle Warm-Up, Workout, and Decompression order', () => {
  assert.equal(getExercisePhaseInfo({ isWarmup: true }).key, 'warmup');
  assert.equal(getExercisePhaseInfo({ isWarmup: true }).label, 'Warm-Up');
  assert.equal(getExercisePhaseInfo({ phase: 'warmup' }).key, 'warmup');
  assert.equal(getExercisePhaseInfo({ isWarmup: false }).key, 'main');
  assert.equal(getExercisePhaseInfo({ isWarmup: false }).label, 'Workout');
  assert.equal(getExercisePhaseInfo({ phase: 'decompression', isDecompression: true }).key, 'decompression');
  assert.equal(getExercisePhaseInfo({ isDecompression: true }).label, 'Decompression');

  let list = [];
  list = insertExerciseByPhase(list, { id: 'd1', phase: 'decompression', isDecompression: true, name: 'Brisk Walk' });
  list = insertExerciseByPhase(list, { id: 'm1', isWarmup: false, name: 'Squat' });
  list = insertExerciseByPhase(list, { id: 'w1', isWarmup: true, name: 'Jump Rope' });
  list = insertExerciseByPhase(list, { id: 'm2', isWarmup: false, name: 'RDL' });
  list = insertExerciseByPhase(list, { id: 'w2', phase: 'warmup', name: 'Band Walk' });
  list = insertExerciseByPhase(list, { id: 'd2', isDecompression: true, name: 'Static Stretch' });

  assert.deepEqual(
    list.map((ex) => ex.id),
    ['w1', 'w2', 'm1', 'm2', 'd1', 'd2']
  );
});

test('shouldShowExerciseRpe hides RPE on warm-up, mobility, timed, and decompression exercises', () => {
  assert.equal(
    shouldShowExerciseRpe({ id: 'wu-jump-rope', name: 'Jump Rope', isWarmup: true, defaultReps: '60-90s', rpe: '6 - 7' }),
    false
  );
  assert.equal(
    shouldShowExerciseRpe({ id: 'wu-ankle-hip-mobility', name: 'Ankle & Hip 90/90 Mobility', isWarmup: true, mechanics: 'Mobility', defaultReps: '8-10/side', rpe: '5' }),
    false
  );
  assert.equal(
    shouldShowExerciseRpe({ id: 'ex-forearm-plank', name: 'Forearm Plank', isWarmup: false, mechanics: 'Isometric', defaultReps: '30-60s', rpe: '7 - 8' }),
    false
  );
  assert.equal(
    shouldShowExerciseRpe({ id: 'ex-glute-bridge-reach', name: 'Glute Bridge with Overhead Reach', isWarmup: false, mechanics: 'Mobility', defaultReps: '8-10/side', rpe: '6 - 7' }),
    false
  );
  assert.equal(
    shouldShowExerciseRpe({ id: 'ex-decompression-brisk-walk', name: 'Incline Decompression Brisk Walk', phase: 'decompression', isDecompression: true, defaultReps: '15-20 min', rpe: '4 - 5' }),
    false
  );
  assert.equal(
    shouldShowExerciseRpe({ id: 'ex-back-squat', name: 'Barbell Back Squat', isWarmup: false, mechanics: 'Compound', defaultReps: '6-8', rpe: '' }),
    false
  );
  assert.equal(
    shouldShowExerciseRpe({ id: 'ex-romanian-deadlift', name: 'Barbell Romanian Deadlift (RDL)', isWarmup: false, mechanics: 'Compound', defaultReps: '8-10', rpe: '8 - 9' }),
    true
  );
});

test('formatTargetPrescription normalizes units cleanly for reps, unilateral work, and timed holds', () => {
  assert.equal(formatTargetPrescription({ defaultReps: '8-10' }), '8-10 reps');
  assert.equal(formatTargetPrescription({ defaultReps: '8 - 10 reps' }), '8-10 reps');
  assert.equal(formatTargetPrescription({ defaultReps: '12 - 15 /leg' }), '12-15 /leg');
  assert.equal(formatTargetPrescription({ defaultReps: '60 - 90 sec' }), '60-90s');
  assert.equal(formatTargetPrescription({ defaultReps: '60-90s' }), '60-90s');
  assert.equal(formatTargetPrescription({ defaultReps: '30-45 sec' }), '30-45s');
  assert.equal(formatTargetPrescription({ defaultReps: '15-20 min' }), '15-20 min');
  assert.equal(formatTargetPrescription({ defaultReps: '15-20 minutes' }), '15-20 min');
  assert.equal(formatTargetPrescription({ defaultReps: '6-8 holds (8s)' }), '6-8 holds (8s)');
  assert.equal(formatTargetPrescription({ defaultReps: 'AMRAP' }), 'AMRAP');
  assert.equal(formatTargetPrescription({ defaultReps: '' }), '8-12 reps');
});
