import React, { useState } from 'react';
import { X, Check, Dumbbell, Link, FileText, Wind, AlertTriangle, Lightbulb } from 'lucide-react';
import { MUSCLE_LABELS } from './BodyMap';

export function ExerciseEditorModal({ exercise, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: exercise ? exercise.id : `ex-${Date.now()}`,
    name: exercise ? exercise.name : '',
    subtitle: exercise ? exercise.subtitle : '',
    equipment: exercise ? exercise.equipment : 'Manubri / Bilanciere',
    muscleKey: exercise ? exercise.muscleKey : 'chest',
    illustration: exercise ? exercise.illustration : '/ex/chest.webp',
    defaultSets: exercise ? exercise.defaultSets : 4,
    defaultReps: exercise ? exercise.defaultReps : '8 - 10',
    defaultRestSeconds: exercise ? exercise.defaultRestSeconds : 90,
    rpe: exercise ? exercise.rpe : '8',
    lastRecord: exercise ? exercise.lastRecord : '',
    execution: {
      setup: exercise?.execution?.setup || '',
      eccentric: exercise?.execution?.eccentric || '',
      concentric: exercise?.execution?.concentric || '',
      breathing: exercise?.execution?.breathing || '',
      commonMistakes: exercise?.execution?.commonMistakes || ['Perdita di assetto e compenso'],
      proTip: exercise?.execution?.proTip || ''
    }
  });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleExecutionChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      execution: { ...prev.execution, [field]: val }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="gymmane-editor-modal">
        <div className="editor-modal-header">
          <h3>{exercise ? 'MODIFICA ESERCIZIO' : 'AGGIUNGI ESERCIZIO'}</h3>
          <button type="button" className="close-editor-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="editor-form-scroll">
          <div className="form-group-grid">
            <div className="form-field full-width">
              <label>Nome Esercizio *</label>
              <input 
                type="text" 
                required
                placeholder="es. Panca Piana con Bilanciere"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Sottotitolo / Focus</label>
              <input 
                type="text" 
                placeholder="es. Spinta toracica e tricipiti"
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Attrezzatura</label>
              <input 
                type="text" 
                placeholder="es. Bilanciere + Panca"
                value={formData.equipment}
                onChange={(e) => handleChange('equipment', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Gruppo Muscolare Primario</label>
              <select 
                value={formData.muscleKey}
                onChange={(e) => {
                  const key = e.target.value;
                  handleChange('muscleKey', key);
                  // auto-assign default illustration if not customized
                  if (!formData.illustration || formData.illustration.startsWith('/ex/')) {
                    handleChange('illustration', `/ex/${key}.webp`);
                  }
                }}
              >
                {Object.entries(MUSCLE_LABELS).map(([k, label]) => (
                  <option key={k} value={k}>{label}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Link Media (Immagine, GIF, Video MP4 o YouTube)</label>
              <input 
                type="text" 
                placeholder="es. /ex/chest.webp o link YouTube"
                value={formData.illustration}
                onChange={(e) => handleChange('illustration', e.target.value)}
              />
            </div>

            <div className="form-field thirds">
              <label>Serie Target</label>
              <input 
                type="number" 
                min="1"
                max="20"
                value={formData.defaultSets}
                onChange={(e) => handleChange('defaultSets', parseInt(e.target.value) || 3)}
              />
            </div>

            <div className="form-field thirds">
              <label>Reps Target</label>
              <input 
                type="text" 
                placeholder="8 - 10"
                value={formData.defaultReps}
                onChange={(e) => handleChange('defaultReps', e.target.value)}
              />
            </div>

            <div className="form-field thirds">
              <label>Recupero (secondi)</label>
              <input 
                type="number" 
                min="15"
                step="15"
                value={formData.defaultRestSeconds}
                onChange={(e) => handleChange('defaultRestSeconds', parseInt(e.target.value) || 90)}
              />
            </div>
          </div>

          <div className="editor-section-separator">
            <span>ISTRUZIONI & FORMA CORRETTA</span>
          </div>

          <div className="form-group-grid">
            <div className="form-field full-width">
              <label>Setup & Posizionamento</label>
              <textarea 
                rows="2"
                placeholder="Come posizionarsi ed impugnare l'attrezzo..."
                value={formData.execution.setup}
                onChange={(e) => handleExecutionChange('setup', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Fase di Discesa (Eccentrica)</label>
              <textarea 
                rows="2"
                placeholder="Come scendere in controllo..."
                value={formData.execution.eccentric}
                onChange={(e) => handleExecutionChange('eccentric', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Fase di Spinta / Trazione (Concentrica)</label>
              <textarea 
                rows="2"
                placeholder="Come spingere con efficacia..."
                value={formData.execution.concentric}
                onChange={(e) => handleExecutionChange('concentric', e.target.value)}
              />
            </div>

            <div className="form-field full-width">
              <label>Respirazione Consigliata</label>
              <input 
                type="text"
                placeholder="es. Inspira prima di scendere, espira superando il punto critico"
                value={formData.execution.breathing}
                onChange={(e) => handleExecutionChange('breathing', e.target.value)}
              />
            </div>
          </div>

          <div className="editor-modal-footer">
            <button type="button" className="btn-gymmane-secondary" onClick={onClose}>
              Annulla
            </button>
            <button type="submit" className="btn-gymmane-primary">
              <Check size={16} />
              <span>Salva Esercizio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
