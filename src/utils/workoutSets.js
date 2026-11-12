/**
 * Pure helpers for Superset grouping, Dropset generation, and Exercise Timer mode.
 */

/**
 * Inserts an exercise instance into a routine's exercise list, respecting phase order.
 * Warm-up exercises are inserted before the first main-workout exercise;
 * all other exercises are appended at the end.
 */
export function insertExerciseByPhase(existingList, instance) {
  const list = Array.isArray(existingList) ? existingList : [];
  if (!instance?.isWarmup) {
    return [...list, instance];
  }
  const firstMainIndex = list.findIndex(
    (ex) => !(ex.phase === 'warmup' || ex.isWarmup)
  );
  if (firstMainIndex === -1) {
    return [...list, instance];
  }
  return [
    ...list.slice(0, firstMainIndex),
    instance,
    ...list.slice(firstMainIndex),
  ];
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function isRestTimerEnabledForExercise(exercise) {
  if (!exercise) return true;
  if (typeof exercise.timerEnabled === 'boolean') {
    return exercise.timerEnabled;
  }
  const secs = Number(exercise.defaultRestSeconds);
  if (Number.isFinite(secs) && secs <= 0) {
    return false;
  }
  return true;
}

export function getEffectiveRestSeconds(exercise) {
  if (!exercise) return 90;
  const secs = parseInt(exercise.defaultRestSeconds, 10);
  if (Number.isFinite(secs) && secs > 0) return secs;
  return 60;
}

/**
 * Strips orphaned 1-exercise superset groups and normalizes clean references.
 */
export function normalizeSupersetGroups(exercises = []) {
  const counts = new Map();
  exercises.forEach((ex) => {
    if (ex?.supersetGroup) {
      counts.set(ex.supersetGroup, (counts.get(ex.supersetGroup) || 0) + 1);
    }
  });

  return exercises.map((ex) => {
    if (!ex?.supersetGroup) return ex;
    if ((counts.get(ex.supersetGroup) || 0) < 2) {
      const rest = { ...ex };
      delete rest.supersetGroup;
      return rest;
    }
    return ex;
  });
}

/**
 * Computes human-readable superset metadata (`A`, `A1`, `A2`, partner indices)
 * keyed by exercise index in the routine.
 */
export function getSupersetInfoMap(exercises = []) {
  const normalized = normalizeSupersetGroups(exercises);
  const groupIndices = new Map();

  normalized.forEach((ex, idx) => {
    if (!ex?.supersetGroup) return;
    if (!groupIndices.has(ex.supersetGroup)) {
      groupIndices.set(ex.supersetGroup, []);
    }
    groupIndices.get(ex.supersetGroup).push(idx);
  });

  const infoByIndex = new Map();
  let groupOrdinal = 0;

  groupIndices.forEach((indices, groupId) => {
    if (indices.length < 2) return;
    const letter = ALPHABET[groupOrdinal] || `S${groupOrdinal + 1}`;
    groupOrdinal += 1;
    indices.forEach((memberIdx, posInGroup) => {
      infoByIndex.set(memberIdx, {
        groupId,
        letter,
        label: `Superset ${letter}`,
        code: `${letter}${posInGroup + 1}`,
        position: posInGroup,
        size: indices.length,
        memberIndices: indices,
        isFirst: posInGroup === 0,
        isLast: posInGroup === indices.length - 1,
      });
    });
  });

  return infoByIndex;
}

/**
 * Links or unlinks `exercises[index]` with `exercises[index + 1]` in the same phase.
 */
export function toggleSupersetLinkWithNext(exercises = [], index) {
  if (!Array.isArray(exercises) || index < 0 || index >= exercises.length - 1) {
    return exercises;
  }

  const curr = exercises[index];
  const next = exercises[index + 1];
  if (Boolean(curr?.isWarmup) !== Boolean(next?.isWarmup)) {
    return exercises;
  }

  const clone = exercises.map((ex) => ({ ...ex }));
  const a = clone[index];
  const b = clone[index + 1];

  if (a.supersetGroup && a.supersetGroup === b.supersetGroup) {
    // Sever link between a and b: split trailing members into a clean check
    delete b.supersetGroup;
    return normalizeSupersetGroups(clone);
  }

  const targetGroup = a.supersetGroup || b.supersetGroup || `ss-${Date.now()}-${index}`;
  a.supersetGroup = targetGroup;
  b.supersetGroup = targetGroup;
  return normalizeSupersetGroups(clone);
}

export function unlinkExerciseFromSuperset(exercises = [], index) {
  if (!Array.isArray(exercises) || !exercises[index]) return exercises;
  const clone = exercises.map((ex, idx) => {
    if (idx !== index) return ex;
    const copy = { ...ex };
    delete copy.supersetGroup;
    return copy;
  });
  return normalizeSupersetGroups(clone);
}

export function suggestDropSetWeight(weightValue) {
  const num = parseFloat(String(weightValue ?? '').replace(',', '.'));
  if (!Number.isFinite(num) || num <= 0) return '';
  const reduced = Math.max(1, Math.round(num * 0.8 * 2) / 2);
  return String(reduced);
}

export function parseExerciseTargetSeconds(repsText) {
  const s = String(repsText || '').trim();
  const minMatch = s.match(/(\d+(?:\.\d+)?)\s*(?:-|to)?\s*(?:\d+(?:\.\d+)?)?\s*min\b/i);
  if (minMatch) {
    return Math.round(parseFloat(minMatch[1]) * 60);
  }
  const secMatch = s.match(/(\d+)\s*(?:-\s*\d+\s*)?(?:s\b|sec|secondi)/i);
  if (secMatch) {
    return Math.max(5, parseInt(secMatch[1], 10));
  }
  return null;
}

export function buildInitialExerciseSets({
  exercise,
  draftSets = null,
  historySets = null,
  fallbackPrev = '-',
  parsePrevFn,
  formatPrevFn,
}) {
  const defaultWorkingSets = Math.max(1, parseInt(exercise?.defaultSets, 10) || 3);
  const defaultDropSets = Math.max(0, parseInt(exercise?.defaultDropSets, 10) || 0);
  const plannedCount = defaultWorkingSets + defaultDropSets;
  const totalCount = Math.max(plannedCount, Array.isArray(draftSets) ? draftSets.length : 0);
  const defaultRepTarget = String(exercise?.defaultReps ?? '10').split('-')[0]?.trim() || '10';

  const setsArr = [];
  for (let s = 1; s <= totalCount; s++) {
    const draftSet = draftSets?.[s - 1];
    const prevHistSet = historySets?.[s - 1] || historySets?.find((st) => st.completed);
    const computedPrev = prevHistSet && formatPrevFn ? formatPrevFn(prevHistSet) : fallbackPrev;
    const parsedPrev = parsePrevFn ? parsePrevFn(computedPrev) : { weight: '', reps: '' };
    const isPlannedDrop = s > defaultWorkingSets && s <= plannedCount;

    setsArr.push({
      setNum: s,
      exerciseName: exercise?.name || '',
      sourceId: exercise?.sourceId || exercise?.id || '',
      completed: Boolean(draftSet?.completed),
      isDropset: draftSet?.isDropset !== undefined ? Boolean(draftSet.isDropset) : isPlannedDrop,
      reps: draftSet?.reps !== undefined ? String(draftSet.reps) : defaultRepTarget,
      weight: draftSet?.weight !== undefined ? String(draftSet.weight) : '',
      prev: draftSet?.prev && draftSet.prev !== '-' ? draftSet.prev : computedPrev,
      prevWeight: prevHistSet?.weight ? String(prevHistSet.weight) : parsedPrev.weight,
      prevReps: prevHistSet?.reps ? String(prevHistSet.reps) : parsedPrev.reps,
    });
  }
  return setsArr;
}

