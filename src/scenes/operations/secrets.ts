import type { Scene } from '@graphlearning/flow'

// §5 — a rotation that broke checkout. Secret Manager announced the rotation, a job made a new version,
// but the database still had the old password: three systems, one order of steps. Then what Cloud KMS
// adds on top of default encryption.
export const operationsSecrets: Scene = {
  id: 'operations-secrets',
  title: 'A rotation in the wrong order',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'broken',
      label: 'Rotation, as it happened',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 's1', label: '1 · Rotation due', sub: 'Secret Manager notifies Pub/Sub', icon: 'bell' },
        { id: 's2', label: '2 · Version 8 added', sub: 'a new password stored', icon: 'key' },
        { id: 's3', label: '3 · New instances', sub: 'read version 8 at start-up', icon: 'boxes' },
        { id: 's4', label: '4 · Login fails', sub: 'database still expects v7', icon: 'ban' },
      ],
    },
    {
      id: 'order',
      kind: 'code',
      filename: 'the safe order',
      label: `1. create the new database password alongside the old one (both valid)
2. add it as secret version 8
3. roll out instances that read version 8; watch for errors
4. only then revoke the old password and disable version 7`,
    },
    {
      id: 'kms',
      label: 'Encryption keys',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'default', label: 'Default', sub: 'Google encrypts at rest', icon: 'lock' },
        { id: 'cmek', label: 'CMEK', sub: 'your Cloud KMS key, your control', icon: 'key' },
        { id: 'destroy', label: 'Destroying a key', sub: 'its data becomes unreadable', icon: 'trash' },
      ],
    },
  ],
  edges: [
    { source: 'broken', target: 'order', label: 'old must stay valid until nothing uses it' },
    { source: 'order', target: 'kms' },
  ],
}
