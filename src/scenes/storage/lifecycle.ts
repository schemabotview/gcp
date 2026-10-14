import type { Scene } from '@graphlearning/flow'

// §5 — what happens to an order export over its life: class transitions by lifecycle rule, then an
// accidental delete, and which protection gets it back. Storage-class minimums are Google's
// documented minimum storage durations.
export const storageLifecycle: Scene = {
  id: 'storage-lifecycle',
  title: 'Classes, lifecycle and protection',
  flow: 'TB',
  nodes: [
    {
      id: 'classes',
      kind: 'table',
      label: 'Storage classes: same API, different price shape',
      headers: ['Class', 'Minimum duration', 'Retrieval fee', 'Fits'],
      values: [
        ['Standard', 'none', 'no', 'hot data, product images'],
        ['Nearline', '30 days', 'yes', 'read about monthly'],
        ['Coldline', '90 days', 'yes', 'read about quarterly'],
        ['Archive', '365 days', 'yes', 'kept for audits'],
      ],
    },
    {
      id: 'protect',
      label: 'If someone deletes orders-2026-09.csv',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'versioning', label: 'Versioning', sub: 'old version kept as noncurrent', icon: 'history' },
        { id: 'soft', label: 'Soft delete', sub: 'restorable for 7 days by default', icon: 'trash' },
        { id: 'retention', label: 'Retention policy', sub: 'deletion refused until age', icon: 'lock' },
        { id: 'hold', label: 'Object hold', sub: 'pinned for legal review', icon: 'ban' },
      ],
    },
  ],
  edges: [{ source: 'classes', target: 'protect', label: 'lifecycle rules move and delete; these protect' }],
}
