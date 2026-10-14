import type { Scene } from '@graphlearning/flow'

// §1 — the shared-responsibility line, drawn three times for three services the retail app could
// use. The same four layers in each column; the pattern says who runs the layer (user = you,
// service = Google), so the eye reads the line moving up as the service becomes more managed.
export const foundationsResponsibility: Scene = {
  id: 'foundations-responsibility',
  title: 'Where Google stops and you start',
  cols: 3,
  stretch: true,
  nodes: [
    {
      id: 'gce',
      label: 'Compute Engine VM',
      sub: 'infrastructure you configure',
      pattern: 'group',
      children: [
        { id: 'gce-data', label: 'Data & access', sub: 'You: what, and who', pattern: 'user', icon: 'database' },
        { id: 'gce-app', label: 'App code', sub: 'You: build, deploy', pattern: 'user', icon: 'code' },
        { id: 'gce-os', label: 'OS & runtime', sub: 'You: patch, harden, scale', pattern: 'user', icon: 'terminal' },
        { id: 'gce-hw', label: 'Hardware', sub: 'Google: hosts, network, sites', pattern: 'service', icon: 'server' },
      ],
    },
    {
      id: 'run',
      label: 'Cloud Run service',
      sub: 'managed container platform',
      pattern: 'group',
      children: [
        { id: 'run-data', label: 'Data & access', sub: 'You: what, and who', pattern: 'user', icon: 'database' },
        { id: 'run-app', label: 'App code', sub: 'You: image, config', pattern: 'user', icon: 'code' },
        { id: 'run-os', label: 'OS & runtime', sub: 'Google: base, scaling', pattern: 'service', icon: 'gears' },
        { id: 'run-hw', label: 'Hardware', sub: 'Google: hosts, network, sites', pattern: 'service', icon: 'server' },
      ],
    },
    {
      id: 'bq',
      label: 'BigQuery',
      sub: 'managed analytics service',
      pattern: 'group',
      children: [
        { id: 'bq-data', label: 'Data & access', sub: 'You: datasets, IAM', pattern: 'user', icon: 'database' },
        { id: 'bq-app', label: 'Queries', sub: 'You: the SQL you run', pattern: 'user', icon: 'search' },
        { id: 'bq-os', label: 'Query engine', sub: 'Google: compute, storage', pattern: 'service', icon: 'gears' },
        { id: 'bq-hw', label: 'Hardware', sub: 'Google: hosts, network, sites', pattern: 'service', icon: 'server' },
      ],
    },
  ],
  edges: [],
}
