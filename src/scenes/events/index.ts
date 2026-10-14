import type { Scene } from '@graphlearning/flow'
import { eventsGateways } from './gateways'
import { eventsFunctions } from './functions'
import { eventsPubsub } from './pubsub'
import { eventsDelivery } from './delivery'
import { eventsEventarc } from './eventarc'
import { eventsTasks } from './tasks'
import { eventsWorkflows } from './workflows'
import { eventsRetries } from './retries'
import { eventsBackpressure } from './backpressure'

// Course 8 scene bundle, spread into src/scenes/index.ts.
export const eventsScenes: Scene[] = [
  eventsGateways,
  eventsFunctions,
  eventsPubsub,
  eventsDelivery,
  eventsEventarc,
  eventsTasks,
  eventsWorkflows,
  eventsRetries,
  eventsBackpressure,
]
