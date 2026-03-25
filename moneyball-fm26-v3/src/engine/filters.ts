/**
 * Filter pipeline for player data.
 * Pure function: takes data + filter state, returns filtered data.
 */

import type { DerivedPlayer } from '@/types/player.ts'
import type { FilterState } from '@/types/filters.ts'

/** Apply all active filters to a player array */
export function applyFilters(
  players: DerivedPlayer[],
  filters: FilterState,
): DerivedPlayer[] {
  return players.filter((player) => {
    // Text search (player name or club)
    if (filters.search) {
      const term = filters.search.toLowerCase()
      const name = (player.Jogador || '').toLowerCase()
      const club = (player.Clube || '').toLowerCase()
      if (!name.includes(term) && !club.includes(term)) return false
    }

    // Age range
    if (filters.ageRange) {
      const [minAge, maxAge] = filters.ageRange
      if (player.Idade < minAge || player.Idade > maxAge) return false
    }

    // Minimum minutes (expressed as games/90)
    if (filters.minutesMin !== null) {
      if (player.Jogos90 * 90 < filters.minutesMin) return false
    }

    // Score range
    if (filters.scoreRange && player._customScore !== undefined) {
      const [minScore, maxScore] = filters.scoreRange
      if (player._customScore < minScore || player._customScore > maxScore) return false
    }

    // Clubs
    if (filters.clubs.length > 0) {
      if (!filters.clubs.includes(player.Clube || '')) return false
    }

    // Nationalities
    if (filters.nationalities.length > 0) {
      if (!filters.nationalities.includes(player.Nação || '')) return false
    }

    // FM Rating minimum
    if (filters.fmRatingMin !== null) {
      if (player.NotaFM < filters.fmRatingMin) return false
    }

    return true
  })
}

/** Extract unique club names from player data */
export function extractClubs(players: DerivedPlayer[]): string[] {
  return [...new Set(players.map((p) => p.Clube || '').filter(Boolean))].sort()
}

/** Extract unique nationality names from player data */
export function extractNationalities(players: DerivedPlayer[]): string[] {
  return [...new Set(players.map((p) => p.Nação || '').filter(Boolean))].sort()
}
