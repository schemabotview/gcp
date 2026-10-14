import type { Scene } from '@graphlearning/flow'

// §3 — a service is a name and a URL; revisions are immutable snapshots of image + configuration.
// The third revision is a configuration-only change, which still makes a new revision. Below, the
// runtime contract every revision's container must keep.
export const cloudRunRevisions: Scene = {
  id: 'cloud-run-revisions',
  title: 'A service is a series of revisions',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'service',
      label: 'Service  ·  storefront  (europe-west2)',
      sub: 'one stable URL; traffic goes to revisions',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'rev1', label: 'storefront-00001', sub: 'app:1.3.0 · 512 MiB', pattern: 'storage', icon: 'box' },
        { id: 'rev2', label: 'storefront-00002', sub: 'app:1.4.0 · 512 MiB', pattern: 'storage', icon: 'box' },
        { id: 'rev3', label: 'storefront-00003', sub: 'app:1.4.0 · 1 GiB: config only', pattern: 'storage', icon: 'box' },
      ],
    },
    {
      id: 'traffic',
      label: 'Traffic split (illustrative)',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'to-rev3', label: '00003: 100 %', sub: 'serving everyone', icon: 'circlecheck' },
        { id: 'to-rev2', label: '00002: 0 %', sub: 'tagged prev; ready for rollback', icon: 'history' },
        { id: 'to-rev1', label: '00001: 0 %', sub: 'kept, not serving', icon: 'clock' },
      ],
    },
    {
      id: 'contract',
      label: 'The runtime contract each revision must keep',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'listen', label: 'Listen on $PORT', sub: 'on 0.0.0.0, not 127.0.0.1', icon: 'plug' },
        { id: 'respond', label: 'Answer in time', sub: 'request timeout: 5 min default', icon: 'clock' },
        { id: 'stateless', label: 'Keep no state', sub: 'local files live in memory', icon: 'memory' },
        { id: 'shutdown', label: 'Expect shutdown', sub: 'SIGTERM, then a short grace', icon: 'power' },
      ],
    },
  ],
  edges: [
    { source: 'service', target: 'traffic', label: 'traffic is assigned per revision' },
    { source: 'traffic', target: 'contract', label: 'every revision, every instance' },
  ],
}
