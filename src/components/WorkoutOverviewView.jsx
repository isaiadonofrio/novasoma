import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  Layers, 
  Dumbbell, 
  Flame,
  CheckCircle2,
  Video
} from 'lucide-react';
import { MediaViewer } from './MediaViewer';
import { MUSCLE_LABELS } from './BodyMap';
import { ExerciseEditorModal } from './ExerciseEditorModal';
import { WorkoutEditorModal } from './WorkoutEditorModal';

export function WorkoutOverviewView({ 
  workout, 
  onBack, 
  onStartLive, 
  onUpdateWorkout, 
  onDeleteWorkout 
}) {
  const [editingExercise, setEditingExercise] = useState(null); // null | exercise object
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [isEditingWorkoutMeta, setIsEditingWorkoutMeta] = useState(false);

  // Handle reorder
  const moveExercise = (index, delta) => {
    const newIdx = index + delta;
    if (newIdx < 0 || newIdx >= workout.exercises.length) return;
    const newExs = [...workout.exercises];
    const [moved] = newExs.splice(index, 1);
    newExs.splice(newIdx, 0, moved);
    onUpdateWorkout({
      ...workout,
      exercises: newExs
    });
  };

  // Handle delete exercise
  const removeExercise = (index) => {
    if (!window.confirm('Rimuovere questo esercizio dalla scheda?')) return;
    const newExs = workout.exercises.filter((_, i) => i !== index);
    onUpdateWorkout({
      ...workout,
      exercises: newExs
    });
  };

  // Handle save edited or new exercise
  const handleSaveExercise = (exerciseData) => {
    if (editingExercise) {
      // Update existing
      const newExs = workout.exercises.map(ex => ex.id === exerciseData.id ? exerciseData : ex);
      onUpdateWorkout({ ...workout, exercises: newExs });
      setEditingExercise(null);
    } else {
      // Add new
      onUpdateWorkout({
        ...workout,
        exercises: [...workout.exercises, exerciseData]
      });
      setIsAddingExercise(false);
    }
  };

  return (
    <div className="gymmane-overview-view">
      <div className="gymmane-wrap">
        {/* Navigation Breadcrumb */}
        <div className="overview-nav-bar">
          <button type="button" className="overview-back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>TUTTE LE SCHEDE</span>
          </button>
        </div>

        {/* Workout Big Header */}
        <div className="overview-hero-card">
          <div className="hero-meta-strip">
            <span className="overview-category-badge">{workout.category}</span>
            <span className="overview-diff-badge">{workout.difficulty || 'Tutti i livelli'}</span>
          </div>

          <div className="overview-title-actions-row">
            <div>
              <h1 className="overview-title-loud">{workout.title}</h1>
              {workout.description && (
                <p className="overview-description-text">{workout.description}</p>
              )}
            </div>

            <div className="overview-main-cta-group">
              <button 
                type="button" 
                className="btn-gymmane-primary big-cta"
                onClick={() => onStartLive(0)}
              >
                <Play size={17} fill="currentColor" />
                <span>ALLENATI ORA</span>
              </button>
            </div>
          </div>

          <div className="overview-quick-stats-row">
            <div className="quick-stat-pill">
              <Clock size={14} color="#D9A184" />
              <span>~{workout.durationMinutes} min</span>
            </div>
            <div className="quick-stat-pill">
              <Layers size={14} color="#D9A184" />
              <span>{workout.exercises.length} esercizi</span>
            </div>
            <button 
              type="button" 
              className="quick-edit-workout-meta-btn"
              onClick={() => setIsEditingWorkoutMeta(true)}
            >
              <Edit3 size={13} />
              <span>Modifica dati scheda</span>
            </button>
          </div>
        </div>

        {/* Exercises Section Header */}
        <div className="overview-timeline-heading-row">
          <div>
            <h2 className="timeline-title-oswald">ESERCIZI DELLA SCHEDA ({workout.exercises.length})</h2>
            <p className="timeline-sub">
              Rivedi le serie, modifica la biomeccanica o inserisci video tutorial ed immagini personalizzate.
            </p>
          </div>

          <button 
            type="button" 
            className="btn-gymmane-secondary"
            onClick={() => setIsAddingExercise(true)}
          >
            <Plus size={15} />
            <span>AGGIUNGI ESERCIZIO</span>
          </button>
        </div>

        {/* Exercises List */}
        {workout.exercises.length === 0 ? (
          <div className="empty-overview-exercises">
            <Dumbbell size={36} color="#626262" />
            <p>Questa scheda non ha ancora esercizi. Aggiungine uno per iniziare!</p>
            <button 
              type="button" 
              className="btn-gymmane-primary"
              onClick={() => setIsAddingExercise(true)}
            >
              <Plus size={16} />
              <span>Aggiungi primo esercizio</span>
            </button>
          </div>
        ) : (
          <div className="overview-exercises-timeline">
            {workout.exercises.map((exercise, idx) => {
              const primaryMuscle = MUSCLE_LABELS[exercise.muscleKey] || exercise.muscleKey;

              return (
                <div key={exercise.id || idx} className="overview-exercise-row-card">
                  {/* Order Number */}
                  <div className="row-order-index">
                    <span>{String(idx + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Media Frame (Animation / Video) */}
                  <div className="row-media-container">
                    <MediaViewer 
                      src={exercise.illustration} 
                      alt={exercise.name} 
                      className="timeline-media-viewer"
                    />
                  </div>

                  {/* Exercise Content & Details */}
                  <div className="row-exercise-content">
                    <div className="row-title-line">
                      <span className="row-muscle-pill">{primaryMuscle}</span>
                      <span className="row-equipment-text">
                        <Dumbbell size={12} />
                        {exercise.equipment}
                      </span>
                    </div>

                    <h3 className="row-exercise-name">{exercise.name}</h3>
                    <p className="row-exercise-sub">{exercise.subtitle}</p>

                    <div className="row-specs-strip">
                      <span className="row-spec-badge"><b>{exercise.defaultSets}</b> serie</span>
                      <span className="row-spec-badge"><b>{exercise.defaultReps}</b> reps</span>
                      <span className="row-spec-badge"><b>{exercise.defaultRestSeconds}s</b> rest</span>
                      {exercise.lastRecord && (
                        <span className="row-spec-record">Record: <b>{exercise.lastRecord}</b></span>
                      )}
                    </div>
                  </div>

                  {/* Actions / Order Controls */}
                  <div className="row-actions-group">
                    <div className="reorder-btns">
                      <button 
                        type="button" 
                        disabled={idx === 0}
                        onClick={() => moveExercise(idx, -1)}
                        title="Sposta su"
                        className="btn-reorder"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        type="button" 
                        disabled={idx === workout.exercises.length - 1}
                        onClick={() => moveExercise(idx, 1)}
                        title="Sposta giù"
                        className="btn-reorder"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>

                    <button 
                      type="button"
                      className="row-action-icon-btn"
                      onClick={() => setEditingExercise(exercise)}
                      title="Modifica esercizio e media"
                    >
                      <Edit3 size={15} />
                    </button>

                    <button 
                      type="button"
                      className="row-action-icon-btn delete-btn"
                      onClick={() => removeExercise(idx)}
                      title="Rimuovi esercizio"
                    >
                      <Trash2 size={15} />
                    </button>

                    <button 
                      type="button"
                      className="btn-play-from-here"
                      onClick={() => onStartLive(idx)}
                      title="Avvia workout da qui"
                    >
                      <Play size={13} fill="currentColor" />
                      <span>AVVIA</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Exercise Editor Modal */}
      {(editingExercise || isAddingExercise) && (
        <ExerciseEditorModal 
          exercise={editingExercise}
          onSave={handleSaveExercise}
          onClose={() => {
            setEditingExercise(null);
            setIsAddingExercise(false);
          }}
        />
      )}

      {/* Workout Meta Editor Modal */}
      {isEditingWorkoutMeta && (
        <WorkoutEditorModal 
          workout={workout}
          onSave={(updatedWorkout) => {
            onUpdateWorkout(updatedWorkout);
            setIsEditingWorkoutMeta(false);
          }}
          onClose={() => setIsEditingWorkoutMeta(false)}
        />
      )}
    </div>
  );
}
