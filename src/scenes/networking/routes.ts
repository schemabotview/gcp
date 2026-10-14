import type { Scene } from '@graphlearning/flow'

// §3 — how a packet leaves. Subnet routes keep traffic inside the network; the default route sends
// the rest to the internet gateway, which only works for a source that has an external address.
// Private workloads go out through Cloud NAT, which also gives them one stable address to allowlist.
export const networkingRoutes: Scene = {
  id: 'networking-routes',
  title: 'Routes, and the way out for private workloads',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'code',
      filename: 'gcloud compute routes list --filter="network:retail-vpc" (abridged)',
      label: `DEST_RANGE      NEXT_HOP                    PRIORITY
10.20.0.0/20    retail-vpc (subnet route)   0       # stays inside the network
10.30.0.0/20    retail-vpc (subnet route)   0
0.0.0.0/0       default-internet-gateway    1000    # everything else`,
    },
    {
      id: 'egress',
      label: 'Outbound from workloads with no external IP',
      pattern: 'service',
      flow: 'LR',
      cols: 4,
      children: [
        { id: 'run', label: 'Cloud Run', sub: 'Direct VPC egress: all traffic', icon: 'boxes' },
        { id: 'vm', label: 'VM', sub: 'internal IP only', icon: 'cpu' },
        { id: 'nat', label: 'Cloud NAT', sub: 'regional; static IP 34.x.x.x', icon: 'router' },
        { id: 'payments', label: 'Payments API', sub: 'allowlists that one IP', icon: 'globe' },
      ],
      edges: [
        { source: 'run', target: 'nat' },
        { source: 'vm', target: 'nat' },
        { source: 'nat', target: 'payments' },
      ],
    },
    {
      id: 'notes',
      label: 'What NAT is not',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'one-way', label: 'Outbound only', sub: 'nothing can connect in through it', icon: 'ban' },
        { id: 'no-proxy', label: 'No VM to run', sub: 'configured on Cloud Router', icon: 'gears' },
      ],
    },
  ],
  edges: [
    { source: 'table', target: 'egress', label: 'no external IP: default route is not enough' },
    { source: 'egress', target: 'notes' },
  ],
}
