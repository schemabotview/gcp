import type { Course } from '../types'
import { operationalVersusAnalytical } from './01-operational-versus-analytical'
import { batchAndCdc } from './02-batch-and-cdc'
import { lakeLayoutAndContracts } from './03-lake-layout-and-contracts'
import { bigqueryBasics } from './04-bigquery-basics'
import { partitioningAndCost } from './05-partitioning-and-cost'
import { dataflowAndWindows } from './06-dataflow-and-windows'
import { sparkAndOrchestration } from './07-spark-and-orchestration'

// Course 9 — Analytical Data and Pipelines (GCP-COURSE-PLAN.md, chapter 9).
export const analytics: Course = {
  id: 'analytics',
  title: 'Analytical data and pipelines',
  sections: [
    operationalVersusAnalytical,
    batchAndCdc,
    lakeLayoutAndContracts,
    bigqueryBasics,
    partitioningAndCost,
    dataflowAndWindows,
    sparkAndOrchestration,
  ],
}
