import React, { useState, useEffect } from 'react';
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
  Clock, 
  Trophy, 
  Wind,
  AlertTriangle,
  Flame,
  ArrowRight
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { MUSCLE_LABELS } from './BodyMap';
import { MediaViewer } from './MediaViewer';

export function ActiveWorkoutModal({ 
  routine, 
  initialIndex = 0, 
  onClose, 
  onCompleteWorkout 
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Overall workout time
  const [workoutElapsedSeconds, setWorkoutElapsedSeconds] = useState(0);

  // Current exercise
  const currentExercise = routine.exercises[currentIndex];

  // Rest Timer state
  const [restSecondsLeft, setRestSecondsLeft] = useState(currentExercise.defaultRestSeconds);
  const [restInitialSeconds, setRestInitialSeconds] = useState(currentExercise.defaultRestSeconds);
  const [isResting, setIsResting] = useState(false);

  // Logged sets state
  const [loggedSets, setLoggedSets] = useState(() => {
    const initial = {};
    routine.exercises.forEach(ex => {
      const setsArr = [];
      for (let s = 1; s <= ex.defaultSets; s++) {
        setsArr.push({
          setNum: s,
          completed: false,
          reps: ex.defaultReps.split('-')[0]?.trim() || '10',
          weight: '',
          prev: ex.lastRecord ? ex.lastRecord.split('·')[0]?.trim() : '-'
        });
      }
      initial[ex.id] = setsArr;
    });
    return initial;
  });

  const [activeTab, setActiveTab] = useState('cues'); // 'cues' | 'mistakes'

  // Stopwatch interval
  useEffect(() => {
    const interval = setInterval(() => {
      setWorkoutElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update rest on exercise switch
  useEffect(() => {
    setRestInitialSeconds(currentExercise.defaultRestSeconds);
    setRestSecondsLeft(currentExercise.defaultRestSeconds);
    setIsResting(false);
  }, [currentIndex, currentExercise]);

  // Rest countdown
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

  // Keyboard navigation
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

  const totalSetsAcrossWorkout = routine.exercises.reduce((acc, ex) => acc + ex.defaultSets, 0);
  const completedSetsCount = Object.values(loggedSets).flat().filter(s => s.completed).length;
  const progressPercent = Math.round((completedSetsCount / totalSetsAcrossWorkout) * 100);

  const currentExerciseSets = loggedSets[currentExercise.id] || [];
  const primaryMuscleName = MUSCLE_LABELS[currentExercise.muscleKey] || currentExercise.muscleKey;

  return (
    <div className="gymmane-active-overlay">
      {/* Top Header Bar */}
      <header className="gymmane-pres-header">
        <div className="pres-brand-group">
          <span className="live-pill">LIVE SESSION</span>
          <span className="routine-name-pill">{routine.shortTitle || routine.title}</span>
          <div className="live-clock">
            <Clock size={13} />
            <span>{formatTime(workoutElapsedSeconds)}</span>
          </div>
        </div>

        <div className="pres-stepper">
          <button 
            type="button" 
            className="stepper-arrow-btn"
            onClick={goToPrev}
            disabled={currentIndex === 0}
            title="Esercizio precedente"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="stepper-text">
            <b>{currentIndex + 1}</b> / {routine.exercises.length}
          </span>
          <button 
            type="button" 
            className="stepper-arrow-btn"
            onClick={goToNext}
            disabled={currentIndex === routine.exercises.length - 1}
            title="Prossimo esercizio"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="pres-top-actions">
          <button 
            type="button"
            className="icon-action-btn"
            onClick={() => setSoundEnabled(prev => !prev)}
            title={soundEnabled ? "Silenzia audio" : "Attiva audio"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button 
            type="button"
            className="gymmane-finish-btn"
            onClick={() => onCompleteWorkout({
              durationSeconds: workoutElapsedSeconds,
              completedSets: completedSetsCount,
              totalSets: totalSetsAcrossWorkout,
              loggedSets
            })}
          >
            <Trophy size={14} />
            <span>TERMINA</span>
          </button>

          <button 
            type="button" 
            className="icon-action-btn close-x"
            onClick={onClose}
            title="Chiudi sessione (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Progress Strip */}
      <div className="gymmane-progress-track">
        <div 
          className="gymmane-progress-bar"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Grid View */}
      <main className="gymmane-stage-grid">
        {/* Left Column: Visual & Guidance */}
        <section className="stage-info-col">
          <div className="exercise-spotlight-card">
            <div className="spotlight-media-container">
              <MediaViewer 
                src={currentExercise.illustration}
                alt={currentExercise.name}
                className="spotlight-media-frame"
              />
            </div>

            <div className="spotlight-meta-block">
              <div className="spotlight-tag-row">
                <span className="spotlight-muscle">{primaryMuscleName}</span>
                <span className="spotlight-kit">
                  <Dumbbell size={13} />
                  {currentExercise.equipment}
                </span>
                <span className="spotlight-rpe">RPE {currentExercise.rpe}</span>
              </div>
              <h2 className="spotlight-title">{currentExercise.name}</h2>
              <p className="spotlight-subtitle">{currentExercise.subtitle}</p>
            </div>
          </div>

          {/* Form Cues & Breathing */}
          <div className="cues-container-card">
            <div className="cues-nav-bar">
              <button 
                type="button" 
                className={`cue-nav-btn ${activeTab === 'cues' ? 'active' : ''}`}
                onClick={() => setActiveTab('cues')}
              >
                Biomeccanica & Fasi
              </button>
              <button 
                type="button" 
                className={`cue-nav-btn ${activeTab === 'mistakes' ? 'active' : ''}`}
                onClick={() => setActiveTab('mistakes')}
              >
                Cosa Evitare
              </button>
            </div>

            {activeTab === 'cues' ? (
              <div className="cues-list">
                <div className="cue-row">
                  <span className="cue-num">1</span>
                  <div>
                    <strong>Assetto & Setup:</strong>
                    <p>{currentExercise.execution.setup}</p>
                  </div>
                </div>

                <div className="cue-row">
                  <span className="cue-num">2</span>
                  <div>
                    <strong>Discesa Controllata:</strong>
                    <p>{currentExercise.execution.eccentric}</p>
                  </div>
                </div>

                <div className="cue-row">
                  <span className="cue-num">3</span>
                  <div>
                    <strong>Spinta / Trazione:</strong>
                    <p>{currentExercise.execution.concentric}</p>
                  </div>
                </div>

                <div className="cues-breathing-pill">
                  <Wind size={15} color="#D9A184" />
                  <span><strong>Respirazione:</strong> {currentExercise.execution.breathing}</span>
                </div>
              </div>
            ) : (
              <div className="mistakes-pane-inner">
                <div className="mistakes-heading">
                  <AlertTriangle size={15} color="#EF4444" />
                  <span>Errori Comuni:</span>
                </div>
                <ul>
                  {currentExercise.execution.commonMistakes.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
                <div className="pro-tip-footer">
                  <strong>Pro Tip:</strong> {currentExercise.execution.proTip}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Timer & Logger */}
        <section className="stage-controls-col">
          {/* Rest Timer Widget */}
          <div className={`gymmane-timer-box ${isResting ? 'active-timer' : ''}`}>
            <div className="timer-top-line">
              <span className="timer-label">RECUPERO</span>
              <div className="timer-presets">
                {[60, 90, 120].map(s => (
                  <button 
                    key={s}
                    type="button" 
                    className={`preset-btn ${restInitialSeconds === s ? 'on' : ''}`}
                    onClick={() => resetRestTimer(s)}
                  >
                    {s}s
                  </button>
                ))}
              </div>
            </div>

            <div className="timer-digits-display">
              <span className="digits-val">{formatTime(restSecondsLeft)}</span>
              {isResting && <span className="timer-countdown-tag">CONTO ALLA ROVESCIA</span>}
            </div>

            <div className="timer-btns-row">
              <button 
                type="button" 
                className="btn-timer-adj"
                onClick={() => adjustRestTime(-15)}
              >
                -15s
              </button>

              <button 
                type="button" 
                className={`btn-timer-main ${isResting ? 'resting-now' : ''}`}
                onClick={toggleRestTimer}
              >
                {isResting ? (
                  <>
                    <Pause size={16} />
                    <span>METTI IN PAUSA</span>
                  </>
                ) : (
                  <>
                    <Play size={16} fill="currentColor" />
                    <span>{restSecondsLeft === 0 ? 'RIAVVIA' : 'RECUPERA'}</span>
                  </>
                )}
              </button>

              <button 
                type="button" 
                className="btn-timer-adj"
                onClick={() => adjustRestTime(+15)}
              >
                +15s
              </button>

              <button 
                type="button" 
                className="btn-timer-reset"
                onClick={() => resetRestTimer(currentExercise.defaultRestSeconds)}
                title="Resetta tempo"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* Sets Logger */}
          <div className="gymmane-logger-box">
            <div className="logger-title-line">
              <h3>SERIE & CARICHI</h3>
              <span className="logger-hint">Spunta per registrare la serie</span>
            </div>

            <div className="sets-grid-header">
              <span className="h-col num">SET</span>
              <span className="h-col prev">PREC</span>
              <span className="h-col weight">KG</span>
              <span className="h-col reps">REPS</span>
              <span className="h-col check">OK</span>
            </div>

            <div className="sets-rows-list">
              {currentExerciseSets.map((set, sIdx) => (
                <div 
                  key={sIdx}
                  className={`set-item-row ${set.completed ? 'completed' : ''}`}
                >
                  <span className="set-index-cell">#{set.setNum}</span>
                  <span className="set-prev-cell">{currentExercise.lastRecord ? currentExercise.lastRecord.split('·')[0].trim() : '-'}</span>
                  <div className="set-input-wrap">
                    <input 
                      type="number"
                      placeholder="0"
                      value={set.weight}
                      onChange={(e) => updateSetInput(sIdx, 'weight', e.target.value)}
                      className="gymmane-table-input"
                    />
                  </div>
                  <div className="set-input-wrap">
                    <input 
                      type="text"
                      placeholder={currentExercise.defaultReps}
                      value={set.reps}
                      onChange={(e) => updateSetInput(sIdx, 'reps', e.target.value)}
                      className="gymmane-table-input"
                    />
                  </div>
                  <button 
                    type="button"
                    className={`gymmane-check-pill ${set.completed ? 'checked' : ''}`}
                    onClick={() => toggleSetComplete(sIdx)}
                  >
                    <Check size={16} strokeWidth={set.completed ? 3.5 : 2} />
                  </button>
                </div>
              ))}
            </div>

            {/* Next exercise banner */}
            <div className="next-prompt-area">
              {currentIndex < routine.exercises.length - 1 ? (
                <button 
                  type="button" 
                  className="gymmane-next-btn"
                  onClick={goToNext}
                >
                  <span>PROSSIMO: {routine.exercises[currentIndex + 1].name}</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  type="button" 
                  className="gymmane-next-btn finish-mode"
                  onClick={() => onCompleteWorkout({
                    durationSeconds: workoutElapsedSeconds,
                    completedSets: completedSetsCount,
                    totalSets: totalSetsAcrossWorkout,
                    loggedSets
                  })}
                >
                  <Trophy size={16} />
                  <span>HAI FINITO! TERMINA SESSIONE</span>
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Keyboard hints bottom */}
      <footer className="gymmane-pres-footer">
        <span>Scorciatoie:</span>
        <code>← / →</code> <span>Esercizio Prec / Succ</span>
        <code>Spazio</code> <span>Avvia / Ferma Recupero</span>
        <code>Esc</code> <span>Esci</span>
      </footer>
    </div>
  );
}
