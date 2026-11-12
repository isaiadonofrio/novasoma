import React, { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';

export function WorkoutEditorModal({ workout, onSave, onClose }) {
  useBodyScrollLock();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  const [formData, setFormData] = useState({
    id: workout ? workout.id : null,
    title: workout ? workout.title : '',
    shortTitle: workout ? (workout.shortTitle || '') : '',
    description: workout ? (workout.description || '') : '',
    category: workout ? (workout.category || 'Full Body') : 'Full Body',
    durationMinutes: workout ? (workout.durationMinutes || 60) : 60,
    difficulty: workout ? (workout.difficulty || 'Intermediate') : 'Intermediate',
    accentColor: workout?.accentColor || '#D9A184',
    equipmentTags: workout?.equipmentTags || [],
    exercises: workout ? workout.exercises : []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    const finalData = {
      ...formData,
      id: formData.id || `workout-${Date.now()}`,
      title: formData.title.trim(),
      shortTitle: formData.shortTitle.trim() || formData.title.trim(),
      description: formData.description.trim()
    };
    onSave(finalData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="gymmane-editor-modal" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{workout ? 'EDIT WORKOUT' : 'CREATE NEW WORKOUT'}</h3>
          <button type="button" className="close-editor-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="editor-form-scroll">
          <div className="form-group-grid">
            <div className="form-field full-width">
              <label>Workout Name *</label>
              <input 
                type="text"
                required
                placeholder="e.g. Legs & Glutes Power"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label>Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Legs & Glutes">Legs & Glutes</option>
                <option value="Upper Body">Upper Body</option>
                <option value="Push">Push</option>
                <option value="Pull">Pull</option>
                <option value="Full Body">Full Body</option>
                <option value="Core & Functional">Core & Functional</option>
              </select>
            </div>

            <div className="form-field">
              <label>Level / Difficulty</label>
              <select 
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Intermediate - Advanced">Intermediate - Advanced</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="form-field full-width">
              <label>Estimated Duration (minutes)</label>
              <input 
                type="number"
                min="15"
                step="5"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value, 10) || 45 })}
              />
            </div>

            <div className="form-field full-width">
              <label>Description / Focus</label>
              <textarea 
                rows="2"
                placeholder="e.g. Focus on posterior chain strength and hypertrophy..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="editor-modal-footer">
            <button type="button" className="btn-gymmane-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-gymmane-primary">
              <Check size={16} />
              <span>Save Workout</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
