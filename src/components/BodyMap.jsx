import React, { useEffect, useRef } from 'react';
import bodySvgRaw from '../assets/body.svg?raw';
import { RotateCcw } from 'lucide-react';
import { MUSCLE_LABELS } from '../data/muscleLabels';

const MUSCLE_ENTRIES = Object.entries(MUSCLE_LABELS);

export function BodyMap({ selectedMuscles = [], onToggleMuscle, onClearMuscles, hidePills = false }) {
  const containerRef = useRef(null);

  // Synchronize active highlights and click events on SVG elements
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const muscleGroups = el.querySelectorAll('.muscle');
    muscleGroups.forEach((g) => {
      const muscleKey = g.getAttribute('data-muscle');
      const isSelected = selectedMuscles.includes(muscleKey);

      // Accessibility & styling classes
      g.setAttribute('aria-pressed', String(isSelected));
      g.classList.toggle('on', isSelected);

      const title = MUSCLE_LABELS[muscleKey] || muscleKey;
      g.setAttribute('title', `${title} (Click to select)`);

      const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.detail > 0 && typeof e.currentTarget?.blur === 'function') {
          e.currentTarget.blur();
        }
        onToggleMuscle(muscleKey);
      };

      g.onclick = handleClick;
    });

    return () => {
      muscleGroups.forEach((g) => {
        g.onclick = null;
      });
    };
  }, [selectedMuscles, onToggleMuscle]);

  return (
    <div className="gymmane-bodymap-card">
      <div
        ref={containerRef}
        className="bodymap-svg-wrapper a-body"
        dangerouslySetInnerHTML={{ __html: bodySvgRaw }}
      />

      <div className="bodymap-side-panel">
        <div className="bodymap-header">
          <div className="bodymap-header-title">
            <span className="step-tag">MUSCLE FILTER</span>
            <h3>Select target areas</h3>
            <p className="bodymap-desc">
              Tap directly on the body map or pick one or more muscle groups below.
            </p>
          </div>

          {selectedMuscles.length > 0 && (
            <button
              type="button"
              className="clear-muscles-btn"
              onClick={onClearMuscles}
            >
              <RotateCcw size={13} />
              <span>Clear ({selectedMuscles.length})</span>
            </button>
          )}
        </div>

        {!hidePills ? (
          <div className="bodymap-quick-pills" role="group" aria-label="Muscle groups">
            {MUSCLE_ENTRIES.map(([key, label]) => {
              const isSelected = selectedMuscles.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  className={`bodymap-quick-pill ${isSelected ? 'active' : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => onToggleMuscle(key)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="bodymap-anatomy-focus-card">
            {selectedMuscles.length > 0 ? (
              <div className="focus-card-active">
                <span className="focus-card-tag">ACTIVE ANATOMICAL FOCUS</span>
                <h4 className="focus-card-muscle">
                  {selectedMuscles.map(k => MUSCLE_LABELS[k] || k).join(', ')}
                </h4>
                <p className="focus-card-hint">
                  Tap any muscle group on the front or back figure to instantly toggle target movements in the library.
                </p>
              </div>
            ) : (
              <div className="focus-card-idle">
                <span className="focus-card-tag">INTERACTIVE ANATOMY</span>
                <p className="focus-card-hint">
                  Click directly on any muscle group on the anatomical figure to filter exercises targeting that specific region.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
