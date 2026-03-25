/**
 * Statistical utilities for column-level analysis.
 * Used for heatmap coloring, normalization, and distribution charts.
 */

import type { DerivedPlayer } from '@/types/player.ts'

export interface ColumnStats {
  min: number
  max: number
  mean: number
  median: number
  count: number
}

/** Compute statistics for a single column across all players */
export function computeColumnStats(players: DerivedPlayer[], key: string): ColumnStats {
  const values = players
    .map((p) => (typeof p[key] === 'number' ? (p[key] as number) : null))
    .filter((v): v is number => v !== null && !isNaN(v))

  if (values.length === 0) {
    return { min: 0, max: 0, mean: 0, median: 0, count: 0 }
  }

  const sorted = [...values].sort((a, b) => a - b)
  const sum = values.reduce((acc, v) => acc + v, 0)

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean: sum / values.length,
    median:
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)],
    count: values.length,
  }
}

/** Compute statistics for multiple columns at once */
export function computeAllColumnStats(
  players: DerivedPlayer[],
  keys: string[],
): Record<string, ColumnStats> {
  const result: Record<string, ColumnStats> = {}
  for (const key of keys) {
    result[key] = computeColumnStats(players, key)
  }
  return result
}

/** Determine heatmap class: 'good', 'bad', or '' based on value vs column stats */
export function heatmapClass(
  value: number,
  stats: ColumnStats,
  lowerIsBetter = false,
): 'good' | 'bad' | '' {
  if (stats.max === stats.min) return ''
  let normalized = (value - stats.min) / (stats.max - stats.min)
  if (lowerIsBetter) normalized = 1 - normalized

  if (normalized > 0.65) return 'good'
  if (normalized < 0.3) return 'bad'
  return ''
}
