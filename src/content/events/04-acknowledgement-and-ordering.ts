import type { Section } from '../types'

export const acknowledgementAndOrdering: Section = {
  id: 'acknowledgement-and-ordering',
  title: 'Acknowledgement, redelivery, ordering and exactly-once',
  scene: 'events-delivery',
  focus: 'd4',
  slide: `## Acknowledgement and redelivery

A delivered message must be **acknowledged** before its **ack deadline** — 10 seconds by default — or Pub/Sub delivers it **again**.

### At least once
- Redelivery can go to a **different** worker
- So every consumer must expect **duplicates**
- Long work can **extend** the deadline, up to 10 minutes
- A **nack** asks for redelivery straight away

### Ordering keys
- Messages with the same key arrive **in order**, when published to the same region
- There is no order **across** keys, and a slow key holds up its own queue

### Exactly-once delivery
- A feature of **pull** subscriptions, within a region
- It stops redelivery after a successful ack — not **publisher** duplicates, and not your side effects`,
  narration:
    "Let's follow one message through one subscription. Pub/Sub delivers it to a worker, and the acknowledgement deadline starts, ten seconds by default and extendable up to ten minutes. The worker does its job and acknowledges the message, and Pub/Sub removes it from that subscription. That's the happy path. Now suppose the acknowledgement doesn't arrive in time, because the worker crashed, was slow, or the ack was lost on the network. Pub/Sub assumes the message wasn't handled and delivers it again, possibly to a different worker. A worker that knows it can't finish can nack the message, asking for redelivery straight away. That's what at-least-once delivery means, and it's why every consumer must expect duplicates. Two features change the guarantees, each with clear limits. Ordering keys: messages published with the same key, such as the order id, are delivered in the order they were published, as long as they were published to the same region. There's no ordering across different keys, and one slow key holds up the messages queued behind it. Exactly-once delivery is a subscription setting for pull subscriptions, within a region. It guarantees that once a message has been successfully acknowledged, it won't be redelivered. Read that boundary carefully. It doesn't stop a publisher from publishing the same order twice after a retry, and it can't make your database write and your acknowledgement a single atomic act. Next: routing events from Google services themselves.",
}
