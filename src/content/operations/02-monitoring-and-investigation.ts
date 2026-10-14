import type { Section } from '../types'

export const monitoringAndInvestigation: Section = {
  id: 'monitoring-and-investigation',
  title: 'Cloud Monitoring, Logging queries and traces',
  scene: 'operations-investigation',
  focus: 'trace',
  slide: `## Investigating a latency incident

Checkout feels slow. Three tools, used in order, turn a vague complaint into one slow span.

### Three moves
- **Cloud Monitoring**: p95 latency for the orders API jumped at **13:12**
- **Logs Explorer**: 214 slow requests, all logging "payment call slow"
- **Cloud Trace**: in one request, the payment call took **2.8 s** of 2.9

### Reading the trace
- Database work took **under 50 ms**; the database is not the problem
- The slow span belongs to a **dependency**, so the fix is elsewhere

### Habits
- Query by **fields**, not by searching text
- Note the time window first: every later query uses it`,
  narration:
    "Here's a typical afternoon. The support team says checkout feels slow. That's a symptom, not a cause, and three tools, used in order, narrow it down. First, Cloud Monitoring. The orders API's ninety-fifth percentile latency jumped at twelve minutes past one. Now there's a start time, and every later query can use that window. Second, Logs Explorer. The query on the left filters on fields, not text: Cloud Run revision logs, from the orders service, where the latency field is over two thousand milliseconds, since one o'clock. Two hundred and fourteen entries come back, and every one carries the same message: payment call slow. Third, open the trace for one of them using its trace id. The whole request took two point nine seconds. Reading stock took eleven milliseconds. The transaction took thirty eight. Publishing the event took nine. And the call to the payments API took two thousand eight hundred and forty. So the database, which everyone suspected, is fine. The time is spent waiting on a dependency, and the fix, or at least the conversation, belongs with the payments provider, along with a closer look at that call's timeout. Two habits came out of this. Query by structured fields, which is precise and fast, rather than searching message text. And establish the time window first, because everything else depends on it. Next: the logs that record who changed what.",
}
