import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Search,
  Dumbbell,
  BookOpen,
  X,
  UserCheck,
  Video,
  RotateCcw,
  ChevronDown,
  Check,
  Layers,
  SlidersHorizontal
} from 'lucide-react';
import { MUSCLE_LABELS, getMuscleRegionTone } from '../data/muscleLabels.js';
import { getRequiresEquipment, isAnimatedGifUrl } from '../utils/exerciseImport.js';
import { ExerciseDetailModal } from './ExerciseDetailModal.jsx';

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
  { label: 'Bands / Bar', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return (
      eq.includes('band') ||
      eq.includes('strap') ||
      eq.includes('cable') ||
      eq.includes('pull-up bar') ||
      eq.includes('dip') ||
      eq.includes('rope')
    );
  } },
  { label: 'Bench / Box / Ball', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return (
      eq.includes('bench') ||
      eq.includes('step') ||
      eq.includes('box') ||
      eq.includes('elevation') ||
      eq.includes('medicine ball') ||
      eq.includes('med ball') ||
      eq.includes('slam ball') ||
      eq.includes('ab wheel')
    );
  } },
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
  { label: 'Isometric', value: 'Isometric' },
  { label: 'Plyometric', value: 'Plyometric' }
];

const LEVEL_FILTERS = [
  { label: 'All Levels', value: 'All' },
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' }
];

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
  exercisesList = []
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All Equipment');
  const [selectedMechanic, setSelectedMechanic] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const [isEquipMenuOpen, setIsEquipMenuOpen] = useState(false);
  const [isMechMenuOpen, setIsMechMenuOpen] = useState(false);
  const [isLevelMenuOpen, setIsLevelMenuOpen] = useState(false);
  const [showMobileInsights, setShowMobileInsights] = useState(false);
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
    const familySet = new Set();

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
      Isometric: 0,
      Mobility: 0,
      Plyometric: 0,
    };

    const levels = {
      Beginner: 0,
      Intermediate: 0,
      Advanced: 0,
    };

    let bilateralCount = 0;
    let unilateralCount = 0;
    let closedChainCount = 0;

    const muscleCounts = {};
    const lowerBodySet = new Set(['quads', 'hamstrings', 'glutes', 'calves']);
    const upperBodySet = new Set(['chest', 'back', 'shoulders', 'biceps', 'triceps', 'trapezius', 'forearm']);
    const coreSet = new Set(['abdomen', 'obliques']);

    let lowerBodyCount = 0;
    let upperBodyCount = 0;
    let coreCount = 0;

    exercisesList.forEach((ex) => {
      if (ex.familyId) familySet.add(ex.familyId);

      const usesGear = getRequiresEquipment(ex);
      if (usesGear) {
        gearCount++;
        const eq = (ex.equipment || '').toLowerCase();
        if (eq.includes('dumbbell')) gearBreakdown.dumbbells++;
        else if (eq.includes('kettlebell')) gearBreakdown.kettlebell++;
        else if (eq.includes('barbell') || eq.includes('landmine')) gearBreakdown.barbell++;
        else if (
          eq.includes('band') ||
          eq.includes('strap') ||
          eq.includes('cable') ||
          eq.includes('pull-up bar') ||
          eq.includes('dip') ||
          eq.includes('rope')
        ) {
          gearBreakdown.bands++;
        } else {
          gearBreakdown.bench++;
        }
      } else {
        bwCount++;
        gearBreakdown.bodyweight++;
      }

      const mech = ex.mechanics || (ex.isWarmup ? 'Mobility' : 'Compound');
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

      const lat = (ex.biomechanics?.laterality || '').toLowerCase();
      if (lat.includes('unilateral') || lat.includes('asymmetric') || lat.includes('alternating')) {
        unilateralCount++;
      } else {
        bilateralCount++;
      }

      const chain = (ex.biomechanics?.chain || '').toLowerCase();
      if (chain.includes('closed')) {
        closedChainCount++;
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
      {
        key: 'bodyweight',
        label: 'Bodyweight & Mat',
        filterLabel: 'Bodyweight Only',
        tone: 'bodyweight',
        count: gearBreakdown.bodyweight,
        percent: total > 0 ? Math.round((gearBreakdown.bodyweight / total) * 100) : 0
      },
      {
        key: 'dumbbells',
        label: 'Dumbbells',
        filterLabel: 'Dumbbells',
        tone: 'gear',
        count: gearBreakdown.dumbbells,
        percent: total > 0 ? Math.round((gearBreakdown.dumbbells / total) * 100) : 0
      },
      {
        key: 'kettlebell',
        label: 'Kettlebells',
        filterLabel: 'Kettlebell',
        tone: 'gear',
        count: gearBreakdown.kettlebell,
        percent: total > 0 ? Math.round((gearBreakdown.kettlebell / total) * 100) : 0
      },
      {
        key: 'barbell',
        label: 'Barbell & Landmine',
        filterLabel: 'Barbell',
        tone: 'gear',
        count: gearBreakdown.barbell,
        percent: total > 0 ? Math.round((gearBreakdown.barbell / total) * 100) : 0
      },
      {
        key: 'bands',
        label: 'Bands, Bar & Rope',
        filterLabel: 'Bands / Bar',
        tone: 'gear',
        count: gearBreakdown.bands,
        percent: total > 0 ? Math.round((gearBreakdown.bands / total) * 100) : 0
      },
      {
        key: 'bench',
        label: 'Bench, Box & Ball',
        filterLabel: 'Bench / Box / Ball',
        tone: 'gear',
        count: gearBreakdown.bench,
        percent: total > 0 ? Math.round((gearBreakdown.bench / total) * 100) : 0
      },
    ];

    const lowerMuscles = [
      { key: 'quads', label: 'Quads', region: 'lower', count: muscleCounts.quads || 0 },
      { key: 'glutes', label: 'Glutes', region: 'lower', count: muscleCounts.glutes || 0 },
      { key: 'hamstrings', label: 'Hamstrings', region: 'lower', count: muscleCounts.hamstrings || 0 },
      { key: 'calves', label: 'Calves', region: 'lower', count: muscleCounts.calves || 0 },
    ].map((m) => ({
      ...m,
      percent: total > 0 ? Math.round((m.count / total) * 100) : 0
    }));

    const coreMuscles = [
      { key: 'abdomen', label: 'Abs & Core', region: 'core', count: muscleCounts.abdomen || 0 },
      { key: 'obliques', label: 'Obliques', region: 'core', count: muscleCounts.obliques || 0 },
    ].map((m) => ({
      ...m,
      percent: total > 0 ? Math.round((m.count / total) * 100) : 0
    }));

    const upperMuscles = [
      {
        key: 'back+trapezius',
        label: 'Back & Traps',
        region: 'upper',
        count: (muscleCounts.back || 0) + (muscleCounts.trapezius || 0)
      },
      { key: 'chest', label: 'Chest', region: 'upper', count: muscleCounts.chest || 0 },
      { key: 'shoulders', label: 'Shoulders', region: 'upper', count: muscleCounts.shoulders || 0 },
      { key: 'biceps', label: 'Biceps', region: 'upper', count: muscleCounts.biceps || 0 },
      { key: 'triceps', label: 'Triceps', region: 'upper', count: muscleCounts.triceps || 0 },
      { key: 'forearm', label: 'Forearms', region: 'upper', count: muscleCounts.forearm || 0 },
    ].map((m) => ({
      ...m,
      percent: total > 0 ? Math.round((m.count / total) * 100) : 0
    }));

    return {
      total,
      familyCount: familySet.size || 41,
      gearCount,
      bwCount,
      gearPercent,
      bwPercent,
      gearBreakdown,
      gearList,
      mechanics,
      levels,
      bilateralCount,
      unilateralCount,
      closedChainCount,
      muscleCounts,
      lowerMuscles,
      upperMuscles,
      coreMuscles,
      distinctMusclesCount: Object.keys(muscleCounts).length,
      regionalGroupsCount: lowerMuscles.length + upperMuscles.length + coreMuscles.length,
      regions: {
        lower: { key: 'region:lower', count: lowerBodyCount, percent: lowerPercent },
        upper: { key: 'region:upper', count: upperBodyCount, percent: upperPercent },
        core: { key: 'region:core', count: coreCount, percent: corePercent },
      }
    };
  }, [exercisesList]);

  const activeEquipFilter = EQUIPMENT_FILTERS.find(f => f.label === selectedEquipment) || EQUIPMENT_FILTERS[0];

  const toggleEquipFilter = (label) => {
    setSelectedEquipment((prev) => (prev === label ? 'All Equipment' : label));
  };

  const toggleMechanicFilter = (val) => {
    setSelectedMechanic((prev) => (prev === val ? 'All' : val));
  };

  const toggleLevelFilter = (val) => {
    setSelectedLevel((prev) => (prev === val ? 'All' : val));
  };

  const toggleMuscleFilter = (key) => {
    setSelectedMuscle((prev) => (prev === key ? 'All' : key));
  };

  const filteredExercises = useMemo(() => {
    return exercisesList.filter(ex => {
      if (selectedMuscle !== 'All') {
        const k = (ex.muscleKey || '').toLowerCase();
        if (selectedMuscle === 'region:lower') {
          if (!['quads', 'hamstrings', 'glutes', 'calves'].includes(k)) return false;
        } else if (selectedMuscle === 'region:upper') {
          if (!['chest', 'back', 'shoulders', 'biceps', 'triceps', 'trapezius', 'forearm'].includes(k)) return false;
        } else if (selectedMuscle === 'region:core') {
          if (!['abdomen', 'obliques'].includes(k)) return false;
        } else if (selectedMuscle === 'back+trapezius') {
          if (k !== 'back' && k !== 'trapezius') return false;
        } else if (selectedMuscle === 'arms') {
          if (k !== 'biceps' && k !== 'triceps' && k !== 'forearm') return false;
        } else if (ex.muscleKey !== selectedMuscle) {
          return false;
        }
      }
      if (!activeEquipFilter.match(ex)) return false;

      if (selectedMechanic !== 'All') {
        const mech = ex.mechanics || (ex.isWarmup ? 'Mobility' : 'Compound');
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
        const matchFamily = ex.familyName?.toLowerCase().includes(q);
        const matchVariation = ex.variationLabel?.toLowerCase().includes(q);
        const matchJoint = ex.biomechanics?.jointActions?.toLowerCase().includes(q);
        const matchPrimary = (ex.targetMuscles?.primary || []).join(' ').toLowerCase().includes(q);
        const matchMuscle = MUSCLE_LABELS[ex.muscleKey]?.toLowerCase().includes(q);
        if (
          !matchName &&
          !matchSci &&
          !matchEquip &&
          !matchPattern &&
          !matchFamily &&
          !matchVariation &&
          !matchJoint &&
          !matchPrimary &&
          !matchMuscle
        ) return false;
      }

      return true;
    });
  }, [exercisesList, selectedMuscle, activeEquipFilter, selectedMechanic, selectedLevel, searchQuery]);

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
      {/* Top Header Row */}
      <section className="db-view-header">
        <div className="gymmane-wrap">
          <div className="hero-clean-header-row db-top-nav-row">
            <div className="hero-brand-date-box">
              <h1 className="db-page-title">Exercise Library</h1>
            </div>

            <div className="db-header-stats-badge">
              <Dumbbell size={14} />
              <span><b>{exercisesList.length}</b> movements · <b>{telemetry.familyCount}</b> movement families</span>
            </div>
          </div>

          {/* Mobile Insights Collapse Toggle (< 640px) */}
          <button
            type="button"
            className="db-mobile-insights-toggle"
            aria-expanded={showMobileInsights}
            onClick={() => setShowMobileInsights((prev) => !prev)}
          >
            <span className="db-mobile-insights-copy">
              <span className="telemetry-step-index">01–02</span>
              <span>
                Library Insights · {telemetry.total} Movements · {telemetry.distinctMusclesCount} Muscles
              </span>
            </span>
            <ChevronDown
              size={15}
              className={`db-dropdown-chevron ${showMobileInsights ? 'rotated' : ''}`}
            />
          </button>

          {/* Redesigned Architectural Library Overview (Low-Noise, Cohesive Dual-Tone, Interactive Filter Matrix) */}
          <div className={`db-telemetry-bento ${showMobileInsights ? 'mobile-expanded' : ''}`}>
            {/* Card 1: Equipment & Movement Kinematics */}
            <div className="db-telemetry-card equip-card">
              <div className="telemetry-card-header">
                <span className="telemetry-card-title">
                  <span className="telemetry-step-index">01</span>
                  <span>EQUIPMENT &amp; KINEMATICS</span>
                </span>
                <span className="telemetry-badge-count">{telemetry.familyCount} Movement Families</span>
              </div>

              {/* Interactive Modality Split Cards (Bronze = Equipment, Teal = Bodyweight) */}
              <div className="telemetry-kpi-row">
                <button
                  type="button"
                  className={`telemetry-kpi-card gear ${selectedEquipment === 'Equipment Needed' ? 'is-active' : ''}`}
                  onClick={() => toggleEquipFilter('Equipment Needed')}
                  title="Filter by movements requiring equipment"
                >
                  <div className="kpi-card-top">
                    <span className="kpi-big-num">{telemetry.gearCount}</span>
                    <span className="kpi-tag gear">{telemetry.gearPercent}%</span>
                  </div>
                  <span className="kpi-label">Equipment Loaded</span>
                  <span className="kpi-desc">Free weights, bars, bands &amp; benches</span>
                </button>

                <button
                  type="button"
                  className={`telemetry-kpi-card bodyweight ${selectedEquipment === 'Bodyweight Only' ? 'is-active' : ''}`}
                  onClick={() => toggleEquipFilter('Bodyweight Only')}
                  title="Filter by zero-gear bodyweight movements"
                >
                  <div className="kpi-card-top">
                    <span className="kpi-big-num">{telemetry.bwCount}</span>
                    <span className="kpi-tag bodyweight">{telemetry.bwPercent}%</span>
                  </div>
                  <span className="kpi-label">Bodyweight Only</span>
                  <span className="kpi-desc">Zero gear · Calisthenics &amp; floor</span>
                </button>
              </div>

              {/* Clean Dual-Tone Proportion Bar */}
              <div className="telemetry-segmented-bar" aria-hidden="true">
                <div
                  className="segment-fill gear"
                  style={{ width: `${telemetry.gearPercent}%` }}
                />
                <div
                  className="segment-fill bodyweight"
                  style={{ width: `${telemetry.bwPercent}%` }}
                />
              </div>

              {/* Equipment Breakdown (Consistent Single-Tone Bars, Clickable Filter Tiles) */}
              <div className="telemetry-sub-header-row">
                <span className="telemetry-sub-kicker">
                  EQUIPMENT BREAKDOWN
                </span>
                <span className="telemetry-sub-meta">Select to filter</span>
              </div>

              <div className="telemetry-gear-stat-grid">
                {telemetry.gearList.map((item) => {
                  const isActive = selectedEquipment === item.filterLabel;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      className={`gear-stat-tile is-${item.tone} ${isActive ? 'is-active' : ''}`}
                      onClick={() => toggleEquipFilter(item.filterLabel)}
                      title={`Filter by ${item.label} (${item.count} movements)`}
                    >
                      <div className="gear-stat-top">
                        <span className="gear-stat-name">{item.label}</span>
                        <span className="gear-stat-count">{item.count}</span>
                      </div>
                      <div className="gear-stat-track" aria-hidden="true">
                        <div
                          className={`gear-stat-fill is-${item.tone}`}
                          style={{ width: `${Math.min(100, Math.max(10, item.percent * 2.8))}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="telemetry-section-divider" />

              {/* Movement Mechanics (Clean 5-Column Strip, Zero Truncation) */}
              <div className="telemetry-sub-header-row">
                <span className="telemetry-sub-kicker">
                  BIOMECHANICAL CLASSIFICATION
                </span>
                <span className="telemetry-sub-meta">5 Lift Profiles</span>
              </div>

              <div className="telemetry-mech-stat-grid">
                {[
                  { key: 'Compound', desc: 'Multi-joint' },
                  { key: 'Isolation', desc: 'Single-joint' },
                  { key: 'Isometric', desc: 'Static hold' },
                  { key: 'Mobility', desc: 'Joint range' },
                  { key: 'Plyometric', desc: 'Explosive' },
                ].map((m) => {
                  const count = telemetry.mechanics[m.key] || 0;
                  const pct = telemetry.total > 0 ? Math.round((count / telemetry.total) * 100) : 0;
                  const isActive = selectedMechanic === m.key;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      className={`mech-stat-tile ${isActive ? 'is-active' : ''}`}
                      onClick={() => toggleMechanicFilter(m.key)}
                      title={`Filter by ${m.key} movements (${count})`}
                    >
                      <span className="mech-stat-name">{m.key}</span>
                      <div className="mech-stat-val-row">
                        <span className="mech-stat-num">{count}</span>
                        <span className="mech-stat-pct">{pct}%</span>
                      </div>
                      <span className="mech-stat-desc">{m.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Experience Level Footer Row */}
              <div className="telemetry-level-bar-wrap">
                <span className="level-bar-label">EXPERIENCE TIER</span>
                <div className="level-stat-tags">
                  {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`level-stat-tag ${selectedLevel === lvl ? 'is-active' : ''}`}
                      onClick={() => toggleLevelFilter(lvl)}
                    >
                      <span className={`level-pip ${lvl.toLowerCase()}`} />
                      <span>{lvl}</span>
                      <b>{telemetry.levels[lvl]}</b>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Anatomical Architecture (3 Coherent Regional Columns: Lower, Upper, Core) */}
            <div className="db-telemetry-card anatomy-card">
              <div className="telemetry-card-header">
                <span className="telemetry-card-title">
                  <span className="telemetry-step-index is-teal">02</span>
                  <span>ANATOMICAL ARCHITECTURE</span>
                </span>
                <span className="telemetry-badge-count">{telemetry.distinctMusclesCount} Target Muscles</span>
              </div>

              {/* 3 Macro Regional KPI Cards (Directly Aligned Above Their Muscle Columns) */}
              <div className="telemetry-region-kpi-row">
                <button
                  type="button"
                  className={`telemetry-region-kpi-card lower ${selectedMuscle === 'region:lower' ? 'is-active' : ''}`}
                  onClick={() => toggleMuscleFilter('region:lower')}
                  title="Filter all Lower Body movements"
                >
                  <div className="region-kpi-top">
                    <span className="region-kpi-num">{telemetry.regions.lower.count}</span>
                    <span className="region-kpi-pct lower">{telemetry.regions.lower.percent}%</span>
                  </div>
                  <span className="region-kpi-title">Lower Body</span>
                  <span className="region-kpi-sub">Posterior &amp; Anterior Chain</span>
                </button>

                <button
                  type="button"
                  className={`telemetry-region-kpi-card upper ${selectedMuscle === 'region:upper' ? 'is-active' : ''}`}
                  onClick={() => toggleMuscleFilter('region:upper')}
                  title="Filter all Upper Body movements"
                >
                  <div className="region-kpi-top">
                    <span className="region-kpi-num">{telemetry.regions.upper.count}</span>
                    <span className="region-kpi-pct upper">{telemetry.regions.upper.percent}%</span>
                  </div>
                  <span className="region-kpi-title">Upper Body</span>
                  <span className="region-kpi-sub">Torso Push, Pull &amp; Arms</span>
                </button>

                <button
                  type="button"
                  className={`telemetry-region-kpi-card core ${selectedMuscle === 'region:core' ? 'is-active' : ''}`}
                  onClick={() => toggleMuscleFilter('region:core')}
                  title="Filter all Core & Spine movements"
                >
                  <div className="region-kpi-top">
                    <span className="region-kpi-num">{telemetry.regions.core.count}</span>
                    <span className="region-kpi-pct core">{telemetry.regions.core.percent}%</span>
                  </div>
                  <span className="region-kpi-title">Core &amp; Spine</span>
                  <span className="region-kpi-sub">Anti-Rotation &amp; Trunk</span>
                </button>
              </div>

              {/* 3-Segment Regional Proportion Bar */}
              <div className="telemetry-region-bar" aria-hidden="true">
                <div
                  className="region-bar-seg seg-lower"
                  style={{ width: `${telemetry.regions.lower.percent}%` }}
                />
                <div
                  className="region-bar-seg seg-upper"
                  style={{ width: `${telemetry.regions.upper.percent}%` }}
                />
                <div
                  className="region-bar-seg seg-core"
                  style={{ width: `${telemetry.regions.core.percent}%` }}
                />
              </div>

              {/* Regional Muscle Breakdown (Balanced 2-Column × 6-Row Matrix Grouped by Semantic Region) */}
              <div className="telemetry-sub-header-row">
                <span className="telemetry-sub-kicker">
                  PRIMARY TARGET MUSCLES BY REGION
                </span>
                <span className="telemetry-sub-meta">{telemetry.regionalGroupsCount} Regional Groups · {telemetry.total} Movements</span>
              </div>

              <div className="telemetry-regional-columns">
                {/* Column 1 (6 Rows): Lower Body (4 Bronze) + Core & Spine (2 Slate) */}
                <div className="regional-muscle-col">
                  {[...telemetry.lowerMuscles, ...telemetry.coreMuscles].map((m) => {
                    const isActive = selectedMuscle === m.key;
                    const fillPct = Math.min(100, Math.round((m.count / 24) * 100));
                    return (
                      <button
                        key={m.key}
                        type="button"
                        className={`muscle-region-row is-${m.region} ${isActive ? 'is-active' : ''}`}
                        onClick={() => toggleMuscleFilter(m.key)}
                        title={`Filter by ${m.label} (${m.count} movements · ${m.percent}%)`}
                      >
                        <div className="muscle-row-main">
                          <span className="muscle-stat-name-wrap">
                            <span className={`muscle-region-dot is-${m.region}`} aria-hidden="true" />
                            <span className="muscle-stat-name">{m.label}</span>
                          </span>
                          <span className="muscle-stat-metrics">
                            <span className="muscle-stat-count">{m.count}</span>
                            <span className="muscle-stat-pct">{m.percent}%</span>
                          </span>
                        </div>
                        <div className="muscle-row-bar-track" aria-hidden="true">
                          <div className={`muscle-row-bar-fill is-${m.region}`} style={{ width: `${fillPct}%` }} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Column 2 (6 Rows): Upper Body (6 Teal) */}
                <div className="regional-muscle-col">
                  {telemetry.upperMuscles.map((m) => {
                    const isActive = selectedMuscle === m.key;
                    const fillPct = Math.min(100, Math.round((m.count / 24) * 100));
                    return (
                      <button
                        key={m.key}
                        type="button"
                        className={`muscle-region-row is-${m.region} ${isActive ? 'is-active' : ''}`}
                        onClick={() => toggleMuscleFilter(m.key)}
                        title={`Filter by ${m.label} (${m.count} movements · ${m.percent}%)`}
                      >
                        <div className="muscle-row-main">
                          <span className="muscle-stat-name-wrap">
                            <span className={`muscle-region-dot is-${m.region}`} aria-hidden="true" />
                            <span className="muscle-stat-name">{m.label}</span>
                          </span>
                          <span className="muscle-stat-metrics">
                            <span className="muscle-stat-count">{m.count}</span>
                            <span className="muscle-stat-pct">{m.percent}%</span>
                          </span>
                        </div>
                        <div className="muscle-row-bar-track" aria-hidden="true">
                          <div className={`muscle-row-bar-fill is-${m.region}`} style={{ width: `${fillPct}%` }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Matching Kinetic Profile Footer Row */}
              <div className="telemetry-level-bar-wrap">
                <span className="level-bar-label">KINETIC PROFILE</span>
                <div className="level-stat-tags">
                  <span className="level-stat-tag is-static">
                    <span className="level-pip neutral" /> Bilateral <b>{telemetry.bilateralCount}</b>
                  </span>
                  <span className="level-stat-tag is-static">
                    <span className="level-pip neutral" /> Unilateral <b>{telemetry.unilateralCount}</b>
                  </span>
                  <span className="level-stat-tag is-static">
                    <span className="level-pip neutral" /> Closed-Chain <b>{telemetry.closedChainCount}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sleek Modern Filter & Search Cockpit */}
          <div className="db-cockpit-shell">
            <div className="db-cockpit-primary-row">
              <div className="db-search-input-wrap">
                <Search size={16} className="db-search-icon" />
                <input
                  id="exercise-db-search"
                  name="exercise-db-search"
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

            {/* Anatomy Muscle Fast-Pills (Semantic Region Color-Coded) */}
            <div className="db-rail-row">
              <span className="db-rail-label">ANATOMY</span>
              <div className="db-rail-scroll">
                {MUSCLE_CATEGORIES.map((cat) => {
                  const regionTone = getMuscleRegionTone(cat.key);
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      className={`db-pill-btn region-${regionTone} ${selectedMuscle === cat.key ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(cat.key)}
                    >
                      {regionTone !== 'all' && (
                        <span className={`pill-region-dot is-${regionTone}`} aria-hidden="true" />
                      )}
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
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
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveExerciseDetail(ex)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveExerciseDetail(ex);
                      }
                    }}
                    aria-label={`Open exercise guide for ${ex.name}`}
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
                        <span className={`db-muscle-badge region-${getMuscleRegionTone(ex.muscleKey)}`}>
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
                        <div className="db-pattern-kicker" title={ex.familyName ? `${ex.pattern} · ${ex.familyName}` : ex.pattern}>
                          {ex.pattern}{ex.variationType && ex.variationType !== 'Base' ? ` · ${ex.variationType}` : ''}
                        </div>
                      )}

                      <h3 className="db-exercise-title" title={ex.name}>{ex.name}</h3>
                      <p className="db-exercise-subtitle" title={ex.variationLabel || ex.subtitle || ex.scientificName}>
                        {ex.variationLabel || ex.subtitle || ex.scientificName || 'Movement profile'}
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
          allExercises={exercisesList}
          onSelectExercise={setActiveExerciseDetail}
          onClose={() => setActiveExerciseDetail(null)}
        />
      )}
    </div>
  );
}

export default ExerciseDatabaseView;
