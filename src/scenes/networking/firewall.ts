import type { Scene } from '@graphlearning/flow'

// §4 — one ingress rule, written in full, and the order in which rules are evaluated. The rule lets
// Google's load-balancer health checkers reach the order VMs, targeted by service account rather
// than by IP. Ranges are Google's documented health-check sources.
export const networkingFirewall: Scene = {
  id: 'networking-firewall',
  title: 'Firewall rules: target, source, priority',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'rule',
      kind: 'code',
      filename: 'allow health checks to the order VMs',
      label: `gcloud compute firewall-rules create allow-lb-health-checks \\
  --network retail-vpc --direction INGRESS --priority 1000 \\
  --action ALLOW --rules tcp:8080 \\
  --source-ranges 130.211.0.0/22,35.191.0.0/16 \\
  --target-service-accounts orders-vm@retail-prod-7312.iam.gserviceaccount.com`,
    },
    {
      id: 'order',
      label: 'Evaluation, first match wins',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'hier', label: '1 · Hierarchical', sub: 'organisation and folder policies', icon: 'building' },
        { id: 'network', label: '2 · Network rules', sub: 'lowest number first; deny wins a tie', icon: 'sortarrows' },
        { id: 'implied', label: '3 · Implied rules', sub: '65535: deny in, allow out', icon: 'ban' },
      ],
    },
    {
      id: 'facts',
      label: 'Two facts that explain most surprises',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'stateful', label: 'Stateful', sub: 'replies to allowed traffic return', icon: 'repeat' },
        { id: 'not-iam', label: 'Not IAM', sub: 'reachable is not authorised', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'rule', target: 'order', label: 'priority 1000 sits in step 2' },
    { source: 'order', target: 'facts' },
  ],
}
