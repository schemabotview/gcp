import type { Scene } from '@graphlearning/flow'
import { computeSelection } from './selection'
import { computeInstances } from './instances'
import { computeMigs } from './migs'
import { computeCapacity } from './capacity'
import { computeSupplyChain } from './supply-chain'
import { computeGke } from './gke'
import { computeShutdown } from './shutdown'

// Course 5 scene bundle, spread into src/scenes/index.ts.
export const computeScenes: Scene[] = [
  computeSelection,
  computeInstances,
  computeMigs,
  computeCapacity,
  computeSupplyChain,
  computeGke,
  computeShutdown,
]
