import type { Scene } from '@graphlearning/flow'

// §2 — resource scope as nesting. A zone sits inside a region; a multi-region spans regions; a
// global resource has no single location. Each leaf is placed in the narrowest box that matches its
// scope, which is the failure boundary the slide asks the learner to read off.
export const foundationsLocations: Scene = {
  id: 'foundations-locations',
  title: 'Every resource has a location scope',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'global',
      label: 'Global',
      sub: 'no single Region',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'vpc', label: 'VPC network', sub: 'subnets are regional', icon: 'network' },
        { id: 'glb', label: 'Global load balancer', sub: 'one anycast IP', icon: 'globe' },
        { id: 'image', label: 'Disk image', sub: 'usable in any zone', icon: 'copy' },
      ],
    },
    {
      id: 'multi',
      label: 'Multi-region  ·  EU',
      sub: 'data kept in several Regions',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'bucket', label: 'Storage bucket', sub: 'location: EU', icon: 'box' },
        { id: 'dataset', label: 'BigQuery dataset', sub: 'location: EU', icon: 'table' },
      ],
    },
    {
      id: 'region',
      label: 'Region  ·  europe-west2 (London)',
      sub: 'regional: replicated across zones',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'run', label: 'Cloud Run service', sub: 'regional', icon: 'boxes' },
        {
          id: 'zone-a',
          label: 'Zone  ·  europe-west2-a',
          sub: 'one failure domain',
          pattern: 'warn',
          children: [{ id: 'vm', label: 'VM instance', sub: 'zonal', icon: 'cpu' }],
        },
        {
          id: 'zone-b',
          label: 'Zone  ·  europe-west2-b',
          sub: 'one failure domain',
          pattern: 'warn',
          children: [{ id: 'disk', label: 'Zonal disk', sub: 'zonal', icon: 'harddrive' }],
        },
      ],
    },
  ],
  edges: [],
}
