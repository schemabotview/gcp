import type { Section } from '../types'

export const quotasAndResilience: Section = {
  id: 'quotas-and-resilience',
  title: 'Quotas, throttling, retries and resilience validation',
  scene: 'operations-resilience',
  focus: 'patterns',
  slide: `## Quotas, retries and resilience

Most failures are not Regions burning. They are quotas, slow dependencies and **retries that make things worse**.

### Quota errors
- **429 RESOURCE_EXHAUSTED** means a limit, not a bug
- Retry with **exponential backoff and jitter**, up to a deadline
- Request quota increases **before** a sale, not during

### When a dependency fails
- Every call has a **timeout**
- A **circuit breaker** stops calling a service that keeps failing
- **Degrade**: show cached stock rather than an error page

### Prove it
- Load tests, injected faults and **game days**, before customers find the gaps`,
  narration:
    "Most production trouble isn't a Region disappearing. It's quieter: a quota reached, a dependency slowing down, and retries that turn a small problem into a large one. Start with quotas. An error like four two nine, resource exhausted, means a limit was reached, for example writes per minute in a Region. It isn't a bug, and hammering the API won't help. Retry with exponential backoff, doubling the wait each time up to a cap, and add jitter, a random part of the delay, so thousands of clients don't all retry in the same instant. Give up after a deadline, and record that you did. Better still, plan quotas ahead: request increases weeks before the autumn sale, not during it. Dependencies fail too, as the payment call showed. Every outbound call needs a timeout, so one slow service can't hold every request open. A circuit breaker notices a dependency that keeps failing and stops calling it for a while, which gives it room to recover and fails fast for users. And degrade gracefully: if live stock is unavailable, show the cached figure with a note, rather than an error page. Finally, prove resilience instead of assuming it. Load-test at sale volume. Inject faults on purpose: stop a zone's instances, slow the payment dependency. And run game days where the team practises the runbooks. Next, the final chapter: optimising and evolving the whole architecture.",
}
