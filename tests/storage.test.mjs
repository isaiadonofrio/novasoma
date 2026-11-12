import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STORAGE_KEYS,
  buildBackupPayload,
  parseBackupPayload,
} from '../src/utils/storage.js';

test('STORAGE_KEYS includes WEEKLY_GOAL and expected local keys', () => {
  assert.equal(STORAGE_KEYS.WEEKLY_GOAL, 'corpo_weekly_goal_v1');
  assert.equal(STORAGE_KEYS.ROUTINES, 'corpo_user_routines_v7');
});

test('buildBackupPayload creates valid schema with clamped weeklyGoal and round-trips through parseBackupPayload', () => {
  const payload = buildBackupPayload({
    routines: [{ id: 'r1', title: 'Leg Workout 1', exercises: [] }],
    exerciseDatabase: [{ id: 'ex-1', name: 'Goblet Squat' }],
    workoutHistory: [{ id: 'w1', routineTitle: 'Leg Workout 1' }],
    theme: 'light',
    weeklyGoal: 99,
  });

  assert.equal(payload.app, 'Nova Soma');
  assert.equal(payload.schemaVersion, 1);
  assert.equal(payload.data.weeklyGoal, 7);
  assert.equal(payload.data.theme, 'light');

  const restored = parseBackupPayload(JSON.stringify(payload));
  assert.equal(restored.routines.length, 1);
  assert.equal(restored.exerciseDatabase.length, 1);
  assert.equal(restored.workoutHistory.length, 1);
  assert.equal(restored.theme, 'light');
  assert.equal(restored.weeklyGoal, 7);
});

test('parseBackupPayload rejects malformed JSON and missing required arrays', () => {
  assert.throws(() => parseBackupPayload('{not-json'), /not valid JSON/i);
  assert.throws(() => parseBackupPayload('{}'), /Invalid Nova Soma backup format/i);
  assert.throws(
    () => parseBackupPayload(JSON.stringify({ data: { routines: 'bad' } })),
    /missing routines/i
  );
});
