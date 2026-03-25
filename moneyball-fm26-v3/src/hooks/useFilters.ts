import { useState, useMemo, useCallback } from 'react'
import type { FilterState } from '@/types/filters.ts'
import type { DerivedPlayer } from '@/types/player.ts'
import { DEFAULT_FILTERS } from '@/types/filters.ts'
import { applyFilters } from '@/engine/filters.ts'

export function useFilters(players: DerivedPlayer[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const filteredPlayers = useMemo(
    () => applyFilters(players, filters),
    [players, filters],
  )

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  return { filters, filteredPlayers, updateFilter, resetFilters }
}
