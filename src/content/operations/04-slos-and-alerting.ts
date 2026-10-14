import type { Section } from '../types'

export const slosAndAlerting: Section = {
  id: 'slos-and-alerting',
  title: 'SLOs, error budgets, alerts and runbooks',
  scene: 'operations-slos',
  focus: 'arithmetic',
  slide: `## SLOs, error budgets and alerts

An **SLO** states what good service means, in numbers users would recognise. The gap to 100 % is the **error budget**.

### The orders API
- **SLI**: requests that return 2xx in under 400 ms
- **SLO**: 99.5 % over 28 days
- **Budget**: about **3 h 22 min** of total failure in that window

### Alerting on the budget
- Page when the budget is burning **fast**, not on every blip
- Alert on **symptoms** users feel, not on causes like CPU

### Making it actionable
- Every alert links a **runbook** and has an **owner**
- A spent budget **slows releases** until reliability recovers`,
  narration:
    "Telemetry produces endless numbers, so a team needs to agree which ones define good service. That's a service level objective. Start with the indicator, the SLI. For the orders API, a good request is one that returns success in under four hundred milliseconds, and the SLI is the share of good requests. The objective, the SLO, is that ninety nine point five percent of requests are good over a rolling twenty-eight days. The remaining half a percent is the error budget. Do the arithmetic, and it's about three hours and twenty-two minutes of total failure in twenty-eight days. That reframes reliability as something you can spend, on risky releases or experiments, and something you can run out of. Alerting follows from the budget. Paging someone for every brief blip burns people out. Instead, page when the budget is burning fast. Here, an alert fires if, over an hour, failures are arriving fourteen times faster than the budget allows, a pace that would spend it all in two days. Alert on symptoms users feel, failed or slow requests, rather than causes like high CPU, which may not matter. Then make every alert actionable. Each one links to a runbook with the first steps already written, and each has an owner: a rota of people who will answer. And agree a policy: when the budget is spent, releases slow down until reliability recovers. Next: secrets, and a rotation that went wrong.",
}
