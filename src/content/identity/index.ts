import type { Course } from '../types'
import { principalsAndAuthentication } from './01-principals-and-authentication'
import { rolesAndBindings } from './02-roles-and-bindings'
import { conditionsAndDeny } from './03-conditions-and-deny'
import { serviceAccounts } from './04-service-accounts'
import { impersonationAndCredentials } from './05-impersonation-and-credentials'
import { adminVersusDataAccess } from './06-admin-versus-data-access'
import { organizationPolicy } from './07-organization-policy'
import { leastPrivilegeAndAudit } from './08-least-privilege-and-audit'

// Course 2 — Identity, Service Accounts, and Governance (GCP-COURSE-PLAN.md, chapter 2).
export const identity: Course = {
  id: 'identity',
  title: 'Identity, service accounts and governance',
  sections: [
    principalsAndAuthentication,
    rolesAndBindings,
    conditionsAndDeny,
    serviceAccounts,
    impersonationAndCredentials,
    adminVersusDataAccess,
    organizationPolicy,
    leastPrivilegeAndAudit,
  ],
}
