import { useEffect, useRef } from 'react';

/**
 * useFocusTrap
 * Traps keyboard Tab navigation within a modal container and restores focus upon unmount.
 *
 * @param {boolean} isActive - Whether the trap is currently engaged
 * @returns {React.RefObject} - Attach to the modal content container
 */
export function useFocusTrap(isActive = true) {
  const containerRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    // Cache the element that triggered the modal
    previousActiveElementRef.current = document.activeElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    // Small delay or rAF to ensure modal is rendered and first element can receive focus
    const frameId = requestAnimationFrame(() => {
      const focusables = Array.from(container.querySelectorAll(focusableSelectors));
      if (focusables.length > 0 && !container.contains(document.activeElement)) {
        focusables[0].focus();
      }
    });

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const focusables = Array.from(container.querySelectorAll(focusableSelectors));
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}
