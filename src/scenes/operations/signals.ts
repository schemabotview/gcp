import type { Scene } from '@graphlearning/flow'

// §1 — three kinds of telemetry and the one field that ties them together. A structured log line
// carries the trace id, so a slow request's logs and spans can be found from either side.
export const operationsSignals: Scene = {
  id: 'operations-signals',
  title: 'Metrics, logs and traces, correlated',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'kinds',
      label: 'Three signals, three questions',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'metrics', label: 'Metrics', sub: 'how much, how often, how slow', icon: 'barchart' },
        { id: 'logs', label: 'Logs', sub: 'what happened, in detail', icon: 'scroll' },
        { id: 'traces', label: 'Traces', sub: 'where the time went', icon: 'share' },
      ],
    },
    {
      id: 'line',
      kind: 'code',
      filename: 'one structured log line from the orders API',
      label: `{"severity": "WARNING",
 "message": "payment call slow",
 "order_id": 58213,
 "latency_ms": 2840,
 "logging.googleapis.com/trace":
   "projects/retail-prod-7312/traces/4bf92f3577b34da6a3ce929d0e0e4736"}`,
    },
    {
      id: 'retention',
      label: 'How long each is kept (defaults)',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'r-logs', label: 'Most logs', sub: '_Default bucket: 30 days', icon: 'clock' },
        { id: 'r-audit', label: 'Admin audit logs', sub: '_Required: 400 days', icon: 'lock' },
        { id: 'r-cost', label: 'Longer', sub: 'configure it, and pay for it', icon: 'receipt' },
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'line', label: 'the trace id links logs to spans' },
    { source: 'line', target: 'retention' },
  ],
}
