import type { Scene } from '@graphlearning/flow'

// §5 — a first annotated gcloud session, the three identifiers its output carries, and a full
// resource name. Output fields are the v1 Resource Manager shape `gcloud projects describe` prints;
// the IDs and numbers are illustrative.
export const foundationsFirstCall: Scene = {
  id: 'foundations-first-call',
  title: 'A first call, and what comes back',
  flow: 'TB',
  nodes: [
    {
      id: 'session',
      kind: 'code',
      filename: 'cloud-shell — first-call.sh',
      label: `# 1. Point every later command at one project
gcloud config set project retail-dev-4821

# 2. Turn on the API before the first Cloud Run call
gcloud services enable run.googleapis.com

# 3. Ask the Resource Manager API about the project
gcloud projects describe retail-dev-4821
createTime: '2026-10-01T09:14:22.512Z'
lifecycleState: ACTIVE
name: retail-dev                # display name
parent:
  id: '418290035577'
  type: folder
projectId: retail-dev-4821      # chosen, permanent
projectNumber: '730118294456'   # assigned by Google`,
    },
    {
      id: 'ids',
      label: 'Three identifiers, one project',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'project-id', label: 'Project ID', sub: 'you choose it; never changes', pattern: 'service', icon: 'key' },
        { id: 'project-number', label: 'Project number', sub: 'Google assigns it', pattern: 'storage', icon: 'hash' },
        { id: 'display-name', label: 'Display name', sub: 'a label you can edit', pattern: 'user', icon: 'pencil' },
      ],
    },
    {
      id: 'resource-name',
      kind: 'code',
      filename: 'full resource name — Cloud Run service',
      label: `//run.googleapis.com/projects/retail-dev-4821/locations/europe-west2/services/storefront
  └ service API ─┘ └─ project ──────────┘ └─ location ──────┘ └─ resource ──┘`,
    },
  ],
  edges: [
    { source: 'session', target: 'ids', label: 'output names' },
    { source: 'ids', target: 'resource-name', label: 'used in' },
  ],
}
