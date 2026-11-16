import { calculateSessionVolumeKg } from './analytics.js';
import { getRoundedDurationMinutes } from './formatting.js';

/**
 * Generates ~5 weeks of realistic, date-anchored workout history for showcase/demo use.
 * Uses local calendar offsets relative to `referenceDate` so the weekly consistency card,
 * muscle hit map, recent sessions, and annual heatmap look immediately populated.
 */
export function buildDemoWorkoutHistory(routines = [], referenceDate = new Date()) {
  const playable = routines.filter((r) => Array.isArray(r?.exercises) && r.exercises.length > 0);
  const leg1 = playable.find((r) => r.id === 'leg-workout-1') || playable[0];
  const leg2 = playable.find((r) => r.id === 'leg-workout-2') || playable[1] || leg1;

  const schedule = [
    { daysAgo: 0, type: 'manual', title: 'Running', category: 'Cardio', mins: 32, intensity: 'Moderate', notes: 'Zone 2 aerobic base around the park' },
    { daysAgo: 2, type: 'routine', routine: leg1, mins: 62, loadScale: 1.0 },
    { daysAgo: 4, type: 'manual', title: 'Upper Body Session', category: 'Strength', mins: 50, intensity: 'Hard', notes: 'Overhead press & weighted pull-ups' },
    { daysAgo: 6, type: 'routine', routine: leg2, mins: 64, loadScale: 1.0 },
    { daysAgo: 8, type: 'manual', title: 'Mobility Flow', category: 'Recovery', mins: 25, intensity: 'Light', notes: 'Thoracic & hip capsule decompression' },
    { daysAgo: 10, type: 'routine', routine: leg1, mins: 61, loadScale: 0.96 },
    { daysAgo: 13, type: 'manual', title: 'Cycling', category: 'Cardio', mins: 45, intensity: 'Hard', notes: 'Threshold intervals' },
    { daysAgo: 15, type: 'routine', routine: leg2, mins: 63, loadScale: 0.95 },
    { daysAgo: 17, type: 'manual', title: 'Upper Body Session', category: 'Strength', mins: 48, intensity: 'Moderate', notes: 'Bench & rows' },
    { daysAgo: 20, type: 'routine', routine: leg1, mins: 60, loadScale: 0.92 },
    { daysAgo: 23, type: 'routine', routine: leg2, mins: 62, loadScale: 0.92 },
    { daysAgo: 26, type: 'manual', title: 'Running', category: 'Cardio', mins: 35, intensity: 'Moderate', notes: 'Steady recovery pace' },
    { daysAgo: 29, type: 'routine', routine: leg1, mins: 58, loadScale: 0.9 },
    { daysAgo: 32, type: 'routine', routine: leg2, mins: 60, loadScale: 0.88 },
  ];

  const baseDate = new Date(referenceDate);
  baseDate.setHours(18, 15, 0, 0);

  return schedule
    .map((item, idx) => {
      const dt = new Date(baseDate.getTime() - item.daysAgo * 24 * 60 * 60 * 1000);
      const iso = dt.toISOString();
      const durationSeconds = item.mins * 60;

      if (item.type === 'manual' || !item.routine) {
        return {
          id: `demo-manual-${idx}-${dt.getTime()}`,
          routineId: null,
          routineTitle: item.title,
          category: item.category,
          date: iso,
          completedAt: iso,
          durationMinutes: item.mins,
          durationSeconds,
          volumeKg: 0,
          intensity: item.intensity,
          rpe: item.intensity,
          notes: item.notes,
          isManual: true,
          loggedSets: {},
        };
      }

      const loggedSets = {};
      let completedSets = 0;
      let totalSets = 0;

      (item.routine.exercises || []).forEach((ex, exIdx) => {
        const setCount = Math.max(1, Number(ex.defaultSets) || 3);
        const eq = String(ex.equipment || '').toLowerCase();
        const isBw = eq.includes('bodyweight') || eq === 'none';
        const baseWeight = isBw ? 0 : Math.round((20 + ((exIdx * 10) % 60)) * item.loadScale);
        const repsMatch = String(ex.defaultReps || '10').match(/\d+/);
        const baseReps = repsMatch ? repsMatch[0] : '10';

        const sets = [];
        for (let s = 1; s <= setCount; s++) {
          totalSets += 1;
          completedSets += 1;
          sets.push({
            setNum: s,
            reps: baseReps,
            weight: baseWeight > 0 ? String(baseWeight) : '',
            completed: true,
            isDropset: false,
            exerciseName: ex.name,
            sourceId: ex.sourceId || ex.id,
          });
        }
        loggedSets[ex.id] = sets;
      });

      const volumeKg = calculateSessionVolumeKg(loggedSets);

      return {
        id: `demo-session-${idx}-${dt.getTime()}`,
        routineId: item.routine.id,
        routineTitle: item.routine.title,
        category: item.routine.category || 'Training',
        date: iso,
        completedAt: iso,
        durationSeconds,
        durationMinutes: getRoundedDurationMinutes(durationSeconds),
        completedSets,
        totalSets,
        volumeKg,
        loggedSets,
      };
    })
    .filter(Boolean);
}
