import type { Section } from '../types'

export const transactionsAndConnections: Section = {
  id: 'transactions-and-connections',
  title: 'Transactions, connection pools and connectors',
  scene: 'databases-transactions',
  focus: 'exhaustion',
  slide: `## Transactions and connections

Placing an order changes **three** tables. Inside one transaction, either all three changes happen or none do.

### The order transaction
- Stock is decremented **only if** some is on hand
- Order and line are inserted, then **COMMIT**
- Any failure before COMMIT leaves **nothing** behind

### Connections run out first
- Each instance's pool × instance count = **connections** the database sees
- 30 instances × 10 = 300, beyond what the instance allows
- Fix with smaller pools, a **pooler**, or max instances that fit

### Connecting safely
- Cloud SQL **connectors** handle TLS; **IAM login** removes stored passwords`,
  narration:
    "Here's the heart of the orders service. Placing an order changes three tables: it reduces stock, inserts the order, and inserts its line. Wrapped in BEGIN and COMMIT, those three statements form one transaction. The stock update only matches a row if at least one item is on hand, so if the shirt sold out a moment ago, zero rows change and the service stops before inserting anything. If anything fails before COMMIT, PostgreSQL discards all of it, and no half-placed order ever exists. That's the guarantee that made us choose a relational database. Now the failure that usually arrives first in production, and it isn't the database running out of CPU. It's connections. Remember the arithmetic from Cloud Run. During a sale, thirty instances each open a pool of ten connections. That's three hundred, more than this instance is configured to accept, and PostgreSQL replies: sorry, too many clients already. Requests fail even though the database is barely busy. The fixes are smaller pools per instance, a connection pooler in front of the database, or a maximum instance count that fits what the database can take. And connect safely. Cloud SQL's connectors, the Auth Proxy or a language library, handle encryption and authorisation, and IAM database authentication lets the service sign in as its own service account, with no password stored anywhere. Next: keeping the database available.",
}
