import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatVolumeCompact,
  formatSessionDuration,
  formatClock,
  getSessionDurationSeconds,
  getRoundedDurationMinutes,
  resolveSessionCategory
} from '../src/utils/formatting.js';

test('formatVolumeCompact formats kg and tonnes cleanly', () => {
  assert.equal(formatVolumeCompact(0), '0 kg');
  assert.equal(formatVolumeCompact(null), '0 kg');
  assert.equal(formatVolumeCompact(450), '450 kg');
  assert.equal(formatVolumeCompact(1500), '1.5 t');
  assert.equal(formatVolumeCompact(24000), '24.0 t');
});

test('formatSessionDuration formats seconds into minutes and seconds', () => {
  assert.equal(formatSessionDuration(0), '0s');
  assert.equal(formatSessionDuration(45), '45s');
  assert.equal(formatSessionDuration(65), '1m 05s');
  assert.equal(formatSessionDuration(3600), '60m 00s');
});

test('formatClock formats into digital MM:SS or HH:MM:SS', () => {
  assert.equal(formatClock(0), '00:00');
  assert.equal(formatClock(45), '00:45');
  assert.equal(formatClock(125), '02:05');
  assert.equal(formatClock(3665), '01:01:05');
});

test('getSessionDurationSeconds, getRoundedDurationMinutes, and resolveSessionCategory unify metrics consistently', () => {
  assert.equal(getSessionDurationSeconds({ durationSeconds: 2920 }), 2920);
  assert.equal(getSessionDurationSeconds({ durationMinutes: 45 }), 2700);
  assert.equal(getSessionDurationSeconds({ durationSeconds: 0 }), 0);

  // 48m 40s (2920s) rounds uniformly to 49 minutes across Hero, Recent Workouts, and Time This Week
  assert.equal(getRoundedDurationMinutes(2920), 49);
  assert.equal(getRoundedDurationMinutes(45), 1);
  assert.equal(getRoundedDurationMinutes(0), 0);

  const routines = [
    { id: 'leg-workout-1', title: 'Leg Workout 1', category: 'Lower Body' },
  ];
  assert.equal(
    resolveSessionCategory({ category: 'Cardio', routineId: 'leg-workout-1' }, routines),
    'Cardio'
  );
  assert.equal(
    resolveSessionCategory({ routineId: 'leg-workout-1' }, routines),
    'Lower Body'
  );
  assert.equal(
    resolveSessionCategory({ routineTitle: 'Leg Workout 1' }, routines),
    'Lower Body'
  );
  assert.equal(resolveSessionCategory({}, routines), 'Training');
});

