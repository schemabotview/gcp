import type { Scene } from '@graphlearning/flow'

// §2 — Cloud CDN in front of the storefront: product images and public pages cached at the edge,
// carts and accounts never. The cache key and the freshness rules are design decisions.
export const architectureCdn: Scene = {
  id: 'architecture-cdn',
  title: 'Cache at the edge, protect the origin',
  flow: 'TB',
  stretch: true,
  padding: 0.17,
  nodes: [
    {
      id: 'decide',
      kind: 'table',
      label: 'What the storefront caches',
      headers: ['Content', 'Cache?', 'Cache-Control from origin'],
      values: [
        ['product images', 'yes, long', 'public, max-age=86400'],
        ['product page HTML', 'yes, briefly', 'public, max-age=60'],
        ['stock badge', 'no', 'no-store'],
        ['cart, account', 'never', 'private, no-store'],
      ],
    },
    {
      id: 'key',
      label: 'Cache key and freshness',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'k-key', label: 'Cache key', sub: 'URL; drop tracking parameters', icon: 'key' },
        { id: 'k-ttl', label: 'TTL', sub: 'how long a copy may be served', icon: 'clock' },
        { id: 'k-version', label: 'Versioned URLs', sub: 'main.v42.jpg: new name, new copy', icon: 'hash' },
        { id: 'k-invalidate', label: 'Invalidation', sub: 'for emergencies, not releases', icon: 'trash' },
      ],
    },
    {
      id: 'effect',
      label: 'The effect on the origin during a sale',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'hit', label: 'Cache hit ratio 92 %', sub: 'of image and page requests', icon: 'gauge' },
        { id: 'origin', label: 'Origin load ÷ 12', sub: 'Cloud Run sees far fewer requests', icon: 'boxes' },
      ],
    },
  ],
  edges: [
    { source: 'decide', target: 'key' },
    { source: 'key', target: 'effect' },
  ],
}
