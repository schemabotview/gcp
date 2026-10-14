import type { Section } from '../types'

export const privateAccess: Section = {
  id: 'private-access',
  title: 'Private Google Access and Private Service Connect',
  scene: 'networking-private-access',
  focus: 'psc',
  slide: `## Private access to managed services

Three features have "private" in their names. They solve **different** problems, so choose by purpose, not by name.

### By purpose
- **Private Google Access** — VMs with no external IP can still reach Google APIs; a subnet setting
- **Private Service Connect** — an **endpoint** with an internal IP in your own subnet, for Google APIs or a published service
- **Private services access** — a **peering** to a Google-run network, used for Cloud SQL private IP

### What stays the same
- A private path still needs **IAM** permission at the service
- Names must **resolve** to the private address, or traffic goes the public way
- **Cloud SQL** can offer PSA and PSC on the same instance
- Several can coexist: record **which path** each workload uses`,
  narration:
    "Managed services like Cloud Storage and Cloud SQL don't live inside your VPC network, so how do private workloads reach them without the public internet? Google offers three features with private in their names, and they're easy to confuse. Choose them by purpose. Private Google Access is a subnet setting. It lets VMs that have no external address still reach Google APIs, such as the Cloud Storage API, using Google's API addresses. Private Service Connect creates an endpoint: an internal IP address in your own subnet that stands for a Google API bundle or for a specific published service. Here, ten dot twenty dot nine dot nine stands for a Cloud SQL instance, and you can create such endpoints from several networks, even networks owned by other teams. Private services access works by peering. You allocate an address range, and Google connects your network to a producer network where services like Cloud SQL get their private addresses. Cloud SQL can even offer both private services access and Private Service Connect on one instance, so record which path each workload actually uses. Two things stay the same whichever you choose. A private path grants nothing: the caller still needs IAM permission at the service. And DNS must agree. If the name still resolves to a public address, traffic will try the public route, which may be blocked or may simply not be what you designed. Next: sharing networks across projects and teams.",
}
