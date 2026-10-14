import type { Section } from '../types'

export const sharedVpcAndPeering: Section = {
  id: 'shared-vpc-and-peering',
  title: 'Shared VPC, peering and ownership',
  scene: 'networking-shared-vpc',
  focus: 'host',
  slide: `## Shared VPC, peering and ownership

Projects separate ownership and billing. Networks often need to cross those lines. Two patterns do it, with very different ownership.

### Shared VPC — one network
- A **host project** owns the network: subnets, firewall rules, NAT
- **Service projects** run workloads in subnets they are granted
- The network team governs; app teams deploy

### Peering — two networks
- Each side keeps its **own** administration
- Ranges must **not overlap**, and routing is **not transitive**
- Peering connects networks; it does not merge their policies

### Choosing
- One organisation: **Shared VPC**; separate owners: **peering**`,
  narration:
    "Chapter one separated projects for ownership and billing. Networking often has to cross those lines, and there are two common patterns. With Shared VPC, there is one network, owned by a host project. The network team manages its subnets, firewall rules and NAT there, in one place. Service projects, such as retail prod and retail analytics, are attached to the host, and their workloads run in subnets they've been granted. App teams deploy without being able to change the network itself. That's usually the right shape inside one organisation: central governance, separate projects. VPC Network Peering is different. Two separate networks, each with its own owner and administration, exchange routes so their workloads can talk over internal addresses. Two rules decide whether it works. Ranges must not overlap, which is why the address plan mattered in section two. And routing is not transitive. Retail VPC is peered with the partner network, and the partner is peered with a third network, but retail still can't reach the third. Each pair needs its own peering. Peering also doesn't merge policies: each side keeps its own firewall rules, and traffic must be allowed on both. It doesn't share private DNS zones either; that needs DNS peering. So choose by ownership. One organisation that wants central control usually picks Shared VPC. Separate owners who need to connect use peering. Next: reaching the company's own data centre.",
}
