import type { Scene } from '@graphlearning/flow'

// §1 — three storage interfaces and the retail app's use of each, then where persistence actually
// ends. The instance's own disk and memory are on the wrong side of that line.
export const storageInterfaces: Scene = {
  id: 'storage-interfaces',
  title: 'Object, block and file',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'kinds',
      label: 'Three interfaces',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'object', label: 'Object', sub: 'whole files over HTTP: product images', icon: 'box' },
        { id: 'block', label: 'Block', sub: "a disk for one VM's filesystem", icon: 'harddrive' },
        { id: 'file', label: 'File', sub: 'a shared NFS mount: label printers', icon: 'folder' },
      ],
    },
    {
      id: 'products',
      kind: 'table',
      label: 'On Google Cloud',
      headers: ['Interface', 'Service', 'You address it by'],
      values: [
        ['Object', 'Cloud Storage', 'bucket + object name, via API'],
        ['Block', 'Persistent Disk, Hyperdisk', 'a device attached to a VM'],
        ['File', 'Filestore', 'an NFS path mounted by many clients'],
      ],
    },
    {
      id: 'boundary',
      label: 'Where persistence ends',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'survives', label: 'Survives the instance', sub: 'buckets, persistent disks, Filestore', icon: 'circlecheck' },
        { id: 'lost', label: 'Lost with the instance', sub: 'Cloud Run files, Local SSD, memory', icon: 'trash' },
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'products' },
    { source: 'products', target: 'boundary' },
  ],
}
