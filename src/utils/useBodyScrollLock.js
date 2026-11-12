import { useEffect } from 'react';

/**
 * Custom hook to lock body scrolling when a modal or overlay is open,
 * preventing background scroll chaining and compensating for scrollbar shift.
 *
 * @param {boolean} isLocked Whether scroll should be locked (defaults to true)
 */
export function useBodyScrollLock(isLocked = true) {
  useEffect(() => {
    if (!isLocked || typeof document === 'undefined') return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}
