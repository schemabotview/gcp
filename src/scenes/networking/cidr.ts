import type { Scene } from '@graphlearning/flow'

// §1 — the vocabulary the rest of the chapter assumes: an address, a port, a protocol, and a CIDR
// range worked out by hand. Google Cloud reserves four addresses in every subnet's primary range.
export const networkingCidr: Scene = {
  id: 'networking-cidr',
  title: 'Addresses, ports and one CIDR range',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'blocks',
      label: 'Building blocks',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'address', label: 'IP address', sub: 'which machine', icon: 'hash' },
        { id: 'port', label: 'Port', sub: 'which program on it', icon: 'plug' },
        { id: 'protocol', label: 'Protocol', sub: 'TCP or UDP', icon: 'swap' },
        { id: 'prefix', label: 'CIDR prefix', sub: 'a block of addresses', icon: 'ruler' },
      ],
    },
    {
      id: 'calc',
      kind: 'code',
      filename: 'working out 10.20.0.0/20',
      label: `10.20.0.0/20
  prefix length      20 bits fixed      →  the first 20 bits name the block
  host bits          32 − 20 = 12       →  2^12 = 4,096 addresses
  range              10.20.0.0 – 10.20.15.255
  reserved           4                  →  network, gateway, second-to-last, broadcast
  usable for VMs     4,092`,
    },
    {
      id: 'private',
      label: 'Private (RFC 1918) ranges: not routed on the internet',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'r10', label: '10.0.0.0/8', sub: '16.7 million addresses', icon: 'box' },
        { id: 'r172', label: '172.16.0.0/12', sub: '1 million addresses', icon: 'box' },
        { id: 'r192', label: '192.168.0.0/16', sub: '65,536 addresses', icon: 'box' },
      ],
    },
  ],
  edges: [
    { source: 'blocks', target: 'calc' },
    { source: 'calc', target: 'private', label: 'pick blocks from these' },
  ],
}
