import type { Scene } from '@graphlearning/flow'

// §4 — an SLO for the orders API turned into an error budget and a burn-rate alert. The arithmetic is
// the point: 99.5 % over 28 days leaves about 3 hours 22 minutes of failure. Figures illustrative.
export const operationsSlos: Scene = {
  id: 'operations-slos',
  title: 'An SLO, its budget, and an alert',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'arithmetic',
      kind: 'code',
      filename: 'orders API — service level objective',
      label: `SLI     good requests / all requests, where good = 2xx and < 400 ms
SLO     99.5 % over a rolling 28 days
budget  0.5 % of requests may be bad
        = about 3 h 22 min of total failure in 28 days
alert   page if burning 14× faster than allowed over 1 hour
        (that pace would spend the whole budget in 2 days)`,
    },
    {
      id: 'parts',
      label: 'What makes an alert useful',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'symptom', label: 'Alert on symptoms', sub: 'users failing, not CPU high', icon: 'bell' },
        { id: 'runbook', label: 'Runbook link', sub: 'first steps, written in advance', icon: 'file' },
        { id: 'owner', label: 'An owner', sub: 'a rota that will answer', icon: 'usercheck' },
        { id: 'budget-use', label: 'Budget policy', sub: 'spent budget slows releases', icon: 'scale' },
      ],
    },
  ],
  edges: [{ source: 'arithmetic', target: 'parts' }],
}
