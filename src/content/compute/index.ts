import type { Course } from '../types'
import { choosingCompute } from './01-choosing-compute'
import { computeEngineInstances } from './02-compute-engine-instances'
import { templatesAndGroups } from './03-templates-and-groups'
import { capacityAndSpot } from './04-capacity-and-spot'
import { artifactRegistry } from './05-artifact-registry'
import { gkeModes } from './06-gke-modes'
import { statelessnessAndShutdown } from './07-statelessness-and-shutdown'

// Course 5 — Compute Choices and Elastic Capacity (GCP-COURSE-PLAN.md, chapter 5).
export const compute: Course = {
  id: 'compute',
  title: 'Compute choices and elastic capacity',
  sections: [
    choosingCompute,
    computeEngineInstances,
    templatesAndGroups,
    capacityAndSpot,
    artifactRegistry,
    gkeModes,
    statelessnessAndShutdown,
  ],
}
