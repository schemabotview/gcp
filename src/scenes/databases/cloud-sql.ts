import type { Scene } from '@graphlearning/flow'

// §2 — managed PostgreSQL, and the line between what Google runs and what stays yours. AlloyDB is the
// same engine family with a different architecture, for when Cloud SQL's limits are the problem.
export const databasesCloudSql: Scene = {
  id: 'databases-cloud-sql',
  title: 'Managed PostgreSQL: whose job is what',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'split',
      label: 'Cloud SQL for PostgreSQL  ·  orders-db',
      pattern: 'service',
      cols: 2,
      children: [
        {
          id: 'google',
          label: 'Google runs',
          pattern: 'network',
          cols: 1,
          children: [
            { id: 'g-patch', label: 'Patching', sub: 'in your maintenance window', icon: 'wrench' },
            { id: 'g-backup', label: 'Backups', sub: 'automated, plus logs for PITR', icon: 'history' },
            { id: 'g-ha', label: 'Failover', sub: 'to a standby, if HA is on', icon: 'repeat' },
          ],
        },
        {
          id: 'yours',
          label: 'Still yours',
          pattern: 'user',
          cols: 1,
          children: [
            { id: 'y-schema', label: 'Schema, indexes', sub: 'and the queries using them', icon: 'table' },
            { id: 'y-conn', label: 'Connections', sub: 'pool sizes, limits', icon: 'plug' },
            { id: 'y-users', label: 'Users, grants', sub: 'inside the database', icon: 'key' },
          ],
        },
      ],
    },
    {
      id: 'alloy',
      label: 'When to look at AlloyDB for PostgreSQL',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'a-scale', label: 'Heavier load', sub: 'storage scaled apart from compute', icon: 'layers' },
        { id: 'a-columnar', label: 'Mixed analytics', sub: 'columnar engine for scans', icon: 'barchart' },
        { id: 'a-same', label: 'Same skills', sub: 'PostgreSQL-compatible', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [{ source: 'split', target: 'alloy', label: 'when Cloud SQL is the limit' }],
}
