import { db } from './schema.ts'
import type { ScoringProfile } from '@/types/scoring.ts'
import type { PositionKey } from '@/types/position.ts'

/** Save a scoring profile (insert or update) */
export async function saveProfile(profile: ScoringProfile): Promise<void> {
  await db.scoringProfiles.put(profile)
}

/** Get all profiles for a position */
export async function getProfilesForPosition(
  position: PositionKey,
): Promise<ScoringProfile[]> {
  return db.scoringProfiles.where('positionKey').equals(position).toArray()
}

/** Get a single profile by ID */
export async function getProfile(id: string): Promise<ScoringProfile | undefined> {
  return db.scoringProfiles.get(id)
}

/** Delete a profile */
export async function deleteProfile(id: string): Promise<void> {
  await db.scoringProfiles.delete(id)
}

/** Get all profiles */
export async function getAllProfiles(): Promise<ScoringProfile[]> {
  return db.scoringProfiles.toArray()
}
