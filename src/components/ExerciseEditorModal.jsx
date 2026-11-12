import React, { useEffect, useState } from 'react';
import {
  X,
  Check,
  Activity,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Upload,
  FileJson,
  Sparkles,
  Trash2,
  Video,
  Dumbbell,
  UserCheck,
  Sliders,
  Plus,
  ChevronDown,
  AlertTriangle,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { MUSCLE_LABELS } from '../data/muscleLabels';
import {
  MOVEMENT_PATTERNS,
  EQUIPMENT_TYPES,
  EXERCISE_MECHANICS,
  EXERCISE_LEVELS
} from '../data/exerciseConstants';
import { MediaViewer } from './MediaViewer';
import { MiniBodyMap } from './MiniBodyMap';
import { parseSingleExerciseJson, isBodyweightEquipment, isAnimatedGifUrl } from '../utils/exerciseImport';
import { compressUploadedImageFile } from '../utils/imageResize';
import { isRestTimerEnabledForExercise } from '../utils/workoutSets';

const QUICK_EQUIPMENT_PRESETS = [
  'Dumbbells',
  'Barbell',
  'Kettlebell',
  'Flat Bench',
  'Loop Resistance Band',
  'Step / Box',
  'Pull-Up Bar',
  'Cable Machine'
];

function isBuiltInAssetPath(url) {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('/src/assets/') || url.startsWith('/assets/') || url.startsWith('data:image/');
}

function buildInitialState(exercise) {
  const equipmentText = exercise ? (exercise.equipment || 'Bodyweight') : 'Dumbbells';
  const inferredReq = typeof exercise?.requiresEquipment === 'boolean'
    ? exercise.requiresEquipment
    : !isBodyweightEquipment(equipmentText);

  return {
    id: exercise ? exercise.id : null,
    name: exercise ? exercise.name : '',
    scientificName: exercise ? (exercise.scientificName || exercise.subtitle || '') : '',
    subtitle: exercise ? (exercise.subtitle || exercise.scientificName || '') : '',
    pattern: exercise ? (exercise.pattern || MOVEMENT_PATTERNS.SQUAT) : MOVEMENT_PATTERNS.SQUAT,
    requiresEquipment: inferredReq,
    equipment: inferredReq ? equipmentText : 'Bodyweight',
    mechanics: exercise ? (exercise.mechanics || (exercise.isWarmup ? 'Mobility' : 'Compound')) : 'Compound',
    level: exercise ? (exercise.level || 'Intermediate') : 'Intermediate',
    muscleKey: exercise ? (exercise.muscleKey || 'quads') : 'quads',
    defaultSets: exercise ? (exercise.defaultSets || 3) : 3,
    defaultDropSets: exercise ? (parseInt(exercise.defaultDropSets, 10) || 0) : 0,
    defaultReps: exercise ? (exercise.defaultReps || '8 - 12') : '8 - 12',
    timerEnabled: exercise ? isRestTimerEnabledForExercise(exercise) : true,
    defaultRestSeconds: exercise && Number(exercise.defaultRestSeconds) > 0 ? Number(exercise.defaultRestSeconds) : 90,
    rpe: exercise ? (exercise.rpe || '8') : '8',
    lastRecord: exercise ? (exercise.lastRecord || '') : '',
    illustration: exercise?.illustration || '',
    illustrationEnd: exercise?.illustrationEnd || '',
    customVideoUrl: exercise?.customVideoUrl || '',
    isWarmup: Boolean(exercise?.isWarmup),
    targetMuscles: {
      primary: exercise?.targetMuscles?.primary ? [...exercise.targetMuscles.primary] : [],
      secondary: exercise?.targetMuscles?.secondary ? [...exercise.targetMuscles.secondary] : [],
      stabilizers: exercise?.targetMuscles?.stabilizers ? [...exercise.targetMuscles.stabilizers] : []
    },
    execution: {
      setup: exercise?.execution?.setup || '',
      eccentric: exercise?.execution?.eccentric || '',
      concentric: exercise?.execution?.concentric || '',
      breathing: exercise?.execution?.breathing || '',
      commonMistakes: Array.isArray(exercise?.execution?.commonMistakes)
        ? [...exercise.execution.commonMistakes]
        : [],
      proTip: exercise?.execution?.proTip || ''
    }
  };
}

function MuscleTokenField({ label, hint, items = [], tone = 'primary', placeholder, onChange }) {
  const [draft, setDraft] = useState('');

  const addDraftItems = () => {
    const tokens = draft
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    if (tokens.length === 0) return;
    const next = [...items];
    tokens.forEach(tok => {
      if (!next.some(existing => existing.toLowerCase() === tok.toLowerCase())) {
        next.push(tok);
      }
    });
    onChange(next);
    setDraft('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addDraftItems();
    } else if (e.key === 'Backspace' && !draft && items.length > 0) {
      onChange(items.slice(0, -1));
    }
  };

  const removeItem = (idx) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="form-field full-width">
      <label>{label}</label>
      <div className="token-input-shell">
        {items.length > 0 && (
          <div className="token-pills-list">
            {items.map((item, idx) => (
              <span key={`${item}-${idx}`} className={`editor-muscle-chip ${tone}`}>
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  aria-label={`Remove ${item}`}
                  title={`Remove ${item}`}
                >
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="token-entry-row">
          <input
            type="text"
            value={draft}
            placeholder={placeholder}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addDraftItems}
            className="token-text-input"
          />
          {draft.trim() && (
            <button
              type="button"
              className="token-add-btn"
              onClick={addDraftItems}
            >
              <Plus size={13} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
      {hint && <span className="field-hint">{hint}</span>}
    </div>
  );
}

export function ExerciseEditorModal({
  exercise,
  onSave,
  onClose,
  initialTab = 'general',
  showSaveToDatabaseToggle = false
}) {
  const normalizedInitial = ['general', 'media', 'anatomy', 'biomechanics', 'presets'].includes(initialTab)
    ? initialTab
    : initialTab === 'specs'
      ? 'presets'
      : 'general';

  const [activeTab, setActiveTab] = useState(normalizedInitial);
  const [formData, setFormData] = useState(() => buildInitialState(exercise));
  const [saveToDatabase, setSaveToDatabase] = useState(true);
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importFeedback, setImportFeedback] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [newMistakeDraft, setNewMistakeDraft] = useState('');
  const [mediaUrlInput, setMediaUrlInput] = useState(() => {
    const illu = exercise?.illustration || '';
    return illu && !isBuiltInAssetPath(illu) ? illu : '';
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (field, val) => {
    if (field === 'name' && val.trim()) setFormError(null);
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleToggleEquipment = (requiresGear) => {
    setFormData(prev => ({
      ...prev,
      requiresEquipment: requiresGear,
      equipment: requiresGear
        ? (isBodyweightEquipment(prev.equipment) ? 'Dumbbells' : prev.equipment)
        : 'Bodyweight'
    }));
  };

  const handleMusclesChange = (groupKey, nextList) => {
    setFormData(prev => ({
      ...prev,
      targetMuscles: {
        ...prev.targetMuscles,
        [groupKey]: nextList
      }
    }));
  };

  const handleExecutionChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      execution: { ...prev.execution, [field]: val }
    }));
  };

  const handleAddMistake = () => {
    const trimmed = newMistakeDraft.trim();
    if (!trimmed) return;
    handleExecutionChange('commonMistakes', [...formData.execution.commonMistakes, trimmed]);
    setNewMistakeDraft('');
  };

  const handleUpdateMistake = (idx, nextText) => {
    const next = [...formData.execution.commonMistakes];
    next[idx] = nextText;
    handleExecutionChange('commonMistakes', next);
  };

  const handleRemoveMistake = (idx) => {
    handleExecutionChange(
      'commonMistakes',
      formData.execution.commonMistakes.filter((_, i) => i !== idx)
    );
  };

  const applyImportedJson = (rawText) => {
    try {
      const normalized = parseSingleExerciseJson(rawText);
      const nextState = buildInitialState({
        ...normalized,
        id: formData.id || normalized.id
      });
      setFormData(nextState);
      setMediaUrlInput(nextState.illustration && !isBuiltInAssetPath(nextState.illustration) ? nextState.illustration : '');
      setImportFeedback({ type: 'success', message: `Imported "${normalized.name}". Review sections and save.` });
      setShowJsonImport(false);
    } catch (err) {
      setImportFeedback({ type: 'error', message: err.message || 'Invalid JSON payload.' });
    }
  };

  const handleJsonFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      setJsonInput(text);
      applyImportedJson(text);
    };
    reader.onerror = () => {
      setImportFeedback({ type: 'error', message: 'Could not read the selected file.' });
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const compactDataUrl = await compressUploadedImageFile(file);
      handleChange('illustration', compactDataUrl);
      setMediaUrlInput('');
      setFormError(null);
    } catch (err) {
      setFormError(err?.message || 'Could not process the selected image.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setActiveTab('general');
      setFormError('Please enter an exercise name before saving.');
      return;
    }
    setFormError(null);

    const finalEquipment = formData.requiresEquipment
      ? (formData.equipment.trim() || 'Equipment')
      : 'Bodyweight';

    const pendingMistake = newMistakeDraft.trim();
    const cleanedMistakes = [
      ...formData.execution.commonMistakes,
      ...(pendingMistake ? [pendingMistake] : [])
    ]
      .map(s => s.trim())
      .filter(Boolean);

    const finalExercise = {
      ...exercise,
      id: formData.id || `ex-${Date.now()}`,
      name: formData.name.trim(),
      scientificName: formData.scientificName.trim() || formData.subtitle.trim() || formData.name.trim(),
      subtitle: formData.subtitle.trim() || formData.scientificName.trim(),
      pattern: formData.pattern,
      requiresEquipment: formData.requiresEquipment,
      equipment: finalEquipment,
      mechanics: formData.mechanics,
      level: formData.level,
      muscleKey: formData.muscleKey,
      defaultSets: parseInt(formData.defaultSets, 10) || 3,
      defaultDropSets: Math.max(0, Math.min(5, parseInt(formData.defaultDropSets, 10) || 0)),
      defaultReps: String(formData.defaultReps || '8 - 12').trim(),
      timerEnabled: Boolean(formData.timerEnabled),
      defaultRestSeconds: formData.timerEnabled
        ? Math.max(5, parseInt(formData.defaultRestSeconds, 10) || 90)
        : 0,
      rpe: String(formData.rpe || '8').trim(),
      lastRecord: formData.lastRecord.trim(),
      illustration: formData.illustration.trim(),
      illustrationEnd: formData.illustrationEnd.trim(),
      customVideoUrl: formData.customVideoUrl.trim(),
      isWarmup: formData.isWarmup,
      targetMuscles: {
        primary: formData.targetMuscles.primary,
        secondary: formData.targetMuscles.secondary,
        stabilizers: formData.targetMuscles.stabilizers
      },
      execution: {
        setup: formData.execution.setup.trim(),
        eccentric: formData.execution.eccentric.trim(),
        concentric: formData.execution.concentric.trim(),
        breathing: formData.execution.breathing.trim(),
        commonMistakes: cleanedMistakes,
        proTip: formData.execution.proTip.trim()
      }
    };

    onSave(finalExercise, { saveToDatabase });
  };

  const patternOptions = Array.from(
    new Set([...Object.values(MOVEMENT_PATTERNS), formData.pattern].filter(Boolean))
  );

  const navSections = [
    {
      id: 'general',
      label: 'Identity & Gear',
      icon: FileText,
      complete: Boolean(formData.name.trim())
    },
    {
      id: 'media',
      label: 'Image & GIF',
      icon: ImageIcon,
      complete: Boolean(formData.illustration || formData.customVideoUrl)
    },
    {
      id: 'anatomy',
      label: 'Muscles & Anatomy',
      icon: Activity,
      complete: formData.targetMuscles.primary.length > 0
    },
    {
      id: 'biomechanics',
      label: 'Form & Coaching',
      icon: BookOpen,
      complete: Boolean(formData.execution.setup || formData.execution.concentric)
    },
    {
      id: 'presets',
      label: 'Sets, Drops & Timer',
      icon: Sliders,
      complete: Boolean(formData.defaultSets && formData.defaultReps)
    }
  ];

  const isBuiltinIllustration = formData.illustration.startsWith('/src/assets/') || formData.illustration.startsWith('/assets/');
  const isDataUrlIllustration = formData.illustration.startsWith('data:image/');
  const activeSection = navSections.find((sec) => sec.id === activeTab) || navSections[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="exercise-editor-dialog studio-editor-shell" onClick={(e) => e.stopPropagation()}>
        {/* Top Modal Header */}
        <div className="editor-header">
          <div className="editor-header-title">
            <button
              type="button"
              className={`editor-sidebar-toggle-btn ${!isSidebarOpen ? 'is-collapsed' : ''}`}
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              aria-expanded={isSidebarOpen}
              aria-label={isSidebarOpen ? 'Hide navigation sidebar' : 'Show navigation sidebar'}
              title={isSidebarOpen ? 'Hide left sidebar for full view' : 'Show left sidebar'}
            >
              {isSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
            </button>
            <BookOpen size={18} color="var(--clay)" />
            <div>
              <h3>{exercise ? 'EDIT EXERCISE' : 'NEW EXERCISE'}</h3>
              <span className="editor-active-ex-name">
                {formData.name.trim() || 'Untitled exercise profile'}
                {!isSidebarOpen && activeSection ? ` · ${activeSection.label}` : ''}
              </span>
            </div>
          </div>

          <div className="editor-header-actions">
            <button
              type="button"
              className={`btn-json-import-toggle ${showJsonImport ? 'active' : ''}`}
              onClick={() => {
                setShowJsonImport(prev => !prev);
                setImportFeedback(null);
              }}
              title="Import single exercise from JSON"
            >
              <FileJson size={14} />
              <span>Import JSON</span>
            </button>
            <button type="button" className="close-editor-btn" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Single-Exercise JSON Importer Drawer */}
        {showJsonImport && (
          <div className="json-import-drawer">
            <div className="json-import-top">
              <div>
                <strong>Import exercise from JSON</strong>
                <p>Paste an exercise JSON object or upload a <code>.json</code> file.</p>
              </div>
              <label className="btn-json-file-upload">
                <Upload size={14} />
                <span>Upload .json</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleJsonFileUpload}
                  hidden
                />
              </label>
            </div>
            <textarea
              rows="3"
              className="json-import-textarea"
              placeholder='{"name": "Incline Dumbbell Press", "muscleKey": "chest", "equipment": "Dumbbells + Bench", ...}'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <div className="json-import-actions">
              <button
                type="button"
                className="btn-gymmane-secondary"
                onClick={() => setShowJsonImport(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-gymmane-primary"
                onClick={() => applyImportedJson(jsonInput)}
              >
                <Check size={14} />
                <span>Load Fields</span>
              </button>
            </div>
          </div>
        )}

        {importFeedback && (
          <div className={`json-import-feedback ${importFeedback.type}`}>
            {importFeedback.message}
          </div>
        )}

        {/* Structured Flex Form: Studio Body (Sidebar + Scrollable Workspace) + Clean Non-Overlapping Footer */}
        <form onSubmit={handleSubmit} className="editor-studio-form">
          <div className={`editor-studio-body ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
            {/* LEFT RAIL: Live Card Preview + Sidebar Section Links */}
            {isSidebarOpen && (
              <aside className="editor-sidebar-rail">
                {/* Compact Live Identity Preview */}
                <div className="editor-sidebar-preview">
                  <div className="sidebar-preview-thumb">
                    {formData.illustration ? (
                      <img src={formData.illustration} alt="" />
                    ) : (
                      <Dumbbell size={16} color="var(--dim)" />
                    )}
                  </div>
                  <div className="sidebar-preview-copy">
                    <strong>{formData.name.trim() || 'Untitled Exercise'}</strong>
                    <div className="sidebar-preview-tags">
                      <span>{MUSCLE_LABELS[formData.muscleKey] || formData.muscleKey}</span>
                      <span>·</span>
                      <span>{formData.requiresEquipment ? formData.equipment || 'Gear' : 'Bodyweight'}</span>
                    </div>
                  </div>
                </div>

                <nav className="editor-sidebar-nav" aria-label="Exercise editor sections">
                  {navSections.map((sec) => {
                    const Icon = sec.icon;
                    const isActive = activeTab === sec.id;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        className={`editor-nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveTab(sec.id)}
                      >
                        <Icon size={15} className="nav-item-icon" />
                        <span className="nav-item-label">{sec.label}</span>
                        <span
                          className={`nav-item-dot ${sec.complete ? 'done' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </nav>
              </aside>
            )}

            {/* RIGHT MAIN WORKSPACE */}
            <div className="editor-main-scroll">
              {/* SECTION 1: IDENTITY & EQUIPMENT */}
              {activeTab === 'general' && (
                <div className="editor-section-pane animate-fade">
                  <div className="editor-pane-heading">
                    <h4>Identity & Equipment</h4>
                    <p>Core details displayed on library cards and workout pickers.</p>
                  </div>

                  <div className="form-group-grid">
                    <div className="form-field full-width">
                      <label htmlFor="ed-ex-name">Exercise Name *</label>
                      <input
                        id="ed-ex-name"
                        type="text"
                        required
                        placeholder="e.g. Bulgarian Split Squat"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-ex-sub">Short Summary</label>
                      <input
                        id="ed-ex-sub"
                        type="text"
                        placeholder="e.g. Rear-foot elevated unilateral squat"
                        value={formData.subtitle}
                        onChange={(e) => handleChange('subtitle', e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-ex-sci">Technical Descriptor</label>
                      <input
                        id="ed-ex-sci"
                        type="text"
                        placeholder="Optional biomechanical description"
                        value={formData.scientificName}
                        onChange={(e) => handleChange('scientificName', e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-ex-muscle">Primary Muscle Group</label>
                      <select
                        id="ed-ex-muscle"
                        value={formData.muscleKey}
                        onChange={(e) => handleChange('muscleKey', e.target.value)}
                      >
                        {Object.entries(MUSCLE_LABELS).map(([k, label]) => (
                          <option key={k} value={k}>{label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-ex-pattern">Movement Pattern</label>
                      <select
                        id="ed-ex-pattern"
                        value={formData.pattern}
                        onChange={(e) => handleChange('pattern', e.target.value)}
                      >
                        {patternOptions.map((p, i) => (
                          <option key={i} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-ex-mech">Mechanics</label>
                      <select
                        id="ed-ex-mech"
                        value={formData.mechanics}
                        onChange={(e) => handleChange('mechanics', e.target.value)}
                      >
                        {EXERCISE_MECHANICS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-ex-level">Difficulty Level</label>
                      <select
                        id="ed-ex-level"
                        value={formData.level}
                        onChange={(e) => handleChange('level', e.target.value)}
                      >
                        {EXERCISE_LEVELS.map((lvl) => (
                          <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                      </select>
                    </div>

                    {/* Bodyweight vs Equipment */}
                    <div className="form-field full-width">
                      <label>Equipment Requirement</label>
                      <div className="editor-equip-toggle-row">
                        <button
                          type="button"
                          className={`equip-mode-pill ${!formData.requiresEquipment ? 'active' : ''}`}
                          onClick={() => handleToggleEquipment(false)}
                        >
                          <UserCheck size={14} />
                          <span>Bodyweight (No Gear)</span>
                        </button>
                        <button
                          type="button"
                          className={`equip-mode-pill ${formData.requiresEquipment ? 'active' : ''}`}
                          onClick={() => handleToggleEquipment(true)}
                        >
                          <Dumbbell size={14} />
                          <span>Uses Equipment</span>
                        </button>
                      </div>
                    </div>

                    {formData.requiresEquipment && (
                      <div className="form-field full-width">
                        <label htmlFor="ed-ex-gear">Apparatus Name</label>
                        <input
                          id="ed-ex-gear"
                          type="text"
                          list="equipment-suggestions"
                          placeholder="e.g. Dumbbells + Flat Bench"
                          value={formData.equipment}
                          onChange={(e) => handleChange('equipment', e.target.value)}
                        />
                        <datalist id="equipment-suggestions">
                          {Object.values(EQUIPMENT_TYPES).map((eq) => (
                            <option key={eq} value={eq} />
                          ))}
                        </datalist>
                        <div className="quick-gear-chips">
                          {QUICK_EQUIPMENT_PRESETS.map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              className={`quick-gear-chip ${formData.equipment.toLowerCase() === preset.toLowerCase() ? 'selected' : ''}`}
                              onClick={() => handleChange('equipment', preset)}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="form-field full-width">
                      <label className="editor-switch-card">
                        <div>
                          <strong>Warm-Up / Mobility Activation</strong>
                          <span>Tag this exercise for warm-up and prep blocks.</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.isWarmup}
                          onChange={(e) => handleChange('isWarmup', e.target.checked)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: MOVEMENT MEDIA */}
              {activeTab === 'media' && (
                <div className="editor-section-pane animate-fade">
                  <div className="editor-pane-heading">
                    <h4>Image & Animated GIF</h4>
                    <p>Upload a clean square illustration or animated GIF demonstrating the full range of motion.</p>
                  </div>

                  <div className="editor-media-layout">
                    {/* Left: Crisp 1:1 Square Live Preview */}
                    <div className="editor-media-preview-col">
                      <div className="editor-live-square-preview">
                        {formData.illustration ? (
                          <>
                            <img
                              src={formData.illustration}
                              alt={formData.name || 'Movement preview'}
                              className="editor-live-img"
                              onError={(e) => { e.target.style.opacity = '0.2'; }}
                              onLoad={(e) => { e.target.style.opacity = '1'; }}
                            />
                            {isAnimatedGifUrl(formData.illustration) && (
                              <span className="editor-live-badge">
                                <Sparkles size={11} />
                                Animated GIF
                              </span>
                            )}
                          </>
                        ) : (
                          <div className="editor-live-empty">
                            <ImageIcon size={26} color="var(--dim)" />
                            <span>No image or GIF selected</span>
                          </div>
                        )}
                      </div>

                      {formData.illustration && (
                        <button
                          type="button"
                          className="btn-clear-media-subtle"
                          onClick={() => {
                            handleChange('illustration', '');
                            setMediaUrlInput('');
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Remove Current Visual</span>
                        </button>
                      )}
                    </div>

                    {/* Right: Upload & URL Controls */}
                    <div className="editor-media-controls-col">
                      {(isBuiltinIllustration || isDataUrlIllustration) && (
                        <div className="media-active-source-pill">
                          <Check size={14} color="var(--sage)" />
                          <span>
                            {isBuiltinIllustration
                              ? 'Studio Illustration active'
                              : isAnimatedGifUrl(formData.illustration)
                                ? 'Uploaded Animated GIF active'
                                : 'Uploaded Custom Image active'}
                          </span>
                        </div>
                      )}

                      <div className="form-field">
                        <label>Upload Image or Animated GIF</label>
                        <label className="editor-upload-dropzone">
                          <Upload size={16} color="var(--clay)" />
                          <div>
                            <strong>Choose a PNG, JPG, WEBP, or GIF</strong>
                            <span>1:1 square assets fit edge-to-edge without borders</span>
                          </div>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            onChange={handleImageFileUpload}
                            hidden
                          />
                        </label>
                      </div>

                      <div className="form-field">
                        <label htmlFor="ed-media-url">Or Paste Direct Image / GIF URL</label>
                        <input
                          id="ed-media-url"
                          type="text"
                          placeholder="https://example.com/exercise-movement.gif"
                          value={mediaUrlInput}
                          onChange={(e) => {
                            const val = e.target.value;
                            setMediaUrlInput(val);
                            if (val.trim()) {
                              handleChange('illustration', val);
                            }
                          }}
                        />
                      </div>

                      <details className="editor-video-collapse" open={Boolean(formData.customVideoUrl)}>
                        <summary className="editor-defaults-summary">
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <Video size={14} />
                            Optional Video Tutorial (YouTube or MP4)
                          </span>
                          <ChevronDown size={15} />
                        </summary>
                        <div className="form-field" style={{ marginTop: 10 }}>
                          <input
                            type="text"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={formData.customVideoUrl}
                            onChange={(e) => handleChange('customVideoUrl', e.target.value)}
                          />
                          {formData.customVideoUrl && (
                            <div className="preview-video-wrap" style={{ marginTop: 10 }}>
                              <MediaViewer
                                src={formData.customVideoUrl}
                                alt={formData.name || 'Tutorial video'}
                                autoPlay={false}
                              />
                            </div>
                          )}
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: MUSCLES & ANATOMY */}
              {activeTab === 'anatomy' && (
                <div className="editor-section-pane animate-fade">
                  <div className="editor-pane-heading">
                    <h4>Muscles & Anatomy</h4>
                    <p>Tag target muscles with interactive chips. Press Enter or comma to add a muscle.</p>
                  </div>

                  <div className="editor-anatomy-header-card">
                    <div className="editor-anatomy-bodymap-box">
                      <MiniBodyMap
                        primaryKeys={formData.muscleKey ? [formData.muscleKey] : []}
                        secondaryKeys={[]}
                        className="editor-mini-body"
                      />
                    </div>
                    <div className="editor-anatomy-focus-copy">
                      <span className="anatomy-group-kicker">MAP HIGHLIGHT</span>
                      <strong>{MUSCLE_LABELS[formData.muscleKey] || formData.muscleKey}</strong>
                      <p>Change Primary Muscle Group in Identity & Gear to update this anatomical map.</p>
                    </div>
                  </div>

                  <div className="form-group-grid">
                    <MuscleTokenField
                      label="Primary Movers"
                      tone="primary"
                      items={formData.targetMuscles.primary}
                      placeholder="Add primary muscle (e.g. Quadriceps) and press Enter..."
                      onChange={(next) => handleMusclesChange('primary', next)}
                    />

                    <MuscleTokenField
                      label="Secondary Synergists"
                      tone="secondary"
                      items={formData.targetMuscles.secondary}
                      placeholder="Add synergist muscle (e.g. Adductor Magnus)..."
                      onChange={(next) => handleMusclesChange('secondary', next)}
                    />

                    <MuscleTokenField
                      label="Stabilizers & Fixators"
                      tone="stabilizer"
                      items={formData.targetMuscles.stabilizers}
                      placeholder="Add stabilizer (e.g. Lumbo-Pelvic Core)..."
                      onChange={(next) => handleMusclesChange('stabilizers', next)}
                    />
                  </div>
                </div>
              )}

              {/* SECTION 4: FORM & COACHING */}
              {activeTab === 'biomechanics' && (
                <div className="editor-section-pane animate-fade">
                  <div className="editor-pane-heading">
                    <h4>Form & Coaching</h4>
                    <p>Clear execution cues and common mistakes surfaced inside the exercise guide and active workout player.</p>
                  </div>

                  <div className="form-group-grid">
                    <div className="form-field full-width">
                      <label htmlFor="ed-setup">01 · Setup & Stance</label>
                      <textarea
                        id="ed-setup"
                        rows="2"
                        placeholder="Foot stance, grip width, posture, and bracing..."
                        value={formData.execution.setup}
                        onChange={(e) => handleExecutionChange('setup', e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-ecc">02 · Lowering (Eccentric)</label>
                      <textarea
                        id="ed-ecc"
                        rows="3"
                        placeholder="Tempo, range of motion, control..."
                        value={formData.execution.eccentric}
                        onChange={(e) => handleExecutionChange('eccentric', e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-con">03 · Drive (Concentric)</label>
                      <textarea
                        id="ed-con"
                        rows="3"
                        placeholder="Drive direction, lockout, peak contraction..."
                        value={formData.execution.concentric}
                        onChange={(e) => handleExecutionChange('concentric', e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-breath">Breathing Cadence</label>
                      <input
                        id="ed-breath"
                        type="text"
                        placeholder="e.g. Inhale lowering, exhale on drive"
                        value={formData.execution.breathing}
                        onChange={(e) => handleExecutionChange('breathing', e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-tip">Coach Cue</label>
                      <input
                        id="ed-tip"
                        type="text"
                        placeholder="e.g. Keep front knee aligned over toes"
                        value={formData.execution.proTip}
                        onChange={(e) => handleExecutionChange('proTip', e.target.value)}
                      />
                    </div>

                    {/* Interactive Mistakes List Builder */}
                    <div className="form-field full-width">
                      <label>Common Mistakes to Avoid</label>
                      <div className="mistakes-builder-list">
                        {formData.execution.commonMistakes.map((mistake, idx) => (
                          <div key={idx} className="mistake-builder-row">
                            <AlertTriangle size={14} color="var(--danger)" className="mistake-row-icon" />
                            <input
                              type="text"
                              value={mistake}
                              onChange={(e) => handleUpdateMistake(idx, e.target.value)}
                              aria-label={`Mistake ${idx + 1}`}
                            />
                            <button
                              type="button"
                              className="mistake-delete-btn"
                              onClick={() => handleRemoveMistake(idx)}
                              title="Remove mistake"
                              aria-label="Remove mistake"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <div className="mistake-add-row">
                          <input
                            type="text"
                            placeholder="Add a common form error (e.g. Rounding lower back)..."
                            value={newMistakeDraft}
                            onChange={(e) => setNewMistakeDraft(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddMistake();
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="btn-add-mistake"
                            onClick={handleAddMistake}
                          >
                            <Plus size={14} />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 5: SETS, DROP SETS & TIMER */}
              {activeTab === 'presets' && (
                <div className="editor-section-pane animate-fade">
                  <div className="editor-pane-heading">
                    <h4>Sets, Drop Sets &amp; Rest Timer</h4>
                    <p>Configure planned working sets, post-set drop sets, and whether this movement needs a countdown timer.</p>
                  </div>

                  <div className="form-group-grid">
                    <div className="form-field">
                      <label htmlFor="ed-sets">Default Sets</label>
                      <input
                        id="ed-sets"
                        type="number"
                        min="1"
                        max="15"
                        value={formData.defaultSets}
                        onChange={(e) => handleChange('defaultSets', e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="ed-reps">Target Reps / Duration</label>
                      <input
                        id="ed-reps"
                        type="text"
                        placeholder="e.g. 8 - 10 or 30 sec"
                        value={formData.defaultReps}
                        onChange={(e) => handleChange('defaultReps', e.target.value)}
                      />
                    </div>

                    <div className="form-field full-width">
                      <label htmlFor="ed-dropsets">Planned Drop Sets (After Working Sets)</label>
                      <div className="editor-equip-toggle-row">
                        {[0, 1, 2, 3].map((cnt) => (
                          <button
                            key={cnt}
                            type="button"
                            className={`equip-mode-pill ${Number(formData.defaultDropSets) === cnt ? 'active' : ''}`}
                            onClick={() => handleChange('defaultDropSets', cnt)}
                          >
                            {cnt === 0 ? 'None' : `+${cnt} ${cnt === 1 ? 'Drop' : 'Drops'}`}
                          </button>
                        ))}
                        <input
                          id="ed-dropsets"
                          type="number"
                          min="0"
                          max="5"
                          className="drop-custom-input"
                          value={formData.defaultDropSets}
                          onChange={(e) => handleChange('defaultDropSets', e.target.value)}
                          aria-label="Custom drop sets count (0 to 5)"
                        />
                      </div>
                    </div>

                    <div className="form-field full-width">
                      <label>Rest Timer Requirement</label>
                      <div className="editor-equip-toggle-row">
                        <button
                          type="button"
                          className={`equip-mode-pill ${formData.timerEnabled ? 'active' : ''}`}
                          onClick={() => handleChange('timerEnabled', true)}
                        >
                          Needs Rest Timer ({Math.max(5, parseInt(formData.defaultRestSeconds, 10) || 90)}s)
                        </button>
                        <button
                          type="button"
                          className={`equip-mode-pill ${!formData.timerEnabled ? 'active' : ''}`}
                          onClick={() => handleChange('timerEnabled', false)}
                        >
                          No Timer Needed
                        </button>
                      </div>
                    </div>

                    {formData.timerEnabled && (
                      <div className="form-field">
                        <label htmlFor="ed-rest">Rest Timer (Seconds)</label>
                        <input
                          id="ed-rest"
                          type="number"
                          step="5"
                          min="5"
                          max="300"
                          value={formData.defaultRestSeconds}
                          onChange={(e) => handleChange('defaultRestSeconds', e.target.value)}
                        />
                      </div>
                    )}

                    <div className="form-field">
                      <label htmlFor="ed-rpe">Target RPE (1 - 10)</label>
                      <input
                        id="ed-rpe"
                        type="text"
                        placeholder="e.g. 8"
                        value={formData.rpe}
                        onChange={(e) => handleChange('rpe', e.target.value)}
                      />
                    </div>

                    <div className="form-field full-width">
                      <label htmlFor="ed-pr">Personal Reference / Load Note</label>
                      <input
                        id="ed-pr"
                        type="text"
                        placeholder="e.g. 24kg x 10 reps/leg"
                        value={formData.lastRecord}
                        onChange={(e) => handleChange('lastRecord', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Non-overlapping Fixed Modal Footer */}
          <div className="editor-footer-bar">
            {formError ? (
              <span className="editor-footer-error" role="alert">
                <AlertTriangle size={14} />
                <span>{formError}</span>
              </span>
            ) : showSaveToDatabaseToggle ? (
              <label className="save-to-db-checkbox">
                <input
                  type="checkbox"
                  checked={saveToDatabase}
                  onChange={(e) => setSaveToDatabase(e.target.checked)}
                />
                <span>Also save to Exercise Library</span>
              </label>
            ) : (
              <span className="editor-footer-hint">Changes apply immediately</span>
            )}

            <div className="editor-footer-buttons">
              <button type="button" className="btn-cancel-exercise" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-save-exercise">
                <Check size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
