import type { Section } from '../types'

export const choosingCompute: Section = {
  id: 'choosing-compute',
  title: 'Workload shape and compute selection',
  scene: 'compute-selection',
  focus: 'compare',
  slide: `## Choosing where code runs

The storefront runs on Cloud Run. Now take the **orders API** and ask where it **could** run — and which requirement would decide.

### Questions before products
- **Shape** — short requests, long-running processes, or batch jobs?
- **Control** — do you need the operating system, a kernel module, a GPU?
- **Portability** — must it run as Kubernetes elsewhere too?
- **Latency** — can it tolerate an occasional cold start?

### The trade
- More control means more **operational work** you own
- Managed platforms remove work and remove **options**
- **Idle cost** differs too: VMs bill while idle; Cloud Run at min 0 does not
- Pick by the requirement that cannot bend, then revisit as it changes`,
  narration:
    "So far the storefront has run on Cloud Run, and that was a sensible default. But this chapter steps back and asks a different question. For the orders API, where could it run, and which requirement would actually decide? Start with the workload, not the product. What shape is it? Short requests and responses, a long-running process that holds connections open, or batch jobs that run and finish? How much control do you need? If you need a particular kernel module, a licensed agent installed in the operating system, or a specific GPU, that pushes you towards virtual machines. Do you need portability, for example the same Kubernetes manifests running on-premises too? And can the service tolerate an occasional cold start? The table puts the same API on three platforms. On Compute Engine, you manage the operating system, its patching and its scaling, through managed instance groups. You get full control, and the VMs keep running, and costing, when idle. On GKE, you manage Kubernetes workloads and cluster configuration, which suits many services and teams with Kubernetes skills. On Cloud Run, you manage an image and its settings, and the service can scale to zero. The pattern is consistent: more control means more work that's yours. So choose by the requirement that genuinely can't bend, and revisit the choice when requirements change. Next, a closer look at virtual machines.",
}
