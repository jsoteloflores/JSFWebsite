# Content Model

This document describes the portfolio's structured content system.
Schemas are defined in `src/types/content-schemas.ts`.
Controlled vocabularies are defined in `src/types/content.ts`.
Collections are registered in `src/content.config.ts`.

---

## Collections

| Collection      | Directory                    | Schema               |
| --------------- | ---------------------------- | -------------------- |
| `projects`      | `src/content/projects/`      | `projectSchema`      |
| `publications`  | `src/content/publications/`  | `publicationSchema`  |
| `presentations` | `src/content/presentations/` | `presentationSchema` |
| `software`      | `src/content/software/`      | `softwareSchema`     |
| `exhibits`      | `src/content/exhibits/`      | `exhibitSchema`      |

---

## Filename conventions

Use lowercase kebab-case Markdown filenames. The filename (without `.md`) becomes the entry's canonical slug.

```text
kilauea-lava-fountain-segmentation.md
ijen-pyroclast-stereology.md
sotelo-flores-2025-jvgr.md
agu-2025-poster.md
temporal-segmentation-tool.md
kilauea-observation-exhibit.md
```

Rules:

- no spaces
- no uppercase letters
- no status words (`submitted`, `published`, `final`)
- no version labels (`new`, `v2`, `revised`)
- stable — do not rename after first commit

Cross-collection relationships reference this filename-derived slug.

---

## Controlled statuses

### Project status

| Value       | Meaning                      |
| ----------- | ---------------------------- |
| `active`    | Currently in progress        |
| `completed` | Concluded with final outputs |
| `ongoing`   | Continuous long-term work    |
| `paused`    | Temporarily inactive         |
| `archived`  | No longer maintained         |

### Publication status

| Value            | Meaning                              |
| ---------------- | ------------------------------------ |
| `published`      | Peer-reviewed and publicly available |
| `accepted`       | Accepted; not yet published          |
| `in-review`      | Submitted and under peer review      |
| `submitted`      | Submitted; review not yet begun      |
| `in-preparation` | Being prepared; not yet submitted    |

### Publication type

`journal-article`, `conference-paper`, `book-chapter`, `preprint`, `thesis`

### Presentation type

`oral-presentation`, `poster`, `lightning-talk`, `invited-talk`, `workshop`

### Software status

| Value          | Meaning                       |
| -------------- | ----------------------------- |
| `active`       | Under active development      |
| `stable`       | Feature-complete, maintained  |
| `experimental` | Prototype or proof-of-concept |
| `archived`     | No longer maintained          |
| `private`      | Not publicly available        |

### Exhibit status

| Value         | Meaning                                   |
| ------------- | ----------------------------------------- |
| `available`   | Exhibit is publicly reachable             |
| `unavailable` | Exhibit is not yet deployed or is offline |

### Visibility

| Value       | Meaning                        |
| ----------- | ------------------------------ |
| `public`    | Rendered on the live site      |
| `private`   | Hidden from all public pages   |
| `embargoed` | Suppressed until embargo lifts |

---

## Required and optional fields

### Projects

**Required:** `title`, `subtitle`, `summary`, `status`, `startDate`, `researchThemes`, `featured`, `visibility`

**Optional:** `endDate`, `institutions`, `advisor`, `collaborators`, `methods`, `tools`, `featuredImage`, `relatedPublications`, `relatedPresentations`, `relatedSoftware`, `relatedExhibit`, `externalLinks`, `sortOrder`

The Markdown body carries the full project narrative (scientific question, method, results, etc.).

### Publications

**Required:** `title`, `authors`, `year`, `type`, `status`, `visibility`, `featured`

**Optional:** `journal`, `volume`, `issue`, `pages`, `publisher`, `doi`, `url`, `pdf`, `abstract`, `citation`, `relatedProject`, `keywords`, `submittedDate`, `acceptedDate`, `publishedDate`, `sortDate`

A publication may exist without `doi`, `journal`, `volume`, `issue`, or `pages`. This is expected for `in-preparation` and `submitted` work.

### Presentations

**Required:** `title`, `authors`, `date`, `event`, `type`, `visibility`, `featured`

**Optional:** `location`, `abstract`, `poster`, `slides`, `recording`, `thumbnail`, `relatedProject`, `contribution`, `externalUrl`, `sortDate`

### Software

**Required:** `name`, `summary`, `scientificProblem`, `status`, `visibility`, `featured`

**Optional:** `capabilities`, `roleInPipeline`, `repository`, `doi`, `documentation`, `screenshots`, `languages`, `frameworks`, `relatedProjects`, `relatedPublications`, `externalLinks`, `sortOrder`

A `repository` URL is not required. Private research software may be described without a public repository.

### Exhibits

**Required:** `title`, `summary`, `researchProject`, `previewImage`, `externalUrl`, `status`, `visible`, `featured`

**Optional:** `estimatedExperienceLength`, `technologies`, `sortOrder`

---

## Relationship approach

Relationships between records use the stable slug (filename without `.md`).

Examples:

```yaml
# In a publication frontmatter
relatedProject: kilauea-lava-fountain-segmentation

# In a presentation frontmatter
relatedProject: ijen-pyroclast-stereology

# In a software entry
relatedProjects:
  - kilauea-lava-fountain-segmentation
  - ijen-pyroclast-stereology

# In an exhibit entry
researchProject: kilauea-lava-fountain-segmentation
```

Cross-collection existence validation is not enforced in this ticket. Future tooling may verify that referenced slugs exist.

---

## Visibility behavior

An entry with `visibility: 'public'` is rendered on the live site. `private` and `embargoed` entries are excluded by the query utilities in `src/utils/content.ts`.

For exhibits specifically, the `visible` boolean field takes precedence. An exhibit with `visible: false` is never shown publicly, regardless of status.

---

## DOI convention

Store DOIs in bare form only, without the `https://doi.org/` prefix.

```yaml
# Correct
doi: 10.1016/j.jvolgeores.2025.000000

# Wrong — do not store the full URL
doi: https://doi.org/10.1016/j.jvolgeores.2025.000000
```

The schema enforces the `10.xxxx/xxxxx` format with a regex. Presentation layers add the URL prefix when rendering.

---

## Author order

Author arrays preserve insertion order exactly. Do not alphabetize. Do not reorder.

The `isJoel` flag must be set explicitly on each author object. It is never inferred from the name string.

```yaml
authors:
  - name: Joel Sotelo Flores
    isJoel: true
    affiliation: Example University
  - name: Collaborator Name
    isJoel: false
    affiliation: Another Institution
```

---

## Dates

Use ISO strings for all date fields.

For exact dates (presentations): `YYYY-MM-DD`
For year-month precision (project start/end): `YYYY-MM`
For year-only precision: `YYYY` or use the `year` integer field

Do not store display-formatted dates such as `December 9, 2025` in frontmatter. Formatting is handled by presentation layers.

---

## Public-content integrity rules

- Do not add invented publication titles, DOIs, metrics, collaborators, or affiliations.
- Do not add realistic-looking placeholder entries to public content directories.
- Schema test fixtures must be clearly labeled (e.g., "Schema Test Publication") and live under `tests/`, never in `src/content/`.
- Before making an entry visible, confirm Joel has verified all values.
- Mark unverified fields with `# TODO: verify` in a comment rather than inventing values.

---

## Exhibit boundary

Exhibit records in `src/content/exhibits/` describe and link to external interactive experiences.

They must not contain:

- runtime configuration
- scene definitions
- Three.js settings
- model manifest paths
- checkpoint data
- media sequences
- exhibit-specific JavaScript
- animation stage data

The full exhibit implementation lives in its own separate repository with its own dependencies, agents instructions, and deployment.
