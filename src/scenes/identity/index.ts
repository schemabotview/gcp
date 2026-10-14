import type { Scene } from '@graphlearning/flow'
import { identityPrincipals } from './principals'
import { identityBindings } from './bindings'
import { identityEvaluation } from './evaluation'
import { identityServiceAccounts } from './service-accounts'
import { identityCredentials } from './credentials'
import { identityDataAccess } from './data-access'
import { identityOrgPolicy } from './org-policy'
import { identityRoleMatrix } from './role-matrix'

// Course 2 scene bundle, spread into src/scenes/index.ts.
export const identityScenes: Scene[] = [
  identityPrincipals,
  identityBindings,
  identityEvaluation,
  identityServiceAccounts,
  identityCredentials,
  identityDataAccess,
  identityOrgPolicy,
  identityRoleMatrix,
]
