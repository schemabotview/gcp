# gcp — Google Cloud, from foundations to architecture

The GraphL concept app for **Google Cloud**: 12 courses (one per chapter of
[`GCP-COURSE-PLAN.md`](GCP-COURSE-PLAN.md)), 91 sections, each section one
`(scene, slide, narration)` video segment. Served at `graphl.in/gcp/`.

Scaffolded from [`content-repo-template`](https://github.com/schemabotview/content-repo-template).
The render engine (`@graphlearning/flow`) and app shell (`@graphlearning/shell`) are published
packages pinned by version.

## Running it

```sh
npm ci
npm run dev          # http://localhost:5173
```

Routes are `#/<course>-<section>`, e.g. `#/foundations-regions-and-zones`. `#/` is the catalog.

## Verifying a change

```sh
npm run build && npx tsc --noEmit && npm run check
```

All three are a floor, not proof — the rendered route is the real bar. See `CLAUDE.md` for the
layout budgets, density targets and the course arc.

## Layout

```
GCP-COURSE-PLAN.md          the syllabus — chapters, sections, scope, sources
src/content/<course>/       one file per section + the course index
src/scenes/<course>/        the course's scenes + bundle
src/main.tsx · theme.css    app mount · brand tokens (#4285f4 / #7baaf7 / #fbbc04)
scripts/                    check-content · concept.json · titles.json · Colab TTS notebook
public/audio/<course>/      narration wavs (Colab + Chatterbox only)
```
