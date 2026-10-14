import type { Scene } from '@graphlearning/flow'

// §3 — cost by workload from the billing export, grouped by an "app" label. Labels only help if they
// were on the resources before the spend; unlabelled cost is the first thing to fix.
export const architectureCost: Scene = {
  id: 'architecture-cost',
  title: 'Cost by workload, from the billing export',
  flow: 'TB',
  nodes: [
    {
      id: 'query',
      kind: 'code',
      filename: 'September net cost by app label',
      label: `SELECT
  (SELECT value FROM UNNEST(labels) WHERE key = 'app') AS app,
  service.description                                 AS gcp_service,
  ROUND(SUM(cost)
    + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) AS c), 0)), 2) AS net_cost
FROM \`retail-billing-1101.billing.gcp_billing_export_v1_01A2B3_C4D5E6_F7G8H9\`
WHERE invoice.month = '202609'
GROUP BY app, gcp_service
ORDER BY net_cost DESC`,
    },
    {
      id: 'result',
      kind: 'table',
      label: 'Top rows (hypothetical)',
      headers: ['app', 'gcp_service', 'net_cost (£)'],
      values: [
        ['orders', 'Cloud SQL', '1,284.10'],
        ['(no label)', 'Compute Engine', '968.40'],
        ['analytics', 'BigQuery', '712.55'],
        ['storefront', 'Cloud Run', '355.20'],
        ['orders', 'Cloud Logging', '201.75'],
      ],
    },
  ],
  edges: [{ source: 'query', target: 'result', label: 'row 2 is the first finding' }],
}
