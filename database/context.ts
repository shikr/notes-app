import { AsyncLocalStorage } from 'node:async_hooks'

import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import type * as schema from './schema'

export const DatabaseContext = new AsyncLocalStorage<PostgresJsDatabase<typeof schema>>()

export function database() {
  const db = DatabaseContext.getStore()
  if (!db) {
    // biome-ignore lint/security/noSecrets: This error message does not expose any sensitive information.
    throw new Error('DatabaseContext not set')
  }
  return db
}

export type Database = PostgresJsDatabase<typeof schema>
