import React, { useState } from 'react';
import { X, Check, Layers, Clock } from 'lucide-react';

export function WorkoutEditorModal({ workout, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: workout ? workout.id : `workout-${Date.now()}`,
    title: workout ? workout.title : '',
    shortTitle: workout ? workout.shortTitle : '',
    description: workout ? workout.description : '',
    category: workout ? workout.category : 'Full Body',
    durationMinutes: workout ? workout.durationMinutes : 60,
    difficulty: workout ? workout.difficulty : 'Intermedio',
    accentColor: '#D9A184',
    exercises: workout ? workout.exercises : []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    const finalData = {
      ...formData,
      shortTitle: formData.shortTitle.trim() || formData.title.trim()
    };
    onSave(finalData);
  };

  return (
    <div className="modal-backdrop">
      <div className="gymmane-editor-modal" style={{ maxWidth: 500 }}>
        <div className="editor-modal-header">
          <h3>{workout ? 'MODIFICA SCHEDA' : 'CREA NUOVA SCHEDA'}</h3>
          <button type="button" className="close-editor-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="editor-form-scroll">
          <div className="form-group-grid">
            <div className="form-field full-width">
              <label>Nome Scheda *</label>
              <input 
                type="text"
                required
                placeholder="es. GAMBE & GLUTEI POWER"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label>Categoria</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Gambe">Gambe & Glutei</option>
                <option value="Parte Superiore">Parte Superiore</option>
                <option value="Spinta">Spinta (Push)</option>
                <option value="Trazione">Trazione (Pull)</option>
                <option value="Full Body">Full Body</option>
                <option value="Core & Funzionale">Core & Funzionale</option>
              </select>
            </div>

            <div className="form-field">
              <label>Durata Stimata (minuti)</label>
              <input 
                type="number"
                min="15"
                step="5"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 45 })}
              />
            </div>

            <div className="form-field full-width">
              <label>Descrizione / Obiettivo</label>
              <textarea 
                rows="2"
                placeholder="es. Focus su forza ed ipertrofia della catena cinetica posteriore..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="editor-modal-footer">
            <button type="button" className="btn-gymmane-secondary" onClick={onClose}>
              Annulla
            </button>
            <button type="submit" className="btn-gymmane-primary">
              <Check size={16} />
              <span>Salva Scheda</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
