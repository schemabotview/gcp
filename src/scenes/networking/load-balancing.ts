import type { Scene } from '@graphlearning/flow'

// §6 — the storefront's full request path, from a browser's DNS lookup to the database, and a
// chooser for the load balancer at its front. TLS ends at the load balancer; Cloud Run accepts only
// traffic that came through it.
export const networkingLoadBalancing: Scene = {
  id: 'networking-load-balancing',
  title: 'The request path, front to back',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'path',
      label: 'shop.retail.example, one request',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'browser', label: '1 · Browser', sub: 'looks up shop.retail.example', icon: 'users' },
        { id: 'dns', label: '2 · Cloud DNS', sub: 'A record: one anycast IP', icon: 'search' },
        { id: 'lb', label: '3 · Global external ALB', sub: 'TLS ends here; managed cert', icon: 'globe' },
        { id: 'neg', label: '4 · Endpoint group', sub: 'serverless NEG in europe-west2', icon: 'share' },
        { id: 'run', label: '5 · Cloud Run', sub: 'ingress: internal + load balancer', icon: 'boxes' },
        { id: 'sql', label: '6 · Cloud SQL', sub: 'private IP, via VPC egress', icon: 'database' },
      ],
    },
    {
      id: 'chooser',
      kind: 'table',
      label: 'Choosing a load balancer by protocol and scope',
      headers: ['You need', 'Choose'],
      values: [
        ['HTTP(S) from the internet, many Regions', 'global external Application LB'],
        ['HTTP(S) inside your network', 'internal Application LB'],
        ['TCP with TLS offload or one IP', 'proxy Network LB'],
        ['TCP/UDP, keep the client address', 'passthrough Network LB'],
      ],
    },
  ],
  edges: [{ source: 'path', target: 'chooser', label: 'step 3 depends on protocol and reach' }],
}
