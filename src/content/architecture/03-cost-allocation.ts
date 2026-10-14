import type { Section } from '../types'

export const costAllocation: Section = {
  id: 'cost-allocation',
  title: 'Cost allocation, exports and cost drivers',
  scene: 'architecture-cost',
  focus: 'result',
  slide: `## Cost allocation

To manage cost, first **attribute** it: which workload spent what, on which service. The **billing export** to BigQuery makes that a query.

### The query
- Group net cost (after **credits**) by the \`app\` **label** and service
- One month at a time, using the **invoice month**

### Reading the result
- Orders' Cloud SQL is the **largest** line
- **£968** of Compute Engine has **no label**: nobody owns it
- Logging is a real line: verbose logs **cost money**

### Making it stick
- Labels must be on resources **before** the spend
- Enforce them in Terraform modules; review untagged cost **monthly**
- **Budgets** filtered by label warn early; the export explains afterwards`,
  narration:
    "Chapter one introduced budgets and labels. Now they pay off. Before you can reduce cost, you need to attribute it: which workload spent what, on which service. The Cloud Billing export to BigQuery turns that into a query. The query on the left reads September's export. It takes the app label from each cost row, alongside the Google Cloud service, and sums the cost after subtracting credits, such as discounts, to get the net cost. Then it ranks the results. Read the top rows. The orders application's Cloud SQL instance is the largest line, which is no surprise for a busy transactional database. Analytics' BigQuery spend comes from the queries in chapter nine. But the second line is the real finding: nine hundred and sixty eight pounds of Compute Engine with no app label at all. Nobody can say which workload it serves, which means nobody is responsible for reducing it, and it may be serving nothing. That's where the next section starts. Also notice Cloud Logging in fifth place. Verbose debug logging left on in production is a real cost. Making allocation stick takes two habits. Labels must be on resources before the spend happens, because the export records the labels a resource had at the time. So set them in the Terraform modules from chapter ten, where nobody can forget them. And review unlabelled cost every month, before it grows. Budgets filtered by label warn you early; the export explains afterwards. Next: reducing the bill, in the right order.",
}
