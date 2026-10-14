import type { Scene } from '@graphlearning/flow'

// §1 — the same orders, asked two different questions. The operational table holds current state for
// one order at a time; the analytical side holds history for millions of rows at once. The path
// between them is the chapter.
export const analyticsTwoShapes: Scene = {
  id: 'analytics-two-shapes',
  title: 'Current state versus history',
  flow: 'TB',
  stretch: true,
  padding: 0.17,
  nodes: [
    {
      id: 'questions',
      kind: 'table',
      label: 'Two kinds of question about orders',
      headers: ['', 'Operational', 'Analytical'],
      values: [
        ['Example', 'is order 58213 paid?', 'revenue by category, by week'],
        ['Reads', 'one row, by key', 'millions of rows, a few columns'],
        ['Holds', 'current state', 'history of changes'],
        ['Freshness', 'this second', 'minutes or hours is fine'],
      ],
    },
    {
      id: 'path',
      label: 'From order changes to an answer',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'p-sql', label: '1 · Cloud SQL', sub: 'orders, as they change', icon: 'database' },
        { id: 'p-capture', label: '2 · Capture', sub: 'CDC or exports', icon: 'copy' },
        { id: 'p-process', label: '3 · Process', sub: 'clean, join, aggregate', icon: 'gears' },
        { id: 'p-bq', label: '4 · BigQuery', sub: 'queried by analysts', icon: 'table' },
      ],
    },
    {
      id: 'rule',
      label: 'Keep them apart',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'no-reports', label: 'Not on the primary', sub: 'big scans slow checkout', icon: 'ban' },
        { id: 'reconcile', label: 'Reconcile', sub: 'counts and totals must agree', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'questions', target: 'path' },
    { source: 'path', target: 'rule' },
  ],
}
