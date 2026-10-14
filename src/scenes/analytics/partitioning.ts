import type { Scene } from '@graphlearning/flow'

// §5 — the same question against two table designs. Partitioning lets BigQuery skip whole days;
// clustering sorts within them. Bytes are what on-demand queries are billed by. Sizes illustrative.
export const analyticsPartitioning: Scene = {
  id: 'analytics-partitioning',
  title: 'Scan less, pay less',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'ddl',
      kind: 'code',
      filename: 'a partitioned, clustered events table',
      label: `CREATE TABLE sales.page_events (
  event_ts  TIMESTAMP, customer_id INT64, category STRING, sku STRING, action STRING
)
PARTITION BY DATE(event_ts)        -- one partition per day
CLUSTER BY category, sku;          -- sorted within each day`,
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'One week of shirt views: bytes scanned',
      headers: ['Table design', 'Bytes processed', 'Why'],
      values: [
        ['unpartitioned', '1.9 TB', 'reads every day ever stored'],
        ['partitioned by day', '41 GB', 'reads 7 of 900 days'],
        ['partitioned + clustered', '6 GB', 'skips other categories too'],
      ],
    },
    {
      id: 'pricing',
      label: 'Two ways to pay for queries',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'on-demand', label: 'On-demand', sub: 'billed by bytes processed', icon: 'receipt' },
        { id: 'capacity', label: 'Capacity (editions)', sub: 'billed by slot time reserved or used', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'ddl', target: 'compare', label: "WHERE DATE(event_ts) BETWEEN … AND category = 'shirts'" },
    { source: 'compare', target: 'pricing' },
  ],
}
