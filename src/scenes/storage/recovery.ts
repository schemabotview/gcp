import type { Scene } from '@graphlearning/flow'

// §7 — why replication is not a backup. A bad deploy corrupts rows on a regional disk; the corruption
// is replicated in seconds. Only a copy from BEFORE the change gets the data back, and only a tested
// restore proves that it does. Times illustrative.
export const storageRecovery: Scene = {
  id: 'storage-recovery',
  title: 'Replicated is not recoverable',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'incident',
      label: 'A bad change, faithfully replicated',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'i1', label: '02:00 snapshot', sub: 'scheduled; incremental', icon: 'clock' },
        { id: 'i2', label: '09:14 bad deploy', sub: 'overwrites stock levels', icon: 'zap' },
        { id: 'i3', label: '09:14 replicated', sub: 'both zones now wrong', icon: 'copy' },
      ],
    },
    {
      id: 'restore',
      kind: 'code',
      filename: 'restore beside, never over',
      label: `gcloud compute disks create stock-restore-0914 \\
    --source-snapshot stock-disk-0200 --zone europe-west2-b
# attach to a test VM, check row counts and totals, then decide;
# changes after 02:00 must be replayed or accepted as lost`,
    },
    {
      id: 'claims',
      label: 'Different claims, different evidence',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'replication', label: 'Replication', sub: 'survives losing a copy', icon: 'copy' },
        { id: 'backup', label: 'Backup', sub: 'an older copy, kept apart', icon: 'history' },
        { id: 'tested', label: 'Tested restore', sub: 'timed, checked, recorded', icon: 'circlecheck' },
        { id: 'rpo', label: 'Data lost', sub: 'since the last good copy', icon: 'ruler' },
      ],
    },
  ],
  edges: [
    { source: 'incident', target: 'restore', label: 'only the 02:00 copy predates it' },
    { source: 'restore', target: 'claims' },
  ],
}
