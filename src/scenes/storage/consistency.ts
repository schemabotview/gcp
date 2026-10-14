import type { Scene } from '@graphlearning/flow'

// §4 — two writers update the same catalogue object. Without a precondition the second write silently
// replaces the first; with ifGenerationMatch it fails with 412 and can re-read. Generation numbers
// illustrative.
export const storageConsistency: Scene = {
  id: 'storage-consistency',
  title: 'Two writers, one object',
  flow: 'TB',
  stretch: true,
  padding: 0.17,
  nodes: [
    {
      id: 'race',
      label: 'Both read generation 1712, then both write',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'writer-a', label: 'Writer A', sub: 'price change: writes gen 1713', icon: 'pencil' },
        { id: 'writer-b', label: 'Writer B', sub: 'stock change: overwrites A', icon: 'pencil' },
      ],
    },
    {
      id: 'precondition',
      kind: 'code',
      filename: 'writer B, with a precondition',
      label: `blob.upload_from_string(new_json, if_generation_match=1712)
# A already wrote generation 1713, so:
# 412 Precondition Failed  → re-read, merge, try again

blob.upload_from_string(first_json, if_generation_match=0)
# 0 means "only if no live object exists": safe create`,
    },
    {
      id: 'guarantees',
      label: 'What is and is not promised',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'strong', label: 'Strongly consistent', sub: 'read and list after write or delete', icon: 'circlecheck' },
        { id: 'one-object', label: 'One object at a time', sub: 'no transaction across objects', icon: 'box' },
        { id: 'iam-delay', label: 'Access changes', sub: 'can take time to apply', icon: 'clock' },
        { id: 'cache', label: 'Cached copies', sub: 'stale until Cache-Control expires', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'race', target: 'precondition', label: "A's change is lost without this" },
    { source: 'precondition', target: 'guarantees' },
  ],
}
