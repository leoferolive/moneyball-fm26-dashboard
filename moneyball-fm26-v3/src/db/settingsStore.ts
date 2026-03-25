import { db } from './schema.ts'

/** Get a setting value */
export async function getSetting(key: string): Promise<string | undefined> {
  const row = await db.settings.get(key)
  return row?.value
}

/** Set a setting value */
export async function setSetting(key: string, value: string): Promise<void> {
  await db.settings.put({ key, value })
}

/** Delete a setting */
export async function deleteSetting(key: string): Promise<void> {
  await db.settings.delete(key)
}
