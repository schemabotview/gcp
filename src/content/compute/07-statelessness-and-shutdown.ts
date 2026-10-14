import type { Section } from '../types'

export const statelessnessAndShutdown: Section = {
  id: 'statelessness-and-shutdown',
  title: 'Statelessness, scaling signals and graceful shutdown',
  scene: 'compute-shutdown',
  focus: 't3',
  slide: `## Statelessness and graceful shutdown

Every platform in this chapter **replaces** instances: when scaling in, healing, upgrading, or reclaiming Spot capacity. Code must expect it.

### The interrupted worker
- It writes a shipment, then is stopped **before** acknowledging the job
- The job is delivered again, and a naive worker ships **twice**
- The fix is a write that is **safe to repeat**, keyed by order

### Using the notice
- Stop taking new work, finish or hand back what is in flight
- Notice is short: about **30 s** on Spot or GKE, **10 s** on Cloud Run
- On a VM, a **shutdown script** can run during that notice
- Keep durable state in **databases and storage**, never on the instance`,
  narration:
    "Every platform in this chapter replaces instances as a matter of routine. Autoscalers remove them when load drops. Autohealing recreates them. Upgrades roll through them. And Spot capacity can be reclaimed at short notice. So code has to expect its instance to disappear. Here's the failure to design against. A fulfilment worker on a Spot VM takes a job: ship order five eight two one three. It inserts a shipment row. Then, before it acknowledges the job as done, its VM is reclaimed. From the queue's point of view the job never finished, so it's delivered again, and a naive worker creates a second shipment. A longer grace period won't fix that, because the interruption can land between any two lines. The real fix is to make the write safe to repeat. Here the shipments table has a unique key on the order, and the insert does nothing if a shipment already exists, so the second attempt changes nothing. Use the notice you do get, too. When the shutdown signal arrives, stop taking new work and finish or hand back what's in flight. The notice is short: up to about thirty seconds for Spot VMs and by default for GKE pods, and ten seconds after Cloud Run's terminate signal. On a VM, a shutdown script can use that window. And keep durable state where it belongs, in databases and storage, never on the instance. Which brings us to storage, next chapter.",
}
