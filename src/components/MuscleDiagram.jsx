import React from 'react';

export function MuscleDiagram({ primary = [], secondary = [], svgType = 'squat' }) {
  // Visual schematic illustrating movement posture and muscle highlight zones
  const isTarget = (muscleName) => {
    const p = primary.some(m => m.toLowerCase().includes(muscleName.toLowerCase()));
    const s = secondary.some(m => m.toLowerCase().includes(muscleName.toLowerCase()));
    if (p) return 'var(--color-primary-glow)';
    if (s) return 'var(--color-secondary-glow)';
    return 'var(--color-body-base)';
  };

  return (
    <div className="muscle-diagram-container">
      <div className="diagram-visual-wrap">
        <svg
          viewBox="0 0 240 280"
          className="anatomy-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid background accent */}
          <line x1="20" y1="140" x2="220" y2="140" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
          <line x1="120" y1="20" x2="120" y2="260" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

          {/* HEAD & NECK */}
          <circle cx="120" cy="40" r="14" fill="#334155" stroke="#475569" strokeWidth="1.5" />
          <rect x="115" y="52" width="10" height="12" rx="3" fill="#334155" />

          {/* SHOULDERS / DELTOIDS */}
          <path
            d="M85 70 C85 64, 100 64, 106 66 L102 82 C94 82, 85 78, 85 70 Z"
            fill={isTarget('Spalle') !== 'var(--color-body-base)' ? isTarget('Spalle') : isTarget('Deltoid')}
            filter={isTarget('Spalle') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />
          <path
            d="M155 70 C155 64, 140 64, 134 66 L138 82 C146 82, 155 78, 155 70 Z"
            fill={isTarget('Spalle') !== 'var(--color-body-base)' ? isTarget('Spalle') : isTarget('Deltoid')}
            filter={isTarget('Spalle') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />

          {/* CHEST / PETTORALI */}
          <path
            d="M104 68 C112 68, 120 72, 120 86 C110 86, 100 84, 98 76 Z"
            fill={isTarget('Pettorali')}
            filter={isTarget('Pettorali') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />
          <path
            d="M136 68 C128 68, 120 72, 120 86 C130 86, 140 84, 142 76 Z"
            fill={isTarget('Pettorali')}
            filter={isTarget('Pettorali') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />

          {/* DORSALI / SCHIENA LAT */}
          <path
            d="M96 82 C90 92, 90 108, 96 116 L104 114 C100 102, 102 90, 104 84 Z"
            fill={isTarget('Dorsal')}
            filter={isTarget('Dorsal') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />
          <path
            d="M144 82 C150 92, 150 108, 144 116 L136 114 C140 102, 138 90, 136 84 Z"
            fill={isTarget('Dorsal')}
            filter={isTarget('Dorsal') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />

          {/* CORE / ADDOMINALI */}
          <rect
            x="106" y="90" width="28" height="34" rx="4"
            fill={isTarget('Core') !== 'var(--color-body-base)' ? isTarget('Core') : isTarget('Addom')}
            filter={isTarget('Core') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />
          <line x1="120" y1="92" x2="120" y2="122" stroke="rgba(255,255,255,0.15)" />
          <line x1="108" y1="102" x2="132" y2="102" stroke="rgba(255,255,255,0.15)" />
          <line x1="108" y1="112" x2="132" y2="112" stroke="rgba(255,255,255,0.15)" />

          {/* ARMS / BRACCIA */}
          <path
            d="M84 76 L74 112 C72 118, 70 134, 68 142"
            stroke={isTarget('Tricipiti') !== 'var(--color-body-base)' ? isTarget('Tricipiti') : (isTarget('Bicipiti') !== 'var(--color-body-base)' ? isTarget('Bicipiti') : '#334155')}
            strokeWidth="9" strokeLinecap="round"
          />
          <path
            d="M156 76 L166 112 C168 118, 170 134, 172 142"
            stroke={isTarget('Tricipiti') !== 'var(--color-body-base)' ? isTarget('Tricipiti') : (isTarget('Bicipiti') !== 'var(--color-body-base)' ? isTarget('Bicipiti') : '#334155')}
            strokeWidth="9" strokeLinecap="round"
          />

          {/* GLUTES / BACINO */}
          <path
            d="M96 126 C96 122, 144 122, 144 126 C144 144, 96 144, 96 126 Z"
            fill={isTarget('Glutei')}
            filter={isTarget('Glutei') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />

          {/* LEGS: THIGHS (QUADRICIPITI / FEMORALI) */}
          <path
            d="M96 138 C94 150, 92 176, 96 194 C104 196, 114 196, 114 190 C114 174, 116 150, 116 138 Z"
            fill={isTarget('Quadricipiti') !== 'var(--color-body-base)' ? isTarget('Quadricipiti') : isTarget('Femorali')}
            filter={isTarget('Quadricipiti') !== 'var(--color-body-base)' || isTarget('Femorali') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />
          <path
            d="M144 138 C146 150, 148 176, 144 194 C136 196, 126 196, 126 190 C126 174, 124 150, 124 138 Z"
            fill={isTarget('Quadricipiti') !== 'var(--color-body-base)' ? isTarget('Quadricipiti') : isTarget('Femorali')}
            filter={isTarget('Quadricipiti') !== 'var(--color-body-base)' || isTarget('Femorali') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />

          {/* KNEES */}
          <circle cx="104" cy="202" r="6" fill="#334155" stroke="#475569" />
          <circle cx="136" cy="202" r="6" fill="#334155" stroke="#475569" />

          {/* POLPACCI (CALVES) */}
          <path
            d="M98 208 C94 220, 96 242, 98 256 L110 256 C112 242, 114 220, 110 208 Z"
            fill={isTarget('Polpacci') !== 'var(--color-body-base)' ? isTarget('Polpacci') : isTarget('Gastrocnemio')}
            filter={isTarget('Polpacci') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />
          <path
            d="M142 208 C146 220, 144 242, 142 256 L130 256 C128 242, 126 220, 130 208 Z"
            fill={isTarget('Polpacci') !== 'var(--color-body-base)' ? isTarget('Polpacci') : isTarget('Gastrocnemio')}
            filter={isTarget('Polpacci') !== 'var(--color-body-base)' ? "url(#glowEffect)" : ""}
            stroke="#475569" strokeWidth="1"
          />

          {/* FEET */}
          <ellipse cx="99" cy="264" rx="10" ry="4" fill="#334155" />
          <ellipse cx="141" cy="264" rx="10" ry="4" fill="#334155" />
        </svg>

        <div className="diagram-legend">
          <div className="legend-item">
            <span className="legend-dot primary-dot"></span>
            <span>Target Primario</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot secondary-dot"></span>
            <span>Sinergico / Stabilizzatore</span>
          </div>
        </div>
      </div>
    </div>
  );
}
