import type { Scene } from '@graphlearning/flow'

// §6 — Spanner as a requirements-driven contrast, not an upgrade path. It is chosen when one database
// must take strongly consistent writes at a scale or spread a single PostgreSQL primary cannot.
export const databasesSpanner: Scene = {
  id: 'databases-spanner',
  title: 'When Spanner, and when not',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'what',
      label: 'What Spanner offers',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'sql', label: 'Relational, SQL', sub: 'schemas, joins, transactions', icon: 'table' },
        { id: 'scale-out', label: 'Scales out', sub: 'data split across servers', icon: 'layers' },
        { id: 'external', label: 'External consistency', sub: 'commit order matches real time', icon: 'clock' },
      ],
    },
    {
      id: 'configs',
      label: 'Instance configuration',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'regional', label: 'Regional', sub: 'replicas across zones in one Region', icon: 'building' },
        { id: 'multi', label: 'Multi-region', sub: 'survives a Region; writes travel further', icon: 'globe' },
      ],
    },
    {
      id: 'decide',
      kind: 'table',
      label: 'The retail app: does stock need Spanner?',
      headers: ['If…', 'Then'],
      values: [
        ['one Region, a few thousand orders a minute', 'Cloud SQL is enough'],
        ['reads are the load, writes are modest', 'add read replicas or a cache'],
        ['stock is written in many Regions, never oversold', 'Spanner earns its cost'],
      ],
    },
  ],
  edges: [
    { source: 'what', target: 'configs' },
    { source: 'configs', target: 'decide', label: 'a requirement, not a growth stage' },
  ],
}
