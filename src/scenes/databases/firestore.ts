import type { Scene } from '@graphlearning/flow'

// §5 — the product catalogue as Firestore documents. Single-field indexes are automatic; a query that
// filters on one field and orders by another needs a composite index, and says so. Native mode.
export const databasesFirestore: Scene = {
  id: 'databases-firestore',
  title: 'Documents, collections and indexes',
  flow: 'TB',
  padding: 0.17,
  nodes: [
    {
      id: 'doc',
      kind: 'code',
      filename: 'products/sku-1042',
      label: `{
  "name": "Linen shirt",
  "price_gbp": 39.0,
  "category": "shirts",
  "sizes": ["S", "M", "L"],
  "stock_hint": "in_stock",
  "updated": "2026-10-12T09:30:00Z"
}`,
    },
    {
      id: 'query',
      kind: 'code',
      filename: 'a query that needs a composite index',
      label: `db.collection("products")
  .where("category", "==", "shirts")
  .order_by("price_gbp")                     # filter one field, sort another
# FailedPrecondition: The query requires an index.  (link to create it)`,
    },
    {
      id: 'model',
      label: 'How Firestore behaves (Native mode)',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'auto-idx', label: 'Single-field indexes', sub: 'created automatically', icon: 'sortarrows' },
        { id: 'composite', label: 'Composite indexes', sub: 'you declare and deploy them', icon: 'table' },
        { id: 'tx', label: 'Transactions', sub: 'read, then write, atomically', icon: 'link' },
        { id: 'no-join', label: 'No joins', sub: 'shape documents for reads', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'doc', target: 'query', label: 'stored in products/' },
    { source: 'query', target: 'model' },
  ],
}
