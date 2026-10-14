import type { Section } from '../types'

export const bigqueryBasics: Section = {
  id: 'bigquery-basics',
  title: 'BigQuery projects, datasets, tables and SQL',
  scene: 'analytics-bigquery',
  focus: 'query',
  slide: `## BigQuery: datasets, tables and SQL

**BigQuery** is a serverless warehouse: you write SQL, and it runs the query across many machines without servers to manage.

### Where things live
- **Project** — who pays for queries and storage
- **Dataset** — a group of tables with a **location** and access policy
- **Table** — columns and rows; queried by its full name

### Running a query
- Each query runs as a **job**, in the dataset's location
- The caller needs permission to **run jobs** and to **read the data**
- Check expected rows against a known total before trusting a new query

### Cross-location
- Data in different locations cannot simply be **joined**: plan where it lives`,
  narration:
    "BigQuery is Google Cloud's serverless data warehouse. You write SQL, and it spreads the work across many machines, without you managing any servers. Things live in three levels. A project is who pays for queries and storage. A dataset groups tables, and it has a location, such as the E U or a single Region, and its own access policy. A table has columns and rows, and is named in full as project dot dataset dot table, as in the query on the left. That query answers the business's question: revenue by category, by week, for two weeks, excluding cancelled orders. It joins orders to their lines and their products, groups by week and category, and orders the result. Below it are the rows you'd expect, so that when the query is first run, you can check them against a figure finance already trusts. Each query runs as a job, in the location of the datasets it reads. And chapter two's lesson applies here too. Running a query needs two kinds of permission: permission to run jobs in a project, and permission to read the dataset's data. One without the other fails. Location has a consequence worth planning early. Data in different locations can't simply be joined in one query; you'd have to copy it first. So decide where the sales datasets live before many teams depend on them. Next: making these queries cheaper.",
}
