import type { Section } from '../types'

export const operationalVersusAnalytical: Section = {
  id: 'operational-versus-analytical',
  title: 'Operational versus analytical data',
  scene: 'analytics-two-shapes',
  focus: 'path',
  slide: `## Operational versus analytical data

The orders database answers "is this order paid?" in milliseconds. "Revenue by category, by week" is a **different kind of question**.

### Two shapes of question
- **Operational**: one row by key, current state, this second
- **Analytical**: millions of rows, a few columns, **history**
- Minutes or hours of delay is usually fine for analysis

### The path between them
- Capture changes from Cloud SQL, process them, land them in **BigQuery**
- Never run big reports on the **primary**: scans slow checkout

### The rule this chapter keeps
- Moving data is not the same as getting the **right answer**
- Reconcile counts and totals at each step`,
  narration:
    "Chapter eight turned the retail application into a stream of events. Now the business wants answers from them: revenue by category, by week, which products sell together, how sales changed during the promotion. Those are a different kind of question from the ones the orders database was built for. An operational question asks about one thing right now. Is order five eight two one three paid? The database reads one row by its key and answers in milliseconds. An analytical question asks about everything over time. Revenue by category by week reads millions of rows but only a few columns, and it needs history: not just what each order is now, but what happened to it. And a few minutes or hours of delay is usually perfectly fine. Running those scans against the primary orders database would slow checkout for everyone, so the work moves elsewhere. The path is the shape of this chapter. Changes are captured from Cloud SQL, processed, which means cleaned, joined and aggregated, and landed in BigQuery, where analysts query them. One rule runs through all of it. Moving data isn't the same as getting the right answer. Rows can arrive late, twice, or not at all, and a daily total can be quietly wrong. So at each step, reconcile: compare counts and totals between source and target. Next: how changes are captured.",
}
