import type { Scene } from '@graphlearning/flow'

// §4 — the three kinds of non-human identity a project contains, the two faces of a service account
// (it acts, and it is acted upon), and its lifecycle.
export const identityServiceAccounts: Scene = {
  id: 'identity-service-accounts',
  title: 'Service accounts and service agents',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'kinds',
      label: 'Three kinds of non-human identity',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'user-managed', label: 'Yours', sub: 'orders-api: you create and delete', pattern: 'service', icon: 'gears' },
        { id: 'default-sa', label: 'Default', sub: 'made by some APIs; may hold Editor', pattern: 'warn', icon: 'cpu' },
        { id: 'agent', label: 'Service agent', sub: 'Google-managed; acts for a service', pattern: 'network', icon: 'cloud' },
      ],
    },
    {
      id: 'faces',
      label: 'A service account has two faces',
      pattern: 'user',
      cols: 2,
      children: [
        { id: 'as-principal', label: 'A principal', sub: 'it is granted roles and calls APIs', icon: 'key' },
        { id: 'as-resource', label: 'A resource', sub: 'others are granted roles on it', icon: 'box' },
      ],
    },
    {
      id: 'lifecycle',
      label: 'Lifecycle',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'create', label: 'Create', sub: 'one per workload', icon: 'pencil' },
        { id: 'grant', label: 'Grant', sub: 'narrow roles only', icon: 'shieldcheck' },
        { id: 'disable', label: 'Disable', sub: 'reversible; test first', icon: 'power' },
        { id: 'delete', label: 'Delete', sub: 'undelete for 30 days', icon: 'trash' },
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'faces' },
    { source: 'faces', target: 'lifecycle' },
  ],
}
