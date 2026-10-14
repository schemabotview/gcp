import type { Section } from '../types'

export const eventarc: Section = {
  id: 'eventarc',
  title: 'Eventarc routing and destination authorisation',
  scene: 'events-eventarc',
  focus: 'trigger',
  slide: `## Eventarc: routing events

**Eventarc** delivers events from Google services, audit logs and your own topics to services, as **CloudEvents**, matched by **filters**.

### A trigger names
- The event **type** and attributes to match, such as one bucket
- The **destination**: a Cloud Run service, function, workflow or GKE service
- A **service account** the trigger acts as

### Authorisation
- That account must hold **Cloud Run Invoker** on the destination
- Without it the trigger exists, and **nothing** is delivered
- Grant it on the **one service**, not the whole project

### Audit-log events
- Some sources arrive through **audit logs**, which must be enabled`,
  narration:
    "Eventarc is the router between event sources and the services that react to them. Sources include Google services like Cloud Storage, events derived from Cloud Audit Logs, such as someone changing an IAM policy, and your own Pub/Sub topics. Destinations include Cloud Run services and functions, Workflows, and services on GKE. Events arrive in a standard envelope called a CloudEvent. A trigger ties the two together, and the command on the left shows its three parts. Filters say which events match: here, object finalized events, from one bucket only. The destination is the thumbnailer service. And the trigger acts as a service account. That last part is where most first attempts fail silently. To deliver an event, the trigger's service account has to call the destination, so it needs the Cloud Run Invoker role on that service. If it doesn't have it, the trigger is created anyway, looks perfectly healthy, and delivers nothing. Grant the role on the one destination service, not across the whole project. One more caution. Some sources only reach Eventarc through audit logs, and some of those log types, Data Access logs in particular, are off by default, as chapter two noted. If the audit log isn't written, there's no event to route. Next: two services that are easy to confuse.",
}
