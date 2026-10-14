import type { Scene } from '@graphlearning/flow'

// §5 — Eventarc routes events from sources to destinations by filter. The trigger runs as a service
// account, and that account must be allowed to invoke the destination, or nothing is delivered.
export const eventsEventarc: Scene = {
  id: 'events-eventarc',
  title: 'Routing events to services',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'sources',
      label: 'Sources',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'src-gcs', label: 'Cloud Storage', sub: 'object finalized', icon: 'box' },
        { id: 'src-audit', label: 'Audit Logs', sub: 'e.g. a role granted', icon: 'scroll' },
        { id: 'src-pubsub', label: 'Pub/Sub', sub: 'your own topics', icon: 'share' },
      ],
    },
    {
      id: 'trigger',
      kind: 'code',
      filename: 'gcloud eventarc triggers create (abridged)',
      label: `gcloud eventarc triggers create thumbnails \\
  --location europe-west2 \\
  --event-filters type=google.cloud.storage.object.v1.finalized \\
  --event-filters bucket=retail-product-images-7312 \\
  --destination-run-service thumbnailer \\
  --service-account eventarc-thumbs@retail-prod-7312.iam.gserviceaccount.com
# that account needs roles/run.invoker on thumbnailer`,
    },
    {
      id: 'dest',
      label: 'Destinations',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'dst-run', label: 'Cloud Run', sub: 'service or function', icon: 'boxes' },
        { id: 'dst-wf', label: 'Workflows', sub: 'a multi-step process', icon: 'workflow' },
        { id: 'dst-gke', label: 'GKE', sub: 'a cluster service', icon: 'layers' },
      ],
    },
  ],
  edges: [
    { source: 'sources', target: 'trigger', label: 'filtered by type and attributes' },
    { source: 'trigger', target: 'dest', label: 'delivered as a CloudEvent' },
  ],
}
