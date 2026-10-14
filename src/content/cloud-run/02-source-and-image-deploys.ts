import type { Section } from '../types'

export const sourceAndImageDeploys: Section = {
  id: 'source-and-image-deploys',
  title: 'Source-based and container-image deploys',
  scene: 'cloud-run-deploy-paths',
  focus: 'revision',
  slide: `## Source and image deploys

Cloud Run runs **container images**. You either hand it source and let it build one, or hand it an image you built.

### From source — \`--source .\`
- **Cloud Build** builds with buildpacks, or your Dockerfile if present
- The image lands in Artifact Registry, in \`cloud-run-source-deploy\`
- Quick to start; the build runs under a **build identity** you must permit

### From an image — \`--image\`
- Your own pipeline builds, tests and scans, then pushes
- Better when builds need control, caching or approval

### Either way
- The revision records the image's **digest**; a tag can move later, the revision does not`,
  narration:
    "Cloud Run doesn't run source code. It runs container images, so there's always a build step somewhere. The question is who owns it. The quickest path is a source deploy. You run gcloud run deploy with dash dash source dot, and Cloud Build builds an image for you, using buildpacks to detect a Python app, or your own Dockerfile if the folder has one. The image is stored in Artifact Registry, in a repository called cloud run source deploy, which is created for you in that Region if it doesn't exist. Note that the build runs as an identity of its own, which needs permission to build, and we'll come back to that. The other path is an image deploy. Your own pipeline builds the image, runs tests and scans, pushes it to Artifact Registry with a tag such as one point four point zero, and then you deploy that image. That's more work, but you control the build, its caching and any approval step, which is usually what production wants. Whichever path you take, look at the bottom of the scene. When the revision is created, the tag is resolved to the image's digest, a hash of its exact contents, and the revision keeps that digest. If someone later pushes a different image under the same tag, your running revision doesn't change. So what exactly is a revision?",
}
