import type { Scene } from '@graphlearning/flow'

// §6 — counting page views per 5-minute window as events stream in. Event time, not arrival time,
// decides the window; the watermark decides when a window is probably complete; allowed lateness
// decides what happens to stragglers.
export const analyticsDataflow: Scene = {
  id: 'analytics-dataflow',
  title: 'Windows, watermarks and late events',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'pipeline',
      kind: 'code',
      filename: 'views_per_window.py (Apache Beam, abridged)',
      label: `(p
 | ReadFromPubSub(subscription=SUB, with_attributes=True)
 | Map(parse_event)                                 # event_ts from the payload
 | WithTimestamps(lambda e: e["event_ts"])          # window by event time
 | WindowInto(FixedWindows(5 * 60),
              allowed_lateness=10 * 60,             # accept 10 min of stragglers
              accumulation_mode=ACCUMULATING)
 | Map(lambda e: (e["category"], 1))
 | CombinePerKey(sum)
 | WriteToBigQuery(TABLE))`,
    },
    {
      id: 'timeline',
      label: 'Window 09:00–09:05, as events arrive',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'w1', label: '1 · On time', sub: 'events stamped 09:00–09:05', icon: 'clock' },
        { id: 'w2', label: '2 · Watermark passes', sub: 'first result written', icon: 'circlecheck' },
        { id: 'w3', label: '3 · Late phone event', sub: 'stamped 09:03, arrives 09:11', icon: 'zap' },
        { id: 'w4', label: '4 · Updated result', sub: 'within lateness: recount', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'pipeline', target: 'timeline' }],
}
