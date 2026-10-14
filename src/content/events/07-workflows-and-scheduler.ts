import type { Section } from '../types'

export const workflowsAndScheduler: Section = {
  id: 'workflows-and-scheduler',
  title: 'Workflows, Cloud Scheduler and compensation',
  scene: 'events-workflows',
  focus: 'comp',
  slide: `## Workflows and compensation

Fulfilment is **three** calls in order: reserve stock, take payment, book shipping. **Workflows** runs the sequence and remembers where it got to.

### The definition
- Each step **calls** a service, authenticated as the workflow's identity
- Steps can **retry** with a policy, and **catch** failures
- **Cloud Scheduler** starts runs on a timetable, like cron
- Each run has an **execution id** you can trace step by step

### Compensation
- If payment fails after stock was reserved, a step **releases** it
- Compensation is **your** code: a new action, not a rollback
- Design each step and each undo to be **safe to repeat**
- Keep heavy work in **services**; the workflow coordinates`,
  narration:
    "Fulfilling an order takes three calls to three services, in order: reserve the stock, take the payment, book the shipping. Chaining those calls inside one request handler is fragile. If the handler dies after the first call, nobody knows where things stand. Workflows is a managed orchestrator for exactly this. You describe the steps in YAML, and Workflows runs them, keeping the state between steps durably, so a long process survives restarts. Each step here calls a service over HTTP, authenticated as the workflow's own service account. The charge step has a retry policy, so a brief payment outage is retried automatically. And it has an except block, which runs if the charge finally fails. That block is the important idea in this section: compensation. The stock was already reserved. There's no database transaction spanning three services that could roll it back. So the workflow takes a new action, calling the stock service's release endpoint, to undo the earlier one, then raises the error. That's sometimes called a saga. Compensation is your code, written deliberately, and both the steps and their undos should be safe to repeat, because a retry might run them twice. Alongside Workflows, Cloud Scheduler starts things on a timetable, like cron, for example a nightly workflow that retries orders stuck in fulfilment. Next: retries, duplicates and messages that never succeed.",
}
