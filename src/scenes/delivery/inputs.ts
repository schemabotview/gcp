import type { Scene } from '@graphlearning/flow'

// §3 — what a deployment run depends on: who it runs as, what it is told, and which versions it uses.
// Each input is versioned or referenced; none is typed in by hand at deploy time.
export const deliveryInputs: Scene = {
  id: 'delivery-inputs',
  title: 'Who deploys, with what inputs',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'identity',
      label: 'The deploying identity',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'ci', label: 'CI job', sub: 'no key: federated token', icon: 'workflow' },
        { id: 'deploy-sa', label: 'tf-prod deployer', sub: 'impersonated; prod only', icon: 'key' },
        { id: 'human', label: 'People', sub: 'review and approve; no apply', icon: 'users' },
      ],
    },
    {
      id: 'inputs',
      kind: 'table',
      label: 'Inputs, and where each one comes from',
      headers: ['Input', 'Source', 'Never'],
      values: [
        ['environment settings', 'prod.tfvars in the repository', 'typed at the prompt'],
        ['secrets', 'Secret Manager, referenced by name', 'in tfvars or state'],
        ['image', 'a digest from the build', 'a moving tag'],
        ['provider versions', '.terraform.lock.hcl, committed', 'latest at run time'],
      ],
    },
    {
      id: 'rerun',
      label: "Rerun last month's deploy",
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'same-commit', label: 'Same commit', sub: 'code and config together', icon: 'gitbranch' },
        { id: 'same-digest', label: 'Same digest', sub: 'the image, exactly', icon: 'hash' },
        { id: 'same-result', label: 'Same result', sub: 'or an input was not pinned', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'identity', target: 'inputs', label: 'runs with' },
    { source: 'inputs', target: 'rerun', label: 'the test' },
  ],
}
