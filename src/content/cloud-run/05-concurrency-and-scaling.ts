import type { Section } from '../types'

export const concurrencyAndScaling: Section = {
  id: 'concurrency-and-scaling',
  title: 'Concurrency, scaling and cold starts',
  scene: 'cloud-run-scaling',
  focus: 'arithmetic',
  slide: `## Concurrency, scaling and cold starts

Cloud Run adds instances as load rises and, by default, scales to **zero** when idle. Each instance handles up to **80** concurrent requests unless you change it.

### The trade-offs
- **Cold start** — a request that waits for a new instance pays for its start-up
- **Min instances** keep warm capacity, and are billed while idle
- **Max instances** cap cost — and protect what sits downstream
- **Request-based billing** charges CPU only while requests run; instance-based charges for the whole lifetime

### Downstream capacity
- Instances × pool size = connections the **database** must accept
- Scaling the front end does not scale its dependencies`,
  narration:
    "Cloud Run scales for you, but it's worth doing the arithmetic yourself. Each instance handles up to eighty concurrent requests by default, and you can raise that to a thousand for code that mostly waits on the network. Suppose the storefront peaks at two thousand four hundred concurrent requests. Divided by eighty, that's thirty instances, comfortably under the default maximum of a hundred. Now the line people forget. If each instance opens a pool of five database connections, the database sees a hundred and fifty connections at peak. Scaling the front end didn't scale the database, and that's usually the first thing to break. Maximum instances is as much a protection for your dependencies as a cap on cost. At the other end, the minimum is zero by default, so an idle service costs nothing. The price is the cold start. A request that arrives when no instance is free waits while one starts: the image is pulled, the container boots, the code imports libraries and opens its connections. That's why start-up work should be lean. Setting minimum instances keeps warm capacity, but you pay for it while it's idle. Billing is a choice too. Request-based billing, the default, charges for CPU only while requests are being handled, so work done after the response may barely run. Instance-based billing charges for the instance's whole lifetime. Next: evidence when things go wrong, and rolling back.",
}
