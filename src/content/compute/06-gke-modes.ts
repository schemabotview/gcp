import type { Section } from '../types'

export const gkeModes: Section = {
  id: 'gke-modes',
  title: 'GKE Autopilot versus Standard',
  scene: 'compute-gke',
  focus: 'modes',
  slide: `## GKE Autopilot and Standard

**GKE** runs Kubernetes for you. The control plane is always Google's; the **mode** decides who runs the nodes.

### Autopilot
- Google provisions and manages **nodes**
- You pay for the **resource requests** of your pods
- Over-sized requests cost money directly
- Some node-level settings are **not available** to you

### Standard
- You design and manage **node pools**
- You pay for node VMs, **used or not**
- More control over machine types and node configuration

### In both modes
- Manifests, **RBAC**, workload identity and upgrade timing stay **yours**
- Kubernetes skills are still required`,
  narration:
    "Google Kubernetes Engine runs Kubernetes clusters, and in both of its modes Google operates the control plane, the part that stores cluster state and schedules work. What differs is the nodes, the machines your pods actually run on. In Autopilot mode, Google provisions and manages the nodes. You submit workloads, and you're billed for the CPU and memory your pods request. Look at the requests in the manifest: half a CPU and five hundred and twelve megabytes per replica, times three replicas. Ask for more than you use, and you pay for the difference directly. Autopilot also restricts some node-level settings, because the nodes aren't yours. In Standard mode, you design node pools yourself, choosing machine types and node settings, and you pay for those node VMs whether pods fill them or not. That gives more control, and more ways to waste money if nodes run half empty. Now the part that doesn't change. In both modes, the Deployment, its service account mapping, Kubernetes role-based access, network policies and the timing of upgrades are yours. Managed orchestration still leaves the application and its configuration with you, and you still need people who understand Kubernetes. Compared with Cloud Run, GKE asks for more of that skill in return for more control over how services are deployed, connected and scheduled. Next: the property all three platforms quietly assume.",
}
