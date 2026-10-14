import type { Scene } from '@graphlearning/flow'

// §3 — an Admin Activity audit entry for an IAM change, abridged, and the four audit log types with
// what is collected by default. If a type was not enabled when it happened, there is no record.
export const operationsAudit: Scene = {
  id: 'operations-audit',
  title: 'Audit logs, and what they assume',
  flow: 'TB',
  nodes: [
    {
      id: 'entry',
      kind: 'code',
      filename: 'Admin Activity audit entry (abridged)',
      label: `logName: projects/retail-prod-7312/logs/cloudaudit.googleapis.com%2Factivity
protoPayload:
  methodName: SetIamPolicy
  authenticationInfo: { principalEmail: alice@retail.example }
  resourceName: projects/retail-prod-7312
  serviceData.policyDelta.bindingDeltas:
  - { action: ADD, role: roles/owner, member: user:contractor@partner.example }
timestamp: 2026-10-14T02:41:07Z`,
    },
    {
      id: 'types',
      kind: 'table',
      label: 'Audit log types',
      headers: ['Type', 'Records', 'Collected by default?'],
      values: [
        ['Admin Activity', 'configuration and IAM changes', 'always; cannot be disabled'],
        ['System Event', "Google's own actions on resources", 'always'],
        ['Data Access', 'reads and data writes', 'no, except BigQuery'],
        ['Policy Denied', 'requests refused by a security policy', 'yes; can be excluded'],
      ],
    },
  ],
  edges: [{ source: 'entry', target: 'types', label: 'one of four types' }],
}
