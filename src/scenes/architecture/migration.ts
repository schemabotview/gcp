import type { Scene } from '@graphlearning/flow'

// §6 — evolving the architecture: a staged migration with reconciliation and an honest rollback
// window, recorded as an architecture decision record. Dates and figures illustrative.
export const architectureMigration: Scene = {
  id: 'architecture-migration',
  title: 'Evolve in stages, and write down why',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'stages',
      label: 'Moving fulfilment off the legacy VM, in stages',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'st1', label: '1 · Shadow', sub: 'new service runs; results compared', icon: 'copy' },
        { id: 'st2', label: '2 · 10 % of orders', sub: 'reconcile shipments daily', icon: 'scale' },
        { id: 'st3', label: '3 · All orders', sub: 'old path kept, idle, 2 weeks', icon: 'swap' },
        { id: 'st4', label: '4 · Retire', sub: 'after the rollback window closes', icon: 'trash' },
      ],
    },
    {
      id: 'adr',
      kind: 'code',
      filename: 'docs/adr/0014-fulfilment-on-cloud-run.md',
      label: `Status:     accepted, 2026-10-02
Context:    legacy fulfilment VM is idle 80 % of the time; one person can patch it
Decision:   move fulfilment to Cloud Run, fed by Pub/Sub; keep Cloud SQL
Options:    GKE (no K8s skills on team); keep VM (cost, patching)
Consequences:
  + scales to zero overnight; no OS to patch
  − 10 s shutdown notice: handlers must be idempotent (they are)
  − rollback after stage 4 means rebuilding the VM: about two days`,
    },
  ],
  edges: [{ source: 'stages', target: 'adr', label: 'the reasons, kept with the code' }],
}
