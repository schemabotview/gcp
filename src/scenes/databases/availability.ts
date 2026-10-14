import type { Scene } from '@graphlearning/flow'

// §4 — four features that are often confused because each "has another copy". Each answers a
// different failure; the replica-lag card shows why a read replica is not a source of truth.
export const databasesAvailability: Scene = {
  id: 'databases-availability',
  title: 'HA, replicas, backups, maintenance',
  flow: 'TB',
  nodes: [
    {
      id: 'features',
      kind: 'table',
      label: 'Four features, four different failures',
      headers: ['Feature', 'How', 'Protects against', 'Does not'],
      values: [
        ['High availability', 'standby in a 2nd zone', 'zone or instance failure', 'scale reads, undo writes'],
        ['Read replica', 'asynchronous copy', 'read load', 'promise fresh data'],
        ['Backups + PITR', 'snapshots plus logs', 'bad writes, deletion', 'restore instantly'],
        ['Maintenance window', 'you pick the hour', 'surprise restarts', 'remove the restart'],
      ],
    },
    {
      id: 'lag',
      kind: 'code',
      filename: 'a customer pays, then refreshes (illustrative)',
      label: `12:00:00.000  primary   INSERT order 58213 status='paid'      COMMIT
12:00:00.150  replica   SELECT status FROM orders WHERE id=58213 → 'placed'
12:00:01.900  replica   applies the change                       → 'paid'
# reads that must see your own write go to the primary`,
    },
    {
      id: 'app',
      label: "The application's share of availability",
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'reconnect', label: 'Reconnect', sub: 'retry with backoff after failover', icon: 'repeat' },
        { id: 'route', label: 'Route reads', sub: 'primary when freshness matters', icon: 'share' },
        { id: 'test', label: 'Test failover', sub: 'trigger one before you need it', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [
    { source: 'features', target: 'lag', label: 'row 2, in practice' },
    { source: 'lag', target: 'app', label: 'so the application must' },
  ],
}
