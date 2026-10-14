import type { Scene } from '@graphlearning/flow'

// §3 — how IAM reaches a verdict. Google describes three stages (principal access boundary, deny,
// allow) evaluated together; drawn here as the order the docs give. The code card is a deny policy
// with an exception: illustrative names, real field and permission formats.
export const identityEvaluation: Scene = {
  id: 'identity-evaluation',
  title: 'Deny is checked before allow',
  flow: 'TB',
  nodes: [
    {
      id: 'stages',
      label: 'One request: principal · permission · resource',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'pab', label: '1 · Access boundary', sub: 'may it use this resource at all?', pattern: 'network', icon: 'fingerprint' },
        { id: 'deny', label: '2 · Deny policies', sub: 'a matching deny rule wins', pattern: 'warn', icon: 'ban' },
        { id: 'allow', label: '3 · Allow policies', sub: 'some binding must grant it', pattern: 'service', icon: 'circlecheck' },
      ],
    },
    {
      id: 'deny-policy',
      kind: 'code',
      filename: 'deny-project-deletion.json',
      label: `{
  "displayName": "Only platform admins may delete projects",
  "rules": [{ "denyRule": {
    "deniedPrincipals": ["principalSet://goog/public:all"],
    "exceptionPrincipals": [
      "principalSet://goog/group/platform-admins@retail.example"],
    "deniedPermissions": [
      "cloudresourcemanager.googleapis.com/projects.delete"]
  }}]
}`,
    },
    {
      id: 'condition',
      kind: 'code',
      filename: 'allow binding with a condition',
      label: `- role: roles/run.developer
  members: [user:contractor@partner.example]
  condition:
    title: expires-end-of-october
    expression: request.time < timestamp("2026-11-01T00:00:00Z")`,
    },
  ],
  edges: [
    { source: 'stages', target: 'deny-policy', label: 'stage 2 reads' },
    { source: 'deny-policy', target: 'condition', label: 'stage 3 reads', dashed: true },
  ],
}
