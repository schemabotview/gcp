import type { Section } from '../types'

export const cloudBuildAndProvenance: Section = {
  id: 'cloud-build-and-provenance',
  title: 'Cloud Build, Artifact Registry and provenance',
  scene: 'delivery-build',
  focus: 'provenance',
  slide: `## Cloud Build and provenance

The build turns a commit into an **image**. Its output should say exactly what was built, from what, and by whom.

### The build
- **Test** first; build the image only if tests pass
- Push to **Artifact Registry**, tagged with the commit
- Run as a dedicated **build service account**

### What comes out
- An image **digest**: the one identifier later stages use
- **Provenance**: commit, builder and steps, signed
- **Logs** kept with the build

### The build identity
- May push to **one** repository
- May **not** deploy: building and releasing are separate powers`,
  narration:
    "Infrastructure is half of delivery. The other half is the application, and it starts with a build that turns one commit into one image. The Cloud Build configuration on the left has two steps. The first installs dependencies and runs the tests, so a failing test stops everything before an image exists. The second builds the container image and tags it with the short commit hash. The image is pushed to Artifact Registry, and Cloud Build records the resulting digest. Three outputs matter. The digest is the one identifier every later stage uses: the deploy, the canary, the rollback, all refer to sha two five six nine c zero seven, never to a tag that could move. Provenance is a signed record of how the image was made: which source commit, which builder, which steps. With provenance, you can answer, months later, exactly what code is running in production, and policies like Binary Authorization from chapter five can require it. And the build logs are kept with the build, for when something needs explaining. Finally, the build's own identity. It runs as a dedicated service account in a CI project, which can push to one repository and do nothing else. In particular, it can't deploy. Keeping build and release as separate powers means that compromising the build doesn't hand someone production. Next: releasing that image, carefully.",
}
