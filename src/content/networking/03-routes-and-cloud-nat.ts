import type { Section } from '../types'

export const routesAndCloudNat: Section = {
  id: 'routes-and-cloud-nat',
  title: 'Routes, internet egress and Cloud NAT',
  scene: 'networking-routes',
  focus: 'nat',
  slide: `## Routes, internet egress and Cloud NAT

Every packet follows the most specific matching **route**. Subnet routes keep traffic inside the network; the **default route** sends everything else to the internet gateway.

### The way out
- The internet gateway works only for a source with an **external IP**
- Private VMs and Cloud Run (through **Direct VPC egress**) use **Cloud NAT** instead
- NAT can use a **static** address that a partner can allowlist
- With neither, outbound internet calls simply **fail**

### What NAT is not
- **Outbound only** — nothing on the internet can start a connection in
- A managed config on **Cloud Router**, not a VM you run
- A route to the internet is not permission to call an API`,
  narration:
    "Every packet that leaves a VM is matched against the network's routes, and the most specific match wins. The route list shows the two kinds every network has. Subnet routes say that anything for ten dot twenty or ten dot thirty stays inside retail VPC. And the default route, zero dot zero dot zero dot zero slash zero, sends everything else to the default internet gateway. But that gateway only works for a source with an external IP address, and production workloads usually shouldn't have one. So how does an internal-only VM, or a Cloud Run service, call the payments provider? Through Cloud NAT. Cloud NAT is regional, it's configured on a Cloud Router rather than run on a VM, and it translates private source addresses to one or more external ones. Cloud Run joins in through Direct VPC egress, with all its outbound traffic routed into the network, so it leaves through the same NAT. That has a useful side effect. Give the NAT a static address, and the payments provider can allowlist exactly that address. Two limits, though. NAT is outbound only: nothing on the internet can open a connection inward through it. And a route is only a path. Reaching the payments API says nothing about whether your call will be accepted. Next: the rules that decide which traffic is allowed at all.",
}
