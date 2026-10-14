import type { Section } from '../types'

export const lakeLayoutAndContracts: Section = {
  id: 'lake-layout-and-contracts',
  title: 'Lake layout, formats and schema contracts',
  scene: 'analytics-lake',
  focus: 'contract',
  slide: `## Lake layout, formats and contracts

Captured data often lands in **Cloud Storage** first. A deliberate layout keeps it usable as it grows.

### Layout
- **raw/** keeps data as captured, never edited, so it can be reprocessed
- **curated/** is cleaned, typed and deduplicated — and can be rebuilt
- Partitioned paths such as \`dt=2026-10-12/\` let readers skip days

### Formats
- **Avro** carries its schema, good for landing rows
- **Parquet** is columnar, good for analytical reads

### Contracts
- The producer promises **fields, types, meaning** and how they may change
- Breaking a contract should fail a check, not a dashboard`,
  narration:
    "Captured data often lands in Cloud Storage before, or as well as, BigQuery. A bucket full of files becomes unusable quickly unless its layout is decided up front. Look at the layout on the left. The raw zone keeps data exactly as it was captured, and nothing ever edits it, so if a processing bug is found later, you can reprocess from raw. The curated zone holds cleaned, typed and deduplicated data, and because raw is kept, curated can always be rebuilt. Paths include the partition, dt equals the date, so a reader asking about one day can skip every other day without opening a file. File formats matter too. Avro files carry their own schema and suit landing rows as they arrive. Parquet stores data by column, so a query reading three columns out of thirty only reads those three, which makes it the better format for analysis. The last folder holds something easy to overlook: contracts. A schema contract is the producer's promise about the data. It lists the fields and their types, says what they mean, for example that total G B P is gross, before refunds, and says how they may change. Adding a field is fine; quietly changing what an existing field means is not. When a producer breaks the contract, a check in the pipeline should fail loudly, rather than a dashboard silently showing wrong numbers. Next: BigQuery itself.",
}
