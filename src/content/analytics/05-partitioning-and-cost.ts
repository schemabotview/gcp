import type { Section } from '../types'

export const partitioningAndCost: Section = {
  id: 'partitioning-and-cost',
  title: 'Partitioning, clustering and query economics',
  scene: 'analytics-partitioning',
  focus: 'compare',
  slide: `## Partitioning, clustering and cost

How much a query **reads** decides how fast it runs and, with on-demand pricing, what it **costs**.

### Table design
- **Partition** by a date, so queries filtering on it skip other days
- **Cluster** by up to four columns, so blocks of other values are skipped
- The **filter** must use the partition column, or nothing is skipped
- **Require a partition filter** to refuse accidental full scans

### The same question, three designs
- Unpartitioned: **1.9 TB** read; partitioned: **41 GB**; plus clustering: **6 GB**

### Paying for queries
- **On-demand** bills bytes processed; **capacity** bills slot time
- A **dry run** reports bytes before you spend them`,
  narration:
    "In BigQuery, how much data a query reads decides how long it takes and, with on-demand pricing, what it costs. So table design is cost design. The page events table on the left is partitioned by the date of each event, so each day lives in its own partition, and clustered by category and product, so within each day, rows are sorted by those columns. Now ask one question three ways: how many shirt views were there last week? Against an unpartitioned table, BigQuery has to read the relevant columns for every day ever stored, about one point nine terabytes. Partitioned by day, it reads only the seven days in the filter, about forty one gigabytes. Partitioned and clustered, it also skips the blocks holding other categories, and reads about six. Same answer, a fraction of the bytes. There's a catch. The query must filter on the partition column itself. Filter on something else, and BigQuery has no way to know which days to skip. You can even set the table to require a partition filter, so an accidental full scan is refused. Next, pricing. With on-demand pricing, you pay for bytes processed, so these savings are direct. With capacity pricing, through BigQuery editions, you pay for slot time, the compute the queries use, and scanning less still means finishing sooner and leaving capacity for others. Either way, a dry run reports how many bytes a query will process before you run it, which is a cheap habit worth building. Next: processing data as it streams.",
}
