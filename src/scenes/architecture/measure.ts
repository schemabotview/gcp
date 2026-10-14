import type { Scene } from '@graphlearning/flow'

// §1 — the orders API's latency as a percentile curve: the median looks fine, the tail does not. Then
// where the time goes in a typical slow request. Figures illustrative.
const curve: [number, number][] = [
  [50, 120], [60, 135], [70, 155], [80, 180], [90, 210], [95, 290], [97, 420], [99, 900], [99.5, 1500], [99.9, 2800],
]

export const architectureMeasure: Scene = {
  id: 'architecture-measure',
  title: 'Averages hide the tail',
  flow: 'TB',
  stretch: true,
  padding: 0.17,
  nodes: [
    {
      id: 'percentiles',
      kind: 'plot',
      label: 'Orders API latency by percentile (one week, illustrative)',
      sub: 'mean 160 ms — and one request in a hundred takes over 900 ms',
      plot: {
        x: { min: 50, max: 100, step: 10, label: 'percentile' },
        y: { min: 0, max: 3000, step: 500, label: 'latency (ms)' },
        axes: 'corner',
        series: [
          { kind: 'line', points: curve, color: 'service', label: 'latency', labelAt: [62, 500] },
          { kind: 'marker', at: [50, 120], color: 'network', label: 'p50: 120 ms', labelAt: [52, 330] },
          { kind: 'marker', at: [95, 290], color: 'warn', label: 'p95', labelAt: [91, 520] },
          { kind: 'marker', at: [99, 900], color: 'warn', label: 'p99: 900 ms', labelAt: [88, 1100] },
        ],
      },
    },
    {
      id: 'breakdown',
      kind: 'table',
      label: 'Where a p99 request spends its time',
      headers: ['Part', 'ms', 'Share'],
      values: [
        ['payments API call', '610', '68 %'],
        ['database: lock wait on stock row', '190', '21 %'],
        ['cold start (some requests)', '70', '8 %'],
        ['everything else', '30', '3 %'],
      ],
    },
  ],
  edges: [{ source: 'percentiles', target: 'breakdown', label: 'optimise the biggest share first' }],
}
