import type { Scene } from '@graphlearning/flow'

// §6 — two retail jobs, two shapes. "Tell everyone an order was placed" is distribution; "call the
// carrier to book this pickup, no faster than 5 a second" is dispatch.
export const eventsTasks: Scene = {
  id: 'events-tasks',
  title: 'Dispatch work, or distribute events',
  flow: 'TB',
  nodes: [
    {
      id: 'two-jobs',
      label: 'Two jobs from the same order',
      pattern: 'user',
      cols: 2,
      children: [
        { id: 'job-event', label: 'Order placed', sub: "announce it: anyone may care", icon: 'bell' },
        { id: 'job-task', label: 'Book a pickup', sub: 'call one carrier API, rate-limited', icon: 'workflow' },
      ],
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Cloud Tasks and Pub/Sub, compared',
      headers: ['', 'Pub/Sub', 'Cloud Tasks'],
      values: [
        ['Invocation', 'implicit: publisher does not know who', 'explicit: one named target'],
        ['Fan-out', 'yes, a copy per subscription', 'no'],
        ['Rate control', 'subscriber flow control', 'queue rate limits'],
        ['Schedule for later', 'no', 'yes'],
        ['Deduplicate on create', 'no', 'yes, by task name'],
      ],
    },
  ],
  edges: [{ source: 'two-jobs', target: 'compare', label: 'left: Pub/Sub · right: Cloud Tasks' }],
}
