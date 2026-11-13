import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Search,
  Dumbbell,
  BookOpen,
  ArrowLeft,
  X,
  UserCheck,
  Video,
  Activity,
  RotateCcw,
  ChevronDown,
  Check,
  Archive,
  Layers,
  SlidersHorizontal
} from 'lucide-react';
import { MUSCLE_LABELS } from '../data/muscleLabels.js';
import { isBodyweightEquipment, isAnimatedGifUrl } from '../utils/exerciseImport.js';
import { ExerciseDetailModal } from './ExerciseDetailModal.jsx';
import { BodyMap } from './BodyMap.jsx';

const EQUIPMENT_FILTERS = [
  { label: 'All Equipment', match: () => true },
  { label: 'Bodyweight Only', match: (ex) => !getRequiresEquipment(ex) },
  { label: 'Equipment Needed', match: (ex) => getRequiresEquipment(ex) },
  { label: 'Dumbbells', match: (ex) => (ex.equipment || '').toLowerCase().includes('dumbbell') },
  { label: 'Barbell', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return eq.includes('barbell') || eq.includes('landmine');
  } },
  { label: 'Kettlebell', match: (ex) => (ex.equipment || '').toLowerCase().includes('kettlebell') },
  { label: 'Medicine Ball', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return eq.includes('medicine ball') || eq.includes('med ball') || eq.includes('slam ball');
  } },
  { label: 'Bench', match: (ex) => (ex.equipment || '').toLowerCase().includes('bench') },
  { label: 'Bands / Straps', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return eq.includes('band') || eq.includes('strap') || eq.includes('cable');
  } },
  { label: 'Step / Box', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return eq.includes('step') || eq.includes('box') || eq.includes('elevation');
  } },
  { label: 'Pull-Up Bar', match: (ex) => (ex.equipment || '').toLowerCase().includes('pull-up bar') },
  { label: 'Jump Rope', match: (ex) => (ex.equipment || '').toLowerCase().includes('rope') }
];

const MECHANIC_FILTERS = [
  { label: 'All Mechanics', value: 'All' },
  { label: 'Compound', value: 'Compound' },
  { label: 'Isolation', value: 'Isolation' },
  { label: 'Mobility', value: 'Mobility' },
  { label: 'Isometric', value: 'Isometric' }
];

const LEVEL_FILTERS = [
  { label: 'All Levels', value: 'All' },
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' }
];

function getRequiresEquipment(ex) {
  if (typeof ex?.requiresEquipment === 'boolean') {
    return ex.requiresEquipment;
  }
  return !isBodyweightEquipment(ex?.equipment);
}

const MUSCLE_CATEGORIES = [
  { key: 'All', label: 'All Muscles' },
  { key: 'chest', label: MUSCLE_LABELS.chest },
  { key: 'back', label: MUSCLE_LABELS.back },
  { key: 'shoulders', label: MUSCLE_LABELS.shoulders },
  { key: 'quads', label: MUSCLE_LABELS.quads },
  { key: 'hamstrings', label: MUSCLE_LABELS.hamstrings },
  { key: 'glutes', label: MUSCLE_LABELS.glutes },
  { key: 'calves', label: MUSCLE_LABELS.calves },
  { key: 'biceps', label: MUSCLE_LABELS.biceps },
  { key: 'triceps', label: MUSCLE_LABELS.triceps },
  { key: 'trapezius', label: MUSCLE_LABELS.trapezius },
  { key: 'forearm', label: MUSCLE_LABELS.forearm },
  { key: 'abdomen', label: MUSCLE_LABELS.abdomen },
  { key: 'obliques', label: MUSCLE_LABELS.obliques }
];

export function ExerciseDatabaseView({
  exercisesList = [],
  _routines = [],
  _workoutHistory = [],
  _onAddExerciseToRoutine,
  onBack
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All Equipment');
  const [selectedMechanic, setSelectedMechanic] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const [isEquipMenuOpen, setIsEquipMenuOpen] = useState(false);
  const [isMechMenuOpen, setIsMechMenuOpen] = useState(false);
  const [isLevelMenuOpen, setIsLevelMenuOpen] = useState(false);
  const [showBodyMap, setShowBodyMap] = useState(false);
  const [activeExerciseDetail, setActiveExerciseDetail] = useState(null);

  const equipMenuRef = useRef(null);
  const mechMenuRef = useRef(null);
  const levelMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (equipMenuRef.current && !equipMenuRef.current.contains(e.target)) {
        setIsEquipMenuOpen(false);
      }
      if (mechMenuRef.current && !mechMenuRef.current.contains(e.target)) {
        setIsMechMenuOpen(false);
      }
      if (levelMenuRef.current && !levelMenuRef.current.contains(e.target)) {
        setIsLevelMenuOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsEquipMenuOpen(false);
        setIsMechMenuOpen(false);
        setIsLevelMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Compute telemetry statistics across the exercise repository
  const telemetry = useMemo(() => {
    const total = exercisesList.length;
    let gearCount = 0;
    let bwCount = 0;

    const gearBreakdown = {
      dumbbells: 0,
      barbell: 0,
      kettlebell: 0,
      other: 0,
    };

    const mechanics = {
      Compound: 0,
      Isolation: 0,
      Mobility: 0,
      Isometric: 0,
    };

    const levels = {
      Beginner: 0,
      Intermediate: 0,
      Advanced: 0,
    };

    const muscleCounts = {};

    exercisesList.forEach((ex) => {
      const usesGear = getRequiresEquipment(ex);
      if (usesGear) {
        gearCount++;
        const eq = (ex.equipment || '').toLowerCase();
        if (eq.includes('dumbbell')) gearBreakdown.dumbbells++;
        else if (eq.includes('barbell')) gearBreakdown.barbell++;
        else if (eq.includes('kettlebell')) gearBreakdown.kettlebell++;
        else gearBreakdown.other++;
      } else {
        bwCount++;
      }

      const mech = ex.isWarmup ? 'Mobility' : (ex.mechanics || 'Compound');
      if (mechanics[mech] !== undefined) {
        mechanics[mech]++;
      } else {
        mechanics.Compound++;
      }

      const lvl = ex.level || 'Intermediate';
      if (levels[lvl] !== undefined) {
        levels[lvl]++;
      } else {
        levels.Intermediate++;
      }

      if (ex.muscleKey) {
        muscleCounts[ex.muscleKey] = (muscleCounts[ex.muscleKey] || 0) + 1;
      }
    });

    const gearPercent = total > 0 ? Math.round((gearCount / total) * 100) : 0;
    const bwPercent = total > 0 ? 100 - gearPercent : 0;

    // Top muscles sorted by frequency for proportional bar
    const sortedMuscles = Object.entries(muscleCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => ({
        key,
        label: MUSCLE_LABELS[key] || key,
        count,
        percent: total > 0 ? Math.round((count / total) * 100) : 0,
      }));

    return {
      total,
      gearCount,
      bwCount,
      gearPercent,
      bwPercent,
      gearBreakdown,
      mechanics,
      levels,
      muscleCounts,
      sortedMuscles,
      distinctMusclesCount: Object.keys(muscleCounts).length,
    };
  }, [exercisesList]);

  // Per-category counts for anatomy fast-pills
  const muscleCountMap = useMemo(() => {
    const map = { All: exercisesList.length };
    exercisesList.forEach((ex) => {
      if (ex.muscleKey) {
        map[ex.muscleKey] = (map[ex.muscleKey] || 0) + 1;
      }
    });
    return map;
  }, [exercisesList]);

  const activeEquipFilter = EQUIPMENT_FILTERS.find(f => f.label === selectedEquipment) || EQUIPMENT_FILTERS[0];

  const filteredExercises = exercisesList.filter(ex => {
    if (selectedMuscle !== 'All' && ex.muscleKey !== selectedMuscle) return false;
    if (!activeEquipFilter.match(ex)) return false;

    if (selectedMechanic !== 'All') {
      const mech = ex.isWarmup ? 'Mobility' : (ex.mechanics || 'Compound');
      if (mech.toLowerCase() !== selectedMechanic.toLowerCase()) return false;
    }

    if (selectedLevel !== 'All') {
      const lvl = ex.level || 'Intermediate';
      if (lvl.toLowerCase() !== selectedLevel.toLowerCase()) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = ex.name?.toLowerCase().includes(q);
      const matchSci = ex.scientificName?.toLowerCase().includes(q);
      const matchEquip = ex.equipment?.toLowerCase().includes(q);
      const matchPattern = ex.pattern?.toLowerCase().includes(q);
      const matchMuscle = MUSCLE_LABELS[ex.muscleKey]?.toLowerCase().includes(q);
      if (!matchName && !matchSci && !matchEquip && !matchPattern && !matchMuscle) return false;
    }

    return true;
  });

  const isFilterActive =
    selectedMuscle !== 'All' ||
    selectedEquipment !== 'All Equipment' ||
    selectedMechanic !== 'All' ||
    selectedLevel !== 'All' ||
    Boolean(searchQuery.trim());

  const handleResetAll = () => {
    setSelectedMuscle('All');
    setSelectedEquipment('All Equipment');
    setSelectedMechanic('All');
    setSelectedLevel('All');
    setSearchQuery('');
  };

  return (
    <div className="gymmane-db-view">
      {/* Top Header Row (Styled Identically to Main Overview) */}
      <section className="db-view-header">
        <div className="gymmane-wrap">
          <div className="hero-clean-header-row db-top-nav-row">
            <div className="db-nav-left-group">
              <button
                type="button"
                className="db-back-btn"
                onClick={onBack}
                title="Return to Home Overview"
              >
                <ArrowLeft size={14} />
                <span>Back to Home</span>
              </button>

              <div className="hero-brand-date-box" title="Archived Exercise Collection">
                <div className="hero-date-icon-frame">
                  <Archive size={13} />
                </div>
                <span className="home-date-kicker">EXERCISE VAULT · ARCHIVE</span>
              </div>
            </div>

            <div className="db-header-stats-badge">
              <Dumbbell size={13} />
              <span><b>{exercisesList.length}</b> movements indexed</span>
            </div>
          </div>

          {/* Archive Telemetry Bento (Restores and Elevates Library Statistics) */}
          <div className="db-telemetry-bento">
            {/* Card 1: Equipment Spectrum */}
            <div className="db-telemetry-card equip-card">
              <div className="telemetry-card-header">
                <span className="telemetry-card-title">
                  <Dumbbell size={13} className="telemetry-title-icon" />
                  EQUIPMENT SPECTRUM
                </span>
                <span className="telemetry-badge-count">{telemetry.total} Movements</span>
              </div>

              <div className="telemetry-split-stats">
                <div className="split-metric">
                  <span className="split-num">{telemetry.gearCount}</span>
                  <span className="split-lbl">Equipment ({telemetry.gearPercent}%)</span>
                </div>
                <div className="split-divider">/</div>
                <div className="split-metric">
                  <span className="split-num teal">{telemetry.bwCount}</span>
                  <span className="split-lbl">Bodyweight ({telemetry.bwPercent}%)</span>
                </div>
              </div>

              {/* Dual segmented split bar */}
              <div className="telemetry-segmented-bar">
                <div
                  className="segment-fill gear"
                  style={{ width: `${telemetry.gearPercent}%` }}
                  title={`Equipment: ${telemetry.gearCount} exercises (${telemetry.gearPercent}%)`}
                />
                <div
                  className="segment-fill bodyweight"
                  style={{ width: `${telemetry.bwPercent}%` }}
                  title={`Bodyweight: ${telemetry.bwCount} exercises (${telemetry.bwPercent}%)`}
                />
              </div>

              {/* Interactive Quick Filter Chips */}
              <div className="telemetry-quick-chips">
                <button
                  type="button"
                  className={`telemetry-chip ${selectedEquipment === 'All Equipment' ? 'active' : ''}`}
                  onClick={() => setSelectedEquipment('All Equipment')}
                >
                  All ({telemetry.total})
                </button>
                <button
                  type="button"
                  className={`telemetry-chip ${selectedEquipment === 'Equipment Needed' ? 'active' : ''}`}
                  onClick={() => setSelectedEquipment('Equipment Needed')}
                >
                  Gear ({telemetry.gearCount})
                </button>
                <button
                  type="button"
                  className={`telemetry-chip ${selectedEquipment === 'Bodyweight Only' ? 'active' : ''}`}
                  onClick={() => setSelectedEquipment('Bodyweight Only')}
                >
                  Bodyweight ({telemetry.bwCount})
                </button>
              </div>

              {/* Sub-gear breakdown line */}
              <div className="telemetry-sub-breakdown">
                <button
                  type="button"
                  className={`sub-gear-tag ${selectedEquipment === 'Dumbbells' ? 'active' : ''}`}
                  onClick={() => setSelectedEquipment(prev => prev === 'Dumbbells' ? 'All Equipment' : 'Dumbbells')}
                  title="Filter Dumbbell exercises"
                >
                  Dumbbells ({telemetry.gearBreakdown.dumbbells})
                </button>
                <button
                  type="button"
                  className={`sub-gear-tag ${selectedEquipment === 'Barbell' ? 'active' : ''}`}
                  onClick={() => setSelectedEquipment(prev => prev === 'Barbell' ? 'All Equipment' : 'Barbell')}
                  title="Filter Barbell exercises"
                >
                  Barbell ({telemetry.gearBreakdown.barbell})
                </button>
                <button
                  type="button"
                  className={`sub-gear-tag ${selectedEquipment === 'Kettlebell' ? 'active' : ''}`}
                  onClick={() => setSelectedEquipment(prev => prev === 'Kettlebell' ? 'All Equipment' : 'Kettlebell')}
                  title="Filter Kettlebell exercises"
                >
                  Kettlebell ({telemetry.gearBreakdown.kettlebell})
                </button>
                <button
                  type="button"
                  className={`sub-gear-tag ${selectedEquipment === 'Bands / Straps' ? 'active' : ''}`}
                  onClick={() => setSelectedEquipment(prev => prev === 'Bands / Straps' ? 'All Equipment' : 'Bands / Straps')}
                  title="Filter Bands & Cables"
                >
                  Bands/Other ({telemetry.gearBreakdown.other})
                </button>
              </div>
            </div>

            {/* Card 2: Biomechanics & Difficulty */}
            <div className="db-telemetry-card mechanics-card">
              <div className="telemetry-card-header">
                <span className="telemetry-card-title">
                  <Layers size={13} className="telemetry-title-icon" />
                  LIFT TYPES & MECHANICS
                </span>
                <span className="telemetry-badge-count">Kinesiology</span>
              </div>

              {/* Mechanics Interactive Chips */}
              <div className="telemetry-quick-chips mechanics-chips">
                <button
                  type="button"
                  className={`telemetry-chip ${selectedMechanic === 'Compound' ? 'active' : ''}`}
                  onClick={() => setSelectedMechanic(prev => prev === 'Compound' ? 'All' : 'Compound')}
                  title="Multi-joint movements (Compound)"
                >
                  <span className="chip-label">Compound</span>
                  <span className="chip-count">{telemetry.mechanics.Compound || 0}</span>
                </button>
                <button
                  type="button"
                  className={`telemetry-chip ${selectedMechanic === 'Isolation' ? 'active' : ''}`}
                  onClick={() => setSelectedMechanic(prev => prev === 'Isolation' ? 'All' : 'Isolation')}
                  title="Single-joint movements (Isolation)"
                >
                  <span className="chip-label">Isolation</span>
                  <span className="chip-count">{telemetry.mechanics.Isolation || 0}</span>
                </button>
                <button
                  type="button"
                  className={`telemetry-chip ${selectedMechanic === 'Mobility' ? 'active' : ''}`}
                  onClick={() => setSelectedMechanic(prev => prev === 'Mobility' ? 'All' : 'Mobility')}
                  title="Joint priming & warmup (Mobility)"
                >
                  <span className="chip-label">Mobility</span>
                  <span className="chip-count">{telemetry.mechanics.Mobility || 0}</span>
                </button>
                <button
                  type="button"
                  className={`telemetry-chip ${selectedMechanic === 'Isometric' ? 'active' : ''}`}
                  onClick={() => setSelectedMechanic(prev => prev === 'Isometric' ? 'All' : 'Isometric')}
                  title="Static tension & core (Isometric)"
                >
                  <span className="chip-label">Isometric</span>
                  <span className="chip-count">{telemetry.mechanics.Isometric || 0}</span>
                </button>
              </div>

              {/* Stacked mechanics visual bar */}
              <div className="telemetry-stacked-bar">
                <div
                  className="stacked-seg seg-compound"
                  style={{ width: `${(telemetry.mechanics.Compound / telemetry.total) * 100}%` }}
                  title={`Compound: ${telemetry.mechanics.Compound} movements`}
                />
                <div
                  className="stacked-seg seg-isolation"
                  style={{ width: `${(telemetry.mechanics.Isolation / telemetry.total) * 100}%` }}
                  title={`Isolation: ${telemetry.mechanics.Isolation} movements`}
                />
                <div
                  className="stacked-seg seg-mobility"
                  style={{ width: `${(telemetry.mechanics.Mobility / telemetry.total) * 100}%` }}
                  title={`Mobility: ${telemetry.mechanics.Mobility} movements`}
                />
                <div
                  className="stacked-seg seg-isometric"
                  style={{ width: `${(telemetry.mechanics.Isometric / telemetry.total) * 100}%` }}
                  title={`Isometric: ${telemetry.mechanics.Isometric} movements`}
                />
              </div>

              {/* Difficulty Spectrum Row */}
              <div className="telemetry-level-row">
                <span className="level-label">DIFFICULTY:</span>
                <div className="level-chips-wrap">
                  <button
                    type="button"
                    className={`level-pill beginner ${selectedLevel === 'Beginner' ? 'active' : ''}`}
                    onClick={() => setSelectedLevel(prev => prev === 'Beginner' ? 'All' : 'Beginner')}
                    title="Beginner-friendly movements"
                  >
                    <span className="level-pip beginner" /> Beginner ({telemetry.levels.Beginner})
                  </button>
                  <button
                    type="button"
                    className={`level-pill intermediate ${selectedLevel === 'Intermediate' ? 'active' : ''}`}
                    onClick={() => setSelectedLevel(prev => prev === 'Intermediate' ? 'All' : 'Intermediate')}
                    title="Intermediate movements"
                  >
                    <span className="level-pip intermediate" /> Intermediate ({telemetry.levels.Intermediate})
                  </button>
                  <button
                    type="button"
                    className={`level-pill advanced ${selectedLevel === 'Advanced' ? 'active' : ''}`}
                    onClick={() => setSelectedLevel(prev => prev === 'Advanced' ? 'All' : 'Advanced')}
                    title="Advanced movements"
                  >
                    <span className="level-pip advanced" /> Advanced ({telemetry.levels.Advanced})
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Anatomical Spectrum */}
            <div className="db-telemetry-card anatomy-card">
              <div className="telemetry-card-header">
                <span className="telemetry-card-title">
                  <Activity size={13} className="telemetry-title-icon" />
                  ANATOMICAL SPECTRUM
                </span>
                <span className="telemetry-badge-count">{telemetry.distinctMusclesCount} Target Areas</span>
              </div>

              {/* Proportional muscle distribution bar */}
              <div className="telemetry-anatomy-bar">
                {telemetry.sortedMuscles.map((item, idx) => (
                  <div
                    key={item.key}
                    className={`anatomy-bar-seg seg-tone-${idx % 6}`}
                    style={{ width: `${item.percent}%` }}
                    title={`${item.label}: ${item.count} movements (${item.percent}%)`}
                  />
                ))}
              </div>

              {/* Muscle breakdown chips list */}
              <div className="telemetry-muscle-chips-list">
                {telemetry.sortedMuscles.slice(0, 6).map((item, idx) => {
                  const isSelected = selectedMuscle === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      className={`muscle-breakdown-chip ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(prev => prev === item.key ? 'All' : item.key)}
                      title={`Filter by ${item.label}`}
                    >
                      <span className={`chip-color-dot tone-${idx % 6}`} />
                      <span className="chip-muscle-name">{item.label}</span>
                      <span className="chip-muscle-percent">{item.percent}%</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Body Map toggle */}
              <div className="telemetry-bodymap-launch">
                <button
                  type="button"
                  className={`btn-bodymap-drawer-toggle ${showBodyMap ? 'active' : ''}`}
                  onClick={() => setShowBodyMap(prev => !prev)}
                  title="Open interactive 3D anatomical silhouette"
                >
                  <Activity size={13} />
                  <span>{showBodyMap ? 'Hide Anatomical Figure' : 'Interactive Anatomical Figure'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sleek Modern Filter & Search Cockpit */}
          <div className="db-cockpit-shell">
            <div className="db-cockpit-primary-row">
              <div className="db-search-input-wrap">
                <Search size={16} className="db-search-icon" />
                <input
                  type="text"
                  placeholder="Search by exercise name, muscle, equipment, or pattern..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="db-search-input"
                  aria-label="Search exercises"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="db-cockpit-tools">
                {/* Custom Equipment Dropdown */}
                <div className="db-custom-select-wrap" ref={equipMenuRef}>
                  <button
                    type="button"
                    className={`db-select-pill-btn ${isEquipMenuOpen ? 'open' : ''} ${selectedEquipment !== 'All Equipment' ? 'active' : ''}`}
                    onClick={() => setIsEquipMenuOpen(prev => !prev)}
                    aria-expanded={isEquipMenuOpen}
                    aria-haspopup="listbox"
                    title="Filter movements by required equipment"
                  >
                    <Dumbbell size={13} className="db-select-icon" />
                    <span className="db-select-current-label">
                      {selectedEquipment}
                    </span>
                    <ChevronDown size={13} className={`db-select-chevron ${isEquipMenuOpen ? 'rotated' : ''}`} />
                  </button>

                  {isEquipMenuOpen && (
                    <div className="db-custom-dropdown-menu animate-fade" role="listbox">
                      {EQUIPMENT_FILTERS.map((eq) => {
                        const isSelected = selectedEquipment === eq.label;
                        return (
                          <button
                            key={eq.label}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            className={`db-dropdown-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedEquipment(eq.label);
                              setIsEquipMenuOpen(false);
                            }}
                          >
                            <span className="db-dropdown-item-label">{eq.label}</span>
                            {isSelected && <Check size={13} className="db-dropdown-check" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Custom Mechanics Dropdown */}
                <div className="db-custom-select-wrap" ref={mechMenuRef}>
                  <button
                    type="button"
                    className={`db-select-pill-btn ${isMechMenuOpen ? 'open' : ''} ${selectedMechanic !== 'All' ? 'active' : ''}`}
                    onClick={() => setIsMechMenuOpen(prev => !prev)}
                    aria-expanded={isMechMenuOpen}
                    aria-haspopup="listbox"
                    title="Filter movements by mechanics"
                  >
                    <Layers size={13} className="db-select-icon" />
                    <span className="db-select-current-label">
                      {selectedMechanic === 'All' ? 'All Mechanics' : selectedMechanic}
                    </span>
                    <ChevronDown size={13} className={`db-select-chevron ${isMechMenuOpen ? 'rotated' : ''}`} />
                  </button>

                  {isMechMenuOpen && (
                    <div className="db-custom-dropdown-menu animate-fade" role="listbox">
                      {MECHANIC_FILTERS.map((mf) => {
                        const isSelected = selectedMechanic === mf.value;
                        return (
                          <button
                            key={mf.value}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            className={`db-dropdown-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedMechanic(mf.value);
                              setIsMechMenuOpen(false);
                            }}
                          >
                            <span className="db-dropdown-item-label">{mf.label}</span>
                            {isSelected && <Check size={13} className="db-dropdown-check" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Custom Level Dropdown */}
                <div className="db-custom-select-wrap" ref={levelMenuRef}>
                  <button
                    type="button"
                    className={`db-select-pill-btn ${isLevelMenuOpen ? 'open' : ''} ${selectedLevel !== 'All' ? 'active' : ''}`}
                    onClick={() => setIsLevelMenuOpen(prev => !prev)}
                    aria-expanded={isLevelMenuOpen}
                    aria-haspopup="listbox"
                    title="Filter movements by level"
                  >
                    <SlidersHorizontal size={13} className="db-select-icon" />
                    <span className="db-select-current-label">
                      {selectedLevel === 'All' ? 'All Levels' : selectedLevel}
                    </span>
                    <ChevronDown size={13} className={`db-select-chevron ${isLevelMenuOpen ? 'rotated' : ''}`} />
                  </button>

                  {isLevelMenuOpen && (
                    <div className="db-custom-dropdown-menu animate-fade" role="listbox">
                      {LEVEL_FILTERS.map((lf) => {
                        const isSelected = selectedLevel === lf.value;
                        return (
                          <button
                            key={lf.value}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            className={`db-dropdown-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedLevel(lf.value);
                              setIsLevelMenuOpen(false);
                            }}
                          >
                            <span className="db-dropdown-item-label">{lf.label}</span>
                            {isSelected && <Check size={13} className="db-dropdown-check" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Body Map Toggle Pill */}
                <button
                  type="button"
                  className={`db-toggle-bodymap-btn ${showBodyMap || selectedMuscle !== 'All' ? 'active' : ''}`}
                  onClick={() => setShowBodyMap((prev) => !prev)}
                  title="Filter by tapping muscles on the anatomical figure"
                >
                  <Activity size={14} />
                  <span>Body Map{selectedMuscle !== 'All' ? ` (${MUSCLE_LABELS[selectedMuscle] || selectedMuscle})` : ''}</span>
                </button>

                {/* Global Reset Button */}
                {isFilterActive && (
                  <button
                    type="button"
                    className="db-reset-all-pill"
                    onClick={handleResetAll}
                    title="Reset all active filters"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Anatomy Muscle Fast-Pills with Exact Movement Counts */}
            <div className="db-rail-row">
              <span className="db-rail-label">ANATOMY</span>
              <div className="db-rail-scroll">
                {MUSCLE_CATEGORIES.map((cat) => {
                  const count = muscleCountMap[cat.key] || 0;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      className={`db-pill-btn ${selectedMuscle === cat.key ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(cat.key)}
                    >
                      <span>{cat.label}</span>
                      <span className="db-pill-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expandable Interactive Anatomical Body Map Drawer */}
            {showBodyMap && (
              <div className="db-bodymap-drawer animate-fade">
                <BodyMap
                  selectedMuscles={selectedMuscle !== 'All' ? [selectedMuscle] : []}
                  onToggleMuscle={(key) => setSelectedMuscle((prev) => (prev === key ? 'All' : key))}
                  onClearMuscles={() => setSelectedMuscle('All')}
                  hidePills={true}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="db-view-main">
        <div className="gymmane-wrap">
          <div className="db-results-bar">
            <span className="db-counter-text">
              Showing <b>{filteredExercises.length}</b> of <b>{exercisesList.length}</b> movements
            </span>

            {isFilterActive && (
              <button
                type="button"
                className="db-reset-filter-link"
                onClick={handleResetAll}
              >
                Reset all filters
              </button>
            )}
          </div>

          {filteredExercises.length === 0 ? (
            <div className="db-empty-box">
              <Dumbbell size={48} color="var(--clay)" />
              <h3>No Movements Found</h3>
              <p>No exercises match your current search or filter combination.</p>
              <button
                type="button"
                className="btn-gymmane-primary"
                style={{ marginTop: '12px' }}
                onClick={handleResetAll}
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="db-catalog-grid">
              {filteredExercises.map(ex => {
                const usesGear = getRequiresEquipment(ex);
                const mechanicsLabel = ex.mechanics || (ex.isWarmup ? 'Mobility' : 'Compound');
                const levelLabel = ex.level || 'Intermediate';
                const equipLabel = usesGear ? (ex.equipment || 'Equipment') : 'Bodyweight';
                const isGif = isAnimatedGifUrl(ex.illustration);

                return (
                  <article
                    key={ex.id}
                    className="db-catalog-card clean-typography-card"
                    onClick={() => setActiveExerciseDetail(ex)}
                  >
                    <div
                      className="db-card-media-wrapper"
                      title="Click to view movement guide"
                    >
                      {ex.illustration ? (
                        <img
                          src={ex.illustration}
                          alt={ex.name}
                          className="db-card-cover-photo"
                          loading="lazy"
                        />
                      ) : ex.customVideoUrl ? (
                        <div className="db-card-photo-placeholder has-video">
                          <div className="placeholder-badge">
                            <Video size={18} color="var(--clay)" />
                            <span>VIDEO TUTORIAL</span>
                          </div>
                          <span className="placeholder-action-hint">View Video</span>
                        </div>
                      ) : (
                        <div className="db-card-photo-placeholder">
                          <div className="placeholder-badge">
                            <Dumbbell size={18} />
                            <span>CANONICAL EXERCISE</span>
                          </div>
                          <span className="placeholder-action-hint">View Guide</span>
                        </div>
                      )}
                      {ex.isWarmup && (
                        <span className="db-warmup-corner-badge">WARM-UP</span>
                      )}
                      {isGif && (
                        <span className="db-gif-corner-badge">GIF</span>
                      )}
                    </div>

                    <div className="db-card-body">
                      <div className="db-card-header-tags">
                        <span className="db-muscle-badge">
                          {MUSCLE_LABELS[ex.muscleKey] || ex.muscleKey}
                        </span>
                        <span
                          className={`db-equip-status-pill ${usesGear ? 'gear' : 'bodyweight'}`}
                          title={equipLabel}
                        >
                          {usesGear ? <Dumbbell size={11} /> : <UserCheck size={11} />}
                          <span>{equipLabel}</span>
                        </span>
                      </div>

                      {ex.pattern && (
                        <div className="db-pattern-kicker" title={ex.pattern}>
                          {ex.pattern}
                        </div>
                      )}

                      <h3 className="db-exercise-title" title={ex.name}>{ex.name}</h3>
                      <p className="db-exercise-subtitle" title={ex.subtitle || ex.scientificName}>
                        {ex.subtitle || ex.scientificName || 'Movement profile'}
                      </p>

                      <div className="db-card-meta-strip">
                        <div className="db-meta-cell">
                          <span className="db-meta-label">GEAR</span>
                          <span className="db-meta-val">{usesGear ? 'Equipment' : 'Bodyweight'}</span>
                        </div>
                        <div className="db-meta-cell">
                          <span className="db-meta-label">MECHANICS</span>
                          <span className="db-meta-val">{mechanicsLabel}</span>
                        </div>
                        <div className="db-meta-cell">
                          <span className="db-meta-label">LEVEL</span>
                          <span className="db-meta-val">{levelLabel}</span>
                        </div>
                      </div>

                      <div className="db-card-footer">
                        <button
                          type="button"
                          className="db-card-cta-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveExerciseDetail(ex);
                          }}
                        >
                          <BookOpen size={14} />
                          <span>View Guide</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Flagship Read-Only Exercise Guide Modal */}
      {activeExerciseDetail && (
        <ExerciseDetailModal
          exercise={activeExerciseDetail}
          onClose={() => setActiveExerciseDetail(null)}
        />
      )}
    </div>
  );
}

export default ExerciseDatabaseView;
