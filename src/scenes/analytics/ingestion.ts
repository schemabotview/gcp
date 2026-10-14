import type { Scene } from '@graphlearning/flow'

// §2 — two ways to move order data, and the check that proves either worked. Datastream reads the
// database's change log; a nightly export copies a snapshot. Counts illustrative.
export const analyticsIngestion: Scene = {
  id: 'analytics-ingestion',
  title: 'Batch exports and change data capture',
  flow: 'TB',
  stretch: true,
  padding: 0.17,
  nodes: [
    {
      id: 'methods',
      label: 'Two ways to move the data',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'batch', label: 'Nightly export', sub: 'a snapshot; hours old; simple', icon: 'calendar' },
        { id: 'cdc', label: 'Datastream CDC', sub: 'reads the change log; minutes old', icon: 'repeat' },
      ],
    },
    {
      id: 'reconcile',
      kind: 'code',
      filename: 'reconciliation — 2026-10-12',
      label: `source  (Cloud SQL)   orders placed: 18,442   total: £612,305.10
target  (BigQuery)    orders placed: 18,439   total: £612,198.40
difference                            3        £106.70
# 3 orders committed at 23:59:58 arrived after the cut-off: re-run,
# then compare again before publishing the daily report`,
    },
    {
      id: 'limits',
      label: 'What a delivered row does and does not prove',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'arrived', label: 'Arrived', sub: 'the change reached the target', icon: 'circlecheck' },
        { id: 'correct', label: 'Not yet correct', sub: 'late, duplicate, or partial days', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'methods', target: 'reconcile', label: 'either way, check' },
    { source: 'reconcile', target: 'limits' },
  ],
}
