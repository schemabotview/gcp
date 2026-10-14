import type { Section } from '../types'

export const artifactRegistry: Section = {
  id: 'artifact-registry',
  title: 'Artifact Registry and supply-chain responsibilities',
  scene: 'compute-supply-chain',
  focus: 'admit',
  slide: `## Artifact Registry and the supply chain

Every container you run came from somewhere. **Artifact Registry** stores images; the steps around it decide whether you can trust them.

### The path
- Build from a **pinned** base image; push and deploy by **digest**
- **Artifact Analysis** scans images for known vulnerabilities
- An **attestation** records that a check passed, signed by its owner
- **Binary Authorization** can refuse images without required attestations

### Still yours
- A scan **reports** vulnerabilities; rebuilding fixes them
- Base images and dependencies need **regular** rebuilds
- Grant **pull** access per repository, to runtime identities only`,
  narration:
    "Cloud Run, GKE and many VM setups all run container images, so it's worth tracing where an image comes from. The build starts from a base image, which should be pinned, so the same build gives the same result. The image is pushed to Artifact Registry, and from then on it's referred to by its digest, the hash of its exact contents. Artifact Analysis can scan images in the registry and report known vulnerabilities in their operating system packages and language libraries. When the build's checks pass, the pipeline can create an attestation: a signed statement that this digest passed tests and scanning. Binary Authorization can then be set to admit only images carrying the attestations you require, so a hand-built image pushed from someone's laptop simply won't run on GKE or Cloud Run. Now the responsibilities, which are easy to misread. A scan reports; it doesn't patch. Fixing a vulnerable package means rebuilding with an updated base image or dependency, then redeploying. Managed platforms run your image as you built it, so its contents remain your responsibility, even on Cloud Run. Base images and dependencies need regular rebuilds, not just when something breaks. And access to the registry is ordinary IAM: grant read access per repository, to the runtime identities that pull from it, rather than to everyone in the project. Next: Kubernetes, in two modes.",
}
