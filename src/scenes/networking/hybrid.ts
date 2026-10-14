import type { Scene } from '@graphlearning/flow'

// §9 — connecting the retail company's data centre. HA VPN over the internet with two tunnels; Cloud
// Router exchanging routes over BGP; and the options compared by what they trade.
export const networkingHybrid: Scene = {
  id: 'networking-hybrid',
  title: 'Reaching the data centre',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'vpn',
      label: 'HA VPN: two tunnels, routes learned by BGP',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'dc', label: '1 · Data centre', sub: '172.16.0.0/16; peer router', icon: 'building' },
        { id: 'tunnels', label: '2 · IPsec tunnels', sub: 'over the internet', icon: 'lock' },
        { id: 'gateway', label: '3 · VPN gateway', sub: 'two interfaces', icon: 'router' },
        { id: 'router', label: '4 · Cloud Router', sub: 'BGP: learns, advertises', icon: 'gitbranch' },
      ],
    },
    {
      id: 'options',
      kind: 'table',
      label: 'Hybrid options, compared',
      headers: ['Option', 'Path', 'Choose it for'],
      values: [
        ['HA VPN', 'encrypted tunnels over the internet', 'a quick start, modest volume, backup'],
        ['Dedicated Interconnect', 'your circuit at a colocation site', 'large, steady volume; lower latency'],
        ['Partner Interconnect', "a provider's circuit to Google", 'no presence at a colocation site'],
      ],
    },
    {
      id: 'caveats',
      label: 'Availability is a design, not a product',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'sla', label: 'SLA needs redundancy', sub: 'both tunnels or links, as documented', icon: 'shieldcheck' },
        { id: 'encrypt', label: 'Interconnect', sub: 'not encrypted by default', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'vpn', target: 'options' },
    { source: 'options', target: 'caveats' },
  ],
}
