import type { Scene } from '@graphlearning/flow'

// §2 — a Cloud Run function that reacts to an uploaded product image. The handler receives a
// CloudEvent; it runs on Cloud Run underneath, so the runtime contract from chapter 3 still applies.
export const eventsFunctions: Scene = {
  id: 'events-functions',
  title: 'A function that reacts to an upload',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'handler',
      kind: 'code',
      filename: 'main.py — make thumbnails',
      label: `import functions_framework

@functions_framework.cloud_event
def on_image_uploaded(event):
    data = event.data                       # bucket, name, generation, …
    if not data["name"].startswith("products/"):
        return                              # ignore other uploads
    make_thumbnail(data["bucket"], data["name"], data["generation"])`,
    },
    {
      id: 'flow',
      label: 'From upload to function',
      pattern: 'service',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'upload', label: 'Object finalized', sub: 'products/sku-1042/main.jpg', icon: 'box' },
        { id: 'trigger', label: 'Eventarc trigger', sub: 'filters bucket and type', icon: 'funnel' },
        { id: 'fn', label: 'Function', sub: 'runs as its own service account', icon: 'zap' },
      ],
      edges: [
        { source: 'upload', target: 'trigger' },
        { source: 'trigger', target: 'fn' },
      ],
    },
    {
      id: 'bounds',
      label: 'Execution boundaries',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'timeout', label: 'Timeout', sub: 'work must finish in time', icon: 'clock' },
        { id: 'stateless', label: 'Stateless', sub: 'nothing kept between events', icon: 'memory' },
        { id: 'again', label: 'May run twice', sub: 'same event, delivered again', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'handler', target: 'flow' },
    { source: 'flow', target: 'bounds' },
  ],
}
