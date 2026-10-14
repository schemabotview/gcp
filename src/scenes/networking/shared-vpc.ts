import type { Scene } from '@graphlearning/flow'

// §8 — two ways to connect networks across projects. Shared VPC: one network, owned centrally, used
// by service projects. Peering: two networks, two owners, no transit through a third.
export const networkingSharedVpc: Scene = {
  id: 'networking-shared-vpc',
  title: 'One shared network, or two peered ones',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'shared',
      label: 'Shared VPC: one network, central owners',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'host', label: 'Host project', sub: 'net-host: subnets, firewall, NAT', icon: 'building' },
        { id: 'svc-prod', label: 'Service project', sub: 'retail-prod: uses app-ew2', icon: 'box' },
        { id: 'svc-data', label: 'Service project', sub: 'retail-analytics: uses data-ew2', icon: 'box' },
      ],
    },
    {
      id: 'peering',
      label: 'VPC Network Peering: two networks, two owners',
      pattern: 'service',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'retail-vpc', label: 'retail-vpc', sub: '10.20.0.0/16', icon: 'network' },
        { id: 'partner-vpc', label: 'partner-vpc', sub: '10.60.0.0/16', icon: 'network' },
        { id: 'third-vpc', label: 'third-vpc', sub: 'peered to partner only', icon: 'network' },
      ],
      edges: [
        { source: 'retail-vpc', target: 'partner-vpc', label: 'peered', bidirectional: true },
        { source: 'partner-vpc', target: 'third-vpc', label: 'peered', bidirectional: true },
      ],
    },
    {
      id: 'rules',
      label: 'Peering rules',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'no-transit', label: 'Not transitive', sub: 'retail cannot reach third', icon: 'ban' },
        { id: 'no-overlap', label: 'No overlaps', sub: 'ranges must not clash', icon: 'ruler' },
        { id: 'two-admins', label: 'Two admins', sub: 'each side keeps its own', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'shared', target: 'peering', label: 'or, across owners', dashed: true },
    { source: 'peering', target: 'rules' },
  ],
}
