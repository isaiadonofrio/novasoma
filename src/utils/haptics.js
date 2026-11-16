/**
 * Safe mobile haptic vibration feedback utility.
 * Guards against unsupported browsers, desktop environments, and sandboxed iframes.
 */

function safeVibrate(pattern) {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') {
    return false;
  }
  try {
    return Boolean(navigator.vibrate(pattern));
  } catch {
    return false;
  }
}

export const haptics = {
  /** Subtle tactile tick when completing a set. */
  setComplete() {
    return safeVibrate([12]);
  },

  /** Distinct double-pulse when a rest or timed hold reaches 00:00. */
  timerComplete() {
    return safeVibrate([18, 60, 18]);
  },

  /** Crisp confirmation pulse when restoring via Undo toast. */
  undo() {
    return safeVibrate([10]);
  },
};
