import type { Section } from '../types'

export const cloudDeployAndRollback: Section = {
  id: 'cloud-deploy-and-rollback',
  title: 'Cloud Deploy, canaries and rollback',
  scene: 'delivery-cloud-deploy',
  focus: 'canary',
  slide: `## Cloud Deploy, canaries and rollback

**Cloud Deploy** moves one **release** through an ordered list of **targets**, here dev, staging and prod.

### Promotion
- Each target receives the **same** release; nothing is rebuilt
- A **verify** job can test each target after deploying
- Production **requires approval** before the rollout starts

### The canary
- Cloud Run splits traffic: **10 %**, then **50 %**, then all
- Watch errors and latency at each phase; stop if they move

### Rollback
- Re-deploys an **earlier release**: fast for code
- Does **not** undo schema changes — use **expand, then contract**`,
  narration:
    "Cloud Deploy manages the last step: moving a release through environments. A delivery pipeline lists targets in order, here dev, staging and prod. A release is created once, pointing at the image digest from the build, and the same release is promoted from target to target. Nothing is rebuilt along the way, so what was tested in staging is exactly what reaches production. Each target can run a verify job after deploying, for example a smoke test against staging. And the production target requires approval, so a person signs off before its rollout begins. On production, the release rolls out as a canary. Cloud Deploy creates the new revision on Cloud Run and sends it ten percent of traffic, while the old revision keeps the rest. If errors and latency stay flat, it moves to fifty percent, then to stable at a hundred. At any phase, you can stop and roll back. Rollback means deploying an earlier release, here one point four point two, and because the old images still exist, it's fast. Now the limit from chapter three, again. Rollback moves code, not data. If release one point five dropped a column, rolling back the code won't bring the column back. The safe pattern is expand, then contract. First add new columns while old code still works, then deploy the new code, and only later remove what's no longer used. Next: putting environments together.",
}
