import type { Scene } from '@graphlearning/flow'
import { deliveryTerraform } from './terraform'
import { deliveryState } from './state'
import { deliveryInputs } from './inputs'
import { deliveryPlan } from './plan'
import { deliveryBuild } from './build'
import { deliveryCloudDeploy } from './cloud-deploy'
import { deliveryPromotion } from './promotion'

// Course 10 scene bundle, spread into src/scenes/index.ts.
export const deliveryScenes: Scene[] = [
  deliveryTerraform,
  deliveryState,
  deliveryInputs,
  deliveryPlan,
  deliveryBuild,
  deliveryCloudDeploy,
  deliveryPromotion,
]
