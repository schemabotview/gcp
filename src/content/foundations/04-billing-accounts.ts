import type { Section } from '../types'

export const billingAccounts: Section = {
  id: 'billing-accounts',
  title: 'Billing accounts and who pays',
  scene: 'foundations-billing',
  focus: 'account',
  slide: `## Billing accounts and who pays

A **Cloud Billing account** pays for the usage of the projects linked to it. It is a separate resource from the projects it pays for.

### The link
- A project links to **one** billing account at a time
- One billing account can pay for **many** projects
- Linking takes permission on **both** sides: the project and the account
- The account may even belong to a **different organisation**

### Three different responsibilities
- **Owning** a project, **deploying** to it and **paying** for it can be three different people
- Each line of cost is project · service · usage
- Budgets and cost reports live **on the billing account**, scoped to projects
- Unlink billing and paid services **stop**; resources can be lost`,
  narration:
    "Every charge in Google Cloud lands on a Cloud Billing account. The billing account is its own resource, separate from the projects it pays for, and it holds the payment arrangement, whether that's a card or a monthly invoice. Projects link to it. The relationship runs one way: a project is linked to only one billing account at a time, but one billing account can pay for many projects. Here, one account pays for production, development and the analytics project. Creating that link is deliberately a two-sided act. You need permission on the project to change its billing, and permission on the billing account to attach things to it. That's what stops someone from quietly charging their project to the finance team's account. The billing account doesn't even have to belong to the same organisation as the projects it pays for. Below is a hypothetical ledger for one month. The figures are made up, but the shape is real: every line ties a cost back to a project, a service and the usage that caused it. That's why project structure matters for money as well as access, and it's why budgets and cost reports are set on the billing account and then narrowed to the projects you care about. Notice too that owning a project, deploying to it and paying for it can be three different people, and in a real company they usually are. One caution: if a project loses its billing link, its paid services stop, and some resources can be removed for good. Next, we make our first real call against a project.",
}
