import type { Scene } from '@graphlearning/flow'

// §9 — a regional recovery plan for the retail app, in dependency order, against stated RTO and RPO.
// Each step depends on the ones before it; failback is planned, not improvised.
export const operationsRecovery: Scene = {
  id: 'operations-recovery',
  title: 'Recover a Region, in dependency order',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'targets',
      label: 'Targets for losing europe-west2',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'rto', label: 'RTO: 2 hours', sub: 'back in service within', icon: 'clock' },
        { id: 'rpo', label: 'RPO: 15 minutes', sub: 'data loss at most', icon: 'ruler' },
      ],
    },
    {
      id: 'order',
      label: 'Recovery order in europe-west1',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'o1', label: '1 · Identity', sub: 'IAM is global: check access', icon: 'key' },
        { id: 'o2', label: '2 · Network', sub: 'subnet, NAT, firewall ready', icon: 'network' },
        { id: 'o3', label: '3 · Data', sub: 'promote replica or restore', icon: 'database' },
        { id: 'o4', label: '4 · Services', sub: 'deploy the same digests', icon: 'boxes' },
        { id: 'o5', label: '5 · Traffic', sub: 'point the load balancer', icon: 'globe' },
        { id: 'o6', label: '6 · Verify', sub: 'orders flow; totals agree', icon: 'circlecheck' },
      ],
    },
    {
      id: 'failback',
      label: 'Afterwards',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'fb', label: 'Failback', sub: 'a second migration, planned', icon: 'history' },
        { id: 'evidence', label: 'Evidence', sub: 'last drill met both targets', icon: 'scroll' },
      ],
    },
  ],
  edges: [
    { source: 'targets', target: 'order' },
    { source: 'order', target: 'failback' },
  ],
}
