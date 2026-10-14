import type { Section } from '../types'

export const plansAndDrift: Section = {
  id: 'plans-and-drift',
  title: 'Plans, drift, replacement and deletion protection',
  scene: 'delivery-plan',
  focus: 'plan-output',
  slide: `## Plans, drift and replacement

A **plan** shows what Terraform intends to change. Read every line — especially \`-/+\`, which means **destroy and recreate**.

### Reading this plan
- The image change: **expected**
- The label removal: **drift**, a manual edit Terraform will undo
- The database region change **forces replacement** — the data would go

### Guards
- **Deletion protection** on the instance refuses the delete
- \`prevent_destroy\` makes Terraform refuse to plan it
- Any replacement of a stateful resource **stops** the pipeline for review

### What a plan cannot promise
- That apply **succeeds**, or that the application still **works**`,
  narration:
    "Before Terraform changes anything, it produces a plan, and reading it is the most important habit in this chapter. Look at the three changes. The first updates the storefront's image from one digest to another. That's the release we expected. The second removes a label from the exports bucket. Nobody asked for that in code. Someone added the label by hand in the console, and Terraform, seeing drift between code and reality, plans to put things back. That's worth a conversation, not a blind apply. The third line is the dangerous one. The orders database's region was changed in code, and Cloud SQL can't move an instance between Regions in place, so Terraform plans to destroy it and create a new one. The data would go with it. The marker for this is minus slash plus: destroy, then create. Three guards should stand in the way. The instance has deletion protection, so Google Cloud refuses to delete it. Terraform's prevent destroy setting makes Terraform refuse to even plan its destruction. And the pipeline stops for human review whenever a stateful resource would be replaced. Finally, know a plan's limits. It's a prediction. Apply can still fail on a quota, an organisation policy, or an API error, partway through. And a plan that applies cleanly can still break the application, because Terraform knows about resources, not about whether your code works with them. Next: the build.",
}
