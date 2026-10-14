import type { Scene } from '@graphlearning/flow'

// §4 — four different identities touch one Cloud Run service, and each needs different permissions.
// Top: the three that act ON the service. Below: the one the code runs AS, and what it reaches.
export const cloudRunIdentities: Scene = {
  id: 'cloud-run-identities',
  title: 'Four identities, four permission sets',
  flow: 'TB',
  nodes: [
    {
      id: 'acting-on',
      label: 'Act on the service',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'deployer', label: 'Deployer', sub: 'run.developer + actAs runtime', icon: 'usercheck' },
        { id: 'builder', label: 'Build identity', sub: 'source deploys: run.builder', icon: 'gears' },
        { id: 'caller', label: 'Caller', sub: 'run.invoker, or check off', icon: 'globe' },
      ],
    },
    { id: 'service', label: 'storefront', sub: 'Cloud Run service', pattern: 'service', icon: 'boxes' },
    { id: 'runtime', label: 'Runtime identity', sub: 'storefront-sa: what the code runs as', pattern: 'network', icon: 'key' },
    {
      id: 'reaches',
      label: 'Reaches, with its own roles',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'gcs', label: 'Cloud Storage', sub: 'objectViewer on one bucket', icon: 'box' },
        { id: 'sql', label: 'Cloud SQL', sub: 'cloudsql.client', icon: 'database' },
      ],
    },
  ],
  edges: [
    { source: 'acting-on', target: 'service' },
    { source: 'service', target: 'runtime', label: 'runs as' },
    { source: 'runtime', target: 'reaches', label: 'calls' },
  ],
}
