import type { Scene } from '@graphlearning/flow'

// §1 — the storefront's first endpoint. The handler reads its configuration from the environment and
// listens on the port Cloud Run gives it; the second card is the request and the response it should
// produce. URL follows the deterministic <service>-<project-number>.<region>.run.app form.
export const cloudRunHandler: Scene = {
  id: 'cloud-run-handler',
  title: 'One endpoint, one response',
  flow: 'TB',
  nodes: [
    {
      id: 'main',
      kind: 'code',
      filename: 'main.py',
      label: `import os
from flask import Flask, jsonify

app = Flask(__name__)                      # runs once, at instance start-up
BUCKET = os.environ["CATALOGUE_BUCKET"]     # configuration, not code
PRODUCTS = {"sku-1042": {"name": "Linen shirt", "price_gbp": 39.00}}

@app.get("/products/<sku>")                # runs once per request
def product(sku):
    item = PRODUCTS.get(sku)
    if item is None:
        return jsonify(error="not found"), 404
    return jsonify(sku=sku, **item)

# production entrypoint:  gunicorn --bind 0.0.0.0:$PORT main:app`,
    },
    {
      id: 'inputs',
      label: 'What the code receives from outside',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'port', label: 'PORT', sub: 'set by Cloud Run; 8080 by default', icon: 'plug' },
        { id: 'env', label: 'Env variables', sub: 'set by you, per revision', icon: 'gears' },
        { id: 'deps', label: 'Dependencies', sub: 'requirements.txt, baked in', icon: 'package' },
      ],
    },
    {
      id: 'response',
      kind: 'code',
      filename: 'expected behaviour',
      label: `$ curl https://storefront-730118294456.europe-west2.run.app/products/sku-1042
{"name": "Linen shirt", "price_gbp": 39.0, "sku": "sku-1042"}

$ curl …/products/sku-9999
{"error": "not found"}                     # HTTP 404`,
    },
  ],
  edges: [
    { source: 'main', target: 'inputs', label: 'reads at start-up' },
    { source: 'inputs', target: 'response', label: 'GET /products/sku-1042' },
  ],
}
