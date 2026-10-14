import type { Section } from '../types'

export const apisAndFirstCall: Section = {
  id: 'apis-and-first-call',
  title: 'APIs, gcloud and a first call',
  scene: 'foundations-first-call',
  focus: 'project-id',
  slide: `## APIs, gcloud and a first call

The console, \`gcloud\` and Terraform all call the **same service APIs**. Each API is **enabled per project**, and a call to a disabled API fails even with the right permissions.

### Cloud Shell
- A browser terminal with \`gcloud\` installed and **already signed in**
- 5 GB of persistent \`$HOME\`; the machine behind it is temporary

### One project, three identifiers
- **Project ID** — chosen at creation, globally unique, permanent
- **Project number** — assigned by Google, used inside many APIs
- **Display name** — a label for people; edit it freely

### Resource names
- Service host, then the chain of parents, then the resource`,
  narration:
    "Everything you do in Google Cloud is an API call. Clicking in the console, typing a gcloud command and applying Terraform all end up calling the same service APIs. And APIs are switched on per project. Until a project enables the Cloud Run API, every Cloud Run call against it fails, however much permission the caller holds. So the session on the left starts by setting the default project, then enables run dot google apis dot com. You can run this in Cloud Shell, a terminal in the browser with gcloud already installed and already signed in as you. Your home directory there keeps five gigabytes between sessions, but the machine behind it is temporary. The third command describes the project, and the output shows three different identifiers that are easy to confuse. The project ID, retail dev forty-eight twenty-one, is chosen when the project is created, is unique across all of Google Cloud, and can never change. The project number is assigned by Google, and many APIs use it internally. The display name is just a label for people, and you can edit it whenever you like. Finally, look at the full resource name at the bottom. It reads left to right: the service's API host, then the project, then the location, then the resource itself. You'll see that shape again in access policies and audit logs. Last in this chapter: keeping costs and clutter under control.",
}
