import type { Section } from '../types'

export const consistencyAndPreconditions: Section = {
  id: 'consistency-and-preconditions',
  title: 'Consistency, generations and preconditions',
  scene: 'storage-consistency',
  focus: 'precondition',
  slide: `## Consistency, generations and preconditions

Cloud Storage is **strongly consistent**: after a write or delete succeeds, every read and listing sees it. That does not stop two writers from **overwriting** each other.

### Generations and preconditions
- Every write of an object gets a new **generation** number
- \`ifGenerationMatch\` writes only if nothing changed since you read: else **412**
- \`ifGenerationMatch=0\` creates only if no object exists
- Handle a 412 by **re-reading**, never by dropping the precondition

### Where the promise stops
- Each object is atomic; there are **no transactions** across objects
- Access-control changes can take **time** to take effect
- Cached public copies stay **stale** until their Cache-Control expires`,
  narration:
    "Cloud Storage gives a strong promise. Once a write or delete succeeds, every later read and every listing reflects it, anywhere in the world. But strong consistency doesn't prevent lost updates. Look at the scene. The catalogue file is at generation one seven one two. Writer A reads it to change a price. Writer B reads it to change a stock level. A writes generation one seven one three. Then B writes its version, built from the old copy, and A's price change is silently gone. Every write did exactly what it was asked. The fix is a precondition. Every write of an object gets a new generation number. If B writes with if generation match equals one seven one two, Cloud Storage checks first, sees that the generation has moved on, and refuses with four one two, precondition failed. B then re-reads, merges, and tries again. A special value, zero, means create this only if no live object exists, which makes a first write safe to retry. Know where the promise stops, too. Each object is atomic on its own, but there are no transactions across objects: you can't update two objects together, all or nothing. Access-control changes can take time to take effect. And if a public object is served through a cache, readers see the cached copy until its Cache-Control time expires. Next: making storage cheaper, and protecting it.",
}
