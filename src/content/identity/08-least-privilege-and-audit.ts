import type { Section } from '../types'

export const leastPrivilegeAndAudit: Section = {
  id: 'least-privilege-and-audit',
  title: 'Project separation, least privilege and audit',
  scene: 'identity-role-matrix',
  focus: 'matrix',
  slide: `## Separation, least privilege and audit

Write the access plan down as a **matrix**: principals by environment, with the narrowest role that does the job.

### Design rules
- **Separate projects** per environment, so a dev grant cannot touch prod
- Grant to **groups** and **service accounts**, rarely to individuals
- **Predefined** roles over basic ones; one service account per workload
- Break-glass access is **rare, logged and reviewed**

### Audit ownership
- **Admin Activity** logs are always written and cannot be disabled
- **Data Access** logs are off by default, except BigQuery's
- Someone must **own** the logs — ideally in a separate project`,
  narration:
    "Let's turn everything in this chapter into a plan you could review. The table is the retail company's role matrix: who holds what, in each environment. Developers deploy freely in development but can only view production. The S R E group can read logs and metrics in production without being able to change anything. The deployment pipeline's service account can deploy to production and can act as the orders A P I account, so new revisions run as that identity and nothing more. Auditors get the private log viewer role, which is what reading Data Access logs requires. And orders A P I itself holds only what the running service needs: a database connection and one secret. A few rules produced that table. Separate projects per environment, so a grant in development cannot reach production. Grant to groups and service accounts, rarely to individuals. Prefer predefined roles over basic ones, and give each workload its own service account. Keep break-glass access rare, logged and reviewed. Then there's evidence. Admin Activity audit logs record configuration changes, such as a policy edit, and are always written. Data Access audit logs, which record reads of data, are off by default for nearly every service, BigQuery being the main exception. So if you need to know who read the order data, you must turn them on, and pay for the volume. Finally, someone has to own the logs, ideally in a project the people being audited cannot change. With identities settled, next we build and run the first application.",
}
