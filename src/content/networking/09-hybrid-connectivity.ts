import type { Section } from '../types'

export const hybridConnectivity: Section = {
  id: 'hybrid-connectivity',
  title: 'VPN, Cloud Interconnect and Cloud Router',
  scene: 'networking-hybrid',
  focus: 'router',
  slide: `## VPN, Interconnect and Cloud Router

The retail company's warehouse systems still run in its own data centre. **Hybrid connectivity** joins that network to the VPC.

### The options
- **HA VPN** — encrypted IPsec tunnels over the internet; fastest to set up
- **Dedicated Interconnect** — your own circuit at a colocation site
- **Partner Interconnect** — a provider's circuit, when you have no presence there
- **Cross-Cloud Interconnect** — the same idea, to another cloud provider

### Shared machinery
- **Cloud Router** exchanges routes by **BGP**, so new subnets appear on both sides
- The SLA depends on **redundant** tunnels or links, built as documented
- Interconnect traffic is **not encrypted** by default; decide whether it must be`,
  narration:
    "The retail company's warehouse and fulfilment systems still run in its own data centre, so the VPC network needs a private path there. That's hybrid connectivity, and there are three main options. HA VPN creates encrypted IPsec tunnels over the public internet between a Google gateway and the company's router. It's the fastest to set up, suits modest volumes, and often stays as a backup even after a dedicated link exists. Dedicated Interconnect is a physical circuit between your equipment and Google's, at a colocation facility where both are present. It carries large, steady volumes with more predictable latency. Partner Interconnect gives a similar private path through a service provider, for companies with no presence at one of those facilities. Cross-Cloud Interconnect applies the same idea to another cloud provider. All three share one piece of machinery: Cloud Router. It speaks BGP with the company's router, so each side learns the other's address ranges automatically. When a new subnet is added in Google Cloud, it's advertised to the data centre without anyone editing static routes. Two cautions. First, availability is a design, not a product. HA VPN's service level assumes both tunnels to properly redundant peer equipment, and Interconnect's assumes redundant links, built the way Google documents. Second, Interconnect traffic isn't encrypted by default, so decide whether it must be. With the paths in place, next we compare the places code can run.",
}
