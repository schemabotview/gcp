import type { Course } from '../types'
import { accessPatterns } from './01-access-patterns'
import { cloudSqlAndAlloydb } from './02-cloud-sql-and-alloydb'
import { transactionsAndConnections } from './03-transactions-and-connections'
import { availabilityAndBackups } from './04-availability-and-backups'
import { firestore } from './05-firestore'
import { spanner } from './06-spanner'
import { bigtable } from './07-bigtable'
import { cachingAndMigration } from './08-caching-and-migration'

// Course 7 — Databases and Application State (GCP-COURSE-PLAN.md, chapter 7).
export const databases: Course = {
  id: 'databases',
  title: 'Databases and application state',
  sections: [
    accessPatterns,
    cloudSqlAndAlloydb,
    transactionsAndConnections,
    availabilityAndBackups,
    firestore,
    spanner,
    bigtable,
    cachingAndMigration,
  ],
}
