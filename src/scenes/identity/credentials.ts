import type { Scene } from '@graphlearning/flow'

// §5 — where a workload's credentials come from. Top: the three places Application Default
// Credentials looks, in order (finding a credential grants nothing). Middle: the two different
// permissions over a service account. Bottom: a keyless sequence for a CI job outside Google Cloud.
export const identityCredentials: Scene = {
  id: 'identity-credentials',
  title: 'Short-lived credentials, no keys',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'adc',
      label: 'Application Default Credentials looks, in order',
      sub: 'finding a credential grants no permission',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'adc-env', label: '1 · Env variable', sub: 'path to a credential file', icon: 'file' },
        { id: 'adc-local', label: '2 · gcloud ADC file', sub: 'your own login, locally', icon: 'terminal' },
        { id: 'adc-attached', label: '3 · Attached account', sub: 'from the metadata server', icon: 'server' },
      ],
    },
    {
      id: 'act',
      label: 'Two different powers over a service account',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'act-as', label: 'Attach it', sub: 'actAs: Service Account User', icon: 'link' },
        { id: 'impersonate', label: 'Impersonate it', sub: 'getAccessToken: Token Creator', icon: 'key' },
      ],
    },
    {
      id: 'wif',
      label: 'Workload identity federation: a CI job, no key file',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'ci', label: '1 · CI job', sub: 'gets an OIDC token', icon: 'workflow' },
        { id: 'sts', label: '2 · Google STS', sub: "checks the pool's rules", icon: 'shieldcheck' },
        { id: 'fed', label: '3 · Federated token', sub: 'short-lived', icon: 'clock' },
        { id: 'api', label: '4 · API call', sub: 'as the pool identity or a service account', icon: 'cloud' },
      ],
    },
  ],
  edges: [],
}
