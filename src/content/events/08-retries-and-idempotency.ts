import type { Section } from '../types'

export const retriesAndIdempotency: Section = {
  id: 'retries-and-idempotency',
  title: 'Retries, idempotency, dead-letter handling and replay',
  scene: 'events-retries',
  focus: 'r3',
  slide: `## Retries, idempotency and dead letters

The worker **committed** the shipment, then its acknowledgement was **lost**. Pub/Sub, correctly, delivers the message again.

### Idempotency
- Give each piece of work a **key** — here, the order id
- Record the key in the **same** transaction as the work
- A repeat delivery finds the key and does **nothing**
- Keep keys longer than the **longest** redelivery window

### Who retries?
- Pub/Sub redelivers; Cloud Tasks retries; client libraries retry calls
- Know which layer retries, so they do not **multiply**

### Messages that never succeed
- After **5–100** attempts, move them to a **dead-letter topic**
- Alert, fix, then **replay** — by seeking or re-publishing`,
  narration:
    "Here's the partial failure every event-driven system meets. A worker receives message seven seven three one: ship order five eight two one three. It books the shipment and commits the row. Then, before its acknowledgement reaches Pub/Sub, the network drops it, or the worker is stopped. The deadline passes, and Pub/Sub, doing exactly what it promised, delivers the message again to another worker. Without protection, the customer gets two parcels. The protection is idempotency. Give each piece of work a key, here the order id, and record that key in the same database transaction as the work itself. The handler on the left checks for the key first. On the second delivery, it finds the key, does nothing, and acknowledges. Because the key and the shipment commit together, there's no gap between them for a failure to fall into. Next, know who retries. Pub/Sub redelivers unacknowledged messages. Cloud Tasks retries failed tasks. Client libraries retry failed API calls. Stack them carelessly and one failure becomes dozens of attempts. Finally, some messages will never succeed, perhaps because the order id doesn't exist. Rather than retrying forever, a subscription can move a message to a dead-letter topic after a set number of attempts, between five and a hundred. Alert on that topic, fix the cause, then replay, by seeking the subscription back in time or re-publishing. Next: surges.",
}
