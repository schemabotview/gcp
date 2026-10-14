import type { Scene } from '@graphlearning/flow'

// §8 — the retail company's access plan as a role matrix: groups and service accounts down the side,
// environments across. Below, who owns the evidence that the plan is being followed.
export const identityRoleMatrix: Scene = {
  id: 'identity-role-matrix',
  title: 'A least-privilege role matrix',
  flow: 'TB',
  nodes: [
    {
      id: 'matrix',
      kind: 'table',
      label: 'Who holds what, per environment (illustrative)',
      headers: ['Principal', 'retail-dev', 'retail-prod'],
      values: [
        ['group: checkout-devs', 'run.developer', 'run.viewer'],
        ['group: sre', 'viewer', 'logging.viewer, monitoring.viewer'],
        ['sa: deploy-pipeline', 'run.developer', 'run.developer + actAs orders-api'],
        ['sa: orders-api', '—', 'cloudsql.client, one secret'],
        ['group: auditors', 'logging.viewer', 'logging.privateLogViewer'],
        ['group: platform-admins', 'folder admin', 'folder admin, break-glass only'],
      ],
    },
    {
      id: 'evidence',
      label: 'Audit evidence',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'admin-logs', label: 'Admin Activity', sub: 'always written', icon: 'scroll' },
        { id: 'data-logs', label: 'Data Access', sub: 'off by default, except BigQuery', icon: 'database' },
        { id: 'owner', label: 'Log owner', sub: 'a separate audit project', icon: 'usercheck' },
      ],
    },
  ],
  edges: [{ source: 'matrix', target: 'evidence', label: 'changes and reads leave records' }],
}
