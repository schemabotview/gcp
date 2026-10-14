import type { Scene } from '@graphlearning/flow'

// §8 — cache-aside with Memorystore, and the stale window it creates when a price changes. Then the
// shape of a database migration: copy, keep in step, cut over, with a way back.
export const databasesCache: Scene = {
  id: 'databases-cache',
  title: 'Caches go stale; migrations need a way back',
  flow: 'TB',
  stretch: true,
  padding: 0.17,
  nodes: [
    {
      id: 'stale',
      label: 'A price change and a cached product page',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'c1', label: '09:00 cached', sub: '£39.00, TTL 10 min', icon: 'memory' },
        { id: 'c2', label: '09:02 price update', sub: 'database says £29.00', icon: 'database' },
        { id: 'c3', label: '09:02–09:10 stale', sub: 'cache still serves £39.00', icon: 'clock' },
        { id: 'c4', label: 'Fix', sub: 'delete the key on write; keep a TTL', icon: 'trash' },
      ],
    },
    {
      id: 'migrate',
      label: 'Moving a database: copy, keep in step, cut over',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'm1', label: '1 · Full copy', sub: 'initial load to the target', icon: 'copy' },
        { id: 'm2', label: '2 · Replicate', sub: 'stream changes; watch the lag', icon: 'repeat' },
        { id: 'm3', label: '3 · Cut over', sub: 'stop writes, drain, switch', icon: 'swap' },
        { id: 'm4', label: '4 · Way back', sub: 'decided before, not during', icon: 'history' },
      ],
    },
  ],
  edges: [{ source: 'stale', target: 'migrate', label: 'both are about which copy is true' }],
}
