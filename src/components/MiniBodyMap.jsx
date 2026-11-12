import React, { useEffect, useRef } from 'react';
import bodySvgRaw from '../assets/body.svg?raw';

/**
 * Compact non-interactive front/back muscle map preview used in routine cards,
 * hero spotlight, and the active session header.
 */
export function MiniBodyMap({ primaryKeys = [], secondaryKeys = [], className = '' }) {
  const svgWrapRef = useRef(null);
  const primarySig = Array.isArray(primaryKeys) ? primaryKeys.join(',') : '';
  const secondarySig = Array.isArray(secondaryKeys) ? secondaryKeys.join(',') : '';

  useEffect(() => {
    const container = svgWrapRef.current;
    if (!container) return;

    const primarySet = new Set(primarySig ? primarySig.split(',') : []);
    const secondarySet = new Set(secondarySig ? secondarySig.split(',') : []);

    const muscleGroups = container.querySelectorAll('.muscle');
    muscleGroups.forEach((group) => {
      const key = group.getAttribute('data-muscle');
      const isPrimary = primarySet.has(key);
      const isSecondary = !isPrimary && secondarySet.has(key);
      group.classList.toggle('on', isPrimary);
      group.classList.toggle('sec', isSecondary);
      group.removeAttribute('tabindex');
      group.removeAttribute('role');
    });
  }, [primarySig, secondarySig]);

  return (
    <div
      ref={svgWrapRef}
      className={`mini-bodymap-wrap ${className}`.trim()}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: bodySvgRaw }}
    />
  );
}

