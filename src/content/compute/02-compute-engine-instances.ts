import type { Section } from '../types'

export const computeEngineInstances: Section = {
  id: 'compute-engine-instances',
  title: 'Compute Engine instances, images and disks',
  scene: 'compute-instances',
  focus: 'create',
  slide: `## Compute Engine instances

A **VM** is a machine type, a boot image, one or more disks, a network interface and a service account — all chosen by you.

### The parts
- **Machine type** — vCPUs and memory, e.g. \`e2-standard-2\`
- **Image** — the OS on the boot disk; pin a family, patch it yourself
- **Persistent disk** — zonal, outlives a stop, billed while it exists

### Lifecycle and cost
- A **stopped** VM stops CPU and memory charges, not disk charges
- Deleting a VM deletes its boot disk **by default**

### Access without keys
- **OS Login** lets IAM decide who can sign in
- **IAP TCP forwarding** gives SSH without an external IP`,
  narration:
    "A Compute Engine VM is assembled from parts you choose. The machine type sets virtual CPUs and memory: e two standard two is two vCPUs and eight gigabytes. The image is the operating system written onto the boot disk, here the Debian twelve family. From then on, patching that operating system is your job, not Google's. The boot disk is a persistent disk, which is zonal and survives the VM being stopped. The network interface puts it in the app subnet with no external address, and a service account gives the code on it an identity, exactly as chapter two described. The lifecycle has cost consequences people often miss. A running VM is billed for CPU and memory. Stopping it ends those charges, but its disks are still billed, because they still exist. Deleting the VM deletes its boot disk by default, which is convenient for cattle and alarming for a pet you forgot to back up. Finally, access. Instead of copying SSH keys around and giving machines public addresses, turn on OS Login, so IAM decides who may sign in and what they can do, and use Identity-Aware Proxy's TCP forwarding to reach the VM over SSH without any external IP at all. Every sign-in then has an identity and an audit trail. One VM is a start. Next, we manage many of them as a group.",
}
