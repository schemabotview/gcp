import type { Scene } from '@graphlearning/flow'

// §1 — the storefront's Cloud Run service as Terraform: a pinned provider, the API it needs, and the
// service itself. References between resources are what give Terraform its ordering.
export const deliveryTerraform: Scene = {
  id: 'delivery-terraform',
  title: 'Infrastructure written down',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'storefront/main.tf (abridged)',
      label: `terraform {
  required_providers {
    google = { source = "hashicorp/google", version = "~> 6.0" }   # pinned
  }
}

resource "google_project_service" "run" {                         # enable the API
  project = var.project_id
  service = "run.googleapis.com"
}

resource "google_cloud_run_v2_service" "storefront" {
  name     = "storefront"
  location = "europe-west2"
  template {
    service_account = google_service_account.storefront.email     # a reference
    containers { image = var.image }                               # digest, from CI
  }
  depends_on = [google_project_service.run]
}`,
    },
    {
      id: 'ideas',
      label: 'Three ideas in that file',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'provider', label: 'Provider', sub: 'talks to Google APIs; pin it', icon: 'plug' },
        { id: 'resource', label: 'Resource', sub: 'one real thing Terraform owns', icon: 'box' },
        { id: 'reference', label: 'References', sub: 'decide the order of changes', icon: 'link' },
      ],
    },
  ],
  edges: [{ source: 'config', target: 'ideas' }],
}
