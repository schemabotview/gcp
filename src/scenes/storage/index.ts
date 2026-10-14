import type { Scene } from '@graphlearning/flow'
import { storageInterfaces } from './interfaces'
import { storageBuckets } from './buckets'
import { storageAccess } from './access'
import { storageConsistency } from './consistency'
import { storageLifecycle } from './lifecycle'
import { storageDisks } from './disks'
import { storageRecovery } from './recovery'

// Course 6 scene bundle, spread into src/scenes/index.ts.
export const storageScenes: Scene[] = [
  storageInterfaces,
  storageBuckets,
  storageAccess,
  storageConsistency,
  storageLifecycle,
  storageDisks,
  storageRecovery,
]
