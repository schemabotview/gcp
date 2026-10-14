import type { Scene } from '@graphlearning/flow'
import { networkingCidr } from './cidr'
import { networkingVpc } from './vpc'
import { networkingRoutes } from './routes'
import { networkingFirewall } from './firewall'
import { networkingDns } from './dns'
import { networkingLoadBalancing } from './load-balancing'
import { networkingPrivateAccess } from './private-access'
import { networkingSharedVpc } from './shared-vpc'
import { networkingHybrid } from './hybrid'

// Course 4 scene bundle, spread into src/scenes/index.ts.
export const networkingScenes: Scene[] = [
  networkingCidr,
  networkingVpc,
  networkingRoutes,
  networkingFirewall,
  networkingDns,
  networkingLoadBalancing,
  networkingPrivateAccess,
  networkingSharedVpc,
  networkingHybrid,
]
