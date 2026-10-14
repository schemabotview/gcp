import type { Scene } from '@graphlearning/flow'

// §8 — backup policy for the retail app: what is backed up, where copies live, and the restore
// drill that proves it. A vault's enforced retention means even an administrator cannot delete early.
export const operationsBackups: Scene = {
  id: 'operations-backups',
  title: 'Backups you cannot delete, restores you have tested',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'policy',
      kind: 'table',
      label: 'Backup policy (illustrative)',
      headers: ['Data', 'How', 'Kept', 'Where'],
      values: [
        ['orders-db', 'daily backup + PITR logs', '35 days', 'vault in backup project'],
        ['stock VM disk', 'snapshot every 4 h', '14 days', 'multi-region snapshots'],
        ['order exports', 'versioning + retention lock', '7 years', 'separate bucket'],
        ['Terraform state', 'object versioning', '90 versions', 'ops project'],
      ],
    },
    {
      id: 'isolation',
      label: 'Isolation: one mistake must not reach both copies',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'project', label: 'Other project', sub: 'different admins', icon: 'building' },
        { id: 'vault', label: 'Backup vault', sub: 'immutable, indelible', icon: 'lock' },
        { id: 'drill', label: 'Quarterly drill', sub: 'restore, check, time it', icon: 'circlecheck' },
      ],
    },
    {
      id: 'drill-record',
      label: 'Last drill: orders-db (illustrative)',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'd-time', label: 'Restored in 47 min', sub: 'into a scratch project', icon: 'clock' },
        { id: 'd-check', label: 'Totals matched', sub: 'rows and revenue per day', icon: 'scale' },
        { id: 'd-gap', label: 'One gap found', sub: 'runbook step 4 fixed', icon: 'file' },
      ],
    },
  ],
  edges: [
    { source: 'policy', target: 'isolation' },
    { source: 'isolation', target: 'drill-record', label: 'the evidence' },
  ],
}
