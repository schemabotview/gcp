import type { Scene } from '@graphlearning/flow'

// §5 — the storefront's build, as Cloud Build steps. The output is an image digest plus provenance:
// a signed record of what was built, from which commit, by which builder.
export const deliveryBuild: Scene = {
  id: 'delivery-build',
  title: 'A build that says what it built',
  flow: 'TB',
  nodes: [
    {
      id: 'cloudbuild',
      kind: 'code',
      filename: 'cloudbuild.yaml (abridged)',
      label: `steps:
- name: python:3.12-slim                       # test before building anything
  entrypoint: bash
  args: [-c, "pip install -r requirements.txt && pytest -q"]
- name: gcr.io/cloud-builders/docker
  args: [build, -t, $_IMAGE:$SHORT_SHA, .]
images: [$_IMAGE:$SHORT_SHA]                   # pushed; Cloud Build records the digest
serviceAccount: projects/retail-ci-3301/serviceAccounts/builder@retail-ci-3301.iam.gserviceaccount.com
options: { logging: CLOUD_LOGGING_ONLY }`,
    },
    {
      id: 'outputs',
      label: 'What comes out',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'digest', label: 'Image digest', sub: 'sha256:9c07…, immutable', icon: 'hash' },
        { id: 'provenance', label: 'Provenance', sub: 'commit, builder, steps', icon: 'fingerprint' },
        { id: 'logs', label: 'Build logs', sub: 'kept with the build', icon: 'scroll' },
      ],
    },
    {
      id: 'identity',
      label: 'The build identity',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'can', label: 'Can', sub: 'push to one repository', icon: 'circlecheck' },
        { id: 'cannot', label: 'Cannot', sub: 'deploy to production', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'cloudbuild', target: 'outputs' },
    { source: 'outputs', target: 'identity' },
  ],
}
