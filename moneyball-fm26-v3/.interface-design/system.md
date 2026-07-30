# Scout Command Center — Design System

## Direction & Feel

**Who:** Football Manager analysts evaluating player data for tactical decisions.
**What:** Import data, compare players, identify tier S vs C, customize scoring weights.
**Feel:** Dense like a trading terminal, narrative of a modern sports broadcast. A command center, not a casual app.

## Domain Metaphors

- **Turf** — deep navy surfaces (command center walls)
- **Chalk** — text hierarchy (field markings)
- **Slate** — borders (barely-there structure)
- **Pitch** — accent green (the field itself)
- **Scoreboard** — amber highlights (LED warmth)
- **Whistle** — red (red card, danger)
- **Sky** — secondary blue (open field)

## Signature

**Tactical Position Codes** — Tabs use monospace abbreviations (GK, CB, FB, DM, B2B, AMC, ST, EFF, TEAM, OVR) instead of emojis. Active state uses pitch-green bottom border. Score badges have a left accent bar (scout's rating stamp). Stats bar is a continuous strip with 1px gaps (trading terminal density).

## Depth Strategy

**Borders-only** — no shadows. Depth via surface luminosity differences between turf layers. Borders use rgba for subtle, theme-adaptive edges.

## Spacing

Base unit: **4px**. Scale: 4, 8, 12, 16, 20, 24, 32.

## Color Primitives

### Dark Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--turf-deep` | `#070a16` | Deepest bg (header) |
| `--turf` | `#0b0f1b` | Primary bg |
| `--turf-raised` | `#101526` | Cards, secondary surfaces |
| `--turf-elevated` | `#161c2f` | Inputs, buttons |
| `--turf-hover` | `#1d2438` | Hover state |
| `--chalk` | `#dce0e8` | Primary text |
| `--chalk-faded` | `#7f8a9c` | Secondary text |
| `--chalk-ghost` | `#4d586c` | Muted text |
| `--slate` | `rgba(140,160,200,0.10)` | Standard border |
| `--pitch` | `#1a9a5a` | Accent green |
| `--scoreboard` | `#c89b15` | Amber/gold |
| `--whistle` | `#b83226` | Red/danger |
| `--sky` | `#2970c4` | Secondary blue |

### Light Theme
Same primitives with inverted luminosity. See `globals.css`.

## Score Tiers
- **S** (≥70): `--pitch` (green)
- **A** (≥50): `--sky` (blue)
- **B** (≥30): `--scoreboard` (amber)
- **C** (<30): `--whistle` (red)

## Typography
- **Sans:** Inter — headers, body, labels
- **Mono:** JetBrains Mono — data values, position codes, stats
- **Headers:** font-weight 800, letter-spacing 0.05em
- **Labels:** font-weight 500-600, uppercase, letter-spacing 0.03-0.06em
- **Data:** font-weight 700, monospace

## Key Component Patterns

### Header
- `turf-deep` background with green gradient accent line at top
- "MONEYBALL" in chalk, "FM26" in pitch green
- Version badge: slate bg, ghost text, 2px radius

### Position Tabs
- No emojis — monospace tactical codes
- Active: 3px pitch-green bottom border, chalk text
- Inactive: transparent bg, ghost text
- Count badge: pitch bg (active) or slate bg (inactive)

### Score Badge
- 1.75rem × 1.5rem, 3px left border in tier color
- 12% tier-color tinted background
- 800 weight monospace letter

### Stats Bar
- Continuous strip with 1px gaps between segments
- `turf-elevated` background
- Label: 0.6rem mono uppercase ghost
- Value: 0.8rem mono bold chalk

### View Navigation
- Uppercase monospace buttons
- Active: pitch bg, white text
- Inactive: turf-elevated bg, chalk-faded text

### Table
- Top 3 ranks highlighted in pitch green (bold)
- 4px border-radius container
- Slate borders
- Zebra striping with turf-raised alternation

## Range Inputs
- Global `accent-color: var(--pitch)` via CSS
- No Tailwind accent-* classes needed
