import { useState, useCallback } from 'react'
import type { DerivedPlayer } from '@/types/player.ts'

const MAX_PLAYERS = 4

export function usePlayerComparison() {
  const [selectedPlayers, setSelectedPlayers] = useState<DerivedPlayer[]>([])

  const addPlayer = useCallback((player: DerivedPlayer) => {
    setSelectedPlayers((prev) => {
      if (prev.length >= MAX_PLAYERS) return prev
      // Avoid duplicates by name + club
      const isDuplicate = prev.some(
        (p) => p.Jogador === player.Jogador && p.Clube === player.Clube,
      )
      if (isDuplicate) return prev
      return [...prev, player]
    })
  }, [])

  const removePlayer = useCallback((index: number) => {
    setSelectedPlayers((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedPlayers([])
  }, [])

  return { selectedPlayers, addPlayer, removePlayer, clearSelection }
}
