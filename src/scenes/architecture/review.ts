import type { Scene } from '@graphlearning/flow'

// §7 — a Well-Architected review of the retail application across the six pillars, each finding
// tied back to the chapter that explains it, then the few that are worth doing first.
export const architectureReview: Scene = {
  id: 'architecture-review',
  title: 'A whole-system review',
  flow: 'TB',
  nodes: [
    {
      id: 'findings',
      kind: 'table',
      label: 'Well-Architected review: retail application',
      headers: ['Pillar', 'Finding', 'Chapter'],
      values: [
        ['Operational excellence', 'two services lack runbooks', '11'],
        ['Security, privacy, compliance', 'standing Owner grants remain', '2, 11'],
        ['Reliability', 'regional recovery never drilled', '11'],
        ['Cost optimisation', '£968 a month unlabelled', '12'],
        ['Performance', 'p99 dominated by payments call', '12'],
        ['Sustainability', 'stock VM 11 % utilised', '12'],
      ],
    },
    {
      id: 'priorities',
      label: 'Do first: high risk, low effort',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'p1', label: '1 · Owner grants', sub: 'move to just-in-time access', icon: 'key' },
        { id: 'p2', label: '2 · Recovery drill', sub: 'prove RTO and RPO once', icon: 'circlecheck' },
        { id: 'p3', label: '3 · Labels', sub: 'then rightsize what they reveal', icon: 'tag' },
      ],
    },
    {
      id: 'practice',
      label: 'What only practice establishes',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'pr-deploy', label: 'Real deployments', sub: 'your own, end to end', icon: 'boxes' },
        { id: 'pr-incident', label: 'Real incidents', sub: 'handled, then reviewed', icon: 'bell' },
        { id: 'pr-restore', label: 'Real restores', sub: 'timed and checked', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'findings', target: 'priorities', label: 'ranked by risk and effort' },
    { source: 'priorities', target: 'practice', label: 'and beyond this course' },
  ],
}
