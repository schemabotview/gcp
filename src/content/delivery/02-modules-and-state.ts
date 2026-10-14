import type { Section } from '../types'

export const modulesAndState: Section = {
  id: 'modules-and-state',
  title: 'Modules, remote state, locking and protection',
  scene: 'delivery-state',
  focus: 'sensitive',
  slide: `## Modules and state

A **module** packages resources for reuse: one Cloud Run module, used by every environment. **State** is Terraform's record of which real resource each block owns.

### Remote state
- Stored in a **Cloud Storage** bucket, one state per environment and stack
- **Locked** during each run, so two applies cannot collide
- **Versioned**, so a corrupted state can be recovered

### Protecting state
- It can contain **secrets** in plain text
- Keep the bucket in a **separate** project
- Only deployers read it; nobody edits it by hand

### Losing state
- Terraform forgets what it owns, and may try to create it **again**`,
  narration:
    "As the configuration grows, two ideas keep it manageable. The first is modules. A module packages a set of resources so they can be reused. The retail company writes one module for a Cloud Run service with its service account and permissions, and every environment calls it with different inputs, like the production call on the left. The second idea is state, and it deserves respect. Terraform keeps a record of which real resource each block owns: this block is that service, with that id. Without it, Terraform has no idea what already exists. The state lives remotely, in a Cloud Storage bucket, one state file per environment and stack. The backend locks the state during each run, so two people, or two pipeline runs, can't apply at the same time and corrupt it. The bucket has versioning turned on, so a damaged state can be rolled back. Now the part people learn the hard way. State can contain secrets in plain text, such as a generated database password, because it records resource attributes. So treat the state bucket as sensitive. Put it in a separate project, let only the deploying identities read it, and never edit it by hand. And if state is lost, Terraform forgets what it owns and may try to create everything again, colliding with what's already running. Next: who runs Terraform, and with what inputs.",
}
