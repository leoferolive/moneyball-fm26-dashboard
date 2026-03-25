export const SCORE_TIERS = {
  S: { min: 70, label: 'S', color: 'var(--color-score-s)' },
  A: { min: 50, label: 'A', color: 'var(--color-score-a)' },
  B: { min: 30, label: 'B', color: 'var(--color-score-b)' },
  C: { min: 0, label: 'C', color: 'var(--color-score-c)' },
} as const

export function scoreLabel(score: number): string {
  if (score >= 70) return 'S'
  if (score >= 50) return 'A'
  if (score >= 30) return 'B'
  return 'C'
}

export function scoreColor(score: number): string {
  if (score >= 70) return SCORE_TIERS.S.color
  if (score >= 50) return SCORE_TIERS.A.color
  if (score >= 30) return SCORE_TIERS.B.color
  return SCORE_TIERS.C.color
}

export function scoreCssClass(score: number): string {
  if (score >= 70) return 'score-s'
  if (score >= 50) return 'score-a'
  if (score >= 30) return 'score-b'
  return 'score-c'
}

export const MIN_COLUMN_MATCH_PERCENT = 0.4
export const MIN_GAMES_90 = 1
export const APP_VERSION = 'v3.0'
