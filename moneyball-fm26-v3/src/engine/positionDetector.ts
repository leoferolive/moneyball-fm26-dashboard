/**
 * Auto-detect position from parsed CSV headers.
 * Matches headers against each position's rawColumns for best overlap.
 */

import type { PositionKey } from '@/types/position.ts'
import type { PositionConfig } from '@/config/positions/types.ts'
import { MIN_COLUMN_MATCH_PERCENT } from '@/config/constants.ts'

export interface DetectionResult {
  position: PositionKey
  matchCount: number
  matchPercent: number
  totalExpected: number
  missingColumns: string[]
}

/** Detect the best-matching position for a set of headers */
export function detectPosition(
  headers: string[],
  positionConfigs: Record<PositionKey, PositionConfig>,
): DetectionResult | null {
  const headerSet = new Set(headers.map((h) => h.trim()))
  let bestMatch: DetectionResult | null = null

  for (const config of Object.values(positionConfigs)) {
    const expected = config.rawColumns
    const matched = expected.filter((col) => headerSet.has(col))
    const matchPercent = expected.length > 0 ? matched.length / expected.length : 0

    const result: DetectionResult = {
      position: config.key,
      matchCount: matched.length,
      matchPercent,
      totalExpected: expected.length,
      missingColumns: expected.filter((col) => !headerSet.has(col)),
    }

    if (matchPercent >= MIN_COLUMN_MATCH_PERCENT) {
      if (!bestMatch || result.matchCount > bestMatch.matchCount) {
        bestMatch = result
      }
    }
  }

  return bestMatch
}

/** Detect all matching positions (for cases where headers match multiple) */
export function detectAllPositions(
  headers: string[],
  positionConfigs: Record<PositionKey, PositionConfig>,
): DetectionResult[] {
  const headerSet = new Set(headers.map((h) => h.trim()))
  const results: DetectionResult[] = []

  for (const config of Object.values(positionConfigs)) {
    const expected = config.rawColumns
    const matched = expected.filter((col) => headerSet.has(col))
    const matchPercent = expected.length > 0 ? matched.length / expected.length : 0

    if (matchPercent >= MIN_COLUMN_MATCH_PERCENT) {
      results.push({
        position: config.key,
        matchCount: matched.length,
        matchPercent,
        totalExpected: expected.length,
        missingColumns: expected.filter((col) => !headerSet.has(col)),
      })
    }
  }

  return results.sort((a, b) => b.matchCount - a.matchCount)
}
