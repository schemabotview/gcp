import type { Section } from '../types'

export const securityControls: Section = {
  id: 'security-controls',
  title: 'Security Command Center, Cloud Armor, IAP and VPC Service Controls',
  scene: 'operations-security',
  focus: 'perimeter',
  slide: `## Security controls and their boundaries

Each security service protects a **specific** path. Knowing what each one is **not** matters as much as knowing what it does.

### Four controls
- **Cloud Armor** — rules and rate limits at the external load balancer
- **Identity-Aware Proxy** — sign-in before anyone reaches an internal app
- **VPC Service Controls** — a perimeter that keeps data from leaving supported services
- **Security Command Center** — findings about misconfigurations and threats

### The perimeter
- A stolen token cannot copy data **out** to another project's bucket
- Services **not listed** on the perimeter are not restricted
- It is not a **firewall**, and it does not replace IAM`,
  narration:
    "Google Cloud has several security services, and each protects a specific path. Knowing what each one isn't is as important as knowing what it is. Cloud Armor sits at the external Application Load Balancer. It applies web application firewall rules and rate limits to internet traffic before it reaches the storefront. It can't protect traffic that skips the load balancer, which is why chapter four locked Cloud Run's ingress to internal and load balancer traffic. Identity-Aware Proxy puts sign-in in front of internal applications, such as the warehouse dashboard, so only authenticated employees reach them. It decides who gets in; the application still decides what each person may do. VPC Service Controls draws a perimeter around supported services, such as Cloud Storage, BigQuery and Cloud SQL, in a set of projects. Its purpose is to stop data leaving. Look at the scene. An attacker steals a valid token from inside production and tries to copy the order exports to a bucket in their own project. IAM alone might allow the read. The perimeter refuses the copy, because the destination is outside. But services not listed on the perimeter aren't restricted at all. And it's not a firewall for VMs, nor a replacement for IAM. Finally, Security Command Center collects findings, such as a public bucket or a risky role. A finding is a report, though. Someone still has to act on it. Next: an incident.",
}
