import { useMemo } from 'react'
import type { DerivedPlayer } from '@/types/player.ts'
import { computeAllColumnStats, type ColumnStats } from '@/engine/statistics.ts'

export function useColumnStats(
  players: DerivedPlayer[],
  columns: string[],
): Record<string, ColumnStats> {
  return useMemo(
    () => computeAllColumnStats(players, columns),
    [players, columns],
  )
}
