import type { Section } from '../types'

export const deploymentIdentitiesAndInputs: Section = {
  id: 'deployment-identities-and-inputs',
  title: 'Deployment identities, configuration and secrets',
  scene: 'delivery-inputs',
  focus: 'inputs',
  slide: `## Deployment identities and inputs

A deployment is only as trustworthy as **who** ran it and **what** it was given. Make both explicit.

### Who deploys
- The **pipeline**, signing in by workload identity federation — no key files
- It impersonates a deployer account scoped to **one** environment
- People **review and approve**; they do not apply to production by hand

### What it is given
- Environment settings from **versioned** files in the repository
- Secrets **referenced** from Secret Manager, never written in config
- An image **digest**, and provider versions from a committed **lock file**

### The test
- Could you rerun last month's deploy and get the same result?`,
  narration:
    "Before looking at what a deployment changes, look at who runs it and what it's given, because a deployment is only as trustworthy as those two things. Start with identity, which brings chapter two back. The pipeline signs in through workload identity federation, so no service account key exists anywhere. It then impersonates a deployer account scoped to one environment. The production deployer can change production and nothing else, and the development pipeline can't reach it at all. People still matter, but their role is to review and approve. Nobody runs apply against production from a laptop. Now the inputs. Environment settings, such as instance counts and database names, live in versioned files in the repository, so a change to them is reviewed like code. Secrets are never written into configuration or variable files. Terraform references them from Secret Manager by name, and the running service reads them at start-up. The image is given as a digest from the build, never a tag that might have moved. And provider versions come from a lock file that's committed with the code, so the same plugins run every time. The test for all of this is simple. Could you rerun last month's production deploy, from its commit, and get the same result? If any input was typed at a prompt or fetched as latest, the answer is no. Next: reading what a change will actually do.",
}
