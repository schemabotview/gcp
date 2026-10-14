import type { Course } from '../types'
import { cloudOperatingModels } from './01-cloud-operating-models'
import { regionsAndZones } from './02-regions-and-zones'
import { resourceHierarchy } from './03-resource-hierarchy'
import { billingAccounts } from './04-billing-accounts'
import { apisAndFirstCall } from './05-apis-and-first-call'
import { budgetsAndCleanup } from './06-budgets-and-cleanup'

// Course 1 — Cloud Foundations, Projects, and Resource Ownership (GCP-COURSE-PLAN.md, chapter 1).
export const foundations: Course = {
  id: 'foundations',
  title: 'Cloud foundations, projects and resource ownership',
  sections: [cloudOperatingModels, regionsAndZones, resourceHierarchy, billingAccounts, apisAndFirstCall, budgetsAndCleanup],
}
