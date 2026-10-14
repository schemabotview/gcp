import type { Scene } from '@graphlearning/flow'

// §6 — the same orders API as a Kubernetes Deployment, and where Google's work stops in each GKE mode.
// The manifest is what you own in BOTH modes; the table is the administration boundary.
export const computeGke: Scene = {
  id: 'compute-gke',
  title: 'GKE Autopilot and Standard',
  flow: 'TB',
  nodes: [
    {
      id: 'manifest',
      kind: 'code',
      filename: 'orders-deployment.yaml (abridged)',
      label: `apiVersion: apps/v1
kind: Deployment
metadata: { name: orders }
spec:
  replicas: 3
  template:
    spec:
      serviceAccountName: orders          # mapped to an IAM identity
      containers:
      - name: api
        image: europe-west2-docker.pkg.dev/retail-prod-7312/orders/api@sha256:…
        resources:
          requests: { cpu: 500m, memory: 512Mi }   # Autopilot bills these`,
    },
    {
      id: 'modes',
      kind: 'table',
      label: 'Who runs what',
      headers: ['', 'Autopilot', 'Standard'],
      values: [
        ['Control plane', 'Google', 'Google'],
        ['Nodes and node pools', 'Google', 'you'],
        ['You pay for', 'pod resource requests', 'node VMs, used or not'],
        ['Manifests, RBAC, upgrades', 'you', 'you'],
      ],
    },
  ],
  edges: [{ source: 'manifest', target: 'modes', label: 'yours in both modes' }],
}
