# Ticket 003 — Content Integrity and Core Rendering Components

## Status

Ready for implementation

## Project

Main computational volcanology portfolio for Joel Sotelo Flores

## Scope

1. Rename the content-query utility for clarity
2. Add repository-wide cross-collection relationship validation
3. Add reusable, accessible Astro components for structured academic content
4. Add display-label helpers and component tests
5. Preserve the existing placeholder pages and static-only architecture

## Governing documents

Before making any changes, read:

- `PROJECT_FOUNDATION.md`
- `AGENTS.md`
- `docs/TICKET_001_REPOSITORY_SCAFFOLD.md`
- `docs/TICKET_002_CONTENT_ARCHITECTURE.md`
- `docs/CONTENT_MODEL.md`
- this ticket

These documents are authoritative.

This ticket does **not** authorize:

- entering Joel’s real academic content
- writing final page copy
- redesigning the homepage
- creating final project-page layouts
- creating dynamic content routes
- implementing filters or search
- implementing any interactive exhibit
- adding exhibit runtime data
- adding final typography or custom fonts
- adding real images or video
- deploying to Vercel

---

# 1. Objective

Strengthen the content system before real portfolio records are added.

The repository already has:

- five typed Astro content collections
- controlled vocabularies
- shared Zod schemas
- visibility rules
- basic server-side query utilities
- empty public content directories
- schema tests

This ticket must add two missing layers:

1. **Referential integrity**
   - A relationship field should not silently point to a nonexistent slug.
   - Content-validation errors should be human-readable and stop the validation command.
   - Empty collections must still validate successfully.

2. **Rendering contracts**
   - Future pages need reusable components for authors, statuses, projects, publications, presentations, software, and external exhibits.
   - Components must consume the typed content model rather than inventing parallel prop structures.
   - Components should be structurally complete and accessible but visually restrained.
   - Final visual design and final page composition remain later work.

The result should be a repository where real content can be entered next without first redesigning the data layer or improvising how entries are rendered.

---

# 2. Direct agent prompt

Use the following as the direct prompt to the coding agent:

> Read `AGENTS.md`, `PROJECT_FOUNDATION.md`, Tickets 001–003, and `docs/CONTENT_MODEL.md` in full before making changes.
>
> Work only on Ticket 003: Content Integrity and Core Rendering Components.
>
> Rename the existing server-side query utility from `src/utils/content.ts` to a clearer name, implement cross-collection slug validation as a repository validation command, and create the reusable Astro content components specified in this ticket.
>
> Do not add Joel’s real content, fabricated public entries, final page designs, dynamic routes, client-side frameworks, exhibit code, or deployment configuration.
>
> Test schemas, relationships, display labels, and representative component rendering using clearly labeled fixtures under `tests/`. Do not place fixtures in `src/content/`.
>
> Preserve the existing six visible routes and the static-only output.
>
> Before completion, run formatting, linting, type checking, content validation, tests, the production build, and the full validation script. Fix failures caused by your work. Then report modified files, validation results, manual verification steps, and remaining limitations.
>
> Do not begin Ticket 004.

---

# 3. Preflight checks

Before editing:

1. Run `nvm use`.
2. Confirm Node is `24.x.x`.
3. Run `npm install`.
4. Run `npm run validate`.
5. Confirm all five public content directories contain no real entries.
6. Inspect:
   - `src/content.config.ts`
   - `src/types/content.ts`
   - `src/types/content-schemas.ts`
   - `src/utils/content.ts`
   - `tests/schema.test.ts`
   - `docs/CONTENT_MODEL.md`
7. Record the existing query-utility exports before renaming the file.
8. Do not change the schemas unless this ticket explicitly requires a compatibility adjustment.

If the repository does not match the Ticket 002 completion report, preserve working behavior and explain the discrepancy before making broad changes.

---

# 4. Query-utility rename

Ticket 002 created both:

```text
src/types/content.ts
src/utils/content.ts
```

The duplicate basename is unnecessarily ambiguous.

Rename:

```text
src/utils/content.ts
```

to:

```text
src/utils/content-queries.ts
```

Requirements:

- preserve all existing exported query functions
- update all imports
- preserve server-side-only behavior
- preserve collection typing
- preserve sorting behavior
- preserve `exactOptionalPropertyTypes` compatibility
- do not change public behavior merely because the file is renamed

Add or retain a clear module comment explaining that the file uses `astro:content` and should only be imported in Astro/build contexts.

Do not create a barrel file named `content.ts` that restores the same ambiguity.

---

# 5. Cross-collection relationship validation

## 5.1 Purpose

Zod validates the shape of each record, but it does not guarantee that a referenced slug actually exists.

Examples that must eventually fail validation:

- a publication references a nonexistent project
- a presentation references a nonexistent project
- software references a nonexistent publication
- an exhibit references a nonexistent project
- a project references a nonexistent exhibit

The repository validation command should catch these errors before deployment.

## 5.2 Implementation approach

Create a dedicated content-validation script.

Preferred location:

```text
scripts/validate-content.ts
```

The script must:

1. Discover Markdown files in all five collection directories.
2. Ignore `.gitkeep` and non-Markdown files.
3. Derive each stable ID from its filename or relative path using the same policy documented for Astro collections.
4. Parse frontmatter.
5. Validate frontmatter with the existing shared schemas.
6. Build an ID set for each collection.
7. Validate every supported relationship.
8. Print concise, actionable errors.
9. Exit with a nonzero status when validation fails.
10. Exit successfully when all content directories are empty.

Do not duplicate the collection schemas inside the script.

Import and reuse the schemas from the existing shared schema module.

## 5.3 Dependency discipline

A small development dependency may be added when necessary to execute TypeScript scripts or parse Markdown frontmatter.

Acceptable examples:

- `tsx` for executing the TypeScript validation script
- `gray-matter` for parsing Markdown frontmatter

Use Node’s built-in filesystem and path APIs for directory traversal where practical.

Do not add a large content-processing framework or generalized build system.

Any new dependencies must be development dependencies unless they are used by the production site at runtime.

## 5.4 Supported relationship checks

Validate the following fields when present.

### Projects

- `relatedPublications` → publication IDs
- `relatedPresentations` → presentation IDs
- `relatedSoftware` → software IDs
- `relatedExhibit` → exhibit ID

### Publications

- `relatedProject` → project ID

### Presentations

- `relatedProject` → project ID

### Software

- `relatedProjects` → project IDs
- `relatedPublications` → publication IDs

### Exhibits

- `researchProject` → project ID

## 5.5 Relationship validation behavior

Each error must identify:

- source collection
- source record ID
- relationship field
- missing target ID
- expected target collection

Example format:

```text
[content] publications/schema-test-publication:
  relatedProject references missing project "missing-project"
```

The exact formatting may differ, but it must be easy to understand.

Report all discovered relationship errors in one run rather than stopping after the first missing reference.

## 5.6 Bidirectional consistency

Existence validation is required.

Bidirectional consistency should also be checked where the schema creates a direct one-to-one link:

- if a project has `relatedExhibit`, the target exhibit’s `researchProject` must point back to that project
- if an exhibit points to a project that identifies a different `relatedExhibit`, report the mismatch

Do not require every project with an exhibit to declare `relatedExhibit` unless the field is present.

Do not require publications and projects to list each other symmetrically during this ticket. Those relations may remain one-directional.

## 5.7 Duplicate IDs

Detect duplicate derived IDs within the same collection.

If nested folders are supported, use the collection-relative path without the `.md` extension as the stable ID.

Document the chosen behavior.

## 5.8 Visibility safety checks

Add validation for these high-value visibility mistakes:

- a visible exhibit must have status `available`
- a visible exhibit must have a valid external URL and preview image, already enforced by schema
- a public record must not contain a clearly local filesystem URL such as `file:///...`
- a private or embargoed record may exist but must not be returned by public query utilities

Do not invent an extensive editorial policy engine.

## 5.9 Package scripts

Add:

```json
{
  "scripts": {
    "content:validate": "tsx scripts/validate-content.ts"
  }
}
```

Update the full validation sequence so content validation runs before tests and the production build.

Recommended order:

1. formatting check
2. lint
3. typecheck
4. content validation
5. tests
6. production build

The command must fail if content validation fails.

---

# 6. Pure relationship-validation module

Do not place all validation logic directly inside the CLI script.

Create a testable pure module, for example:

```text
src/utils/content-integrity.ts
```

It should contain:

- typed representations of parsed records
- relationship-checking functions
- duplicate-ID checks
- visibility-safety checks
- human-readable issue types or messages

The CLI script should handle:

- filesystem traversal
- frontmatter parsing
- console output
- process exit code

The pure module should handle:

- integrity logic

This separation is required so tests can validate behavior without writing public content files.

Do not import `astro:content` into the pure module.

---

# 7. Display labels

Controlled values such as:

```text
in-review
oral-presentation
journal-article
```

must not be rendered to visitors as raw machine labels.

Create one source of truth for human-readable labels.

Suggested location:

```text
src/utils/content-labels.ts
```

It should support labels for:

- project statuses
- publication statuses
- publication types
- presentation types
- software statuses
- exhibit statuses
- visibility values where needed internally

Examples:

```text
in-review → In review
in-preparation → In preparation
oral-presentation → Oral presentation
journal-article → Journal article
```

Requirements:

- use exhaustive typed mappings
- TypeScript should fail if a controlled vocabulary value lacks a label
- components must use these helpers or mappings
- do not title-case arbitrary strings at render time
- do not duplicate labels inside individual components

Do not add marketing-oriented labels such as “Coming soon.”

For unavailable exhibits, use the literal descriptive label:

```text
Unavailable
```

The portfolio should normally hide unavailable or invisible exhibits from public queries.

---

# 8. Shared content components

Create reusable Astro components using the existing directory structure.

The exact filenames may vary slightly if the repository already has naming conventions, but responsibilities must remain clear.

## 8.1 Author list

Suggested file:

```text
src/components/core/AuthorList.astro
```

Responsibilities:

- accept the ordered author array from the shared schema
- preserve author order
- visually distinguish Joel using semantic markup
- render affiliations only when explicitly requested by a prop
- provide readable punctuation
- avoid client-side JavaScript

Requirements:

- use `<strong>` or another appropriate semantic treatment for Joel
- do not infer Joel from the name
- do not reorder authors
- do not abbreviate names automatically
- handle one, two, and many authors correctly

## 8.2 Status label

Suggested file:

```text
src/components/core/StatusLabel.astro
```

Responsibilities:

- accept a controlled status or output type
- render the approved human-readable label
- expose a stable semantic `data-status` value if useful for future styling
- remain visually restrained

Do not make status labels look like large call-to-action buttons.

Do not encode publication precedence through color alone.

## 8.3 External links

Suggested file:

```text
src/components/core/ExternalLinks.astro
```

Responsibilities:

- render an ordered list of labeled links
- use descriptive labels
- distinguish local document paths from external URLs where needed
- add safe external-link attributes when opening a new browsing context
- avoid forcing every link to open in a new tab

Do not render empty containers when no links exist.

## 8.4 Project summary component

Suggested file:

```text
src/components/projects/ProjectSummary.astro
```

Responsibilities:

- render project title
- subtitle
- summary
- status
- research themes
- optional featured image
- optional detail-page href
- optional related-exhibit link only when provided by a future parent component

Do not query the collection inside the component.

Do not include final project-page composition.

Do not invent a “Read more” link when no href is provided.

## 8.5 Publication entry

Suggested file:

```text
src/components/publications/PublicationEntry.astro
```

Responsibilities:

- render ordered authors
- title
- year
- publication type
- publication status
- journal or venue metadata when present
- DOI, URL, or PDF links when present
- optional detail-page href

Requirements:

- published and unpublished work must remain clearly distinguishable
- missing DOI or journal information must not produce blank punctuation
- do not infer citation strings
- do not reorder authors
- do not display raw enum values

## 8.6 Presentation entry

Suggested file:

```text
src/components/presentations/PresentationEntry.astro
```

Responsibilities:

- render title
- authors
- event
- date
- presentation type
- location when present
- contribution when present
- poster, slides, recording, or external links when present

Do not assume every presentation has downloadable material.

Do not render unavailable link labels.

## 8.7 Software entry

Suggested file:

```text
src/components/software/SoftwareEntry.astro
```

Responsibilities:

- render name
- summary
- scientific problem
- status
- selected capabilities
- repository, DOI, or documentation links when present
- indicate private status accurately when the repository is not public

Do not render a missing repository as an error.

Do not turn languages and frameworks into a decorative logo wall.

## 8.8 Exhibit preview

Suggested file:

```text
src/components/exhibits/ExhibitPreview.astro
```

Responsibilities:

- render title
- concise scientific purpose
- preview image
- external URL
- related-project context when supplied
- clear interaction-oriented link text

Requirements:

- only intended for records already filtered as visible and available
- do not include exhibit runtime code
- do not autoplay video
- do not embed the external exhibit
- do not render “DLC,” “release,” or gaming terminology publicly
- link text must describe the destination

---

# 9. Component prop typing

Components must derive types from the shared content schemas or Astro collection entry types.

Do not define parallel manually maintained interfaces that can drift away from validation.

Acceptable patterns include:

- `z.infer<typeof projectSchema>`
- `CollectionEntry<'projects'>['data']`
- exported schema-derived aliases from the shared type module

Choose one consistent approach.

Components should accept data through props.

They should not call `getCollection()` internally.

Collection querying belongs to pages or page-level composition utilities.

---

# 10. Structural styling

Add only the CSS required to make components:

- readable
- semantically organized
- keyboard accessible
- visually consistent with existing tokens
- usable at narrow widths

Use the established palette.

Do not add blue.

Allowed:

- subtle borders
- spacing
- type hierarchy
- restrained metadata layout
- responsive wrapping
- clear focus states
- image aspect-ratio handling

Do not add:

- final card art direction
- gradients
- glow
- glassmorphism
- hover-only content
- animated entrances
- custom fonts
- elaborate status colors
- page-wide layout changes
- final homepage presentation

Prefer component-scoped styles.

If a small shared content style is genuinely repeated, place it in a clearly named shared stylesheet rather than duplicating it.

---

# 11. Component rendering tests

Add tests for representative component output.

Preferred approach:

- use the Astro version’s supported server-side component container/rendering API
- render components to HTML strings using explicit test fixtures
- avoid browser automation during this ticket

If the installed Astro version does not support a stable built-in component-rendering API, document that limitation and test extracted formatting helpers instead. Do not add React, Vue, or a browser framework to enable tests.

## Required rendering tests

At minimum, test:

### AuthorList

- one author
- two authors
- multiple authors
- Joel is semantically emphasized
- input order is preserved

### PublicationEntry

- in-preparation entry without DOI or journal renders without broken punctuation
- published-style fixture renders status and type labels
- author order remains intact
- raw values such as `in-preparation` do not appear as visible text

### ExhibitPreview

- renders descriptive external link text
- includes required alt text
- does not emit iframe, video autoplay, or script tags

If component rendering tests are technically impractical with the installed Astro version, do not quietly omit them. Explain the limitation in the completion report and add the strongest feasible alternative tests.

All fixtures must be clearly named schema-test or component-test data and remain under `tests/`.

---

# 12. Relationship-validation tests

Add tests for the pure integrity module.

Required cases:

1. Empty collection sets pass.
2. A valid publication-to-project relationship passes.
3. A missing publication `relatedProject` fails.
4. A missing presentation project fails.
5. Missing software project and publication references are both reported.
6. A missing project exhibit fails.
7. A missing exhibit project fails.
8. A project/exhibit backlink mismatch fails.
9. Duplicate IDs within a collection fail.
10. An unavailable visible exhibit fails.
11. A record containing a `file:///` public link fails.
12. Multiple errors are returned together rather than only the first.

Test messages should contain enough information to locate the source record and missing target.

---

# 13. Content-query tests

Preserve existing query behavior.

Add pure sorting/filtering helpers if necessary to make behavior testable without importing `astro:content`.

Verify:

- private records are excluded from public results
- embargoed records are excluded
- featured queries require both public visibility and featured status
- exhibits require `visible === true` and `status === 'available'`
- `sortOrder` places lower numbers first
- publications and presentations sort newest first
- missing sort values do not cause unstable or crashing behavior

Do not mock Astro internals unnecessarily.

---

# 14. Documentation updates

## 14.1 Update `docs/CONTENT_MODEL.md`

Add:

- relationship validation behavior
- the `content:validate` command
- duplicate-ID behavior
- project/exhibit backlink rule
- public visibility safety
- human-readable label policy
- component responsibility boundaries

## 14.2 Create `docs/CONTENT_COMPONENTS.md`

Document:

- each reusable component
- the data it accepts
- what it renders
- what it deliberately does not do
- how future pages should query content and pass it into components
- rule that components do not query collections directly
- rule that raw controlled values are never shown to visitors
- rule that components remain static Astro components

Keep this document practical.

Do not turn it into a full design system specification.

## 14.3 Update `README.md`

Add concise references to:

- `npm run content:validate`
- `docs/CONTENT_COMPONENTS.md`
- the renamed `content-queries.ts` utility if the README documents code structure

Do not make the README excessively long.

---

# 15. Existing pages

The following routes must remain visually and editorially unchanged except for import fixes:

- `/`
- `/about`
- `/research`
- `/publications`
- `/presentations`
- `/software`

Do not render the new components on these pages yet.

Do not add empty-state messages.

Do not create a component-preview route.

Do not create dynamic routes.

The components are being prepared for the next composition ticket.

---

# 16. Static output requirements

After implementation:

- all visible routes remain statically generated
- no hydration directives exist
- no client-side framework is installed
- no runtime JavaScript is emitted because of the new content components
- no network API calls occur
- no exhibit bundle is imported
- no component queries a collection internally

Inspect the production output.

If JavaScript is emitted unexpectedly, identify and remove the source unless it is unavoidable build metadata not delivered as site runtime.

---

# 17. Prohibited work

The agent must not:

- add Joel’s real publications
- add Joel’s real presentations
- add Joel’s real projects
- add Joel’s real software
- add working exhibit records
- fabricate realistic content
- create dynamic routes
- compose final content pages
- redesign navigation
- redesign the homepage
- add filters
- add search
- add pagination
- add a CMS
- add React
- add GSAP
- add Three.js
- add Tailwind
- add custom fonts
- add final imagery
- add the CV
- deploy the site
- add analytics
- implement exhibit code
- add release-cycle terminology
- begin Ticket 004

---

# 18. Acceptance criteria

Ticket 003 is complete only when all conditions below are met.

## Utility cleanup

- `src/utils/content.ts` has been renamed to `src/utils/content-queries.ts`
- imports are updated
- query behavior is preserved
- no ambiguous replacement barrel is added

## Integrity validation

- `scripts/validate-content.ts` exists
- frontmatter is parsed and validated with shared schemas
- all required relationships are checked
- duplicate IDs are checked
- project/exhibit backlink mismatch is checked
- public-link safety is checked
- empty collections pass
- all errors are reported together
- `npm run content:validate` exists
- full validation includes content validation

## Display labels

- one exhaustive source of human-readable labels exists
- raw machine labels are not rendered by components
- missing mappings fail TypeScript

## Components

- AuthorList exists
- StatusLabel exists
- ExternalLinks exists
- ProjectSummary exists
- PublicationEntry exists
- PresentationEntry exists
- SoftwareEntry exists
- ExhibitPreview exists
- components use schema-derived types
- components do not query collections
- components use no client-side JavaScript

## Testing

- integrity-validation tests pass
- label tests pass
- query behavior tests pass
- representative component-rendering tests pass, or a documented strongest feasible alternative is implemented
- existing smoke and schema tests still pass

## Documentation

- `docs/CONTENT_MODEL.md` updated
- `docs/CONTENT_COMPONENTS.md` created
- README updated
- Ticket 003 stored under `docs/`

## Scope control

- no real content entered
- no public fixtures entered
- no page redesign
- no dynamic routes
- no exhibit implementation
- no React
- no GSAP
- no Three.js
- no hydration
- no unnecessary client JavaScript

## Validation

All must pass:

```text
npm run format:check
npm run lint
npm run typecheck
npm run content:validate
npm run test
npm run build
npm run validate
```

---

# 19. Manual verification checklist

After the agent finishes, Joel should:

1. Run `nvm use`.
2. Confirm Node reports `24.x.x`.
3. Run `npm install`.
4. Run `npm run content:validate`.
5. Confirm empty public collections pass.
6. Run `npm run validate`.
7. Run `npm run dev`.
8. Visit all six existing routes.
9. Confirm the site still looks like the scaffold.
10. Confirm no real or fabricated academic content appears.
11. Confirm no additional public route was created.
12. Inspect `src/utils/content-queries.ts`.
13. Confirm `src/utils/content.ts` no longer exists.
14. Inspect `src/utils/content-integrity.ts`.
15. Inspect `scripts/validate-content.ts`.
16. Inspect `src/utils/content-labels.ts`.
17. Confirm component files exist in their appropriate directories.
18. Confirm components do not import `getCollection`.
19. Confirm components do not contain hydration directives.
20. Inspect `docs/CONTENT_COMPONENTS.md`.
21. Build the site and inspect `dist/`.
22. Confirm no new client JavaScript is delivered.
23. Run `git diff`.
24. Confirm no unrelated design, content, or dependency changes occurred.

Optional integrity test:

1. Temporarily create a clearly labeled local test Markdown entry referencing a nonexistent slug.
2. Run `npm run content:validate`.
3. Confirm the command fails with a useful relationship error.
4. Delete the temporary file.
5. Run `npm run content:validate` again and confirm it passes.
6. Do not commit the temporary entry.

---

# 20. Required completion report

The agent’s final response must use this structure.

## Summary

Describe:

- query-utility rename
- content-integrity validation
- display-label system
- reusable components
- tests and documentation

## Modified files

List every created, renamed, and modified file.

Explicitly call out:

- new dependencies
- package-script changes
- renamed files

## Integrity checks

List every relationship and safety rule validated.

## Component overview

List each component and its responsibility.

## Validation

Report results for:

- Node version
- formatting
- lint
- type checking
- content validation
- tests
- build
- full validation
- presence or absence of client JavaScript

## Manual verification

Provide exact commands and files Joel should inspect.

## Remaining limitations

State that:

- real content is still unentered
- dynamic routes are not built
- components are not yet composed into final pages
- final visual design is not implemented
- browser-level accessibility testing remains later work
- exhibits remain separate projects
- deployment remains out of scope

Do not begin Ticket 004.
