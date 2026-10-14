import type { Scene } from '@graphlearning/flow'
import { foundationsResponsibility } from './responsibility'
import { foundationsLocations } from './locations'
import { foundationsHierarchy } from './hierarchy'
import { foundationsBilling } from './billing'
import { foundationsFirstCall } from './first-call'
import { foundationsBudget } from './budget'

// Course 1 scene bundle, spread into src/scenes/index.ts.
export const foundationsScenes: Scene[] = [
  foundationsResponsibility,
  foundationsLocations,
  foundationsHierarchy,
  foundationsBilling,
  foundationsFirstCall,
  foundationsBudget,
]
