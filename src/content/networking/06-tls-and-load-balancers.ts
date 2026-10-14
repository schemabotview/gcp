import type { Section } from '../types'

export const tlsAndLoadBalancers: Section = {
  id: 'tls-and-load-balancers',
  title: 'TLS, certificates and choosing a load balancer',
  scene: 'networking-load-balancing',
  focus: 'lb',
  slide: `## TLS, certificates and load balancers

The storefront now sits behind a **global external Application Load Balancer**. It holds one anycast IP, ends **TLS** with a Google-managed certificate, and forwards to Cloud Run.

### Along the path
- A **serverless NEG** tells the load balancer where the Cloud Run service lives
- Cloud Run **ingress** set to internal and load balancer: no bypassing the front door
- **Egress** to the database is a separate setting on the way out

### Choosing a load balancer
- Decide **protocol** first: HTTP(S), or TCP/UDP
- Then **reach**: internet or internal; global or regional
- Then whether you need the **client's own address** at the backend
- **Cloud Armor** and Cloud CDN attach at the Application Load Balancer`,
  narration:
    "Here's the whole storefront path, front to back. A browser looks up shop dot retail dot example. Cloud DNS returns one address, owned by a global external Application Load Balancer. That address is anycast, so users reach the nearest Google edge. The load balancer ends TLS there, using a Google-managed certificate that renews itself, and applies its routing rules. A serverless network endpoint group tells it which Cloud Run service, in which Region, to forward to. The service's ingress setting allows only internal traffic and traffic from the load balancer, so nobody can bypass the front door by calling the run dot app URL directly. Then, on the way out, Direct VPC egress carries the service's database calls to Cloud SQL's private address. Notice that ingress and egress are separate settings. One controls who can reach the service; the other controls how the service reaches others. Neither one is the caller's permission. That's still IAM, or the application's own login. The table is a starting point for choosing a load balancer. Decide the protocol first: HTTP and HTTPS get Application Load Balancers, while other TCP or UDP traffic gets Network Load Balancers. Then decide reach: from the internet or only inside your network, global or regional. An external Application Load Balancer is also where Cloud Armor and Cloud CDN attach. Finally, if the backend must see the client's real address, choose a passthrough balancer. Next: reaching Google's own services privately.",
}
