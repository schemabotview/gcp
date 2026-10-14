import type { Scene } from '@graphlearning/flow'
import { databasesPatterns } from './patterns'
import { databasesCloudSql } from './cloud-sql'
import { databasesTransactions } from './transactions'
import { databasesAvailability } from './availability'
import { databasesFirestore } from './firestore'
import { databasesSpanner } from './spanner'
import { databasesBigtable } from './bigtable'
import { databasesCache } from './cache'

// Course 7 scene bundle, spread into src/scenes/index.ts.
export const databasesScenes: Scene[] = [
  databasesPatterns,
  databasesCloudSql,
  databasesTransactions,
  databasesAvailability,
  databasesFirestore,
  databasesSpanner,
  databasesBigtable,
  databasesCache,
]
