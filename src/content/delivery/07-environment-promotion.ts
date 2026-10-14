import type { Section } from '../types'

export const environmentPromotion: Section = {
  id: 'environment-promotion',
  title: 'Environment promotion and controlled change',
  scene: 'delivery-promotion',
  focus: 'envs',
  slide: `## Promotion and controlled change

Environments live in **separate projects**. The **same image digest** moves through them; only configuration differs.

### Between environments
- Image: **identical**, by digest
- Settings: instance counts, databases, domains — **reviewed** config
- Who can deploy narrows as you approach **production**

### A controlled change
- Every change is a **reviewed** pull request: code and config
- Every release leaves a **record**: which digest, when, approved by whom
- Authors do not approve **their own** production changes
- Agree **change windows**, such as no deploys during a sale

### The payoff
- When production breaks, you know **what changed**`,
  narration:
    "This chapter's pieces fit together into one shape. Development, staging and production are separate projects, as chapter one recommended, so a mistake in one can't reach another, and each has its own billing and access. The same image digest moves through all three. What differs between them is configuration: production keeps two warm instances and uses the real orders database, while development scales to zero against test data. Those differences live in reviewed configuration files, not in anyone's memory. Who can deploy narrows as you approach production. Developers can deploy to development directly. Only the pipeline deploys to staging. And production takes the pipeline plus an approval. Controlled change is mostly about leaving a trail. Every change, whether code, configuration or infrastructure, arrives as a reviewed pull request. Every release records which digest went where, when, and who approved it. The person who wrote a production change doesn't approve it. And the team agrees change windows, for instance no deploys during the autumn sale, when an incident would cost the most. The payoff comes on a bad day. When production breaks, the first question is always what changed, and with this trail, the answer takes seconds rather than hours. Which leads directly to the next chapter: observing production, securing it, and recovering when it fails.",
}
