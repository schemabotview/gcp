# CLAUDE.md — gcp (Google Cloud)

> The workspace-level `CLAUDE.md` (in `graphl-workspace`) holds the invariants that span every
> repo. This file is only what is true *here*.

## What this repo is

The GraphL concept app for **Google Cloud**. One concept, 12 courses, one per chapter of
`GCP-COURSE-PLAN.md` — that file is the syllabus and the source of every section's scope, worked
illustrations and "explain why X does not imply Y" contrasts. A **section** is
`(scene, slide, narration)` and is one segment of the course video. One section = one slide.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version** (`flow@^1.2.0`, `shell@^0.8.0`). This repo's own surface is
`src/content/`, `src/scenes/`, `src/main.tsx` and `src/theme.css` — nothing else.

## Course arc and route contract

Routes are `#/<courseId>-<sectionId>`. Course ids are fixed here so routes, audio folders and
`scripts/titles.json` keys never drift:

| # | course id | chapter | sections |
| --- | --- | --- | --- |
| 1 | `foundations` | Cloud Foundations, Projects, and Resource Ownership | 6 |
| 2 | `identity` | Identity, Service Accounts, and Governance | 8 |
| 3 | `cloud-run` | A First Cloud Run Application | 6 |
| 4 | `networking` | Networking and Request Delivery | 9 |
| 5 | `compute` | Compute Choices and Elastic Capacity | 7 |
| 6 | `storage` | Storage and Data Protection | 7 |
| 7 | `databases` | Databases and Application State | 8 |
| 8 | `events` | APIs, Events, and Asynchronous Workflows | 9 |
| 9 | `analytics` | Analytical Data and Pipelines | 7 |
| 10 | `delivery` | Infrastructure and Delivery | 7 |
| 11 | `operations` | Observability, Security, and Recovery | 10 |
| 12 | `architecture` | Optimisation and Architecture Evolution | 7 |

Section ids are short kebab-case slugs of the section title (`regions-and-zones`, not `s2`).
Section files are `NN-<section-id>.ts`. Scene ids are globally unique — prefix with the course id
when a name could collide (`storage-generations`, `databases-replica-lag`).

**Recurring example:** the retail app (product page, orders, fulfilment, business summaries) starts
as one Cloud Run request→response path in course 3. VM / GKE / serverless appear as *alternatives
under stated requirements*, never accumulated into one diagram.

**Every section follows the plan's teaching method:** objective → mental model → annotated example
and expected behaviour → alternative or failure contrast → summary → bridge. Within one frame that
means: the scene carries the model or the annotated artefact; the slide carries the claim and the
contrast; the narration carries the reasoning and the bridge.

**Accuracy:** names, defaults, quotas, guarantees and prices are verified against current
docs.cloud.google.com at authoring time, with Region / scope / version stated where a claim depends
on them. The plan's "does not imply" contrasts (budget ≠ cap, ADC ≠ grant, global VPC ≠ resilience,
replication ≠ recovery…) are load-bearing — every one gets a section frame.

## Scene inventory

| course | scene id | shape |
| --- | --- | --- |
| `foundations` | `foundations-responsibility` | 3 containers × 4 layers; icon colour = who runs the layer |
| | `foundations-locations` | global / multi-region / Region ⊃ zones, nested by scope |
| | `foundations-hierarchy` | org ⊃ folders ⊃ projects ⊃ resources, nested |
| | `foundations-billing` | billing account → linked projects → hypothetical ledger table |
| | `foundations-first-call` | gcloud code card → three identifiers → full resource name |
| | `foundations-budget` | spend-vs-budget plot, labels/tags, project lifecycle (padding 0.17) |
| `identity` | `identity-principals` | six principal kinds over an authn → authz → resource band |
| | `identity-bindings` | get-iam-policy code card → role kinds → inherited policy levels |
| | `identity-evaluation` | numbered PAB / deny / allow stages → deny policy card → conditional binding card |
| | `identity-service-accounts` | three kinds → two faces → 2×2 lifecycle |
| | `identity-credentials` | ADC order, actAs vs getAccessToken, numbered 2×2 federation steps |
| | `identity-data-access` | denied-read 403 card → admin-vs-data role table |
| | `identity-org-policy` | resourceLocations YAML → Owner refused → IAM vs Org Policy |
| | `identity-role-matrix` | principal × environment table → audit evidence band |
| `cloud-run` | `cloud-run-handler` | main.py code card → runtime inputs → expected curl output |
|  | `cloud-run-deploy-paths` | two gcloud commands → source path → image path → digest-pinned revision |
|  | `cloud-run-revisions` | service ⊃ three revisions → traffic split → 2×2 runtime contract |
|  | `cloud-run-identities` | deployer / build / caller → service → runtime SA → what it reaches |
|  | `cloud-run-scaling` | capacity arithmetic card → 2×2 knobs → numbered 2×2 cold start (padding 0.17) |
|  | `cloud-run-release` | start-up failure log → staged release and rollback commands → timeout ≠ rollback |
| `networking` | `networking-cidr` | 2×2 building blocks → CIDR worked example → private ranges |
|  | `networking-vpc` | global VPC ⊃ two Regions (subnet + VM each) → address plan |
|  | `networking-routes` | route table card → private egress via Cloud NAT → what NAT is not |
|  | `networking-firewall` | firewall rule card → numbered evaluation order → stateful / not IAM |
|  | `networking-dns` | dig from two networks → resolver path → zone kinds |
|  | `networking-load-balancing` | numbered 3×2 request path → load balancer chooser table |
|  | `networking-private-access` | PGA / PSC / PSA table → where the address lives → same checks |
|  | `networking-shared-vpc` | Shared VPC host and service projects → peering chain → peering rules |
|  | `networking-hybrid` | numbered 2×2 HA VPN path → hybrid options table → availability caveats |
| `compute` | `compute-selection` | 2×2 workload questions → three-platform comparison table |
|  | `compute-instances` | annotated instances create card → 2×2 lifecycle → OS Login / IAP (padding 0.17) |
|  | `compute-migs` | template → regional MIG across zones → scaling vs healing → rolling update |
|  | `compute-capacity` | zone-exhausted error → four kinds of capacity table → design band |
|  | `compute-supply-chain` | numbered 3×2 image path → what stays yours |
|  | `compute-gke` | Deployment manifest → Autopilot vs Standard table |
|  | `compute-shutdown` | numbered 2×2 interrupted worker → idempotent insert → notice periods |
| `storage` | `storage-interfaces` | object / block / file → service table → persistence boundary |
|  | `storage-buckets` | bucket create, cp and ls card → location types → object facts |
|  | `storage-access` | numbered 2×2 signed-URL upload → signing code → bucket controls (padding 0.17) |
|  | `storage-consistency` | two-writer race → generation preconditions card → 2×2 guarantees (padding 0.17) |
|  | `storage-lifecycle` | storage class table → 2×2 deletion protections |
|  | `storage-disks` | block and file option table → deciding questions → the retail app's choices |
|  | `storage-recovery` | replicated bad change → restore-beside card → 2×2 recovery claims |
| `databases` | `databases-patterns` | data-by-access-pattern table → 2×2 questions |
|  | `databases-cloud-sql` | Google runs vs still yours (nested) → when AlloyDB |
|  | `databases-transactions` | order transaction SQL → connection exhaustion log → how the API connects |
|  | `databases-availability` | four-features table → replica-lag timeline → the app's share |
|  | `databases-firestore` | product document → composite-index query → 2×2 behaviour (padding 0.17) |
|  | `databases-spanner` | what Spanner offers → instance configs → does stock need it table |
|  | `databases-bigtable` | hot vs spread row keys → 2×2 behaviour |
|  | `databases-cache` | 2×2 stale-cache timeline → numbered 2×2 migration (padding 0.17) |
| `events` | `events-gateways` | OpenAPI spec card → gateway checks → API Gateway vs Apigee table |
|  | `events-functions` | CloudEvent handler card → upload-to-function flow → execution boundaries |
|  | `events-pubsub` | publisher → topic → 2×2 subscription kinds |
|  | `events-delivery` | numbered 2×2 delivery cycle → promises-and-limits table |
|  | `events-eventarc` | sources → trigger command card → destinations |
|  | `events-tasks` | two jobs → Pub/Sub vs Cloud Tasks table |
|  | `events-workflows` | Workflows YAML with compensation → who does what |
|  | `events-retries` | numbered 2×2 duplicate delivery → idempotent handler → dead-letter band |
|  | `events-backpressure` | backlog plot → 2×2 surge layers → where to put the limit table (padding 0.17) |
| `analytics` | `analytics-two-shapes` | operational vs analytical table → numbered 2×2 path → keep apart (padding 0.17) |
|  | `analytics-ingestion` | export vs CDC → reconciliation card → arrived ≠ correct (padding 0.17) |
|  | `analytics-lake` | lake layout card → lasting decisions → schema contract |
|  | `analytics-bigquery` | weekly revenue SQL → expected rows table |
|  | `analytics-partitioning` | partitioned table DDL → bytes-scanned comparison → pricing models |
|  | `analytics-dataflow` | Beam pipeline card → numbered 2×2 late-event timeline |
|  | `analytics-spark` | engine chooser table → 2×2 orchestrators |
| `delivery` | `delivery-terraform` | annotated main.tf → provider / resource / reference |
|  | `delivery-state` | GCS backend and module card → 2×2 what state is |
|  | `delivery-inputs` | deploying identity → inputs table → rerun test |
|  | `delivery-plan` | terraform plan with drift and replacement → guards → plan limits |
|  | `delivery-build` | cloudbuild.yaml → digest / provenance / logs → build identity |
|  | `delivery-cloud-deploy` | numbered pipeline targets → 2×2 canary → rollback limits |
|  | `delivery-promotion` | one digest across three projects table → 2×2 controlled change |
| `operations` | `operations-signals` | three signals → structured log line with trace id → retention defaults |
|  | `operations-investigation` | log query card → trace span table → numbered three moves |
|  | `operations-audit` | SetIamPolicy audit entry → audit log types table |
|  | `operations-slos` | SLO and error-budget arithmetic → 2×2 useful alerts |
|  | `operations-secrets` | numbered 2×2 broken rotation → safe order card → encryption keys |
|  | `operations-security` | controls and their limits table → VPC SC perimeter → layered controls |
|  | `operations-incident` | numbered 2×3 containment → privileged access |
|  | `operations-backups` | backup policy table → isolation → last drill record |
|  | `operations-recovery` | RTO/RPO → numbered 3×2 recovery order → failback and evidence |
|  | `operations-resilience` | 429 and backoff card → 2×2 dependency patterns → validation |

`badge:` does not render in the pinned engine (`flow@1.3.0`) — number steps in the `label` instead
(`'2 · Deny policies'`).

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting. `computeLayout` is not
  exported, so there is no way around this, and that is the point — reproducible frames.
- **Do not reimplement the shell.** `SectionView`, `CourseIndex`, `SlidePanel` and the hooks are
  withheld on purpose. The route contract (`#/<courseId>-<sectionId>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it holds only if every repo composes
  the pieces identically.
- **`SiteHeader` goes on the catalog page only** — never on a section. A section is a video frame.
- **Three stylesheets, in cascade order**, imported in `main.tsx`. The order is load-bearing:
  1. `@graphlearning/flow/styles.css` — react-flow plus the IBM Plex faces the engine is
     *calibrated* to. `codeMetrics` sizes code nodes from a measured 9.02px glyph advance, so a
     different monospace face mis-sizes every code card. Carries the `.tok-*` colours.
  2. `@graphlearning/shell/styles.css` — the shell paints the canvas (`--bg: #1a1d23`; SceneView
     draws its dots at `#2a2f38` assuming a dark surface).
  3. `./theme.css` — this repo's three brand tokens. **Last, or the brand loses to the defaults.**
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.** Local engine work only; CI has
  no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.

## Layout rules the frames actually care about

`npm run check` (`scripts/check-content.mjs`) models four silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Leaf cards are a fixed 210×96** with a ~134px text column. Only containers grow to fit. Keep the
  `label` to 2 wrapped lines; 2 label lines + 2 sub lines fits. Watch unbreakable tokens — `_`, `.`
  and `/` are **not** break opportunities in CSS, so `snake_case` and paths overflow sideways in a
  way the height model cannot see.
- **Slides do not scale to fit.** Type size is fixed by the frame (`zoom = paneWidth / 806`,
  width-proportional only), so an over-long slide **clips at the bottom** with no error.
  `check` fails over 1000 modelled design px; the band below gives the floor too. Bullets cost far
  more than prose of the same length.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** The engine's lucide registry is `Record<string, LucideIcon>`
  and does not enumerate its keys, so a wrong name type-checks, passes `check`, builds, and renders
  a card with no glyph. There are ~75 valid keys; copy one off an existing scene rather than
  guessing a lucide name (`volume`, `move`, `maximize` and `git` are all absent, for instance).
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card, or whether the frame is too
empty. Look at the route.

### Density targets — the frame must use the space it has

The guarded failure is a slide that overflows. The unguarded one is its opposite: a frame that
builds green, reads correctly, and leaves half its pane empty. Against the ~1080 design px pane:

| | target | why |
| --- | --- | --- |
| slide height | **80–95 %** of the pane (≈ 865–1025px; `SLIDE_H_MAX` caps the top at 1000) | below 80 % the right half looks empty; above ~95 % it risks clipping |
| scene, binding axis | ≥ 0.85 of the pane | the board should reach the edge it is limited by |
| scene, area | ≥ 0.55 of the pane (w × h) | a wide board that fills the width but a third of the height wastes the pane |
| eyebrow | no node under the top-left eyebrow label | boards that bind on height run up to y≈30 |

Levers: **add real content, not padding**; **restack** a board toward the pane's ~1:1 aspect; lower
scene `padding` to 0.04 for boards that float, **raise** it (0.12–0.17) for tall boards that touch
the eyebrow.

These are read off the rendered route by eye — `check` models no density at all. The two ratios come
from one repo's ~80 frames of diagram-and-code-card boards, so a deliberately sparse board can sit
under them. Targets, not thresholds.

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check
```

All three are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, slides and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
