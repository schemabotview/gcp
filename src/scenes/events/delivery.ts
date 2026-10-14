import type { Scene } from '@graphlearning/flow'

// §4 — what Pub/Sub promises about delivery, and the boundaries of each promise. Exactly-once is a
// subscription feature with conditions; it does not reach publisher duplicates or your side effects.
export const eventsDelivery: Scene = {
  id: 'events-delivery',
  title: 'Acknowledge, or it comes back',
  flow: 'TB',
  nodes: [
    {
      id: 'cycle',
      label: 'One message, one subscription',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'd1', label: '1 · Delivered', sub: 'ack deadline starts: 10 s default', icon: 'bell' },
        { id: 'd2', label: '2 · Processed', sub: 'your code does the work', icon: 'gears' },
        { id: 'd3', label: '3 · Acknowledged', sub: 'removed from the subscription', icon: 'circlecheck' },
        { id: 'd4', label: 'Or: no ack in time', sub: 'redelivered, possibly elsewhere', icon: 'repeat' },
      ],
    },
    {
      id: 'promises',
      kind: 'table',
      label: 'Promises, and where they stop',
      headers: ['Feature', 'Gives you', 'Does not cover'],
      values: [
        ['Default delivery', 'at least once', 'duplicates: expect them'],
        ['Ordering keys', 'order per key, same region', 'order across keys'],
        ['Exactly-once', 'no redelivery after a successful ack', 'push; publisher duplicates; your writes'],
      ],
    },
  ],
  edges: [{ source: 'cycle', target: 'promises' }],
}
