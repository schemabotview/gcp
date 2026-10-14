import type { Scene } from '@graphlearning/flow'

// §2 — one custom-mode VPC network. The network is global; each subnet lives in one Region. The
// address plan leaves room for a third Region and avoids the on-premises range, so peering and
// hybrid links stay possible later.
export const networkingVpc: Scene = {
  id: 'networking-vpc',
  title: 'A global network of regional subnets',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'vpc',
      label: 'VPC network  ·  retail-vpc  (custom mode, global)',
      sub: 'routes and firewall rules apply network-wide',
      pattern: 'network',
      cols: 2,
      children: [
        {
          id: 'ew2',
          label: 'europe-west2 (London)',
          pattern: 'service',
          cols: 1,
          children: [
            { id: 'sub-ew2', label: 'app-ew2', sub: 'subnet 10.20.0.0/20', icon: 'network' },
            { id: 'vm-ew2', label: 'orders VM', sub: '10.20.0.12', icon: 'cpu' },
          ],
        },
        {
          id: 'ew1',
          label: 'europe-west1 (Belgium)',
          pattern: 'service',
          cols: 1,
          children: [
            { id: 'sub-ew1', label: 'app-ew1', sub: 'subnet 10.30.0.0/20', icon: 'network' },
            { id: 'vm-ew1', label: 'reports VM', sub: '10.30.0.7: reachable from London', icon: 'cpu' },
          ],
        },
      ],
    },
    {
      id: 'plan',
      label: 'The address plan, written down before the first subnet',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'next', label: 'Reserved', sub: '10.40.0.0/20: a future Region', icon: 'calendar' },
        { id: 'onprem', label: 'On-premises', sub: '172.16.0.0/16: never reuse', icon: 'building' },
        { id: 'auto', label: 'Not auto mode', sub: 'its fixed ranges clash later', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [{ source: 'vpc', target: 'plan', label: 'no overlaps, room to grow' }],
}
