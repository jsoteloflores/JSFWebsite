# CV Data Model

## Purpose

This document defines the data architecture for the dedicated web CV page (`/cv`) and explains how CV-specific data integrates with the site's existing typed content collections.

The CV system is designed to:

- **Provide structured, maintainable CV data** separate from hard-coded page markup
- **Reuse existing collection data** where practical (projects, publications)
- **Support status hierarchy** (published, under review, in preparation, submitted)
- **Enable rapid updates** during application cycles without duplicate maintenance
- **Maintain scientific accuracy** through explicit typing and source documentation

---

# 1. Data Sources

The CV page (`src/pages/cv.astro`) assembles information from four primary sources:

## 1.1 Profile (`src/data/profile.ts`)

Contains verified public biographical and contact information:

- Full name and display name
- Institution, location, degrees
- Expected graduation
- Email, GitHub, LinkedIn
- **CV PDF path** (`cvPath`)
- Research interests

**What comes from profile:**

- CV header (name, affiliation, graduation)
- Download PDF link
- Secondary contact links

**Not in profile:**

- Detailed research experience
- Full CV entries
- Status-dependent manuscript records

---

## 1.2 CV-Specific Data (`src/data/cv.ts`)

Contains information genuinely unique to the CV and not already present in typed collections:

### Education Details

- Honors thesis title
- Study abroad program details
- Relevant coursework list

### Research Experience

- Role titles, dates, institutions, advisors
- 2–4 concise contribution bullets per role
- Optional `projectId` reference to link to deeper site project

### Manuscripts (Under Review & In Preparation)

- Full citation-style titles and author lists
- Target journals
- Explicit status (`under-review` | `in-preparation`)
- Optional `projectId` reference

### Software & Research Products

- Name, description
- Optional `projectId` reference
- **No placeholder DOI/repository links**

### Presentations (Completed & Submitted Abstracts)

- Completed presentations with venue, location, date, type
- Submitted conference abstracts with clear "Abstract submitted" status
- **Separated subsections** to avoid confusion

### Awards, Fellowships, Scholarships

- Full award names and dates

### Research Training & Scientific Programs

- Program name, institution, date
- Brief bullets describing scope

### Teaching & Mentoring

- Role title, institution, date range
- Responsibility bullets

**Key Constraint:**

Where a project or publication already exists in the site's content collections, the CV data references its stable ID (`projectId`) rather than duplicating facts unnecessarily.

---

## 1.3 Project Collection (`src/content/projects/`)

Provides:

- Project full titles
- Scientific scope
- Advisor names
- Status
- Related publications

**How the CV uses it:**

When `researchExperience` includes a `projectId`, the CV page:

1. Fetches the project via `getPublicProjects()`
2. Creates a lookup map `projectById`
3. Renders a "View research →" link to `/research/{projectId}`

The CV does **not** duplicate the full project metadata; it relies on the existing project record for authoritative data and uses CV-specific `roleTitle` and `bullets` for the CV-appropriate summary.

---

## 1.4 Publication Collection (`src/content/publications/`)

Provides:

- Peer-reviewed publication metadata
- Citation details
- DOI, journal, volume, issue, pages
- Status

**How the CV uses it:**

The CV page:

1. Fetches all publications via `getCollection('publications')`
2. Filters to public records via `filterPublic()`
3. Finds the published peer-reviewed publication (JDSO paper)
4. Renders it using `<PublicationEntry>` in the "Peer-Reviewed Publications" subsection

**Manuscripts under review and in preparation** are **not** currently in the publication collection because that collection requires:

- Verified publication status
- Complete citation metadata
- DOI or external URL

These manuscripts exist **only in `src/data/cv.ts`** until they reach published status.

---

# 2. CV Data Types

All CV-specific types are defined in `src/data/cv.ts`.

## 2.1 `CvResearchExperience`

```ts
{
  roleTitle: string;          // CV-appropriate role title
  institution: string;
  location: string;
  advisor: string;
  startDate: string;          // YYYY-MM
  endDate: string | null;     // null if ongoing
  bullets: string[];          // 2-4 concise bullets
  projectId?: string;         // optional stable project ID
}
```

**When to use `projectId`:**

If a corresponding project exists in `src/content/projects/`, include the stable project ID. The CV page will render a "View research →" link.

**When not to use `projectId`:**

If the project has not yet been documented as a full site case study (e.g., a brief summer program not warranting a full research page), omit `projectId`.

---

## 2.2 `CvManuscript`

```ts
{
  title: string;               // Full citation-style title
  authors: string[];           // Citation order
  targetJournal: string;
  status: 'under-review' | 'in-preparation';
  projectId?: string;
}
```

**Status semantics:**

- `under-review`: Manuscript submitted and awaiting decision
- `in-preparation`: Manuscript being written, not yet submitted

**Do not use:**

- `published` — that belongs in the publication collection
- `accepted` — move to publication collection when accepted
- `submitted` — reserved for conference abstracts

**Author list format:**

Use last name, initials with periods:

```ts
['Sotelo Flores, J.', 'Barber, N. D.'];
```

---

## 2.3 `CvSoftware`

```ts
{
  name: string;
  description: string;
  projectId?: string;
}
```

**Do not include:**

- DOI
- Zenodo link
- GitHub repository URL

unless the software is publicly released and verified.

These records document research software developed during projects. They may later migrate to the site's Software collection when:

- The software is publicly released
- A repository is available
- Documentation exists
- Optional: DOI assigned

---

## 2.4 `CvPresentation`

```ts
{
  title: string;
  authors: string[];
  venue: string;              // Full conference name
  location: string;           // City, state/country
  date: string;               // YYYY-MM
  type: 'poster' | 'oral';
}
```

**Use for completed presentations only.**

For submitted but not-yet-accepted abstracts, use `CvConferenceAbstract`.

---

## 2.5 `CvConferenceAbstract`

```ts
{
  title: string;
  authors: string[];
  conference: string;
  date: string;               // Submission or expected presentation date
  type: 'poster' | 'oral';
}
```

**Use for submitted abstracts awaiting acceptance.**

Once accepted, migrate the record to:

- The site's Presentations collection (if a full presentation record is warranted)
- Or `completedPresentations` in `cv.ts` (if the Presentations collection is not yet used for AGU abstracts)

**Visual distinction:**

The CV page renders submitted abstracts with explicit status text:

```text
Abstract submitted
```

This ensures prospective advisors cannot mistake a submitted abstract for a completed presentation.

---

## 2.6 `CvAward`

```ts
{
  name: string; // Full award name
  date: string; // YYYY-MM
}
```

Simple name-date pair. No additional metadata currently required.

---

## 2.7 `CvTraining`

```ts
{
  programName: string;
  institution: string;
  date: string;               // YYYY-MM
  bullets: string[];          // Brief description
}
```

Used for research training programs, summer schools, specialized workshops.

---

## 2.8 `CvTeaching`

```ts
{
  roleTitle: string;
  institution: string;
  startDate: string;          // YYYY-MM
  endDate: string | null;
  bullets: string[];
}
```

Teaching assistant roles, mentoring positions, grading, lab instruction.

---

## 2.9 `CvEducation`

```ts
{
  honorsThesisTitle: string;
  studyAbroadProgram: string;
  studyAbroadLocation: string;
  studyAbroadDate: string;    // YYYY-MM
  relevantCoursework: string[];
}
```

Degree information (institution, programs, graduation) comes from `profile.ts`.

This type contains only the supplementary education details specific to the CV page.

---

# 3. Status Hierarchy

The CV must clearly distinguish publication stages.

## 3.1 Visual Hierarchy

```text
Published > Under Review > In Preparation > Submitted Abstract
```

The CV page renders these statuses using:

- **Published:** Rendered via `<PublicationEntry>` with journal metadata
- **Under Review:** Uses `<StatusLabel status="under-review">` badge
- **In Preparation:** Uses `<StatusLabel status="in-preparation">` badge
- **Submitted Abstract:** Plain text status "Abstract submitted"

## 3.2 Status Transitions

### Manuscript under review → Published

1. Move record from `manuscriptsUnderReview` in `cv.ts` to `src/content/publications/`
2. Add full citation metadata (DOI, volume, issue, pages)
3. Set `status: 'published'` in publication frontmatter
4. Remove from `cv.ts` (the CV page will now fetch it from the publication collection)

### Manuscript in preparation → Under review

1. Update `status: 'in-preparation'` to `status: 'under-review'` in `cv.ts`
2. Move from `manuscriptsInPreparation` array to `manuscriptsUnderReview` array
3. Update submission date if tracking that information

### Conference abstract submitted → Completed presentation

1. Move record from `submittedConferenceAbstracts` to `completedPresentations` in `cv.ts`
2. Update date to actual presentation date
3. Add full venue name if previously abbreviated

### Research software → Public software

1. Add repository URL, documentation, optional DOI
2. Move from `software` in `cv.ts` to `src/content/software/` collection
3. Remove from `cv.ts` (the Software page will now fetch it from the collection)

---

# 4. Updating the CV

## 4.1 Update CV PDF

When the PDF CV is updated:

1. Replace `public/cv/Joel_Sotelo_Flores_CV.pdf` with the new version
2. Verify `profile.cvPath` still points to the correct filename
3. Run `npm run build` to copy the new PDF to `dist/`
4. Verify download link works in browser

**Do not:**

- Change the filename unless necessary (breaks existing links)
- Commit multiple dated versions (replace the canonical file)

---

## 4.2 Update Research Experience

To add a new research role:

1. Add entry to `researchExperience` array in `src/data/cv.ts`
2. Use `YYYY-MM` format for dates
3. Write 2–4 concise bullets focusing on:
   - Scientific focus
   - Methods
   - Personal contribution
   - Research outputs/workflow
4. If a corresponding project page exists, add `projectId`
5. Roles are rendered in array order (newest first or chronological depending on CV convention)

---

## 4.3 Promote a Manuscript

When a manuscript status changes:

**In preparation → Under review:**

```ts
// Move from manuscriptsInPreparation to manuscriptsUnderReview
export const manuscriptsUnderReview: CvManuscript[] = [
  {
    title: 'Your Title',
    authors: ['Author, A.', 'Author, B.'],
    targetJournal: 'Journal Name',
    status: 'under-review', // Update status
    projectId: 'project-id',
  },
];
```

**Under review → Published:**

1. Create `src/content/publications/manuscript-slug.md`
2. Add full frontmatter:
   ```yaml
   title: 'Full Title'
   authors:
     - name: 'Joel A. Sotelo Flores'
       isJoel: true
     - name: 'Coauthor Name'
       isJoel: false
   year: 2027
   type: journal-article
   status: published
   visibility: public
   journal: 'Journal Name'
   doi: '10.xxxx/xxxxx'
   volume: 'X'
   issue: 'Y'
   pages: 'A-B'
   relatedProject: project-id
   ```
3. Remove from `manuscriptsUnderReview` in `cv.ts`
4. The CV page will now fetch it from the publication collection

---

## 4.4 Add a Conference Abstract

When submitting a conference abstract:

1. Add to `submittedConferenceAbstracts` in `src/data/cv.ts`:
   ```ts
   {
     title: 'Abstract Title',
     authors: ['Sotelo Flores, J.', 'Advisor, N.'],
     conference: 'Full Conference Name YYYY',
     date: '2027-12',  // Expected presentation or submission date
     type: 'poster',   // or 'oral'
   }
   ```
2. The CV page will render it under "Conference Abstracts Submitted" with clear status

When the abstract is accepted and presentation completed:

1. Move entry from `submittedConferenceAbstracts` to `completedPresentations`
2. Update `venue` to full conference name
3. Add `location` (city, state/country)
4. Update `date` to actual presentation date

---

## 4.5 Add an Award

```ts
export const awards: CvAward[] = [
  {
    name: 'Full Award Name',
    date: '2027-04',
  },
  // Keep in reverse chronological order (newest first)
];
```

---

# 5. Validation and Testing

## 5.1 Type Safety

All CV data is strictly typed. TypeScript will catch:

- Missing required fields
- Invalid status values
- Incorrect date formats (compile-time string check via IDE)

Run:

```bash
npm run typecheck
```

## 5.2 CV Page Tests

Tests in `tests/pages.test.ts` verify:

- CV page exists
- All major sections render
- Download PDF link uses `profile.cvPath`
- No iframe embed
- No client JavaScript
- StatusLabel used for manuscript status
- Submitted abstracts separated from completed presentations

Run:

```bash
npm run test
```

## 5.3 Build Verification

Site verification confirms:

- `/cv` route generates `dist/cv/index.html`
- PDF copied to `dist/cv/Joel_Sotelo_Flores_CV.pdf`
- Navigation includes CV tab
- Expected page count increases by 1

Run:

```bash
npm run build
npm run site:verify
```

---

# 6. Consistency with PDF CV

The web CV does not need to duplicate every PDF line exactly, but it **must not contradict** the PDF.

## 6.1 Web-Specific Adaptations

The web CV may:

- Use fewer bullets per experience (2–4 instead of 5+)
- Abbreviate coursework presentation
- Link to deeper site pages
- Use interactive status labels

## 6.2 Must Not Change

The web CV must **never**:

- Change author order
- Inflate publication status
- Add fake DOIs
- Redate completed work
- Claim sole authorship where collaborative
- Invent affiliations
- Show GPA (intentionally excluded)

## 6.3 Source of Truth

For stable facts such as:

- Degree names
- Expected graduation date
- Major role dates
- Award dates
- Advisor names
- Institution names

the **PDF CV** (as approved and provided) is the authoritative source.

When updating `cv.ts`, verify against the current PDF.

---

# 7. Graduate Application Context

The CV page is designed for:

- Prospective PhD advisors
- Graduate admissions committees
- Conference contacts
- Research collaborators

## 7.1 Tone and Credibility

The CV page should feel:

- Scholarly
- Factual
- Easy to scan
- Honest about limitations
- Restrained

Avoid:

- Promotional language
- Startup-style copy
- Vague claims
- Buzzword-heavy prose
- Inflated authorship

## 7.2 Status Transparency

A prospective advisor must be able to immediately distinguish:

- What has been published
- What is under peer review
- What is being written
- What is a submitted abstract

This transparency is a **feature**, not a limitation.

---

# 8. Comparison: CV vs. Other Scholarly Pages

## 8.1 CV Page

**Inclusive:**

- Shows under-review manuscripts
- Shows in-preparation manuscripts
- Shows submitted abstracts
- Shows research software without DOI
- Explicit status for everything

**Purpose:**

- Provide complete academic record for application context
- Communicate research trajectory
- Show ongoing work

---

## 8.2 Publications Page (`/publications`)

**Strict:**

- Only verified published works
- Requires DOI or external URL
- Complete citation metadata

**Does not show:**

- Manuscripts under review
- Manuscripts in preparation
- Submitted abstracts

**Purpose:**

- Publicly citable peer-reviewed record
- High-confidence publication list

---

## 8.3 Presentations Page (`/presentations`)

**Currently:**

- Placeholder message
- No entries yet

**Future:**

- Completed conference presentations
- Invited talks
- Seminar presentations

**Does not show:**

- Submitted abstracts awaiting acceptance

**Purpose:**

- Verified presentation record

---

## 8.4 Software Page (`/software`)

**Strict:**

- Publicly released software
- Repository link required
- Documentation exists
- Optional DOI

**Does not show:**

- Research software in development
- Private project code
- Unpublished pipelines

**Purpose:**

- Publicly available research software

---

## 8.5 Research Pages (`/research/{id}`)

**Comprehensive:**

- Full project case studies
- Methods, data, results
- Media, figures, workflow
- Related publications

**Does not show:**

- CV-style role summaries
- Advisor metadata (unless in context)

**Purpose:**

- Deep scientific explanation
- Demonstrate computational capability
- Showcase complete research workflows

---

# 9. When to Update Which System

| Change                     | Update CV Data                          | Update Collection                                     | Update Both |
| -------------------------- | --------------------------------------- | ----------------------------------------------------- | ----------- |
| Add new research role      | ✓ `cv.ts`                               |                                                       |             |
| Manuscript → under review  | ✓ Update status                         |                                                       |             |
| Manuscript → published     | Remove from `cv.ts`                     | ✓ Add to `publications/`                              |             |
| Submit conference abstract | ✓ Add to `submittedConferenceAbstracts` |                                                       |             |
| Present at conference      | ✓ Move to `completedPresentations`      | (Optional) Add to `presentations/` if collection used |             |
| Software goes public       | Remove from `cv.ts`                     | ✓ Add to `software/`                                  |             |
| Add award                  | ✓ `cv.ts`                               |                                                       |             |
| Add training program       | ✓ `cv.ts`                               |                                                       |             |
| Change graduation date     |                                         | ✓ Update `profile.ts`                                 |             |
| New PDF version            | Replace `public/cv/*.pdf`               |                                                       |             |
| Update email               |                                         | ✓ Update `profile.ts`                                 |             |

---

# 10. Future Enhancements (Out of Scope for Ticket 011)

Potential future additions:

- **Technical Skills Section:** If approved, add `CvTechnicalSkills` type
- **Grants and Funding:** If significant funding is awarded
- **Professional Service:** Reviewing, editing, committees
- **Media Coverage:** If research is featured externally
- **Optional In-Page Navigation:** Small section index for scanning

Do not implement these unless:

1. Explicitly requested
2. Content exists and is verified
3. Adds genuine value without clutter

---

# 11. Troubleshooting

## PDF download doesn't work

**Check:**

1. `public/cv/Joel_Sotelo_Flores_CV.pdf` exists
2. `profile.cvPath` is correct
3. `npm run build` completes successfully
4. `dist/cv/Joel_Sotelo_Flores_CV.pdf` exists

## Navigation doesn't show CV tab

**Check:**

1. `src/utils/navigation.ts` includes `{ label: 'CV', href: '/cv' }`
2. CV entry appears before About
3. Clear browser cache

## CV page shows wrong manuscript status

**Check:**

1. Correct array in `cv.ts` (`manuscriptsUnderReview` vs `manuscriptsInPreparation`)
2. Status field matches array semantics
3. StatusLabel component receives correct status prop

## Project link doesn't work

**Check:**

1. `projectId` in CV data matches actual project `id` in `src/content/projects/`
2. Project `visibility: 'public'`
3. Project content file exists and is valid

## TypeScript errors after updating CV data

**Check:**

1. All required fields present in new entries
2. Date format is string (YYYY-MM), not Date object
3. Status values match allowed types
4. Arrays are not accidentally turned into objects

Run:

```bash
npm run typecheck
```

---

# 12. Contact and Maintenance

The CV data model is maintained alongside the portfolio codebase.

For questions about:

- **Data structure:** Check type definitions in `src/data/cv.ts`
- **Status semantics:** See section 3 (Status Hierarchy)
- **Updates:** See section 4 (Updating the CV)
- **Tests:** See `tests/pages.test.ts` (CV page section)

When in doubt:

1. Verify against the approved PDF CV
2. Preserve existing type structure
3. Run full validation before committing changes
