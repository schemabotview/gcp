import type { Section } from '../types'

export const backupPolicies: Section = {
  id: 'backup-policies',
  title: 'Backup policies, isolated copies and restore validation',
  scene: 'operations-backups',
  focus: 'vault',
  slide: `## Backup policies and isolated copies

A **backup policy** says what is copied, how often, for how long, and **where**. Where matters most when the threat is a person.

### The retail policy
- Orders database: daily backups plus point-in-time logs, **35 days**
- Stock disk: snapshots every **4 hours**; exports: kept **7 years**

### Isolation
- Copies live in a **separate project**, with different administrators
- A **backup vault** is immutable and **indelible** until its retention ends
- Even an administrator cannot delete a vaulted backup early

### Validation
- A quarterly **restore drill**: restore, check totals, record the time`,
  narration:
    "Chapter six showed that replication isn't backup. This section asks a harder question: would your backups survive the incident we just handled? If a compromised Owner account can delete the backups along with the database, they aren't much of a safety net. A backup policy writes down what's copied, how often, how long it's kept, and where. For the retail application, the orders database gets daily backups plus point-in-time recovery logs, kept for thirty five days. The stock disk is snapshotted every four hours. Order exports sit in a bucket with versioning and a locked retention policy, for seven years. And Terraform state keeps ninety versions in the operations project. Now isolation. The copies live in a separate project with different administrators, so one compromised account doesn't reach both the data and its backups. Google's Backup and DR service adds backup vaults, which are immutable and indelible: a backup in a vault can't be changed, and can't be deleted before its enforced retention period ends, even by an administrator. That's exactly the property you want against an attacker or a panicked mistake. Then validation. Every quarter, the team restores the orders database into a scratch project, checks row counts and totals against the source, and records how long the restore took. That time feeds directly into the next section, because a recovery plan is only as fast as its slowest tested restore. Next: recovering a whole Region.",
}
