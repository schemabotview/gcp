import type { Section } from '../types'

export const budgetsAndCleanup: Section = {
  id: 'budgets-and-cleanup',
  title: 'Budgets, labels and cleanup',
  scene: 'foundations-budget',
  focus: 'spend-plot',
  slide: `## Budgets, labels and cleanup

A **budget** compares spend with an amount you set and **alerts** at thresholds — 50, 90 and 100 % by default. An alert **does not stop** usage, and it arrives after the spend that triggered it.

### Labels and tags
- **Labels** — key–value pairs on one resource; filter cost reports
- **Tags** — defined centrally, **inherited** down the tree, usable in access and policy conditions

### Cleaning up
- Delete the resources, or **shut down** the whole project
- A shut-down project waits **30 days** and can be restored
- Disable billing first: charges can accrue until the **billing cycle ends**
- After that it is gone, and **its ID can never be reused**`,
  narration:
    "A budget watches spend on a billing account, or on part of one, and compares it with an amount you set. When spend crosses a threshold, by default fifty, ninety and a hundred percent, it sends an alert. The plot shows a hypothetical month for the development project. A traffic test starts on day eighteen, spend climbs faster, and the alerts fire at fifty, then ninety, then a hundred percent. Look at what the line does next. It keeps climbing. An alert-only budget notifies people. It doesn't stop anything, and the alert arrives after the spend has happened. Google does offer a separate spend-cap budget type that pauses one chosen service, but that's a distinct control you'd set up deliberately, and costs can still overrun before it takes effect. To find out where the money went, you need metadata on resources. Labels are key-value pairs on a single resource, such as team equals checkout, and they flow into cost reports. Tags are defined centrally, are inherited down the hierarchy, and can be used in access and organisation policy conditions. Finally, cleanup. You can delete the resources in a project, or shut the project down entirely. A shut-down project waits thirty days and can be restored in that window. Disable its billing first, because charges can keep accruing until the current billing cycle ends. After that, it's gone for good, and its project ID can never be used again. With ownership, location and cost in place, next we decide who is allowed to act at all.",
}
