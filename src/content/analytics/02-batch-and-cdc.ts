import type { Section } from '../types'

export const batchAndCdc: Section = {
  id: 'batch-and-cdc',
  title: 'Batch ingestion, CDC and reconciliation',
  scene: 'analytics-ingestion',
  focus: 'reconcile',
  slide: `## Batch ingestion and change data capture

Two ways to get orders out of Cloud SQL, with different **freshness** and different failure modes.

### The two methods
- **Nightly export** — a full or incremental snapshot; simple; hours old
- **Datastream CDC** — reads the database's **change log**; minutes old
- CDC sees **every** change, including updates and deletes

### Reconciliation
- Compare **counts and totals** between source and target, per day
- Expect small, explainable differences — and **explain** them
- Publish reports only after the numbers agree

### What delivery does not prove
- A row that **arrived** may still be late, duplicated, or part of an unfinished day`,
  narration:
    "There are two common ways to get orders out of Cloud SQL and into the analytical side. The simplest is a nightly export: copy a snapshot, or the rows changed since yesterday, to Cloud Storage or BigQuery. It's easy to understand and easy to rerun, but the data is hours old, and comparing snapshots to work out what changed can miss things. Change data capture works differently. Datastream reads PostgreSQL's change log, the same stream of committed changes the database uses for replication, and forwards every insert, update and delete to BigQuery or Cloud Storage within minutes. Because it reads the log, it sees every change, including an order that was placed and then cancelled between two snapshots. Whichever method you use, the card on the left is the habit that matters. Each day, compare the source with the target. Cloud SQL says eighteen thousand four hundred and forty two orders were placed, totalling six hundred and twelve thousand pounds. BigQuery has three fewer orders and a hundred and six pounds less. The difference is explainable: three orders committed two seconds before midnight arrived after the cut-off. So the job reruns, the numbers agree, and only then is the daily report published. That's the distinction to hold on to. Ingestion guarantees tell you a change arrived. They don't tell you the day's total is correct. Next: where captured data lives.",
}
