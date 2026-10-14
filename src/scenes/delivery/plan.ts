import type { Scene } from '@graphlearning/flow'

// §4 — reading a plan before approving it. One line is harmless, one is surprising, and one would
// destroy the orders database if a guard were not in the way. Output abridged and illustrative.
export const deliveryPlan: Scene = {
  id: 'delivery-plan',
  title: 'Read the plan, especially the replacements',
  flow: 'TB',
  stretch: true,
  nodes: [
    {
      id: 'plan-output',
      kind: 'code',
      filename: 'terraform plan (abridged)',
      label: `  ~ google_cloud_run_v2_service.storefront     update in-place
      ~ template.containers[0].image = "…@sha256:4be1…" -> "…@sha256:9c07…"

  ~ google_storage_bucket.exports               update in-place
      ~ labels = { team = "data" } -> {}       # drift: someone edited it by hand

-/+ google_sql_database_instance.orders         must be replaced
      ~ region = "europe-west2" -> "europe-west1"   # forces replacement

Plan: 1 to add, 2 to change, 1 to destroy.`,
    },
    {
      id: 'guards',
      label: 'Guards on stateful resources',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'deletion', label: 'Deletion protection', sub: 'the instance refuses deletion', icon: 'lock' },
        { id: 'prevent', label: 'Lifecycle rule', sub: 'prevent_destroy: plan refuses', icon: 'ban' },
        { id: 'review', label: 'Human review', sub: 'any -/+ on data stops the line', icon: 'users' },
      ],
    },
    {
      id: 'limits',
      label: 'What a plan cannot tell you',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'apply-fails', label: 'Apply success', sub: 'quota, org policy, API errors', icon: 'zap' },
        { id: 'app-effect', label: 'What the app does', sub: 'a valid change can still break it', icon: 'boxes' },
      ],
    },
  ],
  edges: [
    { source: 'plan-output', target: 'guards', label: 'line 3 must never apply' },
    { source: 'guards', target: 'limits' },
  ],
}
