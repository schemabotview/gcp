import type { Scene } from '@graphlearning/flow'

// §7 — containing a compromised identity: the audit entry from §3 was not an approved change. Order
// matters — stop the access first, then scope it from logs, then repair and learn.
export const operationsIncident: Scene = {
  id: 'operations-incident',
  title: 'Containing a compromised identity',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'steps',
      label: 'An unexpected Owner grant at 02:41',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'c1', label: '1 · Contain', sub: 'remove the grant; suspend alice', icon: 'ban' },
        { id: 'c2', label: '2 · Revoke', sub: 'sessions, tokens, keys', icon: 'key' },
        { id: 'c3', label: '3 · Scope', sub: 'audit logs: what else changed', icon: 'search' },
        { id: 'c4', label: '4 · Rotate', sub: 'secrets the identity could read', icon: 'repeat' },
        { id: 'c5', label: '5 · Repair', sub: 'restore changed resources', icon: 'wrench' },
        { id: 'c6', label: '6 · Learn', sub: 'blameless review, fixes tracked', icon: 'file' },
      ],
    },
    {
      id: 'access',
      label: 'Privileged access, before the next incident',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'jit', label: 'Just in time', sub: 'Owner granted for an hour, approved', icon: 'clock' },
        { id: 'breakglass', label: 'Break-glass', sub: 'sealed account, alarmed on use', icon: 'lock' },
        { id: 'patch', label: 'Patching', sub: 'VMs and images are yours', icon: 'wrench' },
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'access', label: 'so that standing Owner grants are rare' }],
}
