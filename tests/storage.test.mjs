import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DRAFT_MAX_AGE_MS,
  STORAGE_KEYS,
  buildBackupPayload,
  countDraftCompletedSets,
  parseBackupPayload,
  sanitizeMediaUrl,
  validateActiveWorkoutDraft,
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

test('sanitizeMediaUrl blocks dangerous URI schemes while allowing safe local and HTTPS URLs', () => {
  assert.equal(sanitizeMediaUrl('javascript:alert(1)'), '');
  assert.equal(sanitizeMediaUrl('data:text/html,<script>alert(1)</script>'), '');
  assert.equal(sanitizeMediaUrl('//evil.example.com/tracker.png'), '');
  assert.equal(sanitizeMediaUrl('/assets/squat.webp'), '/assets/squat.webp');
  assert.equal(sanitizeMediaUrl('https://www.youtube-nocookie.com/embed/abc'), 'https://www.youtube-nocookie.com/embed/abc');
  assert.equal(sanitizeMediaUrl('data:image/png;base64,iVBORw0KGgo='), 'data:image/png;base64,iVBORw0KGgo=');
});

test('parseBackupPayload sanitizes dangerous URLs and normalizes missing record IDs', () => {
  const payload = {
    data: {
      routines: [
        {
          title: '',
          exercises: [
            { name: 'Unsafe Ex', illustration: 'javascript:alert(1)', customVideoUrl: 'https://youtube.com/watch?v=1' }
          ]
        }
      ],
      exerciseDatabase: [
        null,
        { id: 'ex-custom', name: 'Custom Lift', illustration: 'data:text/html,<svg onload=alert(1)>' }
      ],
      workoutHistory: [
        { date: '2026-11-15T10:00:00Z' }
      ],
      theme: 'dark',
      weeklyGoal: 4,
    }
  };

  const restored = parseBackupPayload(JSON.stringify(payload));
  assert.equal(restored.routines.length, 1);
  assert.equal(restored.routines[0].id, 'routine-0');
  assert.equal(restored.routines[0].title, 'Workout');
  assert.equal(restored.routines[0].exercises[0].illustration, '');
  assert.equal(restored.routines[0].exercises[0].customVideoUrl, 'https://youtube.com/watch?v=1');
  assert.equal(restored.exerciseDatabase.length, 1);
  assert.equal(restored.exerciseDatabase[0].illustration, '');
  assert.equal(restored.workoutHistory[0].id, '2026-11-15T10:00:00Z');
  assert.equal(restored.workoutHistory[0].routineTitle, 'Workout Session');
});

test('validateActiveWorkoutDraft enforces routineId and 24h expiry while countDraftCompletedSets totals completed sets', () => {
  const now = Date.UTC(2026, 10, 16, 12, 0, 0);
  const freshDraft = {
    routineId: 'r-1',
    currentIndex: 2,
    workoutElapsedSeconds: 600,
    updatedAt: new Date(now - 60_000).toISOString(),
    loggedSets: {
      'ex-1': [{ completed: true }, { completed: false }],
      'ex-2': [{ completed: true }, { completed: true }],
    },
  };
  assert.equal(validateActiveWorkoutDraft(freshDraft, now), freshDraft);
  assert.equal(countDraftCompletedSets(freshDraft), 3);

  const expiredDraft = {
    ...freshDraft,
    updatedAt: new Date(now - DRAFT_MAX_AGE_MS - 1000).toISOString(),
  };
  assert.equal(validateActiveWorkoutDraft(expiredDraft, now), null);
  assert.equal(validateActiveWorkoutDraft({ currentIndex: 0 }, now), null);
});
