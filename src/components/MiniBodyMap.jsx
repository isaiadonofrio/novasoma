import React, { useEffect, useRef } from 'react';
import bodySvgRaw from '../assets/body.svg?raw';

/**
 * Compact front/back muscle map preview used in routine cards,
 * hero spotlight, and the live weekly muscle frequency hit map.
 */
export function MiniBodyMap({
  primaryKeys = [],
  secondaryKeys = [],
  frequencyMap = null,
  className = ''
}) {
  const svgWrapRef = useRef(null);
  const primarySig = Array.isArray(primaryKeys) ? primaryKeys.join(',') : '';
  const secondarySig = Array.isArray(secondaryKeys) ? secondaryKeys.join(',') : '';
  const freqSig = frequencyMap && typeof frequencyMap === 'object' ? JSON.stringify(frequencyMap) : '';

  useEffect(() => {
    const container = svgWrapRef.current;
    if (!container) return;

    const muscleGroups = container.querySelectorAll('.muscle');

    if (frequencyMap && typeof frequencyMap === 'object') {
      muscleGroups.forEach((group) => {
        const key = group.getAttribute('data-muscle');
        const count = frequencyMap[key] || 0;
        group.classList.toggle('hit-1', count === 1);
        group.classList.toggle('hit-2', count === 2);
        group.classList.toggle('hit-3', count >= 3);
        group.classList.remove('on', 'sec');
        group.removeAttribute('tabindex');
        group.removeAttribute('role');
      });
    } else {
      const primarySet = new Set(primarySig ? primarySig.split(',') : []);
      const secondarySet = new Set(secondarySig ? secondarySig.split(',') : []);

      muscleGroups.forEach((group) => {
        const key = group.getAttribute('data-muscle');
        const isPrimary = primarySet.has(key);
        const isSecondary = !isPrimary && secondarySet.has(key);
        group.classList.toggle('on', isPrimary);
        group.classList.toggle('sec', isSecondary);
        group.classList.remove('hit-1', 'hit-2', 'hit-3');
        group.removeAttribute('tabindex');
        group.removeAttribute('role');
      });
    }
  }, [primarySig, secondarySig, freqSig, frequencyMap]);

  return (
    <div
      ref={svgWrapRef}
      className={`mini-bodymap-wrap ${className}`.trim()}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: bodySvgRaw }}
    />
  );
}

