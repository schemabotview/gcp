import type { Section } from '../types'

export const availabilityAndBackups: Section = {
  id: 'availability-and-backups',
  title: 'High availability, replicas, backups and maintenance',
  scene: 'databases-availability',
  focus: 'lag',
  slide: `## Availability, replicas and backups

Four features each keep "another copy" — and each protects against a **different** failure.

### Which does what
- **High availability**: a standby in another zone takes over after a failure
- **Read replicas**: asynchronous copies that take **read** load
- **Backups + PITR**: return to a moment **before** a bad write
- **Maintenance window**: choose **when** restarts happen, not whether

### Replica lag
- A replica can be **behind** the primary by seconds
- Reads that must see your own write go to the **primary**

### None of these is the others
- HA does not scale reads; replicas do not undo mistakes`,
  narration:
    "Four Cloud SQL features each involve another copy of the database, which is why they're so often confused. Each one answers a different failure. High availability keeps a standby instance in a second zone. If the primary or its zone fails, Cloud SQL fails over to the standby, usually within a minute or so, and the application reconnects. It doesn't add read capacity, and it faithfully keeps a bad write. Read replicas are asynchronous copies that take read traffic off the primary. They help with read load, but they don't promise fresh data. Backups with point-in-time recovery let you create a new instance as it was at a chosen moment, such as one second before a bad migration. That undoes mistakes, but it takes time and creates a new instance. And a maintenance window lets you choose when the occasional restart for patching happens. It doesn't remove the restart. Now look at the card. A customer pays. The primary commits the status change at noon exactly. A hundred and fifty milliseconds later, the order page reads from a replica and still sees placed, because the replica hasn't applied the change yet. Nearly two seconds pass before it catches up. The customer thinks the payment failed. The rule: reads that must see your own write go to the primary. Next: a database of documents instead of tables.",
}
