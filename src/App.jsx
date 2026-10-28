import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Search, 
  Filter, 
  Clock, 
  Flame, 
  Layers, 
  Plus, 
  ChevronRight, 
  BookOpen,
  Info,
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';
import { INITIAL_ROUTINES, MUSCLE_GROUPS } from './data/workouts';
import { Navbar } from './components/Navbar';
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
  const [selectedMuscle, setSelectedMuscle] = useState('Tutti');
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

  // Filter exercises
  const filteredExercises = activeRoutine.exercises.filter(ex => {
    const matchesSearch = 
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetMuscles.primary.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMuscle = 
      selectedMuscle === 'Tutti' ||
      ex.targetMuscles.primary.some(m => m.toLowerCase().includes(selectedMuscle.toLowerCase())) ||
      ex.targetMuscles.secondary.some(m => m.toLowerCase().includes(selectedMuscle.toLowerCase()));

    return matchesSearch && matchesMuscle;
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
    <div className="corpo-app">
      {/* Top Navigation */}
      <Navbar 
        routines={routines}
        activeRoutineId={activeRoutineId}
        onSelectRoutine={(id) => {
          setActiveRoutineId(id);
          setSelectedMuscle('Tutti');
          setSearchQuery('');
        }}
        onStartPresentation={() => handleStartPresentation(0)}
        totalWorkoutsCompleted={workoutHistory.length}
      />

      {/* Routine Hero Showcase */}
      <section className="routine-hero-section">
        <div className="hero-container">
          <div className="hero-badge-tag" style={{ borderColor: activeRoutine.accentColor || '#10B981' }}>
            <span className="dot" style={{ backgroundColor: activeRoutine.accentColor || '#10B981' }}></span>
            <span>{activeRoutine.category} • {activeRoutine.difficulty}</span>
          </div>

          <h1 className="hero-title">{activeRoutine.title}</h1>
          <p className="hero-description">{activeRoutine.description}</p>

          <div className="hero-meta-row">
            <div className="hero-meta-item">
              <Clock size={16} />
              <span>~{activeRoutine.durationMinutes} minuti</span>
            </div>
            <div className="hero-meta-item">
              <Layers size={16} />
              <span>{activeRoutine.exercises.length} Esercizi Guidati</span>
            </div>
            <div className="hero-meta-item">
              <Flame size={16} />
              <span>Alta Efficacia</span>
            </div>
          </div>

          <div className="hero-cta-group">
            <button
              type="button"
              className="hero-primary-btn"
              onClick={() => handleStartPresentation(0)}
            >
              <Play size={18} fill="currentColor" />
              <span>Avvia Presentazione Workout</span>
            </button>
            <span className="hero-subtext">
              Include timer di recupero, mappa muscolare e guida passo-passo per ogni ripetizione.
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="controls-bar-section">
        <div className="controls-container">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text"
              placeholder="Cerca esercizio, attrezzo o muscolo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="muscle-filter-chips">
            {MUSCLE_GROUPS.map(muscle => (
              <button
                key={muscle}
                type="button"
                className={`filter-chip ${selectedMuscle === muscle ? 'active' : ''}`}
                onClick={() => setSelectedMuscle(muscle)}
              >
                {muscle}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Exercise Cards Main Content */}
      <main className="exercises-main-container">
        <div className="section-title-row">
          <div>
            <h2 className="section-heading">Scheda Esercizi Dettagliata</h2>
            <p className="section-subheading">
              Mostra la biomeccanica, la corretta respirazione e gli errori tipici da prevenire.
            </p>
          </div>
          <span className="results-count">
            {filteredExercises.length} di {activeRoutine.exercises.length} esercizi
          </span>
        </div>

        {filteredExercises.length === 0 ? (
          <div className="empty-results-box">
            <Info size={32} />
            <p>Nessun esercizio trovato per i filtri selezionati.</p>
            <button 
              type="button" 
              className="reset-filter-btn"
              onClick={() => { setSelectedMuscle('Tutti'); setSearchQuery(''); }}
            >
              Azzera filtri
            </button>
          </div>
        ) : (
          <div className="exercises-cards-grid">
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
      </main>

      {/* Presentation Fullscreen Mode */}
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
      <footer className="corpo-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-logo">CORPO</span>
            <p>Guida intelligente all'allenamento senza improvvisazione.</p>
          </div>
          <div className="footer-right">
            <span>Dati salvati in locale su questo dispositivo • Pronto per l'allenamento quotidiano</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
