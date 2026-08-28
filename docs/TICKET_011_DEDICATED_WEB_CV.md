# Ticket 011 — Dedicated Web CV and Public PDF Download

## Objective

Add a dedicated `/cv` route to the portfolio and expose it as a primary navigation tab.

The CV page should serve two purposes:

1. Give prospective graduate advisors a fast, browser-readable overview of Joel Sotelo Flores's academic record.
2. Provide a clear download link to the current PDF CV.

The web page should **not** simply embed the PDF.

It should adapt the CV into the existing light editorial visual system and connect relevant entries to the deeper Research, Publications, and other site pages.

---

# 1. Public PDF

The approved downloadable PDF should exist at:

```text
public/cv/Joel_Sotelo_Flores_CV.pdf
```

Before implementation, verify that exact path exists.

Public URL:

```text
/cv/Joel_Sotelo_Flores_CV.pdf
```

Do not:

- rename the source PDF unless necessary
- embed the PDF in an iframe
- render a browser PDF viewer as the CV page
- generate a second PDF
- modify the PDF contents during this ticket

The web CV and PDF are complementary.

---

# 2. Navigation

Update:

```text
src/utils/navigation.ts
```

Current order:

```text
Home
Research
Publications
Presentations
Software
About
```

New order:

```text
Home
Research
Publications
Presentations
Software
CV
About
```

Add:

```ts
{ label: 'CV', href: '/cv' }
```

immediately before About.

The existing sticky navigation behavior, current-page styling, hover behavior, and responsive wrapping should continue to work.

`/cv` must correctly receive:

```html
aria-current="page"
```

when active.

---

# 3. Route

Create:

```text
src/pages/cv.astro
```

Page metadata:

```text
Title: Curriculum Vitae
```

Suggested description:

> Curriculum vitae for Joel Sotelo Flores, an undergraduate researcher in computational and physical volcanology at Washington and Lee University.

Do not invent canonical URLs yet unless the production domain is already configured.

---

# 4. Page purpose and tone

The CV page is intended primarily for:

- prospective PhD advisors
- graduate admissions readers
- scientific collaborators
- conference/research contacts

Tone should be:

- factual
- concise
- scholarly
- easy to skim
- restrained

Do not add promotional introduction copy such as:

```text
A driven interdisciplinary scientist...
An accomplished young researcher...
A proven record of...
```

The record should speak for itself.

---

# 5. Opening composition

Use the existing editorial visual system.

Preferred top structure:

```text
CURRICULUM VITAE

Joel Sotelo Flores

Physics · Earth & Environmental Geoscience
Washington and Lee University
Expected June 2027
Lexington, Virginia

[ Download PDF ]
```

Optional secondary links may include:

```text
Email
GitHub
LinkedIn
```

Do not duplicate the entire site footer here.

## Download button

Provide one prominent action:

```text
Download PDF ↓
```

Link:

```text
/cv/Joel_Sotelo_Flores_CV.pdf
```

Use the existing primary-button visual language.

Prefer:

```html
<a href="/cv/Joel_Sotelo_Flores_CV.pdf" download></a>
```

If browser behavior does not consistently force download, the link may still open the PDF normally; that is acceptable.

The important requirement is that the destination is obvious.

---

# 6. Data architecture

Do **not** hard-code the entire CV directly into `cv.astro`.

Create a structured CV-specific data layer.

Suggested:

```text
src/data/cv.ts
```

The CV data should contain material that is genuinely CV-specific, including:

- CV research-role titles
- research-experience bullets
- manuscripts not yet represented in the publication collection
- conference abstracts submitted
- awards/fellowships/scholarships
- research training
- teaching and mentoring

Where an existing project or publication already exists in the site's typed content collections, prefer referencing its stable ID rather than duplicating facts unnecessarily.

Example concept:

```ts
type CvResearchExperience = {
  roleTitle: string;
  projectId?: string;
  startDate: string;
  endDate?: string;
  bullets: string[];
};
```

The page may resolve institution, advisor, and project URL from the project collection when `projectId` is present.

Avoid maintaining two independent copies of the same title/status/date where the current content architecture can provide it safely.

---

# 7. Education

Render:

```text
Education
```

Include:

- Washington and Lee University
- B.S. Physics
- B.S. Earth and Environmental Geoscience
- Expected June 2027
- honors thesis
- relevant coursework
- study abroad

The current CV identifies the honors thesis as:

> PyRo-FOAMS: An open-source workflow for automated vesicle segmentation and stereological analysis. fileciteturn65file0L5-L13

Preserve that wording unless the repository's newer authoritative source explicitly supersedes it.

Do not show GPA.

## Coursework

Do not turn each course into a pill.

Use compact editorial text or a multi-column list.

---

# 8. Research Experience

Render all six research experiences from the current CV:

1. NSF REU — Computer Vision in Physical Volcanology
2. Machine Learning for Micro-CT in Physical Volcanology
3. Pulsating Star Astronomy
4. Double Star Astrometry
5. Nanotechnology and Particle Physics
6. AIM Research Scholar — Computational Number Theory

The current CV documents the Kīlauea and Ijen roles and their research activities in detail. fileciteturn65file0L14-L34

## Presentation

Each experience should use:

```text
Role title                                      Date range
Institution · Location
Advisor

• concise contribution
• concise contribution
• concise contribution

View research →
```

where a corresponding site project exists.

For the six existing project entries, link to the appropriate `/research/{id}` page.

## Web adaptation

Do not necessarily reproduce every PDF bullet word-for-word.

The web version may reduce each experience to approximately:

```text
2–4 bullets
```

provided the meaning and factual scope are preserved.

Prioritize:

- scientific focus
- methods
- personal contribution
- research outputs/workflow

Do not embellish.

---

# 9. Publications and Manuscripts

Create one major section:

```text
Publications & Manuscripts
```

with clear status subsections.

## 9.1 Peer-Reviewed Publications

Render the verified JDSO publication using the existing publication collection/component wherever practical.

Do not duplicate its citation manually if the existing publication record already contains the authoritative metadata.

## 9.2 Manuscripts Under Review

Render:

> Sukow, D. W., Sotelo Flores, J., Nagy, J., & Freed, R. “BViz Photometric Distance to the RR Lyrae Star V0499 Centauri.” Submitted to the Journal of the American Association of Variable Star Observers.

Status label:

```text
Under review
```

The current CV explicitly places this work under Manuscripts Under Review. fileciteturn65file0L69-L71

Do not move this manuscript into the main Publications collection unless that collection's completeness rules have separately been satisfied.

## 9.3 Manuscripts in Preparation

Include the two current volcano manuscripts listed in the CV:

### PyRo-FOAMS

Current CV wording identifies:

> Sotelo Flores, J., Barber, N. D. “PyRo-FOAMS: An open-source workflow for automated vesicle segmentation and stereological analysis.” Planned submission to Volcanica.

### Kīlauea

Current CV lists the Kīlauea manuscript with its current author list and planned submission to the Journal of Applied Volcanology. fileciteturn65file0L72-L77

Render status explicitly as:

```text
In preparation
```

Do not present either as:

- submitted
- under review
- accepted
- forthcoming

unless the authoritative status changes later.

---

# 10. Status hierarchy

The visual hierarchy must clearly distinguish:

```text
Published
Under review
In preparation
```

Use restrained text/status labels.

Do not use bright warning-style badges.

A prospective advisor should be able to distinguish publication stage immediately.

---

# 11. Software and Research Products

Create:

```text
Software & Research Products
```

Include:

- Kīlauea Lava Fountain Segmentation and Labeling Pipeline
- PyRo-FOAMS

The current CV describes both as research software without placeholder DOI values. fileciteturn65file0L78-L80

Do not add:

- DOI links
- Zenodo links
- repository links

unless those destinations are actually public and verified.

Where useful, link the software name or accompanying `Related research →` link to its corresponding research project.

Do not add these entries to the main Software collection merely because they appear on the CV page. That collection remains governed by its own publication/readiness rules.

---

# 12. Presentations

Create:

```text
Presentations
```

Include confirmed presentation records:

### AGU 2025 poster

The Ijen poster.

### Montréal 2026 oral presentation

The Ijen Caldera Complex oral presentation.

Use the metadata in the public CV, but do not reproduce the accidental duplicate comma if it remains in the PDF.

Do not silently invent a missing official conference title.

If the CV currently only supports:

```text
Oral presentation, Palais des congrès de Montréal, Montréal, Canada
```

use that.

---

# 13. Conference Abstracts Submitted

Create a separate subsection:

```text
Conference Abstracts Submitted
```

Include:

- Kīlauea computer-vision AGU 2026 abstract
- pyroclastic micro-CT AGU 2026 abstract

The current CV explicitly identifies both as abstracts submitted to the American Geophysical Union Fall Meeting. fileciteturn65file0L89-L95

Do not list these under Presentations as completed presentations.

Status should be unmistakable:

```text
Abstract submitted
```

Once accepted, these records can later migrate to the site's Presentations collection.

---

# 14. Awards, Fellowships, and Scholarships

Include:

- R. Preston Hawkins IV Geology Field Research Award — April 2026
- Samuel J. Kozak–Odell S. McGuire–Edgar W. Spencer L. Schwab Geology Lab Research Award — April 2025
- U.S. Department of State Gilman Scholar — January 2024
- QuestBridge Scholar — March 2023

These are listed in the current CV. fileciteturn65file0L96-L102

Use a simple editorial list:

```text
R. Preston Hawkins IV Geology Field Research Award        Apr 2026
...
```

Do not create separate cards.

---

# 15. Research Training and Scientific Programs

Include:

### Green Bank Observatory ERIRA Program

August 2025

### Michigan State Nuclear Science Summer School

May 2025

Preserve the current CV's scientific scope and concise bullet descriptions. fileciteturn65file0L103-L113

Use fewer bullets on the web if necessary.

---

# 16. Teaching and Mentoring

Include:

### Physics and Astronomy Teaching Assistant

September 2024 – December 2025

### AIM Program Advisor

June 2025 – July 2025

The current CV documents both roles and their responsibilities. fileciteturn65file0L114-L126

Keep this section below research/training.

The site is aimed at prospective research advisors, so Research Experience and Scholarly Output should remain visually more prominent.

---

# 17. Web CV hierarchy

Recommended final order:

```text
Curriculum Vitae

Download PDF

Education

Research Experience

Publications & Manuscripts
    Peer-Reviewed Publications
    Manuscripts Under Review
    Manuscripts in Preparation

Software & Research Products

Presentations
    Completed Presentations
    Conference Abstracts Submitted

Awards, Fellowships & Scholarships

Research Training & Scientific Programs

Teaching & Mentoring
```

Do not move Technical Skills above Research Experience even if technical skills are later added.

---

# 18. Technical skills

The current supplied PDF does not contain a separate Technical Skills section.

Do not invent one in this ticket.

If the user later supplies an approved technical-skills section, it can be added.

Research project methods/tools are already represented elsewhere on the site.

---

# 19. Visual design

The CV page should feel more like a scholarly document than a collection of website cards.

Use:

- warm page canvas
- editorial serif section headings
- dark text
- wine-red interaction
- thin rules
- dates aligned consistently
- generous but not excessive whitespace
- reading/content widths appropriate to dense academic material

Avoid:

- large hero photography
- project imagery
- decorative contour motifs
- cards for every experience
- pill tags
- icons beside every section
- timeline graphics

This page should be deliberately quieter than the homepage.

---

# 20. Two-column opportunities

Desktop may use controlled two-column layouts for compact information.

Good uses:

```text
entry title / institution                  date
```

or:

```text
main CV content              small section navigation
```

Do not use a narrow sticky sidebar if it makes the page feel cramped.

A single flowing editorial document is acceptable and may be preferable.

---

# 21. Optional in-page section navigation

A small static section index near the top may be added if it materially improves scanning:

```text
Education
Research
Publications
Software
Presentations
Awards
Training
Teaching
```

If implemented:

- native anchor links only
- no JavaScript
- no scrollspy
- accessible focus behavior

This is optional.

---

# 22. Existing site relationships

Where an item already has a deeper site page, use restrained links.

Examples:

```text
View research →
View publication →
```

Relevant research experiences should connect to their project case studies.

Do not overload every CV line with links.

---

# 23. PDF and web-page consistency

The web CV does not need to duplicate every PDF line exactly, but it must not contradict the PDF.

Create a test or validation layer where practical for stable facts such as:

- degree names
- expected graduation
- major role dates
- award dates

The web page may intentionally omit detail.

It must not change meaning.

---

# 24. CV data documentation

Create:

```text
docs/CV_DATA_MODEL.md
```

Document:

- what comes from `profile.ts`
- what comes from project collections
- what comes from publication collections
- what is CV-specific
- how under-review/in-preparation records are handled
- how submitted conference abstracts are handled
- how to update the PDF path
- how to promote an item when its status changes

This is important because these records will evolve rapidly over the next application cycle.

---

# 25. Profile CV path

The original profile deliberately omitted a public CV path.

Now that an approved public PDF exists, add an explicit field to `profile.ts`, for example:

```ts
cvPath: '/cv/Joel_Sotelo_Flores_CV.pdf';
```

Update the Profile interface accordingly.

Use this value rather than duplicating the PDF URL across components.

Do not automatically add CV-download buttons elsewhere across the site in this ticket.

The dedicated CV page and nav tab are sufficient.

---

# 26. Tests

Add or update tests verifying:

- `/cv` exists
- CV appears in navigation
- CV appears immediately before About
- `/cv` receives active navigation state
- public PDF path exists
- Download PDF link resolves to `profile.cvPath`
- Education renders
- all six research experiences render
- peer-reviewed publication renders
- under-review subsection renders
- in-preparation subsection renders
- both in-preparation volcano manuscripts render
- Software & Research Products renders
- completed presentations render
- Conference Abstracts Submitted renders
- both submitted AGU abstracts render
- awards render
- training renders
- teaching/mentoring renders
- no iframe exists
- no PDF embed exists
- no client-side JavaScript is introduced

---

# 27. Site verification

Update `site:verify` so the expected static route count includes:

```text
/cv/
```

If the site previously generated 12 HTML pages, it should now generate:

```text
13
```

unless other routes have changed since that count was established.

Do not hard-code the count blindly; inspect the current expected set first.

Also verify:

```text
dist/cv/index.html
```

and the copied public PDF.

---

# 28. Responsive behavior

Test:

```text
320
375
768
1024
1440
1600
```

At mobile widths:

- dates wrap cleanly
- long manuscript titles remain readable
- author lists do not overflow
- Download PDF remains obvious
- navigation still works with the new tab
- no horizontal scrolling

At desktop:

- dense CV sections use horizontal space efficiently
- lines do not become excessively long
- dates align consistently
- page remains easy to skim

---

# 29. Accessibility

Required:

- one H1
- logical H2/H3 hierarchy
- section IDs for major CV sections
- obvious keyboard focus
- Download PDF link has clear accessible name
- external links identify themselves by context
- dates are text, not CSS-generated content
- status distinctions do not rely only on color
- no iframe
- no hidden PDF viewer

---

# 30. Do not change other scholarly pages

This ticket adds a CV page.

Do not use it as an excuse to populate:

```text
/publications
/presentations
/software
```

with records that those collections currently exclude.

The CV can be more inclusive because it explicitly communicates status.

The dedicated scholarly pages continue to follow their existing verification/completeness rules.

---

# 31. Do not modify research case studies

Do not alter:

- Kīlauea project
- Ijen project
- project-page media
- project copy
- visual motifs
- homepage

except where a small link to the new CV is already structurally required by navigation.

---

# 32. Documentation updates

Update:

```text
README.md
docs/PAGE_ARCHITECTURE.md
docs/CONTENT_COMPONENTS.md
```

Create:

```text
docs/CV_DATA_MODEL.md
```

Store this ticket as:

```text
docs/TICKET_011_DEDICATED_WEB_CV.md
```

---

# 33. Acceptance criteria

Complete when:

## Navigation

- `CV` tab exists
- appears before About
- links to `/cv`
- current state works

## PDF

- approved PDF exists under `/public/cv/`
- profile contains public CV path
- Download PDF works
- PDF is not embedded

## Web page

- `/cv` exists
- page is browser-readable
- page uses existing editorial visual system
- page is not a card wall
- education renders
- six research experiences render
- publications are separated by status
- under-review manuscript renders
- two manuscripts in preparation render
- software renders
- completed presentations render
- submitted conference abstracts render separately
- awards render
- training renders
- teaching renders

## Integrity

- existing collection records are reused where practical
- CV-specific data is structured
- no publication status is overstated
- no submitted abstract is labeled as an accepted presentation
- no placeholder DOI appears
- no GPA appears

## Technical

- static Astro architecture remains
- no client JavaScript
- no route regressions
- all validation passes

---

# 34. Validation

Run:

```text
npm run format:check
npm run lint
npm run typecheck
npm run content:validate
npm run media:validate
npm run test
npm run build
npm run site:verify
npm run validate
```

Also verify:

```bash
test -f public/cv/Joel_Sotelo_Flores_CV.pdf
test -f dist/cv/Joel_Sotelo_Flores_CV.pdf
```

or the platform-equivalent checks used by the repository.

---

# 35. Manual verification

## Navigation

- open every top-level page
- confirm CV appears before About
- confirm hover/current state matches other tabs

## CV desktop

- download button obvious
- page easy to scan
- research experience dominates appropriately
- publication status hierarchy obvious
- long author lists wrap cleanly
- manuscripts in preparation are clearly identified
- submitted AGU abstracts cannot be mistaken for completed presentations

## CV mobile

- no horizontal overflow
- dates and titles wrap cleanly
- download button remains usable
- nav remains usable

## PDF

- click Download PDF
- confirm correct PDF opens/downloads
- confirm no placeholder DOI text remains in the approved repository copy

---

# 36. Required completion report

## Summary

Describe:

- `/cv` route
- navigation addition
- CV data architecture
- PDF integration

## CV sections

List all rendered sections and record counts.

## Data sources

Explain which content comes from:

- profile
- projects
- publications
- CV-specific data

## PDF

Report:

- public path
- file size
- download URL

## Modified files

List every created/modified file.

## Validation

Report all commands and results.

## Manual verification

List high-risk checks.

## Remaining limitations

Include only genuine deferred items, such as:

- manuscript statuses may change
- conference abstracts may later move into Presentations after acceptance
- software DOI/repository links will be added after public releases
- CV PDF must be manually replaced when updated
- deployment remains separate

Do not begin SEO/deployment work.
