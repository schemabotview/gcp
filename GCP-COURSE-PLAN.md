# Google Cloud (GCP) — From Cloud Foundations to Advanced Application and Operations

## Audience and prerequisites

For learners new to Google Cloud who understand basic files, processes, and applications. Introduce HTTP, IP addressing, DNS, identity, and cloud vocabulary locally. Reading simple Python, SQL, and JSON/YAML is helpful; explain example syntax. AWS, Azure, advanced networking, and Kubernetes experience are not prerequisites.

Scope: a representative application's lifecycle, from projects and safe access through execution, data, integration, delivery, operations, and architectural evolution. This course is independent of certifications. Combine explanations with annotated commands, policies, code, queries, Terraform, diagrams, calculations, and failure traces. No paid account, submitted exercises, or monitored assessments are required; following examples is optional.

Reference surface: official Google Cloud documentation researched on **2026-10-12**. No single platform version applies. Identify Region/location, resource scope, runtime, API/provider version, edition, and feature eligibility for detailed examples. Recheck availability, retirements, quotas, and prices when lessons are authored. Core material does not depend on previews.

Target: understand how to construct and explain representative Google Cloud workloads, trace requests and data, and justify implementation and operational decisions. Completion does not establish assessed production competence.

Structure: **12 chapters**, with **6, 8, 6, 9, 7, 7, 8, 9, 7, 7, 10, and 7 sections**. Counts follow conceptual weight rather than quotas or equal teaching duration.

## Learning spine

Understand projects and responsibility → establish identities and governance → follow a small Cloud Run application → trace network paths and execution alternatives → persist state → connect events and workflows → derive analytical views → reproduce delivery → observe and recover → optimise and justify architecture.

Recurring example: a retail application serves product information, accepts orders, stores transactions, triggers fulfilment, and produces business summaries. Begin with a small Cloud Run request-to-response path. Compare VM, GKE, and managed serverless designs as alternatives under explicit requirements; do not accumulate every service into one architecture.

Teaching method: objective → mental model → annotated example and expected behaviour → alternative or failure contrast → explanation summary → bridge. Introduce permissions, logs, costs, and failure boundaries with first use, then deepen them. Revisit Google Cloud Well-Architected questions throughout the course.

## Chapter 1 — Cloud Foundations, Projects, and Resource Ownership

Objective: Locate a workload within organisational, billing, deployment, and failure boundaries.

1. Cloud services, shared responsibility, elasticity, and operating models
2. Regions, zones, global resources, and service-specific failure boundaries
3. Organisations, folders, projects, and resource ownership
4. Cloud Billing accounts, project linkage, and responsibility for charges
5. Enabled APIs, resource names, gcloud, Cloud Shell, and an annotated first call
6. Budgets, tags versus labels, resource lifecycle, and cleanup

Worked illustrations: An organisation/folder/project tree; a product-page request diagram; an annotated gcloud call and resource name; a hypothetical cost ledger. Explain why project scope does not automatically establish network isolation or availability, and why a budget notification does not cap spending. Distinguish project ID, project number, and display name.

Outcome: Locate application resources, explain who manages and pays for them, and interpret a basic API call and resource lifecycle.

Bridge: Ownership needs explicit access rules; next we establish human and workload identities.

## Chapter 2 — Identity, Service Accounts, and Governance

Objective: Explain how identities receive permissions and how governance constrains resource use.

1. Principals, authentication, Cloud Identity, and federated access
2. IAM roles, policy bindings, resource scope, and inheritance
3. Conditions, deny policies, and effective-access boundaries
4. Service accounts, service agents, and distinct lifecycle responsibilities
5. Impersonation, Application Default Credentials, and workload identity federation
6. Resource administration versus data access and service-specific permissions
7. Organization Policy constraints and configuration governance
8. Project separation, least privilege, and audit ownership

Worked illustrations: An IAM policy fragment and role matrix; a workload obtaining short-lived credentials; a denied object read; a service-account impersonation sequence. Separate permission to act as or impersonate an identity from the permissions held by that identity. Explain ADC as credential discovery rather than a permission grant. Prefer keyless patterns where supported and distinguish Organization Policy constraints from IAM access grants.

Outcome: Interpret an identity-to-resource access path and explain a permitted or denied operation using policy scope, credential source, and service assumptions.

Bridge: With identities established, next we follow a concrete managed application.

## Chapter 3 — A First Cloud Run Application

Objective: Explain a small application from source or image through request handling and release changes.

1. HTTP handlers, application startup, dependencies, and runtime configuration
2. Source-based and container-image deployment paths
3. Services, revisions, environment configuration, and runtime contract
4. Invoker access, deployer permissions, and runtime service identity
5. Concurrency, scaling, cold starts, and downstream-capacity implications
6. Logs, health evidence, traffic splitting, and revision rollback

Worked illustrations: An annotated Python endpoint and response; a deployment command; a revision/configuration sketch; startup and dependency-error logs; a staged traffic shift. Scope the core example to a Cloud Run service. Explain the listening-port contract, ephemeral local state, and why a timeout does not prove no side effect occurred. Distinguish source-build identity from deployer, caller, and runtime identity. Label billing/scaling choices before discussing background work.

Outcome: Explain where code runs, how identities and configuration reach it, and what evidence distinguishes deployment, invocation, and dependency failures.

Bridge: An endpoint does not explain the whole request path; next we trace networking and service access.

## Chapter 4 — Networking and Request Delivery

Objective: Trace requests across Google Cloud networking and distinguish reachability from authorisation.

1. IP addresses, CIDR ranges, ports, protocols, and subnet foundations
2. Global VPC networks, regional subnets, and address planning
3. Routes, internet egress, Cloud NAT, and outbound dependencies
4. Firewall policies/rules, targets, priorities, and connection state
5. Cloud DNS, private zones, and resolution paths
6. TLS, certificates, and load-balancer selection by scope and protocol
7. Private Google Access, Private Service Connect, and managed-service access
8. Shared VPC, peering, ownership, and connectivity boundaries
9. VPN, Cloud Interconnect, Cloud Router, and hybrid-network choices

Worked illustrations: Browser → DNS → load balancer → application → database diagram; a CIDR calculation; annotated firewall and route decisions; private-name resolution failure. Explain that global VPC scope does not make an application globally resilient. Separate Cloud Run egress configuration from inbound access controls, and network reachability from caller permission. Compare private-access mechanisms by their actual purpose rather than treating them as interchangeable.

Outcome: Trace a request and return path, compare network choices, and identify whether a failure concerns DNS, routing, filtering, TLS, or authorisation.

Bridge: The network path is clear; next we compare alternative execution environments and capacity responsibilities.

## Chapter 5 — Compute Choices and Elastic Capacity

Objective: Choose compute from workload requirements and explain scaling, replacement, and operational effort.

1. Workload shape, control, portability, latency, and compute selection
2. Compute Engine instances, images, disks, lifecycle, and managed access
3. Instance templates, managed instance groups, autoscaling, and autohealing
4. Capacity, reservations, Spot interruption, and allocation boundaries
5. Artifact Registry, container images, and supply-chain responsibilities
6. GKE Autopilot versus Standard and the Kubernetes administration boundary
7. Statelessness, scaling signals, graceful shutdown, and dependency capacity

Worked illustrations: A VM configuration and instance-template sketch; traffic-to-capacity and replacement timelines; a container deployment diagram; a worker interrupted after writing data. Compare Compute Engine, GKE, and Cloud Run for the same API. Explain that managed orchestration still leaves application and configuration responsibilities, and distinguish scaling from health replacement.

Outcome: Justify a provisional compute model, interpret its deployment artefacts, and explain the consequences of scaling or replacement for application state and dependencies.

Bridge: Replaceable execution needs deliberate persistence; next we choose storage and protection mechanisms.

## Chapter 6 — Storage and Data Protection

Objective: Explain storage interfaces and distinguish consistency, redundancy, retention, and recovery.

1. Object, block, and file storage and persistence boundaries
2. Cloud Storage buckets, objects, locations, and access paths
3. IAM, uniform bucket-level access, signed URLs, and access boundaries
4. Consistency, generations, preconditions, and concurrent updates
5. Storage classes, lifecycle, versioning, soft delete, and retention controls
6. Persistent Disk, Hyperdisk, and Filestore selection
7. Replication, snapshots, backups, and restore validation

Worked illustrations: An annotated upload and signed-access flow; two writers with generation preconditions; a deletion/version timeline; a disk snapshot restore; a location/class comparison. Explain strong object read/list consistency without extending it to every access-control change or cached public response. Distinguish atomic object operations from transactions across objects. Label feature compatibility and explain why redundant storage does not establish recoverability after unwanted changes.

Outcome: Explain a storage operation and its access conditions, justify a storage/protection choice, and identify evidence needed to support a recovery claim.

Bridge: Storage preserves bytes and objects; next we organise transactional and queryable application state.

## Chapter 7 — Databases and Application State

Objective: Match data models and correctness requirements to database and caching choices.

1. Access patterns, transactions, latency, scale, and data ownership
2. Cloud SQL and AlloyDB for PostgreSQL: selection and managed responsibilities
3. Transactions, connection pools, connectors, and authentication boundaries
4. Availability, replicas, backups, maintenance, and restore distinctions
5. Firestore documents, indexes, transactions, and mode-specific behaviour
6. Spanner selection, distributed transactions, and deployment trade-offs
7. Bigtable row-key design, throughput, and specialist selection boundaries
8. Memorystore, cache invalidation, and migration/cutover choices

Worked illustrations: SQL for an order transaction and expected rows; a connection-exhaustion trace; replica lag; Firestore document/index sketches; a hot row-key example; a stale-cache timeline. Use Cloud SQL for PostgreSQL and Firestore Native mode as concrete references. Do not generalise transaction or access semantics across database APIs, engines, editions, or client types. Introduce Spanner and Bigtable through requirements-driven contrasts rather than imply that every growing database should migrate to them.

Outcome: Explain a data-access sequence, compare database models, and distinguish transaction correctness, read scaling, availability, freshness, and recoverability.

Bridge: Durable state supports workflows across service boundaries; next we connect APIs, messages, events, and scheduled work.

## Chapter 8 — APIs, Events, and Asynchronous Workflows

Objective: Explain delivery and retry paths without confusing service guarantees with business-effect correctness.

1. API Gateway and Apigee: contracts, authentication, policies, and selection
2. Cloud Run functions, triggers, runtime, and execution boundaries
3. Pub/Sub topics, subscriptions, push/pull/export models, and fan-out
4. Acknowledgements, redelivery, ordering, and exactly-once feature boundaries
5. Eventarc routing, event sources, and destination authorisation
6. Cloud Tasks versus Pub/Sub: explicit work dispatch and event distribution
7. Workflows and Cloud Scheduler: orchestration, scheduling, and compensation
8. Retries, idempotency, dead-letter handling, replay, and partial failure
9. Backpressure, flow control, concurrency, and downstream capacity

Worked illustrations: An annotated event handler; an authenticated push sequence; a database write followed by acknowledgement failure; duplicate fulfilment; a failed workflow. Scope Pub/Sub exactly-once discussion to eligible pull subscriptions and regional conditions. Explain publisher duplicates and external side effects separately. Compare task dispatch with pub/sub fan-out, and identify which service or client owns retries in each example.

Outcome: Interpret a workflow's delivery and retry sequence, select an integration pattern, and explain where durable progress, idempotency, and recovery handling belong.

Bridge: Operational changes also feed analytical consumers; next we turn them into queryable history.

## Chapter 9 — Analytical Data and Pipelines

Objective: Explain a bounded analytical pipeline and choose services according to processing and consumer requirements.

1. Operational versus analytical data: history, freshness, and query shape
2. Batch ingestion, CDC with Datastream, and reconciliation boundaries
3. Cloud Storage lake layout, formats, schema contracts, and governance
4. BigQuery projects, datasets, tables, SQL, and query execution
5. Partitioning, clustering, scanned data, and capacity-based economics
6. Dataflow, Apache Beam, batch/stream processing, and late-event reasoning
7. Managed Service for Apache Spark and orchestration selection boundaries

Worked illustrations: Order changes → storage/processing → BigQuery diagram; an annotated SQL summary and expected rows; partition-pruning comparison; late/duplicate events; a small windowing timeline. Distinguish ingestion guarantees from correct business aggregates. Compare Dataflow and managed Spark by workload and programming model; use the separate Spark plan for internals. State dataset/job locations and access assumptions before explaining cross-service data movement.

Outcome: Trace source records to an analytical result, explain freshness and reconciliation choices, and compare processing and query-cost approaches.

Bridge: Application and data paths are understandable; next we reproduce and change their infrastructure and releases.

## Chapter 10 — Infrastructure and Delivery

Objective: Explain infrastructure deployment and application release as reviewable changes with explicit state boundaries.

1. Terraform resources, providers, enabled APIs, and resource ownership
2. Modules, dependencies, remote state, locking, and access protection
3. Deployment identities, configuration, secrets, and versioned inputs
4. Plans, drift, replacement, deletion protection, and stateful-resource risks
5. Cloud Build, Artifact Registry, artefact provenance, and build identities
6. Cloud Deploy, target eligibility, revisions, canaries, and rollback
7. Environment promotion, project separation, and controlled changes

Worked illustrations: Annotated Terraform configuration and plan; a remote-state ownership diagram; a build-to-release sequence; a failed deployment; staged traffic promotion. Explain why a plan cannot guarantee successful execution or predict every application consequence, and why rollback cannot universally undo database changes. Treat state as sensitive. Use current Terraform-based guidance rather than retired Deployment Manager examples from older material.

Outcome: Interpret deployment artefacts, explain a proposed change, and identify identity, dependency, state, and rollback assumptions requiring review.

Bridge: Reproducibility supports operations; next we connect telemetry to diagnosis, security, and recovery evidence.

## Chapter 11 — Observability, Security, and Recovery

Objective: Explain how to detect, investigate, contain, and recover from operational failures.

1. Metrics, structured logs, traces, correlation, and retention
2. Cloud Monitoring, Cloud Logging, query expressions, and trace investigation
3. Cloud Audit Logs, log categories, collection configuration, and access
4. SLOs, error budgets, alerts, runbooks, and ownership
5. Secret Manager, Cloud KMS, encryption, and rotation dependencies
6. Security Command Center, Cloud Armor, IAP, and VPC Service Controls boundaries
7. Incident diagnosis, containment, privileged access, and patch responsibilities
8. Backup policies, isolated recovery copies, and restore validation
9. RTO/RPO, regional recovery, dependency order, failover, and failback
10. Quotas, throttling, retries, dependency failures, and resilience validation

Worked illustrations: A small log query and expected records; a latency incident correlated with a trace; an audit event with its collection assumptions; a broken secret rotation; compromised-identity containment; a restore timeline. Distinguish audit categories and Data Access configuration rather than assume every data read is collected by default. Explain VPC Service Controls as a supported-service data-perimeter control, not a firewall replacement. Separate high availability, replication, backup, and disaster recovery; recovery claims need validation evidence.

Outcome: Interpret operational evidence, explain an incident/recovery sequence, and assess whether security and recovery claims follow from configured controls and demonstrated recovery behaviour.

Bridge: With behaviour observable and recovery explicit, next we optimise and evolve the whole architecture.

## Chapter 12 — Optimisation and Architecture Evolution

Objective: Integrate performance, economics, reliability, and business constraints into justified design decisions.

1. Workload measurement, latency distributions, throughput, and bottlenecks
2. Cloud CDN, cache keys, freshness, and origin protection
3. Cost allocation, budgets, exports, and workload cost drivers
4. Rightsizing, commitments, utilisation, and sustainability trade-offs
5. Compute Engine, GKE, and serverless architecture comparisons
6. Migration, location evolution, cutover, and architecture decision records
7. Integrated Google Cloud Well-Architected review and prioritised improvements

Worked illustrations: A latency breakdown; an assumption-based monthly cost comparison including idle capacity, transfer, logs, backups, and analytical queries; alternative order-platform diagrams; a staged migration with reconciliation and rollback limits. Review operations, security/privacy/compliance, reliability, cost, performance, and sustainability together. Explain why global resource scope or additional Regions do not automatically establish an application's recovery guarantees, and why lower price alone does not prove lower environmental impact.

Outcome: Present and critique a coherent Google Cloud design, justify service and operational choices, and explain a staged evolution under explicit requirements and assumptions.

Bridge: Continue through optional implementation, current product documentation, architecture reviews, and operational practice. Production responsibility requires demonstrated deployment, security, incident, and recovery competence beyond following worked explanations.

## Sources and scope

Official conceptual sources inspected on 2026-10-12:

- [Well-Architected Framework](https://docs.cloud.google.com/architecture/framework), [resource hierarchy](https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), [IAM](https://docs.cloud.google.com/iam/docs/overview), [service accounts](https://docs.cloud.google.com/iam/docs/service-account-overview), and [Organization Policy](https://docs.cloud.google.com/organization-policy/overview).
- [Cloud Run](https://docs.cloud.google.com/run/docs/overview/what-is-cloud-run), [runtime contract](https://docs.cloud.google.com/run/docs/container-contract), [service identity](https://docs.cloud.google.com/run/docs/securing/service-identity), [VPC networks](https://docs.cloud.google.com/vpc/docs/vpc), [instance groups](https://docs.cloud.google.com/compute/docs/instance-groups), and [GKE Autopilot](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview).
- [Cloud Storage](https://docs.cloud.google.com/storage/docs/introduction) and [consistency](https://docs.cloud.google.com/storage/docs/consistency); [Cloud SQL](https://docs.cloud.google.com/sql/docs/introduction), [AlloyDB](https://docs.cloud.google.com/alloydb/docs/overview), [Firestore Native mode](https://docs.cloud.google.com/firestore/native/docs/overview), and [Spanner product overview](https://cloud.google.com/spanner). Spanner access was product-level, not a detailed semantics audit.
- [Pub/Sub](https://docs.cloud.google.com/pubsub/docs/overview), [exactly-once feature](https://docs.cloud.google.com/pubsub/docs/exactly-once-delivery), [Tasks versus Pub/Sub](https://docs.cloud.google.com/tasks/docs/comp-pub-sub), [BigQuery](https://docs.cloud.google.com/bigquery/docs/introduction), [Dataflow](https://docs.cloud.google.com/dataflow/docs/overview), and [managed Spark serverless](https://docs.cloud.google.com/managed-spark/docs/serverless-overview).
- [Terraform](https://docs.cloud.google.com/docs/terraform/terraform-overview), [Deployment Manager retirement](https://docs.cloud.google.com/deployment-manager/docs/deprecations), [Observability documentation entry page](https://docs.cloud.google.com/stackdriver/docs/observability), [Audit Logs](https://docs.cloud.google.com/logging/docs/audit), [VPC Service Controls](https://docs.cloud.google.com/vpc-service-controls/docs/overview), [recovery planning](https://docs.cloud.google.com/architecture/dr-scenarios-planning-guide), and [budgets](https://docs.cloud.google.com/billing/docs/how-to/budgets).

Book comparison: JJ Geewax's [Google Cloud Platform in Action](https://www.manning.com/books/google-cloud-platform-in-action), August 2018, was inspected through publisher description and topic coverage. Rui Santos Costa and Drew Hodun's [Google Cloud Cookbook](https://www.oreilly.com/library/view/google-cloud-cookbook/9781492092889/), October 2021, was inspected through publisher description and exposed contents. Full books were not accessed. Their age limits technical authority; use current primary documentation for names, defaults, and capabilities. Detailed research tracking and coverage mapping are in [README.md](../README.md).

Boundaries: representative application/platform reasoning, not an exhaustive product catalogue. Deep Kubernetes, enterprise hybrid administration, database internals, full analytics platforms, ML/AI, IoT, media, and HPC are deferred. SQL, Python, Spark, system design, and Databricks have companion plans; explain local prerequisites without reproducing those courses.

This document plans teaching material; it is not completed lessons or executed deployments. Detailed configuration, code, service guarantees, API compatibility, eligibility, quotas, and cost examples require verification against the selected product, location, and version when lessons are authored.
