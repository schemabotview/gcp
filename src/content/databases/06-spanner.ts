import type { Section } from '../types'

export const spanner: Section = {
  id: 'spanner',
  title: 'Spanner: when, and when not',
  scene: 'databases-spanner',
  focus: 'decide',
  slide: `## Spanner, by requirement

**Spanner** is a relational database that **scales out**: data is split across many servers, yet transactions stay strongly consistent.

### What it offers
- SQL, schemas and **transactions** across the whole database
- **External consistency**: commit order matches real time
- **Regional** or **multi-region** configurations

### What it costs
- A higher price floor than a small Cloud SQL instance
- Multi-region writes travel further, so they take **longer**
- Schema and key design need care to avoid hot spots

### The test
- Choose it for a **requirement** a single primary cannot meet — not as a growth stage`,
  narration:
    "Sooner or later someone asks: shouldn't we just use Spanner? So it's worth being precise about what it's for. Spanner is a relational database with SQL, schemas and transactions, but unlike a single PostgreSQL primary, it scales out. Data is split across many servers, and the database keeps transactions strongly consistent across all of them. It goes further, offering what Google calls external consistency: if one transaction commits before another starts, everyone sees them in that order, as if the whole database were one machine. It runs in regional configurations, with replicas across zones, or multi-region configurations that survive the loss of a Region. That power has costs. The minimum price is higher than a small Cloud SQL instance. Multi-region writes have to reach replicas further apart, so they take longer. And schema and key design need care, because a badly chosen key concentrates load. So look at the decision table for the retail stock data. If the shop runs in one Region and takes a few thousand orders a minute, Cloud SQL is enough. If the load is mostly reads, replicas or a cache will help more. Only if stock is written in many Regions at once, and must never be oversold, does Spanner earn its cost. It's an answer to a requirement, not the next stage every database grows into. Next: a very different large-scale database.",
}
