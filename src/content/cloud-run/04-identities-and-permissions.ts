import type { Section } from '../types'

export const identitiesAndPermissions: Section = {
  id: 'identities-and-permissions',
  title: 'Invoker, deployer and runtime identities',
  scene: 'cloud-run-identities',
  focus: 'runtime',
  slide: `## Invoker, deployer and runtime identities

Four different identities touch one service. Each needs **different** permissions, and mixing them up is the most common access error.

### Acting on the service
- **Deployer** — creates revisions: Cloud Run Developer, plus **actAs** on the runtime account
- **Build identity** — source deploys only: permission to build
- **Caller** — needs Cloud Run Invoker, unless the service is made **public**

### The code's own identity
- The **runtime service account** is what the code runs as
- Give each service its **own** account, not the default one
- Its roles decide what the code can reach — nothing else does
- When a call is refused, first ask **which identity** was acting`,
  narration:
    "Chapter two separated principals, roles and service accounts. Cloud Run is where that pays off, because four identities touch one service. First, the deployer, the person or pipeline creating revisions. They need Cloud Run Developer, and because each revision runs as a service account, they also need permission to act as that account. Without it, the deploy fails even though they can manage the service. Second, for source deploys, the build identity. Cloud Build runs as a service account, the Compute Engine default unless you choose another, and it needs permission to build and push the image. Third, the caller. By default, a Cloud Run service requires the caller to hold Cloud Run Invoker. A public storefront has to be opened deliberately, either by turning off the invoker check, which Google recommends, or by granting the invoker role to all users. Fourth, and most important, is the runtime identity: the service account the code runs as. That's the identity Application Default Credentials finds inside the container, and its roles are the only thing deciding what the code can reach. Here, storefront S A can read objects in one bucket and connect to Cloud SQL, and nothing else. Give each service its own runtime account rather than a broad default. When something is refused, first ask which of the four identities was acting. Next: what happens under load.",
}
