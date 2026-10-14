import type { Scene } from '@graphlearning/flow'

// §9 — a sale floods the topic. Each layer can absorb or limit the surge, and the database is the
// thing every limit is really protecting. Numbers illustrative: arrivals 2,000/min during a 30-minute
// sale and 200/min after; workers capped at 600/min, so the backlog grows by 1,400/min, then drains at
// 400/min.
const backlog = (m: number) => (m <= 30 ? 1.4 * m : Math.max(0, 42 - 0.4 * (m - 30)))
const minutes = Array.from({ length: 31 }, (_, i) => i * 5)

export const eventsBackpressure: Scene = {
  id: 'events-backpressure',
  title: 'Absorb the surge, protect the database',
  flow: 'TB',
  stretch: true,
  padding: 0.17,
  nodes: [
    {
      id: 'backlog-plot',
      kind: 'plot',
      label: 'Backlog during and after the sale (illustrative)',
      sub: 'thousands of unacknowledged orders',
      plot: {
        x: { min: 0, max: 150, step: 30, label: 'minutes' },
        y: { min: 0, max: 50, step: 10, label: 'backlog (k)' },
        axes: 'corner',
        series: [
          { kind: 'area', points: minutes.map((m): [number, number] => [m, backlog(m)]), color: 'warn', label: 'backlog', labelAt: [84, 30] },
          { kind: 'marker', at: [30, 42], color: 'warn', label: 'sale ends', labelAt: [34, 44] },
          { kind: 'marker', at: [135, 0], color: 'service', label: 'drained', labelAt: [122, 5] },
        ],
      },
    },
    {
      id: 'surge',
      label: 'A sale: 2,000 orders a minute arrive; the database takes 600',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'b-topic', label: 'Topic', sub: 'backlog grows: fine', icon: 'share' },
        { id: 'b-sub', label: 'Subscriber', sub: 'flow control: 50 in flight', icon: 'funnel' },
        { id: 'b-workers', label: 'Workers', sub: 'max instances: 10', icon: 'boxes' },
        { id: 'b-db', label: 'Database', sub: 'the real limit', icon: 'database' },
      ],
    },
    {
      id: 'levers',
      kind: 'table',
      label: 'Where to put the limit',
      headers: ['Lever', 'Effect', 'Watch'],
      values: [
        ['Subscriber flow control', 'caps messages in flight per client', 'ack deadlines while queued'],
        ['Consumer max instances', 'caps total parallel work', 'backlog age'],
        ['Cloud Tasks queue rate', 'fixed dispatch rate to one target', 'queue depth'],
        ['Backlog itself', 'a buffer, if retention is long enough', 'oldest unacked message'],
      ],
    },
  ],
  edges: [
    { source: 'backlog-plot', target: 'surge' },
    { source: 'surge', target: 'levers', label: 'let the backlog absorb it' },
  ],
}
