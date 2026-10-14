import type { Section } from '../types'

export const secretsAndKeys: Section = {
  id: 'secrets-and-keys',
  title: 'Secret Manager, Cloud KMS and rotation',
  scene: 'operations-secrets',
  focus: 's4',
  slide: `## Secrets, keys and rotation

**Secret Manager** stores versioned secrets; the runtime identity reads them. A **rotation** changes a secret in more than one place, so order matters.

### The broken rotation
- Secret Manager **announced** the rotation; it does not rotate anything itself
- A job stored version 8, but the database still expected version 7
- New instances read v8 at start-up, and **logins failed**

### The safe order
- Make the new credential valid **alongside** the old one
- Roll out readers; only then **revoke** the old

### Keys
- Data is encrypted at rest **by default**
- **CMEK** puts a Cloud KMS key under your control — and your responsibility`,
  narration:
    "Secret Manager stores secrets, such as the orders database password, as numbered versions, and the runtime service account reads the version it needs when an instance starts. Rotation, replacing a secret regularly, sounds simple, but it changes the same secret in more than one system, and the order of those changes matters. Here's how it broke. A rotation schedule fired. Note that Secret Manager doesn't rotate anything itself. It publishes a notification to Pub/Sub saying a rotation is due. A job received it, generated a new password, and stored it as version eight. But nothing had changed the database's password yet. Meanwhile, Cloud Run started new instances, which read version eight at start-up and failed to log in. Checkout broke for every request that landed on a new instance. The safe order keeps the old credential valid until nothing uses it. First, create the new password in the database alongside the old one, so both work. Then add it as version eight. Then roll out instances that read it, and watch for errors. Only then revoke the old password and disable version seven. Encryption keys sit underneath all of this. Google encrypts data at rest by default. With customer-managed encryption keys, a Cloud KMS key you control protects the data instead. That gives you control, including the power to make data unreadable by destroying the key, which is also a power to misuse. Next: four more security services.",
}
