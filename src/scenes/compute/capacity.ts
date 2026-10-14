import type { Scene } from '@graphlearning/flow'

// §4 — four different things that people call "capacity". Only a reservation holds zonal capacity;
// a commitment is a price; a quota is a permission; a Spot VM is cheap capacity that can be taken
// back.
export const computeCapacity: Scene = {
  id: 'compute-capacity',
  title: 'Quota, commitment, reservation, Spot',
  flow: 'TB',
  nodes: [
    {
      id: 'failure',
      kind: 'code',
      filename: 'scaling out during a sale (abridged)',
      label: `ERROR: (gcloud.compute.instances.create) Could not fetch resource:
 - The zone 'projects/retail-prod-7312/zones/europe-west2-a' does not have
   enough resources available to fulfill the request.
   '(resource type:compute)'. Try a different zone, or try again later.
# quota was fine; the zone simply had no room for this machine type`,
    },
    {
      id: 'terms',
      kind: 'table',
      label: 'Four things called capacity',
      headers: ['Term', 'What it is', 'Holds capacity?'],
      values: [
        ['Quota', 'a limit on how much you may ask for', 'no'],
        ['Committed use discount', 'a lower price for 1 or 3 years of use', 'no'],
        ['Reservation', 'zonal capacity held for you; billed when idle', 'yes'],
        ['Spot VM', 'spare capacity, deeply discounted', 'no: up to 30 s notice'],
      ],
    },
    {
      id: 'design',
      label: 'Designing for a full zone',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'zones', label: 'Several zones', sub: 'a shortage is not an outage', icon: 'layers' },
        { id: 'types', label: 'Machine types', sub: 'allow a similar fallback shape', icon: 'cpu' },
        { id: 'spot-only', label: 'Spot for resumable work', sub: 'batch, not checkout', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'failure', target: 'terms', label: 'which of these would have helped?' },
    { source: 'terms', target: 'design' },
  ],
}
