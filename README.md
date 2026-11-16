# NOVA SOMA

> **Minimalist Biomechanics & Somatic Training Studio**  
> *A Nova Psiche Project* • [www.novapsiche.com](https://www.novapsiche.com)

Nova Soma is a calm, editorial, 100% local-first home strength training and biomechanics Progressive Web App. Grounded in the classical Greek concept of **Sōma** (Σῶμα — *the physical body and its vitality*), it runs entirely offline in your browser with zero cloud tracking, zero account walls, and complete data sovereignty.

---

## Key Features

* **Studio Workout Player**: Centered 2-column Warm Linen studio layout across desktop, tablet, and mobile with sticky quick-complete HUD, form cues, and progression drawers.
* **Contiguous Supersets & Auto Drop Sets**: Paired main-block movements, automatic `-20%` drop-set load calculations, and automatic phase grouping (`Warm-Up`, `Workout`, `Decompression`).
* **Drift-Free Wall-Clock Timers**: Rest countdowns and session elapsed time track wall-clock `Date.now()` timestamps accurately even through mobile screen locks or backgrounding.
* **127-Movement Biomechanics Library**: Filterable exercise atlas across 8 movement families with interactive SVG muscle maps, kinesiological metadata (plane, chain, laterality, load vector, resistance profile, joint actions), and 127/127 local illustrations.
* **Offline-First PWA & Portable JSON Backups**: Installable Workbox PWA with local-only `localStorage` persistence, one-click portable JSON export/import, and 14-session demo mode.

---

## Tech Stack

* **Framework**: React 19 + Vite 8 + `vite-plugin-pwa`
* **Styling**: Layered Pure CSS Architecture anchored in `src/styles/tokens.css` (Warm Linen Light theme)
* **Icons**: Lucide React
* **Type Checking & Linting**: TypeScript (`tsc --noEmit` via `checkJs` + JSDoc models) & Oxlint
* **Testing**: Node Test Runner (`node:test`) + Playwright E2E (`playwright test`)
* **Deployment**: GitHub Actions CI/CD (`lint` → `typecheck` → `test` → `build` → `test:e2e`) → GitHub Pages

---

## Architecture & Project Documentation

```text
├── docs/
│   ├── VISION_AND_ROADMAP.md   # Product objectives, design pillars & version timeline
│   ├── ARCHITECTURE.md         # Module map, storage schema & workout engine flow
│   └── PROJECT_STATE.md        # Live verified metrics & snapshot for AI/contributors
├── AGENTS.md                   # Engineering invariants & verification checklist
├── src/
│   ├── assets/                 # brand/, anatomy/, exercises/ (127 .webp/.jpg assets)
│   ├── components/             # player/, overview/, HomeView, StatsDashboard, Library & Modals
│   ├── data/                   # 127 canonical exercises (8 category modules) & 2 personal routines
│   ├── styles/                 # tokens.css + modular editorial Light stylesheets
│   ├── types/                  # Shared TypeScript definitions (models.d.ts)
│   └── utils/                  # analytics, audio, confetti, demoData, migrations, storage, workoutSets
├── tests/                      # Unit test suites (node:test)
└── e2e/                        # Critical user flow tests (Playwright)
```

* **[Vision & Roadmap](docs/VISION_AND_ROADMAP.md)** — Product objectives, design rules, completed milestones & upcoming releases
* **[System Architecture](docs/ARCHITECTURE.md)** — File tree, storage keys, migration lifecycle & bundle splitting
* **[Live Project State](docs/PROJECT_STATE.md)** — Current test counts, catalog coverage & latest build stats
* **[AI & Contributor Guide](AGENTS.md)** — Structural invariants & mandatory verification gate

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Verification gate
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

---

## Privacy & Data Sovereignty

Nova Soma never sends personal training data to external servers. All routines, logged sets, notes, and history remain exclusively on your device.

## License

Private & proprietary — © Nova Psiche. All rights reserved.
