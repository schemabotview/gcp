import type { Scene } from '@graphlearning/flow'

// §4 — who pays. One Cloud Billing account, three linked projects, and an illustrative ledger of the
// charges they produce. The ledger is hypothetical on purpose: figures are made up to show the SHAPE
// of a cost line (project · service · SKU · cost), not a price.
export const foundationsBilling: Scene = {
  id: 'foundations-billing',
  title: 'One billing account pays for many projects',
  flow: 'TB',
  nodes: [
    { id: 'account', label: 'Billing account', sub: 'Retail Ltd · invoiced', pattern: 'external', icon: 'receipt' },
    {
      id: 'linked',
      label: 'Linked projects',
      sub: 'each links to one account at a time',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'p-prod', label: 'retail-prod', sub: 'production', icon: 'box' },
        { id: 'p-dev', label: 'retail-dev', sub: 'development', icon: 'box' },
        { id: 'p-data', label: 'retail-analytics', sub: 'reporting', icon: 'box' },
      ],
    },
    {
      id: 'ledger',
      kind: 'table',
      label: 'October ledger — hypothetical figures',
      headers: ['Project', 'Service', 'What was used', 'Cost'],
      values: [
        ['retail-prod', 'Cloud Run', 'vCPU and memory time', '£212.40'],
        ['retail-prod', 'Cloud SQL', 'instance hours, storage', '£318.75'],
        ['retail-prod', 'Networking', 'internet egress', '£46.10'],
        ['retail-dev', 'Cloud Run', 'vCPU and memory time', '£9.82'],
        ['retail-analytics', 'BigQuery', 'bytes scanned by queries', '£74.30'],
        ['retail-analytics', 'Cloud Storage', 'stored objects', '£12.05'],
      ],
    },
  ],
  edges: [
    { source: 'account', target: 'linked', label: 'pays for' },
    { source: 'linked', target: 'ledger', label: 'usage becomes charges' },
  ],
}
