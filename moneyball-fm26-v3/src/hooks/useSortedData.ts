import { useMemo } from 'react'
import type { DerivedPlayer } from '@/types/player.ts'

export function useSortedData(
  players: DerivedPlayer[],
  sortColumn: string | null,
  sortDirection: 'asc' | 'desc',
) {
  return useMemo(() => {
    if (!sortColumn) return players

    return [...players].sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]

      // Handle undefined/null
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      // String comparison
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const cmp = aVal.localeCompare(bVal, 'pt-BR')
        return sortDirection === 'asc' ? cmp : -cmp
      }

      // Numeric comparison
      const numA = typeof aVal === 'number' ? aVal : 0
      const numB = typeof bVal === 'number' ? bVal : 0
      return sortDirection === 'asc' ? numA - numB : numB - numA
    })
  }, [players, sortColumn, sortDirection])
}
