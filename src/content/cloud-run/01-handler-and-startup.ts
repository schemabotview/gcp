import type { Section } from '../types'

export const handlerAndStartup: Section = {
  id: 'handler-and-startup',
  title: 'HTTP handlers, start-up and configuration',
  scene: 'cloud-run-handler',
  focus: 'main',
  slide: `## Handlers, start-up and configuration

The storefront's first job: answer \`GET /products/<sku>\` with JSON. One small Python service, and the retail app's request path begins.

### Two moments in the code
- **Start-up** — runs once per instance: imports, configuration, clients
- **Handler** — runs once per request: read input, return a response
- Slow or failing start-up delays or breaks **every** request behind it

### What comes from outside
- \`PORT\` — set by Cloud Run; the server must listen on it
- **Environment variables** — your configuration, set per revision
- **Dependencies** — pinned in \`requirements.txt\` and built into the image
- **Secrets** come from Secret Manager at runtime, never from the image`,
  narration:
    "The retail application starts with a single job: when someone opens a product page, return that product as JSON. Here's the whole service. It's a small Flask application with one route, slash products slash a sku. Notice there are two moments in this file. The top runs once, when an instance starts up: the imports, creating the app, and reading configuration from the environment. The handler runs once for every request: it looks up the product and returns either the details or a not-found error. That split matters, because anything slow or fragile at start-up delays every request waiting behind it, and anything that fails there stops the instance from serving at all. Next, look at what the code takes from outside. Cloud Run tells the container which port to listen on through the PORT variable, which is 8080 by default, and the production entrypoint binds to it. The bucket name comes from an environment variable that you set on the service, so the same code can run in development and production with different settings. Secrets, such as an API key, should come from Secret Manager when the revision starts, never baked into the image. And dependencies are listed in requirements dot txt and baked into the image when it's built. The bottom card shows the expected behaviour: a known sku returns its name and price, and an unknown one returns a 404 with a short error body. Now we need to turn this folder into something Cloud Run can run.",
}
