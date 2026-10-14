import type { Section } from '../types'

export const classesAndProtection: Section = {
  id: 'classes-and-protection',
  title: 'Storage classes, lifecycle and retention',
  scene: 'storage-lifecycle',
  focus: 'soft',
  slide: `## Storage classes, lifecycle and protection

**Storage classes** share one API but price differently: colder classes store cheaply and charge for **retrieval** and early deletion.

### Lifecycle rules
- Move exports to colder classes **by age**, then delete
- A class's **minimum duration** is billed even if you delete sooner

### Getting deleted data back
- **Object Versioning** keeps replaced and deleted objects as noncurrent
- **Soft delete** keeps deleted objects restorable — **7 days** by default
- A **retention policy** refuses deletion until objects reach an age
- An **object hold** pins one object, for example for legal review
- A **locked** retention policy cannot be shortened, even by admins
- Versions and soft-deleted objects are **billed** as storage`,
  narration:
    "Every object in Cloud Storage has a storage class, and the classes share one API but price differently. Standard has no minimum duration and no retrieval fee, which suits product images that are read constantly. Nearline, Coldline and Archive store data more cheaply, but charge a fee to read it back, and each has a minimum storage duration: thirty, ninety and three hundred and sixty five days. Delete an Archive object after a month, and you still pay for a year. Lifecycle rules apply these classes automatically. The order exports, for instance, can move to Coldline after ninety days and be deleted after seven years, with no code to maintain. Now, protection, because someone will eventually delete the wrong file. Object Versioning keeps an overwritten or deleted object as a noncurrent version, so the previous content can be restored. Soft delete keeps deleted objects restorable for a retention window, seven days by default, configurable up to ninety. A retention policy goes further and refuses deletion until each object reaches a set age, and it can be locked so even administrators can't shorten it. An object hold pins individual objects, for example while legal reviews them. Each costs something: versions and soft-deleted objects are billed as storage. So choose the protection each bucket needs, rather than all of it everywhere. Next: disks.",
}
