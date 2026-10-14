import type { Scene } from '@graphlearning/flow'
import { analyticsTwoShapes } from './two-shapes'
import { analyticsIngestion } from './ingestion'
import { analyticsLake } from './lake'
import { analyticsBigquery } from './bigquery'
import { analyticsPartitioning } from './partitioning'
import { analyticsDataflow } from './dataflow'
import { analyticsSpark } from './spark'

// Course 9 scene bundle, spread into src/scenes/index.ts.
export const analyticsScenes: Scene[] = [
  analyticsTwoShapes,
  analyticsIngestion,
  analyticsLake,
  analyticsBigquery,
  analyticsPartitioning,
  analyticsDataflow,
  analyticsSpark,
]
