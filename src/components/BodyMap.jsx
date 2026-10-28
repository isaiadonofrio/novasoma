import React, { useEffect, useRef } from 'react';
import bodySvgRaw from '../assets/body.svg?raw';
import { X, Sparkles, RotateCcw } from 'lucide-react';

export const MUSCLE_LABELS = {
  chest: 'Pettorali',
  back: 'Dorsali',
  shoulders: 'Spalle',
  biceps: 'Bicipiti',
  triceps: 'Tricipiti',
  trapezius: 'Trapezi',
  abdomen: 'Addome',
  obliques: 'Obliqui',
  forearm: 'Avambracci',
  quads: 'Quadricipiti',
  hamstrings: 'Femorali',
  glutes: 'Glutei',
  calves: 'Polpacci'
};

export function BodyMap({ selectedMuscles = [], onToggleMuscle, onClearMuscles }) {
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
      g.setAttribute('title', `${title} (Clicca per selezionare)`);

      const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
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
      <div className="bodymap-header">
        <div className="bodymap-header-title">
          <span className="step-tag">MAPPA CORPOREA INTERATTIVA</span>
          <h3>Tocca i muscoli che vuoi allenare</h3>
          <p className="bodymap-desc">
            Visualizzazione anatomica Fronte e Retro. Tocca direttamente sul corpo per filtrare gli esercizi mirati.
          </p>
        </div>

        {selectedMuscles.length > 0 && (
          <button 
            type="button" 
            className="clear-muscles-btn"
            onClick={onClearMuscles}
          >
            <RotateCcw size={14} />
            <span>Azzera Selezione</span>
          </button>
        )}
      </div>

      {/* SVG Body Map rendered inline */}
      <div 
        ref={containerRef}
        className="bodymap-svg-wrapper a-body"
        dangerouslySetInnerHTML={{ __html: bodySvgRaw }}
      />

      {/* Selected Muscle Chips */}
      <div className="bodymap-chips-row">
        {selectedMuscles.length === 0 ? (
          <span className="chips-placeholder">
            Nessun muscolo selezionato: tocca la sagoma del corpo o scegli una routine.
          </span>
        ) : (
          <div className="chips-list">
            <span className="focus-label">Focus Attivo:</span>
            {selectedMuscles.map((key) => (
              <button
                key={key}
                type="button"
                className="muscle-chip-pill active"
                onClick={() => onToggleMuscle(key)}
              >
                <span>{MUSCLE_LABELS[key] || key}</span>
                <X size={13} className="chip-x" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
