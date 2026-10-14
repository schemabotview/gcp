import type { Section } from '../types'

export const rightsizingAndCommitments: Section = {
  id: 'rightsizing-and-commitments',
  title: 'Rightsizing, commitments, utilisation and sustainability',
  scene: 'architecture-rightsizing',
  focus: 'l2',
  slide: `## Rightsize, then commit

Three levers reduce the same bill. The **order** matters, because a commitment locks in whatever size you have.

### In order
- **Remove** what serves nothing: idle VMs, orphaned disks, old snapshots
- **Rightsize** the rest: the stock VM uses 11 % of 8 vCPUs, so 2 will do
- **Commit** to the steady base that remains, for a discount

### Committing first
- Locks in **idle** capacity at a discount — still paying for waste

### Sustainability
- A Region's **carbon-free energy** share differs from its price
- Idle capacity uses energy even when nobody uses it
- A cheaper choice is not automatically a **greener** one`,
  narration:
    "Three levers reduce the same bill, and pulling them in the wrong order wastes money. First, remove what serves nothing. The unlabelled Compute Engine spend from the last section turned out to include two VMs from a finished experiment, plus disks and snapshots nobody had deleted. Removing them is pure saving. Second, rightsize what's left. Google's recommender looks at utilisation and suggests smaller machine types. The stock VM has eight virtual CPUs and uses eleven percent of them, so two will do, with headroom. Third, commit. A committed use discount trades a one or three year commitment for a lower price on the steady base load that remains. Look at the card to see why the order matters. Commit first, and you lock in eight vCPUs for three years at a discount, while six of them sit idle. You're paying less per unit for waste. Rightsize first, and the discount applies to what you actually use. Sustainability sits beside cost, not under it. Google publishes each Region's carbon-free energy percentage, the share of its electricity that comes from carbon-free sources, and it differs between Regions in ways that don't follow price. Idle capacity uses energy even when it serves no one, so the rightsizing you just did helps both. But a cheaper Region or machine isn't automatically a lower-carbon one. Compare both, separately. Next: comparing whole designs.",
}
