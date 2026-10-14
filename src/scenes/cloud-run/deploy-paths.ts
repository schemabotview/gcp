import type { Scene } from '@graphlearning/flow'

// §2 — two ways to the same place. A source deploy has Cloud Build make the image for you; an image
// deploy uses one your own pipeline built. Both end as an image in Artifact Registry, and the
// revision records the image digest, not the tag.
export const cloudRunDeployPaths: Scene = {
  id: 'cloud-run-deploy-paths',
  title: 'Source or image: both end at a digest',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'commands',
      kind: 'code',
      filename: 'two ways to deploy storefront',
      label: `# A · from source: Cloud Build builds the image for you
gcloud run deploy storefront --source . --region europe-west2

# B · from an image your own pipeline built and pushed
gcloud run deploy storefront --region europe-west2 \\
  --image europe-west2-docker.pkg.dev/retail-dev-4821/storefront/app:1.4.0`,
    },
    {
      id: 'source-path',
      label: 'A · Source deploy',
      sub: 'convenient; less control over the build',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'src', label: 'Source folder', sub: 'main.py, requirements', icon: 'folder' },
        { id: 'build', label: 'Cloud Build', sub: 'buildpacks, or your Dockerfile', icon: 'gears' },
        { id: 'repo-a', label: 'Artifact Registry', sub: 'cloud-run-source-deploy', icon: 'package' },
      ],
    },
    {
      id: 'image-path',
      label: 'B · Image deploy',
      sub: 'your pipeline owns the build',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'ci', label: 'Your CI build', sub: 'tests, scans, tags', icon: 'workflow' },
        { id: 'push', label: 'Push image', sub: 'app:1.4.0', icon: 'box' },
        { id: 'repo-b', label: 'Artifact Registry', sub: 'storefront repository', icon: 'package' },
      ],
    },
    { id: 'revision', label: 'New revision', sub: 'pins the image digest, not the tag', pattern: 'storage', icon: 'hash' },
  ],
  edges: [
    { source: 'commands', target: 'source-path', label: 'A' },
    { source: 'source-path', target: 'image-path', dashed: true, label: 'or B' },
    { source: 'image-path', target: 'revision', label: 'tag resolved to sha256:…' },
  ],
}
