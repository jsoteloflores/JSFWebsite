# Computational Volcanology Portfolio — Project Foundation

**Document status:** Canonical product and design brief  
**Project scope:** Main academic portfolio only  
**Intended audience:** Joel Sotelo Flores and any coding agent working in the portfolio repository  
**Purpose:** Define the portfolio’s goals, visual identity, content architecture, technical boundaries, and relationship to separate interactive exhibits  
**Important:** This document does not authorize implementation of the interactive exhibits

---

## 1. Project summary

Build a visually distinctive academic research portfolio for **Joel Sotelo Flores**, an undergraduate researcher working at the intersection of:

- physical volcanology
- computational geoscience
- computer vision
- scientific software
- physics-based analysis
- quantitative image and video interpretation

The portfolio will be maintained in a public GitHub repository, deployed through Vercel, and connected to a custom domain.

The portfolio is the stable center of Joel’s online research presence. It must:

- introduce Joel as a scientist
- explain his research direction
- present publications and manuscripts accurately
- present talks, posters, abstracts, and software
- provide a current downloadable CV
- make contact information easy to find
- communicate substantial computational ability
- provide concise previews of separate interactive research exhibits
- link to those exhibits when they exist

The portfolio itself is **not** the implementation environment for the interactive exhibits.

The following will be built as separate projects:

1. Kīlauea: Observation to Measurement
2. Inside the Segmentation Model
3. Inside a Pyroclast

Each exhibit may have its own repository, framework, dependencies, assets, tests, deployment, and project documentation.

The portfolio should feel complete without any exhibit being available. Exhibits are optional extensions of the research story, not dependencies of the base website.

---

## 2. Portfolio and exhibit boundary

### 2.1 The portfolio owns

The main portfolio repository owns:

- global identity and branding
- homepage
- About page
- research overview
- project case studies
- publications
- presentations
- software summaries
- downloadable CV
- professional links and contact information
- static scientific figures
- lightweight media previews
- exhibit preview cards
- outbound links to completed exhibits
- search metadata
- social preview metadata
- core accessibility and responsive behavior

### 2.2 Separate exhibit projects own

An exhibit repository owns its own:

- narrative structure
- interaction model
- state management
- animation system
- 3D renderer
- specialized media
- data manifests
- scientific visualization logic
- performance budget
- browser compatibility testing
- exhibit-specific accessibility
- deployment
- technical documentation
- agent instructions

The portfolio must not import an exhibit’s runtime bundle or source code.

An exhibit should be linked as an external destination, even if it uses the same domain family.

### 2.3 Relationship between projects

The portfolio and exhibits should appear visually related, but they should remain technically independent.

The intended relationship is:

```text
Main portfolio
├── Introduces the research
├── Provides concise project case studies
├── Shows publications and outputs
├── Previews interactive exhibits
└── Links outward to separate exhibit applications

Interactive exhibits
├── Explore one research process in depth
├── Use richer interaction and heavier media
├── Maintain their own code and assets
└── Link back to the portfolio
```

No formal “release cycle” is required. An exhibit is simply linked from the portfolio once it is ready and publicly available.

---

## 3. Primary audience

The highest-priority visitors are:

1. Potential PhD advisors in volcanology, geophysics, geoscience, remote sensing, hazards, and computational Earth science
2. Graduate admissions committee members
3. Research collaborators
4. Conference attendees following up after a presentation
5. Scientists evaluating Joel’s software, publications, or research trajectory

Secondary visitors may include:

- fellowship and internship reviewers
- other students
- scientific software users
- professional contacts
- industry researchers

The site should assume that an advisor may:

- arrive from an email signature, CV, poster, application, or search result
- spend only 20–60 seconds on the homepage
- open the website on a phone
- jump directly to publications or the CV
- inspect one project in depth
- evaluate whether Joel understands the science, the computation, and his own contribution
- choose not to open an interactive exhibit

The portfolio must make a strong case even when the visitor never leaves the main site.

---

## 4. Core impression

Within the first 20 seconds, the portfolio should communicate:

> Joel is a computationally capable volcanology researcher who builds complete scientific workflows—from observation and data preparation through machine learning, measurement, interpretation, and publication.

Within several minutes, it should demonstrate:

- a coherent research trajectory
- technical depth without unnecessary jargon
- ownership of substantial scientific software
- understanding of model training and inference
- ability to translate imagery into physical measurements
- experience across fieldwork, laboratory data, computation, and scientific communication
- a clear direction toward graduate study in physical and computational volcanology

The portfolio must show competence through:

- information architecture
- precise scientific writing
- strong project explanations
- high-quality figures
- coherent visual design
- thoughtful interaction
- accurate research status
- explicit personal contributions

It should not rely on exaggerated claims, decorative code, or a long list of software names.

---

## 5. Product principles

### 5.1 The portfolio must stand alone

The site must be complete and persuasive without the interactive exhibits.

Every research project represented by an exhibit must also have a readable project page containing:

- the scientific question
- motivation
- data
- method
- Joel’s contribution
- results or current progress
- limitations
- outputs
- future direction

The exhibit may deepen that explanation, but it may not replace it.

### 5.2 Science comes first

Every visual effect in the portfolio should support:

- scientific context
- a data transformation
- a physical measurement
- a research result
- Joel’s contribution
- navigation or comprehension

Animation that exists only to appear modern should be removed.

### 5.3 Show systems, not software logos

Do not present computational ability primarily through rows of language, framework, or software logos.

Instead, show connected workflows such as:

**Video archive → frame selection → labeling → temporal segmentation → measurement → scientific analysis**

or:

**Micro-CT volume → segmentation → pore geometry → network analysis → permeability interpretation**

Tools may be named where relevant, but the system and scientific purpose are more important than brand names.

### 5.4 Distinguish scientific status precisely

The portfolio must clearly differentiate:

- published
- accepted
- in review
- submitted
- in preparation
- conference abstract
- poster presentation
- oral presentation
- software release
- archived dataset

Never imply that a manuscript is published when it is not.

### 5.5 Make Joel’s contribution explicit

Every major project page must explain what Joel personally:

- designed
- implemented
- labeled
- collected
- analyzed
- validated
- wrote
- presented
- maintained

Avoid vague team language that obscures authorship or ownership.

### 5.6 Progressive enhancement

All essential portfolio information must remain accessible without:

- autoplay video
- scroll animation
- WebGL
- pointer hover
- high-end hardware
- JavaScript-heavy interaction
- access to external exhibit sites

### 5.7 Calm precision over visual noise

The site may be visually ambitious, but it must remain readable, deliberate, and controlled.

No element should constantly demand attention.

---

## 6. Non-negotiable visual direction

### 6.1 General atmosphere

The visual character should combine:

- volcanic darkness
- mineral warmth
- scientific precision
- restrained cinematic motion
- high-resolution imagery
- clean typography
- layered depth
- measured transparency
- contrast between observation and analysis

The portfolio may conceptually move between two visual modes.

#### Observation mode

Used for field imagery, eruption footage, sample photography, and major introductions.

Characteristics:

- dark
- atmospheric
- photographic
- large scale
- minimal interface chrome
- slow or static environmental depth

#### Analysis mode

Used for masks, diagrams, measurements, publication lists, and technical explanation.

Characteristics:

- precise
- structured
- line-based
- high contrast
- restrained annotation
- explicit labels and units

The transition from observation to analysis should reflect Joel’s scientific workflow.

### 6.2 Color palette

Do not use blue as a principal, secondary, or decorative accent.

Recommended initial tokens:

| Role                       | Token                  | Initial value |
| -------------------------- | ---------------------- | ------------: |
| Deep background            | `--color-obsidian`     |     `#08090A` |
| Elevated background        | `--color-basalt`       |     `#141619` |
| Secondary surface          | `--color-charcoal`     |     `#1D2023` |
| Primary text               | `--color-ivory`        |     `#F3EFE7` |
| Secondary text             | `--color-ash`          |     `#AAA69E` |
| Subdued line               | `--color-stone`        |     `#595B5D` |
| Primary accent             | `--color-wine`         |     `#79242F` |
| Active accent              | `--color-oxidized-red` |     `#B64A3A` |
| Warm secondary accent      | `--color-sandstone`    |     `#AA9767` |
| Rare measurement highlight | `--color-sulfur`       |     `#D6B85E` |

These values may be refined while preserving the same visual relationships.

Rules:

- Warm ivory carries most readable text.
- Deep wine defines identity.
- Oxidized red indicates active states, segmentation boundaries, or important transitions.
- Sandstone supports metadata and quiet emphasis.
- Sulfur is rare and reserved for meaningful measurement highlights.
- Bright white should not dominate.
- Avoid rainbow palettes unless a real scientific variable requires one.
- Prefer opacity, line style, pattern, shape, and labeling before introducing unrelated colors.

### 6.3 Typography

Use three typographic roles:

1. **Display sans**
   - major statements
   - section introductions
   - project titles
   - short phrases

2. **Readable sans**
   - body text
   - publication entries
   - project explanations
   - navigation

3. **Monospace, used sparingly**
   - dimensions
   - frame rates
   - metric labels
   - model metadata
   - structured scientific annotation

The site must not use monospace as the default body font.

### 6.4 Prohibited design motifs

Do not add:

- raw code blocks as decoration
- fake terminal windows
- fake command prompts or logs
- syntax-highlighted code as visual texture
- blue neon
- cyberpunk styling
- glowing cursor trails
- custom cursors
- matrix-style characters
- fake boot sequences
- long loading intros
- glassmorphism on every surface
- floating software logos
- gratuitous 3D text
- constant background animation
- scroll hijacking
- hidden navigation for dramatic effect

Computational ability should be demonstrated through scientific systems and visual explanation, not developer-themed decoration.

---

## 7. Site structure

### 7.1 Homepage

Purpose:

- establish Joel’s identity
- introduce the research direction
- demonstrate computational depth quickly
- direct visitors toward research, publications, CV, contact, and optional exhibits

Core sections:

1. Hero and research identity
2. Concise research statement
3. Research themes
4. Featured projects
5. Selected publications and presentations
6. Interactive exhibit previews
7. About preview
8. Graduate research direction
9. CV and contact call to action

The homepage may contain lightweight visual transformations or short media, but it must not embed the full exhibit applications.

### 7.2 Research index

Purpose:

- organize work by scientific question
- connect projects into a coherent trajectory
- avoid presenting research merely as a list of positions

Potential themes:

- extracting eruption dynamics from imagery
- reconstructing eruptive processes from volcanic materials
- building reproducible scientific software
- applying physics and computation to inaccessible systems

### 7.3 Individual project pages

Initial major projects:

1. Kīlauea lava fountain segmentation and measurement
2. Ijen pyroclast stereology, segmentation, and pore structure
3. Selected computational astronomy or physics work

Each project page should support:

- scientific question
- context and motivation
- dataset
- technical challenge
- method
- workflow diagram
- Joel’s contribution
- results or current progress
- limitations
- significance
- related publications
- related presentations
- related software
- future work
- optional link to a separate interactive exhibit

### 7.4 Publications and research outputs

Support grouping or filtering by:

- journal articles
- manuscripts
- conference abstracts
- oral presentations
- posters
- software
- datasets

Entries should support:

- full title
- ordered authors
- Joel’s name emphasized
- year
- venue
- type
- status
- DOI
- external URL
- PDF where legally shareable
- related project
- short contribution note where useful

### 7.5 Presentations

Entries should support:

- title
- authors
- event
- location
- date
- presentation type
- abstract
- poster or slide preview
- downloadable file where permitted
- related project
- Joel’s role

### 7.6 Software

Software should be presented through what it enables scientifically.

Each entry may include:

- problem addressed
- role in the research workflow
- major capabilities
- Joel’s contribution
- current status
- screenshots
- repository
- DOI
- related projects
- related outputs

### 7.7 About

The About page should be personal but research-focused.

It should cover:

- double major in Physics and Earth and Environmental Geoscience
- route into computational volcanology
- interest in dynamic physical systems
- relationship between field observation, computation, and interpretation
- research philosophy
- current academic stage
- intended PhD direction
- professional photograph or field image

It should not read like a pasted statement of purpose.

### 7.8 CV

The current CV should be:

- directly downloadable
- clearly dated or versioned
- easy to locate from every page
- stored as a lightweight PDF
- accompanied by an accessible text label

### 7.9 Contact

Primary pathways:

- academic email
- GitHub
- LinkedIn
- CV

A contact form is not required.

### 7.10 Exhibits index or exhibit section

The site may include either:

- a dedicated Exhibits page, or
- an exhibit section within Research

Each exhibit preview should include:

- title
- concise scientific purpose
- representative static image or lightweight preview
- related research project
- external URL
- clear indication that it opens a separate interactive experience

Do not show a broken or placeholder external link.

---

## 8. External exhibit integration contract

The portfolio needs a simple, maintainable way to register external exhibits without bundling them.

A structured exhibit entry should support:

- `title`
- `slug`
- `summary`
- `researchProject`
- `previewImage`
- `previewAlt`
- `externalUrl`
- `estimatedExperienceLength`, if useful
- `featured`
- `visible`
- `technologies`, only if contextually useful

An exhibit should appear publicly only when:

- `visible` is true
- a working external URL exists
- the preview image and alt text exist
- the linked research project page is available

No status ladder or formal release-cycle model is required.

### 8.1 Shared visual contract

Separate exhibits should generally preserve:

- Joel’s name treatment
- logo or monogram
- core color family
- typography family
- button and link language
- accessible focus behavior
- link back to the main portfolio
- consistent scientific tone

They do not need to share a package or component library initially.

Shared code should be extracted only after repeated implementation proves that it is genuinely useful.

### 8.2 Link behavior

Exhibit links should:

- clearly identify the destination as interactive
- remain accessible by keyboard
- use descriptive text
- avoid surprise downloads
- preserve a clear route back to the portfolio
- open in the same tab unless there is a deliberate usability reason not to

---

## 9. Technical architecture

### 9.1 Core stack

Use:

- Astro
- TypeScript with strict checking
- Astro content collections
- CSS custom properties for design tokens
- component-scoped or modular CSS
- minimal client-side JavaScript
- React only if a specific lightweight portfolio component genuinely requires it
- Vercel for deployment
- GitHub for source control

The main portfolio should not install Three.js, React Three Fiber, GSAP, or other exhibit-focused dependencies unless a separate portfolio feature independently justifies them.

Do not convert the portfolio into a React single-page application.

### 9.2 Architectural rules

1. Static content should render through Astro.
2. Publications, presentations, projects, software, and exhibits must use structured content.
3. The portfolio must not import exhibit source code or runtime bundles.
4. Heavy media should be route-specific and lazy-loaded.
5. Content must remain separate from layout logic.
6. Scientific values must not be fabricated.
7. Dependencies require a clear reason.
8. The production build must pass after every completed ticket.
9. Exhibit-specific implementation belongs in exhibit repositories.
10. Portfolio agents must not begin work in another repository unless explicitly instructed.

### 9.3 Suggested repository structure

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
└── README.md
```

The `components/exhibits/` directory contains only portfolio preview components, not exhibit implementations.

---

## 10. Content architecture

### 10.1 Projects

Each project record should support:

- slug
- title
- subtitle
- short summary
- date range
- status
- research themes
- methods
- tools
- collaborators
- advisor
- institutions
- featured image
- media gallery
- scientific question
- motivation
- data
- challenges
- method
- Joel’s contribution
- results
- limitations
- significance
- future work
- related publications
- related presentations
- related software
- related exhibit
- external links

### 10.2 Publications

Each publication record should support:

- slug
- title
- authors in order
- Joel author-position indicator
- year
- venue
- type
- status
- DOI
- URL
- PDF
- abstract
- citation
- related project
- featured status

### 10.3 Presentations

Each presentation record should support:

- slug
- title
- authors
- date
- event
- location
- type
- abstract
- poster or slides
- thumbnail
- related project
- contribution
- external URL

### 10.4 Software

Each software record should support:

- name
- summary
- scientific problem
- capabilities
- role in research pipeline
- status
- repository
- DOI
- documentation
- screenshots
- related projects
- languages and frameworks

### 10.5 Exhibits

Each exhibit record should support the fields defined in the external exhibit integration contract.

The portfolio’s exhibit content should describe:

- what scientific process the exhibit explores
- why the interaction adds value
- which project it belongs to

It should not duplicate the exhibit’s full internal specification.

---

## 11. Media and data policy

### 11.1 Appropriate portfolio assets

Appropriate for the portfolio repository:

- source code
- text
- SVG diagrams
- compressed website images
- lightweight short videos
- project preview images
- exhibit preview images
- JSON or content manifests
- CV PDF
- poster thumbnails
- social preview images
- small test fixtures

Do not commit:

- raw 4K footage
- full training datasets
- source-resolution mask archives
- model checkpoints
- raw Micro-CT volumes
- master meshes
- exhibit asset libraries
- unpublished collaborator data without permission
- generated caches
- duplicate exports

### 11.2 Public-sharing review

Before publishing a scientific asset, confirm:

- Joel has permission to share it
- it does not expose restricted footage
- it does not reveal collaborator results improperly
- it is not under journal embargo
- attribution is correct
- captions distinguish preliminary and final results
- metadata does not reveal sensitive information unintentionally

### 11.3 Storage strategy

Initial portfolio:

- store optimized assets in `public/`
- keep the repository and deployment lightweight
- lazy-load project-specific media

As the asset library grows:

- use object storage or a suitable CDN
- preserve stable asset URLs
- maintain an asset manifest
- keep full datasets in scientific repositories
- keep heavy exhibit assets with their exhibit projects

The portfolio demonstrates and links to research data; it is not the primary archive.

---

## 12. Performance requirements

Performance is part of the portfolio’s credibility.

Initial targets:

- homepage initial transfer ideally under 3 MB
- hard target under 5 MB
- no autoplay 4K media
- no exhibit runtime downloaded by portfolio visitors
- optimized image formats
- poster frames for video
- minimal JavaScript on content pages
- responsive images
- explicit media dimensions
- no large layout shifts
- exhibit previews loaded only when near the viewport if necessary

A visually ambitious feature that performs poorly should be simplified.

---

## 13. Accessibility requirements

The portfolio must support:

- keyboard navigation
- visible focus states
- semantic headings
- descriptive link text
- alt text
- scientific figure captions
- sufficient contrast
- reduced-motion preferences
- touch interaction
- mobile layouts
- controls that do not depend on hover
- nonanimated fallback presentation

Exhibit preview cards must explain the exhibit’s subject without requiring the visitor to open it.

---

## 14. Motion principles

Motion in the portfolio should communicate hierarchy or transformation.

Appropriate uses:

- restrained mask reveal in a project preview
- subtle transition from footage to contour
- a diagram assembling as it enters view
- project media crossfades
- clear page transitions that do not delay navigation

Inappropriate uses:

- constant floating
- decorative card bouncing
- dramatic transitions that block access
- text moving while being read
- scroll locking
- autoplay stories with no controls
- simulated exhibit behavior inside the main site

The main portfolio may preview an exhibit’s concept, but it should not recreate the full experience.

---

## 15. Search, metadata, and academic credibility

The portfolio should eventually include:

- page titles and descriptions
- canonical URLs
- Open Graph metadata
- social preview images
- sitemap
- robots.txt
- meaningful URLs
- publication metadata
- descriptive image filenames
- accessible PDF links
- domain and email links once finalized

Avoid inflated marketing language.

Prefer:

- direct scientific claims
- explicit contributions
- concrete methods
- careful status labels
- measurable outputs
- honest limitations

---

## 16. Initial portfolio scope

The first deployable portfolio should include:

- polished responsive shell
- homepage
- research overview
- at least two major project pages
- publications
- presentations
- software section
- About
- downloadable CV
- contact links
- structured content collections
- static scientific media
- exhibit content schema
- exhibit preview component
- preview deployment

It does not require any completed external exhibit.

Exhibit cards may remain absent until a working exhibit URL exists.

---

## 17. Portfolio implementation sequence

### Phase 1 — Foundation

- initialize repository
- configure Astro and strict TypeScript
- establish design tokens
- build responsive site shell
- configure formatting, linting, tests, and production build

### Phase 2 — Content system

- define content schemas
- add projects
- add publications
- add presentations
- add software
- add exhibit link schema

### Phase 3 — Static portfolio

- homepage
- research index
- project pages
- publications
- presentations
- software
- About
- CV
- contact and footer

### Phase 4 — Visual refinement

- real imagery
- diagrams
- restrained motion
- responsive media
- social previews
- accessibility refinement
- performance refinement

### Phase 5 — Deployment

- GitHub repository
- Vercel project
- preview deployments
- metadata
- custom domain
- final browser testing

Separate exhibit development is not part of this sequence.

---

## 18. Agent workflow rules

Any coding agent working in the portfolio repository must:

1. Read this document before proposing architecture or design.
2. Work on one clearly defined ticket at a time.
3. Inspect the repository before editing.
4. Avoid unrelated redesigns and refactors.
5. State assumptions.
6. Preserve existing architecture unless the ticket explicitly changes it.
7. Avoid new dependencies without explanation.
8. Never fabricate scientific values.
9. Never add blue accents.
10. Never introduce raw code blocks, terminals, fake logs, or code-editor motifs into the visual design.
11. Keep content separate from layout and interaction code.
12. Preserve reduced-motion and mobile behavior.
13. Run formatting, linting, tests, and the production build.
14. List modified files and manual verification steps.
15. Stop after the assigned ticket is complete.
16. Never implement an external exhibit in this repository.
17. Never add exhibit-specific heavy dependencies merely to create a preview.
18. Never modify an exhibit repository unless the user explicitly assigns work in that repository.

The agent must not interpret this document as permission to implement the entire portfolio in one pass.

---

## 19. Separate exhibit documentation

Each exhibit will eventually receive its own independent documentation set.

Example:

```text
kilauea-observation-exhibit/
├── PROJECT_SPEC.md
├── AGENTS.md
├── CONTENT_AND_DATA.md
└── IMPLEMENTATION_PLAN.md
```

Possible exhibit projects:

```text
kilauea-observation-exhibit
segmentation-model-exhibit
pyroclast-3d-exhibit
```

Those documents may reference the portfolio’s visual identity but must define their own:

- scientific narrative
- content requirements
- data manifests
- technical stack
- accessibility
- media pipeline
- performance constraints
- agent tasks

No exhibit specification should be added to the portfolio repository merely for convenience.

---

## 20. Definition of success

The portfolio succeeds when:

- an advisor understands Joel’s research identity quickly
- publications and CV are immediately accessible
- the computational work feels real and substantial
- project pages explain complete scientific workflows
- Joel’s personal contributions are unmistakable
- publication statuses are precise
- the site works well on mobile
- the site remains fast without exhibit runtime code
- external exhibits feel connected without being technically entangled
- Joel can update academic content without rebuilding the interface
- the design feels specific to Joel’s research rather than copied from a portfolio template

The intended final impression is:

> This is a developing scientist with a coherent physical-volcanology research program, strong computational ownership, and the ability to build tools that turn difficult observations into reproducible scientific measurements.
