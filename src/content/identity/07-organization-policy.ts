import type { Section } from '../types'

export const organizationPolicy: Section = {
  id: 'organization-policy',
  title: 'Organization Policy and configuration governance',
  scene: 'identity-org-policy',
  focus: 'blocked',
  slide: `## Organization Policy

IAM decides **who** may act. **Organization Policy** decides **what configuration** is allowed — whoever asks, Owners included.

### Constraints
- **List** constraints allow or deny values, e.g. \`gcp.resourceLocations\`
- **Boolean** constraints switch behaviour on or off, e.g. blocking service account key creation
- Set on an organisation, folder or project and **inherited** below

### Secure by default
- Organisations created since **May 2024** get a baseline of constraints enforced
- Older organisations may have none — check before assuming

### Not a grant
- A constraint never gives access; it only narrows what is possible`,
  narration:
    "So far every control has been about people and workloads. Organization Policy is about configuration. It doesn't ask who you are. It asks whether the thing you're trying to create or change is allowed at all. The card on the left sets the resource locations constraint on the whole organisation, allowing only the value group europe locations. Now a project Owner, whom IAM allows to do almost anything, tries to create a bucket in us-central1. The request is refused, because the constraint applies whoever asks. That's the difference between the two controls. IAM decides who may perform an action. Organization Policy decides what configuration is permitted. Constraints come in two broad shapes. List constraints allow or deny specific values, such as locations or which domains may appear in IAM policies. Boolean constraints turn a behaviour on or off, such as stopping anyone from creating service account keys. Like IAM, they're set on the organisation, a folder or a project, and are inherited downwards, with rules for how a lower level may change them. Organisations created since May twenty twenty-four start with a baseline of these enforced, including that key creation block. Older organisations may have none, so check rather than assume. And remember, a constraint never grants access. It only removes possibilities. Finally, putting it all together into a design.",
}
