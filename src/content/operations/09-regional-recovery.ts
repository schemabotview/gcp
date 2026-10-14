import type { Section } from '../types'

export const regionalRecovery: Section = {
  id: 'regional-recovery',
  title: 'RTO, RPO, regional recovery and failback',
  scene: 'operations-recovery',
  focus: 'order',
  slide: `## RTO, RPO and regional recovery

Two numbers define a recovery target: **RTO**, how soon service must return, and **RPO**, how much data may be lost.

### The targets
- Lose europe-west2: back in **2 hours**, losing at most **15 minutes** of orders
- RPO decides the data method: a **cross-region replica**, not nightly backups
- Tighter targets cost more: a **warm** standby versus a cold restore

### Recovery order
- Identity → network → **data** → services → traffic → verify
- Each step depends on the ones before it
- The plan lives in **Terraform** and a runbook, not in memory

### After the event
- **Failback** is a second, planned migration
- A target is only a claim until a **drill** has met it`,
  narration:
    "High availability, from chapter seven, survives losing a zone. Losing a whole Region needs a recovery plan, and two numbers define it. The recovery time objective, RTO, is how soon service must return. The recovery point objective, RPO, is how much data may be lost. For the retail application, losing europe west 2 should mean service back within two hours, losing at most fifteen minutes of orders. The RPO immediately rules things out. Nightly backups could lose a day, so the orders database needs a cross-region replica in europe west 1. Tighter targets always cost more: a warm standby that's already running recovers faster than a cold restore, and is paid for every day. Then the order of recovery, because each step depends on the ones before it. Identity first: IAM is global, but confirm the people and pipelines who'll do the work can act in the new Region. Then the network: the subnet, NAT and firewall rules, which should already exist in Terraform. Then data: promote the replica, or restore from backup if the replica is unusable. Then services: deploy the same image digests, with configuration pointing at the new database. Then traffic: send the load balancer to the new Region. And finally verify, by placing real orders and checking totals. Afterwards comes failback, moving back to London, which is a second migration with its own risks and should be planned just as carefully. And treat the targets as claims until a drill has met them. Next: the everyday failures that test resilience.",
}
