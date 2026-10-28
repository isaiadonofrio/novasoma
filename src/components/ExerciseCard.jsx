import React, { useState } from 'react';
import { 
  Dumbbell, 
  Flame, 
  Wind, 
  AlertTriangle, 
  Lightbulb, 
  Play, 
  History,
  CheckCircle2 
} from 'lucide-react';
import { MUSCLE_LABELS } from './BodyMap';

export function ExerciseCard({ exercise, index, onStartAtThisExercise }) {
  const [activeTab, setActiveTab] = useState('execution'); // 'execution' | 'mistakes' | 'tips'

  const primaryMuscleName = MUSCLE_LABELS[exercise.muscleKey] || exercise.muscleKey;

  return (
    <article className="gymmane-exercise-card">
      <div className="card-top-row">
        {/* Exercise Illustration Box */}
        {exercise.illustration && (
          <div className="exercise-media-box">
            <img 
              src={exercise.illustration} 
              alt={exercise.name} 
              className="exercise-illustration-img"
              loading="lazy"
            />
          </div>
        )}

        {/* Header and Details */}
        <div className="card-header-main">
          <div className="card-badge-line">
            <span className="card-num-badge">#{String(index + 1).padStart(2, '0')}</span>
            <span className="card-muscle-tag">{primaryMuscleName}</span>
            <span className="card-equipment-badge">
              <Dumbbell size={13} />
              {exercise.equipment}
            </span>
            {exercise.rpe && (
              <span className="card-rpe-badge">RPE {exercise.rpe}</span>
            )}
          </div>

          <h3 className="card-exercise-name">{exercise.name}</h3>
          <p className="card-exercise-sub">{exercise.subtitle}</p>

          <div className="card-specs-bar">
            <div className="spec-item">
              <span className="spec-lbl">SERIE</span>
              <span className="spec-val">{exercise.defaultSets}</span>
            </div>
            <div className="spec-divider">|</div>
            <div className="spec-item">
              <span className="spec-lbl">REPS</span>
              <span className="spec-val">{exercise.defaultReps}</span>
            </div>
            <div className="spec-divider">|</div>
            <div className="spec-item">
              <span className="spec-lbl">REST</span>
              <span className="spec-val">{exercise.defaultRestSeconds}s</span>
            </div>
            {exercise.lastRecord && (
              <>
                <div className="spec-divider">|</div>
                <div className="spec-item highlight-spec">
                  <span className="spec-lbl">RECORD RECENTE</span>
                  <span className="spec-val mono-val">{exercise.lastRecord}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Start Action */}
        <div className="card-action-side">
          <button 
            type="button" 
            className="card-quick-start-btn"
            onClick={() => onStartAtThisExercise(index)}
            title="Inizia il workout da questo esercizio"
          >
            <Play size={14} fill="currentColor" />
            <span>ALLENA</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="card-tabs-header">
        <button 
          type="button"
          className={`card-tab-btn ${activeTab === 'execution' ? 'active' : ''}`}
          onClick={() => setActiveTab('execution')}
        >
          ESECUZIONE STEP-BY-STEP
        </button>
        <button 
          type="button"
          className={`card-tab-btn ${activeTab === 'mistakes' ? 'active' : ''}`}
          onClick={() => setActiveTab('mistakes')}
        >
          ERRORI DA EVITARE
        </button>
        <button 
          type="button"
          className={`card-tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
          onClick={() => setActiveTab('tips')}
        >
          CONSIGLIO DEL COACH
        </button>
      </div>

      {/* Tab Body */}
      <div className="card-tab-content-area">
        {activeTab === 'execution' && (
          <div className="execution-grid">
            <div className="step-block">
              <span className="step-badge">1. SETUP</span>
              <p>{exercise.execution.setup}</p>
            </div>
            <div className="step-block">
              <span className="step-badge">2. DISCESA</span>
              <p>{exercise.execution.eccentric}</p>
            </div>
            <div className="step-block">
              <span className="step-badge">3. SPINTA</span>
              <p>{exercise.execution.concentric}</p>
            </div>
            <div className="breathing-strip">
              <Wind size={15} color="#D9A184" />
              <span><strong>Respirazione:</strong> {exercise.execution.breathing}</span>
            </div>
          </div>
        )}

        {activeTab === 'mistakes' && (
          <div className="mistakes-box-gymmane">
            <h4>
              <AlertTriangle size={15} color="#EF4444" />
              Cosa NON fare per non sprecare la serie o farti male:
            </h4>
            <ul>
              {exercise.execution.commonMistakes.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="coach-tip-box-gymmane">
            <Lightbulb size={16} color="#D9A184" />
            <div>
              <strong>Focus Chiave:</strong>
              <p>{exercise.execution.proTip}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
