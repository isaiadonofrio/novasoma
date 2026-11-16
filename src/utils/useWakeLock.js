import { useEffect } from 'react';

/**
 * Acquires the Screen Wake Lock API while `active` is true so mobile devices
 * do not dim or lock mid-set during live workouts. Automatically re-acquires
 * when the document returns to visibility and releases cleanly on unmount.
 *
 * @param {boolean} active
 */
export function useWakeLock(active = false) {
  useEffect(() => {
    if (!active || typeof navigator === 'undefined' || !navigator.wakeLock) {
      return undefined;
    }

    let sentinel = null;
    let cancelled = false;

    const releaseSentinel = () => {
      if (sentinel && !sentinel.released) {
        sentinel.release().catch(() => {});
      }
      sentinel = null;
    };

    const acquire = async () => {
      if (cancelled || document.visibilityState !== 'visible') return;
      if (sentinel && !sentinel.released) return;
      try {
        sentinel = await navigator.wakeLock.request('screen');
      } catch {
        sentinel = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        acquire();
      } else {
        releaseSentinel();
      }
    };

    acquire();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      releaseSentinel();
    };
  }, [active]);
}
