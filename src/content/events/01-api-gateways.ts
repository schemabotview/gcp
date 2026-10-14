import type { Section } from '../types'

export const apiGateways: Section = {
  id: 'api-gateways',
  title: 'API Gateway and Apigee',
  scene: 'events-gateways',
  focus: 'checks',
  slide: `## API Gateway and Apigee

Partners now want to read order status. A **gateway** stands in front of the orders API and enforces a **contract** before the backend sees a request.

### What a gateway checks
- The path and method exist in the **OpenAPI** spec
- The caller is **identified**: an API key or a signed token
- The caller is within its **quota**

### Choosing
- **API Gateway** — a simple managed gateway for serverless backends
- **Apigee** — full API management: policies, products, portal, analytics
- Choose by whether you run **an API** or an **API programme**

### Still the backend's job
- Authorising **this caller** for **this order**`,
  narration:
    "So far, the storefront and orders API have served the retail company's own pages. Now partners, such as a marketplace that resells the shirts, want to check order status from their systems. That's the moment to put a gateway in front of the API. A gateway enforces a contract before any request reaches the backend. The contract here is an OpenAPI document: it lists the paths and methods that exist, says callers must present an API key, and names the Cloud Run backend. The gateway rejects unknown paths, identifies the caller from its key or a signed token, and applies a quota per caller, so one noisy partner can't exhaust the service for everyone. Google Cloud offers two gateways, and the choice is about scope. API Gateway is a simple managed gateway, designed for serverless backends like Cloud Run. You give it a spec, and it routes, authenticates and limits. Apigee is a full API management platform. It adds a policy engine for transforming and protecting traffic, API products that bundle endpoints for different partners, a developer portal, and detailed analytics. If you're publishing one API to a few partners, API Gateway fits. If you're running an API programme, with many products, partners and policies, Apigee does. One thing stays with the backend either way: deciding whether this particular partner may see this particular order. Next: small pieces of code that react to events.",
}
