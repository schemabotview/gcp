import type { Scene } from '@graphlearning/flow'

// §7 — Bigtable for click events, and the row-key mistake that makes it slow. Rows are sorted by key,
// so a key that starts with the time sends every new write to the same place.
export const databasesBigtable: Scene = {
  id: 'databases-bigtable',
  title: 'Row keys decide performance',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'keys',
      kind: 'code',
      filename: 'two row-key designs for click events',
      label: `# hot: every new write lands at the end of the key range
2026-10-12T09:30:01#cust901
2026-10-12T09:30:01#cust344
2026-10-12T09:30:02#cust077

# spread: writes go to many ranges; one customer's events stay together
cust077#2026-10-12T09:30:02
cust344#2026-10-12T09:30:01
cust901#2026-10-12T09:30:01`,
    },
    {
      id: 'facts',
      label: 'How Bigtable behaves',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'sorted', label: 'Sorted by key', sub: 'scans read a key range', icon: 'sortarrows' },
        { id: 'one-row', label: 'One-row atomicity', sub: 'no multi-row transactions', icon: 'link' },
        { id: 'nodes', label: 'Throughput', sub: 'add nodes, if keys spread', icon: 'gauge' },
        { id: 'fit', label: 'Fits', sub: 'huge, simple, keyed workloads', icon: 'database' },
      ],
    },
  ],
  edges: [{ source: 'keys', target: 'facts', label: 'the key is the only index' }],
}
