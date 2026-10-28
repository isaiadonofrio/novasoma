import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, Clock, Flame, Dumbbell, RotateCcw, X } from 'lucide-react';

export function WorkoutSummaryModal({ summary, routine, onClose, onRestart }) {
  useEffect(() => {
    // Launch festive confetti fireworks
    try {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  const formatMinutes = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  // Calculate total volume (weight * reps) if filled
  let totalVolumeKg = 0;
  if (summary.loggedSets) {
    Object.values(summary.loggedSets).forEach(sets => {
      sets.forEach(set => {
        if (set.completed && set.weight && set.reps) {
          const w = parseFloat(set.weight) || 0;
          const r = parseFloat(set.reps) || 0;
          totalVolumeKg += (w * r);
        }
      });
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="summary-modal-card">
        <button type="button" className="summary-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="summary-trophy-badge">
          <Trophy size={48} color="#D9A184" />
        </div>

        <h2 className="summary-title">Allenamento Completato!</h2>
        <p className="summary-routine-name">{routine.title}</p>
        <p className="summary-message">
          Ottimo lavoro! Hai seguito la scheda con precisione e disciplina. Ecco il riassunto della tua sessione:
        </p>

        <div className="summary-stats-grid">
          <div className="summary-stat-box">
            <Clock size={20} color="#D9A184" />
            <div className="stat-value">{formatMinutes(summary.durationSeconds)}</div>
            <div className="stat-caption">Tempo Totale</div>
          </div>

          <div className="summary-stat-box">
            <CheckCircle size={20} color="#8FA377" />
            <div className="stat-value">{summary.completedSets} / {summary.totalSets}</div>
            <div className="stat-caption">Serie Completate</div>
          </div>

          <div className="summary-stat-box">
            <Dumbbell size={20} color="#B98F72" />
            <div className="stat-value">{totalVolumeKg > 0 ? `${totalVolumeKg} kg` : 'Completato'}</div>
            <div className="stat-caption">Volume Sollevato</div>
          </div>
        </div>

        <div className="summary-actions">
          <button type="button" className="btn-secondary" onClick={onRestart}>
            <RotateCcw size={16} />
            <span>Ripeti Workout</span>
          </button>
          <button type="button" className="btn-primary" onClick={onClose}>
            <span>Salva e Torna alla Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
