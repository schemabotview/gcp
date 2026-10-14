import type { Scene } from '@graphlearning/flow'

// §2 — a bucket, its location, and an object inside it. Object names look like paths but are flat
// strings; an object is replaced whole, never edited in place. Names illustrative.
export const storageBuckets: Scene = {
  id: 'storage-buckets',
  title: 'Buckets, objects and locations',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'commands',
      kind: 'code',
      filename: 'a bucket for product images',
      label: `gcloud storage buckets create gs://retail-product-images-7312 \\
    --location europe-west2 --uniform-bucket-level-access

gcloud storage cp linen-shirt.jpg \\
    gs://retail-product-images-7312/products/sku-1042/main.jpg

gcloud storage ls gs://retail-product-images-7312/products/sku-1042/
gs://retail-product-images-7312/products/sku-1042/main.jpg`,
    },
    {
      id: 'locations',
      label: 'Location type, chosen at creation',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'region', label: 'Region', sub: 'europe-west2: one Region', icon: 'building' },
        { id: 'dual', label: 'Dual-region', sub: 'two named Regions', icon: 'copy' },
        { id: 'multi', label: 'Multi-region', sub: 'EU: a large area', icon: 'globe' },
      ],
    },
    {
      id: 'facts',
      label: 'Three facts about objects',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'flat', label: 'Flat names', sub: "'/' is part of the name", icon: 'file' },
        { id: 'whole', label: 'Replaced whole', sub: 'no edits in place', icon: 'swap' },
        { id: 'global-name', label: 'Global names', sub: 'bucket names are unique', icon: 'globe' },
      ],
    },
  ],
  edges: [
    { source: 'commands', target: 'locations' },
    { source: 'locations', target: 'facts' },
  ],
}
