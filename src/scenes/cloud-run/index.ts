import type { Scene } from '@graphlearning/flow'
import { cloudRunHandler } from './handler'
import { cloudRunDeployPaths } from './deploy-paths'
import { cloudRunRevisions } from './revisions'
import { cloudRunIdentities } from './identities'
import { cloudRunScaling } from './scaling'
import { cloudRunRelease } from './release'

// Course 3 scene bundle, spread into src/scenes/index.ts.
export const cloudRunScenes: Scene[] = [
  cloudRunHandler,
  cloudRunDeployPaths,
  cloudRunRevisions,
  cloudRunIdentities,
  cloudRunScaling,
  cloudRunRelease,
]
