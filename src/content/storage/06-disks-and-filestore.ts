import type { Section } from '../types'

export const disksAndFilestore: Section = {
  id: 'disks-and-filestore',
  title: 'Persistent Disk, Hyperdisk and Filestore',
  scene: 'storage-disks',
  focus: 'compare',
  slide: `## Persistent Disk, Hyperdisk and Filestore

VMs need block storage for their filesystems, and sometimes a **shared** file system. The options differ in scope, performance model and persistence.

### Block
- **Persistent Disk** — performance grows with **size**; zonal or regional
- **Hyperdisk** — provision **IOPS and throughput** separately from size; check machine support
- **Local SSD** — very fast, physically attached, **lost** when the VM stops

### File
- **Filestore** — managed NFS for many clients at once
- Its **service tier** sets performance and availability

### Choosing
- Many writers need **file**, not one disk shared by hand
- A regional disk survives a **zone**; it does not undo a bad write`,
  narration:
    "Virtual machines need block storage for their filesystems, and Google Cloud offers several kinds. Persistent Disk is the long-standing option. Its performance grows with its size, so a small disk is also a slow disk. It can be zonal, or regional, where writes are replicated synchronously to a second zone in the same Region. Hyperdisk is the newer family. With Hyperdisk Balanced, you provision IOPS and throughput separately from capacity, so a small, busy database doesn't have to buy terabytes it doesn't need just to go faster. It attaches only to supported machine types, so check before choosing. Local SSD is physically attached to the host and very fast, which makes it tempting. But it doesn't persist: its data is lost when the VM stops or is moved. Use it only for caches and scratch space you can rebuild. Then there's file storage. Filestore is managed NFS, mounted by many clients at once. The warehouse label servers all read the same templates from one share, and its service tier sets performance and availability. Two rules help in choosing. If many machines need to write the same files, use a file service; don't try to share one block disk between them. And a regional disk survives the loss of a zone, but it faithfully replicates every write, including a bad one. Which is exactly the subject of the next section.",
}
