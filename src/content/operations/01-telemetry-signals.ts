import type { Section } from '../types'

export const telemetrySignals: Section = {
  id: 'telemetry-signals',
  title: 'Metrics, structured logs, traces and retention',
  scene: 'operations-signals',
  focus: 'line',
  slide: `## Metrics, logs and traces

Production must explain itself. Three signals answer three different questions, and one field ties them together.

### The signals
- **Metrics** — how much, how often, how slow: cheap, aggregated
- **Logs** — what happened to one request, in detail
- **Traces** — where one request spent its time, across services

### Correlation
- Write logs as **JSON**, one object per line, with useful fields
- Include the **trace id**, so logs and traces find each other

### Retention
- Most logs: **30 days** by default; Admin Activity audit logs: **400**
- Keeping more is a **decision** with a cost, not a default`,
  narration:
    "Once the retail application is in production, it has to explain itself, especially at three in the morning. Three kinds of telemetry answer three different questions. Metrics are numbers over time: requests per second, error rate, latency percentiles. They're cheap to store and quick to graph, and they tell you that something's wrong and when it started. Logs record what happened to individual requests, in detail. Traces follow one request across services and show where its time went: the database, the payment call, the publish. Each signal is more useful when you can jump to the others, and the log line on the left shows how. It's structured: one JSON object per line, with real fields like the order id and the latency, rather than a sentence you'd have to parse. And it carries the trace id in the field Cloud Logging recognises. From a slow trace you can find its log lines, and from a log line you can open its trace. Retention needs a decision too. By default, most logs are kept in the default bucket for thirty days, while Admin Activity audit logs are kept in the required bucket for four hundred days and can't be shortened. If an investigation might need application logs from three months ago, you must configure longer retention, and pay for it, before you need it. Next: using these signals in an investigation.",
}
