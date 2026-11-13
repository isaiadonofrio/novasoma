import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Search,
  Dumbbell,
  BookOpen,
  X,
  UserCheck,
  Video,
  Activity,
  RotateCcw,
  ChevronDown,
  Check,
  Calendar,
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
  _onAddExerciseToRoutine
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

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setNow(new Date());
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const todayDisplay = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

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
      bodyweight: 0,
      bands: 0,
      bench: 0,
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
    const lowerBodySet = new Set(['quads', 'hamstrings', 'glutes', 'calves']);
    const upperBodySet = new Set(['chest', 'back', 'shoulders', 'biceps', 'triceps', 'trapezius', 'forearm']);
    const coreSet = new Set(['abdomen', 'obliques']);

    let lowerBodyCount = 0;
    let upperBodyCount = 0;
    let coreCount = 0;

    exercisesList.forEach((ex) => {
      const usesGear = getRequiresEquipment(ex);
      if (usesGear) {
        gearCount++;
        const eq = (ex.equipment || '').toLowerCase();
        if (eq.includes('dumbbell')) gearBreakdown.dumbbells++;
        else if (eq.includes('barbell') || eq.includes('landmine')) gearBreakdown.barbell++;
        else if (eq.includes('kettlebell')) gearBreakdown.kettlebell++;
        else if (eq.includes('band') || eq.includes('strap') || eq.includes('rope')) gearBreakdown.bands++;
        else if (eq.includes('bench') || eq.includes('step') || eq.includes('box')) gearBreakdown.bench++;
      } else {
        bwCount++;
        gearBreakdown.bodyweight++;
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
        const k = ex.muscleKey.toLowerCase();
        muscleCounts[ex.muscleKey] = (muscleCounts[ex.muscleKey] || 0) + 1;
        if (lowerBodySet.has(k)) lowerBodyCount++;
        else if (upperBodySet.has(k)) upperBodyCount++;
        else if (coreSet.has(k)) coreCount++;
      }
    });

    const gearPercent = total > 0 ? Math.round((gearCount / total) * 100) : 0;
    const bwPercent = total > 0 ? 100 - gearPercent : 0;

    const lowerPercent = total > 0 ? Math.round((lowerBodyCount / total) * 100) : 0;
    const upperPercent = total > 0 ? Math.round((upperBodyCount / total) * 100) : 0;
    const corePercent = total > 0 ? Math.max(0, 100 - lowerPercent - upperPercent) : 0;

    const gearList = [
      { key: 'bodyweight', label: 'Bodyweight / Mat', count: gearBreakdown.bodyweight, percent: total > 0 ? Math.round((gearBreakdown.bodyweight / total) * 100) : 0 },
      { key: 'dumbbells', label: 'Dumbbells', count: gearBreakdown.dumbbells, percent: total > 0 ? Math.round((gearBreakdown.dumbbells / total) * 100) : 0 },
      { key: 'barbell', label: 'Barbell & Landmine', count: gearBreakdown.barbell, percent: total > 0 ? Math.round((gearBreakdown.barbell / total) * 100) : 0 },
      { key: 'kettlebell', label: 'Kettlebell', count: gearBreakdown.kettlebell, percent: total > 0 ? Math.round((gearBreakdown.kettlebell / total) * 100) : 0 },
      { key: 'bench', label: 'Bench & Platform', count: gearBreakdown.bench, percent: total > 0 ? Math.round((gearBreakdown.bench / total) * 100) : 0 },
      { key: 'bands', label: 'Bands & Straps', count: gearBreakdown.bands, percent: total > 0 ? Math.round((gearBreakdown.bands / total) * 100) : 0 },
    ];

    // Top muscles sorted by frequency for proportional bar and stats list
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
      gearList,
      mechanics,
      levels,
      muscleCounts,
      sortedMuscles,
      distinctMusclesCount: Object.keys(muscleCounts).length,
      regions: {
        lower: { count: lowerBodyCount, percent: lowerPercent },
        upper: { count: upperBodyCount, percent: upperPercent },
        core: { count: coreCount, percent: corePercent },
      }
    };
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
      {/* Top Header Row (Identical to Main Homepage: Keep Date, Delete Title & Back Button) */}
      <section className="db-view-header">
        <div className="gymmane-wrap">
          <div className="hero-clean-header-row db-top-nav-row">
            <div className="hero-brand-date-box" title="Today">
              <div className="hero-date-icon-frame">
                <Calendar size={16} />
              </div>
              <span className="home-date-kicker">TODAY · {todayDisplay}</span>
            </div>

            <div className="db-header-stats-badge">
              <Dumbbell size={14} />
              <span><b>{exercisesList.length}</b> movements indexed</span>
            </div>
          </div>

          {/* Archive Telemetry Bento (Spacious 2-Card Balanced Layout, Zero White Space, Pure Static Telemetry) */}
          <div className="db-telemetry-bento">
            {/* Card 1: Equipment & Movement Mechanics (Training Setup & Lift Kinematics) */}
            <div className="db-telemetry-card equip-card">
              <div className="telemetry-card-header">
                <span className="telemetry-card-title">
                  <Dumbbell size={15} className="telemetry-title-icon" />
                  EQUIPMENT & MOVEMENT SPECTRUM
                </span>
                <span className="telemetry-badge-count">{telemetry.total} Movements</span>
              </div>

              {/* High-Level KPI Comparison Cards */}
              <div className="telemetry-kpi-row">
                <div className="telemetry-kpi-card gear">
                  <div className="kpi-card-top">
                    <span className="kpi-big-num">{telemetry.gearCount}</span>
                    <span className="kpi-tag gear">{telemetry.gearPercent}%</span>
                  </div>
                  <span className="kpi-label">Equipment Required</span>
                  <span className="kpi-desc">Dumbbells, Barbells, Bands & Benches</span>
                </div>

                <div className="telemetry-kpi-card bodyweight">
                  <div className="kpi-card-top">
                    <span className="kpi-big-num teal">{telemetry.bwCount}</span>
                    <span className="kpi-tag bodyweight">{telemetry.bwPercent}%</span>
                  </div>
                  <span className="kpi-label">Bodyweight Only</span>
                  <span className="kpi-desc">Zero gear needed · Calisthenics & Mat</span>
                </div>
              </div>

              {/* Segmented Proportion Bar */}
              <div className="telemetry-segmented-bar" aria-hidden="true">
                <div
                  className="segment-fill gear"
                  style={{ width: `${telemetry.gearPercent}%` }}
                  title={`Equipment Required: ${telemetry.gearCount} exercises (${telemetry.gearPercent}%)`}
                />
                <div
                  className="segment-fill bodyweight"
                  style={{ width: `${telemetry.bwPercent}%` }}
                  title={`Bodyweight Only: ${telemetry.bwCount} exercises (${telemetry.bwPercent}%)`}
                />
              </div>

              {/* Detailed Gear Distribution (3 Columns x 2 Rows, Static Informational Tiles) */}
              <div className="telemetry-sub-header-row">
                <span className="telemetry-sub-kicker">
                  <SlidersHorizontal size={13} />
                  DETAILED GEAR INVENTORY
                </span>
                <span className="telemetry-sub-meta">6 Categories</span>
              </div>

              <div className="telemetry-gear-stat-grid">
                {telemetry.gearList.map((item, idx) => (
                  <div key={item.key} className="gear-stat-tile">
                    <div className="gear-stat-top">
                      <div className="gear-stat-left">
                        <span className={`chip-color-dot tone-${idx % 6}`} />
                        <span className="gear-stat-name">{item.label}</span>
                      </div>
                      <div className="gear-stat-right">
                        <span className="gear-stat-count">{item.count}</span>
                        <span className="gear-stat-pct">{item.percent}%</span>
                      </div>
                    </div>
                    <div className="gear-stat-track" aria-hidden="true">
                      <div
                        className={`gear-stat-fill tone-${idx % 6}`}
                        style={{ width: `${Math.min(100, Math.max(8, item.percent * 2.2))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="telemetry-section-divider" />

              {/* Movement Mechanics & Difficulty Spectrum */}
              <div className="telemetry-sub-header-row">
                <span className="telemetry-sub-kicker">
                  <Activity size={13} />
                  MOVEMENT MECHANICS & LEVEL
                </span>
                <span className="telemetry-sub-meta">Lift Classification</span>
              </div>

              {/* 4-Item Mechanics Stat Tiles */}
              <div className="telemetry-mech-stat-grid">
                <div className="mech-stat-tile">
                  <span className="mech-stat-name">Compound</span>
                  <div className="mech-stat-val-row">
                    <span className="mech-stat-num">{telemetry.mechanics.Compound || 0}</span>
                    <span className="mech-stat-pct">
                      {telemetry.total > 0 ? Math.round(((telemetry.mechanics.Compound || 0) / telemetry.total) * 100) : 0}%
                    </span>
                  </div>
                  <span className="mech-stat-desc">Multi-joint lifts</span>
                </div>

                <div className="mech-stat-tile">
                  <span className="mech-stat-name">Isolation</span>
                  <div className="mech-stat-val-row">
                    <span className="mech-stat-num">{telemetry.mechanics.Isolation || 0}</span>
                    <span className="mech-stat-pct">
                      {telemetry.total > 0 ? Math.round(((telemetry.mechanics.Isolation || 0) / telemetry.total) * 100) : 0}%
                    </span>
                  </div>
                  <span className="mech-stat-desc">Single-joint focus</span>
                </div>

                <div className="mech-stat-tile">
                  <span className="mech-stat-name">Mobility</span>
                  <div className="mech-stat-val-row">
                    <span className="mech-stat-num">{telemetry.mechanics.Mobility || 0}</span>
                    <span className="mech-stat-pct">
                      {telemetry.total > 0 ? Math.round(((telemetry.mechanics.Mobility || 0) / telemetry.total) * 100) : 0}%
                    </span>
                  </div>
                  <span className="mech-stat-desc">Joint priming & range</span>
                </div>

                <div className="mech-stat-tile">
                  <span className="mech-stat-name">Isometric</span>
                  <div className="mech-stat-val-row">
                    <span className="mech-stat-num">{telemetry.mechanics.Isometric || 0}</span>
                    <span className="mech-stat-pct">
                      {telemetry.total > 0 ? Math.round(((telemetry.mechanics.Isometric || 0) / telemetry.total) * 100) : 0}%
                    </span>
                  </div>
                  <span className="mech-stat-desc">Static tension holds</span>
                </div>
              </div>

              {/* Experience Level Row */}
              <div className="telemetry-level-bar-wrap">
                <span className="level-bar-label">EXPERIENCE LEVEL:</span>
                <div className="level-stat-tags">
                  <span className="level-stat-tag">
                    <span className="level-pip beginner" /> Beginner <b>{telemetry.levels.Beginner}</b>
                  </span>
                  <span className="level-stat-tag">
                    <span className="level-pip intermediate" /> Intermediate <b>{telemetry.levels.Intermediate}</b>
                  </span>
                  <span className="level-stat-tag">
                    <span className="level-pip advanced" /> Advanced <b>{telemetry.levels.Advanced}</b>
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Anatomical Coverage & Muscle Vault (Macro Regions + Detailed Muscle Groups) */}
            <div className="db-telemetry-card anatomy-card">
              <div className="telemetry-card-header">
                <span className="telemetry-card-title">
                  <Layers size={15} className="telemetry-title-icon" />
                  ANATOMICAL COVERAGE & MUSCLE VAULT
                </span>
                <span className="telemetry-badge-count">{telemetry.distinctMusclesCount} Muscle Groups</span>
              </div>

              {/* Macro Regional Distribution KPIs (3-Card Row) */}
              <div className="telemetry-region-kpi-row">
                <div className="telemetry-region-kpi-card lower">
                  <div className="region-kpi-top">
                    <span className="region-kpi-num">{telemetry.regions.lower.count}</span>
                    <span className="region-kpi-pct lower">{telemetry.regions.lower.percent}%</span>
                  </div>
                  <span className="region-kpi-title">Lower Body</span>
                  <span className="region-kpi-sub">Quads, Glutes & Legs</span>
                </div>

                <div className="telemetry-region-kpi-card upper">
                  <div className="region-kpi-top">
                    <span className="region-kpi-num teal">{telemetry.regions.upper.count}</span>
                    <span className="region-kpi-pct upper">{telemetry.regions.upper.percent}%</span>
                  </div>
                  <span className="region-kpi-title">Upper Body</span>
                  <span className="region-kpi-sub">Chest, Back & Arms</span>
                </div>

                <div className="telemetry-region-kpi-card core">
                  <div className="region-kpi-top">
                    <span className="region-kpi-num amber">{telemetry.regions.core.count}</span>
                    <span className="region-kpi-pct core">{telemetry.regions.core.percent}%</span>
                  </div>
                  <span className="region-kpi-title">Core & Trunk</span>
                  <span className="region-kpi-sub">Abs, Obliques & Trunk</span>
                </div>
              </div>

              {/* 3-Part Regional Proportion Bar */}
              <div className="telemetry-region-bar" aria-hidden="true">
                <div
                  className="region-bar-seg seg-lower"
                  style={{ width: `${telemetry.regions.lower.percent}%` }}
                  title={`Lower Body: ${telemetry.regions.lower.count} (${telemetry.regions.lower.percent}%)`}
                />
                <div
                  className="region-bar-seg seg-upper"
                  style={{ width: `${telemetry.regions.upper.percent}%` }}
                  title={`Upper Body: ${telemetry.regions.upper.count} (${telemetry.regions.upper.percent}%)`}
                />
                <div
                  className="region-bar-seg seg-core"
                  style={{ width: `${telemetry.regions.core.percent}%` }}
                  title={`Core & Posture: ${telemetry.regions.core.count} (${telemetry.regions.core.percent}%)`}
                />
              </div>

              <div className="telemetry-section-divider" />

              {/* Detailed Target Muscle Groups (All 12 Groups, 2 Columns x 6 Rows) */}
              <div className="telemetry-sub-header-row">
                <span className="telemetry-sub-kicker">
                  <Layers size={13} />
                  PRIMARY TARGET MUSCLE DISTRIBUTION
                </span>
                <span className="telemetry-sub-meta">All 12 Groups Indexed (70 Movements)</span>
              </div>

              <div className="telemetry-muscle-grid">
                {telemetry.sortedMuscles.slice(0, 12).map((item, idx) => (
                  <div key={item.key} className="muscle-stat-tile">
                    <div className="muscle-stat-left">
                      <span className={`chip-color-dot tone-${idx % 6}`} />
                      <span className="muscle-stat-name">{item.label}</span>
                    </div>
                    <div className="muscle-stat-right">
                      <span className="muscle-stat-count">{item.count}</span>
                      <span className="muscle-stat-pct">{item.percent}%</span>
                    </div>
                  </div>
                ))}
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

                {/* Optional Interactive Drawer Toggle */}
                <button
                  type="button"
                  className={`db-toggle-bodymap-btn ${showBodyMap || selectedMuscle !== 'All' ? 'active' : ''}`}
                  onClick={() => setShowBodyMap((prev) => !prev)}
                  title="Filter by tapping muscles on the interactive 3D anatomy drawer"
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

            {/* Anatomy Muscle Fast-Pills (Clean Label-Only Bubbles, Non-Redundant) */}
            <div className="db-rail-row">
              <span className="db-rail-label">ANATOMY</span>
              <div className="db-rail-scroll">
                {MUSCLE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    className={`db-pill-btn ${selectedMuscle === cat.key ? 'active' : ''}`}
                    onClick={() => setSelectedMuscle(cat.key)}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Expandable Interactive Anatomical Body Map Drawer (Only when user explicitly taps Body Map button) */}
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
