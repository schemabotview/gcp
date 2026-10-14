import type { Scene } from '@graphlearning/flow'

// §5 — the orders API on three designs, costed from stated assumptions. Every line is hypothetical;
// the point is which lines exist and which ones differ. Totals are the column sums.
export const architectureCompare: Scene = {
  id: 'architecture-compare',
  title: 'Three designs, one honest cost comparison',
  flow: 'TB',
  nodes: [
    {
      id: 'assumptions',
      kind: 'code',
      filename: 'assumptions',
      label: `traffic   30 req/s average, 300 at peak, quiet overnight
region    europe-west2; same database, backups, logs and queries for all three
prices    illustrative monthly figures in £, not a quote`,
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Monthly cost by line (hypothetical)',
      headers: ['Line', 'VMs + MIG', 'GKE Autopilot', 'Cloud Run'],
      values: [
        ['compute under load', '410', '380', '350'],
        ['idle capacity', '260', '90', '15'],
        ['cluster fee', '—', '60', '—'],
        ['data transfer', '120', '120', '120'],
        ['logs', '45', '55', '45'],
        ['backups', '70', '70', '70'],
        ['analytics queries', '85', '85', '85'],
        ['total', '990', '860', '685'],
      ],
    },
    {
      id: 'reading',
      label: 'Reading the table',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'idle', label: 'Idle decides it', sub: 'the biggest difference is waste', icon: 'gauge' },
        { id: 'same', label: 'Shared lines', sub: 'half the bill is the same', icon: 'copy' },
        { id: 'not-only', label: 'Not only cost', sub: 'skills, control, latency too', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'assumptions', target: 'table' },
    { source: 'table', target: 'reading' },
  ],
}
