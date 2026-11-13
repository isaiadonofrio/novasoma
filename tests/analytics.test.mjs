import test from 'node:test';
import assert from 'node:assert/strict';
import {
  toLocalDateKey,
  calculateSessionVolumeKg,
  calculateTotalVolumeKg,
  calculateStreak,
  calculateBestStreak,
  calculateOverviewDashboardStats,
  calculateMonthGroupedHeatmap,
  calculateWeeklyMuscleFrequency,
} from '../src/utils/analytics.js';

test('toLocalDateKey formats local calendar YYYY-MM-DD and rejects invalid input', () => {
  const sample = new Date(2026, 4, 7, 14, 30, 0);
  assert.equal(toLocalDateKey(sample), '2026-05-07');
  assert.equal(toLocalDateKey('not-a-date'), null);
});

test('calculateSessionVolumeKg sums completed weighted sets and ignores incomplete or bodyweight sets', () => {
  const loggedSets = {
    'ex-rdl': [
      { setNum: 1, weight: '60', reps: '10', completed: true },
      { setNum: 2, weight: '65,5', reps: '8', completed: true },
      { setNum: 3, weight: '70', reps: '8', completed: false },
    ],
    'ex-plank': [
      { setNum: 1, weight: '', reps: '45', completed: true },
    ],
  };
  assert.equal(calculateSessionVolumeKg(loggedSets), 60 * 10 + 65.5 * 8);
  assert.equal(calculateSessionVolumeKg(null), 0);
});

test('calculateTotalVolumeKg handles empty and populated history arrays', () => {
  assert.equal(calculateTotalVolumeKg([]), 0);
  const total = calculateTotalVolumeKg([
    { volumeKg: 1200 },
    { loggedSets: { a: [{ weight: '50', reps: '10', completed: true }] } },
  ]);
  assert.equal(total, 1700);
});

test('calculateStreak and calculateBestStreak count consecutive days accurately', () => {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  const today = new Date(now);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(now.getDate() - 5);
  const fourDaysAgo = new Date(now);
  fourDaysAgo.setDate(now.getDate() - 4);
  const threeDaysAgo = new Date(now);
  threeDaysAgo.setDate(now.getDate() - 3);

  const history = [
    { date: today.toISOString(), completedAt: today.toISOString() },
    { date: yesterday.toISOString(), completedAt: yesterday.toISOString() },
    { date: threeDaysAgo.toISOString(), completedAt: threeDaysAgo.toISOString() },
    { date: fourDaysAgo.toISOString(), completedAt: fourDaysAgo.toISOString() },
    { date: fiveDaysAgo.toISOString(), completedAt: fiveDaysAgo.toISOString() },
  ];

  const streak = calculateStreak(history);
  assert.equal(streak.trainedToday, true);
  assert.equal(streak.currentStreakDays, 2);
  assert.equal(calculateBestStreak(history), 3);
});

test('calculateMonthGroupedHeatmap builds 12 solar-year months Jan-Dec with active session counts', () => {
  const now = new Date();
  const year = now.getFullYear();
  const sampleDate = new Date(year, 2, 15, 12, 0, 0); // Mar 15 of current year
  const heatmap = calculateMonthGroupedHeatmap([
    {
      id: 's1',
      date: sampleDate.toISOString(),
      durationSeconds: 1800,
      volumeKg: 1500,
      routineTitle: 'Leg Workout 1',
    },
  ]);

  assert.equal(heatmap.months.length, 12);
  assert.equal(heatmap.months[0].label, 'Jan');
  assert.equal(heatmap.months[11].label, 'Dec');
  assert.equal(heatmap.rangeLabel, `Jan – Dec ${year}`);
  assert.equal(heatmap.activeDaysYear, 1);
  assert.equal(heatmap.totalWorkoutsYear, 1);
  assert.equal(heatmap.totalVolumeYear, 1500);
  assert.equal(heatmap.months[2].workoutsCount, 1);
});

test('calculateOverviewDashboardStats aggregates planned sets, bodyweight percentage, and last session summary', () => {
  const routines = [
    {
      id: 'r1',
      title: 'Push Day',
      durationMins: 40,
      exercises: [
        { id: 'e1', muscleKey: 'chest', defaultSets: 3, equipment: 'Dumbbell', requiresEquipment: true },
        { id: 'e2', muscleKey: 'abdomen', defaultSets: 2, equipment: 'Bodyweight', requiresEquipment: false },
      ],
    },
  ];
  const library = [
    { id: 'e1', equipment: 'Dumbbell', requiresEquipment: true },
    { id: 'e2', equipment: 'Bodyweight', requiresEquipment: false },
  ];
  const history = [
    {
      id: 'h1',
      date: '2026-05-01T10:00:00.000Z',
      routineTitle: 'Push Day',
      durationSeconds: 2400,
      completedSets: 5,
      volumeKg: 950,
    },
  ];

  const stats = calculateOverviewDashboardStats(routines, library, history, {
    chest: 'Chest',
    abdomen: 'Abs & Core',
  });

  assert.equal(stats.totalRoutines, 1);
  assert.equal(stats.totalPlannedExercises, 2);
  assert.equal(stats.totalPlannedSets, 5);
  assert.equal(stats.bodyweightSharePercent, 50);
  assert.equal(stats.completedSessions, 1);
  assert.equal(stats.totalVolumeKg, 950);
  assert.equal(stats.lastSessionSummary.title, 'Push Day');
  assert.equal(stats.lastSessionSummary.durationLabel, '40 min');
});

test('calculateWeeklyMuscleFrequency accurately tallies muscle hits for current week', () => {
  const routines = [
    {
      id: 'leg-1',
      title: 'Leg Day',
      exercises: [{ muscleKey: 'quads' }, { muscleKey: 'glutes' }],
    },
  ];

  const now = new Date();
  const history = [
    {
      id: 'sess-1',
      date: now.toISOString(),
      routineId: 'leg-1',
      routineTitle: 'Leg Day',
    },
  ];

  const result = calculateWeeklyMuscleFrequency(history, routines);
  assert.equal(result.totalSessionsThisWeek, 1);
  assert.equal(result.frequencyMap.quads, 1);
  assert.equal(result.frequencyMap.glutes, 1);
  assert.equal(result.trainedMusclesCount, 2);
});


