import type { Scene } from '@graphlearning/flow'

// §4 — three levers on the same bill, in the order they should be pulled, and the sustainability
// question that sits beside price rather than under it.
export const architectureRightsizing: Scene = {
  id: 'architecture-rightsizing',
  title: 'Rightsize, then commit',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'order',
      label: 'Pull the levers in this order',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'l1', label: '1 · Remove', sub: 'idle VMs, orphaned disks, old snapshots', icon: 'trash' },
        { id: 'l2', label: '2 · Rightsize', sub: 'stock VM: 8 vCPU at 11 % → 2 vCPU', icon: 'ruler' },
        { id: 'l3', label: '3 · Commit', sub: 'discount the steady base left over', icon: 'calendar' },
      ],
    },
    {
      id: 'why',
      kind: 'code',
      filename: 'why that order (illustrative)',
      label: `commit first:   8 vCPU committed for 3 years, discounted   → paying for 6 idle vCPU
rightsize first: 2 vCPU needed, then committed              → discount on what is used`,
    },
    {
      id: 'green',
      label: 'Sustainability: a separate question from price',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'cfe', label: 'Region CFE%', sub: 'share of carbon-free energy', icon: 'zap' },
        { id: 'util', label: 'Utilisation', sub: 'idle capacity still uses energy', icon: 'gauge' },
        { id: 'not-price', label: 'Cheaper ≠ greener', sub: 'compare both, separately', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'order', target: 'why' },
    { source: 'why', target: 'green' },
  ],
}
