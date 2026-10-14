import type { Scene } from '@graphlearning/flow'

// §7 — the interrupted worker. It writes a shipment, then its VM is reclaimed before it acknowledges
// the job, so the job runs again. The fix is not a longer grace period; it is a handler that is safe
// to repeat. Grace periods are each platform's documented defaults.
export const computeShutdown: Scene = {
  id: 'compute-shutdown',
  title: 'Interrupted after the write',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'timeline',
      label: 'A fulfilment worker on a Spot VM',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 't1', label: '1 · Take job', sub: 'ship order 58213', icon: 'workflow' },
        { id: 't2', label: '2 · Write', sub: 'shipment row inserted', icon: 'database' },
        { id: 't3', label: '3 · Preempted', sub: 'before it acknowledges', icon: 'zap' },
        { id: 't4', label: '4 · Job retried', sub: 'second shipment, unless…', icon: 'copy' },
      ],
    },
    {
      id: 'fix',
      kind: 'code',
      filename: 'safe to repeat',
      label: `INSERT INTO shipments (order_id, carrier, created_at)
VALUES (58213, 'parcel-co', now())
ON CONFLICT (order_id) DO NOTHING;     -- the second attempt changes nothing`,
    },
    {
      id: 'grace',
      label: 'Notice before the instance is stopped',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'g-spot', label: 'Spot VM', sub: 'up to 30 s', icon: 'cpu' },
        { id: 'g-run', label: 'Cloud Run', sub: 'SIGTERM, then 10 s', icon: 'boxes' },
        { id: 'g-gke', label: 'GKE pod', sub: '30 s default grace', icon: 'layers' },
      ],
    },
  ],
  edges: [
    { source: 'timeline', target: 'fix', label: 'make step 2 idempotent' },
    { source: 'fix', target: 'grace', label: 'then use the notice to stop taking work' },
  ],
}
