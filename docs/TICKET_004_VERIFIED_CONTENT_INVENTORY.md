# Ticket 004 — Verified Content Inventory and Initial Content Entry

## Status

Ready for implementation only after a verified source-of-truth file exists

## Project

Main computational volcanology portfolio for Joel Sotelo Flores

## Scope

1. Create a human-reviewable inventory of Joel’s academic portfolio content
2. Enter the first verified records into the five existing Astro content collections
3. Preserve scientific and publication-status accuracy
4. Validate all relationships, dates, links, author order, and visibility
5. Keep the visible site unchanged

## Governing documents

Before making any changes, read:

- `PROJECT_FOUNDATION.md`
- `AGENTS.md`
- `docs/TICKET_001_REPOSITORY_SCAFFOLD.md`
- `docs/TICKET_002_CONTENT_ARCHITECTURE.md`
- `docs/TICKET_003_CONTENT_INTEGRITY_AND_COMPONENTS.md`
- `docs/CONTENT_MODEL.md`
- `docs/CONTENT_COMPONENTS.md`
- this ticket
- the designated source-of-truth file described below

These documents are authoritative.

This ticket does **not** authorize:

- page composition
- dynamic routes
- homepage redesign
- final project writing
- final About-page writing
- adding unverified media
- adding exhibit implementations
- publishing private or embargoed information
- inventing missing metadata
- deployment

---

# 1. Objective

Populate the structured content system with Joel’s first verified academic records.

This ticket is an ingestion and verification task, not a writing or design task.

The agent must transform verified source information into:

- project Markdown records
- publication Markdown records
- presentation Markdown records
- software Markdown records
- exhibit records only when a real, working external exhibit exists
- a human-readable content inventory
- a list of unresolved questions and missing metadata

The agent must not improve, embellish, infer, or reinterpret facts beyond what the approved sources support.

The result should be a clean, internally consistent content base that later page-composition tickets can render.

---

# 2. Required source of truth

## 2.1 Required file

Before implementation, the repository must contain:

```text
docs/CONTENT_SOURCE_OF_TRUTH.md
```

This file is the only authoritative content-ingestion source for this ticket unless it explicitly cites another local file.

The source-of-truth file may consolidate information from:

- Joel’s current CV
- verified publication citations
- presentation programs
- manuscript title pages
- DOI pages
- GitHub repositories
- software documentation
- approved research summaries
- advisor-approved project descriptions

## 2.2 Stop condition

If `docs/CONTENT_SOURCE_OF_TRUTH.md` does not exist, is visibly incomplete, or contains unresolved contradictions, the agent must:

1. make no public content entries
2. create no fabricated placeholders
3. report exactly what source information is missing
4. stop the ticket

The agent must not reconstruct Joel’s academic history from memory, guesses, old chat logs, web searches, filenames, or inferred context.

## 2.3 Source hierarchy

When sources conflict, use this order:

1. explicit correction inside `CONTENT_SOURCE_OF_TRUTH.md`
2. current official publication or DOI metadata explicitly linked by the source file
3. current CV explicitly designated by the source file
4. presentation program or conference record
5. project documentation
6. older local notes

Do not silently choose between conflicting values.

Record unresolved conflicts in:

```text
docs/CONTENT_QUESTIONS.md
```

## 2.4 No autonomous web research

Do not browse the web during this ticket unless the source-of-truth file explicitly instructs verification of a specific DOI, publication page, or official conference record.

If web access is unavailable, preserve the item as unresolved rather than guessing.

---

# 3. Direct agent prompt

Use the following as the direct prompt to the coding agent:

> Read `AGENTS.md`, `PROJECT_FOUNDATION.md`, Tickets 001–004, `docs/CONTENT_MODEL.md`, `docs/CONTENT_COMPONENTS.md`, and `docs/CONTENT_SOURCE_OF_TRUTH.md` in full before making changes.
>
> Work only on Ticket 004: Verified Content Inventory and Initial Content Entry.
>
> First verify that `docs/CONTENT_SOURCE_OF_TRUTH.md` exists and contains sufficient, internally consistent information. If it does not, do not add public content. Create or update `docs/CONTENT_QUESTIONS.md` with the missing or conflicting information and stop.
>
> If the source is sufficient, create a human-reviewable inventory and enter only verified records into the existing Astro content collections.
>
> Preserve exact author order, publication status, dates, titles, institutions, relationships, and visibility. Do not fabricate or infer missing values.
>
> Do not redesign pages, create dynamic routes, add media without verified paths and permissions, add exhibit implementations, or begin Ticket 005.
>
> Before completion, run formatting, linting, type checking, content validation, tests, production build, and the full validation script. Report all records created, all unresolved items, and every source field intentionally omitted.

---

# 4. Preflight

Before editing:

1. Run `nvm use`.
2. Confirm Node is `24.x.x`.
3. Run `npm install`.
4. Run `npm run validate`.
5. Confirm the existing six routes work.
6. Confirm no public content records currently exist other than `.gitkeep`.
7. Confirm all Ticket 003 components and validation scripts remain intact.
8. Read `docs/CONTENT_SOURCE_OF_TRUTH.md`.
9. Identify every explicit source referenced by it.
10. Check whether each referenced local file exists.
11. Build a private working list of:
    - verified facts
    - missing facts
    - conflicting facts
    - records eligible for public entry
    - records that must remain private or embargoed

Do not create content before completing this audit.

---

# 5. Content inventory

Create:

```text
docs/CONTENT_INVENTORY.md
```

This document is the human-review layer between source documents and collection files.

It must summarize every candidate record under these sections:

1. Identity and academic profile
2. Research projects
3. Publications and manuscripts
4. Presentations
5. Software
6. Exhibits
7. Unresolved items
8. Intentionally excluded items

## 5.1 Inventory columns

Each record should include:

- proposed stable ID
- public title
- collection
- status
- visibility
- source location
- related project ID
- required metadata complete: yes/no
- entered into collection: yes/no
- notes

## 5.2 Inventory purpose

The inventory must make it easy for Joel to answer:

- What will appear on the site?
- What is still missing?
- Which publication statuses are being used?
- Which records are intentionally private?
- Which relationships exist?
- Which files still need permission or verification?

Do not treat the inventory as public-facing copy.

## 5.3 Intentionally excluded content

Record exclusions such as:

- unverifiable claims
- old superseded titles
- abandoned projects
- unpublished material lacking permission
- duplicate presentations
- software that cannot yet be described accurately
- exhibits without working external deployments
- private contact data
- sensitive or restricted research assets

---

# 6. Identity and academic profile

This ticket should not create a separate content collection for identity unless one already exists.

Instead, create:

```text
src/data/profile.ts
```

only if the source-of-truth file provides sufficient verified information.

Use a typed static object for stable site-wide identity metadata.

## 6.1 Allowed fields

- full name
- preferred professional name
- current institution
- degree programs
- expected graduation
- academic email
- GitHub URL
- LinkedIn URL
- CV path, only if the file exists
- concise research-interest list
- current academic stage

## 6.2 Prohibited fields

Do not add:

- home address
- personal phone number
- private email
- birth date
- demographic information
- GPA unless the source explicitly authorizes public display
- advisor commitments
- unpublished admissions strategy
- funding assumptions

## 6.3 Profile accuracy

The profile object must contain only information intended for public display.

If a field is uncertain, omit it.

Do not add final biography prose during this ticket.

---

# 7. Initial project records

Create project entries only for research projects that have:

- a verified title or approved working title
- a verified summary
- a known status
- a known start date or year
- at least one research theme
- clear public visibility
- a defensible statement of Joel’s contribution

## 7.1 Project body structure

Each project Markdown body should use these headings:

```text
## Scientific question

## Why it matters

## Data and materials

## Methods

## My contribution

## Current results

## Limitations

## Research outputs

## Next steps
```

A heading may contain a concise “Not yet publicly described” statement when the source authorizes the project but not the details.

Do not invent body content to fill every heading.

If a section lacks verified information, use an explicit internal note only if the record remains private. For public records, omit unsupported claims or use restrained wording approved by the source.

## 7.2 Contribution language

Use only verified action verbs such as:

- designed
- implemented
- developed
- trained
- labeled
- validated
- collected
- analyzed
- presented
- maintained
- wrote

Do not upgrade “assisted” into “developed.”

Do not claim sole ownership of collaborative work unless the source explicitly supports it.

## 7.3 Project relationships

Link only to content IDs that will exist after this ticket.

Do not pre-link to planned future records.

If a related publication or presentation is unresolved, leave the relationship field absent and note it in the inventory.

---

# 8. Initial publication records

Create publication entries only when author order, title, year, status, and type are verified.

## 8.1 Exact metadata

Preserve:

- title capitalization as approved
- author order
- punctuation in author names
- diacritics
- publication year
- journal or venue
- status
- DOI
- dates when verified
- related project

Do not normalize titles into title case unless the source instructs it.

## 8.2 Status rules

Use:

- `published` only for officially published work
- `accepted` only when formal acceptance exists
- `in-review` only when submitted and actively under review
- `submitted` only when formally submitted
- `in-preparation` for active manuscripts not formally submitted

Do not label planned papers as submitted.

Do not label a conference abstract as a journal article.

## 8.3 Dates

Add:

- `submittedDate`
- `acceptedDate`
- `publishedDate`

only when verified.

Do not infer dates from file timestamps or conversation dates.

## 8.4 DOI and URLs

Store DOI in canonical identifier form:

```text
10.xxxx/xxxxx
```

Use the main publication URL only when verified.

Do not add ResearchGate, copied PDF, or unofficial mirror links unless explicitly approved.

## 8.5 PDFs

Add `pdf` only when:

- the file exists
- Joel has the right to share it
- the source authorizes public access
- the path is repository-safe

Otherwise omit it.

## 8.6 Abstracts and citation strings

Do not manually reconstruct an abstract or citation from memory.

Use only approved text.

If no approved abstract exists, omit it.

---

# 9. Initial presentation records

Create presentation records only when title, authors, date, event, and type are verified.

## 9.1 Types

Use the controlled values already defined:

- `oral-presentation`
- `poster`
- `lightning-talk`
- `invited-talk`
- `workshop`

## 9.2 Event metadata

Preserve:

- official event name
- official location when known
- exact presentation date when known
- author order
- presentation title
- contribution statement

Do not infer a city from an institution name.

## 9.3 Duplicate handling

A conference abstract and the resulting talk or poster should normally be represented as one presentation record unless the content model deliberately distinguishes them.

Do not create duplicate records for:

- program listing
- poster PDF
- presentation event

when they describe the same presentation.

## 9.4 Assets

Add poster, slides, recording, or thumbnail only when:

- the file or URL exists
- public sharing is permitted
- the source explicitly approves it

Otherwise omit the asset.

---

# 10. Initial software records

Create software entries only for software that Joel can describe accurately and publicly.

## 10.1 Required emphasis

Software descriptions should focus on:

- the scientific problem
- the role in the research workflow
- the major capabilities
- Joel’s contribution
- current status

Do not make the record a technology inventory.

## 10.2 Repository status

A software record may be public even when the repository is private.

Use:

```text
status: private
```

only when the software itself is not publicly accessible and the status accurately describes the project.

Do not add a repository URL unless it works and is intended for public access.

## 10.3 Software naming

Use the verified project or software name.

If a tool lacks an approved public name, use a descriptive working title only when the source authorizes it.

Do not create clever names automatically.

## 10.4 Capabilities

List only implemented capabilities.

Do not list planned features as current capabilities.

Planned work may appear in the Markdown body under a clearly identified future-work section.

---

# 11. Exhibit records

Do not create exhibit records merely because exhibits are planned.

Create an exhibit record only when:

- a separate exhibit deployment exists
- the URL works
- a preview image exists
- the related project exists
- the exhibit is approved for public access

If no exhibit is currently deployed, leave the exhibits collection empty and record the planned exhibit in `CONTENT_INVENTORY.md` as intentionally not entered.

Do not use placeholder URLs.

Do not use `unavailable` records as public “coming soon” cards.

---

# 12. Stable ID policy

Use concise lowercase kebab-case IDs.

Examples of form only:

```text
kilauea-fountain-segmentation
ijen-pyroclast-analysis
fountainlabeller
agu-2025-ijen-poster
```

Do not use these exact IDs unless they match the source-of-truth inventory.

Rules:

- stable across status changes
- no `final`
- no `new`
- no version suffix unless the record is genuinely versioned
- no publication status in the ID
- no unnecessary year unless needed to distinguish repeated presentations
- no institution abbreviations that may become obsolete

Document every selected ID in `CONTENT_INVENTORY.md`.

---

# 13. Visibility policy

## Public

Use `public` only when the complete record is suitable for the live site.

## Private

Use `private` for records retained in the repository but excluded from public queries.

Private records must not contain secrets or restricted raw data.

## Embargoed

Use `embargoed` when the record may be described internally but should not yet appear publicly.

Do not assume an embargo expiration date.

## Agent behavior

When uncertain, prefer:

1. omit the record
2. mark unresolved in the inventory
3. ask Joel for clarification

Do not default uncertain work to public.

---

# 14. Markdown content quality

The goal is accurate initial content, not polished final copy.

Each summary should be:

- factual
- specific
- concise
- understandable to a scientist outside the immediate subfield
- free of unsupported superlatives

Avoid:

- “groundbreaking”
- “revolutionary”
- “state-of-the-art” unless objectively supported
- “novel” without a verified claim
- “industry-leading”
- “cutting-edge”
- generic passion statements
- inflated ownership claims

Do not rewrite official publication or presentation titles for style.

---

# 15. Relationship integrity

After creating records:

1. Run `npm run content:validate`.
2. Confirm every relationship target exists.
3. Confirm project/exhibit backlink rules pass.
4. Confirm no public local filesystem URLs exist.
5. Confirm private and embargoed records are excluded by public queries.
6. Confirm no duplicate IDs exist.

The agent must not disable or weaken validation to accommodate content.

Fix the content instead.

---

# 16. Content-entry report

Create:

```text
docs/CONTENT_ENTRY_REPORT.md
```

It must list:

## Entered records

For each:

- collection
- ID
- title
- status
- visibility
- source
- related records

## Omitted fields

List important optional fields intentionally omitted because they are:

- unknown
- unverified
- unavailable
- not public
- not applicable

## Unresolved questions

Link to `docs/CONTENT_QUESTIONS.md`.

## Excluded records

List candidate records not entered and why.

## Validation

Record the result of content validation and the full repository validation.

---

# 17. Unresolved questions

Create or update:

```text
docs/CONTENT_QUESTIONS.md
```

Each question must include:

- record or topic
- missing field
- why it matters
- exact source conflict when applicable
- safest current action
- proposed user question

Examples:

```text
## Publication: [working identifier]

Missing: current manuscript status

Why it matters: determines whether the record is labeled submitted, in review, or in preparation

Safest current action: do not enter publicly

Question: Has this manuscript been formally submitted, and if so, what is its current status?
```

Do not bury uncertainties inside code comments.

---

# 18. Tests

Add tests only where the new profile or content-entry logic creates reusable behavior.

Do not write snapshot tests for every Markdown file.

Required checks may include:

- profile data contains no empty required fields
- profile public URLs are valid
- every public record has a nonempty summary
- every author list contains at least one `isJoel: true` when Joel is an author
- no public record contains placeholder markers such as `TODO`, `TBD`, or `PLACEHOLDER`
- no public title contains obvious working-status suffixes such as `final2`
- public content IDs match the documented naming policy

Prefer repository content validation for relationship and schema correctness.

Do not duplicate the full validator in tests.

---

# 19. Existing pages

Do not compose the new records into public pages during this ticket.

The six existing routes should remain visually unchanged.

Do not:

- import the new records into pages
- add empty-state replacement views
- create dynamic routes
- create project-detail pages
- create publication lists
- update homepage cards

The content will be rendered in Ticket 005.

This separation allows Joel to review the inventory and records before page design begins.

---

# 20. Files and media

Do not add media unless explicitly listed and approved in `CONTENT_SOURCE_OF_TRUTH.md`.

For any approved file:

- confirm it exists
- confirm the filename is descriptive
- confirm the path is repository-relative
- confirm public-sharing permission
- confirm file size is reasonable
- confirm no embedded sensitive metadata is known

Do not modify scientific figures in this ticket.

Do not compress or transform media unless specifically instructed.

---

# 21. Prohibited work

The agent must not:

- infer missing publication status
- invent author order
- invent DOI values
- invent dates
- invent locations
- invent collaborators
- invent metrics
- write final marketing copy
- design final pages
- create dynamic routes
- create exhibit implementations
- add placeholder exhibit URLs
- add unapproved media
- add a CMS
- add React
- add GSAP
- add Three.js
- add Tailwind
- add deployment configuration
- browse broadly for Joel’s information
- expose private or embargoed content
- begin Ticket 005

---

# 22. Acceptance criteria

Ticket 004 is complete only when all applicable conditions are met.

## Source control

- `docs/CONTENT_SOURCE_OF_TRUTH.md` exists
- all entered facts are traceable to it or an explicitly cited local source
- conflicts are documented
- no facts are inferred silently

## Inventory

- `docs/CONTENT_INVENTORY.md` exists
- every candidate record is listed
- every entered record has a stable ID
- excluded records are documented
- unresolved records are documented

## Profile

- `src/data/profile.ts` exists only if sufficient verified data is available
- profile data is typed
- only public information is included
- no final biography is written

## Collections

- verified project entries added
- verified publication entries added
- verified presentation entries added
- verified software entries added
- exhibit entries added only for working public deployments
- all entries pass schema validation
- all relationships resolve
- all statuses are accurate
- all visibility values are deliberate

## Integrity

- exact author order preserved
- at least one Joel author is marked correctly where applicable
- titles preserved
- no fake DOI
- no fake URLs
- no public `file:///` paths
- no public placeholder markers
- no duplicate IDs
- no unapproved assets

## Documentation

- `docs/CONTENT_ENTRY_REPORT.md` created
- `docs/CONTENT_QUESTIONS.md` created or updated
- `docs/CONTENT_MODEL.md` updated only if a real ingestion need required clarification
- README updated only if the content workflow changed

## Pages

- visible routes remain unchanged
- no dynamic routes added
- no new public composition added

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

# 23. Manual review checklist

After the agent finishes, Joel should review content before committing.

## Inventory

1. Open `docs/CONTENT_INVENTORY.md`.
2. Confirm every intended record appears.
3. Confirm no unintended record appears.
4. Confirm stable IDs are understandable.
5. Confirm exclusions make sense.

## Publications

6. Check every title character by character.
7. Check exact author order.
8. Check Joel’s author marker.
9. Check publication type.
10. Check current status.
11. Check year.
12. Check journal or venue.
13. Check DOI.
14. Check any submitted, accepted, or published dates.
15. Check related project.

## Presentations

16. Check title.
17. Check author order.
18. Check event.
19. Check date.
20. Check location.
21. Check type.
22. Check contribution.
23. Check asset permissions.

## Projects

24. Check public title.
25. Check project status.
26. Check start and end dates.
27. Check research themes.
28. Check “My contribution” wording.
29. Check results and limitations for overstatement.
30. Check relationships.

## Software

31. Check public name.
32. Check status.
33. Check repository visibility.
34. Check capabilities are implemented.
35. Check scientific problem and workflow role.
36. Check related projects and publications.

## Privacy and visibility

37. Confirm no private contact information appears.
38. Confirm no restricted data appears.
39. Confirm embargoed work is not public.
40. Confirm exhibits remain absent unless deployed.

## Technical validation

41. Run `npm run content:validate`.
42. Run `npm run validate`.
43. Run `npm run dev`.
44. Confirm visible pages remain unchanged.
45. Inspect `git diff`.
46. Confirm only content, inventory, reports, and necessary tests changed.

Do not approve the ticket until the academic metadata has been manually reviewed.

---

# 24. Required completion report

The agent’s final response must use this structure.

## Summary

State:

- whether the source-of-truth file was sufficient
- how many records were entered in each collection
- whether a profile data object was created
- whether any exhibits were entered

## Entered records

List every record by:

- collection
- ID
- title
- status
- visibility

## Source traceability

Explain where each group of facts came from.

## Unresolved items

List every unresolved question and link to `docs/CONTENT_QUESTIONS.md`.

## Excluded items

List candidate records that were not entered and why.

## Modified files

List every created or modified file.

## Validation

Report:

- Node version
- formatting
- lint
- type checking
- content validation
- tests
- build
- full validation
- client JavaScript status

## Manual review

Provide the exact review steps Joel should perform before committing.

## Remaining limitations

State that:

- content has not yet been composed into pages
- final copy editing remains later work
- final visual design remains later work
- dynamic routes are not built
- media may still be absent
- exhibits remain separate projects
- deployment remains out of scope

Do not begin Ticket 005.
