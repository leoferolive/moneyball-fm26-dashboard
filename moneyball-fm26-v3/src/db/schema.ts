import Dexie, { type EntityTable } from 'dexie'
import type { DerivedPlayer } from '@/types/player.ts'
import type { ScoringProfile } from '@/types/scoring.ts'

interface Settings {
  key: string
  value: string
}

const db = new Dexie('MoneyballFM26') as Dexie & {
  players: EntityTable<DerivedPlayer, 'id'>
  scoringProfiles: EntityTable<ScoringProfile, 'id'>
  settings: EntityTable<Settings, 'key'>
}

db.version(1).stores({
  players: '++_id, _position, Jogador, Clube, [_position+Jogador]',
  scoringProfiles: 'id, positionKey, [positionKey+name]',
  settings: 'key',
})

export { db }
export type { Settings }
