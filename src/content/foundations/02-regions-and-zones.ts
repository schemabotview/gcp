import type { Section } from '../types'

export const regionsAndZones: Section = {
  id: 'regions-and-zones',
  title: 'Regions, zones and failure boundaries',
  scene: 'foundations-locations',
  focus: 'zone-a',
  slide: `## Regions, zones and failure boundaries

A **Region** is a geographic area, such as \`europe-west2\` in London. A **zone** is a deployment area inside it. Google advises treating each zone as a **single failure domain**.

### Every resource has a scope
- **Zonal** — a VM, a zonal disk: lost with its zone
- **Regional** — a Cloud Run service: spread across zones
- **Multi-region** — an \`EU\` bucket: data kept in several Regions
- **Global** — a VPC network, a global load balancer

### Scope is not resilience
- A global VPC whose subnets sit in one Region fails with that Region
- Several zones survive a zone; surviving a Region takes a **second Region** and a plan
- Each service documents **its own** failure boundary — read it`,
  narration:
    "Every Google Cloud resource lives somewhere, and where it lives decides what it can survive. A Region is a geographic area. Here it's europe-west2, which is London. Inside a Region there are zones, and Google's own guidance is to treat each zone as a single failure domain. So the scene places each resource in the narrowest box that matches its scope. A virtual machine and its zonal disk are zonal: if zone a has a bad day, that machine has a bad day with it. A Cloud Run service is regional, so Google runs it across the Region's zones for you. A Cloud Storage bucket with the location E U is multi-regional, which means its data is kept in more than one Region. At the top are global resources, such as a VPC network or a global load balancer, which have no single location at all. Here is the trap. Global scope describes where a resource can be used, not what it can survive. A VPC network is global, but its subnets are regional, and if every subnet you use sits in London, your application fails with London. Spreading across zones protects you from losing a zone. Surviving the loss of a Region needs a second Region, and a plan for using it. So never infer resilience from a word like global. Each service documents its own failure boundary, and the design has to be checked against that. With the physical side placed, next we look at the logical side: who owns these resources.",
}
