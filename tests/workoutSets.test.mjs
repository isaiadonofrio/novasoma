import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isRestTimerEnabledForExercise,
  getEffectiveRestSeconds,
  getSupersetInfoMap,
  toggleSupersetLinkWithNext,
  unlinkExerciseFromSuperset,
  unlinkSupersetGroup,
  suggestDropSetWeight,
  parseExerciseTargetSeconds,
  buildInitialExerciseSets,
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

  // Pair m1 + m2 into Superset A
  const paired = toggleSupersetLinkWithNext(initial, 1);
  let info = getSupersetInfoMap(paired);
  assert.equal(info.get(1)?.code, 'A1');
  assert.equal(info.get(2)?.code, 'A2');
  assert.equal(info.get(2)?.label, 'Superset A');
  assert.equal(info.get(3), undefined);

  // Extend to Tri-set m1 + m2 + m3
  const triset = toggleSupersetLinkWithNext(paired, 2);
  info = getSupersetInfoMap(triset);
  assert.equal(info.get(3)?.code, 'A3');
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

