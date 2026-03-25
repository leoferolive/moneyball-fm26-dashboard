/**
 * Custom scoring engine.
 * Takes a DerivedPlayer and a ScoringProfile (set of weighted metrics),
 * normalizes each metric, applies weights, and produces a composite score (0-100).
 */

import type { DerivedPlayer } from '@/types/player.ts'
import type { ScoringProfile } from '@/types/scoring.ts'
import { clamp } from './numbers.ts'
import type { ColumnStats } from './statistics.ts'

/** Compute a custom score for a player given a scoring profile and column statistics */
export function computeScore(
  player: DerivedPlayer,
  profile: ScoringProfile,
  stats: Record<string, ColumnStats>,
): number {
  // Scoring absoluto: lê _moneyball pré-calculado no derive()
  if (profile.isAbsolute) {
    const mb = typeof player['_moneyball'] === 'number' ? (player['_moneyball'] as number) : 0
    return clamp(Math.round(mb * 100) / 100, 0, 100)
  }

  if (profile.weights.length === 0) return 0

  let weightedSum = 0
  let totalWeight = 0

  for (const { metricKey, weight } of profile.weights) {
    if (weight === 0) continue

    const value = typeof player[metricKey] === 'number' ? (player[metricKey] as number) : 0
    const colStats = stats[metricKey]

    if (!colStats || colStats.max === colStats.min) {
      // Can't normalize if all values are the same
      continue
    }

    // Normalize to 0-100 using min-max scaling from actual data
    const normalized = ((value - colStats.min) / (colStats.max - colStats.min)) * 100

    weightedSum += clamp(normalized, 0, 100) * weight
    totalWeight += weight
  }

  if (totalWeight === 0) return 0
  return clamp(Math.round((weightedSum / totalWeight) * 100) / 100, 0, 100)
}

/** Compute scores for all players */
export function computeScoresForAll(
  players: DerivedPlayer[],
  profile: ScoringProfile,
  stats: Record<string, ColumnStats>,
): DerivedPlayer[] {
  return players.map((player) => ({
    ...player,
    _customScore: computeScore(player, profile, stats),
  }))
}
