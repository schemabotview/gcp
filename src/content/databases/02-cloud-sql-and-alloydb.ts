import type { Section } from '../types'

export const cloudSqlAndAlloydb: Section = {
  id: 'cloud-sql-and-alloydb',
  title: 'Cloud SQL and AlloyDB for PostgreSQL',
  scene: 'databases-cloud-sql',
  focus: 'yours',
  slide: `## Cloud SQL and AlloyDB

**Cloud SQL for PostgreSQL** is managed PostgreSQL: Google runs the machines, patching, backups and failover. The database's **contents and behaviour** stay yours.

### Google runs
- Patching, within a **maintenance window** you choose
- Automated **backups**, plus logs for point-in-time recovery
- Failover to a standby, when high availability is on

### Still yours
- Schema, **indexes** and the queries that use them
- **Connections**: pool sizes and limits
- Database users and **grants** inside PostgreSQL

### AlloyDB for PostgreSQL
- PostgreSQL-compatible, built for **heavier** and mixed workloads
- A **columnar engine** speeds analytical scans over live data`,
  narration:
    "Cloud SQL for PostgreSQL is PostgreSQL that Google operates. Google provisions the machine and storage, applies patches during a maintenance window you choose, takes automated backups, keeps the transaction logs needed for point-in-time recovery, and, if you turn on high availability, fails over to a standby. That removes a lot of operational work. But look at the right-hand column, because it's what managed services can't do for you. The schema and its indexes are yours, and a missing index makes the most powerful instance slow. The queries are yours. Connections are yours: how many each application instance opens, and how many the database allows. And the users and grants inside PostgreSQL are yours. IAM decides who may connect to the instance; PostgreSQL's own permissions decide which tables they can read. AlloyDB for PostgreSQL is the other managed PostgreSQL option. It's compatible with PostgreSQL, so the skills and most of the code carry over, but its architecture is different. Storage is scaled separately from compute, and a columnar engine speeds up analytical scans over operational data. It's worth evaluating when a busy Cloud SQL instance is genuinely the limit, or when the same database must serve heavy reporting queries alongside transactions. For the retail orders database, Cloud SQL is the sensible starting point. Next: what a transaction looks like, and how the API connects.",
}
