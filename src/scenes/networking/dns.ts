import type { Scene } from '@graphlearning/flow'

// §5 — private name resolution, and how it fails. The private zone answers only for networks it has
// been authorised for; from any other network the same name does not exist. Addresses illustrative.
export const networkingDns: Scene = {
  id: 'networking-dns',
  title: 'A private name, visible to one network',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'lookup',
      kind: 'code',
      filename: 'the same question from two networks',
      label: `# from a VM in retail-vpc (the zone is authorised for this network)
$ dig +short orders-db.internal.retail.example
10.20.4.5

# from a VM in analytics-vpc (not authorised)
$ dig orders-db.internal.retail.example
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN`,
    },
    {
      id: 'path',
      label: "Who answers a VM's DNS query",
      pattern: 'network',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'vm', label: 'VM', sub: 'asks 169.254.169.254', icon: 'cpu' },
        { id: 'resolver', label: 'Cloud DNS', sub: "the network's resolver", icon: 'search' },
        { id: 'zone', label: 'Private zone', sub: 'for *.internal names', icon: 'table' },
      ],
      edges: [
        { source: 'vm', target: 'resolver' },
        { source: 'resolver', target: 'zone', label: 'if authorised' },
      ],
    },
    {
      id: 'zones',
      label: 'Kinds of zone',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'public', label: 'Public', sub: 'answers the whole internet', icon: 'globe' },
        { id: 'private-zone', label: 'Private', sub: 'only listed VPC networks', icon: 'lock' },
        { id: 'forwarding', label: 'Forwarding', sub: 'sends queries on-premises', icon: 'share' },
      ],
    },
  ],
  edges: [
    { source: 'lookup', target: 'path', label: 'NXDOMAIN: the zone is not visible here' },
    { source: 'path', target: 'zones' },
  ],
}
