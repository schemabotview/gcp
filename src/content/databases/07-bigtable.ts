import type { Section } from '../types'

export const bigtable: Section = {
  id: 'bigtable',
  title: 'Bigtable row keys and throughput',
  scene: 'databases-bigtable',
  focus: 'keys',
  slide: `## Bigtable and row-key design

**Bigtable** stores enormous tables of rows sorted by **row key**, built for very high read and write throughput with simple access.

### The key is everything
- Rows are stored **in key order**; the key is the only index
- A key that starts with the **time** sends every new write to one place
- Lead with something that **spreads** writes, such as the customer

### What it does and does not do
- Changes to **one row** are atomic; there are no multi-row transactions
- Throughput grows by adding **nodes** — if keys spread the load
- No SQL joins: design keys for the **scans** you need

### Fit
- Click streams, time series, large keyed lookups`,
  narration:
    "Bigtable is built for a different kind of scale: tables with billions of rows, taking very high rates of reads and writes, but with simple access. Rows are stored sorted by their row key, and the key is the only index. So designing the key is designing the database. Look at the first set of keys for click events. Each one starts with a timestamp. Since time only moves forward, every new write lands at the end of the key range, which is served by one part of the cluster. That's a hot spot: one node works flat out while the rest wait, and adding nodes doesn't help. The second design starts with the customer id, then the time. Writes from different customers now spread across the whole key range, and as a bonus, one customer's events sit together, so reading a customer's recent activity is a single short scan. A few more facts set expectations. Changes to a single row are atomic, but there are no transactions across rows. Throughput grows as you add nodes, but only if the keys spread the load. And there are no joins: you design keys for the scans you'll actually run. Bigtable fits click streams, time series and huge keyed lookups. It's not a replacement for the orders database. The retail app would only reach for it if click volume truly demanded it. Next: caches, and moving databases.",
}
