import { useEffect } from 'react';

let lockCount = 0;
let savedOverflow = '';
let savedPaddingRight = '';

/**
 * Custom hook to lock body scrolling when a modal or overlay is open,
 * using reference counting so nested or transitioning modals restore
 * the original scroll styles safely when the last modal closes.
 *
 * @param {boolean} isLocked Whether scroll should be locked (defaults to true)
 */
export function useBodyScrollLock(isLocked = true) {
  useEffect(() => {
    if (!isLocked || typeof document === 'undefined') return;

    if (lockCount === 0) {
      savedOverflow = document.body.style.overflow;
      savedPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = typeof window !== 'undefined'
        ? window.innerWidth - document.documentElement.clientWidth
        : 0;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0 && typeof document !== 'undefined') {
        document.body.style.overflow = savedOverflow;
        document.body.style.paddingRight = savedPaddingRight;
      }
    };
  }, [isLocked]);
}

