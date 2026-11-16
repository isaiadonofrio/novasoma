import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDemoWorkoutHistory } from '../src/utils/demoData.js';

test('buildDemoWorkoutHistory creates realistic routine and manual sessions anchored to referenceDate', () => {
  const sampleRoutines = [
    {
      id: 'leg-workout-1',
      title: 'Legs · Squat & Posterior Chain',
      category: 'Legs & Glutes',
      exercises: [
        { id: 'ex-barbell-rdl', name: 'Barbell RDL', equipment: 'Barbell', defaultSets: 3, defaultReps: '8-10' },
        { id: 'wu-jump-rope', name: 'Jump Rope', equipment: 'Bodyweight', defaultSets: 2, defaultReps: '60s', isWarmup: true },
      ],
    },
  ];

  const refDate = new Date('2026-11-16T12:00:00Z');
  const history = buildDemoWorkoutHistory(sampleRoutines, refDate);

  assert.equal(history.length, 14);
  const manualEntries = history.filter((s) => s.isManual);
  const routineEntries = history.filter((s) => !s.isManual);

  assert.equal(manualEntries.length, 6);
  assert.equal(routineEntries.length, 8);
  assert.ok(routineEntries.every((s) => s.completedSets === s.totalSets && s.totalSets > 0));
  assert.ok(routineEntries.every((s) => s.volumeKg > 0));
  assert.ok(manualEntries.every((s) => s.durationSeconds > 0 && s.category));
});
