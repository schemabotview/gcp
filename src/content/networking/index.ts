import type { Course } from '../types'
import { addressesAndCidr } from './01-addresses-and-cidr'
import { vpcAndSubnets } from './02-vpc-and-subnets'
import { routesAndCloudNat } from './03-routes-and-cloud-nat'
import { firewallRules } from './04-firewall-rules'
import { cloudDns } from './05-cloud-dns'
import { tlsAndLoadBalancers } from './06-tls-and-load-balancers'
import { privateAccess } from './07-private-access'
import { sharedVpcAndPeering } from './08-shared-vpc-and-peering'
import { hybridConnectivity } from './09-hybrid-connectivity'

// Course 4 — Networking and Request Delivery (GCP-COURSE-PLAN.md, chapter 4).
export const networking: Course = {
  id: 'networking',
  title: 'Networking and request delivery',
  sections: [
    addressesAndCidr,
    vpcAndSubnets,
    routesAndCloudNat,
    firewallRules,
    cloudDns,
    tlsAndLoadBalancers,
    privateAccess,
    sharedVpcAndPeering,
    hybridConnectivity,
  ],
}
