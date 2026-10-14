import type { Section } from '../types'

export const adminVersusDataAccess: Section = {
  id: 'admin-versus-data-access',
  title: 'Resource administration versus data access',
  scene: 'identity-data-access',
  focus: 'denied',
  slide: `## Administration versus data access

Managing a resource and reading what is inside it are **different permissions**, and services draw that line differently.

### Reading the 403
- It names the **principal**, the missing **permission** and the resource
- "Or it may not exist" — a refusal does not reveal whether the object is there
- Fix it by granting the **narrowest role** with that permission, on the bucket

### Service-specific lines
- **Cloud Run** admin roles manage services, not data
- **Cloud SQL** IAM gets you a connection; tables need **database** grants
- **BigQuery** splits running a job from reading a dataset
- Ask **which side** of the line failed before granting anything`,
  narration:
    "Here's a failure you'll meet early. The orders A P I service account can be deployed, it runs, it connects to its database. Then it tries to read an export file from a Cloud Storage bucket, and gets a 403. Read the message carefully, because it tells you nearly everything. It names the principal, orders A P I. It names the missing permission, storage dot objects dot get. And it adds, or it may not exist. That phrase is deliberate. A refusal won't confirm whether the object is there, so someone without access learns nothing from probing. The fix isn't Owner or Editor. It's the narrowest role containing that permission, Storage Object Viewer, granted on that one bucket. The broader lesson is in the table. Being able to administer a resource and being able to read its data are different things, and each service draws the line in its own place. Cloud Run Admin manages services, but a service holds no data of its own. Cloud SQL Client lets you open a connection to an instance, but what you can read inside the database is decided by database users and grants, which IAM doesn't manage for you by default. BigQuery separates running a query job in a project from reading the dataset it touches, so you often need both. So when access fails, ask which side of that line you're on. Next, guard-rails on configuration itself.",
}
