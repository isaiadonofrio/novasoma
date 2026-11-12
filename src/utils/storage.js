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
  EN_LOCALIZATION: 'corpo_en_localized_v1',
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
  const safeGoal = Math.min(7, Math.max(1, parseInt(weeklyGoal, 10) || 4));
  return {
    app: 'CORPO',
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
 * Validates and extracts a backup payload from raw JSON text.
 */
export function parseBackupPayload(rawText) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error('Selected file is not valid JSON.');
  }

  if (!parsed || typeof parsed !== 'object' || !parsed.data) {
    throw new Error('Invalid CORPO backup format.');
  }

  const { routines, exerciseDatabase, workoutHistory, theme, weeklyGoal } = parsed.data;
  if (!Array.isArray(routines) || !Array.isArray(exerciseDatabase) || !Array.isArray(workoutHistory)) {
    throw new Error('Backup file is missing routines, exercises, or history arrays.');
  }

  const safeGoal = Math.min(7, Math.max(1, parseInt(weeklyGoal, 10) || 4));

  return {
    routines,
    exerciseDatabase,
    workoutHistory,
    theme: theme === 'dark' ? 'dark' : 'light',
    weeklyGoal: safeGoal,
  };
}
