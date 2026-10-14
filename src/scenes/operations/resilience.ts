import type { Scene } from '@graphlearning/flow'

// §10 — a quota error and the retry policy that avoids making it worse, then the habits that test
// resilience before a real failure does. Error text abridged.
export const operationsResilience: Scene = {
  id: 'operations-resilience',
  title: 'Quotas, retries and practising failure',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'error',
      kind: 'code',
      filename: 'a quota error, and a polite retry',
      label: `429 RESOURCE_EXHAUSTED: Quota exceeded for quota metric 'Write requests'
                          and limit 'Write requests per minute per region'

delay = min(cap, base * 2 ** attempt)        # 0.5 s, 1 s, 2 s, 4 s … capped
sleep(random.uniform(0, delay))              # jitter: callers do not retry in step
give up after a deadline, and record that it happened`,
    },
    {
      id: 'patterns',
      label: 'When a dependency fails',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'timeouts', label: 'Timeouts', sub: 'every call has one', icon: 'clock' },
        { id: 'breaker', label: 'Circuit breaker', sub: 'stop calling a failing service', icon: 'power' },
        { id: 'degrade', label: 'Degrade', sub: 'show cached stock, not an error', icon: 'layers' },
        { id: 'quota-plan', label: 'Quota plan', sub: 'request increases before a sale', icon: 'calendar' },
      ],
    },
    {
      id: 'practise',
      label: 'Validate before it happens',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'load', label: 'Load test', sub: 'at sale volume', icon: 'gauge' },
        { id: 'fault', label: 'Inject faults', sub: 'kill a zone, slow a dependency', icon: 'zap' },
        { id: 'gameday', label: 'Game day', sub: 'people practise the runbook', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'error', target: 'patterns' },
    { source: 'patterns', target: 'practise' },
  ],
}
