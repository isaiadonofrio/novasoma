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

