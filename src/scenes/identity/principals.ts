import type { Scene } from '@graphlearning/flow'

// §1 — every request starts with a principal. The left band is the kinds of principal IAM can name;
// the band below is the two separate questions every call answers: who are you
// (authentication), then may you do this (authorisation).
export const identityPrincipals: Scene = {
  id: 'identity-principals',
  title: 'Who is asking, and may they?',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'principals',
      label: 'Principals',
      sub: 'the identities IAM can name',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'user', label: 'Google Account', sub: 'alice@retail.example', icon: 'users' },
        { id: 'group', label: 'Google group', sub: 'checkout-devs@…', icon: 'users' },
        { id: 'sa', label: 'Service account', sub: 'a workload identity', icon: 'gears' },
        { id: 'workforce', label: 'Federated user', sub: 'signed in via your IdP', icon: 'fingerprint' },
        { id: 'workload', label: 'Federated workload', sub: 'e.g. a CI job', icon: 'workflow' },
        { id: 'public', label: 'allUsers', sub: 'anyone at all; use with care', pattern: 'warn', icon: 'globe' },
      ],
    },
    {
      id: 'questions',
      label: 'Every call answers two separate questions',
      pattern: 'group',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'authn', label: 'Authentication', sub: 'who are you? checks a credential', pattern: 'network', icon: 'key' },
        { id: 'authz', label: 'Authorisation', sub: 'may you? IAM policy decides', pattern: 'service', icon: 'shieldcheck' },
        { id: 'resource', label: 'Resource', sub: 'storefront on Cloud Run', pattern: 'storage', icon: 'boxes' },
      ],
      edges: [
        { source: 'authn', target: 'authz', label: 'identity' },
        { source: 'authz', target: 'resource', label: 'allowed' },
      ],
    },
  ],
  edges: [{ source: 'principals', target: 'questions', label: 'credential' }],
}
