import type { Section } from '../types'

export const cloudDns: Section = {
  id: 'cloud-dns',
  title: 'Cloud DNS, private zones and resolution',
  scene: 'networking-dns',
  focus: 'zone',
  slide: `## Cloud DNS, private zones and resolution

Applications connect to **names**, and DNS turns names into addresses. A VM asks its network's resolver, which consults the zones **visible to that network**.

### Kinds of zone
- **Public** — answers anyone on the internet
- **Private** — answers only the VPC networks it is **authorised** for
- **Forwarding** — passes queries to another resolver, such as on-premises

### Reading a resolution failure
- \`NXDOMAIN\` means "no such name" **from where you asked**
- The same name can exist in one network and not another
- Share a private zone with another network by **DNS peering**
- A changed record is seen only after the old answer's **TTL** expires
- Check DNS before blaming routes or firewalls`,
  narration:
    "Applications don't connect to addresses; they connect to names. So before any packet is routed or filtered, a name has to be resolved. On Google Cloud, a VM sends its DNS queries to the metadata server address, one six nine dot two five four dot one six nine dot two five four, which hands them to Cloud DNS acting as that network's resolver. The resolver consults the zones that network is allowed to see. Cloud DNS has three kinds of zone you'll meet first. A public zone answers anyone on the internet. A private zone answers only the VPC networks you've authorised it for. And a forwarding zone passes queries on, for example to a DNS server in the data centre. Now the failure. The orders database has a private name, orders db dot internal dot retail dot example, in a zone authorised for retail VPC. From a VM in retail VPC, it resolves to ten dot twenty dot four dot five. From a VM in the analytics network, the same query returns NXDOMAIN, meaning no such name. Nothing is broken; the zone simply isn't visible there. The fix is to authorise that network, or to share the zone through DNS peering. The lesson is to read DNS failures for what they are: an answer about visibility from the place you asked. And remember caching: after you change a record, clients keep the old answer until its time to live expires. Check resolution before you blame routes or firewalls. Next: putting a load balancer in front.",
}
