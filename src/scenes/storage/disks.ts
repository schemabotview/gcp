import type { Scene } from '@graphlearning/flow'

// §6 — block and file options for VMs, compared by what they trade. Local SSD is listed because it is
// fast and tempting, and is the one that does not persist.
export const storageDisks: Scene = {
  id: 'storage-disks',
  title: 'Disks and file shares',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Choosing storage for a VM',
      headers: ['Option', 'Scope', 'Performance', 'Persists?'],
      values: [
        ['Persistent Disk', 'zonal or regional', 'grows with size', 'yes'],
        ['Hyperdisk Balanced', 'zonal', 'provisioned', 'yes'],
        ['Local SSD', 'one VM', 'fixed, fastest', 'no'],
        ['Filestore', 'zonal or regional', 'tier and size', 'yes, shared'],
      ],
    },
    {
      id: 'questions',
      label: 'Questions that decide it',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'q-share', label: 'Shared?', sub: 'many writers: file, not block', icon: 'users' },
        { id: 'q-perf', label: 'Performance', sub: 'tied to size, or provisioned', icon: 'gauge' },
        { id: 'q-zone', label: 'Zone loss', sub: 'regional disk, or restore', icon: 'layers' },
      ],
    },
    {
      id: 'choices',
      label: "The retail app's choices",
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'c-db', label: 'Stock DB VM', sub: 'Hyperdisk Balanced: IOPS without size', icon: 'database' },
        { id: 'c-cache', label: 'Image cache', sub: 'Local SSD: rebuildable', icon: 'zap' },
        { id: 'c-labels', label: 'Label templates', sub: 'Filestore: many readers', icon: 'folder' },
      ],
    },
  ],
  edges: [
    { source: 'compare', target: 'questions' },
    { source: 'questions', target: 'choices' },
  ],
}
