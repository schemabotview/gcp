import type { Scene } from '@graphlearning/flow'

// §6 — one release moving through three targets in Cloud Deploy, with a canary on production and an
// approval gate before it. Rollback re-deploys an earlier release; it cannot reverse a schema change.
export const deliveryCloudDeploy: Scene = {
  id: 'delivery-cloud-deploy',
  title: 'A release, three targets, one canary',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'pipeline',
      label: 'Delivery pipeline · storefront  ·  release rel-1-5-0',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 't-dev', label: '1 · dev', sub: 'deployed on every merge', icon: 'box' },
        { id: 't-staging', label: '2 · staging', sub: 'verify job runs tests', icon: 'circlecheck' },
        { id: 't-prod', label: '3 · prod', sub: 'approval required', icon: 'usercheck' },
      ],
    },
    {
      id: 'canary',
      label: 'Canary on prod: Cloud Run splits traffic between revisions',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'c10', label: '10 %', sub: 'watch errors, latency', icon: 'gauge' },
        { id: 'c50', label: '50 %', sub: 'still healthy', icon: 'gauge' },
        { id: 'stable', label: 'Stable', sub: '100 % on 1.5.0', icon: 'circlecheck' },
        { id: 'rollback', label: 'Or roll back', sub: 'to rel-1-4-2', icon: 'history' },
      ],
    },
    {
      id: 'limits',
      label: 'Rollback moves the release, not the data',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'schema', label: 'Schema changes', sub: 'stay applied after rollback', icon: 'database' },
        { id: 'expand', label: 'Expand, then contract', sub: 'old code must run on new schema', icon: 'layers' },
      ],
    },
  ],
  edges: [
    { source: 'pipeline', target: 'canary', label: 'after approval' },
    { source: 'canary', target: 'limits' },
  ],
}
