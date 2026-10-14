import type { Scene } from '@graphlearning/flow'

// §5 — the path an image takes from commit to running container, and who is responsible at each step.
// Artifact Registry stores it; Artifact Analysis scans it; Binary Authorization can refuse to run what
// lacks a required attestation.
export const computeSupplyChain: Scene = {
  id: 'compute-supply-chain',
  title: 'From commit to running image',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'path',
      label: 'The image path',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'build', label: '1 · Build', sub: 'from a pinned base image', icon: 'gears' },
        { id: 'push', label: '2 · Push', sub: 'Artifact Registry, by digest', icon: 'package' },
        { id: 'scan', label: '3 · Scan', sub: 'Artifact Analysis: known CVEs', icon: 'search' },
        { id: 'attest', label: '4 · Attest', sub: 'signed: tests and scan passed', icon: 'fingerprint' },
        { id: 'admit', label: '5 · Admit', sub: 'Binary Authorization checks', icon: 'shieldcheck' },
        { id: 'run', label: '6 · Run', sub: 'GKE or Cloud Run pulls it', icon: 'boxes' },
      ],
    },
    {
      id: 'yours',
      label: 'Still yours, whatever runs it',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'base', label: 'Base image', sub: 'rebuild to pick up OS fixes', icon: 'layers' },
        { id: 'deps', label: 'Dependencies', sub: 'pin and update them', icon: 'package' },
        { id: 'pull', label: 'Who may pull', sub: 'reader role on the repository', icon: 'key' },
      ],
    },
  ],
  edges: [{ source: 'path', target: 'yours', label: 'a scan reports; it does not patch' }],
}
