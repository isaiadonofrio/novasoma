/**
 * Pure helpers for Superset grouping, Dropset generation, and Exercise Timer mode.
 */

/**
 * Classifies an exercise into its workout timeline phase:
 * 'warmup' | 'main' | 'decompression'
 */
export function getExercisePhaseInfo(exercise) {
  if (
    exercise?.phase === 'decompression' ||
    exercise?.phase === 'cooldown' ||
    exercise?.isDecompression ||
    exercise?.isCooldown ||
    exercise?.id === 'ex-decompression-brisk-walk' ||
    /\b(decompression|cool\s*-?\s*down)\b/i.test(String(exercise?.name || ''))
  ) {
    return {
      key: 'decompression',
      label: 'Decompression',
      shortLabel: 'DECOMPRESSION',
    };
  }
  if (exercise?.phase === 'warmup' || exercise?.isWarmup) {
    return {
      key: 'warmup',
      label: 'Warm-Up',
      shortLabel: 'WARM-UP',
    };
  }
  return {
    key: 'main',
    label: 'Workout',
    shortLabel: 'WORKOUT',
  };
}

/**
 * Inserts an exercise instance into a routine's exercise list, respecting phase order:
 * warmup -> main -> decompression.
 */
export function insertExerciseByPhase(existingList, instance) {
  const list = Array.isArray(existingList) ? existingList : [];
  const phaseKey = getExercisePhaseInfo(instance).key;
  if (phaseKey === 'decompression') {
    return [...list, instance];
  }
  if (phaseKey === 'warmup') {
    const firstNonWarmupIndex = list.findIndex(
      (ex) => getExercisePhaseInfo(ex).key !== 'warmup'
    );
    if (firstNonWarmupIndex === -1) {
      return [...list, instance];
    }
    return [
      ...list.slice(0, firstNonWarmupIndex),
      instance,
      ...list.slice(firstNonWarmupIndex),
    ];
  }
  const firstDecompressionIndex = list.findIndex(
    (ex) => getExercisePhaseInfo(ex).key === 'decompression'
  );
  if (firstDecompressionIndex === -1) {
    return [...list, instance];
  }
  return [
    ...list.slice(0, firstDecompressionIndex),
    instance,
    ...list.slice(firstDecompressionIndex),
  ];
}

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
 * Finds contiguous superset block runs in an exercise list where consecutive
 * movements share both the same `supersetGroup` and the same phase (`isWarmup`).
 */
function getSupersetRuns(exercises = []) {
  const runs = [];
  let current = null;

  exercises.forEach((ex, idx) => {
    const groupId = ex?.supersetGroup;
    const isWarmup = Boolean(ex?.isWarmup);
    if (!groupId) {
      current = null;
      return;
    }

    if (current && current.groupId === groupId && current.isWarmup === isWarmup) {
      current.indices.push(idx);
    } else {
      current = { groupId, isWarmup, indices: [idx] };
      runs.push(current);
    }
  });

  return runs;
}

/**
 * Returns the inclusive `{ start, end, groupId }` bounds of the contiguous
 * superset block containing `index`, or `null` if standalone.
 */
function getSupersetBlockBounds(exercises = [], index) {
  const target = exercises[index];
  const groupId = target?.supersetGroup;
  if (!groupId) return null;
  const isWarmup = Boolean(target?.isWarmup);

  let start = index;
  while (
    start > 0 &&
    exercises[start - 1]?.supersetGroup === groupId &&
    Boolean(exercises[start - 1]?.isWarmup) === isWarmup
  ) {
    start -= 1;
  }

  let end = index;
  while (
    end < exercises.length - 1 &&
    exercises[end + 1]?.supersetGroup === groupId &&
    Boolean(exercises[end + 1]?.isWarmup) === isWarmup
  ) {
    end += 1;
  }

  if (end <= start) return null;
  return { start, end, groupId };
}

/**
 * Strips orphaned 1-exercise or non-contiguous superset fragments and ensures
 * each contiguous same-phase superset run has a unique group ID.
 */
export function normalizeSupersetGroups(exercises = []) {
  const runs = getSupersetRuns(exercises);
  const resolvedGroupByIndex = new Map();
  const seenGroupIds = new Set();

  runs.forEach((run) => {
    if (run.indices.length < 2) return;
    let resolvedId = run.groupId;
    if (seenGroupIds.has(resolvedId)) {
      resolvedId = `${run.groupId}-${run.indices[0]}`;
      while (seenGroupIds.has(resolvedId)) {
        resolvedId = `${resolvedId}-x`;
      }
    }
    seenGroupIds.add(resolvedId);
    run.indices.forEach((idx) => {
      resolvedGroupByIndex.set(idx, resolvedId);
    });
  });

  return exercises.map((ex, idx) => {
    if (!ex?.supersetGroup) return ex;
    const resolvedId = resolvedGroupByIndex.get(idx);
    if (!resolvedId) {
      const rest = { ...ex };
      delete rest.supersetGroup;
      return rest;
    }
    if (resolvedId !== ex.supersetGroup) {
      return { ...ex, supersetGroup: resolvedId };
    }
    return ex;
  });
}

/**
 * Moves an exercise up (`delta = -1`) or down (`delta = 1`) while preserving
 * contiguous superset blocks:
 * - A standalone item jumps cleanly past an adjacent superset block.
 * - Moving an interior member swaps within its superset.
 * - Moving a superset boundary member outward shifts the whole superset block together.
 */
export function reorderExerciseInRoutine(exercises = [], index, delta) {
  if ((delta !== -1 && delta !== 1) || index < 0 || index >= exercises.length) {
    return exercises;
  }

  const list = normalizeSupersetGroups(exercises);
  const adjIdx = index + delta;
  if (adjIdx < 0 || adjIdx >= list.length) {
    return list;
  }

  const myBlock = getSupersetBlockBounds(list, index);

  if (!myBlock) {
    const adjBlock = getSupersetBlockBounds(list, adjIdx);
    const next = [...list];
    const [moved] = next.splice(index, 1);

    if (!adjBlock) {
      next.splice(adjIdx, 0, moved);
    } else if (delta === 1) {
      // `index` was before `adjBlock`, so removing `index` shifted the block left by 1
      next.splice(adjBlock.end, 0, moved);
    } else {
      // `index` was after `adjBlock`, so `adjBlock.start` is unchanged
      next.splice(adjBlock.start, 0, moved);
    }

    return normalizeSupersetGroups(next);
  }

  const movingWithinBlock =
    (delta === 1 && index < myBlock.end) || (delta === -1 && index > myBlock.start);

  if (movingWithinBlock) {
    const next = [...list];
    [next[index], next[adjIdx]] = [next[adjIdx], next[index]];
    return normalizeSupersetGroups(next);
  }

  const neighborIdx = delta === -1 ? myBlock.start - 1 : myBlock.end + 1;
  if (neighborIdx < 0 || neighborIdx >= list.length) {
    return list;
  }

  const neighborBlock = getSupersetBlockBounds(list, neighborIdx);
  const jumpStart = neighborBlock ? neighborBlock.start : neighborIdx;
  const jumpEnd = neighborBlock ? neighborBlock.end : neighborIdx;

  const next = [...list];
  const blockLen = myBlock.end - myBlock.start + 1;
  const blockItems = next.splice(myBlock.start, blockLen);
  const insertAt = delta === -1 ? jumpStart : jumpEnd + 1 - blockLen;
  next.splice(insertAt, 0, ...blockItems);

  return normalizeSupersetGroups(next);
}

/**
 * Reorders an exercise via drag-and-drop while keeping superset blocks contiguous:
 * - Dropping onto another member of the same superset reorders inside that superset.
 * - Dropping a standalone item (or pulling an item out of its own superset) onto
 *   a different superset snaps cleanly outside that target superset block.
 */
export function dropExerciseInRoutine(exercises = [], sourceIdx, targetIdx) {
  if (
    sourceIdx === null ||
    targetIdx === null ||
    sourceIdx === undefined ||
    targetIdx === undefined ||
    sourceIdx === targetIdx
  ) {
    return exercises;
  }

  const list = normalizeSupersetGroups(exercises);
  if (
    sourceIdx < 0 ||
    sourceIdx >= list.length ||
    targetIdx < 0 ||
    targetIdx >= list.length
  ) {
    return list;
  }

  const sourceBlock = getSupersetBlockBounds(list, sourceIdx);
  const targetBlock = getSupersetBlockBounds(list, targetIdx);
  const sameBlock = Boolean(sourceBlock && targetBlock && sourceBlock.groupId === targetBlock.groupId);

  const next = [...list];
  const [rawMoved] = next.splice(sourceIdx, 1);
  let moved = rawMoved;

  if (sourceBlock && !sameBlock && moved?.supersetGroup) {
    moved = { ...moved };
    delete moved.supersetGroup;
  }

  let insertAt = targetIdx;
  if (!sameBlock && targetBlock) {
    if (sourceIdx < targetIdx) {
      insertAt = targetBlock.end;
    } else {
      insertAt = targetBlock.start;
    }
  }

  next.splice(insertAt, 0, moved);
  return normalizeSupersetGroups(next);
}

/**
 * Computes numerical superset metadata (`2-3`, `2`, `3`, partner indices)
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
  let groupOrdinal = 1;

  groupIndices.forEach((indices, groupId) => {
    if (indices.length < 2) return;
    const groupNumber = groupOrdinal;
    groupOrdinal += 1;
    const firstNum = indices[0] + 1;
    const lastNum = indices[indices.length - 1] + 1;
    const rangeLabel = `${firstNum}-${lastNum}`;
    indices.forEach((memberIdx, posInGroup) => {
      const exerciseNumber = memberIdx + 1;
      infoByIndex.set(memberIdx, {
        groupId,
        groupNumber,
        rangeLabel,
        letter: rangeLabel,
        label: `Superset ${rangeLabel}`,
        code: `${exerciseNumber}`,
        exerciseNumber,
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

export function unlinkSupersetGroup(exercises = [], groupId) {
  if (!Array.isArray(exercises) || !groupId) return exercises;
  const clone = exercises.map((ex) => {
    if (ex?.supersetGroup === groupId) {
      const copy = { ...ex };
      delete copy.supersetGroup;
      return copy;
    }
    return ex;
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

export function doesExerciseUseExternalWeight(exercise) {
  if (!exercise) return false;
  if (typeof exercise.usesWeight === 'boolean') {
    return exercise.usesWeight;
  }
  if (exercise.requiresEquipment === false || exercise.usesEquipment === false) {
    return false;
  }
  if ((exercise.phase === 'warmup' || exercise.isWarmup) && String(exercise.mechanics || '').toLowerCase() === 'mobility') {
    return false;
  }
  const eq = String(exercise.equipment || '').toLowerCase();
  return /\b(barbell|dumbbell|dumbbells|kettlebell|medicine ball|med ball|slam ball|plate|cable|machine|ez-bar|trap bar|landmine|weighted|vest)\b/i.test(eq);
}

export function getExerciseSetLoggingProfile(exercise) {
  const defaultReps = String(exercise?.defaultReps || '');
  const name = String(exercise?.name || '');

  const isRepHoldDuration = /\bholds?\s*\(/i.test(defaultReps);
  const isMinutes = /\bmin(?:s|utes|uti)?\b/i.test(defaultReps);
  const isSeconds = !isMinutes && !isRepHoldDuration && /(?:\d\s*s\b|sec|secondi)/i.test(defaultReps);
  const isTimed = isMinutes || isSeconds;
  const isHold = isTimed && (
    /\b(plank|hold|wall sit|isometric|bridge hold|hollow|superman|hang)\b/i.test(name) ||
    /\bhold/i.test(defaultReps) ||
    String(exercise?.mechanics || '').toLowerCase() === 'isometric'
  );
  const isFlows = /\bflows?\b/i.test(defaultReps);
  const isSteps = /\bsteps?\b/i.test(defaultReps);
  const isPerSide = /\/\s*(?:side|dir|arm|hand)\b/i.test(defaultReps);
  const isPerLeg = /\/\s*leg\b/i.test(defaultReps);

  let statHeader = 'REPS';
  if (isRepHoldDuration) {
    statHeader = 'HOLDS';
  } else if (isMinutes) {
    statHeader = 'DURATION (MIN)';
  } else if (isHold && isPerSide) {
    statHeader = 'HOLD / SIDE (S)';
  } else if (isHold) {
    statHeader = 'HOLD (SEC)';
  } else if (isSeconds && isPerSide) {
    statHeader = 'TIME / SIDE (S)';
  } else if (isSeconds) {
    statHeader = 'DURATION (SEC)';
  } else if (isFlows) {
    statHeader = 'FLOWS';
  } else if (isSteps) {
    statHeader = 'STEPS';
  } else if (isPerLeg) {
    statHeader = 'REPS / LEG';
  } else if (isPerSide) {
    statHeader = 'REPS / SIDE';
  }

  const unitSuffix = isRepHoldDuration
    ? 'holds'
    : isMinutes
      ? 'min'
      : isSeconds
        ? 's'
        : isFlows
          ? 'flows'
          : isSteps
            ? 'steps'
            : isPerLeg
              ? '/leg'
              : isPerSide
                ? '/side'
                : 'reps';

  return {
    usesExternalWeight: doesExerciseUseExternalWeight(exercise),
    isTimed,
    isMinutes,
    isSeconds,
    isHold,
    isRepHoldDuration,
    isFlows,
    isSteps,
    isPerSide,
    isPerLeg,
    statHeader,
    unitSuffix,
    repStep: isSeconds ? 5 : 1,
  };
}

export function getExerciseTimerConfig(exercise, activeSet = null) {
  const profile = getExerciseSetLoggingProfile(exercise);
  const parsedDefaultSeconds = parseExerciseTargetSeconds(exercise?.defaultReps);
  const hasWorkTimer = Boolean(profile.isTimed || parsedDefaultSeconds);

  let workSeconds = parsedDefaultSeconds || 45;
  if (!profile.isRepHoldDuration && profile.isTimed && activeSet && activeSet.reps !== undefined && activeSet.reps !== '') {
    const rawVal = parseFloat(String(activeSet.reps).replace(',', '.'));
    if (Number.isFinite(rawVal) && rawVal > 0) {
      workSeconds = profile.isMinutes ? Math.round(rawVal * 60) : Math.max(5, Math.round(rawVal));
    }
  }

  const isHold = Boolean(profile.isHold || profile.isRepHoldDuration);
  const restEnabled = isRestTimerEnabledForExercise(exercise);
  const restSeconds = getEffectiveRestSeconds(exercise);

  return {
    hasWorkTimer,
    isHold,
    isMinutes: Boolean(profile.isMinutes),
    isRepHoldDuration: Boolean(profile.isRepHoldDuration),
    workSeconds,
    workLabel: isHold ? 'HOLD TIMER' : 'EXERCISE TIMER',
    workActiveLabel: isHold ? 'HOLDING NOW' : 'EXERCISE ACTIVE',
    workShortLabel: isHold ? 'Hold' : 'Exercise',
    restEnabled,
    restSeconds,
  };
}

/**
 * RPE only applies to loaded/effort strength and power work — not warm-up,
 * decompression, mobility/stretching drills, or purely timer-regulated holds/cardio.
 */
export function shouldShowExerciseRpe(exercise) {
  if (!exercise) return false;
  const rawRpe = String(exercise.rpe ?? '').trim();
  if (!rawRpe) return false;

  const phase = getExercisePhaseInfo(exercise);
  if (phase.key === 'warmup' || phase.key === 'decompression') return false;

  const mechanics = String(exercise.mechanics || '').trim();
  if (/mobility|stretch|recovery|warmup|warm-up|decompression/i.test(mechanics)) {
    return false;
  }

  const timerCfg = getExerciseTimerConfig(exercise);
  if (timerCfg.hasWorkTimer) return false;

  return true;
}

/**
 * Formats an exercise's target reps/duration with explicit, consistent units
 * (e.g. "8-12 reps", "12-15 /leg", "60-90s", "15 min").
 */
export function formatTargetPrescription(exercise) {
  const raw = String(exercise?.defaultReps ?? '').trim();
  if (!raw) return '8-12 reps';

  const normalized = raw
    .replace(/\s*-\s*/g, '-')
    .replace(/\s*(?:seconds|secs|sec)\b/gi, 's')
    .replace(/\s*mins?\b/gi, ' min')
    .replace(/\s*minutes?\b/gi, ' min')
    .replace(/\s+/g, ' ')
    .trim();

  if (/(?:\d\s*s\b|\/(?:leg|side|arm|dir)\b|\b(?:reps?|min|hr|flows?|circles?|holds?|amrap|emom|each)\b)/i.test(normalized)) {
    return normalized;
  }

  const timerCfg = getExerciseTimerConfig(exercise);
  if (timerCfg.isMinutes) return `${normalized} min`;
  if (timerCfg.hasWorkTimer) return `${normalized}s`;
  return `${normalized} reps`;
}

export function formatLoggedSetSummary(setObj, exercise = null) {
  if (!setObj) return '-';
  const rawWeight = String(setObj.weight ?? '').trim();
  const weightNum = parseFloat(rawWeight.replace(',', '.'));
  const hasWeight = Number.isFinite(weightNum) && weightNum > 0;
  const weightStr = hasWeight ? rawWeight : '';
  const repsStr = String(setObj.reps ?? '').trim();
  const profile = getExerciseSetLoggingProfile(exercise);

  if (weightStr && repsStr) {
    return profile.isSeconds ? `${weightStr}kg × ${repsStr}s` : `${weightStr}kg × ${repsStr}`;
  }
  if (weightStr) return `${weightStr}kg`;
  if (repsStr) {
    if (profile.isMinutes) return `${repsStr} min`;
    if (profile.isSeconds) return `${repsStr}s`;
    if (profile.isFlows) return `${repsStr} flows`;
    if (profile.isSteps) return `${repsStr} steps`;
    if (profile.isPerLeg) return `${repsStr}/leg`;
    if (profile.isPerSide) return `${repsStr}/side`;
    return `${repsStr} reps`;
  }
  return '-';
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

