import type { Scene } from '@graphlearning/flow'

// §2 — a latency incident, investigated in three moves: a metric shows when, a log query shows which
// requests, a trace shows where the time went. Values illustrative.
export const operationsInvestigation: Scene = {
  id: 'operations-investigation',
  title: 'From a slow graph to a slow span',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'query',
      kind: 'code',
      filename: 'Logs Explorer — slow orders in the last hour',
      label: `resource.type="cloud_run_revision"
resource.labels.service_name="orders"
jsonPayload.latency_ms > 2000
timestamp >= "2026-10-14T13:00:00Z"

→ 214 entries, all with jsonPayload.message = "payment call slow"`,
    },
    {
      id: 'trace',
      kind: 'table',
      label: 'Trace 4bf92f35…: one slow order',
      headers: ['Span', 'Start (ms)', 'Duration (ms)'],
      values: [
        ['POST /orders', '0', '2,912'],
        ['  SELECT stock', '4', '11'],
        ['  BEGIN … COMMIT', '17', '38'],
        ['  POST payments-api/charge', '58', '2,840'],
        ['  publish orders.placed', '2,900', '9'],
      ],
    },
    {
      id: 'moves',
      label: 'Three moves',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'm-when', label: '1 · Metric', sub: 'p95 latency jumped at 13:12', icon: 'barchart' },
        { id: 'm-which', label: '2 · Logs', sub: 'which requests, which message', icon: 'search' },
        { id: 'm-where', label: '3 · Trace', sub: 'the payment call: 2.8 s', icon: 'share' },
      ],
    },
  ],
  edges: [
    { source: 'query', target: 'trace', label: 'open one trace id' },
    { source: 'trace', target: 'moves' },
  ],
}
