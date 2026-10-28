import React, { useState } from 'react';
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Wind, 
  Play
} from 'lucide-react';
import { MuscleDiagram } from './MuscleDiagram';

export function ExerciseCard({ exercise, index, onStartAtThisExercise }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('execution'); // 'execution' | 'anatomy' | 'mistakes'

  return (
    <article className="exercise-card">
      <div className="exercise-card-header">
        <div className="exercise-number-badge">
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        
        <div className="exercise-header-info">
          <div className="exercise-title-row">
            <h3 className="exercise-name">{exercise.name}</h3>
            <span className="equipment-tag">
              <Dumbbell size={13} />
              {exercise.equipment}
            </span>
          </div>
          <p className="exercise-subtitle">{exercise.subtitle}</p>
        </div>

        <div className="exercise-stats-pill">
          <div className="stat-unit">
            <span className="stat-label">Serie</span>
            <span className="stat-val">{exercise.defaultSets}</span>
          </div>
          <div className="stat-sep">•</div>
          <div className="stat-unit">
            <span className="stat-label">Reps</span>
            <span className="stat-val">{exercise.defaultReps}</span>
          </div>
          <div className="stat-sep">•</div>
          <div className="stat-unit">
            <span className="stat-label">Rest</span>
            <span className="stat-val">{exercise.defaultRestSeconds}s</span>
          </div>
        </div>
      </div>

      {/* Muscle Badges */}
      <div className="muscle-badges-row">
        <div className="badge-group">
          <span className="badge-category-title">Target:</span>
          {exercise.targetMuscles.primary.map((m, i) => (
            <span key={i} className="muscle-badge primary-badge">
              <Flame size={12} />
              {m}
            </span>
          ))}
        </div>
        {exercise.targetMuscles.secondary.length > 0 && (
          <div className="badge-group">
            <span className="badge-category-title">Sinergici:</span>
            {exercise.targetMuscles.secondary.map((m, i) => (
              <span key={i} className="muscle-badge secondary-badge">
                {m}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Quick Preview or Expanded Content */}
      <div className="exercise-body">
        <div className="card-tab-buttons">
          <button 
            type="button"
            className={`card-tab ${activeTab === 'execution' ? 'active' : ''}`}
            onClick={() => setActiveTab('execution')}
          >
            Come Svolgerlo
          </button>
          <button 
            type="button"
            className={`card-tab ${activeTab === 'anatomy' ? 'active' : ''}`}
            onClick={() => setActiveTab('anatomy')}
          >
            Mappa Muscolare
          </button>
          <button 
            type="button"
            className={`card-tab ${activeTab === 'mistakes' ? 'active' : ''}`}
            onClick={() => setActiveTab('mistakes')}
          >
            Errori & Consigli
          </button>
        </div>

        {activeTab === 'execution' && (
          <div className="tab-pane execution-pane">
            <div className="cue-step">
              <div className="cue-dot setup-dot">1</div>
              <div className="cue-content">
                <strong>Setup & Assetto:</strong>
                <p>{exercise.execution.setup}</p>
              </div>
            </div>

            <div className="cue-step">
              <div className="cue-dot eccentric-dot">2</div>
              <div className="cue-content">
                <strong>Fase Eccentrica (Discesa/Allungamento):</strong>
                <p>{exercise.execution.eccentric}</p>
              </div>
            </div>

            <div className="cue-step">
              <div className="cue-dot concentric-dot">3</div>
              <div className="cue-content">
                <strong>Fase Concentrica (Spinta/Trazione):</strong>
                <p>{exercise.execution.concentric}</p>
              </div>
            </div>

            <div className="breathing-pill">
              <Wind size={15} />
              <div>
                <strong>Respirazione:</strong> {exercise.execution.breathing}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'anatomy' && (
          <div className="tab-pane anatomy-pane">
            <MuscleDiagram 
              primary={exercise.targetMuscles.primary} 
              secondary={exercise.targetMuscles.secondary}
              svgType={exercise.svgType}
            />
          </div>
        )}

        {activeTab === 'mistakes' && (
          <div className="tab-pane mistakes-pane">
            <div className="mistakes-block">
              <div className="mistakes-title">
                <AlertTriangle size={15} color="#EF4444" />
                <span>Errori Comuni da Evitare:</span>
              </div>
              <ul className="mistakes-list">
                {exercise.execution.commonMistakes.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>

            <div className="pro-tip-block">
              <Lightbulb size={16} color="#F59E0B" />
              <div>
                <strong>Pro Tip Biomeccanico:</strong> {exercise.execution.proTip}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="exercise-card-footer">
        <button
          type="button"
          className="start-single-ex-btn"
          onClick={() => onStartAtThisExercise(index)}
        >
          <Play size={14} fill="currentColor" />
          <span>Avvia Presentazione da qui</span>
        </button>
      </div>
    </article>
  );
}
