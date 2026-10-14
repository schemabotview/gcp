import type { Scene } from '@graphlearning/flow'

// §7 — choosing a processing engine and an orchestrator by workload and team, not by fashion.
// Managed Service for Apache Spark is the 2026 name for what was Dataproc and Serverless for Spark.
export const analyticsSpark: Scene = {
  id: 'analytics-spark',
  title: 'Dataflow, Spark, or SQL — and who runs the schedule',
  flow: 'TB',
  nodes: [
    {
      id: 'engines',
      kind: 'table',
      label: 'Choosing a processing engine',
      headers: ['Engine', 'Programming model', 'Fits when'],
      values: [
        ['BigQuery SQL', 'SQL inside the warehouse', 'data is already in BigQuery'],
        ['Dataflow', 'Apache Beam, batch or stream', 'streaming, event-time windows'],
        ['Managed Spark', 'Apache Spark, serverless or clusters', 'existing Spark code and skills'],
      ],
    },
    {
      id: 'orchestrators',
      label: 'Something must run the steps in order',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'scheduled', label: 'Scheduled queries', sub: 'one SQL statement on a timer', icon: 'calendar' },
        { id: 'dataform', label: 'Dataform', sub: 'SQL models with dependencies', icon: 'gitbranch' },
        { id: 'composer', label: 'Cloud Composer', sub: 'Airflow DAGs across many systems', icon: 'workflow' },
        { id: 'workflows', label: 'Workflows', sub: 'a few API calls in order', icon: 'share' },
      ],
    },
  ],
  edges: [{ source: 'engines', target: 'orchestrators', label: 'then choose the smallest orchestrator that fits' }],
}
