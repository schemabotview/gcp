import type { Section } from '../types'

export const pubsubModel: Section = {
  id: 'pubsub-model',
  title: 'Pub/Sub topics, subscriptions and fan-out',
  scene: 'events-pubsub',
  focus: 'subs',
  slide: `## Pub/Sub: topics and subscriptions

The orders API **publishes** "order placed" once, to a **topic**. It does not know or care who listens.

### Subscriptions
- Each **subscription** receives **every** message, independently
- **Pull** — workers ask for messages and acknowledge them
- **Push** — Pub/Sub POSTs each message to an HTTPS endpoint
- **Export** — written straight into BigQuery or Cloud Storage

### What this buys
- New consumers join **without** changing the publisher
- A slow consumer delays only **its own** subscription
- Messages wait, up to the retention period, if a consumer is down
- A successful publish means **stored**, not **processed**`,
  narration:
    "When an order is placed, several parts of the business need to know: fulfilment must ship it, the customer needs an email, and the analytics team wants it in their warehouse. The orders API could call each of them, but then it would need to know them all, and fail when any of them failed. Pub/Sub separates the two sides. The orders API publishes one message, order placed, to a topic. It doesn't know who's listening. Listeners attach subscriptions to the topic, and each subscription receives every message, with its own independent delivery state. There are several kinds. The fulfilment subscription is pull: worker processes ask for messages, process them and acknowledge each one. The email subscription is push: Pub/Sub makes an HTTPS request to the email service for each message. The analytics subscription writes straight into a BigQuery table, and the archive subscription batches messages into files in Cloud Storage, with no code at all. This shape buys three things. A new consumer can join by adding a subscription, without touching the publisher. A slow consumer delays only its own subscription, so a backlog in email doesn't slow fulfilment. And if a consumer is down, its messages wait, up to the subscription's retention period, rather than being lost. Note what a successful publish means: the message is stored, not that anyone has processed it yet. Next: exactly what happens to one message on one subscription.",
}
