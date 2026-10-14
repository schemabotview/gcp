import type { Scene } from '@graphlearning/flow'

// §6 — evidence and control. A failed revision's log tells you which kind of failure it was; traffic
// moves between revisions without a rebuild, which is what makes rollback fast. Log text abridged
// from Cloud Run's start-up failure message; revision suffixes illustrative.
export const cloudRunRelease: Scene = {
  id: 'cloud-run-release',
  title: 'Read the evidence, then move traffic',
  flow: 'TB',
  nodes: [
    {
      id: 'logs',
      kind: 'code',
      filename: 'Cloud Logging — storefront-00004 (abridged)',
      label: `ERROR  Traceback (most recent call last): … main.py, line 5
ERROR  KeyError: 'CATALOGUE_BUCKET'
ERROR  Revision 'storefront-00004-kzp' is not ready and cannot serve traffic.
       The user-provided container failed to start and listen on the port
       defined by the PORT=8080 environment variable within the allocated timeout.`,
    },
    {
      id: 'traffic',
      kind: 'code',
      filename: 'staged release, then rollback',
      label: `# deploy 1.5.0 with no traffic, reachable only at its tag URL
gcloud run deploy storefront --image …/app:1.5.0 --no-traffic --tag canary

# send it 10 % of real traffic
gcloud run services update-traffic storefront --to-tags canary=10

# errors climb: all traffic back to the last good revision
gcloud run services update-traffic storefront --to-revisions storefront-00003-vwx=100`,
    },
    {
      id: 'timeout',
      label: 'A timeout is not a rollback',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'client', label: 'Client gives up', sub: 'sees 504 or no reply', icon: 'clock' },
        { id: 'server', label: 'Handler went on', sub: 'it may have written', icon: 'gears' },
        { id: 'effect', label: 'Order exists', sub: 'retry could duplicate it', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'logs', target: 'traffic', label: 'fix the config; ship the next revision' },
    { source: 'traffic', target: 'timeout', label: 'rollback moves traffic, not data' },
  ],
}
