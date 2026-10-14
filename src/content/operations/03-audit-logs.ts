import type { Section } from '../types'

export const auditLogs: Section = {
  id: 'audit-logs',
  title: 'Cloud Audit Logs, categories and collection',
  scene: 'operations-audit',
  focus: 'types',
  slide: `## Cloud Audit Logs

**Audit logs** record who did what, where and when — configuration changes, data access and Google's own actions.

### Reading an entry
- **methodName** — the operation, such as \`SetIamPolicy\`
- **principalEmail** — who did it
- **resourceName** and the change itself, here an Owner grant

### Four types
- **Admin Activity** and **System Event** — always written
- **Data Access** — off by default except for BigQuery; enable it **per service**
- **Policy Denied** — requests refused by security policies

### The assumption to check
- If a type was **not enabled** when it happened, no record exists to find`,
  narration:
    "Audit logs answer a different question from application logs: who did what, to which resource, and when. The entry on the left is an Admin Activity audit log. Its method name is Set I A M Policy, meaning someone changed an access policy. The authentication info says who: alice at retail dot example. The resource is the production project. And the policy delta shows the change itself: the Owner role was added for a contractor's account. The timestamp says it happened at two forty one in the morning. That should make you uneasy, and it's where section seven picks up. There are four audit log types, and they're collected differently. Admin Activity logs record configuration and IAM changes. They're always written and can't be turned off. System Event logs record actions Google itself takes on your resources, such as a live migration, and they're always written too. Data Access logs record reads of data and writes of user data. They're off by default for almost every service, BigQuery being the main exception, and must be enabled per service, at a cost. Policy Denied logs record requests that a security policy refused. That leads to the assumption every investigation must check. If Data Access logging wasn't enabled for Cloud Storage when someone read the export bucket, there's no record to find, and no query can recover one. Next: deciding what good service means.",
}
