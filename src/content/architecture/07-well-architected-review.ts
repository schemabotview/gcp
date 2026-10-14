import type { Section } from '../types'

export const wellArchitectedReview: Section = {
  id: 'well-architected-review',
  title: 'An integrated Well-Architected review',
  scene: 'architecture-review',
  focus: 'priorities',
  slide: `## A Well-Architected review

The **Google Cloud Well-Architected Framework** reviews a system across six pillars at once, so improving one does not quietly damage another.

### Six pillars, one system
- Operational excellence · Security, privacy and compliance · Reliability
- Cost optimisation · Performance optimisation · Sustainability

### Prioritise
- Rank findings by **risk** and **effort**, not by pillar
- Do first: remove standing Owner grants, **drill** recovery, fix labels

### What this course does not establish
- Explaining a design is not operating it in production
- That takes **practice**: real deployments, incidents and restores`,
  narration:
    "The course ends where Google's Well-Architected Framework would have you start each year: a review of the whole system across six pillars at once. Reviewing them together matters, because improving one can quietly damage another. A cheaper design can be less reliable, and a more secure one harder to operate. Here's the retail application's review, and every finding points back to a chapter. Operational excellence: two services still lack runbooks. Security, privacy and compliance: standing Owner grants remain, which is exactly how the incident in chapter eleven became possible. Reliability: the regional recovery plan has never been drilled, so its two-hour target is still a claim. Cost optimisation: nine hundred and sixty eight pounds a month is unlabelled. Performance: the ninety-ninth percentile is dominated by the payments call. Sustainability: the stock VM runs at eleven percent utilisation. Then prioritise across pillars, by risk and effort. First, replace standing Owner grants with just-in-time access: high risk, little effort. Second, run the recovery drill once, so the targets become evidence. Third, fix the labels, then rightsize whatever they reveal. One last, honest point. This course has explained how to construct and reason about a Google Cloud workload. That isn't the same as running one in production. That competence comes from practice: real deployments, real incidents, and restores you've actually performed. The documentation, and your own systems, are where it continues.",
}
