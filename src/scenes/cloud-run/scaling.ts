import type { Scene } from '@graphlearning/flow'

// §5 — scaling as arithmetic. The code card turns a peak into instances and then into database
// connections, which is the number that actually breaks first. Below, the knobs with their defaults,
// and what a cold start adds to one unlucky request.
export const cloudRunScaling: Scene = {
  id: 'cloud-run-scaling',
  title: 'Scaling is arithmetic, and it reaches downstream',
  flow: 'TB',
  stretch: true,
  padding: 0.17,
  nodes: [
    {
      id: 'arithmetic',
      kind: 'code',
      filename: 'capacity at peak (illustrative)',
      label: `peak concurrent requests            2,400
÷ concurrency per instance             80    # the default
= instances needed                     30    # max instances default: 100
× database connections per instance     5    # pool size in your code
= connections at peak                 150    # can the database take this?`,
    },
    {
      id: 'knobs',
      label: 'The knobs, with their defaults',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'concurrency', label: 'Concurrency', sub: '80; up to 1,000', icon: 'gauge' },
        { id: 'min', label: 'Min instances', sub: '0: scale to zero', icon: 'power' },
        { id: 'max', label: 'Max instances', sub: '100: caps cost and load', icon: 'ban' },
        { id: 'billing', label: 'Billing', sub: 'request-based by default', icon: 'receipt' },
      ],
    },
    {
      id: 'cold',
      label: 'A cold start: no idle instance is free',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'arrive', label: '1 · Request', sub: 'arrives at a busy service', icon: 'zap' },
        { id: 'start', label: '2 · Start', sub: 'pull image, boot container', icon: 'box' },
        { id: 'init', label: '3 · Initialise', sub: 'imports, config, pools', icon: 'gears' },
        { id: 'serve', label: '4 · Serve', sub: 'the wait lands on this request', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'arithmetic', target: 'knobs' },
    { source: 'knobs', target: 'cold' },
  ],
}
