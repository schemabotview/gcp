import type { Section } from '../types'

export const tasksVersusPubsub: Section = {
  id: 'tasks-versus-pubsub',
  title: 'Cloud Tasks versus Pub/Sub',
  scene: 'events-tasks',
  focus: 'compare',
  slide: `## Cloud Tasks versus Pub/Sub

Both carry work asynchronously. The difference is **who decides** where the work goes.

### Pub/Sub — distribute an event
- **Implicit**: the publisher announces; subscribers decide to care
- **Fan-out** to any number of subscriptions
- Rate is controlled by the **subscriber**

### Cloud Tasks — dispatch a job
- **Explicit**: each task names its one **target**
- The **queue** sets a dispatch rate and retry policy
- Tasks can be **scheduled** and deduplicated by name

### In the retail app
- "Order placed" is an event; "book this pickup" is a task
- The carrier's **rate limit** lives in the queue, not in worker code
- Both retry, so both targets must be **safe to repeat**`,
  narration:
    "Cloud Tasks and Pub/Sub both move work off the request path, so they're often confused. Google's own framing is the clearest: implicit versus explicit invocation. Look at the two jobs that follow an order. The first is announcing that an order was placed. The orders service doesn't know, and shouldn't know, everyone who cares. That's an event, and Pub/Sub distributes it. Subscribers decide to listen, any number of them, and each consumer controls its own rate through flow control. The second job is booking a pickup with the carrier. That's a specific call to one specific target, and the carrier's API allows only five requests a second. That's dispatch, and Cloud Tasks fits. Each task names its target, an HTTP endpoint or service. The queue sets how fast tasks are dispatched and how failures are retried, so the carrier is never flooded. Tasks can be scheduled for later, for example to book the pickup at eight tomorrow morning. And a task can be given a name, so creating the same task twice is rejected, which removes a whole class of duplicates at the source. So ask: am I announcing something that happened, or asking one particular service to do one particular thing? Announcements go to Pub/Sub. Requests go to Cloud Tasks. Either way, both retry, so both targets must be safe to repeat. Next: when a process needs several steps, in order.",
}
