import type { Section } from '../types'

export const storageInterfaces: Section = {
  id: 'storage-interfaces',
  title: 'Object, block and file storage',
  scene: 'storage-interfaces',
  focus: 'boundary',
  slide: `## Object, block and file storage

Chapter 5 made instances replaceable. Anything that must outlive them needs **storage**, and storage comes in three interfaces.

### Three interfaces
- **Object** — whole files by name over HTTP: Cloud Storage
- **Block** — a raw disk for one VM's filesystem: Persistent Disk, Hyperdisk
- **File** — a shared directory over NFS: Filestore

### The persistence boundary
- Buckets, persistent disks and Filestore **outlive** instances
- Cloud Run's filesystem, Local SSD and memory are **lost** with them
- Decide where each piece of state lives **before** you need it back
- Choose by **access pattern**: whole files, one writer, or many writers
- Each interface has its own **backup** story — the end of this chapter`,
  narration:
    "The last chapter made instances replaceable on purpose. So anything the retail application must keep, product images, order exports, a VM's database files, has to live somewhere that outlasts the instance. Storage comes in three interfaces, and the interface decides how code uses it. Object storage holds whole files, addressed by a bucket and a name, and read or written over HTTP. That's Cloud Storage, and it suits product images and exports. You don't open an object and edit the middle of it; you read it or replace it. Block storage presents a raw disk that a VM formats with a filesystem. That's Persistent Disk and Hyperdisk, and it suits a database running on a VM, because only that machine writes to it. File storage presents a shared directory over the NFS protocol, which many machines can mount at once. That's Filestore, and here it suits the label printing servers in the warehouse. Now draw the persistence boundary. Buckets, persistent disks and Filestore shares outlive any single instance. A Cloud Run instance's filesystem, which lives in memory, a VM's Local SSD, and anything held in process memory do not. They disappear with the instance. So decide where each piece of state lives before you need it back, not after an instance has gone. Next, Cloud Storage in detail.",
}
