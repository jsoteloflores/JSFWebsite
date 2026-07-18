# AGENTS.md

## Purpose

This file defines the permanent operating rules for any coding agent working in the **main computational volcanology portfolio repository** for Joel Sotelo Flores.

Read this file before making any changes.

Also read:

- `PROJECT_FOUNDATION.md`
- any task-specific specification under `docs/`
- any files explicitly referenced by the assigned ticket

This repository contains the **main academic portfolio only**.

It does not contain the implementation of the Kīlauea interactive exhibit, the segmentation-model exhibit, or the 3D pyroclast exhibit.

Those are separate projects with separate repositories, documentation, dependencies, assets, and deployments.

---

# 1. Core objective

Build and maintain a polished academic portfolio that presents Joel as a computationally capable researcher in physical and computational volcanology.

The site must communicate:

- a coherent research identity
- strong scientific and computational ownership
- complete research workflows
- publications, presentations, software, and CV
- explicit personal contributions
- careful distinction between published, submitted, in-review, and in-preparation work
- readiness for graduate research

The portfolio must remain:

- fast
- readable
- visually distinctive
- scientifically accurate
- accessible
- maintainable
- independent from the interactive exhibit codebases

---

# 2. Scope boundary

## This repository may contain

- the homepage
- About page
- research overview
- project case studies
- publications
- presentations
- software summaries
- downloadable CV
- contact information
- static figures
- lightweight project media
- lightweight exhibit preview media
- structured exhibit metadata
- links to separate exhibit deployments
- metadata, sitemap, social previews, and SEO assets
- tests and build configuration

## This repository must not contain

- full interactive exhibit implementations
- full training datasets
- raw 4K eruption footage
- source-resolution mask archives
- model checkpoints
- raw Micro-CT volumes
- master scientific meshes
- heavy Three.js scenes
- React Three Fiber applications
- exhibit-specific GSAP timelines
- browser-based model inference
- separate exhibit data pipelines
- unpublished collaborator data without explicit permission

## Never do this

Do not implement any of the following inside the portfolio repository:

- the Kīlauea observation-to-measurement experience
- the model training and inference walkthrough
- the interactive 3D pyroclast viewer

The portfolio may contain only:

- a static or lightweight preview
- a short description
- a representative image or short compressed clip
- an external link to the separate exhibit

---

# 3. Required workflow for every task

Before editing:

1. Read this file.
2. Read `PROJECT_FOUNDATION.md`.
3. Read the task-specific specification.
4. Inspect the current repository structure.
5. Inspect relevant components and content files.
6. Identify the smallest set of files that must change.
7. Confirm whether the task is content, styling, architecture, testing, or deployment work.
8. Avoid unrelated changes.

During implementation:

- follow the existing architecture
- preserve naming conventions
- preserve content schemas
- avoid unnecessary dependencies
- avoid speculative refactors
- keep content separate from layout logic
- keep layout separate from page-specific data
- reuse existing primitives where appropriate
- keep the portfolio static-first
- preserve keyboard and mobile behavior
- preserve reduced-motion support
- never fabricate scientific values

Before completion:

1. Run formatting.
2. Run linting.
3. Run type checking.
4. Run relevant tests.
5. Run the production build.
6. Fix failures caused by the task.
7. Review the changed pages at mobile and desktop sizes.
8. Confirm that no exhibit runtime code was added.
9. List modified files.
10. Explain manual verification steps.
11. State any remaining limitations.
12. Stop after the assigned ticket.

Do not begin later tickets without explicit instruction.

---

# 4. Agent response format

At the end of every completed task, report:

## Summary

A concise description of what changed.

## Modified files

List each changed file and its purpose.

## Validation

List the commands run and whether they passed.

## Manual verification

Explain exactly what Joel should inspect in the browser.

## Remaining limitations

List only real limitations or deferred work.

Do not claim success if the production build or required tests failed.

Do not hide errors.

---

# 5. Technical architecture

## Preferred stack

Use:

- Astro
- TypeScript with strict checking
- Astro content collections
- semantic HTML
- CSS custom properties for design tokens
- component-scoped or modular CSS
- minimal client-side JavaScript
- Vercel for deployment
- GitHub for source control

Use React only when a specific lightweight component genuinely requires local client state.

Do not convert the site into a React single-page application.

## Static-first rule

Prefer Astro-rendered static HTML for:

- navigation
- project pages
- publication lists
- presentation lists
- software summaries
- About content
- CV links
- exhibit previews
- footer
- metadata

Use client-side JavaScript only when it clearly improves usability.

## Dependency rule

Before adding any dependency:

1. Check whether the feature can be implemented with Astro, TypeScript, CSS, or existing packages.
2. Explain why the dependency is needed.
3. Confirm it is maintained.
4. Confirm it does not significantly increase the client bundle.
5. Add it only for the task that requires it.

Do not add:

- Three.js
- React Three Fiber
- GSAP
- D3
- animation frameworks
- icon libraries
- component libraries
- state-management libraries

unless the assigned portfolio task explicitly requires them and the benefit is justified.

Exhibit-specific dependencies belong in exhibit repositories.

---

# 6. Repository structure

The expected structure is approximately:

```text
/
├── public/
│   ├── cv/
│   ├── images/
│   ├── media/
│   │   ├── projects/
│   │   └── previews/
│   └── social/
├── src/
│   ├── components/
│   │   ├── core/
│   │   ├── navigation/
│   │   ├── projects/
│   │   ├── publications/
│   │   ├── presentations/
│   │   ├── software/
│   │   └── exhibits/
│   ├── content/
│   │   ├── projects/
│   │   ├── publications/
│   │   ├── presentations/
│   │   ├── software/
│   │   └── exhibits/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   └── utils/
├── docs/
├── scripts/
├── tests/
├── AGENTS.md
├── PROJECT_FOUNDATION.md
└── README.md
```

This is a guide, not permission to reorganize the repository without need.

Do not move files simply to make the structure match this tree if the existing organization is already coherent.

---

# 7. Content rules

## Structured content

The following must use structured content collections or typed data:

- projects
- publications
- presentations
- software
- external exhibits

Do not hard-code repeated research entries directly into page templates.

## Scientific accuracy

Never invent or infer:

- publication status
- author order
- DOI
- journal
- presentation date
- event location
- model metrics
- number of frames
- episode range
- sample measurements
- funding
- collaborator role
- software DOI
- acceptance status

Use only values provided by Joel or present in verified source files.

If a value is missing:

- omit it
- mark it as a clear placeholder during development
- or ask for it in the task report

Do not silently guess.

## Publication status

Use explicit controlled values such as:

- `published`
- `accepted`
- `in-review`
- `submitted`
- `in-preparation`
- `conference-abstract`
- `poster`
- `oral-presentation`
- `software`
- `dataset`

Do not use visual styling that makes unpublished work appear equivalent to published work.

## Author emphasis

Joel’s name may be visually emphasized in author lists.

Do not reorder authors.

## Contribution statements

Every major project should include Joel’s contribution.

Prefer concrete language:

- designed
- implemented
- trained
- labeled
- validated
- analyzed
- collected
- wrote
- presented
- maintained

Avoid vague phrases such as:

- helped with
- assisted on
- worked with
- participated in

unless that is the most accurate description.

## Tone

The writing should be:

- scientifically grounded
- direct
- confident
- specific
- concise
- honest about limitations

Avoid:

- inflated startup language
- excessive self-promotion
- vague claims of innovation
- buzzword-heavy prose
- generic statements about passion
- claims unsupported by evidence

---

# 8. Visual system

## Required atmosphere

The site should feel:

- volcanic
- mineral
- precise
- computational
- cinematic in restrained moments
- academically credible
- calm rather than noisy

## Core colors

Use CSS custom properties.

Initial palette:

```css
--color-obsidian: #08090a;
--color-basalt: #141619;
--color-charcoal: #1d2023;
--color-ivory: #f3efe7;
--color-ash: #aaa69e;
--color-stone: #595b5d;
--color-wine: #79242f;
--color-oxidized-red: #b64a3a;
--color-sandstone: #aa9767;
--color-sulfur: #d6b85e;
```

These values may be tuned, but the visual hierarchy must remain.

## Blue prohibition

Do not use blue as:

- a principal accent
- a secondary accent
- a link color
- a focus color
- a button color
- a decorative gradient
- a chart color
- a hover color
- a glow

Do not introduce blue indirectly through a UI library’s default theme.

If a browser default produces blue controls or focus states, override them accessibly using the project tokens.

## Typography

Use:

- a display sans for major statements
- a readable sans for body text
- a monospace font sparingly for metadata

Do not use monospace as the main body font.

## Prohibited motifs

Do not add:

- raw code blocks as decoration
- fake terminal windows
- fake shell prompts
- fake logs
- syntax highlighting as visual texture
- cyberpunk styling
- neon glow
- custom cursors
- cursor trails
- matrix effects
- fake boot screens
- excessive glassmorphism
- floating technology logos
- animated backgrounds with no scientific meaning
- page transitions that delay access
- scroll hijacking
- gratuitous 3D typography

Computational capability should be communicated through:

- workflow diagrams
- image transformations
- measurement overlays
- project architecture
- scientific figures
- structured explanation
- software outcomes
- explicit technical contributions

---

# 9. Component rules

## Reuse

Prefer reusable components for:

- navigation
- footer
- page headers
- project cards
- publication entries
- presentation entries
- software cards
- exhibit preview cards
- figure captions
- metadata rows
- buttons
- links
- status labels

Do not create a reusable abstraction for a component used once unless it meaningfully improves clarity.

## Component responsibility

A component should have one clear purpose.

Avoid components that:

- fetch unrelated content
- contain page-specific copy
- mix content parsing with animation
- manage global layout and local card styling simultaneously
- hide scientific values in implementation details

## Props and types

Use explicit TypeScript types.

Avoid:

- `any`
- loosely typed object bags
- duplicated type definitions
- silent fallback values for scientific content

## Styling

Prefer:

- design tokens
- semantic class names
- local component styles
- shared layout primitives
- consistent spacing rules

Avoid:

- scattered hard-coded colors
- repeated magic numbers
- deep selector chains
- `!important`
- inline style objects unless a value is truly dynamic

---

# 10. External exhibit integration

## Portfolio responsibility

The portfolio may register an exhibit using structured metadata.

Suggested fields:

- `title`
- `slug`
- `summary`
- `researchProject`
- `previewImage`
- `previewAlt`
- `externalUrl`
- `featured`
- `visible`

Optional:

- `estimatedExperienceLength`
- `technologies`

## Visibility rule

Do not show an exhibit publicly unless:

- `visible` is true
- the external URL works
- the related project page exists
- the preview image exists
- alt text exists

Do not publish broken placeholder links.

## Preview rule

An exhibit preview may include:

- one representative image
- one short compressed clip
- a brief scientific description
- a clear external link

It must not include:

- the exhibit’s runtime
- the exhibit’s data manifest
- the exhibit’s heavy JavaScript
- the exhibit’s 3D renderer
- full-resolution assets

## Navigation

Every exhibit link should clearly communicate that it opens an interactive experience.

Use descriptive link text such as:

- Explore the Kīlauea exhibit
- Open the model-training walkthrough
- Enter the 3D pyroclast exhibit

Avoid generic labels such as:

- Click here
- Learn more
- Open

unless context makes the destination completely clear.

---

# 11. Media rules

## Approved portfolio media

Use only optimized, web-ready derivatives.

Preferred formats:

- AVIF or WebP for images
- SVG for diagrams
- MP4 or WebM for short video
- compressed PDF for CV
- lightweight poster previews

## Do not commit

- raw camera footage
- uncompressed TIFF stacks
- training datasets
- raw masks
- large notebooks
- model checkpoints
- master meshes
- raw volumetric data
- duplicate assets
- editor caches

## File naming

Use descriptive lowercase filenames with hyphens.

Good:

```text
kilauea-fountain-prediction-overlay.webp
ijen-pyroclast-vesicle-segmentation.webp
agu-2025-poster-preview.webp
```

Avoid:

```text
final2.png
image_0043.png
new-final-use-this.jpg
```

## Dimensions

Provide explicit width and height for images and video containers.

Avoid layout shift.

## Captions

Scientific figures should have captions that explain:

- what is shown
- which layer or method is represented
- whether the result is preliminary
- attribution when required

---

# 12. Performance rules

Performance is part of the site’s credibility.

## Targets

- homepage initial transfer: ideally under 3 MB
- hard target: under 5 MB
- minimal client-side JavaScript
- no exhibit runtime on portfolio pages
- no autoplay 4K video
- no full-resolution research assets
- responsive image sizes
- lazy-load below-the-fold media
- reserve media dimensions to prevent layout shift

## Bundle discipline

Before adding client-side code, ask:

- Can this be static HTML?
- Can this be CSS?
- Can the interaction be removed?
- Can the media be pre-rendered?
- Is the feature necessary to communicate the science?

Do not add a large framework for a minor interaction.

## Heavy feature rule

If a feature materially harms:

- load time
- mobile performance
- readability
- accessibility
- maintainability

simplify it.

---

# 13. Accessibility rules

The portfolio must support:

- semantic landmarks
- logical heading order
- keyboard navigation
- visible focus states
- descriptive links
- meaningful alt text
- figure captions
- sufficient color contrast
- touch targets
- reduced motion
- mobile layouts
- no hover-only information

## Motion

Respect `prefers-reduced-motion`.

When motion is reduced:

- disable nonessential transitions
- remove parallax
- avoid scrubbed effects
- preserve all information
- keep navigation immediate

## Images

Decorative images should use empty alt text.

Scientific images require concise, meaningful alt text and captions.

Do not duplicate the full caption in the alt text.

## External exhibits

Exhibit preview cards must explain the exhibit’s scientific purpose even if the visitor never opens it.

---

# 14. Testing and validation

## Required commands

The repository should provide commands equivalent to:

```text
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
```

Use the actual project commands if names differ.

## Required validation

For every task, run all relevant checks.

At minimum:

- formatting
- linting
- type checking
- production build

Run tests when tests exist for the changed behavior.

## Manual checks

Inspect:

- homepage desktop
- homepage mobile
- navigation keyboard behavior
- changed route desktop
- changed route mobile
- reduced-motion behavior when relevant
- external links
- CV link
- content status labels
- media loading
- visible focus states

## No silent test deletion

Do not remove or weaken tests merely to make the suite pass.

Do not delete accessibility checks because they fail.

Fix the underlying problem.

---

# 15. Git discipline

## Changes

Keep changes focused on the assigned ticket.

Do not combine:

- design overhaul
- content migration
- dependency updates
- architecture refactor
- deployment changes

unless the ticket explicitly includes them.

## Generated files

Do not commit:

- local caches
- build output unless required
- editor files
- temporary exports
- raw media
- secrets
- environment files containing credentials

## Secrets

Never place:

- API keys
- tokens
- private email credentials
- analytics secrets
- deployment secrets

in the repository.

Use environment variables where needed.

## Commit preparation

Before declaring a task ready:

- inspect the diff
- remove accidental changes
- remove debugging output
- remove commented-out experiments
- confirm no large files were added unintentionally

---

# 16. Refactoring rules

Refactor only when:

- the assigned feature requires it
- duplicated logic creates a real maintenance problem
- the current structure blocks implementation
- the task explicitly requests cleanup

Do not refactor because:

- another pattern is personally preferred
- a library could reduce a small amount of code
- the code is unfamiliar
- the project does not match a generic template

When refactoring:

- preserve behavior
- preserve content
- preserve URLs
- preserve accessibility
- add or update tests
- explain the reason

---

# 17. Placeholder rules

Placeholders are allowed during scaffolding, but they must be obvious.

Acceptable:

- `TODO: replace with verified publication metadata`
- `Placeholder image`
- `Draft project summary`

Not acceptable:

- invented scientific metrics
- fake publication names
- fake DOIs
- realistic-looking false data
- fabricated affiliations
- fabricated collaborators
- fabricated dates

Before public deployment, unresolved placeholders must be reported.

---

# 18. Documentation rules

Update documentation when a task changes:

- architecture
- content schema
- repository setup
- environment variables
- deployment
- media workflow
- testing commands
- external exhibit integration

Do not duplicate the same rule across many documents unless needed for agent visibility.

`PROJECT_FOUNDATION.md` defines the product.

`AGENTS.md` defines agent behavior.

Task files under `docs/` define specific implementation work.

---

# 19. Decision hierarchy

When instructions conflict, use this order:

1. The user’s current explicit instruction
2. The current task specification
3. `PROJECT_FOUNDATION.md`
4. `AGENTS.md`
5. Existing repository conventions
6. Framework defaults

Do not override a direct user instruction based on a generic convention.

If a task would violate the foundation, stop and report the conflict rather than silently changing direction.

---

# 20. Completion standard

A task is complete only when:

- the requested behavior exists
- unrelated behavior is preserved
- the design follows the visual system
- content is scientifically accurate
- accessibility is preserved
- mobile behavior is acceptable
- no exhibit implementation entered the portfolio repository
- formatting passes
- linting passes
- type checking passes
- relevant tests pass
- production build passes
- changed files are documented
- verification steps are provided

The goal is not merely to produce code.

The goal is to maintain a credible academic research portfolio that reflects Joel’s scientific identity, computational ownership, and long-term graduate research direction.
