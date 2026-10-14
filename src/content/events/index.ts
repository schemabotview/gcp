import type { Course } from '../types'
import { apiGateways } from './01-api-gateways'
import { cloudRunFunctions } from './02-cloud-run-functions'
import { pubsubModel } from './03-pubsub-model'
import { acknowledgementAndOrdering } from './04-acknowledgement-and-ordering'
import { eventarc } from './05-eventarc'
import { tasksVersusPubsub } from './06-tasks-versus-pubsub'
import { workflowsAndScheduler } from './07-workflows-and-scheduler'
import { retriesAndIdempotency } from './08-retries-and-idempotency'
import { backpressure } from './09-backpressure'

// Course 8 — APIs, Events, and Asynchronous Workflows (GCP-COURSE-PLAN.md, chapter 8).
export const events: Course = {
  id: 'events',
  title: 'APIs, events and asynchronous workflows',
  sections: [
    apiGateways,
    cloudRunFunctions,
    pubsubModel,
    acknowledgementAndOrdering,
    eventarc,
    tasksVersusPubsub,
    workflowsAndScheduler,
    retriesAndIdempotency,
    backpressure,
  ],
}
