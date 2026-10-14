import type { Section } from '../types'

export const serviceAccounts: Section = {
  id: 'service-accounts',
  title: 'Service accounts and service agents',
  scene: 'identity-service-accounts',
  focus: 'faces',
  slide: `## Service accounts and service agents

A **service account** is an identity for software. The retail app's code runs as \`orders-api\`, not as any person.

### Three kinds
- **Yours** — you create it, grant its roles, and retire it
- **Default** — created when some APIs are enabled; may get **Editor** unless an organisation policy prevents it
- **Service agents** — Google-managed identities a service uses to act in your project

### Two faces
- As a **principal**, it holds roles and calls APIs
- As a **resource**, others hold roles **on it** — such as permission to use it
- Grants **on** it are often the real security boundary
- **Disable** before you delete; a deleted one can be undeleted for 30 days`,
  narration:
    "When the retail application's code reads from the database, it shouldn't be doing so as Alice, or as anyone else. It runs as a service account, an identity that belongs to the workload. There are three kinds to tell apart. Your own service accounts, like orders A P I, are created by you, given exactly the roles their workload needs, and retired when the workload goes. Default service accounts are created automatically when you enable certain APIs. The Compute Engine default account, for example, can be granted the very broad Editor role on the project, unless an organisation policy stops that automatic grant. Newer organisations enforce that policy by default, but older ones often don't, so check. Service agents are different again. Google manages them, and a service uses its agent to act inside your project on your behalf, for example to pull a container image. Treat their grants as part of the service and change them with care. Now the subtle part. A service account has two faces. As a principal, it holds roles and makes calls. But it's also a resource, so other principals can hold roles on it, such as permission to attach it to a workload or to borrow its identity. Those grants are often the real security boundary. When retiring one, disable it first and watch for failures. A deleted one can be undeleted for thirty days. Next: how code actually gets credentials.",
}
