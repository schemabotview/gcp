import type { Section } from '../types'

export const cachingAndMigration: Section = {
  id: 'caching-and-migration',
  title: 'Memorystore, cache invalidation and migration',
  scene: 'databases-cache',
  focus: 'c3',
  slide: `## Caches and migrations

A **cache** such as Memorystore answers in milliseconds from memory. It also creates a **second copy** that can disagree with the database.

### Cache-aside
- Read: check the cache, else read the database and **store** the result
- A **TTL** limits how long a stale value can live
- On a write, **delete** the cached key so the next read refreshes it

### Migrating a database
- **Copy** everything, then **replicate** changes until the target catches up
- Cut over: stop writes, drain the lag, **switch** connections
- Decide the **way back** before you start, not during

### Both questions
- Which copy is **true**, and for how long can they differ?`,
  narration:
    "The last tool in this chapter makes reads fast by keeping a second copy. Memorystore is a managed in-memory store, compatible with Redis and Valkey, and the storefront uses it in the cache-aside pattern. On a read, check the cache first. If the product's there, return it in a millisecond. If not, read the database, store the result in the cache with a time to live, and return it. Now follow the timeline. At nine o'clock, the linen shirt is cached at thirty nine pounds, with a ten-minute time to live. At two minutes past, the price drops to twenty nine pounds in the database. For the next eight minutes, the cache keeps serving the old price, because nothing told it otherwise. The fix is to delete the cached key whenever the product is written, so the next read refreshes it, and keep the time to live as a safety net in case a delete is missed. The same question, which copy is true, governs moving a database. A migration copies all the data to the target, then replicates ongoing changes until the target catches up. At cutover, writes stop briefly, the remaining lag drains, and connections switch to the target. Database Migration Service can manage much of this for PostgreSQL. And decide the way back before you start, because during an incident is the worst time to design one. Next chapter: events and workflows.",
}
