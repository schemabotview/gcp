import type { Scene } from '@graphlearning/flow'

// §3 — a template stamps out identical VMs; a regional managed instance group keeps the right number
// running across zones. Scaling changes HOW MANY; autohealing replaces ONE that is unhealthy. Two
// separate signals, two separate actions.
export const computeMigs: Scene = {
  id: 'compute-migs',
  title: 'Templates, groups, scaling and healing',
  flow: 'TB',
  stretch: true,
  nodes: [
    { id: 'template', label: 'Instance template', sub: 'orders-v7: immutable recipe', pattern: 'storage', icon: 'file' },
    {
      id: 'mig',
      label: 'Regional MIG  ·  orders  (europe-west2)',
      sub: 'target size set by the autoscaler',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'zone-a', label: 'zone a', sub: 'orders-x7k2, orders-p9q1', icon: 'cpu' },
        { id: 'zone-b', label: 'zone b', sub: 'orders-m3n8', icon: 'cpu' },
        { id: 'zone-c', label: 'zone c', sub: 'orders-d4f6', icon: 'cpu' },
      ],
    },
    {
      id: 'signals',
      label: 'Two signals, two different actions',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'autoscale', label: 'Autoscaling', sub: 'CPU at 60 % target: add or remove VMs', icon: 'gauge' },
        { id: 'autoheal', label: 'Autohealing', sub: 'health check fails: recreate that VM', icon: 'repeat' },
      ],
    },
    {
      id: 'rollout',
      label: 'Rolling update: orders-v7 → orders-v8',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'new-template', label: 'New template', sub: 'v7 is never edited', icon: 'file' },
        { id: 'surge', label: 'A few at a time', sub: 'max surge, max unavailable', icon: 'repeat' },
        { id: 'verify', label: 'Health gates it', sub: 'unhealthy v8 stops the roll', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'template', target: 'mig', label: 'every VM made from it' },
    { source: 'mig', target: 'signals' },
    { source: 'signals', target: 'rollout', label: 'changing the software' },
  ],
}
