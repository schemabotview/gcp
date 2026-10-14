import type { Scene } from '@graphlearning/flow'

// §7 — promote one artefact through environments that live in separate projects. What changes between
// environments is configuration, never the image. Each step leaves a record someone can review.
export const deliveryPromotion: Scene = {
  id: 'delivery-promotion',
  title: 'Promote the artefact, not a rebuild',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'envs',
      kind: 'table',
      label: 'One digest, three projects',
      headers: ['', 'retail-dev-4821', 'retail-staging-6610', 'retail-prod-7312'],
      values: [
        ['image', 'sha256:9c07…', 'sha256:9c07…', 'sha256:9c07…'],
        ['min instances', '0', '0', '2'],
        ['database', 'orders-dev', 'orders-staging', 'orders-db'],
        ['who can deploy', 'pipeline, developers', 'pipeline', 'pipeline, after approval'],
      ],
    },
    {
      id: 'controls',
      label: 'A controlled change leaves a trail',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'pr', label: 'Reviewed change', sub: 'a pull request: code and config', icon: 'gitbranch' },
        { id: 'record', label: 'Release record', sub: 'which digest, when, by whom', icon: 'scroll' },
        { id: 'separation', label: 'Separation', sub: 'authors do not approve their own', icon: 'users' },
        { id: 'freeze', label: 'Change windows', sub: 'no deploys mid-sale', icon: 'calendar' },
      ],
    },
  ],
  edges: [{ source: 'envs', target: 'controls', label: 'what differs is configuration' }],
}
