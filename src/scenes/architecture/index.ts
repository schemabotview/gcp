import type { Scene } from '@graphlearning/flow'
import { architectureMeasure } from './measure'
import { architectureCdn } from './cdn'
import { architectureCost } from './cost'
import { architectureRightsizing } from './rightsizing'
import { architectureCompare } from './compare'
import { architectureMigration } from './migration'
import { architectureReview } from './review'

// Course 12 scene bundle, spread into src/scenes/index.ts.
export const architectureScenes: Scene[] = [
  architectureMeasure,
  architectureCdn,
  architectureCost,
  architectureRightsizing,
  architectureCompare,
  architectureMigration,
  architectureReview,
]
