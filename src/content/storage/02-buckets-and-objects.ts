import type { Section } from '../types'

export const bucketsAndObjects: Section = {
  id: 'buckets-and-objects',
  title: 'Cloud Storage buckets, objects and locations',
  scene: 'storage-buckets',
  focus: 'locations',
  slide: `## Buckets, objects and locations

A **bucket** holds objects and has one **location**, chosen at creation. An **object** is bytes plus metadata, stored under a name.

### Locations
- **Region** — one Region, lowest latency to compute there
- **Dual-region** — two named Regions
- **Multi-region** — a large area such as \`EU\`
- Choose by where readers are, residency rules, and failure tolerance
- Location also sets **price**, and the cost of reading from elsewhere

### Objects
- Names are **flat**: \`products/sku-1042/main.jpg\` is one string
- An object is **replaced whole**, never edited in place
- Bucket names share one **global** namespace
- A **hierarchical namespace** option adds real folders, if you need them`,
  narration:
    "Cloud Storage organises data into buckets and objects. A bucket has a name, some settings, and a location that you choose when you create it and can't simply change later. The storefront's images go in a bucket in europe west 2, close to the Cloud Run service that links to them. There are three location types. A Region keeps data in one Region, which gives the lowest latency to compute in that Region. A dual-region keeps data in two named Regions. A multi-region, such as E U, spreads it across a large geographic area. Choose by where the readers are, by any data residency rules, and by what failure you need to tolerate. Then come objects. The copy command uploads a photo as products slash sku one zero four two slash main dot jpg. That looks like folders, but by default the name is one flat string, and the slashes are just characters that tools display as folders. Listing with a prefix finds everything whose name starts with it. If you need real folders, with atomic renames, buckets can be created with a hierarchical namespace. An object is replaced whole: there's no editing a few bytes in the middle. To change the photo, you upload a new one under the same name. And bucket names share one global namespace across all of Google Cloud, which is why the bucket name carries the project's number. Next: who can read and write these objects.",
}
