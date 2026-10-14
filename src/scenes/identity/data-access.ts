import type { Scene } from '@graphlearning/flow'

// §6 — a denied object read, and why. The runtime service account can deploy and run the service
// but holds nothing that reads objects in the export bucket. The 403 body is the shape Cloud
// Storage's JSON API returns; names are illustrative. Below, roles that administer a thing versus
// what they still need before data flows.
export const identityDataAccess: Scene = {
  id: 'identity-data-access',
  title: 'Administering a resource is not reading its data',
  flow: 'TB',
  nodes: [
    {
      id: 'denied',
      kind: 'code',
      filename: 'a denied object read — orders-api',
      label: `GET /storage/v1/b/retail-exports/o/orders.csv?alt=media
Authorization: Bearer ya29.…   # short-lived token for orders-api

HTTP/1.1 403 Forbidden
"orders-api@retail-prod-7312.iam.gserviceaccount.com does not
 have storage.objects.get access to the Google Cloud Storage
 object. Permission 'storage.objects.get' denied on resource
 (or it may not exist)."`,
    },
    {
      id: 'roles',
      kind: 'table',
      label: 'What a role lets you do, and what it still needs',
      headers: ['Role', 'Lets you', 'Data still needs'],
      values: [
        ['roles/run.admin', 'deploy and manage services', 'nothing — it holds no data'],
        ['roles/storage.objectViewer', 'read objects', 'is the data permission'],
        ['roles/cloudsql.client', 'connect to an instance', 'a database user and grants'],
        ['roles/bigquery.jobUser', 'run query jobs', 'dataViewer on the dataset'],
      ],
    },
  ],
  edges: [{ source: 'denied', target: 'roles', label: 'missing: storage.objects.get' }],
}
