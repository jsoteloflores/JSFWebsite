# Content Components

This document describes the reusable Astro components available for rendering structured academic content. All components are static, accept typed props derived from collection schemas, and emit no client-side JavaScript.

Components do not query content collections internally. All collection queries belong at the page level (or inside `getStaticPaths`), and data is passed in through props.

Raw controlled-vocabulary values (e.g., `in-preparation`, `oral-presentation`) must never be shown to visitors. Use `StatusLabel` or the label maps from `src/utils/content-labels.ts`.

---

## Core components

### `AuthorList` — `src/components/core/AuthorList.astro`

**Renders:** An ordered inline list of authors from a publication or presentation.

**Props:**

| Prop               | Type       | Required | Description                                        |
| ------------------ | ---------- | -------- | -------------------------------------------------- |
| `authors`          | `Author[]` | Yes      | Ordered author array from the shared schema        |
| `showAffiliations` | `boolean`  | No       | When true, renders the affiliation after each name |

**Behavior:**

- Preserves input order exactly; never alphabetizes
- Wraps Joel's name in `<strong>` using the `isJoel` flag — never inferred from the name string
- Inserts "and" before the last author with correct punctuation for 1, 2, and 3+ authors
- Affiliations are omitted unless `showAffiliations` is true

---

### `StatusLabel` — `src/components/core/StatusLabel.astro`

**Renders:** A human-readable status or type label from `content-labels.ts`.

**Props:**

| Prop     | Type              | Required | Description                                |
| -------- | ----------------- | -------- | ------------------------------------------ |
| `status` | `LabelableStatus` | Yes      | Any value from the controlled vocabularies |

**Behavior:**

- Converts machine values (e.g., `in-preparation`, `journal-article`) to human labels
- Exposes `data-status` attribute for optional CSS targeting
- Restrained appearance — not a large button or call to action

---

### `ExternalLinks` — `src/components/core/ExternalLinks.astro`

**Renders:** A list of labeled external links. Renders nothing when the list is empty.

**Props:**

| Prop           | Type             | Required | Description                                                       |
| -------------- | ---------------- | -------- | ----------------------------------------------------------------- |
| `links`        | `ExternalLink[]` | Yes      | Array of `{ label, url }` pairs                                   |
| `openInNewTab` | `boolean`        | No       | When true, adds `target="_blank"` and `rel="noopener noreferrer"` |

---

### `PageHeader` — `src/components/core/PageHeader.astro`

**Renders:** The consistent heading block used at the top of each top-level page.

**Props:**

| Prop          | Type     | Required | Description                                              |
| ------------- | -------- | -------- | -------------------------------------------------------- |
| `eyebrow`     | `string` | No       | Small uppercase label above the title (e.g., "Research") |
| `title`       | `string` | Yes      | Page `<h1>`                                              |
| `description` | `string` | No       | Introductory paragraph rendered below the title          |

**Behavior:**

- Renders `<header>` containing `<h1>`
- Eyebrow and description are suppressed when absent
- Provides consistent spacing and bottom border across all top-level pages
- Not intended for the homepage hero, which has its own layout

---

### `ContentNotice` — `src/components/core/ContentNotice.astro`

**Renders:** A factual notice displayed when a collection has no public entries.

**Props:**

| Prop        | Type     | Required | Description                                  |
| ----------- | -------- | -------- | -------------------------------------------- |
| `message`   | `string` | Yes      | Factual explanation of why content is absent |
| `linkHref`  | `string` | No       | URL for an optional follow-up link           |
| `linkLabel` | `string` | No       | Visible text for the optional link           |

**Behavior:**

- Factual tone only — no "coming soon," no disabled controls, no fake loading state
- Disappears automatically when the linked collection gains public entries
- Role `note` for assistive technologies
- Currently used on the Presentations and Software pages

---

### `ContactLinks` — `src/components/core/ContactLinks.astro`

**Renders:** Academic email, GitHub, and LinkedIn links from `src/data/profile.ts`.

**Props:**

| Prop        | Type               | Required | Description                                                |
| ----------- | ------------------ | -------- | ---------------------------------------------------------- |
| `layout`    | `'row' \| 'stack'` | No       | `row` (default) renders inline; `stack` renders vertically |
| `showEmail` | `boolean`          | No       | When true, shows the email address as visible text         |

**Behavior:**

- Reads from the profile object directly — no prop passing required for the link values
- GitHub and LinkedIn open in a new tab with `rel="noopener noreferrer"`
- No CV link; CV is withheld pending approval

---

## Project components

### `ProjectSummary` — `src/components/projects/ProjectSummary.astro`

**Renders:** A project card with title, subtitle, status, research themes, featured image (when present), and summary.

**Props:**

| Prop   | Type                 | Required | Description                                                 |
| ------ | -------------------- | -------- | ----------------------------------------------------------- |
| `data` | `ProjectFrontmatter` | Yes      | Project frontmatter from the projects collection            |
| `href` | `string`             | No       | When provided, wraps the title in a link to the detail page |

**Behavior:**

- Does not query the collection internally
- Renders no `<img>` when `featuredImage` is absent — no placeholder is shown
- Used on the homepage and Research index

---

### `ProjectMeta` — `src/components/projects/ProjectMeta.astro`

**Renders:** A structured metadata panel used in the project detail page sidebar.

**Props:**

| Prop   | Type                 | Required | Description         |
| ------ | -------------------- | -------- | ------------------- |
| `data` | `ProjectFrontmatter` | Yes      | Project frontmatter |

**Behavior:**

- Uses a `<dl>` definition list
- Omits any label whose value is absent — no empty metadata rows
- Formats `startDate` and `endDate` from `YYYY-MM` ISO strings to abbreviated "Mon YYYY" display
- Shows: status, period, institution, advisor, research themes, methods, tools

---

## Publication components

### `PublicationEntry` — `src/components/publications/PublicationEntry.astro`

**Renders:** A single publication record.

**Props:**

| Prop   | Type                     | Required | Description                                    |
| ------ | ------------------------ | -------- | ---------------------------------------------- |
| `data` | `PublicationFrontmatter` | Yes      | Publication frontmatter                        |
| `href` | `string`                 | No       | Optional link to a detail page (not yet built) |

**Behavior:**

- Authors rendered via `AuthorList` — order preserved, Joel emphasized
- Venue line built from present fields only — no blank punctuation for missing fields
- DOI URL constructed from bare DOI format (`10.xxxx/xxxxx`)
- Type and status rendered as human-readable labels via the label maps
- Published and unpublished work visually distinguishable through status styling

---

## Presentation components

### `PresentationEntry` — `src/components/presentations/PresentationEntry.astro`

**Renders:** A single presentation record.

**Props:**

| Prop   | Type                      | Required | Description                                    |
| ------ | ------------------------- | -------- | ---------------------------------------------- |
| `data` | `PresentationFrontmatter` | Yes      | Presentation frontmatter                       |
| `href` | `string`                  | No       | Optional link to a detail page (not yet built) |

**Behavior:**

- Not every presentation has downloadable material — absent fields render nothing
- Date formatted from ISO string to human-readable month and year

---

## Software components

### `SoftwareEntry` — `src/components/software/SoftwareEntry.astro`

**Renders:** A single software record.

**Props:**

| Prop   | Type                  | Required | Description                                    |
| ------ | --------------------- | -------- | ---------------------------------------------- |
| `data` | `SoftwareFrontmatter` | Yes      | Software frontmatter                           |
| `href` | `string`              | No       | Optional link to a detail page (not yet built) |

**Behavior:**

- A missing repository is not shown as an error
- Private status is communicated accurately
- Languages and frameworks are listed as plain text, not a logo wall

---

## Exhibit components

### `ExhibitPreview` — `src/components/exhibits/ExhibitPreview.astro`

**Renders:** A preview card for an external interactive exhibit.

**Props:**

| Prop                  | Type                 | Required | Description                             |
| --------------------- | -------------------- | -------- | --------------------------------------- |
| `data`                | `ExhibitFrontmatter` | Yes      | Exhibit frontmatter                     |
| `relatedProjectTitle` | `string`             | No       | Human-readable project name for context |

**Behavior:**

- Intended only for records already filtered as `visible: true` and `status: 'available'`
- Does not embed the exhibit, autoplay video, or include exhibit runtime code
- Link text describes the destination (e.g., "Explore the Kīlauea exhibit")
- Preview image requires non-empty `alt` text

---

## Rule summary

| Rule                                     | Notes                                                |
| ---------------------------------------- | ---------------------------------------------------- |
| Components do not call `getCollection()` | All collection queries are at page level             |
| No client-side JavaScript                | No `client:` directives on any component             |
| No raw enum values shown to visitors     | Always pass through `StatusLabel` or a label map     |
| Author order is always preserved         | `isJoel` flag used for emphasis, not name matching   |
| Empty states render nothing              | No empty containers, no placeholder cards            |
| No fabricated links                      | DOI URLs constructed from bare DOI; no invented URLs |
