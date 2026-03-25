# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Moneyball FM26** is a single-file Football Manager 26 player analytics dashboard (`moneyball_fm26_dashboard.html`). It accepts FM26-exported player data (paste or CSV drop), runs position-specific scoring algorithms, and renders a ranked evaluation table. The UI is in Portuguese (PT-BR). The companion `Moneyball FM26.xlsm` is the Excel data source.

## Running the Project

No build step. Open `moneyball_fm26_dashboard.html` directly in a browser. All logic is self-contained in a single HTML file.

## Architecture

The entire application is vanilla JavaScript with embedded CSS (~986 lines). There are no dependencies, frameworks, or build tools.

### Position Configuration System

Each of the 9 positions is defined as an object in the `positionConfigs` map (lines ~117–397):
- `rawCols` — columns expected from FM26 export
- `derive(row)` — transforms raw FM26 data into computed metrics; sets `row._moneyball` with the final score
- `displayCols` — which columns to show in the results table

Scoring functions (`calcGKScore`, `calcCBScore`, `calcFBScore`, `calcDMScore`, `calcB2BScore`, `calcAMCScore`, `calcSTScore`, `calcOverallScore`, `calcTeamScore`) are defined separately (lines ~399–525) and called from `derive()`.

### Data Flow

```
Paste / File Drop
  → smartParse()       # auto-detects tab / semicolon / comma separator
  → parseCSVLine()     # handles quoted fields
  → positionConfig.derive()   # computes metrics + _moneyball score
  → renderMain()       # renders sorted table with score badges
```

### Number Format Handling

`pf(val)` parses both PT-BR (`1.234,56`) and EN (`1,234.56`) number formats. All raw FM26 column values must go through `pf()` before arithmetic. Use `sDiv(a, b)` for any division to avoid division-by-zero.

### Score Scale

Scores are 0–100. Display badges: **S** ≥70, **A** ≥50, **B** ≥30, **C** <30.

## Key Conventions

- All user-visible text is in **Portuguese (PT-BR)** — keep it that way when adding features.
- Sample data (lines ~862+) contains real Brazilian football player names for demo purposes. When modifying scoring formulas, update the sample data expectations accordingly.
- Column names in `rawCols` must exactly match FM26 export headers — any change breaks parsing for all existing users.
- The `clamp(val, min, max)` utility should be used when building score components to prevent scores from going out of range.
