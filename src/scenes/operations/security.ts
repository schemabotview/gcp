import type { Scene } from '@graphlearning/flow'

// §6 — four security services placed on the request path they protect, and what each is not. They
// complement IAM and firewalls rather than replacing them.
export const operationsSecurity: Scene = {
  id: 'operations-security',
  title: 'Four controls, four boundaries',
  flow: 'TB',
  nodes: [
    {
      id: 'controls',
      kind: 'table',
      label: 'Where each control sits, and what it is not',
      headers: ['Control', 'Protects', 'Is not'],
      values: [
        ['Cloud Armor', 'internet traffic at the LB', 'cover for traffic that skips it'],
        ['Identity-Aware Proxy', 'internal apps, by sign-in', 'authorisation inside the app'],
        ['VPC Service Controls', 'data in supported APIs', 'a firewall for VMs'],
        ['Security Command Center', 'findings about posture', 'a fix in itself'],
      ],
    },
    {
      id: 'perimeter',
      label: 'VPC Service Controls perimeter around retail-prod',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'inside', label: 'Inside', sub: 'Storage, BigQuery, Cloud SQL', icon: 'lock' },
        { id: 'stolen', label: 'Stolen token', sub: 'copy to own bucket: refused', icon: 'ban' },
        { id: 'unlisted', label: 'Unlisted services', sub: 'are not restricted', icon: 'globe' },
      ],
    },
    {
      id: 'layers',
      label: 'Layered, not replaced: each answers a different question',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'l-fw', label: 'Firewall rules', sub: 'which packets may flow', icon: 'shieldcheck' },
        { id: 'l-iam', label: 'IAM', sub: 'which identities may act', icon: 'key' },
        { id: 'l-vpcsc', label: 'Perimeter', sub: 'where data may go', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'controls', target: 'perimeter', label: 'row 3, in practice' },
    { source: 'perimeter', target: 'layers' },
  ],
}
