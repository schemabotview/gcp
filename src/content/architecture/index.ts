import type { Course } from '../types'
import { measuringWorkloads } from './01-measuring-workloads'
import { cloudCdn } from './02-cloud-cdn'
import { costAllocation } from './03-cost-allocation'
import { rightsizingAndCommitments } from './04-rightsizing-and-commitments'
import { architectureComparison } from './05-architecture-comparison'
import { migrationAndDecisions } from './06-migration-and-decisions'
import { wellArchitectedReview } from './07-well-architected-review'

// Course 12 — Optimisation and Architecture Evolution (GCP-COURSE-PLAN.md, chapter 12).
export const architecture: Course = {
  id: 'architecture',
  title: 'Optimisation and architecture evolution',
  sections: [
    measuringWorkloads,
    cloudCdn,
    costAllocation,
    rightsizingAndCommitments,
    architectureComparison,
    migrationAndDecisions,
    wellArchitectedReview,
  ],
}
