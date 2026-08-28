# Page Architecture

**Document status:** Ticket 011 — Dedicated web CV
**Last updated:** August 2026

This document describes each public page, its data sources, route behavior, and extension rules.

---

## Public routes

```text
/                         ← homepage (index.astro)
/about                    ← About page
/research                 ← Research index
/research/{project-id}    ← Project detail (6 statically generated pages)
/publications             ← Publications
/presentations            ← Presentations (empty notice)
/software                 ← Software (empty notice + research context)
/cv                       ← Curriculum vitae (web-readable + PDF download)
```

Total static pages: **13** (7 top-level + 6 project detail)

---

## Data sources by page

| Page                   | Profile | Projects                 | Publications | CV Data | Presentations | Software   |
| ---------------------- | ------- | ------------------------ | ------------ | ------- | ------------- | ---------- |
| Homepage (`/`)         | ✓       | featured                 | first public | —       | —             | —          |
| About (`/about`)       | ✓       | active featured          | —            | —       | —             | —          |
| Research (`/research`) | —       | all public               | —            | —       | —             | —          |
| Project detail         | —       | one entry + related pubs | related only | —       | —             | —          |
| Publications           | —       | —                        | all public   | —       | —             | —          |
| Presentations          | —       | —                        | —            | —       | all public    | —          |
| Software               | —       | —                        | —            | —       | —             | all public |
| CV (`/cv`)             | ✓       | referenced by ID         | published    | ✓       | —             | —          |

All data is queried at **build time** using server-side utilities. No client-side fetching occurs.

---

## Collection query boundaries

- Pages call `getPublicProjects()`, `getFeaturedProjects()`, `getPublicPublications()`, `getPublicPresentations()`, `getPublicSoftware()`, or `getVisibleExhibits()` from `src/utils/content-queries.ts`.
- Components do **not** call `getCollection()` or any query utility. They receive typed data through props.
- The project detail route (`[id].astro`) additionally calls `getCollection('publications')` directly inside `getStaticPaths` to pre-fetch related publications efficiently.

---

## Project detail route

**File:** `src/pages/research/[id].astro`

**Generation:**

```ts
export async function getStaticPaths() {
  const projects = await getPublicProjects();
  // ... pre-fetch related publications
  return projects.map((project) => ({
    params: { id: project.id },
    props: { project, relatedPubs },
  }));
}
```

The `id` parameter equals the Markdown filename without extension (e.g., `kilauea-lava-fountain-computer-vision`). This matches the stable IDs documented in `docs/CONTENT_MODEL.md`.

**Body rendering:** Uses `render(entry)` from `astro:content` to produce the `<Content />` Astro component for the Markdown body.

**Related publications:** Pre-fetched in `getStaticPaths`. Only renders when the project has a `relatedPublications` field that resolves to public publication records.

---

## Empty-collection behavior

Pages that query currently-empty collections fall back to `ContentNotice.astro` automatically:

| Collection    | Empty behavior                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| presentations | Factual notice: records being prepared from verified metadata                                          |
| software      | Factual notice: records withheld pending canonical names, repository info, and capability descriptions |
| exhibits      | Collection not queried in any page yet                                                                 |

The notices are **data-driven**: when entries are added to the collection with `visibility: 'public'`, the notice disappears automatically without any page redesign.

---

## CV page (`/cv`)

**File:** `src/pages/cv.astro`

**Data sources:**

- **Profile:** Name, affiliation, degrees, expected graduation, contact links, CV PDF path
- **CV Data (`src/data/cv.ts`):** Research experience, manuscripts (under review & in preparation), software, presentations, submitted abstracts, awards, training, teaching
- **Projects collection:** Resolves project IDs to enable "View research →" links
- **Publications collection:** Fetches published peer-reviewed publication

**Status hierarchy:**

The CV page explicitly distinguishes:

- **Published** (from publication collection, rendered with full citation)
- **Under review** (from `manuscriptsUnderReview`, rendered with status label)
- **In preparation** (from `manuscriptsInPreparation`, rendered with status label)
- **Abstract submitted** (from `submittedConferenceAbstracts`, rendered with plain text status)

See [docs/CV_DATA_MODEL.md](CV_DATA_MODEL.md) for complete CV data architecture, status management, and update procedures.

**Download link:**

Uses `profile.cvPath` to link to the approved public PDF at `/cv/Joel_Sotelo_Flores_CV.pdf`.

**No iframe/embed:**

The CV page is web-native editorial HTML. The PDF is not embedded.

---

## Page metadata rules

- Every page has a unique `<title>` in the format `Page Name | Joel Sotelo Flores`
- The homepage title uses `Computational Volcanology | Joel Sotelo Flores`
- Every page has a unique `<meta name="description">`
- Project detail descriptions are derived from the project's `summary` field
- No production domain is assumed in code — no `<link rel="canonical">` yet

---

## Public CV rule

---

## CV PDF and download

The approved public CV PDF is stored at:

```text
public/cv/Joel_Sotelo_Flores_CV.pdf
```

This file is:

- Available at public URL `/cv/Joel_Sotelo_Flores_CV.pdf`
- Referenced via `profile.cvPath` in `src/data/profile.ts`
- Linked from the dedicated CV page (`/cv`) via a "Download PDF" button
- **Not embedded** in an iframe or PDF viewer
- **Not linked** from other site pages (CV tab in navigation is the entry point)

When the PDF is updated, replace the file at `public/cv/Joel_Sotelo_Flores_CV.pdf` and rebuild. The download link will automatically reference the new version.

---

## Current no-image strategy

No production images are available in this ticket. Pages use:

- strong typographic hierarchy
- spacing and horizontal rules as visual structure
- semantic metadata in definition lists
- restrained accent colors from the palette

The `ProjectSummary` component renders no `<img>` when `featuredImage` is absent, which is the current state for all six projects.

---

## Future extension points

- **Exhibit page:** When the first exhibit is deployed, add `src/pages/exhibits.astro` and add `ExhibitPreview.astro` rendering from `getVisibleExhibits()`
- **Publications:** When blocked manuscripts are unblocked, they will appear automatically since `getPublicPublications()` filters by `visibility: 'public'`
- **Presentations:** Two presentation records (AGU 2025 poster, Montréal oral) will appear as soon as their exact ISO dates and event names are resolved
- **Software:** PyRO-FOAMS and the Kīlauea pipeline will appear as soon as canonical names, status, and capability lists are confirmed
- **Images:** When optimized WebP/AVIF derivatives are available, add `featuredImage` to project frontmatter and they will render via the existing `ProjectSummary` component
- **CV content updates:** As manuscript statuses change or new records are added, update `src/data/cv.ts` following procedures in [docs/CV_DATA_MODEL.md](CV_DATA_MODEL.md)
