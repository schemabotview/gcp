import type { Section } from '../types'

export const servicesAndRevisions: Section = {
  id: 'services-and-revisions',
  title: 'Services, revisions and the runtime contract',
  scene: 'cloud-run-revisions',
  focus: 'rev3',
  slide: `## Services, revisions and the runtime contract

A **service** is a stable name and URL. Each deploy or configuration change creates a new, **immutable revision**: an image digest plus its settings.

### Revisions
- Changing only memory or an env variable still makes a **new revision**
- Old revisions stay available, which is what makes rollback quick
- **Traffic** is assigned to revisions, by percentage or by tag

### The runtime contract
- Listen on **0.0.0.0:$PORT** — not localhost
- Respond within the **request timeout**: 5 minutes by default, up to 60
- Local files live **in memory** and vanish with the instance
- On shutdown the container gets **SIGTERM** and a short grace period`,
  narration:
    "On Cloud Run, a service is the thing with a stable name and URL: storefront, in europe west 2. What actually runs is a revision. A revision is an immutable snapshot of one image digest plus all its settings: memory, environment variables, the service account, scaling limits. Look at the three revisions in the scene. The first ran version one point three. The second ran one point four. The third runs the same image as the second, and only the memory changed. That still created a new revision, because the settings are part of what a revision is. Old revisions aren't deleted when a new one takes over, and traffic is assigned to revisions by percentage or by tag, which is what lets you send traffic back to one in seconds. Every revision's container has to keep the runtime contract. It must listen on the port in the PORT variable, on all interfaces. A server bound to localhost inside the container can't be reached, and the revision never becomes ready. It must answer each request within the request timeout, five minutes by default and up to sixty. It shouldn't keep state locally: files written to its filesystem live in memory, count against the instance's memory, and disappear when the instance does. And when Cloud Run shuts an instance down, it sends a terminate signal and allows a short grace period to finish up. Next: the identities involved in all this.",
}
