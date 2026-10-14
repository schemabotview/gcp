import type { Section } from '../types'

export const backpressure: Section = {
  id: 'backpressure',
  title: 'Backpressure, flow control and downstream capacity',
  scene: 'events-backpressure',
  focus: 'b-db',
  slide: `## Backpressure and flow control

During a sale, orders arrive faster than the **database** can process them. Asynchronous messaging lets the difference wait in a **backlog** instead of failing.

### Put limits where they protect
- **Flow control** caps messages in flight per subscriber client
- **Max instances** caps the total number of workers
- **Queue rates** cap dispatch to one target in Cloud Tasks

### Watch the backlog
- A growing backlog during a sale is **working as designed**
- Watch the age of the **oldest** unacknowledged message
- Retention must outlast your **worst** catch-up time

### The point
- Scale consumers to what **downstream** can take, not to the queue`,
  narration:
    "This chapter ends with the scenario that justifies it. A sale starts, and two thousand orders a minute arrive. The orders database can safely process six hundred. With synchronous calls all the way down, the extra fourteen hundred would become errors and timeouts. With messaging, they become a backlog, and a backlog is fine, for a while. The plot shows it: the backlog climbs to about forty two thousand orders by the time the thirty-minute sale ends, then drains over the next hour and three quarters, because workers keep going at their safe rate. The trick is to place limits so the backlog absorbs the surge, rather than passing it straight to the database. Subscriber flow control caps how many messages each client holds at once, here fifty. The workers' maximum instance count caps the total, here ten instances. Together those set the real rate at which work reaches the database. For dispatch to one target, a Cloud Tasks queue rate does the same job. Then watch the right signal. A growing backlog during a sale is working as designed. What matters is the age of the oldest unacknowledged message, because that's how long a customer's order has been waiting. Make sure the subscription's retention outlasts your worst catch-up time, or messages will expire before they're processed. And notice the principle that's run through the last three chapters: scale consumers to what the downstream system can take, not to the length of the queue. Next chapter: turning these operational events into analytical history.",
}
