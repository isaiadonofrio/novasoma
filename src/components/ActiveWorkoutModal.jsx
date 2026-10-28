import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Volume2, 
  VolumeX, 
  Dumbbell, 
  Flame, 
  Clock, 
  Trophy, 
  Maximize2,
  Wind,
  AlertTriangle
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { MuscleDiagram } from './MuscleDiagram';

export function ActiveWorkoutModal({ 
  routine, 
  initialIndex = 0, 
  onClose, 
  onCompleteWorkout 
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active workout timer
  const [workoutElapsedSeconds, setWorkoutElapsedSeconds] = useState(0);

  // Rest Timer state
  const currentExercise = routine.exercises[currentIndex];
  const [restSecondsLeft, setRestSecondsLeft] = useState(currentExercise.defaultRestSeconds);
  const [restInitialSeconds, setRestInitialSeconds] = useState(currentExercise.defaultRestSeconds);
  const [isResting, setIsResting] = useState(false);

  // Sets tracking state: { [exerciseId]: [ { completed: bool, reps: number|string, weight: number|string } ] }
  const [loggedSets, setLoggedSets] = useState(() => {
    const initial = {};
    routine.exercises.forEach(ex => {
      const setsArr = [];
      for (let s = 1; s <= ex.defaultSets; s++) {
        setsArr.push({
          setNum: s,
          completed: false,
          reps: ex.defaultReps.split('-')[0]?.trim() || '10',
          weight: ''
        });
      }
      initial[ex.id] = setsArr;
    });
    return initial;
  });

  // Presentation view active tab inside exercise: 'guide' | 'anatomy' | 'tips'
  const [slideTab, setSlideTab] = useState('guide');

  // Elapsed workout timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWorkoutElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update rest initial when exercise changes
  useEffect(() => {
    setRestInitialSeconds(currentExercise.defaultRestSeconds);
    setRestSecondsLeft(currentExercise.defaultRestSeconds);
    setIsResting(false);
  }, [currentIndex, currentExercise]);

  // Rest countdown interval
  useEffect(() => {
    let timer = null;
    if (isResting && restSecondsLeft > 0) {
      timer = setInterval(() => {
        setRestSecondsLeft(prev => {
          if (prev <= 4 && prev > 1 && soundEnabled) {
            sounds.playTick();
          }
          if (prev === 1) {
            if (soundEnabled) sounds.playTimerComplete();
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResting, restSecondsLeft, soundEnabled]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        toggleRestTimer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isResting]);

  const goToNext = () => {
    if (currentIndex < routine.exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleRestTimer = () => {
    if (restSecondsLeft === 0) {
      setRestSecondsLeft(restInitialSeconds);
      setIsResting(true);
    } else {
      setIsResting(prev => !prev);
    }
  };

  const resetRestTimer = (secs = currentExercise.defaultRestSeconds) => {
    setIsResting(false);
    setRestInitialSeconds(secs);
    setRestSecondsLeft(secs);
  };

  const adjustRestTime = (delta) => {
    setRestSecondsLeft(prev => Math.max(0, prev + delta));
  };

  const toggleSetComplete = (setIndex) => {
    const exId = currentExercise.id;
    const currentSets = [...loggedSets[exId]];
    const targetSet = { ...currentSets[setIndex] };
    targetSet.completed = !targetSet.completed;
    currentSets[setIndex] = targetSet;

    setLoggedSets(prev => ({
      ...prev,
      [exId]: currentSets
    }));

    if (targetSet.completed) {
      if (soundEnabled) sounds.playSetComplete();
      // Auto-start rest timer
      resetRestTimer(currentExercise.defaultRestSeconds);
      setIsResting(true);
    }
  };

  const updateSetInput = (setIndex, field, value) => {
    const exId = currentExercise.id;
    const currentSets = [...loggedSets[exId]];
    currentSets[setIndex] = {
      ...currentSets[setIndex],
      [field]: value
    };
    setLoggedSets(prev => ({
      ...prev,
      [exId]: currentSets
    }));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Completion calculation
  const totalSetsAcrossWorkout = routine.exercises.reduce((acc, ex) => acc + ex.defaultSets, 0);
  const completedSetsCount = Object.values(loggedSets).flat().filter(s => s.completed).length;
  const progressPercent = Math.round((completedSetsCount / totalSetsAcrossWorkout) * 100);

  const currentExerciseSets = loggedSets[currentExercise.id] || [];

  return (
    <div className="active-presentation-overlay">
      {/* Top Presentation Bar */}
      <header className="presentation-header">
        <div className="pres-left-info">
          <span className="live-indicator">
            <span className="live-dot"></span>
            WORKOUT LIVE
          </span>
          <span className="pres-routine-title">{routine.title}</span>
          <div className="workout-stopwatch">
            <Clock size={14} />
            <span>{formatTime(workoutElapsedSeconds)}</span>
          </div>
        </div>

        <div className="pres-center-nav">
          <button 
            type="button" 
            className="pres-nav-btn"
            onClick={goToPrev}
            disabled={currentIndex === 0}
            title="Esercizio precedente (Freccia Sinistra)"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="pres-slide-tracker">
            <span>{currentIndex + 1}</span>
            <span className="tracker-slash">/</span>
            <span>{routine.exercises.length}</span>
          </div>
          <button 
            type="button" 
            className="pres-nav-btn"
            onClick={goToNext}
            disabled={currentIndex === routine.exercises.length - 1}
            title="Prossimo esercizio (Freccia Destra)"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="pres-right-actions">
          <button 
            type="button"
            className="sound-toggle-btn"
            onClick={() => setSoundEnabled(prev => !prev)}
            title={soundEnabled ? "Disattiva audio" : "Attiva audio"}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button 
            type="button"
            className="finish-workout-btn"
            onClick={() => onCompleteWorkout({
              durationSeconds: workoutElapsedSeconds,
              completedSets: completedSetsCount,
              totalSets: totalSetsAcrossWorkout,
              loggedSets
            })}
          >
            <Trophy size={16} />
            <span>Termina Workout</span>
          </button>

          <button 
            type="button" 
            className="close-pres-btn"
            onClick={onClose}
            title="Esci da modalità presentazione (Esc)"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Global Progress Bar */}
      <div className="pres-global-progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercent}%`, backgroundColor: routine.accentColor || '#10B981' }}
        />
      </div>

      {/* Main Presentation Stage */}
      <main className="presentation-stage">
        {/* Left Column: Exercise Visual, Cues & Info */}
        <section className="stage-left-content">
          <div className="slide-exercise-header">
            <div className="slide-meta-row">
              <span className="slide-badge-num">Esercizio {currentIndex + 1} di {routine.exercises.length}</span>
              <span className="slide-equipment">
                <Dumbbell size={14} />
                {currentExercise.equipment}
              </span>
              <span className="slide-rpe-badge">RPE {currentExercise.rpe}</span>
            </div>

            <h1 className="slide-title">{currentExercise.name}</h1>
            <p className="slide-subtitle">{currentExercise.subtitle}</p>

            <div className="slide-muscles-chips">
              {currentExercise.targetMuscles.primary.map((m, i) => (
                <span key={i} className="slide-chip primary-chip">
                  <Flame size={13} />
                  {m}
                </span>
              ))}
              {currentExercise.targetMuscles.secondary.map((m, i) => (
                <span key={i} className="slide-chip secondary-chip">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Slide Tab Controls */}
          <div className="slide-tab-nav">
            <button 
              type="button" 
              className={`slide-tab-btn ${slideTab === 'guide' ? 'active' : ''}`}
              onClick={() => setSlideTab('guide')}
            >
              Guida Esecuzione
            </button>
            <button 
              type="button" 
              className={`slide-tab-btn ${slideTab === 'anatomy' ? 'active' : ''}`}
              onClick={() => setSlideTab('anatomy')}
            >
              Mappa Muscolare
            </button>
            <button 
              type="button" 
              className={`slide-tab-btn ${slideTab === 'tips' ? 'active' : ''}`}
              onClick={() => setSlideTab('tips')}
            >
              Focus & Errori
            </button>
          </div>

          {/* Tab Views */}
          <div className="slide-tab-body">
            {slideTab === 'guide' && (
              <div className="slide-guide-scroll">
                <div className="presentation-cue-card">
                  <div className="cue-number-tag">Fase 1</div>
                  <div className="cue-body">
                    <h4>Setup & Posizionamento</h4>
                    <p>{currentExercise.execution.setup}</p>
                  </div>
                </div>

                <div className="presentation-cue-card">
                  <div className="cue-number-tag">Fase 2</div>
                  <div className="cue-body">
                    <h4>Discesa & Controllo (Fase Eccentrica)</h4>
                    <p>{currentExercise.execution.eccentric}</p>
                  </div>
                </div>

                <div className="presentation-cue-card">
                  <div className="cue-number-tag">Fase 3</div>
                  <div className="cue-body">
                    <h4>Spinta & Esplosività (Fase Concentrica)</h4>
                    <p>{currentExercise.execution.concentric}</p>
                  </div>
                </div>

                <div className="presentation-breathing-bar">
                  <Wind size={18} />
                  <div>
                    <strong>Respirazione Ideale:</strong> {currentExercise.execution.breathing}
                  </div>
                </div>
              </div>
            )}

            {slideTab === 'anatomy' && (
              <div className="slide-anatomy-wrapper">
                <MuscleDiagram 
                  primary={currentExercise.targetMuscles.primary}
                  secondary={currentExercise.targetMuscles.secondary}
                  svgType={currentExercise.svgType}
                />
              </div>
            )}

            {slideTab === 'tips' && (
              <div className="slide-tips-scroll">
                <div className="slide-mistakes-box">
                  <h3>
                    <AlertTriangle size={18} color="#EF4444" />
                    Cosa NON Fare:
                  </h3>
                  <ul>
                    {currentExercise.execution.commonMistakes.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>

                <div className="slide-pro-tip-box">
                  <div className="tip-badge">Consiglio del Coach</div>
                  <p>{currentExercise.execution.proTip}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Rest Timer & Set Logger */}
        <section className="stage-right-controls">
          {/* Rest Timer Widget */}
          <div className={`rest-timer-card ${isResting ? 'timer-active' : ''}`}>
            <div className="timer-header">
              <span className="timer-title">TIMER DI RECUPERO</span>
              <div className="timer-quick-presets">
                {[60, 90, 120].map(s => (
                  <button 
                    key={s}
                    type="button"
                    className={`preset-pill ${restInitialSeconds === s ? 'selected' : ''}`}
                    onClick={() => resetRestTimer(s)}
                  >
                    {s}s
                  </button>
                ))}
              </div>
            </div>

            <div className="timer-display-huge">
              <span className="timer-digits">{formatTime(restSecondsLeft)}</span>
              {isResting && <span className="timer-status-pulse">In pausa...</span>}
            </div>

            <div className="timer-action-buttons">
              <button 
                type="button" 
                className="timer-adjust-btn"
                onClick={() => adjustRestTime(-15)}
                title="-15 secondi"
              >
                -15s
              </button>

              <button 
                type="button" 
                className={`timer-main-btn ${isResting ? 'pause-mode' : 'play-mode'}`}
                onClick={toggleRestTimer}
              >
                {isResting ? (
                  <>
                    <Pause size={18} />
                    <span>Pausa Timer</span>
                  </>
                ) : (
                  <>
                    <Play size={18} fill="currentColor" />
                    <span>{restSecondsLeft === 0 ? 'Riavvia Timer' : 'Avvia Recupero'}</span>
                  </>
                )}
              </button>

              <button 
                type="button" 
                className="timer-adjust-btn"
                onClick={() => adjustRestTime(+15)}
                title="+15 secondi"
              >
                +15s
              </button>

              <button 
                type="button" 
                className="timer-reset-icon-btn"
                onClick={() => resetRestTimer(currentExercise.defaultRestSeconds)}
                title="Resetta timer"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Sets Tracker Widget */}
          <div className="set-logger-card">
            <div className="set-logger-header">
              <h3>Registro Serie ({currentExercise.defaultSets} previste)</h3>
              <span className="set-hint">Clicca sulla spunta per registrare la serie</span>
            </div>

            <div className="sets-table-header">
              <span className="col-num">SET</span>
              <span className="col-input">PESO (KG)</span>
              <span className="col-input">REPS</span>
              <span className="col-check">FATTO</span>
            </div>

            <div className="sets-table-body">
              {currentExerciseSets.map((set, sIdx) => (
                <div 
                  key={sIdx} 
                  className={`set-row ${set.completed ? 'set-done' : ''}`}
                >
                  <div className="set-num-cell">
                    <span>#{set.setNum}</span>
                  </div>

                  <div className="set-input-cell">
                    <input 
                      type="number"
                      placeholder="0"
                      value={set.weight}
                      onChange={(e) => updateSetInput(sIdx, 'weight', e.target.value)}
                      className="table-input"
                    />
                  </div>

                  <div className="set-input-cell">
                    <input 
                      type="text"
                      placeholder={currentExercise.defaultReps}
                      value={set.reps}
                      onChange={(e) => updateSetInput(sIdx, 'reps', e.target.value)}
                      className="table-input"
                    />
                  </div>

                  <div className="set-check-cell">
                    <button 
                      type="button" 
                      className={`check-btn ${set.completed ? 'checked' : ''}`}
                      onClick={() => toggleSetComplete(sIdx)}
                    >
                      <Check size={16} strokeWidth={set.completed ? 3 : 2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Next Exercise Prompt */}
            <div className="stage-next-prompt">
              {currentIndex < routine.exercises.length - 1 ? (
                <button 
                  type="button" 
                  className="next-exercise-banner-btn"
                  onClick={goToNext}
                >
                  <span>Prossimo: {routine.exercises[currentIndex + 1].name}</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button 
                  type="button" 
                  className="next-exercise-banner-btn complete-cta"
                  onClick={() => onCompleteWorkout({
                    durationSeconds: workoutElapsedSeconds,
                    completedSets: completedSetsCount,
                    totalSets: totalSetsAcrossWorkout,
                    loggedSets
                  })}
                >
                  <Trophy size={18} />
                  <span>Hai finito tutti gli esercizi! Termina</span>
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Keyboard Shortcuts Hint Bar */}
      <footer className="presentation-footer-hints">
        <span>Scorciatoie da tastiera:</span>
        <span className="shortcut-badge"><kbd>←</kbd> / <kbd>→</kbd> Esercizio Prec / Succ</span>
        <span className="shortcut-badge"><kbd>Spazio</kbd> Avvia/Pausa Timer</span>
        <span className="shortcut-badge"><kbd>Esc</kbd> Esci</span>
      </footer>
    </div>
  );
}
