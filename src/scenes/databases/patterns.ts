import type { Scene } from '@graphlearning/flow'

// §1 — the retail app's data, sorted by access pattern before any product is named. Each kind of
// data has one owning service; the database follows from the pattern, not the other way round.
export const databasesPatterns: Scene = {
  id: 'databases-patterns',
  title: 'Access patterns first, databases second',
  flow: 'TB',
  nodes: [
    {
      id: 'map',
      kind: 'table',
      label: "The retail app's data, by access pattern",
      headers: ['Data', 'Access pattern', 'Needs', 'Starting point'],
      values: [
        ['Orders, payments', 'multi-row writes, joins', 'transactions', 'Cloud SQL for PostgreSQL'],
        ['Product catalogue', 'read a document by id', 'flexible schema', 'Firestore'],
        ['Sessions, hot reads', 'key lookup, milliseconds', 'speed, not durability', 'Memorystore'],
        ['Click events', 'huge write rate by key', 'throughput', 'Bigtable, if it grows'],
        ['Global stock', 'writes in many Regions', 'strong consistency', 'Spanner, if required'],
      ],
    },
    {
      id: 'questions',
      label: 'Ask before choosing',
      pattern: 'user',
      cols: 2,
      children: [
        { id: 'q-tx', label: 'Transactions?', sub: 'what must change together', icon: 'link' },
        { id: 'q-shape', label: 'Query shape?', sub: 'joins, lookups, or scans', icon: 'search' },
        { id: 'q-scale', label: 'Scale?', sub: 'rows, writes per second, Regions', icon: 'gauge' },
        { id: 'q-owner', label: 'Owner?', sub: 'one service owns each dataset', icon: 'usercheck' },
      ],
    },
  ],
  edges: [{ source: 'map', target: 'questions', label: 'the right-hand column follows from these' }],
}
