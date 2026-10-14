import type { Scene } from '@graphlearning/flow'

// §2 — modules for reuse, and state: Terraform's record of which real resource each block owns. State
// lives in a locked, versioned bucket in a separate project, readable by very few identities.
export const deliveryState: Scene = {
  id: 'delivery-state',
  title: 'Modules, and the state that ties code to reality',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'backend',
      kind: 'code',
      filename: 'envs/prod/backend.tf and main.tf',
      label: `terraform {
  backend "gcs" {
    bucket = "retail-tfstate-ops-5521"   # separate project; versioning on
    prefix = "prod/storefront"           # one state per environment and stack
  }
}

module "storefront" {
  source     = "../../modules/cloud-run-service"
  project_id = "retail-prod-7312"
  image      = var.image
}`,
    },
    {
      id: 'state-facts',
      label: 'What state is',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'mapping', label: 'A mapping', sub: 'block ↔ real resource id', icon: 'link' },
        { id: 'lock', label: 'Locked', sub: 'one apply at a time', icon: 'lock' },
        { id: 'sensitive', label: 'Sensitive', sub: 'can hold secrets in plain text', icon: 'key' },
        { id: 'owned', label: 'Owned', sub: 'one stack owns each resource', icon: 'usercheck' },
      ],
    },
  ],
  edges: [{ source: 'backend', target: 'state-facts' }],
}
