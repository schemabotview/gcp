import type { Section } from '../types'

export const conditionsAndDeny: Section = {
  id: 'conditions-and-deny',
  title: 'Conditions, deny policies and effective access',
  scene: 'identity-evaluation',
  focus: 'deny',
  slide: `## Conditions, deny policies and effective access

Allow policies only add. To narrow or forbid access, IAM has **conditions** and **deny policies**.

### How a verdict is reached
1. **Principal access boundary** — may this principal use this resource at all?
2. **Deny policies** — a matching deny rule refuses, whatever is allowed
3. **Allow policies** — some binding must grant the permission

### The tools
- **Conditions** limit one binding — until a date, or to tagged resources
- **Deny rules** name principals, permissions and optional exceptions
- A deny rule's own condition can only test **resource tags**
- Deny attaches to an organisation, folder or project and reaches **everything below**`,
  narration:
    "If allow policies only add, how do you guarantee that something can't happen? Google gives IAM three kinds of policy, and its documentation describes them as stages. First, principal access boundary policies decide which resources a principal is eligible to use at all. Second, deny policies: if a deny rule matches the principal and the permission, the request is refused, no matter how many roles would have allowed it. Only then do allow policies matter, where some binding has to grant the permission. Look at the deny policy on the left. It denies project deletion to everyone, written as the public principal set, with one exception: the platform admins group. Notice the permission format is different from an allow policy. It's written with the service's full domain name, cloudresourcemanager dot google apis dot com, slash projects dot delete. A deny rule can carry its own condition too, but that condition can only test resource tags. Attached at the organisation, that rule reaches every folder and project beneath it. Conditions work differently. A condition belongs to a single allow binding and narrows it. The bottom card grants a contractor Cloud Run Developer, but only until the first of November, after which the binding simply stops applying. Conditions can also test resource tags, which you met in chapter one. So effective access is never one policy. It's boundaries, then denials, then grants. Next, the identities your workloads use.",
}
