import type { Section } from '../types'

export const firestore: Section = {
  id: 'firestore',
  title: 'Firestore documents, indexes and transactions',
  scene: 'databases-firestore',
  focus: 'query',
  slide: `## Firestore: documents and indexes

**Firestore** stores JSON-like **documents** in **collections**. The catalogue suits it: each product is read whole, by id, and fields vary by category.

### Indexes
- Every field gets a **single-field** index automatically
- Filtering on one field and sorting by another needs a **composite** index
- The error names the index; declare it in config and deploy it

### Transactions and shape
- **Transactions** read then write documents atomically
- There are **no joins**: shape documents for the reads you make
- Native mode and **Datastore mode** behave differently; examples here are Native

### Not a relational database
- Do not move orders here to avoid writing SQL`,
  narration:
    "Firestore stores documents, which look like JSON objects, grouped into collections. The product catalogue fits it well. Each product is a document such as products slash sku one zero four two. It's read whole and almost always by its id, and its fields vary: shirts have sizes, but gift cards don't. Every field gets a single-field index automatically, so simple queries just work. Now look at the second card. The storefront asks for shirts, ordered by price. That filters on one field and sorts by another, which needs a composite index, and Firestore refuses the query until one exists. The error even includes a link to create it. In a real project, declare composite indexes in configuration and deploy them with the code, so the next environment doesn't fail the same way. Firestore has transactions too. Inside one, you read documents and then write them, and the whole thing commits atomically or retries. What it doesn't have is joins. If a page needs a product and its category's banner, either read two documents or copy the banner into the product. Shape documents for the reads you make. Two cautions. Firestore runs in Native mode or Datastore mode, and they differ in features and behaviour, so check which one you're reading about. And don't move the orders here just to avoid SQL. Next: when even PostgreSQL isn't enough.",
}
