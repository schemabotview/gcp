import type { Scene } from '@graphlearning/flow'

// §3 — a Cloud Storage layout for raw and curated data. Paths carry the partition, files carry their
// own schema, and a contract says what producers promise. Names illustrative.
export const analyticsLake: Scene = {
  id: 'analytics-lake',
  title: 'A lake with a layout and a contract',
  flow: 'TB',
  nodes: [
    {
      id: 'layout',
      kind: 'code',
      filename: 'gs://retail-lake-7312/',
      label: `raw/orders/dt=2026-10-12/part-000.avro         # as captured, never edited
raw/orders/dt=2026-10-12/part-001.avro
curated/orders/dt=2026-10-12/part-000.parquet  # cleaned, typed, deduplicated
curated/order_lines/dt=2026-10-12/part-000.parquet
_contracts/orders.v3.json                      # the producer's promise`,
    },
    {
      id: 'choices',
      label: 'Three decisions that last',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'zones', label: 'Zones', sub: 'raw kept; curated rebuilt', icon: 'layers' },
        { id: 'format', label: 'Format', sub: 'Avro in, Parquet for queries', icon: 'file' },
        { id: 'partition', label: 'Partitioned paths', sub: 'dt= lets readers skip days', icon: 'calendar' },
      ],
    },
    {
      id: 'contract',
      label: 'A schema contract says',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'fields', label: 'Fields and types', sub: 'total_gbp is NUMERIC', icon: 'table' },
        { id: 'meaning', label: 'Meaning', sub: 'gross, before refunds', icon: 'search' },
        { id: 'changes', label: 'Change rules', sub: 'add fields; never repurpose', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'layout', target: 'choices' },
    { source: 'choices', target: 'contract' },
  ],
}
