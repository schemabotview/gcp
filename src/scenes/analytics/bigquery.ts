import type { Scene } from '@graphlearning/flow'

// §4 — a first analytical query, its expected output, and where BigQuery keeps things. The dataset's
// location decides where the query runs. Figures illustrative.
export const analyticsBigquery: Scene = {
  id: 'analytics-bigquery',
  title: 'A first BigQuery summary',
  flow: 'TB',
  nodes: [
    {
      id: 'query',
      kind: 'code',
      filename: 'weekly revenue by category',
      label: `SELECT
  DATE_TRUNC(o.placed_date, WEEK(MONDAY)) AS week,
  p.category,
  SUM(l.qty * l.price_gbp)                AS revenue_gbp,
  COUNT(DISTINCT o.order_id)              AS orders
FROM \`retail-analytics-2290.sales.orders\`      AS o
JOIN \`retail-analytics-2290.sales.order_lines\` AS l USING (order_id)
JOIN \`retail-analytics-2290.sales.products\`    AS p USING (sku)
WHERE o.placed_date BETWEEN '2026-09-28' AND '2026-10-11'
  AND o.status != 'cancelled'
GROUP BY week, category
ORDER BY week, revenue_gbp DESC`,
    },
    {
      id: 'result',
      kind: 'table',
      label: 'Expected rows (first four)',
      headers: ['week', 'category', 'revenue_gbp', 'orders'],
      values: [
        ['2026-09-28', 'shirts', '48,210.00', '1,402'],
        ['2026-09-28', 'knitwear', '31,877.50', '688'],
        ['2026-10-05', 'shirts', '52,964.00', '1,531'],
        ['2026-10-05', 'knitwear', '29,105.00', '641'],
      ],
    },
  ],
  edges: [{ source: 'query', target: 'result', label: 'runs as a job in the dataset’s location' }],
}
