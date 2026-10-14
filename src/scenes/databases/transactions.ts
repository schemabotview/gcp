import type { Scene } from '@graphlearning/flow'

// §3 — placing an order is one transaction across three tables; the second card is what happens when
// 30 Cloud Run instances each open 10 connections to a database configured for fewer. Values and
// limits illustrative.
export const databasesTransactions: Scene = {
  id: 'databases-transactions',
  title: 'One transaction, many connections',
  flow: 'TB',
  nodes: [
    {
      id: 'order-tx',
      kind: 'code',
      filename: 'place an order: all or nothing',
      label: `BEGIN;
UPDATE stock  SET on_hand = on_hand - 1
  WHERE sku = 'sku-1042' AND on_hand >= 1;           -- 1 row, or the order stops
INSERT INTO orders (id, customer_id, status)
  VALUES (58213, 901, 'placed');                     -- 1 row
INSERT INTO order_lines (order_id, sku, qty, price_gbp)
  VALUES (58213, 'sku-1042', 1, 39.00);              -- 1 row
COMMIT;                                              -- all three, or none`,
    },
    {
      id: 'exhaustion',
      kind: 'code',
      filename: 'Cloud Logging — orders API during a sale (abridged)',
      label: `30 instances × pool of 10 = 300 connections   # database allows fewer
psycopg.OperationalError: connection failed:
  FATAL: sorry, too many clients already
# fix: smaller pools, a pooler in front, or max instances that fit`,
    },
    {
      id: 'connect',
      label: 'How the API connects',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'connector', label: 'Connector', sub: 'Auth Proxy or library: TLS', icon: 'plug' },
        { id: 'iam-auth', label: 'IAM login', sub: 'no stored password', icon: 'key' },
        { id: 'pool', label: 'Pool', sub: 'reuse a few connections', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'order-tx', target: 'exhaustion', label: 'every request needs a connection' },
    { source: 'exhaustion', target: 'connect' },
  ],
}
