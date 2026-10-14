import type { Section } from '../types'

export const accessPatterns: Section = {
  id: 'access-patterns',
  title: 'Access patterns, transactions and data ownership',
  scene: 'databases-patterns',
  focus: 'map',
  slide: `## Access patterns before databases

Storage keeps bytes. A **database** answers questions about them, and each kind of database is good at different questions.

### Describe the data first
- What must change **together**, all or nothing?
- How is it read: **joins**, lookups by id, or scans?
- How big, how many writes per second, how many **Regions**?

### Then choose
- Orders and payments need **transactions**: Cloud SQL for PostgreSQL
- The catalogue is read by id: **Firestore**
- Bigtable and Spanner answer **specific** scale needs — not every growth spurt

### Ownership
- One service **owns** each dataset; others ask it, not its tables`,
  narration:
    "Cloud Storage keeps bytes safe, but it can't answer a question like: which orders for this customer are unpaid? That's a database's job, and different databases are good at different questions. So this chapter starts with the data, not with products. Look at the retail application's data in the table. Orders and payments involve several rows that must change together, all or nothing, and they're queried with joins. That calls for transactions, so the starting point is Cloud SQL for PostgreSQL. The product catalogue is read far more than it's written, usually one product at a time by its id, and its shape varies by category. Firestore fits that well. Sessions and hot reads need speed more than durability, which is a cache's job, Memorystore. Click events arrive at a huge rate, keyed by customer, which is where Bigtable could come in if volumes grow. And if stock were ever written in many Regions at once without overselling, Spanner would be the answer. Note those last two are introduced by specific requirements, not because a database has grown. Most growing databases need indexes, replicas or caches long before they need a different engine. One more principle: ownership. Each dataset should belong to one service. Other services ask that service through its API, rather than reading its tables directly, so schemas can change without breaking strangers. Next: Cloud SQL itself.",
}
