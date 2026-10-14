import type { Section } from '../types'

export const resourceHierarchy: Section = {
  id: 'resource-hierarchy',
  title: 'Organisations, folders and projects',
  scene: 'foundations-hierarchy',
  focus: 'proj-prod',
  slide: `## Organisations, folders and projects

Every resource has **exactly one parent**. Together they form a tree, and policy flows **down** it.

### The levels
- **Organisation** — the root, tied to your Cloud Identity or Workspace domain
- **Folders** — group projects by team or environment
- **Project** — the container for resources, enabled APIs, a billing link and access policy
- **Resources** — a Cloud Run service, a database, a dataset

### What a project is not
- Not a **network** boundary — projects can share a VPC network
- Not an **availability** boundary — one project spans many Regions
- It is an ownership and policy boundary: **who may do what, and who pays**`,
  narration:
    "Now the logical side. Google Cloud organises everything into a tree called the resource hierarchy, and the rule that makes it work is simple: every resource has exactly one parent. At the root is the organisation, here retail dot example, which is tied to the company's Cloud Identity or Google Workspace domain. Below it are folders. This company keeps production and non-production in separate folders, so that a policy set on production can't leak into a developer's experiment, and the reverse. Folders hold projects, and the project is the level you'll touch most. A project holds the actual resources, records which APIs are switched on, links to a billing account, and carries its own access policy. Under the production project sit the storefront on Cloud Run and the orders database on Cloud SQL. Access policies set high in the tree are inherited by everything beneath them, which is why the structure deserves thought before the first project exists. One clarification matters here. A project is an ownership and policy boundary, not a network boundary and not an availability boundary. Two projects can share one VPC network, and a single project can hold resources in many Regions. So a project tells you who may act and who pays. It doesn't tell you what's isolated, or what survives an outage. Speaking of who pays, that's the next section.",
}
