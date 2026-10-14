import type { Course } from '../types'
import { storageInterfaces } from './01-storage-interfaces'
import { bucketsAndObjects } from './02-buckets-and-objects'
import { accessAndSignedUrls } from './03-access-and-signed-urls'
import { consistencyAndPreconditions } from './04-consistency-and-preconditions'
import { classesAndProtection } from './05-classes-and-protection'
import { disksAndFilestore } from './06-disks-and-filestore'
import { backupsAndRestore } from './07-backups-and-restore'

// Course 6 — Storage and Data Protection (GCP-COURSE-PLAN.md, chapter 6).
export const storage: Course = {
  id: 'storage',
  title: 'Storage and data protection',
  sections: [
    storageInterfaces,
    bucketsAndObjects,
    accessAndSignedUrls,
    consistencyAndPreconditions,
    classesAndProtection,
    disksAndFilestore,
    backupsAndRestore,
  ],
}
