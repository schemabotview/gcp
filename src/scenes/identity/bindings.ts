import type { Scene } from '@graphlearning/flow'

// §2 — an allow policy is a list of bindings, each one role → members. The code card is the shape
// `gcloud projects get-iam-policy` returns (principals and etag illustrative); below it, the three
// kinds of role it can name and the hierarchy whose policies are unioned into the effective one.
export const identityBindings: Scene = {
  id: 'identity-bindings',
  title: 'An allow policy is role → members',
  flow: 'TB',
  nodes: [
    {
      id: 'policy',
      kind: 'code',
      filename: 'gcloud projects get-iam-policy retail-prod-7312',
      label: `bindings:
- role: roles/run.developer       # deploy and update services
  members:
  - group:checkout-devs@retail.example
- role: roles/cloudsql.client     # connect to Cloud SQL instances
  members:
  - serviceAccount:orders-api@retail-prod-7312.iam.gserviceaccount.com
- role: roles/viewer              # basic role: read nearly everything
  members:
  - group:sre@retail.example
etag: BwYb3x2kQ1E=
version: 1`,
    },
    {
      id: 'roles',
      label: 'A role is a named set of permissions',
      sub: 'permission = service.resource.verb, e.g. run.services.get',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'basic', label: 'Basic', sub: 'Owner, Editor, Viewer: very broad', pattern: 'warn', icon: 'ban' },
        { id: 'predefined', label: 'Predefined', sub: 'per service, kept current', pattern: 'service', icon: 'circlecheck' },
        { id: 'custom', label: 'Custom', sub: 'your own list; you maintain it', pattern: 'user', icon: 'pencil' },
      ],
    },
    {
      id: 'inherit',
      label: 'Effective policy = this project + every ancestor',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'org-pol', label: 'Organisation', sub: 'policy', icon: 'building' },
        { id: 'folder-pol', label: 'Folder', sub: 'policy', icon: 'folder' },
        { id: 'project-pol', label: 'Project', sub: 'policy', icon: 'box' },
      ],
    },
  ],
  edges: [
    { source: 'policy', target: 'roles', label: 'each binding names a role' },
    { source: 'roles', target: 'inherit', label: 'grants add up down the tree' },
  ],
}
