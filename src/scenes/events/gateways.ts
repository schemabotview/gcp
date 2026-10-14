import type { Scene } from '@graphlearning/flow'

// §1 — the orders API offered to partners. A gateway enforces the contract before traffic reaches
// Cloud Run; the two products differ in how much API management they bring.
export const eventsGateways: Scene = {
  id: 'events-gateways',
  title: 'A contract in front of the API',
  flow: 'TB',
  nodes: [
    {
      id: 'spec',
      kind: 'code',
      filename: 'orders-api.yaml (OpenAPI, abridged)',
      label: `paths:
  /orders/{id}:
    get:
      operationId: getOrder
      security: [{ partner_key: [] }]      # callers must send an API key
      x-google-backend:
        address: https://orders-730118294456.europe-west2.run.app`,
    },
    {
      id: 'checks',
      label: 'What the gateway checks before the backend sees anything',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'route', label: 'Route', sub: 'path and method exist', icon: 'share' },
        { id: 'authn', label: 'Identify', sub: 'API key or JWT', icon: 'key' },
        { id: 'limit', label: 'Limit', sub: 'quota per caller', icon: 'gauge' },
      ],
    },
    {
      id: 'choose',
      kind: 'table',
      label: 'Choosing between them',
      headers: ['', 'API Gateway', 'Apigee'],
      values: [
        ['Best for', 'securing serverless APIs simply', 'running an API programme'],
        ['Brings', 'OpenAPI routing, keys, JWT', 'policies, products, portal, analytics'],
        ['Cost shape', 'per call, small', 'platform plus volume'],
      ],
    },
  ],
  edges: [
    { source: 'spec', target: 'checks' },
    { source: 'checks', target: 'choose' },
  ],
}
