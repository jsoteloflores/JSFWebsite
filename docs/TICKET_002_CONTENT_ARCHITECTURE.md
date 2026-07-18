# Ticket 002 — Node Alignment and Typed Content Architecture

## Status

Ready for implementation

## Project

Main computational volcanology portfolio for Joel Sotelo Flores

## Scope

1. Align the repository with Node.js 24
2. Define and validate the portfolio’s structured content system
3. Add reusable content types and status vocabularies
4. Add meaningful schema tests
5. Keep all pages visually and editorially unchanged except where required to prove the content system works

## Governing documents

Before making any changes, read:

- `PROJECT_FOUNDATION.md`
- `AGENTS.md`
- `docs/TICKET_001_REPOSITORY_SCAFFOLD.md`
- this ticket

These documents are authoritative.

This ticket does **not** authorize:

- final website copy
- real publication entries
- real project entries
- real presentation entries
- real software entries
- real exhibit links
- homepage redesign
- final typography
- project cards
- publication list components
- exhibit implementation
- Vercel deployment
- custom-domain configuration

---

# 1. Objective

Create a robust, typed content architecture for the main portfolio.

The content system must support:

- research projects
- publications and manuscripts
- presentations
- scientific software
- external interactive exhibits

The system should make future content entry:

- consistent
- validated
- maintainable
- scientifically accurate
- difficult to mislabel
- easy to connect across projects and outputs

This ticket should establish the data model before any final content is entered.

The site should continue to build as a static Astro website with no client-side hydration.

---

# 2. Direct agent prompt

Use the following as the direct prompt to the coding agent:

> Read `AGENTS.md`, `PROJECT_FOUNDATION.md`, `docs/TICKET_001_REPOSITORY_SCAFFOLD.md`, and `docs/TICKET_002_CONTENT_ARCHITECTURE.md` in full before making changes.
>
> Work only on Ticket 002: Node Alignment and Typed Content Architecture.
>
> First align the repository with Node.js 24 as specified in this ticket. Then implement typed Astro content collections for projects, publications, presentations, software, and external exhibit links.
>
> Do not add real scientific content, final copy, page redesigns, project cards, publication components, exhibit code, or deployment configuration.
>
> Use clearly labeled test fixtures only inside the test suite when schema validation requires sample values. Do not place fabricated entries in public content directories.
>
> Preserve the static-first architecture and existing routes.
>
> Before completion, run formatting, linting, type checking, tests, the production build, and the full validation script. Fix failures caused by your work. Then report modified files, validation results, manual verification steps, and remaining limitations.
>
> Do not begin Ticket 003.

---

# 3. Required preflight: update Node.js alignment

Ticket 001 pinned Node 20. Update the repository to Node 24 before content work.

## Required changes

### `.nvmrc`

Set:

```text
24
```

### `package.json`

Add or update:

```json
{
  "engines": {
    "node": ">=24 <25"
  }
}
```

Do not add a package-manager engine restriction unless the repository already has a deliberate policy for it.

### `README.md`

Update the documented requirement to Node.js 24.

The setup instructions should include:

```text
nvm use
npm install
```

### Lockfile

Run `npm install` under Node 24 so package metadata and the lockfile are consistent.

Do not upgrade unrelated dependencies merely because a newer version exists.

## Verification

Run:

```text
nvm use
node -v
npm -v
```

The active Node version must be `24.x.x`.

Then run the repository validation before proceeding. If the existing scaffold fails under Node 24, fix compatibility problems before implementing the content architecture.

---

# 4. Content-system principles

## 4.1 No fabricated public content

Do not add realistic-looking placeholder publications, projects, presentations, software, collaborators, DOIs, metrics, or institutions to the public content directories.

Public collection directories may remain empty.

Schema tests may use explicit test fixtures with titles such as:

```text
Schema Test Project
Schema Test Publication
```

Test fixtures must remain under `tests/` or inside test code.

## 4.2 Status must be controlled

Publication and project status must use controlled values rather than arbitrary strings.

This prevents:

- inconsistent capitalization
- misleading output labels
- accidental treatment of submitted work as published
- spelling variations
- unfilterable content

## 4.3 Relationships must use stable identifiers

Relationships between records should use stable slugs or IDs rather than duplicated titles.

Examples:

- a publication links to a project using a project slug
- a presentation links to a project using a project slug
- software links to one or more project slugs
- an exhibit links to one project slug

Cross-collection existence validation is not required during this ticket if Astro’s schema layer cannot perform it cleanly. However, the field design must support later validation.

## 4.4 Content must remain independent from visual components

Do not encode:

- CSS class names
- layout variants
- animation stages
- card colors
- icon names
- component paths

inside scientific content records unless a later explicit design requirement establishes a controlled presentation field.

## 4.5 Dates must be machine-readable

Use ISO-formatted dates where an exact date is known:

```text
2026-07-17
```

Use explicit year fields where only a year is needed.

Do not store display-formatted dates such as:

```text
July 17th, 2026
```

Presentation layers can format dates later.

---

# 5. Required content collections

Define these Astro content collections:

- `projects`
- `publications`
- `presentations`
- `software`
- `exhibits`

Use the current Astro content-collection API already established by the repository.

Use local Markdown content through an appropriate glob loader.

The public content directories must remain:

```text
src/content/projects/
src/content/publications/
src/content/presentations/
src/content/software/
src/content/exhibits/
```

Only `.md` files need to be supported during this ticket.

Do not add MDX unless a later requirement justifies it.

---

# 6. Shared controlled vocabularies

Create one clear source of truth for content enums and shared types.

A sensible location is:

```text
src/types/content.ts
```

or another existing conventionally appropriate location.

Do not duplicate enum arrays between:

- `content.config.ts`
- components
- tests
- utilities

Export readonly arrays where useful so schemas and UI code can share the same values later.

## 6.1 Project status

Support:

```text
active
completed
ongoing
paused
archived
```

## 6.2 Publication status

Support:

```text
published
accepted
in-review
submitted
in-preparation
```

## 6.3 Publication type

Support:

```text
journal-article
conference-paper
book-chapter
preprint
thesis
```

## 6.4 Presentation type

Support:

```text
oral-presentation
poster
lightning-talk
invited-talk
workshop
```

## 6.5 Software status

Support:

```text
active
stable
experimental
archived
private
```

## 6.6 Exhibit status

No formal release-cycle system is required.

Use only:

```text
available
unavailable
```

The public visibility field should remain a separate boolean.

## 6.7 Output visibility

For records where needed, use:

```text
public
private
embargoed
```

This is distinct from project or publication status.

---

# 7. Shared sub-schemas

Create reusable schema fragments where they genuinely reduce duplication.

Possible shared structures include:

- author
- external link
- image
- date range

Do not create an excessively abstract schema framework.

## 7.1 Author schema

Publications and presentations must preserve author order.

Each author should support:

- `name`: required string
- `isJoel`: required boolean
- `orcid`: optional valid URL or ORCID string
- `affiliation`: optional string

Rules:

- author order must remain exactly as entered
- at least one author must exist
- no automatic alphabetical sorting
- do not infer `isJoel` from the name string

## 7.2 External-link schema

Support:

- `label`
- `url`

The URL must validate as a URL.

## 7.3 Image schema

Support:

- `src`
- `alt`
- `caption`
- `credit`

Rules:

- `src` required
- `alt` required
- `caption` optional
- `credit` optional

## 7.4 Date-range schema

Support:

- `start`
- `end`
- `display`

Use ISO month or date strings where practical.

`display` may be optional for cases where preferred public wording is not directly derived.

Do not require end dates for ongoing work.

---

# 8. Project collection schema

## Required fields

- `title`
- `subtitle`
- `summary`
- `status`
- `startDate`
- `researchThemes`
- `featured`
- `visibility`

## Optional fields

- `endDate`
- `institutions`
- `advisor`
- `collaborators`
- `methods`
- `tools`
- `featuredImage`
- `relatedPublications`
- `relatedPresentations`
- `relatedSoftware`
- `relatedExhibit`
- `externalLinks`
- `sortOrder`

The Markdown body will later contain the full project narrative.

This ticket does not define required body headings.

---

# 9. Publication collection schema

## Required fields

- `title`
- `authors`
- `year`
- `type`
- `status`
- `visibility`
- `featured`

## Optional fields

- `journal`
- `volume`
- `issue`
- `pages`
- `publisher`
- `doi`
- `url`
- `pdf`
- `abstract`
- `citation`
- `relatedProject`
- `keywords`
- `submittedDate`
- `acceptedDate`
- `publishedDate`
- `sortDate`

## Validation rules

Preferred DOI storage form:

```text
10.xxxx/xxxxx
```

A publication may exist without DOI, volume, issue, pages, or journal metadata.

This is necessary for submitted and in-preparation manuscripts.

---

# 10. Presentation collection schema

## Required fields

- `title`
- `authors`
- `date`
- `event`
- `type`
- `visibility`
- `featured`

## Optional fields

- `location`
- `abstract`
- `poster`
- `slides`
- `recording`
- `thumbnail`
- `relatedProject`
- `contribution`
- `externalUrl`
- `sortDate`

Do not assume every presentation has slides, posters, recordings, abstracts, or an exact location.

---

# 11. Software collection schema

## Required fields

- `name`
- `summary`
- `scientificProblem`
- `status`
- `visibility`
- `featured`

## Optional fields

- `capabilities`
- `roleInPipeline`
- `repository`
- `doi`
- `documentation`
- `screenshots`
- `languages`
- `frameworks`
- `relatedProjects`
- `relatedPublications`
- `externalLinks`
- `sortOrder`

Do not require a public repository.

Some research software may remain private while still being described accurately.

---

# 12. Exhibit collection schema

The portfolio does not contain exhibit implementations.

## Required fields

- `title`
- `summary`
- `researchProject`
- `previewImage`
- `externalUrl`
- `status`
- `visible`
- `featured`

## Optional fields

- `estimatedExperienceLength`
- `technologies`
- `sortOrder`

Do not add:

- animation stages
- model manifest paths
- Three.js settings
- scene definitions
- checkpoint data
- media sequences
- exhibit dependencies

Those belong in separate exhibit repositories.

---

# 13. Slug and identifier policy

Use the Markdown filename as the canonical collection ID or slug unless the current Astro API requires another explicit mechanism.

Filename conventions:

```text
lowercase-kebab-case.md
```

Rules:

- no spaces
- no uppercase letters
- no mutable status words such as `submitted` or `published`
- no version labels such as `final` or `new`

Relationships should reference this stable identifier.

---

# 14. Content configuration

Update `src/content.config.ts`.

Requirements:

- use the current Astro content API
- define all five collections
- use typed schemas
- import shared enum arrays or reusable schemas rather than duplicating them
- keep the file readable
- avoid one monolithic unreadable schema block if helper modules improve clarity

A reasonable organization may be:

```text
src/
├── content.config.ts
└── types/
    ├── content.ts
    └── content-schemas.ts
```

Do not build a generic schema framework.

---

# 15. Query utilities

Create a small set of server-side content utilities only if they reduce repeated query logic.

Allowed utilities:

- get visible entries
- sort featured entries
- sort records by explicit sort fields
- filter public records

Do not add search, filtering UI, client state, or pagination.

Do not query empty collections from public pages merely to prove they work.

---

# 16. Type exports

Make content-related types available to future components without manually duplicating schemas.

Use:

- inferred Zod types
- Astro collection entry types
- or carefully defined exported interfaces tied directly to schema validation

Avoid parallel interfaces that can drift away from schemas.

---

# 17. Testing requirements

Expand the test suite meaningfully.

## Required tests

### Controlled vocabularies

Verify:

- values are unique
- no enum contains empty strings
- publication status and presentation type remain distinct
- exhibit status contains only `available` and `unavailable`

### Author schema

Verify:

- ordered authors validate
- an empty author list fails
- a missing `isJoel` value fails

### Publication schema

Verify:

- a published-style fixture validates
- an in-preparation fixture without DOI or journal metadata validates
- an invalid publication status fails
- an invalid URL fails

### Project schema

Verify:

- a minimal valid project fixture validates
- missing required summary fails
- invalid visibility fails

### Presentation schema

Verify:

- a minimal valid presentation fixture validates
- invalid date input fails if the selected schema supports date validation

### Software schema

Verify:

- private software without a repository validates
- malformed repository URL fails when a repository is present

### Exhibit schema

Verify:

- a valid external exhibit registration validates
- malformed `externalUrl` fails
- required preview alt text is enforced
- no internal exhibit runtime field exists in the schema

All fixtures must be clearly labeled as test fixtures and remain under `tests/` or inside test code.

---

# 18. Documentation requirements

## `README.md`

Update it to include:

- Node 24 requirement
- content-directory overview
- how future Markdown entries are organized
- statement that content schemas are defined centrally
- reminder that exhibit records link to external projects only

## New documentation

Create:

```text
docs/CONTENT_MODEL.md
```

It should document:

- each collection
- controlled statuses
- required and optional fields
- relationship-by-slug approach
- filename conventions
- visibility behavior
- DOI convention
- author-order requirement
- public-content integrity rules
- exhibit boundary

Do not duplicate the full Zod source line by line.

---

# 19. Existing pages

Do not redesign existing pages.

The six scaffold routes must continue to work:

- `/`
- `/about`
- `/research`
- `/publications`
- `/presentations`
- `/software`

Do not render empty-state lists yet.

Do not create dynamic project routes yet.

---

# 20. Static-build and hydration requirements

After implementation:

- the site must remain statically generated
- no client-side framework should be added
- no hydration directives should be added
- no client JavaScript should be emitted solely because of this ticket
- no external API calls should occur
- no database should be introduced

Inspect `dist/` after the build.

---

# 21. Prohibited work

The agent must not:

- add real academic entries
- write final project descriptions
- write Joel’s biography
- create project page components
- create publication cards
- create filters
- add search
- add dynamic routes
- add a CMS
- add React
- add GSAP
- add Three.js
- add Tailwind
- add images
- add CV files
- configure deployment
- add exhibit runtime fields
- validate external links through network requests
- infer real relationships between outputs
- upgrade all dependencies
- change the visual system
- change navigation behavior
- begin Ticket 003

---

# 22. Acceptance criteria

## Node alignment

- `.nvmrc` contains `24`
- `package.json` declares Node `>=24 <25`
- README documents Node 24
- lockfile is consistent
- validation passes under Node 24

## Collections

- projects collection defined
- publications collection defined
- presentations collection defined
- software collection defined
- exhibits collection defined

## Schemas

- shared enums have one source of truth
- author schema defined
- image schema defined
- external-link schema defined
- required fields validated
- optional fields remain optional
- controlled statuses enforced
- URLs validate
- DOI format is documented and validated consistently
- relationships use stable slugs

## Integrity

- no real content added
- no fabricated public content added
- no exhibit runtime configuration added
- no cross-project source code added

## Testing

- controlled-vocabulary tests pass
- schema validation tests pass
- existing smoke tests still pass

## Documentation

- `docs/CONTENT_MODEL.md` created
- README updated
- Ticket 002 stored under `docs/`

## Architecture

- existing routes still build
- static output preserved
- no React
- no hydration
- no unnecessary client JavaScript

## Validation

All pass:

```text
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run validate
```

---

# 23. Manual verification checklist

After implementation, Joel should:

1. Run `nvm use`.
2. Confirm `node -v` reports Node 24.
3. Run `npm install`.
4. Run `npm run validate`.
5. Run `npm run dev`.
6. Visit all six existing routes.
7. Confirm the visible site has not been redesigned.
8. Confirm no fabricated projects or publications appear.
9. Inspect `src/content.config.ts`.
10. Confirm all five collections exist.
11. Inspect the shared schema directory.
12. Confirm controlled vocabularies have one source of truth.
13. Inspect `docs/CONTENT_MODEL.md`.
14. Confirm exhibits are modeled only as external links.
15. Inspect `src/content/` and confirm public collection directories remain empty except for `.gitkeep`.
16. Build the site and inspect `dist/`.
17. Confirm no unnecessary client JavaScript was emitted.
18. Run `git diff` and confirm no unrelated design changes occurred.

---

# 24. Required completion report

The agent’s final response must use this structure.

## Summary

Describe:

- Node 24 alignment
- content collections added
- shared schemas and controlled vocabularies
- tests and documentation added

## Modified files

List every changed file and its purpose.

## Schema overview

Briefly list:

- each collection
- its primary status enum
- how relationships work
- how visibility works

## Validation

Report results for:

- active Node version
- formatting check
- lint
- type checking
- tests
- production build
- full validation

## Manual verification

Provide the exact commands and files Joel should inspect.

## Remaining limitations

State that:

- real content remains unentered
- relationship existence is not yet cross-validated unless explicitly implemented
- dynamic routes are not yet built
- final components are not yet built
- exhibits remain separate projects
- deployment remains out of scope

Do not begin Ticket 003.
