import { useState, useRef, useCallback, useEffect } from 'react';

const DEFAULT_DURATION_MS = 5000;

/**
 * Manages a single non-blocking Undo toast notification with wall-clock
 * pause-on-hover/focus behavior and automatic cleanup on unmount.
 *
 * @param {number} [defaultDurationMs=5000]
 */
export function useUndoToast(defaultDurationMs = DEFAULT_DURATION_MS) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);
  const actionRef = useRef(null);
  const deadlineRef = useRef(0);
  const remainingRef = useRef(defaultDurationMs);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const dismissToast = useCallback(() => {
    clearTimer();
    actionRef.current = null;
    remainingRef.current = 0;
    setToast(null);
  }, [clearTimer]);

  const scheduleDismiss = useCallback((ms) => {
    clearTimer();
    const safeMs = Math.max(0, ms);
    remainingRef.current = safeMs;
    deadlineRef.current = Date.now() + safeMs;
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      actionRef.current = null;
      remainingRef.current = 0;
      setToast(null);
    }, safeMs);
  }, [clearTimer]);

  const showUndoToast = useCallback((message, onUndo, durationMs = defaultDurationMs) => {
    actionRef.current = typeof onUndo === 'function' ? onUndo : null;
    const id = Date.now() + Math.random();
    setToast({ id, message });
    scheduleDismiss(durationMs);
  }, [defaultDurationMs, scheduleDismiss]);

  const triggerUndo = useCallback(() => {
    const fn = actionRef.current;
    dismissToast();
    if (typeof fn === 'function') {
      fn();
    }
  }, [dismissToast]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current === null) return;
    const left = Math.max(0, deadlineRef.current - Date.now());
    remainingRef.current = left;
    clearTimer();
  }, [clearTimer]);

  const resumeTimer = useCallback(() => {
    if (!toast || timerRef.current !== null) return;
    if (remainingRef.current <= 0) {
      dismissToast();
      return;
    }
    scheduleDismiss(remainingRef.current);
  }, [toast, dismissToast, scheduleDismiss]);

  useEffect(() => clearTimer, [clearTimer]);

  return {
    toast,
    showUndoToast,
    triggerUndo,
    dismissToast,
    pauseTimer,
    resumeTimer,
  };
}
