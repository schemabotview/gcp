import type { Scene } from '@graphlearning/flow'

// §7 — the order fulfilment process as a workflow: steps with retries, and a compensation step that
// undoes earlier work when a later step fails. Cloud Scheduler starts the nightly variant.
export const eventsWorkflows: Scene = {
  id: 'events-workflows',
  title: 'Orchestrate, retry, compensate',
  flow: 'TB',
  nodes: [
    {
      id: 'definition',
      kind: 'code',
      filename: 'fulfil-order.yaml (Workflows, abridged)',
      label: `main:
  params: [order]
  steps:
    - reserve:
        call: http.post
        args: { url: \${stock_url + "/reserve"}, body: \${order}, auth: { type: OIDC } }
    - charge:
        try:
          call: http.post
          args: { url: \${payments_url + "/charge"}, body: \${order}, auth: { type: OIDC } }
        retry: \${http.default_retry}
        except:
          as: e
          steps:
            - release:                       # compensate: undo the reservation
                call: http.post
                args: { url: \${stock_url + "/release"}, body: \${order}, auth: { type: OIDC } }
            - fail: { raise: \${e} }
    - ship:
        call: http.post
        args: { url: \${shipping_url + "/book"}, body: \${order}, auth: { type: OIDC } }`,
    },
    {
      id: 'roles',
      label: 'Who does what',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'wf', label: 'Workflows', sub: 'holds state between steps', icon: 'workflow' },
        { id: 'sched', label: 'Cloud Scheduler', sub: 'cron: starts nightly runs', icon: 'calendar' },
        { id: 'comp', label: 'Compensation', sub: 'your code; not a rollback', icon: 'history' },
      ],
    },
  ],
  edges: [{ source: 'definition', target: 'roles' }],
}
