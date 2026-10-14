import type { Section } from '../types'

export const dataflowAndWindows: Section = {
  id: 'dataflow-and-windows',
  title: 'Dataflow, Apache Beam and late events',
  scene: 'analytics-dataflow',
  focus: 'w3',
  slide: `## Dataflow, Beam and late events

**Dataflow** runs **Apache Beam** pipelines, batch or streaming, and scales the workers for you. Streaming adds a question batch never asks: **is this window complete?**

### Event time
- Group by when an event **happened**, not when it arrived
- A **window** collects events, here five minutes at a time

### Watermark and lateness
- The **watermark** is the pipeline's estimate that a window is complete
- **Allowed lateness** keeps a window open for stragglers
- A late event **updates** the result; beyond the limit it is dropped

### Duplicates
- Retried publishes can arrive **twice**; deduplicate by an event id`,
  narration:
    "Some questions can't wait for tonight's batch: the marketing team wants live page views per category, every five minutes, during a promotion. Dataflow runs Apache Beam pipelines for exactly this. You describe the steps, and Dataflow runs them on workers it scales for you, in batch or streaming mode. The pipeline on the left reads events from Pub/Sub, stamps each one with the time it happened, groups them into five-minute windows, counts per category, and writes the counts to BigQuery. Streaming raises a question batch never has to ask: when is a window complete? Events don't arrive in order. A phone on a train might send a view that happened at three minutes past nine at eleven minutes past. Follow the timeline. Events stamped between nine and five past arrive and are counted. Then the watermark, the pipeline's running estimate of how far event time has progressed, passes five past nine, so Dataflow writes a first result for that window. Then the phone's late event arrives. Because the window allows ten minutes of lateness, it's accepted, and the result for that window is updated. An event later than that limit would be dropped. Duplicates are a separate problem. If a publisher retried, the same event can arrive twice, so deduplicate by an event id. Event-time windows count what happened; they don't, by themselves, make the count correct. Next: when Spark, and who runs the schedule.",
}
