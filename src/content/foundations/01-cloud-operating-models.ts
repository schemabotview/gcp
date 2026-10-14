import type { Section } from '../types'

export const cloudOperatingModels: Section = {
  id: 'cloud-operating-models',
  title: 'Cloud services and shared responsibility',
  scene: 'foundations-responsibility',
  focus: 'run',
  slide: `## Cloud services and shared responsibility

A cloud service lets you **request** capacity through an API, **pay** for what you use, and **release** it when you are done. Between services, what changes is where Google's work stops and yours begins.

### The line moves
- **Compute Engine** — Google runs the hardware; you patch the OS and run the app
- **Cloud Run** — Google also runs the OS and scaling; you own the image and its config
- **BigQuery** — Google runs the engine; you own the datasets, queries and access

### It never disappears
- What the data is, and who may reach it, is **always yours**
- So are configuration choices: location, exposure, retention
- Elasticity means capacity follows demand — and **so does the bill**`,
  narration:
    "Let's start with what a cloud service actually is. You ask for capacity through an API, you pay for what you use while you use it, and you hand it back when you're done. That is the whole operating model, and everything in this course sits on top of it. On the left are three services the retail application could use. In each column the same four layers appear: the hardware, the operating system and runtime, the application, and the data. What changes is who runs each layer. With a Compute Engine virtual machine, Google runs the hardware, and the operating system is yours to patch and harden. With Cloud Run, Google also takes the operating system and the scaling, so you hand over a container image and its configuration. With BigQuery, Google runs the whole query engine, and you bring datasets and SQL. Google calls this shared responsibility, and the important word is shared. The line moves up as a service becomes more managed, but it never reaches the top. What the data is, who is allowed to reach it, and where it lives are decisions only you can make. And elasticity cuts both ways: capacity follows demand, and so does the bill. So before choosing any service, we need to know where it physically runs. That is next.",
}
