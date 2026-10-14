import type { Section } from '../types'

export const cloudCdn: Section = {
  id: 'cloud-cdn',
  title: 'Cloud CDN, cache keys and freshness',
  scene: 'architecture-cdn',
  focus: 'key',
  slide: `## Cloud CDN: caching at the edge

**Cloud CDN** serves cacheable responses from Google's edge, close to users. Requests it answers never reach the **origin**.

### Decide what is cacheable
- Product images: **long** TTLs; product pages: **short** ones
- Carts and accounts: **never** — mark them private and no-store

### Keys and freshness
- The **cache key** decides which requests share a copy
- Drop tracking parameters, or every link makes a new copy
- Change content with **versioned URLs**; save invalidation for emergencies

### The effect
- A **92 %** hit ratio cuts origin load **twelvefold** during a sale
- Caching trades **freshness** for speed: choose it per content type`,
  narration:
    "The cheapest request is one the application never sees. Cloud CDN, attached to the external Application Load Balancer from chapter four, caches responses at Google's edge, close to users, and answers repeat requests from there. The first decision is what's cacheable at all, and it's made per kind of content. Product images change rarely, so they get long time-to-live values, a day here. Product pages change with prices, so they're cached for only a minute. The stock badge must be live, so it's not cached. And carts and accounts are personal: they must never be cached, so the origin marks them private and no-store. Get that last one wrong and one customer sees another's basket. Next, the cache key decides which requests share a cached copy. By default it's based on the URL, so tracking parameters added by marketing links would make every link a separate copy and ruin the hit ratio. Drop them from the key. For freshness, prefer versioned URLs: when the shirt's photo changes, publish it under a new name, so the new copy is fetched naturally. Keep invalidation, which purges cached copies, for emergencies. The effect during a sale is large. With ninety-two percent of image and page requests served from the edge, the Cloud Run origin sees about a twelfth of the traffic. The trade is freshness: choose it per content type, deliberately. Next: what all of this costs, and who's spending it.",
}
