import { db } from './schema.ts'
import type { DerivedPlayer } from '@/types/player.ts'
import type { PositionKey } from '@/types/position.ts'

/** Add players for a position (replaces existing) */
export async function setPlayersForPosition(
  position: PositionKey,
  players: DerivedPlayer[],
): Promise<void> {
  await db.transaction('rw', db.players, async () => {
    // Clear existing players for this position
    await db.players.where('_position').equals(position).delete()
    // Bulk add new players
    await db.players.bulkAdd(players)
  })
}

/** Get all players for a position */
export async function getPlayersForPosition(
  position: PositionKey,
): Promise<DerivedPlayer[]> {
  return db.players.where('_position').equals(position).toArray()
}

/** Clear all players for a position */
export async function clearPosition(position: PositionKey): Promise<void> {
  await db.players.where('_position').equals(position).delete()
}

/** Clear all players */
export async function clearAllPlayers(): Promise<void> {
  await db.players.clear()
}

/** Get player counts per position */
export async function getPositionCounts(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {}
  const all = await db.players.toArray()
  for (const player of all) {
    counts[player._position] = (counts[player._position] || 0) + 1
  }
  return counts
}

/** Get total player count */
export async function getTotalPlayerCount(): Promise<number> {
  return db.players.count()
}
