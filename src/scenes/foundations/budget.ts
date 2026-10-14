import type { Scene } from '@graphlearning/flow'

// §6 — a month of hypothetical spend against a £100 budget. The alerts fire at 50 / 90 / 100 %
// and the line keeps climbing past every one of them: the figure IS the claim that an alert-only
// budget notifies but does not stop usage. Below it, the two metadata systems and the project
// lifecycle that cleanup goes through. Stacked in one column so the plot gets the full width; the
// raised padding keeps the tall board clear of the eyebrow.
const spend = (d: number) => (d <= 18 ? d * 3.5 : 63 + (d - 18) * 7.5)
const days = Array.from({ length: 31 }, (_, i) => i + 1)

export const foundationsBudget: Scene = {
  id: 'foundations-budget',
  title: 'Budgets alert; they do not stop spend',
  cols: 1,
  padding: 0.17,
  nodes: [
    {
      id: 'spend-plot',
      kind: 'plot',
      label: 'retail-dev · October (hypothetical)',
      sub: 'alerts at 50, 90 and 100 % of a £100 budget',
      plot: {
        x: { min: 0, max: 31, step: 5, label: 'day' },
        y: { min: 0, max: 175, step: 25, label: 'spend (£)' },
        axes: 'corner',
        series: [
          { kind: 'line', points: [[0, 100], [31, 100]], dashed: true, color: 'warn', label: 'budget £100', labelAt: [2, 108] },
          { kind: 'line', points: [[0, 0], ...days.map((d): [number, number] => [d, spend(d)])], color: 'service', label: 'actual spend', labelAt: [24, 165] },
          { kind: 'marker', at: [14.3, 50], color: 'network', label: '50 %' },
          { kind: 'marker', at: [21.6, 90], color: 'network', label: '90 %' },
          { kind: 'marker', at: [23, 100], color: 'warn', label: '100 %', labelAt: [19.2, 107] },
        ],
      },
    },
    {
      id: 'metadata',
      label: 'Two kinds of metadata',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'labels', label: 'Labels', sub: 'per resource; cost reports', pattern: 'storage', icon: 'tag' },
        { id: 'tags', label: 'Tags', sub: 'inherited; usable in policy', pattern: 'network', icon: 'key' },
      ],
    },
    {
      id: 'lifecycle',
      label: 'Project lifecycle',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'active', label: 'Active', sub: 'resources running', icon: 'power' },
        { id: 'pending', label: 'Pending deletion', sub: '30 days; restorable', icon: 'clock' },
        { id: 'deleted', label: 'Deleted', sub: 'ID never reusable', icon: 'trash' },
      ],
    },
  ],
  edges: [],
}
