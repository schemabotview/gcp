import type { Section } from '../types'

export const rolesAndBindings: Section = {
  id: 'roles-and-bindings',
  title: 'Roles, bindings and inheritance',
  scene: 'identity-bindings',
  focus: 'roles',
  slide: `## Roles, bindings and inheritance

An **allow policy** is a list of **bindings**. Each binding grants one **role** to a list of **members**. A role is a named set of **permissions**, such as \`run.services.get\`.

### Three kinds of role
- **Basic** — Owner, Editor, Viewer: thousands of permissions; avoid in production
- **Predefined** — per service, maintained by Google, e.g. \`roles/run.invoker\`
- **Custom** — your own list, which you must keep current

### Where policies attach
- Organisation, folder, project, and many individual resources
- The **effective** policy is the union of a resource's own and every ancestor's
- Grant on the **smallest** resource that works — a bucket, not the project
- An allow policy can only **add** access, never remove it`,
  narration:
    "Here's what an allow policy looks like when you ask gcloud for it. It's a list of bindings, and each binding says: this role, for these members. The checkout developers' group gets Cloud Run Developer, so they can deploy and update services. The orders A P I service account gets Cloud SQL Client, so it can connect to the database instance. And the S R E group gets Viewer. A role, in turn, is just a named set of permissions, and each permission names a service, a resource type and a verb, such as run dot services dot get. Roles come in three kinds. The basic roles, Owner, Editor and Viewer, predate IAM's fine-grained model and each carry an enormous number of permissions across almost every service, so they're a poor fit for production. Predefined roles are written per service by Google and kept up to date as services change. Custom roles are your own lists of permissions, which also means keeping them current is your job. Policies attach to the organisation, to folders, to projects, and to many individual resources such as a bucket or a single Cloud Run service. Grant on the smallest resource that works: a role on one bucket is far easier to reason about than the same role on the whole project. What a principal can actually do is the union of the resource's own policy and every policy above it. So an allow policy can only ever add access. To take access away, you need something else, which is next.",
}
