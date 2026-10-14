import type { Course } from '../types'
import { telemetrySignals } from './01-telemetry-signals'
import { monitoringAndInvestigation } from './02-monitoring-and-investigation'
import { auditLogs } from './03-audit-logs'
import { slosAndAlerting } from './04-slos-and-alerting'
import { secretsAndKeys } from './05-secrets-and-keys'
import { securityControls } from './06-security-controls'
import { incidentResponse } from './07-incident-response'
import { backupPolicies } from './08-backup-policies'
import { regionalRecovery } from './09-regional-recovery'
import { quotasAndResilience } from './10-quotas-and-resilience'

// Course 11 — Observability, Security, and Recovery (GCP-COURSE-PLAN.md, chapter 11).
export const operations: Course = {
  id: 'operations',
  title: 'Observability, security and recovery',
  sections: [
    telemetrySignals,
    monitoringAndInvestigation,
    auditLogs,
    slosAndAlerting,
    secretsAndKeys,
    securityControls,
    incidentResponse,
    backupPolicies,
    regionalRecovery,
    quotasAndResilience,
  ],
}
