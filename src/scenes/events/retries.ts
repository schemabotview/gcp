import type { Scene } from '@graphlearning/flow'

// §8 — duplicate fulfilment, traced. The worker commits the shipment, then the ack is lost, so the
// message comes back. An idempotency key turns the second delivery into a no-op; poison messages go
// to a dead-letter topic after a set number of attempts.
export const eventsRetries: Scene = {
  id: 'events-retries',
  title: 'The write succeeded; the ack did not',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'trace',
      label: 'One message, two deliveries',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'r1', label: '1 · Delivered', sub: 'msg 7731: ship order 58213', icon: 'bell' },
        { id: 'r2', label: '2 · Committed', sub: 'shipment row written', icon: 'database' },
        { id: 'r3', label: '3 · Ack lost', sub: 'deadline passes; no ack seen', icon: 'ban' },
        { id: 'r4', label: '4 · Redelivered', sub: 'same order, second worker', icon: 'repeat' },
      ],
    },
    {
      id: 'guard',
      kind: 'code',
      filename: 'idempotent handler',
      label: `def handle(msg):
    order_id = msg.attributes["order_id"]          # the idempotency key
    with db.transaction():
        if db.exists("processed", key=order_id):
            return msg.ack()                       # seen before: do nothing
        book_shipment(order_id)
        db.insert("processed", key=order_id)
    msg.ack()`,
    },
    {
      id: 'safety',
      label: 'When a message keeps failing',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'dlq', label: 'Dead-letter topic', sub: 'after 5–100 attempts', icon: 'trash' },
        { id: 'alert', label: 'Alert', sub: 'someone looks at it', icon: 'bell' },
        { id: 'replay', label: 'Replay', sub: 'seek, or re-publish when fixed', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'trace', target: 'guard', label: 'make step 2 safe to repeat' },
    { source: 'guard', target: 'safety' },
  ],
}
