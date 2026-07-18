# Ticket 005 — Public Page Composition and Project Detail Routes

## Status

Ready for implementation after Ticket 004 profile corrections are applied

## Project

Main computational volcanology portfolio for Joel Sotelo Flores

## Scope

1. Replace scaffold copy with the first real public-site composition
2. Build all six existing pages from verified profile and collection data
3. Add statically generated project detail routes
4. Establish a polished text-first visual hierarchy
5. Preserve the static Astro architecture and strict content boundaries
6. Defer imagery, interactive exhibits, advanced animation, and deployment

## Governing documents

Before making changes, read:

- `PROJECT_FOUNDATION.md`
- `AGENTS.md`
- `docs/TICKET_001_REPOSITORY_SCAFFOLD.md`
- `docs/TICKET_002_CONTENT_ARCHITECTURE.md`
- `docs/TICKET_003_CONTENT_INTEGRITY_AND_COMPONENTS.md`
- `docs/TICKET_004_VERIFIED_CONTENT_INVENTORY.md`
- `docs/CONTENT_MODEL.md`
- `docs/CONTENT_COMPONENTS.md`
- `docs/CONTENT_SOURCE_OF_TRUTH.md`
- `docs/CONTENT_INVENTORY.md`
- `docs/CONTENT_ENTRY_REPORT.md`
- `docs/CONTENT_QUESTIONS.md`
- this ticket

These documents are authoritative.

This ticket does **not** authorize:

- inventing or completing unresolved academic metadata
- adding blocked manuscript records
- adding blocked presentation records
- adding blocked software records
- adding working or placeholder exhibit records
- publishing the current CV
- final imagery
- custom web fonts
- client-side frameworks
- advanced animation
- exhibit embeds
- deployment
- analytics

---

# 1. Objective

Turn the validated content foundation into the first substantive public portfolio.

At the end of this ticket:

- the homepage should clearly identify Joel and his research direction
- the About page should explain his academic profile and methodological focus
- the Research page should present all verified projects in a deliberate hierarchy
- every project should have a statically generated detail page
- the Publications page should render the verified published article
- the Presentations and Software pages should handle their currently empty public collections honestly and gracefully
- the site should feel intentional and credible without relying on final imagery
- all pages should remain usable without JavaScript

This is the first page-composition ticket.

It is not the final visual-design ticket.

---

# 2. Required profile corrections

Before page composition, verify that the resolved profile decisions have been applied.

Required public values:

```text
display name: Joel Sotelo Flores
location: Lexington, Virginia
public CV path: omitted
```

The full name with middle initial may remain in source metadata or citations where appropriate, but the main website identity should display:

```text
Joel Sotelo Flores
```

The site may publicly show:

```text
Lexington, Virginia
```

The site must not display:

- a CV download button
- a disabled CV button
- a placeholder CV URL
- a link into `docs/source-materials/`

The public CV will be added only after manuscript titles and DOIs are updated and Joel approves the final file.

If these profile changes have not yet been applied, make them as a narrowly scoped preflight update before composing pages.

Update the resolved questions in the documentation if necessary.

---

# 3. Direct agent prompt

Use the following as the direct prompt to the coding agent:

> Read `AGENTS.md`, `PROJECT_FOUNDATION.md`, Tickets 001–005, the content-model and component documentation, the verified source-of-truth file, content inventory, entry report, and unresolved questions before making changes.
>
> Work only on Ticket 005: Public Page Composition and Project Detail Routes.
>
> First confirm the public profile uses “Joel Sotelo Flores,” allows “Lexington, Virginia,” and omits a public CV path.
>
> Replace the six scaffold pages with real, restrained, data-driven page compositions using the verified profile object and public content collections. Add statically generated detail routes for every public project.
>
> Do not add blocked publications, presentations, software, exhibits, placeholder URLs, invented metadata, final imagery, custom fonts, client frameworks, hydration, or deployment configuration.
>
> Use the existing content components and production query utilities. Extend them only when required for page composition and keep content querying at page level.
>
> Preserve static output and ensure every page works with JavaScript disabled.
>
> Run formatting, linting, type checking, content validation, tests, production build, and full validation. Report all routes built, components changed, content notices used, and remaining limitations.
>
> Do not begin Ticket 006.

---

# 4. Preflight

Before editing:

1. Run `nvm use`.
2. Confirm Node is `24.x.x`.
3. Confirm installed Astro version.
4. Run `npm install`.
5. Run `npm run validate`.
6. Confirm:
   - six public project records exist
   - one public publication record exists
   - presentations collection has no public entries
   - software collection has no public entries
   - exhibits collection has no public entries
7. Confirm `src/data/profile.ts` contains:
   - display name `Joel Sotelo Flores`
   - location `Lexington, Virginia`
   - no public CV path
8. Inspect all existing content components.
9. Inspect the existing navigation and `BaseLayout`.
10. Record the existing visible placeholder copy so it can be removed completely.
11. Do not change source records merely to make page design easier.

If content validation fails, fix the content problem before composing pages.

---

# 5. Information architecture

The public route structure after this ticket must be:

```text
/
├── about/
├── research/
│   ├── kilauea-lava-fountain-computer-vision/
│   ├── ijen-pyroclast-microct-analysis/
│   ├── v0499-centauri-photometry/
│   ├── wds-03575-0110-astrometry/
│   ├── nanoparticle-dipole-self-assembly/
│   └── riesel-sierpinski-computational-number-theory/
├── publications/
├── presentations/
└── software/
```

Existing top-level routes must be preserved.

Project detail routes must use the stable content IDs.

Do not create:

- publication detail routes
- presentation detail routes
- software detail routes
- exhibit routes
- tag routes
- search routes
- pagination routes

---

# 6. Global composition principles

## 6.1 Scientific identity first

The site’s first impression should be:

> Joel is a physical and computational volcanology researcher who builds computer-vision and scientific-software workflows to extract quantitative information from volcanic imagery and micro-CT data.

Do not foreground generic web-development language.

Do not describe Joel primarily as a software engineer.

## 6.2 Text-first, not empty-looking

No final project images are available yet.

The site should therefore use:

- strong typography
- spacing
- rules and separators
- concise metadata
- editorial lists
- restrained accent treatment
- structured scientific language

Do not create large blank image placeholders.

Do not use stock imagery.

Do not use generic volcano backgrounds.

## 6.3 Observation and analysis modes

Preserve the two conceptual visual modes from the project foundation:

### Observation mode

Use for:

- homepage opening
- project framing
- fieldwork language
- broad scientific context

Characteristics:

- atmospheric but restrained
- dark background
- spacious layout
- large type
- short statements

### Analysis mode

Use for:

- methods
- metadata
- publication details
- project status
- research themes
- project-body sections

Characteristics:

- precise structure
- compact metadata
- borders and alignment
- clear labels
- no fake terminal or code styling

Do not implement a literal theme toggle.

## 6.4 No card wall

Do not render every piece of content as a rounded card.

Preferred patterns:

- editorial project rows
- bordered article entries
- split text layouts
- numbered or labeled sections
- definition lists
- restrained panels only where they clarify hierarchy

Avoid dashboard aesthetics.

---

# 7. Base layout and global shell

Update `BaseLayout.astro` only as needed to support real pages.

## 7.1 Metadata

Each page must provide:

- unique `<title>`
- unique meta description
- sensible document language
- viewport metadata
- canonical metadata only if a real site URL is already configured

Do not invent a production domain inside code.

A consistent title pattern is acceptable:

```text
Page Name | Joel Sotelo Flores
```

Homepage title may use:

```text
Joel Sotelo Flores | Computational Volcanology
```

## 7.2 Header

The header must include:

- text-based site identity: `Joel Sotelo Flores`
- the existing top-level navigation
- accurate active-page indication
- keyboard-visible focus states
- responsive wrapping at narrow widths

Do not add:

- hamburger JavaScript
- logo artwork
- CV button
- animated underline that requires JavaScript
- sticky behavior unless it remains simple, accessible, and visually justified

A CSS-only wrapping header is preferred.

## 7.3 Footer

The footer should include:

- Joel Sotelo Flores
- concise research identity
- Lexington, Virginia
- academic email
- GitHub
- LinkedIn
- current year generated at build time
- no CV link

Do not include generic claims such as “Built with passion.”

A small implementation credit such as “Built with Astro” is optional but should not compete with the academic identity.

## 7.4 Main content

Provide:

- consistent content width
- clear page header region
- stable vertical rhythm
- skip-link target
- sensible minimum page height
- no horizontal overflow at 320px

---

# 8. Homepage

Replace the placeholder homepage completely.

The homepage should be concise enough to scan quickly and substantial enough to establish credibility.

## 8.1 Hero

Required content:

### Eyebrow

Use:

```text
Computational & Physical Volcanology
```

### Heading

Use the public display name:

```text
Joel Sotelo Flores
```

### Approved positioning statement

Use restrained wording based on verified content, such as:

> I develop computer-vision and scientific-software workflows that turn volcanic imagery and micro-CT data into quantitative measurements of eruptive processes and pyroclast structure.

Minor editing is allowed for rhythm, but do not add unsupported claims.

### Supporting metadata

Include:

- Washington and Lee University
- B.S. Physics
- B.S. Earth and Environmental Geoscience
- expected June 2027
- Lexington, Virginia

### Primary links

Include:

- Explore research → `/research`
- About Joel → `/about`

A direct email link may be included as a lower-emphasis contact action.

Do not include a CV action.

## 8.2 Featured research

Query public featured projects using the existing query utility.

Render the two verified featured projects:

- Kīlauea lava-fountain computer vision
- Ijen pyroclast micro-CT analysis

Use `ProjectSummary.astro` or an appropriate extension of it.

Each must link to its project detail route.

Show:

- title
- subtitle
- summary
- status
- research themes
- detail link

Do not show empty image containers.

## 8.3 Research approach

Create a short section communicating the end-to-end workflow visible across the verified projects.

Use three concise stages:

1. Observe
2. Segment
3. Quantify

Approved conceptual content:

### Observe

Field footage, scientific imagery, micro-CT volumes, and laboratory measurements provide the raw record of physical systems.

### Segment

Computer vision and machine-learning workflows identify structures of interest consistently across complex imagery.

### Quantify

Scientific software converts segmented imagery into reproducible measurements of geometry, texture, pore structure, and physical behavior.

This is a synthesis of verified work.

Do not present it as a universal method used identically in every project.

Do not style it as fake code or a pipeline terminal.

## 8.4 Selected publication

Query the public publication collection.

Show the verified published double-star article using `PublicationEntry.astro`.

Use a restrained heading such as:

```text
Selected publication
```

Include a link to the full Publications page.

Do not imply the article is in volcanology.

It may be described as part of Joel’s broader quantitative research background.

## 8.5 Closing contact section

Use a concise, professional closing statement.

Allowed purpose:

- welcome conversations about computational volcanology
- graduate research
- scientific image analysis
- research software

Include:

- academic email
- GitHub
- LinkedIn

Do not state that Joel is currently accepting specific employment, consulting, or collaborations unless verified.

---

# 9. About page

Replace the placeholder About page.

The page should explain Joel’s academic orientation without becoming a full autobiography.

## 9.1 Page introduction

Use a concise heading and description establishing:

- undergraduate researcher
- Washington and Lee University
- Physics and Earth and Environmental Geoscience
- computational and physical volcanology
- expected graduation June 2027

## 9.2 Research focus

Use the verified research-interest list.

Render it as a deliberate set of themes, not a software-logo list.

Themes:

- computational volcanology
- physical volcanology
- computer vision for eruption imagery
- machine learning for scientific image segmentation
- volcanic micro-CT analysis
- pore-network and permeability analysis
- scientific software development

## 9.3 Methodological perspective

Compose a short verified narrative explaining that Joel combines:

- physics
- Earth science
- scientific imaging
- machine learning
- quantitative analysis
- software development

Do not mention unverified career plans, graduate-school admissions, funding contingencies, or private advisor commitments.

## 9.4 Education

Display:

- Washington and Lee University
- B.S. Physics
- B.S. Earth and Environmental Geoscience
- expected June 2027
- honors thesis working title, explicitly labeled as a working title

Do not display GPA.

## 9.5 Current work

Link to the two active featured projects.

Do not duplicate their full summaries.

## 9.6 Contact

Include:

- Lexington, Virginia
- academic email
- GitHub
- LinkedIn

Do not include the CV yet.

---

# 10. Research index page

Replace the placeholder Research page.

## 10.1 Page introduction

Explain that the portfolio includes research spanning:

- computational volcanology
- observational astronomy
- experimental physics
- computational mathematics

Make clear that the current primary direction is computational and physical volcanology.

## 10.2 Project grouping

Query all public projects.

Group them into:

### Current volcanology research

Projects with status `active`:

- Kīlauea Lava-Fountain Computer Vision
- Ijen Pyroclast Micro-CT and Pore-Network Analysis

### Earlier quantitative research

Completed projects:

- V0499 Centauri Photometric Analysis
- WDS 03575-0110 Double-Star Astrometry
- Nanoparticle and Magnetic-Dipole Self-Assembly
- Computational Number Theory: Riesel-Sierpiński Sequences

The grouping must be derived from status and/or explicit IDs in a transparent, maintainable way.

Do not create a new taxonomy field solely for this page unless there is a genuine modeling need.

## 10.3 Project rows

Use `ProjectSummary.astro`.

Every project should display:

- status
- title
- subtitle
- summary
- research themes
- link to detail page

Do not show methods or tools in the index unless the component can include them without creating visual clutter.

## 10.4 Ordering

Use existing `sortOrder`.

Do not alphabetize.

---

# 11. Project detail routes

Create:

```text
src/pages/research/[id].astro
```

or the equivalent project-detail route consistent with Astro 7.

## 11.1 Static generation

Use `getStaticPaths()`.

Generate one page for every public project.

Do not generate pages for private or embargoed projects.

Each path must use the stable collection ID.

## 11.2 Data flow

The page should:

1. query the public project collection at build time
2. pass the selected entry as props
3. render the Markdown body using Astro’s content rendering API
4. avoid client-side fetching
5. avoid querying related collections inside low-level components

## 11.3 Page header

Include:

- breadcrumb back to Research
- status
- title
- subtitle
- summary
- date range
- institution
- advisor when present
- research themes
- methods
- tools

Use semantic lists or definition lists.

Do not show empty metadata labels.

## 11.4 Body

Render the verified Markdown body.

Maintain a readable measure.

The current headings may include:

- Scientific question
- Why it matters
- Data and materials
- Methods
- My contribution
- Current results
- Limitations
- Research outputs
- Next steps

Do not force a generated table of contents during this ticket.

Do not add in-page scrolling JavaScript.

## 11.5 Related outputs

Render related public records only when actual relationships exist.

For the WDS project, display the related published article.

For projects whose relationship fields are intentionally absent, render no empty related-output block.

Do not infer relationships from similar titles.

## 11.6 Navigation between projects

A simple previous/next project navigation is optional.

If implemented:

- derive order from `sortOrder`
- use descriptive project titles
- avoid circular navigation if it complicates semantics
- do not add JavaScript

## 11.7 Page metadata

Each project detail page must have:

- unique title
- unique description based on the project summary
- no fabricated social image

---

# 12. Publications page

Replace the placeholder Publications page.

## 12.1 Page introduction

Explain that this page includes verified scholarly publications and will expand as manuscripts reach public, fully documented stages.

Avoid “coming soon.”

## 12.2 Published work

Query public publications.

Render the published article using `PublicationEntry.astro`.

Use a heading:

```text
Peer-reviewed publications
```

Do not create empty sections for:

- in review
- submitted
- in preparation

Those records have not been entered.

## 12.3 Status integrity

Do not mention blocked manuscripts in visible page copy.

Do not summarize the number of unpublished manuscripts.

Do not expose `CONTENT_QUESTIONS.md` or internal inventory information.

## 12.4 Empty behavior

If the collection unexpectedly contains no public records, render a factual fallback without claiming future publication dates.

However, under the current verified content, one record should render.

---

# 13. Presentations page

The public presentations collection is intentionally empty.

Replace the placeholder page with an honest content notice.

## 13.1 Required page content

Include:

- page title
- concise explanation that presentation records are being finalized before public posting
- explanation that dates, event metadata, and asset permissions are being verified
- a link to Research

Suggested tone:

> Presentation records are being prepared from verified conference metadata. They will be added after dates, event details, and sharing permissions are confirmed.

Minor edits are allowed.

Do not say “coming soon.”

Do not list unconfirmed AGU 2026 submissions.

Do not list the AGU 2025 or Montréal records until their required metadata is resolved and entered into the collection.

## 13.2 Data-driven behavior

Still query the public presentation collection.

If public records exist in the future:

- render them using `PresentationEntry.astro`
- suppress the empty notice automatically

The page must not require redesign when records are later added.

---

# 14. Software page

The public software collection is intentionally empty.

Replace the placeholder page with a useful but restrained explanation.

## 14.1 Required page content

Explain that scientific software is central to Joel’s research workflow, but public software records are being withheld until:

- canonical names are confirmed
- repository visibility is resolved
- DOI and release metadata are verified
- current implemented capabilities are documented accurately

Use concise public language.

Do not expose all internal unresolved questions.

Do not list fake or incomplete Zenodo entries.

Do not link to nonexistent repositories.

## 14.2 Research context

The page may briefly state that current work includes:

- lava-fountain segmentation and labeling workflows
- pyroclast stereometric analysis

These are verified project facts.

Do not present them as public releases.

Link to the relevant project pages.

## 14.3 Data-driven behavior

Query the public software collection.

If public entries exist later:

- render them with `SoftwareEntry.astro`
- suppress the notice automatically

---

# 15. Reusable page components

Reuse existing Ticket 003 components.

Create new components only when repeated page composition justifies them.

Potential additions:

```text
src/components/core/PageHeader.astro
src/components/core/ContentNotice.astro
src/components/core/ContactLinks.astro
src/components/projects/ProjectMeta.astro
src/components/projects/ProjectList.astro
```

These names are suggestions.

Do not create every possible abstraction.

## 15.1 PageHeader

May support:

- eyebrow
- title
- description
- optional metadata

It should not impose a rigid layout on project detail pages if their needs differ.

## 15.2 ContentNotice

Use for empty Presentations and Software collections.

Requirements:

- factual tone
- no warning styling
- no “coming soon”
- no disabled controls
- no fake loading state

## 15.3 ContactLinks

May centralize:

- academic email
- GitHub
- LinkedIn

Use descriptive accessible labels.

## 15.4 Project metadata

May centralize date, institution, advisor, methods, tools, and themes.

Do not duplicate metadata-rendering logic across six detail pages.

---

# 16. Visual system for this ticket

This ticket may substantially improve the scaffold’s composition while remaining within the established identity.

## 16.1 Palette

Use only the established palette:

- Obsidian `#08090A`
- Basalt `#141619`
- Charcoal `#1D2023`
- Ivory `#F3EFE7`
- Ash `#AAA69E`
- Stone `#595B5D`
- Wine `#79242F`
- Oxidized red `#B64A3A`
- Sandstone `#AA9767`
- rare Sulfur `#D6B85E`

No blue.

## 16.2 Typography

Use a high-quality system-font stack during this ticket.

Do not download or add custom fonts.

Establish:

- readable body size
- restrained large display heading
- clear section hierarchy
- comfortable line height
- maximum prose width
- non-condensed metadata text

Do not use monospaced type as a dominant visual motif.

## 16.3 Borders and surfaces

Use:

- subtle rules
- muted surfaces
- warm accent borders
- careful spacing

Avoid:

- excessive rounded cards
- thick glowing borders
- glass effects
- neon
- code windows
- terminal panels
- simulated data dashboards

## 16.4 Links

Links must:

- remain distinguishable without blue
- have visible hover and focus states
- not rely only on color
- use underlines or structural cues where appropriate

## 16.5 Responsive behavior

Verify at:

- 320px
- 375px
- 768px
- 1024px
- 1440px

Requirements:

- no horizontal scrolling
- navigation wraps cleanly
- hero does not overflow
- long publication titles wrap
- author lists wrap
- metadata stacks at narrow widths
- project detail prose remains readable

---

# 17. Accessibility

Required:

- one `<h1>` per page
- logical heading order
- semantic landmarks
- current navigation state
- visible keyboard focus
- descriptive link text
- no empty links
- no color-only status communication
- no content hidden only on hover
- reduced-motion preferences respected
- images absent rather than rendered without meaningful content
- sufficient text contrast using the established palette

Project body headings must remain navigable and semantic.

Do not use ARIA when native HTML is sufficient.

---

# 18. Page and route tests

Add tests that provide meaningful protection without duplicating Astro internals.

## 18.1 Required structural checks

Verify:

- scaffold placeholder phrases no longer exist in `src/pages`
- all six top-level page files exist
- project detail route exists
- project-detail route uses static generation
- no page imports blocked content from internal documentation
- no page includes a CV link
- no page contains `client:` hydration directives
- no page contains iframe or autoplay media
- all public page titles are nonempty

## 18.2 Content-link helpers

If a project URL helper is introduced, test it against all six stable IDs.

Expected form:

```text
/research/{project-id}
```

## 18.3 Build-output verification

After `npm run build`, verify:

- all six top-level routes exist
- all six project detail routes exist
- no unexpected client JavaScript is emitted
- project pages contain their project titles
- the WDS detail page includes its related publication
- Presentations and Software pages contain their factual empty notices

This can be implemented as:

- a small post-build verification script, or
- a test that reads `dist/` after a dedicated build step

Do not make ordinary unit tests depend on a stale `dist/` directory.

If adding a script, name it clearly, for example:

```text
npm run site:verify
```

The full validation chain may run it after the production build.

## 18.4 Existing tests

All existing:

- smoke tests
- schema tests
- integrity tests
- content-quality tests
- helper tests

must continue to pass.

---

# 19. Documentation

## 19.1 Create `docs/PAGE_ARCHITECTURE.md`

Document:

- purpose of each public page
- data sources used by each page
- project detail route behavior
- collection-query boundaries
- empty-collection behavior
- page metadata rules
- current no-CV rule
- current no-image strategy
- future extension points

Do not turn this into a full visual design system.

## 19.2 Update `docs/CONTENT_COMPONENTS.md`

Add any new page-level components and clarify their responsibilities.

## 19.3 Update README

Add concise documentation for:

- public routes
- project detail generation
- any new verification command
- page architecture document

## 19.4 Ticket record

Store this ticket as:

```text
docs/TICKET_005_PUBLIC_PAGE_COMPOSITION.md
```

---

# 20. Existing content restrictions

Do not change:

- publication status
- project status
- author order
- project dates
- project summaries
- content IDs
- relationship fields

unless correcting an implementation error against the source of truth.

Page copy may summarize verified material, but it must not silently alter the underlying records.

Do not enter any currently blocked record.

---

# 21. Prohibited work

The agent must not:

- add the current CV publicly
- create a CV button
- add a disabled CV button
- add blocked manuscripts
- add incomplete presentations
- add incomplete software
- add exhibit records
- create placeholder exhibit links
- add stock photos
- add generic volcano photography
- add generated scientific imagery
- add custom fonts
- add React
- add Vue
- add Svelte
- add GSAP
- add Three.js
- add Tailwind
- add client hydration
- add analytics
- add a CMS
- add contact forms
- add search
- add filters
- add pagination
- create publication detail routes
- create presentation detail routes
- create software detail routes
- deploy the site
- begin Ticket 006

---

# 22. Acceptance criteria

Ticket 005 is complete only when all applicable conditions are met.

## Profile

- public name is `Joel Sotelo Flores`
- location is `Lexington, Virginia`
- no public CV link exists
- no current CV file is copied into `public/cv/`

## Top-level pages

- homepage contains real verified composition
- About page contains real verified composition
- Research page renders all six public projects
- Publications page renders the verified article
- Presentations page has data-driven empty handling
- Software page has data-driven empty handling
- no scaffold placeholder copy remains

## Project routes

- six static project detail pages are generated
- URLs use stable project IDs
- only public projects generate routes
- Markdown bodies render
- metadata renders without empty labels
- WDS project displays its related publication
- no inferred relationships appear

## Components

- existing content components are reused
- new repeated page patterns are componentized sensibly
- no component queries content unless it is explicitly a page-level composition component
- no component uses hydration

## Visual composition

- text-first design is coherent without images
- no blank media placeholders
- no blue
- no fake terminals
- no card wall
- system fonts only
- responsive layout works at required widths
- focus states are visible

## Accessibility

- one `<h1>` per page
- heading order is logical
- landmarks are semantic
- active navigation is indicated
- links are descriptive
- no hover-only content
- no color-only status meaning

## Documentation

- `docs/PAGE_ARCHITECTURE.md` exists
- component documentation updated
- README updated
- Ticket 005 stored in `docs/`

## Tests and verification

- page structural tests pass
- all existing tests pass
- production build succeeds
- all twelve expected public pages exist
- no unexpected client JavaScript is emitted
- full validation passes

## Scope control

- no blocked records added
- no CV published
- no images added
- no exhibits implemented
- no advanced animation
- no deployment
- no Ticket 006 work

## Required commands

All must pass:

```text
npm run format:check
npm run lint
npm run typecheck
npm run content:validate
npm run test
npm run build
npm run site:verify
npm run validate
```

If `site:verify` is not created because equivalent verification is implemented elsewhere, document the exact substitute.

---

# 23. Manual verification checklist

After the agent finishes, Joel should:

## Global

1. Run `nvm use`.
2. Run `npm install`.
3. Run `npm run validate`.
4. Run `npm run dev`.
5. Open every top-level route.
6. Confirm the header shows `Joel Sotelo Flores`.
7. Confirm Lexington, Virginia appears only where appropriate.
8. Confirm no CV link or disabled CV button appears.
9. Tab through the complete site.
10. Confirm focus states remain visible.
11. Resize to 320px and confirm no horizontal scrolling.

## Homepage

12. Confirm the hero identifies computational and physical volcanology.
13. Confirm both active volcanology projects appear.
14. Confirm both project links work.
15. Confirm the three-stage research approach is accurate.
16. Confirm the published astronomy article is not misrepresented as volcanology.
17. Confirm contact links work.

## About

18. Confirm both degree programs are correct.
19. Confirm expected graduation is June 2027.
20. Confirm GPA is absent.
21. Confirm the thesis is labeled as a working title.
22. Confirm research-interest wording is accurate.
23. Confirm no private or admissions-related information appears.

## Research index

24. Confirm all six projects appear exactly once.
25. Confirm active projects appear first.
26. Confirm completed projects follow.
27. Confirm statuses are correct.
28. Confirm project ordering follows `sortOrder`.
29. Confirm every detail link works.

## Project details

30. Open all six detail pages.
31. Confirm the page title, subtitle, and summary match each source record.
32. Confirm dates are correct.
33. Confirm institutions and advisors are correct.
34. Confirm methods and tools omit empty values.
35. Confirm Markdown body headings render correctly.
36. Confirm contribution wording is not inflated.
37. Confirm the nanoparticle project still uses “assisted.”
38. Confirm the WDS page shows the related publication.
39. Confirm other projects do not show empty related-output sections.

## Publications

40. Confirm the exact article title.
41. Confirm all four authors and their order.
42. Confirm Joel is emphasized correctly.
43. Confirm journal, volume, issue, and pages.
44. Confirm no DOI or PDF link is fabricated.
45. Confirm no blocked manuscript appears.

## Presentations

46. Confirm no unverified presentation is listed.
47. Confirm the notice is factual and not “coming soon.”
48. Confirm the Research link works.

## Software

49. Confirm no incomplete software release is listed.
50. Confirm the page describes the research context without claiming public availability.
51. Confirm relevant project links work.
52. Confirm no placeholder repository or DOI appears.

## Build output

53. Run `npm run build`.
54. Run `npm run site:verify`.
55. Confirm twelve public HTML pages are generated.
56. Inspect `dist/` for unexpected JavaScript.
57. Confirm no client hydration bundle appears.
58. Run `git diff`.
59. Confirm no content records, statuses, or author lists changed unexpectedly.

Do not approve the ticket until all project pages and publication metadata have been manually checked.

---

# 24. Required completion report

The agent’s final response must use this structure.

## Summary

Describe:

- six top-level page compositions
- project detail route generation
- visual-system changes
- profile correction status
- empty-collection handling

## Routes built

List:

- all six top-level routes
- all six project detail routes

## Data sources

Explain which pages use:

- `profile.ts`
- projects collection
- publications collection
- presentations collection
- software collection

## Components

List every component created or materially changed and its responsibility.

## Modified files

List every created, renamed, and modified file.

## Validation

Report:

- Node version
- Astro version
- formatting
- lint
- type checking
- content validation
- tests
- build
- site verification
- full validation
- client JavaScript status

## Manual verification

Provide exact commands and the highest-risk academic details Joel should inspect.

## Remaining limitations

State that:

- final project imagery is absent
- public CV remains withheld
- blocked manuscripts remain unentered
- presentation records remain unentered
- software records remain unentered
- exhibits remain separate projects
- advanced animation remains deferred
- browser-level automated accessibility testing remains later work
- deployment remains out of scope

Do not begin Ticket 006.
