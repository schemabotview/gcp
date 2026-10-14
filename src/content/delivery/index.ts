import type { Course } from '../types'
import { terraformResources } from './01-terraform-resources'
import { modulesAndState } from './02-modules-and-state'
import { deploymentIdentitiesAndInputs } from './03-deployment-identities-and-inputs'
import { plansAndDrift } from './04-plans-and-drift'
import { cloudBuildAndProvenance } from './05-cloud-build-and-provenance'
import { cloudDeployAndRollback } from './06-cloud-deploy-and-rollback'
import { environmentPromotion } from './07-environment-promotion'

// Course 10 — Infrastructure and Delivery (GCP-COURSE-PLAN.md, chapter 10).
export const delivery: Course = {
  id: 'delivery',
  title: 'Infrastructure and delivery',
  sections: [
    terraformResources,
    modulesAndState,
    deploymentIdentitiesAndInputs,
    plansAndDrift,
    cloudBuildAndProvenance,
    cloudDeployAndRollback,
    environmentPromotion,
  ],
}
