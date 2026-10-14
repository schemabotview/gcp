import type { Section } from '../types'

export const templatesAndGroups: Section = {
  id: 'templates-and-groups',
  title: 'Instance templates, groups, autoscaling and autohealing',
  scene: 'compute-migs',
  focus: 'signals',
  slide: `## Templates, groups, scaling and healing

An **instance template** is an immutable recipe for a VM. A **managed instance group** keeps the right number of identical VMs running from it.

### Regional groups
- Spread VMs across **zones** in one Region
- Losing a zone loses only that zone's share
- The group, not you, names new VMs and picks their zones

### Two different signals
- **Autoscaling** changes **how many** VMs run, from load
- **Autohealing** replaces **one** VM whose health check fails
- A health check needs an **initial delay** for start-up, or it recreates VMs too early

### Changing the recipe
- Make a **new** template, then roll it out across the group
- A **rolling update** replaces a few VMs at a time, keeping capacity`,
  narration:
    "Managing VMs one by one doesn't scale, so Compute Engine separates the recipe from the fleet. An instance template is the recipe: machine type, image, disks, network and service account. Templates are immutable, so a change means a new template, here orders version seven. A managed instance group, or MIG, then keeps a target number of identical VMs running from that template. A regional MIG spreads them across zones in one Region, so if one zone has a problem, only its share of the VMs is affected. Now the distinction that matters most in this section. A MIG responds to two different signals with two different actions. Autoscaling watches load, perhaps CPU utilisation against a target of sixty percent, and changes how many VMs the group should have. Autohealing watches an application health check on each VM, and when one stops answering, it recreates that VM. One adjusts capacity; the other replaces a sick member. They're configured separately and they fail separately. A group can be the right size and still full of broken VMs if there's no health check. Give the health check an initial delay that covers start-up time, or the group will keep recreating VMs that were simply still booting. To change the software, you create a new template and roll it out across the group with a rolling update, which replaces a few VMs at a time so capacity stays up. Next: why asking for more VMs doesn't always work.",
}
