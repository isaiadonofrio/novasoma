/**
 * Shared numerical and string formatting helpers for CORPO.
 */

/**
 * Formats a volume in kilograms or tonnes (e.g. "450 kg", "1.2 t").
 */
export function formatVolumeCompact(volumeKg) {
  const num = Number(volumeKg);
  if (!num || num <= 0) return '0 kg';
  if (num >= 1000) return `${(num / 1000).toFixed(1)} t`;
  return `${Math.round(num).toLocaleString()} kg`;
}

/**
 * Formats duration in seconds into human-readable minutes and seconds (e.g. "42m 15s" or "30s").
 */
export function formatSessionDuration(totalSeconds) {
  const total = Math.max(0, Math.round(Number(totalSeconds) || 0));
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

/**
 * Formats seconds into digital clock "MM:SS" or "HH:MM:SS".
 */
export function formatClock(totalSeconds) {
  const total = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Extracts exact duration in seconds from a session record (`durationSeconds` or `durationMinutes`).
 */
export function getSessionDurationSeconds(session) {
  if (!session || typeof session !== 'object') return 0;
  const rawSecs = Number(session.durationSeconds);
  if (Number.isFinite(rawSecs) && rawSecs >= 0) return rawSecs;
  const rawMins = Number(session.durationMinutes);
  if (Number.isFinite(rawMins) && rawMins > 0) return Math.round(rawMins * 60);
  return 0;
}

/**
 * Rounds duration seconds into a consistent whole-minute count across summary views.
 * Any non-zero duration rounds to at least 1 minute.
 */
export function getRoundedDurationMinutes(totalSeconds) {
  const secs = Math.max(0, Number(totalSeconds) || 0);
  if (secs === 0) return 0;
  return Math.max(1, Math.round(secs / 60));
}

/**
 * Resolves a session's display category from its stored field or matching routine,
 * falling back to `'Training'`.
 */
export function resolveSessionCategory(session, routines = []) {
  if (session?.category && String(session.category).trim()) {
    return String(session.category).trim();
  }
  if (Array.isArray(routines) && routines.length > 0 && session) {
    const matched = routines.find(
      (r) =>
        (session.routineId && r?.id === session.routineId) ||
        (session.routineTitle && r?.title === session.routineTitle)
    );
    if (matched?.category && String(matched.category).trim()) {
      return String(matched.category).trim();
    }
  }
  return 'Training';
}

