import type { Section } from '../types'

export const architectureComparison: Section = {
  id: 'architecture-comparison',
  title: 'Compute Engine, GKE and serverless compared',
  scene: 'architecture-compare',
  focus: 'table',
  slide: `## Comparing whole designs

Chapter 5 compared platforms by control. Now compare the orders API's **full monthly cost** on each, from **stated assumptions**.

### Count every line
- Compute **and** idle capacity, cluster fees, data transfer
- Logs, backups and analytics queries: often **half** the bill

### Reading this comparison
- **Idle capacity** is the biggest difference between designs
- The shared lines barely change with the platform
- Change the assumptions — steady 24-hour load — and the order can **flip**

### Not only cost
- Team skills, control, latency and lock-in still decide
- State the assumptions, so the comparison can be **checked**`,
  narration:
    "Chapter five compared Compute Engine, GKE and Cloud Run by control and operational work. Now compare their cost for the orders API, honestly. Honest means two things. First, state the assumptions, at the top of the scene: thirty requests a second on average, three hundred at peak, quiet overnight, in one Region, with illustrative prices. Second, count every line, not just compute. Read the table. Compute under load is similar on all three. The big difference is idle capacity. VMs in a managed instance group sized for the peak sit mostly idle overnight. GKE Autopilot bills pod requests, so idle is smaller. And Cloud Run scales close to zero. GKE adds a cluster fee. Then come the lines that barely change with the platform: data transfer, logs, backups and analytics queries. Together they're about half of each bill, which is why comparisons that count only compute mislead. On these assumptions, Cloud Run is cheapest. But change one assumption, say the load becomes steady around the clock, and idle capacity disappears. Then committed VMs can come out ahead. So the right answer depends on the workload, which is the point of stating it. Cost isn't the only factor, either. Team skills, the control you need, latency and lock-in still decide designs, as chapter five said. A comparison with written assumptions can be checked, argued with and updated. One without them can't. Next: changing an architecture safely.",
}
