import type { Scene } from '@graphlearning/flow'

// §3 — one order-placed message, many independent consumers. Each subscription gets its own copy and
// its own delivery state; the publisher knows none of them.
export const eventsPubsub: Scene = {
  id: 'events-pubsub',
  title: 'One topic, many subscriptions',
  flow: 'TB',
  stretch: true,
  nodes: [
    { id: 'publisher', label: 'Orders API', sub: 'publishes order-placed', pattern: 'user', icon: 'boxes' },
    { id: 'topic', label: 'Topic', sub: 'orders.placed', pattern: 'network', icon: 'share' },
    {
      id: 'subs',
      label: 'Subscriptions: each gets every message',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'sub-fulfil', label: 'fulfilment (pull)', sub: 'workers pull and acknowledge', icon: 'workflow' },
        { id: 'sub-email', label: 'email (push)', sub: 'Pub/Sub POSTs to a service', icon: 'bell' },
        { id: 'sub-bq', label: 'analytics (BigQuery)', sub: 'written straight to a table', icon: 'table' },
        { id: 'sub-archive', label: 'archive (Storage)', sub: 'batched into files', icon: 'box' },
      ],
    },
  ],
  edges: [
    { source: 'publisher', target: 'topic', label: 'publish once' },
    { source: 'topic', target: 'subs', label: 'fan out: a copy per subscription' },
  ],
}
