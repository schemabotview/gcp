import type { Section } from '../types'

export const cloudRunFunctions: Section = {
  id: 'cloud-run-functions',
  title: 'Cloud Run functions, triggers and boundaries',
  scene: 'events-functions',
  focus: 'fn',
  slide: `## Cloud Run functions

A **function** is a single handler that Google builds and runs on **Cloud Run**. It can answer HTTP or react to **events**.

### The thumbnail example
- An image lands in the products bucket
- An **Eventarc trigger** matches the event and calls the function
- The handler reads the event's **data**: bucket, name, generation

### Boundaries that still apply
- A **timeout** limits each run
- No state survives between events
- The same event can arrive **twice**: make the work safe to repeat

### Identity
- It runs as **its own** service account, with only what it needs`,
  narration:
    "Some work doesn't need a whole service. When a product photo is uploaded, the storefront needs thumbnails, and that's a few lines of code that should run whenever an image arrives. Cloud Run functions is built for exactly that. You write a single handler, Google builds it into a container, and it runs on Cloud Run underneath. It can answer HTTP requests, or react to events. Here's the flow. An image is written to the products bucket, and Cloud Storage emits an object finalized event. An Eventarc trigger matches events of that type from that bucket and calls the function. The handler receives a CloudEvent, reads the bucket, the object name and its generation, ignores anything outside the products prefix, and makes the thumbnail. Because it runs on Cloud Run, everything from chapter three still applies. Each run has a timeout. Nothing in memory or on local disk survives between events. And the same event can be delivered more than once, so writing the thumbnail must be safe to repeat. Here, it's keyed by the source object's generation, so a second run produces the same result. One trap is worth naming. If the thumbnails were written back into the same prefix the trigger watches, each thumbnail would trigger another run, and the function would chase its own tail. Finally, give the function its own service account, with only what it needs. Next: the messaging service underneath many of these flows.",
}
