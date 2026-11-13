/**
 * ANALYTICS & STATISTICHE DI ALLENAMENTO - CORPO
 * Calcolo metriche di volume, tonnellaggio totale sollevato, streak di costanza e storico progressi.
 */
import { isBodyweightEquipment } from './exerciseImport.js';


/**
 * Converte una data in stringa locale YYYY-MM-DD (evitando slittamenti UTC intorno alla mezzanotte).
 */
export function toLocalDateKey(dateInput) {
  const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(d.getTime())) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calcola il volume sollevato (kg * ripetizioni) per una singola sessione a partire dai loggedSets.
 */
export function calculateSessionVolumeKg(loggedSets) {
  if (!loggedSets || typeof loggedSets !== 'object') return 0;
  let sessionVol = 0;

  Object.values(loggedSets).forEach((sets) => {
    if (!Array.isArray(sets)) return;
    sets.forEach((set) => {
      if (set.completed && set.weight && set.reps) {
        const w = parseFloat(String(set.weight).replace(',', '.')) || 0;
        const r = parseFloat(String(set.reps).replace(',', '.')) || 0;
        sessionVol += w * r;
      }
    });
  });

  return sessionVol;
}

/**
 * Calcola il volume totale sollevato in kg (tonnellaggio) su tutta la cronologia.
 */
export function calculateTotalVolumeKg(history) {
  if (!Array.isArray(history) || history.length === 0) return 0;

  return history.reduce((acc, session) => {
    if (typeof session.volumeKg === 'number' && !Number.isNaN(session.volumeKg)) {
      return acc + session.volumeKg;
    }
    return acc + calculateSessionVolumeKg(session.loggedSets);
  }, 0);
}

/**
 * Calcola il tempo totale cumulativo di allenamento in secondi.
 */
export function calculateTotalTrainingTimeSeconds(history) {
  if (!Array.isArray(history) || history.length === 0) return 0;
  return history.reduce((acc, session) => acc + (session.durationSeconds || 0), 0);
}

/**
 * Formatta i secondi in ore e minuti leggibili (es. "4h 25m").
 */
export function formatHoursMinutes(totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return '0 min';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
}

/**
 * Calcola la streak di costanza e la mappa settimanale Lun-Dom.
 */
export function calculateStreak(history) {
  if (!Array.isArray(history) || history.length === 0) {
    return {
      currentStreakDays: 0,
      trainedToday: false,
      activeDaysThisWeek: 0,
      totalActiveDays: 0,
      weeklyActivityMap: [false, false, false, false, false, false, false]
    };
  }

  const dateSet = new Set();
  history.forEach((item) => {
    const rawDate = item.date || item.completedAt;
    if (!rawDate) return;
    const key = toLocalDateKey(rawDate);
    if (key) dateSet.add(key);
  });

  const uniqueDates = Array.from(dateSet).sort().reverse();
  const totalActiveDays = uniqueDates.length;

  const now = new Date();
  const todayStr = toLocalDateKey(now);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toLocalDateKey(yesterday);

  const trainedToday = dateSet.has(todayStr);

  // Consente 1 giorno di riposo se l'ultimo allenamento è stato ieri
  let currentStreak = 0;
  const checkDate = new Date(now);

  if (!trainedToday && dateSet.has(yesterdayStr)) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  if (trainedToday || dateSet.has(yesterdayStr)) {
    while (true) {
      const dateStr = toLocalDateKey(checkDate);
      if (dateSet.has(dateStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Mappa attività della settimana corrente (Lun -> Dom)
  const currentDayOfWeek = (now.getDay() + 6) % 7; // 0 = Lunedì, 6 = Domenica
  const monday = new Date(now);
  monday.setDate(now.getDate() - currentDayOfWeek);
  monday.setHours(0, 0, 0, 0);

  const weeklyActivityMap = [false, false, false, false, false, false, false];
  let activeDaysThisWeek = 0;

  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    const dayStr = toLocalDateKey(day);
    if (dateSet.has(dayStr)) {
      weeklyActivityMap[i] = true;
      activeDaysThisWeek++;
    }
  }

  return {
    currentStreakDays: currentStreak,
    trainedToday,
    activeDaysThisWeek,
    totalActiveDays,
    weeklyActivityMap
  };
}

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Compute longest consecutive-day training streak across all recorded history.
 */
export function calculateBestStreak(history = []) {
  if (!Array.isArray(history) || history.length === 0) return 0;
  const uniqueKeys = [...new Set(
    history
      .map((item) => toLocalDateKey(item.date || item.completedAt))
      .filter(Boolean)
  )].sort();

  if (uniqueKeys.length === 0) return 0;

  let best = 1;
  let current = 1;
  for (let i = 1; i < uniqueKeys.length; i++) {
    const prev = new Date(`${uniqueKeys[i - 1]}T12:00:00`);
    const next = new Date(`${uniqueKeys[i]}T12:00:00`);
    const diffDays = Math.round((next - prev) / 86400000);
    if (diffDays === 1) {
      current += 1;
      if (current > best) best = current;
    } else if (diffDays > 1) {
      current = 1;
    }
  }
  return best;
}

/**
 * Compute aggregate plan, muscle distribution, and completed session telemetry for the Overview.
 */
export function calculateOverviewDashboardStats(routines = [], exerciseLibrary = [], history = [], muscleLabels = {}) {
  const safeRoutines = Array.isArray(routines) ? routines : [];
  const safeLibrary = Array.isArray(exerciseLibrary) ? exerciseLibrary : [];
  const safeHistory = Array.isArray(history) ? history : [];

  const libById = new Map(safeLibrary.map((ex) => [ex.id, ex]));
  const libByName = new Map(safeLibrary.map((ex) => [(ex.name || '').toLowerCase().trim(), ex]));

  const muscleCounts = new Map();
  let totalPlannedExercises = 0;
  let totalPlannedSets = 0;
  let totalRoutineDurationMins = 0;
  let bodyweightPlanned = 0;

  safeRoutines.forEach((routine) => {
    totalRoutineDurationMins += Number(routine.durationMinutes ?? routine.durationMins) || 60;
    (routine.exercises || []).forEach((item) => {
      totalPlannedExercises += 1;
      const parsedSets = parseInt(item.sets ?? item.defaultSets, 10);
      totalPlannedSets += Number.isFinite(parsedSets) && parsedSets > 0 ? parsedSets : 3;

      const matched =
        (item.id && libById.get(item.id)) ||
        libByName.get((item.name || '').toLowerCase().trim()) ||
        item;

      const isBodyweightItem =
        matched.requiresEquipment === false ||
        matched.usesEquipment === false ||
        isBodyweightEquipment(matched.equipment || item.equipment || '');

      if (isBodyweightItem) {
        bodyweightPlanned += 1;
      }

      const muscle = matched.muscleKey || matched.muscle || item.muscleKey || item.muscle;
      if (muscle) {
        muscleCounts.set(muscle, (muscleCounts.get(muscle) || 0) + 1);
      }
    });
  });

  const sortedMuscles = Array.from(muscleCounts.entries())
    .sort((a, b) => b[1] - a[1]);

  const totalTagged = sortedMuscles.reduce((acc, [, count]) => acc + count, 0);
  const muscleBreakdown = sortedMuscles.map(([key, count], idx) => ({
    key,
    label: muscleLabels[key] || key,
    count,
    percent: totalTagged > 0 ? Math.round((count / totalTagged) * 100) : 0,
    toneIndex: idx % 5,
  }));

  const libraryBodyweightCount = safeLibrary.filter(
    (ex) => ex.requiresEquipment === false || ex.usesEquipment === false || isBodyweightEquipment(ex.equipment || '')
  ).length;
  const libraryEquipmentCount = Math.max(0, safeLibrary.length - libraryBodyweightCount);

  let totalCompletedSets = 0;
  let totalDurationSeconds = 0;
  let totalVolumeKg = 0;

  safeHistory.forEach((session) => {
    const dur = Number(session.durationSeconds);
    if (Number.isFinite(dur) && dur > 0) totalDurationSeconds += dur;

    const vol = Number(session.volumeKg);
    totalVolumeKg += Number.isFinite(vol) ? vol : calculateSessionVolumeKg(session.loggedSets);

    if (session.loggedSets && typeof session.loggedSets === 'object') {
      Object.values(session.loggedSets).forEach((setsList) => {
        if (Array.isArray(setsList)) {
          totalCompletedSets += setsList.filter((s) => s && s.completed !== false).length;
        }
      });
    }
  });

  const sortedHistory = [...safeHistory].sort((a, b) => {
    const da = new Date(a.completedAt || a.date || 0).getTime();
    const db = new Date(b.completedAt || b.date || 0).getTime();
    return db - da;
  });

  const latest = sortedHistory[0] || null;
  let lastSessionSummary = null;
  if (latest) {
    const latestKey = toLocalDateKey(latest.date || latest.completedAt);
    const todayKey = toLocalDateKey(new Date());
    let whenLabel = latestKey || 'Recent';
    if (latestKey === todayKey) {
      whenLabel = 'Today';
    } else if (latestKey) {
      const diffDays = Math.round((new Date(`${todayKey}T12:00:00`) - new Date(`${latestKey}T12:00:00`)) / 86400000);
      if (diffDays === 1) whenLabel = 'Yesterday';
      else if (diffDays > 1 && diffDays < 30) whenLabel = `${diffDays}d ago`;
    }
    const mins = Math.max(1, Math.round((Number(latest.durationSeconds) || 0) / 60));
    lastSessionSummary = {
      title: latest.routineTitle || 'Workout Session',
      whenLabel,
      durationLabel: `${mins} min`,
      volumeKg: Math.round(Number(latest.volumeKg) || calculateSessionVolumeKg(latest.loggedSets)),
    };
  }

  return {
    totalRoutines: safeRoutines.length,
    totalPlannedExercises,
    totalPlannedSets,
    avgDurationMins: safeRoutines.length > 0 ? Math.round(totalRoutineDurationMins / safeRoutines.length) : 0,
    bodyweightSharePercent: totalPlannedExercises > 0 ? Math.round((bodyweightPlanned / totalPlannedExercises) * 100) : 0,
    muscleBreakdown,
    libraryCount: safeLibrary.length,
    libraryEquipmentCount,
    libraryBodyweightCount,
    completedSessions: safeHistory.length,
    totalCompletedSets,
    totalTrainingTime: formatHoursMinutes(totalDurationSeconds),
    totalVolumeKg: Math.round(totalVolumeKg),
    bestStreakDays: calculateBestStreak(safeHistory),
    lastSessionSummary,
  };
}

/**
 * Build 12 distinct calendar-month clusters for the current solar year (Jan–Dec).
 */
export function calculateMonthGroupedHeatmap(history = []) {
  const safeHistory = Array.isArray(history) ? history : [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const todayKey = toLocalDateKey(today);

  const dayStatsMap = new Map();
  safeHistory.forEach((session) => {
    const key = toLocalDateKey(session.date || session.completedAt);
    if (!key) return;
    const prev = dayStatsMap.get(key) || {
      count: 0,
      durationSeconds: 0,
      volumeKg: 0,
      titles: [],
    };
    const vol = Number(session.volumeKg);
    const dur = Number(session.durationSeconds);
    prev.count += 1;
    prev.durationSeconds += Number.isFinite(dur) ? dur : 0;
    prev.volumeKg += Number.isFinite(vol) ? vol : calculateSessionVolumeKg(session.loggedSets);
    if (session.routineTitle && !prev.titles.includes(session.routineTitle)) {
      prev.titles.push(session.routineTitle);
    }
    dayStatsMap.set(key, prev);
  });

  const months = [];
  let activeDaysYear = 0;
  let totalWorkoutsYear = 0;
  let totalSecondsYear = 0;
  let totalVolumeYear = 0;

  // Iterate chronologically through the current solar year (Jan = 0 .. Dec = 11)
  const baseYear = today.getFullYear();
  const baseMonth = today.getMonth();

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const year = baseYear;
    const monthStart = new Date(year, monthIndex, 1, 12, 0, 0, 0);
    const daysInMonth = new Date(year, monthIndex + 1, 0, 12, 0, 0, 0).getDate();

    const startWeekday = (monthStart.getDay() + 6) % 7; // Mon = 0 .. Sun = 6
    const weekColumnsCount = Math.ceil((startWeekday + daysInMonth) / 7);

    const weeks = [];
    let monthWorkouts = 0;
    let monthActiveDays = 0;

    for (let w = 0; w < weekColumnsCount; w++) {
      const colDays = [];
      for (let d = 0; d < 7; d++) {
        const dayNum = w * 7 + d - startWeekday + 1;
        if (dayNum < 1 || dayNum > daysInMonth) {
          colDays.push({
            dateKey: `pad-${year}-${monthIndex}-${w}-${d}`,
            isPad: true,
          });
          continue;
        }

        const cellDate = new Date(year, monthIndex, dayNum, 12, 0, 0, 0);
        const dateKey = toLocalDateKey(cellDate);
        const isFuture = cellDate > today;
        const isToday = dateKey === todayKey;
        const stats = !isFuture ? dayStatsMap.get(dateKey) : null;

        let level = 0;
        if (stats && stats.count > 0) {
          monthActiveDays += 1;
          monthWorkouts += stats.count;
          activeDaysYear += 1;
          totalWorkoutsYear += stats.count;
          totalSecondsYear += stats.durationSeconds;
          totalVolumeYear += stats.volumeKg;

          if (stats.count >= 2 || stats.durationSeconds >= 4500 || stats.volumeKg >= 6000) {
            level = 4;
          } else if (stats.durationSeconds >= 2700 || stats.volumeKg >= 2500) {
            level = 3;
          } else if (stats.durationSeconds >= 1200 || stats.volumeKg > 0) {
            level = 2;
          } else {
            level = 1;
          }
        }

        colDays.push({
          isPad: false,
          dateKey,
          dateLabel: cellDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          isFuture,
          isToday,
          level,
          count: stats?.count || 0,
          durationSeconds: stats?.durationSeconds || 0,
          volumeKg: stats?.volumeKg || 0,
          titles: stats?.titles || [],
        });
      }
      weeks.push(colDays);
    }

    months.push({
      key: `${year}-${String(monthIndex + 1).padStart(2, '0')}`,
      label: MONTH_SHORT[monthIndex],
      yearLabel: '',
      isCurrentMonth: year === baseYear && monthIndex === baseMonth,
      workoutsCount: monthWorkouts,
      activeDaysCount: monthActiveDays,
      weeks,
    });
  }

  return {
    months,
    activeDaysYear,
    totalWorkoutsYear,
    totalTimeYear: formatHoursMinutes(totalSecondsYear),
    totalVolumeYear: Math.round(totalVolumeYear),
    bestStreakDays: calculateBestStreak(safeHistory),
    rangeLabel: `Jan – Dec ${baseYear}`,
  };
}

/**
 * Calculate weekly muscle frequency (number of times each muscle was hit this week).
 * 1 hit  -> Gold / Yellow ('hit-1')
 * 2 hits -> Bronze / Orange ('hit-2')
 * 3+ hits -> Ember / Red ('hit-3')
 */
export function calculateWeeklyMuscleFrequency(history = [], routines = []) {
  const safeHistory = Array.isArray(history) ? history : [];
  const safeRoutines = Array.isArray(routines) ? routines : [];

  const now = new Date();
  const dayFromMonday = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - dayFromMonday);
  const mondayKey = toLocalDateKey(monday);

  const routineMap = new Map();
  safeRoutines.forEach((r) => {
    if (r.id) routineMap.set(String(r.id), r);
    if (r.title) routineMap.set(r.title.toLowerCase().trim(), r);
  });

  const frequencyMap = {};
  let totalSessionsThisWeek = 0;

  safeHistory.forEach((session) => {
    const sDate = session.date || session.completedAt;
    const sKey = toLocalDateKey(sDate);
    if (!sKey || sKey < mondayKey) return;

    totalSessionsThisWeek += 1;
    const sessionMuscles = new Set();

    const matchedRoutine =
      (session.routineId && routineMap.get(String(session.routineId))) ||
      (session.routineTitle && routineMap.get(session.routineTitle.toLowerCase().trim()));

    if (matchedRoutine && Array.isArray(matchedRoutine.exercises)) {
      matchedRoutine.exercises.forEach((ex) => {
        if (ex.muscleKey) sessionMuscles.add(ex.muscleKey);
        if (Array.isArray(ex.secondaryKeys)) {
          ex.secondaryKeys.forEach((sk) => sessionMuscles.add(sk));
        }
      });
    } else {
      const title = (session.routineTitle || '').toLowerCase();
      const cat = (session.category || '').toLowerCase();

      if (title.includes('run') || cat.includes('cardio')) {
        ['quads', 'calves', 'glutes', 'hamstrings'].forEach((m) => sessionMuscles.add(m));
      } else if (title.includes('cycl') || title.includes('bike')) {
        ['quads', 'glutes', 'calves'].forEach((m) => sessionMuscles.add(m));
      } else if (title.includes('swim')) {
        ['back', 'shoulders', 'chest', 'abdomen'].forEach((m) => sessionMuscles.add(m));
      } else if (title.includes('tennis')) {
        ['shoulders', 'forearm', 'calves', 'obliques'].forEach((m) => sessionMuscles.add(m));
      } else if (title.includes('hik') || title.includes('trek')) {
        ['glutes', 'quads', 'calves', 'back'].forEach((m) => sessionMuscles.add(m));
      } else if (title.includes('mobilit') || cat.includes('recovery')) {
        ['back', 'glutes', 'obliques', 'shoulders'].forEach((m) => sessionMuscles.add(m));
      } else if (title.includes('gym') || cat.includes('strength')) {
        ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'quads', 'glutes'].forEach((m) => sessionMuscles.add(m));
      } else {
        ['quads', 'calves', 'shoulders', 'abdomen'].forEach((m) => sessionMuscles.add(m));
      }
    }

    sessionMuscles.forEach((muscleKey) => {
      frequencyMap[muscleKey] = (frequencyMap[muscleKey] || 0) + 1;
    });
  });

  const trainedMusclesCount = Object.keys(frequencyMap).filter((k) => frequencyMap[k] > 0).length;

  return {
    frequencyMap,
    totalSessionsThisWeek,
    trainedMusclesCount,
  };
}
