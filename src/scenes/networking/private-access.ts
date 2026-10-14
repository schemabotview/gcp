import type { Scene } from '@graphlearning/flow'

// §7 — three mechanisms with "private" in their names that solve different problems. The table is
// the comparison by purpose; the band below is the point the slide keeps returning to.
export const networkingPrivateAccess: Scene = {
  id: 'networking-private-access',
  title: 'Three kinds of private access, three purposes',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Reaching managed services without the public internet',
      headers: ['Mechanism', 'What it does', 'Retail example'],
      values: [
        ['Private Google Access', 'lets internal-only VMs reach Google APIs', 'VM reads a Storage bucket'],
        ['Private Service Connect', 'an internal IP in your network for a service', '10.20.9.9 → Cloud SQL'],
        ['Private services access', 'peers your VPC with a producer network', 'Cloud SQL private IP range'],
      ],
    },
    {
      id: 'shapes',
      label: 'Where the address lives',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'pga', label: 'PGA', sub: "Google's API addresses; a subnet setting", icon: 'power' },
        { id: 'psc', label: 'PSC', sub: 'your subnet; an endpoint you own', icon: 'plug' },
        { id: 'psa', label: 'PSA', sub: 'a range you allocate for peering', icon: 'link' },
      ],
    },
    {
      id: 'still',
      label: 'Private path, same checks',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'iam-still', label: 'IAM still applies', sub: 'the path grants nothing', icon: 'shieldcheck' },
        { id: 'dns-still', label: 'DNS must agree', sub: 'names must resolve to the private IP', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'compare', target: 'shapes' },
    { source: 'shapes', target: 'still' },
  ],
}
