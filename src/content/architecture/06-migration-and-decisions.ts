import type { Section } from '../types'

export const migrationAndDecisions: Section = {
  id: 'migration-and-decisions',
  title: 'Migration, cutover and architecture decision records',
  scene: 'architecture-migration',
  focus: 'adr',
  slide: `## Staged migration and decision records

Architectures evolve. Changing one safely means **stages**, **reconciliation** and an honest **rollback window**.

### The stages
- **Shadow**: the new path runs, and results are compared, not used
- A **share** of orders, reconciled daily against the old path
- **All** orders, with the old path kept ready for two weeks
- **Retire** the old path only when the rollback window closes

### Decision records
- Context, decision, **options rejected**, consequences — good and bad
- Kept **with the code**, so the reasons outlive the meeting
- Rollback after retirement is a **rebuild**: say how long it takes`,
  narration:
    "Architectures aren't finished; they evolve. The fulfilment service still runs on a legacy VM that's idle most of the time and that one person knows how to patch. Moving it to Cloud Run is sensible, and doing it safely means stages. First, shadow. The new service receives the same order events and computes shipments, but its results are only compared with the old system's, never used. Differences are bugs found for free. Second, send a share of real orders, ten percent, to the new path, and reconcile shipments daily against what the old path would have done. Third, move all orders, but keep the old path ready, idle, for two weeks. That's the rollback window. Fourth, retire the old VM only when the window closes. Be honest about what that means: after retirement, rolling back isn't a switch, it's rebuilding the VM, about two days. Then write the decision down, as an architecture decision record kept with the code. It states the context: the idle, hard-to-patch VM. The decision: Cloud Run fed by Pub/Sub, keeping Cloud SQL. The options rejected and why: GKE, because the team lacks Kubernetes skills, and keeping the VM, because of cost and patching. And the consequences, good and bad, including the ten-second shutdown notice that requires idempotent handlers. Next year, when someone asks why, the answer is in the repository, not in someone's memory. Next: reviewing the whole system.",
}
