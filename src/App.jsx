import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Search, 
  Clock, 
  Flame, 
  Layers, 
  Info,
  Dumbbell,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { INITIAL_ROUTINES } from './data/workouts';
import { Navbar } from './components/Navbar';
import { BodyMap, MUSCLE_LABELS } from './components/BodyMap';
import { ExerciseCard } from './components/ExerciseCard';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';
import { WorkoutSummaryModal } from './components/WorkoutSummaryModal';
import './App.css';

export function App() {
  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem('corpo_routines');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_ROUTINES;
  });

  const [activeRoutineId, setActiveRoutineId] = useState(routines[0]?.id || 'legs-power');
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Active workout presentation modal state
  const [isPresentationActive, setIsPresentationActive] = useState(false);
  const [startExerciseIndex, setStartExerciseIndex] = useState(0);

  // Completed workout summary modal state
  const [completedSummary, setCompletedSummary] = useState(null);

  // Workout history
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem('corpo_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('corpo_routines', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('corpo_history', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  const activeRoutine = routines.find(r => r.id === activeRoutineId) || routines[0];

  // Toggle muscle selection on the body map
  const handleToggleMuscle = (muscleKey) => {
    setSelectedMuscles(prev => {
      if (prev.includes(muscleKey)) {
        return prev.filter(m => m !== muscleKey);
      } else {
        return [...prev, muscleKey];
      }
    });
  };

  const handleClearMuscles = () => {
    setSelectedMuscles([]);
  };

  // Combine exercises based on routine or muscle selection
  let baseExercises = activeRoutine.exercises;
  
  // If user selected muscles on the body map, look across all routines for matching exercises!
  if (selectedMuscles.length > 0) {
    const allExercises = routines.flatMap(r => r.exercises);
    // remove duplicates by id
    const uniqueMap = new Map();
    allExercises.forEach(ex => uniqueMap.set(ex.id, ex));
    const allUnique = Array.from(uniqueMap.values());

    baseExercises = allUnique.filter(ex => {
      const matchPrimary = selectedMuscles.includes(ex.muscleKey);
      const matchSecondary = ex.secondaryKeys && ex.secondaryKeys.some(k => selectedMuscles.includes(k));
      return matchPrimary || matchSecondary;
    });
  }

  // Filter exercises with search input
  const filteredExercises = baseExercises.filter(ex => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ex.name.toLowerCase().includes(q) ||
      ex.subtitle.toLowerCase().includes(q) ||
      ex.equipment.toLowerCase().includes(q) ||
      (MUSCLE_LABELS[ex.muscleKey] && MUSCLE_LABELS[ex.muscleKey].toLowerCase().includes(q))
    );
  });

  const handleStartPresentation = (index = 0) => {
    setStartExerciseIndex(index);
    setIsPresentationActive(true);
  };

  const handleWorkoutComplete = (summaryData) => {
    setIsPresentationActive(false);
    setCompletedSummary(summaryData);

    const newHistoryItem = {
      id: Date.now(),
      routineId: activeRoutine.id,
      routineTitle: activeRoutine.title,
      date: new Date().toISOString(),
      durationSeconds: summaryData.durationSeconds,
      completedSets: summaryData.completedSets,
      totalSets: summaryData.totalSets
    };

    setWorkoutHistory(prev => [newHistoryItem, ...prev]);
  };

  return (
    <div className="gymmane-app">
      {/* Navbar */}
      <Navbar 
        routines={routines}
        activeRoutineId={activeRoutineId}
        onSelectRoutine={(id) => {
          setActiveRoutineId(id);
          setSelectedMuscles([]);
          setSearchQuery('');
        }}
        onStartPresentation={() => handleStartPresentation(0)}
        totalWorkoutsCompleted={workoutHistory.length}
      />

      {/* Hero Showcase (GymMane Inspired) */}
      <section className="gymmane-hero-section">
        <div className="gymmane-wrap hero-inner-grid">
          <div className="hero-typography-col">
            <div className="hero-streak-pill">
              <span className="dot-clay"></span>
              <span>100% LOCALE • NESSUN ACCOUNT • NESSUNA DISTRAZIONE</span>
            </div>

            <h1 className="hero-loud-title">
              <span>ALLENATI.</span>
              <span>ANNOTATI.</span>
              <span className="clay-highlight">PROGRESSIONE.</span>
            </h1>

            <p className="hero-lead-text">
              La tua guida precisa all'allenamento: seleziona i muscoli direttamente sulla mappa corporea, 
              segui la routine con timer integrato e monitora i tuoi carichi serie dopo serie.
            </p>

            <div className="hero-buttons-row">
              <button 
                type="button" 
                className="btn-gymmane-primary"
                onClick={() => handleStartPresentation(0)}
              >
                <Play size={16} fill="currentColor" />
                <span>AVVIA SESSIONE LIVE</span>
              </button>
            </div>

            <div className="hero-specs-row">
              <div className="hero-spec">
                <Clock size={15} color="#D9A184" />
                <span>~{activeRoutine.durationMinutes} min previsti</span>
              </div>
              <div className="hero-spec">
                <Layers size={15} color="#D9A184" />
                <span>{activeRoutine.exercises.length} esercizi</span>
              </div>
              <div className="hero-spec">
                <Dumbbell size={15} color="#D9A184" />
                <span>{activeRoutine.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Interactive Body Map on Hero Stage */}
          <div className="hero-bodymap-col">
            <BodyMap 
              selectedMuscles={selectedMuscles}
              onToggleMuscle={handleToggleMuscle}
              onClearMuscles={handleClearMuscles}
            />
          </div>
        </div>
      </section>

      {/* Exercises Section */}
      <section className="exercises-section-wrap">
        <div className="gymmane-wrap">
          <div className="section-toolbar-row">
            <div>
              <h2 className="section-title-oswald">
                {selectedMuscles.length > 0 
                  ? `ESERCIZI PER I MUSCOLI SELEZIONATI (${filteredExercises.length})`
                  : `${activeRoutine.title} (${filteredExercises.length})`
                }
              </h2>
              <p className="section-subtitle">
                {selectedMuscles.length > 0 
                  ? 'Filtrati toccando la mappa corporea. Clicca sui muscoli per aggiungere o rimuovere.'
                  : 'Scheda completa strutturata con biomeccanica, respirazione e storico carichi.'
                }
              </p>
            </div>

            <div className="search-bar-gymmane">
              <Search size={15} className="search-ic" />
              <input 
                type="text"
                placeholder="Cerca esercizio o attrezzo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-text-input"
              />
            </div>
          </div>

          {/* Exercise Cards */}
          {filteredExercises.length === 0 ? (
            <div className="empty-state-gymmane">
              <Info size={36} color="#D9A184" />
              <p>Nessun esercizio corrisponde alla ricerca o ai muscoli selezionati.</p>
              <button 
                type="button" 
                className="btn-gymmane-secondary"
                onClick={() => { setSelectedMuscles([]); setSearchQuery(''); }}
              >
                Azzera filtri
              </button>
            </div>
          ) : (
            <div className="exercise-cards-list">
              {filteredExercises.map((exercise, idx) => (
                <ExerciseCard 
                  key={exercise.id}
                  exercise={exercise}
                  index={idx}
                  onStartAtThisExercise={() => handleStartPresentation(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Live Active Workout Presentation Modal */}
      {isPresentationActive && (
        <ActiveWorkoutModal
          routine={activeRoutine}
          initialIndex={startExerciseIndex}
          onClose={() => setIsPresentationActive(false)}
          onCompleteWorkout={handleWorkoutComplete}
        />
      )}

      {/* Workout Completion Summary Modal */}
      {completedSummary && (
        <WorkoutSummaryModal
          summary={completedSummary}
          routine={activeRoutine}
          onClose={() => setCompletedSummary(null)}
          onRestart={() => {
            setCompletedSummary(null);
            handleStartPresentation(0);
          }}
        />
      )}

      {/* Footer */}
      <footer className="gymmane-footer">
        <div className="gymmane-wrap footer-inner">
          <div>
            <span className="footer-brand-title">CORPO</span>
            <p>Ispirato al design e all'etica open-source di GymMane.</p>
          </div>
          <span className="footer-right-note">
            Tutti i tuoi dati rimangono privati sul tuo browser • Zero account • Zero pubblicità
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
