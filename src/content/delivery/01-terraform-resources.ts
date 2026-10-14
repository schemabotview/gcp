import type { Section } from '../types'

export const terraformResources: Section = {
  id: 'terraform-resources',
  title: 'Terraform resources, providers and ownership',
  scene: 'delivery-terraform',
  focus: 'config',
  slide: `## Terraform: infrastructure written down

Everything so far could be clicked into existence. **Terraform** writes it down as code, so it can be reviewed, repeated and rebuilt.

### The parts
- A **provider** talks to Google APIs; pin its version
- A **resource** block owns one real thing, such as the storefront service
- **References** between resources set the order of changes

### APIs and ownership
- Enable each API **as a resource** before the resources that need it
- Each real resource should be owned by **one** configuration
- Deployment Manager reached end of support in **2026**; use Terraform-based tooling

### Not covered by Terraform
- The **image** itself, which comes from the build`,
  narration:
    "Every resource in this course so far could have been created by clicking in the console or typing gcloud commands. That works once. It doesn't work for the second environment, or for knowing exactly what changed last Tuesday. Terraform writes infrastructure down as code. The file on the left describes the storefront. At the top, the Google provider, the plug-in that talks to Google's APIs, is pinned to a major version, so an upgrade happens when you choose it, not by surprise. Then a resource enables the Cloud Run API, remembering from chapter one that APIs are switched on per project. Then the service itself: its name, Region, runtime service account and image. Notice the service account isn't typed in as a string. It's a reference to another resource. References are how Terraform knows the order of operations: create the service account first, then the service that uses it. Two ownership rules keep this sane. Each real resource should be owned by exactly one configuration. If two configurations both think they own the storefront, they'll fight over it. And changes should go through the code, not the console, or the code stops describing reality. Older material uses Google's Deployment Manager for this. It reached end of support in March twenty twenty-six, so use Terraform, directly or through Google's Infrastructure Manager. Next: organising Terraform, and the state behind it.",
}
