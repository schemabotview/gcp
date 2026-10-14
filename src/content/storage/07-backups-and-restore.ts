import type { Section } from '../types'

export const backupsAndRestore: Section = {
  id: 'backups-and-restore',
  title: 'Replication, snapshots, backups and restore validation',
  scene: 'storage-recovery',
  focus: 'i3',
  slide: `## Replication, backups and restore

**Replication** keeps copies in step, so it copies mistakes too. Only a copy taken **before** the mistake can undo it.

### The incident
- A 09:14 deploy overwrites stock levels on a regional disk
- Both zones hold the bad data within seconds
- The 02:00 **snapshot** is the newest good copy

### Restoring
- Restore **beside** the damaged data, never over it
- Check counts and totals before switching
- Changes since 02:00 are **replayed or lost**

### Evidence
- Keep backups **apart**: another project or Region, other admins
- A backup you have never restored is a **hope**, not a plan`,
  narration:
    "This chapter closes on the distinction people most often get wrong. Replication keeps copies in step. That protects you from losing a copy, a disk, a zone. But it copies mistakes just as faithfully. Follow the incident. At two in the morning, a scheduled snapshot of the stock disk runs. Snapshots are incremental, so each one stores only what changed. At nine fourteen, a bad deploy overwrites stock levels with zeros. The disk is regional, so within seconds both zones hold the wrong data. Replication did its job perfectly, and it doesn't help at all. Only a copy taken before nine fourteen can get the data back, and the newest one is the two o'clock snapshot. The restore is careful. Create a new disk from the snapshot, beside the damaged one, never over it, because you might need the damaged disk to recover later changes. Attach it to a test machine and check row counts and totals against what you expect. Then decide. Any changes made between two and nine fourteen are either replayed from another source, such as the order events, or accepted as lost. That gap is the recovery point. And the last claim on the slide is the one to remember. A backup you've never restored is a hope, not a plan. Restore drills, timed and checked, are the evidence. And keep backups apart from what they protect, in another project or Region, with different administrators, so one mistake or one compromised account can't reach both. Next chapter: databases.",
}
