import type { Scene } from '@graphlearning/flow'

// §3 — the resource hierarchy for the retail company, drawn as nesting: every box sits inside
// exactly one parent, which is the rule the slide states. Policy set on a box reaches everything
// inside it. Production and non-production are separate folders so a policy set on one cannot
// reach the other.
export const foundationsHierarchy: Scene = {
  id: 'foundations-hierarchy',
  title: 'Organisation, folders, projects, resources',
  nodes: [
    {
      id: 'org',
      label: 'Organisation  ·  retail.example',
      sub: 'root of the tree; policy here reaches everything',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'prod',
          label: 'Folder  ·  Production',
          sub: 'strict policies',
          pattern: 'network',
          cols: 1,
          children: [
            {
              id: 'proj-prod',
              label: 'Project  ·  retail-prod-7312',
              sub: 'APIs, billing link, IAM',
              pattern: 'service',
              cols: 2,
              children: [
                { id: 'storefront', label: 'Cloud Run', sub: 'storefront', icon: 'boxes' },
                { id: 'orders-db', label: 'Cloud SQL', sub: 'orders-db', icon: 'database' },
              ],
            },
            {
              id: 'proj-data',
              label: 'Project  ·  retail-analytics-2290',
              sub: 'APIs, billing link, IAM',
              pattern: 'service',
              cols: 2,
              children: [
                { id: 'warehouse', label: 'BigQuery', sub: 'sales dataset', icon: 'table' },
                { id: 'exports', label: 'Cloud Storage', sub: 'order exports', icon: 'box' },
              ],
            },
          ],
        },
        {
          id: 'nonprod',
          label: 'Folder  ·  Non-production',
          sub: 'dev and test',
          pattern: 'network',
          cols: 1,
          children: [
            {
              id: 'proj-dev',
              label: 'Project  ·  retail-dev-4821',
              sub: 'APIs, billing link, IAM',
              pattern: 'service',
              cols: 1,
              children: [
                { id: 'dev-run', label: 'Cloud Run', sub: 'storefront (dev)', icon: 'boxes' },
                { id: 'dev-db', label: 'Cloud SQL', sub: 'test data only', icon: 'database' },
              ],
            },
          ],
        },
      ],
    },
  ],
  edges: [],
}
