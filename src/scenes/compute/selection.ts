import type { Scene } from '@graphlearning/flow'

// §1 — the same orders API, three places to run it. The question is which requirement decides, not
// which product is best; the table states the trade, and the band below lists the questions to ask
// first.
export const computeSelection: Scene = {
  id: 'compute-selection',
  title: 'One API, three places to run it',
  flow: 'TB',
  nodes: [
    {
      id: 'questions',
      label: 'Ask about the workload first',
      pattern: 'user',
      cols: 2,
      children: [
        { id: 'shape', label: 'Shape', sub: 'requests, long-running, or batch?', icon: 'waves' },
        { id: 'control', label: 'Control', sub: 'need the OS, kernel or GPU?', icon: 'wrench' },
        { id: 'portability', label: 'Portability', sub: 'Kubernetes manifests elsewhere?', icon: 'swap' },
        { id: 'latency', label: 'Latency', sub: 'can it tolerate a cold start?', icon: 'clock' },
      ],
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'The orders API on each platform',
      headers: ['', 'Compute Engine', 'GKE', 'Cloud Run'],
      values: [
        ['You manage', 'OS, scaling, patching', 'workloads, cluster config', 'image and settings'],
        ['Scales by', 'managed instance group', 'pods, then nodes', 'requests, to zero'],
        ['Fits when', 'OS control, licences', 'many services, K8s skills', 'HTTP or events, spiky load'],
        ['Idle cost', 'VMs keep running', 'cluster plus pods', 'none at min 0'],
      ],
    },
  ],
  edges: [{ source: 'questions', target: 'compare', label: 'the answers pick the column' }],
}
