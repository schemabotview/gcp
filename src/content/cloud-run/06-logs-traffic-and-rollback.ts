import type { Section } from '../types'

export const logsTrafficAndRollback: Section = {
  id: 'logs-traffic-and-rollback',
  title: 'Logs, traffic splitting and rollback',
  scene: 'cloud-run-release',
  focus: 'traffic',
  slide: `## Logs, traffic splitting and rollback

Anything written to **stdout** or **stderr** reaches Cloud Logging. Read it to tell a deploy failure from a crash or a dependency error.

- One **JSON** object per line becomes searchable, structured fields

### Releasing safely
- Deploy with \`--no-traffic\` and a **tag** to test the new revision first
- Shift a small **percentage** of traffic, watch errors and latency
- Roll back by sending 100 % to the last good revision — no rebuild

### What rollback cannot do
- It moves **traffic**, not data: writes made by the bad revision stay
- A **timeout** tells the client nothing about the server's side effects
- Retrying after a timeout can **repeat** an order unless the handler is idempotent`,
  narration:
    "When something fails, the first question is which kind of failure it is. Everything the container writes to standard output or standard error lands in Cloud Logging, tagged with the service and revision. If you write each log line as a JSON object, its fields become structured and searchable. Here, revision four never became ready. The traceback shows the code read an environment variable that wasn't set, and Cloud Run's own message confirms the container never started listening on its port. That's a deployment and configuration failure, not a bug in request handling and not a database outage, and each of those would look different in the logs. Now, releasing. The safer pattern deploys the new version with no traffic and a tag, which gives it its own URL to test. Then you shift a small share of real traffic to it, perhaps ten percent, and watch errors and latency. If they climb, you send all traffic back to the last good revision. That rollback takes seconds, because nothing is rebuilt. The old revision was there all along. But be clear about the limits. Rollback moves traffic. It doesn't undo anything the bad revision wrote. And a timeout is not a rollback either. If the client gives up waiting, the handler may still have finished and written the order, so a blind retry can create a duplicate. Handlers that change data need to be safe to repeat, which we'll return to with events. Next chapter: the network path in front of all this.",
}
