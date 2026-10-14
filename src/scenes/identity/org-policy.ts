import type { Scene } from '@graphlearning/flow'

// §7 — Organization Policy constrains configuration, whoever asks. The code card sets the resource
// location constraint on the organisation (ID illustrative); below, an Owner's request refused by
// it, and the line between IAM and Organization Policy.
export const identityOrgPolicy: Scene = {
  id: 'identity-org-policy',
  title: 'Constraints limit configuration, not people',
  flow: 'TB',
  nodes: [
    {
      id: 'policy',
      kind: 'code',
      filename: 'locations.yaml — gcloud org-policies set-policy',
      label: `name: organizations/615204971388/policies/gcp.resourceLocations
spec:
  rules:
  - values:
      allowedValues:
      - in:europe-locations     # a value group, not one Region`,
    },
    {
      id: 'refused',
      label: 'An Owner asks for a bucket in us-central1',
      pattern: 'warn',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'owner', label: 'Project Owner', sub: 'IAM: allowed', icon: 'usercheck' },
        { id: 'create', label: 'Create bucket', sub: 'location: us-central1', icon: 'box' },
        { id: 'blocked', label: 'Refused', sub: 'constraint violated', icon: 'ban' },
      ],
      edges: [
        { source: 'owner', target: 'create' },
        { source: 'create', target: 'blocked' },
      ],
    },
    {
      id: 'compare',
      label: 'Two controls, two questions',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'iam', label: 'IAM', sub: 'who may perform an action', pattern: 'service', icon: 'users' },
        { id: 'orgpol', label: 'Organization Policy', sub: 'what configuration is allowed', pattern: 'network', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'policy', target: 'refused', label: 'inherited by every project' },
    { source: 'refused', target: 'compare' },
  ],
}
