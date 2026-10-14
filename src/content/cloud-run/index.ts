import type { Course } from '../types'
import { handlerAndStartup } from './01-handler-and-startup'
import { sourceAndImageDeploys } from './02-source-and-image-deploys'
import { servicesAndRevisions } from './03-services-and-revisions'
import { identitiesAndPermissions } from './04-identities-and-permissions'
import { concurrencyAndScaling } from './05-concurrency-and-scaling'
import { logsTrafficAndRollback } from './06-logs-traffic-and-rollback'

// Course 3 — A First Cloud Run Application (GCP-COURSE-PLAN.md, chapter 3).
export const cloudRun: Course = {
  id: 'cloud-run',
  title: 'A first Cloud Run application',
  sections: [
    handlerAndStartup,
    sourceAndImageDeploys,
    servicesAndRevisions,
    identitiesAndPermissions,
    concurrencyAndScaling,
    logsTrafficAndRollback,
  ],
}
