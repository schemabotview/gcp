import type { Section } from '../types'

export const vpcAndSubnets: Section = {
  id: 'vpc-and-subnets',
  title: 'Global VPC networks and regional subnets',
  scene: 'networking-vpc',
  focus: 'vpc',
  slide: `## Global VPC networks and regional subnets

A **VPC network** is global: one set of routes and firewall rules across every Region. Each **subnet** belongs to exactly one Region and owns one CIDR range.

### Plan addresses first
- Use **custom mode** and choose every range yourself
- Leave room for Regions and services you have not built yet
- Never reuse a range that exists **on-premises** or in a partner's network
- A subnet's range can be **expanded** later, never shrunk

### Global is not resilient
- A global network does not copy your application anywhere
- If every subnet you use sits in London, the app fails with London
- Resilience comes from **where you run things**, not from network scope`,
  narration:
    "A VPC network is Google Cloud's private network for your resources, and it has an unusual shape. The network itself is global. One set of routes and firewall rules applies across every Region. Subnets are regional. Each one belongs to a single Region and owns one CIDR range. Here, retail VPC has a subnet in London, ten dot twenty slash twenty, and one in Belgium, ten dot thirty slash twenty. A VM in London can reach a VM in Belgium over internal addresses with no extra setup. Network creation offers two modes. Auto mode creates a subnet in every Region from a fixed block. That's convenient, but those ranges are the same in every auto mode network, so they clash the moment you try to connect two of them. Custom mode makes you choose every range, which is what production should do. So the plan is written down before the first subnet. It leaves ten dot forty free for a future Region, and it never touches one seventy two dot sixteen, which the company's data centre already uses. Subnets can be expanded later but never shrunk, so start modest. Now the contrast this chapter keeps returning to. A global network does not make an application global. It doesn't copy anything anywhere. If every subnet the storefront uses sits in London, the storefront fails with London. Resilience comes from where you choose to run things. Next: how traffic finds its way out.",
}
