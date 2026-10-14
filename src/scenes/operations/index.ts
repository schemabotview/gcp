import type { Scene } from '@graphlearning/flow'
import { operationsSignals } from './signals'
import { operationsInvestigation } from './investigation'
import { operationsAudit } from './audit'
import { operationsSlos } from './slos'
import { operationsSecrets } from './secrets'
import { operationsSecurity } from './security'
import { operationsIncident } from './incident'
import { operationsBackups } from './backups'
import { operationsRecovery } from './recovery'
import { operationsResilience } from './resilience'

// Course 11 scene bundle, spread into src/scenes/index.ts.
export const operationsScenes: Scene[] = [
  operationsSignals,
  operationsInvestigation,
  operationsAudit,
  operationsSlos,
  operationsSecrets,
  operationsSecurity,
  operationsIncident,
  operationsBackups,
  operationsRecovery,
  operationsResilience,
]
