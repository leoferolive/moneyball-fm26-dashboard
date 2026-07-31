import { useState, useRef, useCallback, useMemo } from 'react'
import type { DerivedPlayer } from '@/types/player.ts'

export function useRowSelection(players: DerivedPlayer[]) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const lastClickedIndexRef = useRef<number | null>(null)

  const toggle = useCallback((id: number, index: number, shiftKey: boolean) => {
    // Captura o índice do clique anterior ANTES de disparar o setState: o
    // updater abaixo só roda quando o React decide processá-lo, e por lá a
    // ref já teria sido sobrescrita pela linha final deste callback.
    const lastIndex = lastClickedIndexRef.current

    setSelectedIds((prev) => {
      const next = new Set(prev)

      if (shiftKey && lastIndex !== null) {
        const start = Math.min(lastIndex, index)
        const end = Math.max(lastIndex, index)
        for (let i = start; i <= end; i++) {
          const rangeId = players[i]?._id
          if (rangeId != null) next.add(rangeId)
        }
      } else if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
    lastClickedIndexRef.current = index
  }, [players])

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(players.map((p) => p._id).filter((id): id is number => id != null)))
  }, [players])

  const clear = useCallback(() => {
    setSelectedIds(new Set())
    lastClickedIndexRef.current = null
  }, [])

  const count = useMemo(() => selectedIds.size, [selectedIds])

  return { selectedIds, toggle, selectAll, clear, count }
}
