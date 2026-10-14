import type { Scene } from '@graphlearning/flow'

// §2 — one VM created in full, its lifecycle, and how people reach it without an external IP or SSH
// keys. Machine type and image are current families; names illustrative.
export const computeInstances: Scene = {
  id: 'compute-instances',
  title: 'A VM: type, image, disk, lifecycle',
  flow: 'TB',
  stretch: true,
  padding: 0.17,
  nodes: [
    {
      id: 'create',
      kind: 'code',
      filename: 'create one orders VM',
      label: `# e2-standard-2: 2 vCPU, 8 GB · boot disk is a zonal persistent disk
# --no-address: internal IP only · OS Login: IAM controls sign-in
gcloud compute instances create orders-vm-1 \\
  --zone europe-west2-a --machine-type e2-standard-2 \\
  --image-family debian-12 --image-project debian-cloud \\
  --boot-disk-size 20GB --subnet app-ew2 --no-address \\
  --service-account orders-vm@retail-prod-7312.iam.gserviceaccount.com \\
  --metadata enable-oslogin=TRUE`,
    },
    {
      id: 'lifecycle',
      label: 'Lifecycle',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'provisioning', label: 'Provisioning', sub: 'capacity found', icon: 'clock' },
        { id: 'running', label: 'Running', sub: 'billed for CPU, memory', icon: 'power' },
        { id: 'stopped', label: 'Stopped', sub: 'disks still billed', icon: 'ban' },
        { id: 'deleted', label: 'Deleted', sub: 'boot disk too, by default', icon: 'trash' },
      ],
    },
    {
      id: 'access',
      label: 'Managed access instead of keys and public IPs',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'oslogin', label: 'OS Login', sub: 'IAM decides who may sign in', icon: 'usercheck' },
        { id: 'iap', label: 'IAP TCP forwarding', sub: 'SSH without an external IP', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'create', target: 'lifecycle' },
    { source: 'lifecycle', target: 'access', label: 'and to reach it' },
  ],
}
