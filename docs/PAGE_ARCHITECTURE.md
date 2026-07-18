# Page Architecture

**Document status:** Ticket 005 initial page composition
**Last updated:** July 2026

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
```

Total static pages: **12** (6 top-level + 6 project detail)

---

## Data sources by page

| Page                   | Profile | Projects                 | Publications | Presentations | Software   |
| ---------------------- | ------- | ------------------------ | ------------ | ------------- | ---------- |
| Homepage (`/`)         | ✓       | featured                 | first public | —             | —          |
| About (`/about`)       | ✓       | active featured          | —            | —             | —          |
| Research (`/research`) | —       | all public               | —            | —             | —          |
| Project detail         | —       | one entry + related pubs | related only | —             | —          |
| Publications           | —       | —                        | all public   | —             | —          |
| Presentations          | —       | —                        | —            | all public    | —          |
| Software               | —       | —                        | —            | —             | all public |

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

## Page metadata rules

- Every page has a unique `<title>` in the format `Page Name | Joel Sotelo Flores`
- The homepage title uses `Computational Volcanology | Joel Sotelo Flores`
- Every page has a unique `<meta name="description">`
- Project detail descriptions are derived from the project's `summary` field
- No production domain is assumed in code — no `<link rel="canonical">` yet

---

## Public CV rule

No CV link exists on any public page. The CV is withheld pending updates to manuscript titles and DOIs. When the updated CV is approved:

1. Place the file at `public/cv/joel-sotelo-flores-cv.pdf`
2. Add `cvPath` to `src/data/profile.ts`
3. Add a CV link in `BaseLayout.astro` footer or the contact section of relevant pages
4. Close Q3 in `docs/CONTENT_QUESTIONS.md`

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
- **CV link:** Add when the updated CV file is approved
- **Images:** When optimized WebP/AVIF derivatives are available, add `featuredImage` to project frontmatter and they will render via the existing `ProjectSummary` component
