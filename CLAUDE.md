# CLAUDE.md — Nova Soma Project & Migration Context

> **Welcome Claude Code!** This document serves as the master onboarding, architectural reference, and conversation history handover for **Nova Soma**. It contains everything you need to understand the project philosophy, codebase structure, design rules, recent refactoring history, and active development state.

---

## 1. Project Overview & Philosophy

**Nova Soma** is a minimalist biomechanics and somatic training web application developed under **Nova Psiche** ([www.novapsiche.com](https://www.novapsiche.com)).

### Core Pillars
- **Sōma (Σῶμα)**: Focus on physical vitality, anatomical alignment, biomechanics, and mind-muscle connection.
- **100% Offline-First & Private**: Zero telemetry, zero external trackers, zero accounts/passwords. All workout histories, routines, custom exercises, and statistics reside exclusively in browser `localStorage`.
- **Portable Data Sovereignty**: One-click import/export of complete training state via portable JSON backup files.
- **Health-Informed UX Ergonomics**: Designed specifically for high-fatigue, sweaty-hand gym environments:
  - High-contrast glanceability from 2–3 meters away.
  - Large tactile tap targets (steppers ≥ 42px, Done pill ≥ 60px).
  - Reduced cognitive load during exertion (flat cards, zero nested box clutter).
  - Somatic & breathing guidance integrated alongside rep counters.

---

## 2. Tech Stack & Tooling

| Layer | Technology |
|---|---|
| **Framework** | React 19.3 + Vite 8.3 |
| **Icons** | Lucide React |
| **Styling** | Pure CSS (Design tokens, modular domain stylesheets, Light/Dark theme) |
| **Linter** | Oxlint (`oxlint` — zero config, sub-100ms execution) |
| **Unit Testing** | Node.js Test Runner (`node:test` + TAP reporter) |
| **Asset Formats** | WebP illustrations with radial blending; SVG vector icons |
| **Deployment** | GitHub Actions CI/CD to GitHub Pages |
| **Repository** | `https://github.com/isaiadonofrio/novasoma.git` (Default branch: `master`) |

### Essential Developer Commands
```bash
# Start local development server (Vite, http://localhost:5173/)
npm run dev

# Run unit test suite (24 tests covering stats, timers, schemas, volume)
npm test

# Run Oxlint linter
npm run lint

# Build production bundle (Vite build -> /dist)
npm run build
```

> [!IMPORTANT]
> **Windows Environment Note**: The workspace directory is located at:
> `d:\isaiadonofrio\Desktop\01. [◆] Vita\04. [◆] Corpo`
> Because the path contains PowerShell wildcard characters (`[` and `]`), PowerShell commands interacting with file paths must use `-LiteralPath` or proper quotes/escapes.

---

## 3. Brand Design System & Color Palette

The app features two harmonized somatic themes: **Warm Linen** (default light) and **Obsidian** (dark).

### Color Tokens
- **Background**: `#F9F8F4` (Warm Linen Light) / `#0A0908` (Obsidian Dark)
- **Cards & Surfaces**: `#FFFFFF` (Light cards) / `#151412` (Dark cards), `#FAF8F4` (Light surface), `#1A1816` (Dark raised)
- **Borders**: `#E6E2D8` (Light) / `#2A2723` (Dark)
- **Primary Brand Teal**: `#176A63` (Active buttons, completed sets, timer progress arc, primary actions)
- **Secondary Teal / Sage**: `#24948A` (Gradient transitions, completed state backgrounds)
- **Bronze / Clay Accent**: `#8C673A` (Timer highlights, Next Up set badges, eyebrow kickers)
- **Typography**: System sans-serif stack for interface; high-contrast monospace (`var(--mono)`) with `font-variant-numeric: tabular-nums` for all clocks, timers, and set counters.

---

## 4. Conversation History & Recent Refactoring Journey

In recent sessions, we performed a comprehensive ergonomic and aesthetic redesign of the **Live Workout Screen (Studio Player)** (`src/components/ActiveWorkoutModal.jsx` & `src/styles/active-workout.css`). Here is the step-by-step evolution:

### The Problem Identified
Previous iterations struggled with:
1. **Unbalanced Stage Weight**: The movement visual and timer were cramped into a narrow left column (~25–30%), while the right console was over-extended (~70–75%), causing the set rows to stretch across 900+ pixels with huge empty beige gaps between steppers and checkmarks ("the empty beige tail").
2. **Visual Clutter (Box-in-Box Nesting)**: The right side had 3 separate stacked boxes directly beneath the exercise title (coaching cue box, breathing box, form guide button box), creating cognitive overwhelm during intense sets.
3. **Timer Prominence**: The rest timer was a generic text countdown box that lacked the athletic, grounded feeling of the Nova Soma ouroboros circle logo.
4. **Awkward Navigation Docking**: Previous attempts placed the Previous/Next exercise buttons crammed inside the right card footer in a 1fr:2fr split, leaving the left card hanging unevenly.

### The Solution Implemented (Current Master State `f518be0`)

#### 1. Movement Visual & Circular Ring Timer (Left Column)
- **45% Width Dominance**: Set `.studio-grid` to `grid-template-columns: minmax(460px, 510px) minmax(0, 1fr); gap: 24px;`.
- **Full-Bleed 4:3 Visual Frame**: `.studio-media-frame` has `min-height: 330px; height: 360px; aspect-ratio: 4 / 3;` with radial gradient background (`radial-gradient(circle at 50% 50%, #ffffff 45%, #f1eee7 100%)`) so 3D anatomical models blend seamlessly without harsh container borders.
- **220px Ouroboros Ring Timer**: Custom SVG ring (`r="92"`, 10px stroke) with depleting gradient arc (`#176A63` -> `#24948A` -> `#8C673A`).
- **46px Glanceable Clock**: Bold tabular digits (`tabular-nums; letter-spacing: -0.04em`) legible from across the room.
- **Center Controls**: 44px circular play/pause button in center, with quick-select preset chips (`60s`, `90s`, `120s`, `+15s`, reset, mute) cleanly centered underneath.

#### 2. Compressed, Cleaned-Up Console (Right Column)
- **Serene Micro-Coaching Bar (`.studio-info-strip`)**: Merged the 3 stacked boxes into a single calm two-tier bar:
  - *Tier 1*: Sparkle icon + execution/somatic cue.
  - *Tier 2*: Inline breathing chip (`💨 Breathe: Inhale before starting...`), tempo badge, and `Form Guide (G)` button aligned flush right.
- **Clean Column Headers**: Shortened `REPS (Target 10 - 12 /leg)` to crisp `HOLD (S)` / `REPS` to prevent two-line text wrapping.
- **Bounded Set Rows (Zero Empty Tail)**: Applied `max-width: 640px; width: 100%;` to `.player-sets-list` and `.player-sets-col-heads`. Uses a clean 5-column grid (`36px 76px 1fr 1fr 64px; gap: 10px;`):
  - `SET`: 36px circular badge (shows "NEXT" tag on active set).
  - `PREVIOUS`: 76px record button with 1-click copy into current set.
  - `REPS`: Centered 36px stepper with 30px circular minus/plus buttons.
  - `WEIGHT`: Centered 36px stepper with 30px circular minus/plus buttons.
  - `DONE`: 60px × 36px pill button that fills with deep teal `#176A63` and checkmark upon completion.
- **Row Height**: Athletic 48px height with smooth state transitions.

#### 3. Grounded Baseline Navigation (`.studio-inline-nav`)
- Relocated navigation out of the right card and placed it directly underneath the 2-column grid.
- **Left Column Match**: `[ ← ] PREVIOUS: Bulgarian Split Squat` (pill card button, 52px high, matching left column).
- **Right Column Match**: `NEXT EXERCISE: Single-Leg Standing Calf Raise [ → ]` (full-width pill button, 52px high, in `#176A63`, large tap target).
- Both main cards now sit at equal visual priority without trailing footer clutter.

---

## 5. Codebase Directory Map

```
04. [◆] Corpo/
├── public/                     # Static icons, manifest, favicon
├── src/
│   ├── components/
│   │   ├── ActiveWorkoutModal.jsx    # Live workout player (the refactored view)
│   │   ├── HomeView.jsx              # Dashboard, scheduled workout, weekly heatmap
│   │   ├── WorkoutOverviewView.jsx   # Routine detail, exercise list, superset manager
│   │   ├── ExerciseDatabaseView.jsx  # Interactive exercise filter and muscle map
│   │   ├── WorkoutSummaryModal.jsx   # Post-workout session summary & volume stats
│   │   ├── DataBackupModal.jsx       # JSON export / import data sovereign backup
│   │   ├── FormGuideModal.jsx        # Anatomy, biomechanics, and somatic cues drawer
│   │   └── Navbar.jsx                # Top bar navigation & theme toggler
│   ├── data/
│   │   ├── exerciseDatabase.js       # Canonical exercise list, muscle groups, equipment
│   │   └── initialRoutines.js        # Default starter routines (Legs 1, Push, Pull, etc.)
│   ├── styles/
│   │   ├── design-tokens.css         # CSS variables, colors, spacing, typography
│   │   ├── active-workout.css        # Studio Player stylesheet (~2960 lines)
│   │   ├── home-view.css             # Dashboard & calendar heatmap styles
│   │   └── ...                       # Component-scoped CSS files
│   ├── utils/
│   │   ├── storage.js                # Safe localStorage read/write with error fallback
│   │   ├── workoutStats.js           # Volume calculations, streaks, solar heatmaps
│   │   ├── timerHelpers.js           # Timestamp-based driftless countdown logic
│   │   └── exerciseHelpers.js        # Rep/weight parsing, superset pairing, drop sets
│   ├── App.jsx                       # Root application controller & hash routing
│   └── main.jsx                      # React 19 entry point
├── tests/                            # Node:test unit tests (24 passing)
├── package.json
└── README.md
```

---

## 6. Key Data Structures & State Management

### 1. `localStorage` Keys
Managed safely in `src/utils/storage.js`:
- `nova_soma_routines`: User routine templates.
- `nova_soma_exercises`: Exercise database overrides.
- `nova_soma_history`: Logged workout sessions.
- `nova_soma_theme`: `'light'` | `'dark'`.
- `nova_soma_weekly_goal`: Integer `1` to `7`.

### 2. Live Workout Flow in `App.jsx`
- Routing via hash: `#home`, `#library`, `#workout/:id`, and `#live`.
- When a user starts a workout, `isPresentationActive` becomes `true`, and `ActiveWorkoutModal` mounts.
- Keyboard shortcuts supported during workout:
  - `Space`: Toggle countdown timer (Play / Pause).
  - `g`: Open Form, Muscles & Biomechanics Guide.
  - `ArrowLeft` / `ArrowRight`: Navigate exercises.
  - `Escape`: Close guide / cancel modals.

### 3. Driftless Timestamp Timers
Rather than using `setInterval` decrementing integers (which pauses or drifts when mobile phones sleep or tabs background), Nova Soma calculates seconds remaining against a wall-clock target timestamp (`Date.now() + targetSeconds * 1000`).

---

## 7. Guidelines for Working with Claude Code

1. **Strictly Preserve the Color Palette**:
   Always adhere to `#F9F8F4` (light bg), `#FFFFFF` (light cards), `#0A0908` (dark bg), `#176A63` (teal), `#8C673A` (bronze). Do not introduce arbitrary brand colors.
2. **Never Break Data Bindings**:
   All user inputs in `ActiveWorkoutModal` auto-save and bind to the workout payload (`onUpdateRoutine`, `onCompleteWorkout`).
3. **Verify Every Change**:
   Always run:
   ```bash
   npm run lint && npm test && npm run build
   ```
   Ensure 0 warnings, 0 errors, and all 24 unit tests pass before committing.
4. **Commit Discipline**:
   Use semantic commit messages (`feat(...)`, `style(...)`, `refactor(...)`, `fix(...)`).
