/**
 * Safe localStorage persistence and portable JSON backup helpers.
 * All data remains 100% local to the user's device.
 */

export const STORAGE_KEYS = {
  ROUTINES: 'corpo_user_routines_v7',
  EXERCISES: 'corpo_user_exercises_v6',
  HISTORY: 'corpo_history',
  THEME: 'corpo_theme',
  WEEKLY_GOAL: 'corpo_weekly_goal_v1',
  ACTIVE_DRAFT: 'corpo_active_draft_v1',
  SEEDED_CANONICAL: 'corpo_seeded_canonical_v1',
  PRUNED_EXTRA_DEFAULTS: 'corpo_pruned_extra_defaults_v1',
  EN_LOCALIZATION: 'corpo_en_localized_v1',
  SOUND_ENABLED: 'corpo_sound_enabled_v1',
};

export const STORAGE_ERROR_EVENT = 'corpo-storage-error';

function emitStorageError(message) {
  try {
    window.dispatchEvent(new CustomEvent(STORAGE_ERROR_EVENT, { detail: message }));
  } catch {
    // Ignore environments without CustomEvent support
  }
}

/**
 * Reads a plain string safely from localStorage.
 */
export function safeReadString(key, fallback = '') {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Reads and parses JSON safely from localStorage.
 * Returns fallback if missing or corrupted.
 */
export function safeReadJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Serializes and writes JSON to localStorage without throwing on quota limits.
 * Returns { ok: boolean, quotaExceeded: boolean, error?: string }.
 */
export function safeWriteJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return { ok: true, quotaExceeded: false };
  } catch (err) {
    const isQuota =
      err?.name === 'QuotaExceededError' ||
      err?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      err?.code === 22 ||
      err?.code === 1014;
    const message = isQuota
      ? 'Browser storage quota exceeded. Export a JSON backup and remove large embedded images so changes save.'
      : err?.message || 'Unable to save to browser storage.';
    emitStorageError(message);
    return {
      ok: false,
      quotaExceeded: Boolean(isQuota),
      error: message,
    };
  }
}

/**
 * Safely writes a plain string value to localStorage.
 */
export function safeWriteString(key, value) {
  try {
    window.localStorage.setItem(key, String(value));
    return { ok: true, quotaExceeded: false };
  } catch (err) {
    const isQuota =
      err?.name === 'QuotaExceededError' ||
      err?.name === 'NS_ERROR_DOM_QUOTA_REACHED';
    const message = isQuota
      ? 'Browser storage quota exceeded; preferences could not be saved.'
      : err?.message || 'Unable to save to browser storage.';
    emitStorageError(message);
    return {
      ok: false,
      quotaExceeded: Boolean(isQuota),
      error: message,
    };
  }
}

export const DRAFT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/**
 * Safely removes an item from localStorage.
 */
export function safeRemoveItem(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates whether a saved workout draft object is structurally valid and unexpired.
 */
export function validateActiveWorkoutDraft(draft, nowMs = Date.now()) {
  if (!draft || typeof draft !== 'object' || !draft.routineId) return null;
  if (draft.updatedAt) {
    const updatedMs = new Date(draft.updatedAt).getTime();
    if (Number.isFinite(updatedMs) && nowMs - updatedMs > DRAFT_MAX_AGE_MS) {
      return null;
    }
  }
  return draft;
}

/**
 * Reads the active workout draft from localStorage, cleaning up expired drafts.
 */
export function readActiveWorkoutDraft() {
  const raw = safeReadJson(STORAGE_KEYS.ACTIVE_DRAFT, null);
  const valid = validateActiveWorkoutDraft(raw);
  if (raw && !valid) {
    safeRemoveItem(STORAGE_KEYS.ACTIVE_DRAFT);
  }
  return valid;
}

/**
 * Clears any saved in-progress workout draft from localStorage.
 */
export function clearActiveWorkoutDraft() {
  return safeRemoveItem(STORAGE_KEYS.ACTIVE_DRAFT);
}

/**
 * Counts how many sets are marked completed inside a saved workout draft.
 */
export function countDraftCompletedSets(draft) {
  if (!draft?.loggedSets || typeof draft.loggedSets !== 'object') return 0;
  let total = 0;
  Object.values(draft.loggedSets).forEach((sets) => {
    if (Array.isArray(sets)) {
      total += sets.filter((s) => s?.completed).length;
    }
  });
  return total;
}

/**
 * Computes approximate localStorage usage in kilobytes for all CORPO keys.
 */
export function getLocalStorageUsageKb() {
  try {
    let totalBytes = 0;
    Object.values(STORAGE_KEYS).forEach((key) => {
      const val = window.localStorage.getItem(key);
      if (val) {
        totalBytes += (key.length + val.length) * 2;
      }
    });
    return Math.max(1, Math.round(totalBytes / 1024));
  } catch {
    return 0;
  }
}

/**
 * Builds a portable JSON backup object containing all personal training data.
 */
export function buildBackupPayload({ routines, exerciseDatabase, workoutHistory, theme, weeklyGoal = 4 }) {
  const safeGoal = Math.min(7, Math.max(1, parseInt(String(weeklyGoal), 10) || 4));
  return {
    app: 'Nova Soma',
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    data: {
      routines: Array.isArray(routines) ? routines : [],
      exerciseDatabase: Array.isArray(exerciseDatabase) ? exerciseDatabase : [],
      workoutHistory: Array.isArray(workoutHistory) ? workoutHistory : [],
      theme: theme === 'dark' ? 'dark' : 'light',
      weeklyGoal: safeGoal,
    },
  };
}

/**
 * Sanitizes media/video URLs to prevent dangerous URI schemes (javascript:, data:text/html, etc.).
 */
const PROTO_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function stripPrototypeKeys(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return record;
  const clean = {};
  Object.keys(record).forEach((key) => {
    if (!PROTO_KEYS.has(key)) {
      clean[key] = record[key];
    }
  });
  return clean;
}

export function sanitizeMediaUrl(rawUrl = '') {
  if (typeof rawUrl !== 'string') return '';
  const cleaned = Array.from(rawUrl)
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join('')
    .trim();

  if (!cleaned || cleaned.startsWith('//')) return '';

  if (/^data:/i.test(cleaned)) {
    return /^data:image\/(png|jpe?g|webp|gif);base64,[a-z0-9+/=\s]+$/i.test(cleaned)
      ? cleaned
      : '';
  }

  if (/^(https?:\/\/|blob:)/i.test(cleaned)) {
    try {
      const parsedUrl = new URL(cleaned);
      if (['http:', 'https:', 'blob:'].includes(parsedUrl.protocol)) {
        return cleaned;
      }
    } catch {
      return '';
    }
    return '';
  }

  if (/^(\/(?!\/)|\.{1,2}\/|assets\/)/i.test(cleaned) && !/^[a-z][a-z0-9+.-]*:/i.test(cleaned)) {
    return cleaned;
  }

  return '';
}

function sanitizeExerciseRecord(rawEx, idx) {
  const ex = stripPrototypeKeys(rawEx);
  return {
    ...ex,
    id: String(ex.id || `ex-${idx}`),
    name: String(ex.name || 'Exercise'),
    ...(ex.illustration !== undefined
      ? { illustration: sanitizeMediaUrl(String(ex.illustration || '')) }
      : {}),
    ...(ex.customVideoUrl !== undefined
      ? { customVideoUrl: sanitizeMediaUrl(String(ex.customVideoUrl || '')) }
      : {}),
  };
}

function sanitizeRoutineRecord(rawRoutine, idx) {
  const routine = stripPrototypeKeys(rawRoutine);
  const exercises = Array.isArray(routine.exercises)
    ? routine.exercises
        .filter((ex) => ex && typeof ex === 'object' && !Array.isArray(ex))
        .map((ex, exIdx) => sanitizeExerciseRecord(ex, exIdx))
    : [];

  return {
    ...routine,
    id: String(routine.id || `routine-${idx}`),
    title: String(routine.title || 'Workout'),
    exercises,
  };
}

function sanitizeHistoryRecord(rawEntry, idx) {
  const entry = stripPrototypeKeys(rawEntry);
  return {
    ...entry,
    id: String(entry.id || entry.date || entry.completedAt || `w-${idx}`),
    routineTitle: String(entry.routineTitle || 'Workout Session'),
  };
}

/**
 * Validates and extracts a backup payload from raw JSON text.
 */
export function parseBackupPayload(rawText) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error('Selected file is not valid JSON.');
  }

  if (!parsed || typeof parsed !== 'object' || !parsed.data || typeof parsed.data !== 'object') {
    throw new Error('Invalid Nova Soma backup format.');
  }

  const { routines, exerciseDatabase, workoutHistory, theme, weeklyGoal } = parsed.data;
  if (!Array.isArray(routines) || !Array.isArray(exerciseDatabase) || !Array.isArray(workoutHistory)) {
    throw new Error('Backup file is missing routines, exercises, or history arrays.');
  }

  const sanitizedRoutines = routines
    .filter((r) => r && typeof r === 'object' && !Array.isArray(r))
    .map((r, idx) => sanitizeRoutineRecord(r, idx));

  const sanitizedExercises = exerciseDatabase
    .filter((ex) => ex && typeof ex === 'object' && !Array.isArray(ex))
    .map((ex, idx) => sanitizeExerciseRecord(ex, idx));

  const sanitizedHistory = workoutHistory
    .filter((h) => h && typeof h === 'object' && !Array.isArray(h))
    .map((h, idx) => sanitizeHistoryRecord(h, idx));

  const safeGoal = Math.min(7, Math.max(1, parseInt(String(weeklyGoal), 10) || 4));

  return {
    routines: sanitizedRoutines,
    exerciseDatabase: sanitizedExercises,
    workoutHistory: sanitizedHistory,
    theme: theme === 'dark' ? 'dark' : 'light',
    weeklyGoal: safeGoal,
  };
}
