import type { Section } from '../types'

export const capacityAndSpot: Section = {
  id: 'capacity-and-spot',
  title: 'Capacity, reservations and Spot interruption',
  scene: 'compute-capacity',
  focus: 'terms',
  slide: `## Capacity, reservations and Spot

Scaling out assumes the zone **has room**. Usually it does. During a sale, the request can fail even though your quota allows it.

### Four different things
- **Quota** — a limit on what you may request, not a promise
- **Committed use discount** — a lower **price**, not held capacity
- **Reservation** — capacity held in one zone, **billed even when idle**
- **Spot VM** — spare capacity at a deep discount, reclaimable with up to **30 seconds** of notice

### Designing for it
- Spread across **zones**, and allow more than one machine type
- Reserve only what must start, no matter what
- Run on Spot only work that can **stop and resume**`,
  narration:
    "Elastic capacity sounds unlimited, but each zone has physical machines, and occasionally a zone doesn't have room for the machine type you asked for. The error on the left came during a sale. The project's quota was fine. The zone simply couldn't fit more of that machine type at that moment. Four terms get mixed up here, and only one of them helps directly. A quota is a limit on how much you're allowed to request. It's not a promise that the capacity exists. A committed use discount is a pricing agreement: commit to one or three years of use and pay less. It doesn't hold any capacity for you. A reservation does. It sets aside capacity for a machine type in one zone, and you pay for it whether or not anything runs in it. And Spot VMs are the opposite trade: spare capacity at a large discount, which Google can reclaim with up to thirty seconds of notice. Spot VMs have no fixed maximum runtime, but no guarantee either. So design for it. Spread across zones and allow more than one machine type, so a shortage in one place isn't an outage. Reserve only the capacity that must start no matter what, because reservations cost money when idle. And put on Spot only work that can stop and resume safely. Next: what goes into the images these machines run.",
}
