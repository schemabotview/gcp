import type { Section } from '../types'

export const sparkAndOrchestration: Section = {
  id: 'spark-and-orchestration',
  title: 'Managed Spark and orchestration choices',
  scene: 'analytics-spark',
  focus: 'engines',
  slide: `## Spark, and who runs the schedule

Three engines can transform the retail data. Choose by where the data is, the **programming model**, and the team's skills.

### Engines
- **BigQuery SQL** — the data is already in the warehouse
- **Dataflow** — streaming and event-time windows
- **Managed Service for Apache Spark** — existing Spark code, serverless or clusters

### Orchestration
- **Scheduled queries** — one statement on a timer
- **Dataform** — SQL models with dependencies, versioned
- **Cloud Composer** — Airflow, across many systems
- Choose the **smallest** that covers the dependencies you have

### Depth
- Spark internals have their own course; here, only the choice`,
  narration:
    "By now there are three engines that could transform the retail data, and the choice is less about which is best than about fit. If the data is already in BigQuery, SQL inside the warehouse is usually simplest: no data moves, and the people who write reports can read the transformations. If the work is streaming, with event-time windows and late data, Dataflow and Beam are built for it. And if the team already has Spark code and Spark skills, Google's Managed Service for Apache Spark runs it, either serverless, where you submit a job and Google provides the capacity, or on clusters you configure. That service was called Dataproc until twenty twenty-six, and you'll still see that name in the API and command line. Transformations rarely run alone, so something has to run the steps in order and retry failures. Again, choose the smallest tool that covers the dependencies you actually have. A scheduled query runs one statement on a timer. Dataform manages a set of SQL models with dependencies between them, versioned like code. Cloud Composer runs Apache Airflow, which suits pipelines spanning many systems. And Workflows, from the last chapter, suits a handful of API calls in order. Spark's internals deserve a course of their own, so this one stops at the choice. Next chapter: making all of this reproducible, as infrastructure and releases.",
}
