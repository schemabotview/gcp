import type { Section } from '../types'

export const impersonationAndCredentials: Section = {
  id: 'impersonation-and-credentials',
  title: 'Impersonation, ADC and workload identity federation',
  scene: 'identity-credentials',
  focus: 'impersonate',
  slide: `## Impersonation, ADC and federation

Workloads should hold **short-lived tokens**, not long-lived key files.

### Application Default Credentials
- Client libraries look in a fixed order: an **env variable**, your **local gcloud** login, then the **attached** service account
- ADC only **finds** a credential; IAM still decides what it may do

### Two powers over a service account
- **actAs** (Service Account User) — attach it to a workload
- **getAccessToken** (Token Creator) — mint tokens and act as it directly
- Being able to use an identity is separate from what that identity holds

### Outside Google Cloud
- **Workload identity federation** trades a CI job's own token for a short-lived Google one — no key to leak`,
  narration:
    "How does running code actually get a credential? Google's client libraries use Application Default Credentials, which looks in three places in a fixed order. First, an environment variable pointing at a credential file. Second, a file written when you run gcloud auth application default login on your own machine. Third, on Google Cloud, the service account attached to the workload, fetched as a short-lived token from the metadata server. That third path is the one production should use. Be clear about what ADC does: it finds a credential. It grants nothing. What that identity may do is still decided by IAM. Next, two different powers over a service account that are easy to confuse. Act as, from the Service Account User role, lets you attach the account to something you deploy, so the workload runs as it. Get access token, from the Token Creator role, lets you mint tokens and act as the account directly, which is impersonation. Either way, the permission to use an identity is separate from the permissions that identity holds, and both deserve review. Finally, workloads outside Google Cloud, such as a build pipeline. With workload identity federation, the job presents its own signed token, Google's Security Token Service checks it against rules you set, and returns a short-lived token. No key file ever exists, so none can leak. Next, the difference between managing a resource and reading its data.",
}
