# Scholarly Output Data Model

## Purpose

This document defines the shared data architecture for manuscripts, presentations, software, and conference abstracts across the portfolio.

All scholarly output records are maintained in a single authoritative source (`src/data/scholarly-output.ts`) and consumed by multiple pages to prevent duplication and ensure consistency.

## Architecture

### Single Source of Truth

```
src/data/scholarly-output.ts
    ↓
    ├─→ src/data/cv.ts (re-exports for CV page)
    ├─→ src/pages/publications.astro
    ├─→ src/pages/presentations.astro
    └─→ src/pages/software.astro
```

### Benefits

- **No duplication**: Each record exists once
- **Single update point**: Changes propagate automatically
- **Type safety**: TypeScript enforces consistent structure
- **Test coverage**: One canonical source to verify
- **Maintainability**: Clear ownership and responsibility

## Data Types

### ScholarlyManuscript

Manuscripts under review or in preparation.

```typescript
interface ScholarlyManuscript {
  title: string;
  authors: string[];
  targetJournal: string;
  status: 'in-review' | 'in-preparation';
  projectId?: string;
}
```

**Status values:**

- `in-review`: Submitted to journal, awaiting decision
- `in-preparation`: Being written, not yet submitted

**Source hierarchy:**

- PDF CV → scholarly-output.ts → pages

### ResearchSoftware

Scientific software developed for research workflows.

```typescript
interface ResearchSoftware {
  name: string;
  description: string;
  projectId?: string;
}
```

**Important:**

- Software entries do not have status field in scholarly-output.ts
- Status (`private`, `experimental`, etc.) is applied at render time
- Not yet public: Use `private` status in page components
- Repository metadata (DOI, URL) added when public

### ScholarlyPresentation

Completed conference presentations (oral talks or posters).

```typescript
interface ScholarlyPresentation {
  title: string;
  authors: string[];
  venue: string;
  location: string;
  date: string; // YYYY-MM format
  type: 'oral' | 'poster';
  projectId?: string;
}
```

**Presentation types:**

- `oral`: Oral presentation or invited talk
- `poster`: Poster presentation

### SubmittedConferenceAbstract

Conference abstracts submitted but not yet presented.

```typescript
interface SubmittedConferenceAbstract {
  title: string;
  authors: string[];
  conference: string;
  date: string; // Expected presentation date (YYYY-MM)
  projectId?: string;
}
```

**Important:**

- Do NOT infer presentation type (oral/poster) for submitted abstracts
- Abstract status is implicit: all entries in this array are `submitted`
- When presented, move entry to `completedPresentations` with confirmed type

## Status Transitions

### Manuscript Lifecycle

```
in-preparation → in-review → published (content collection)
```

1. **In preparation**: Entry in `manuscriptsInPreparation` array
2. **In review**: Move to `manuscriptsUnderReview` array
3. **Published**: Remove from scholarly-output.ts, create entry in `src/content/publications/` collection

### Presentation Lifecycle

```
submitted abstract → completed presentation
```

1. **Submitted**: Entry in `submittedConferenceAbstracts` array
2. **Presented**: Move to `completedPresentations` array with confirmed type and venue details

### Software Lifecycle

Software entries remain in `researchSoftware` array.

When public release occurs:

- Add DOI, repository URL, release metadata
- Update status rendering in pages (private → stable/active)
- Consider creating content collection entry if warranted

## Page Responsibilities

### /cv

**Data source**: `src/data/cv.ts` (re-exports from scholarly-output.ts)

**Displays**:

- All manuscripts (under review + in preparation)
- All completed presentations
- All submitted abstracts
- All research software

**Format**: Comprehensive academic CV format with all entries

### /publications

**Data source**: `src/data/scholarly-output.ts` + `publications` content collection

**Displays**:

- Peer-reviewed publications (from content collection)
- Manuscripts under review (from scholarly-output.ts)
- Manuscripts in preparation (from scholarly-output.ts)

**Format**: Three distinct sections with status labels

### /presentations

**Data source**: `src/data/scholarly-output.ts`

**Displays**:

- Completed presentations (oral + poster)
- Submitted conference abstracts

**Format**: Two sections, chronological order, full author lists

### /software

**Data source**: `src/data/scholarly-output.ts`

**Displays**:

- All research software entries

**Format**: Cards with name, description, status label, research link

## Source Integrity Rules

### Never fabricate

Do not invent or infer:

- Author lists or order
- Publication status
- Journal names
- Presentation types for submitted abstracts
- Dates or venues
- Quantitative metrics

### Exact source fidelity

All scholarly output data must match:

- PDF CV (primary source)
- Verified manuscript drafts
- Conference submission confirmations
- Explicit user-provided values

### Update workflow

1. User provides correction or new entry
2. Update `src/data/scholarly-output.ts`
3. All consuming pages update automatically
4. Run full validation suite
5. Verify rendered output in browser

## Testing Strategy

### Source integrity tests

```typescript
// tests/pages.test.ts
describe('scholarly output data integrity', () => {
  const scholarlySource = readFileSync(
    join(ROOT, 'src', 'data', 'scholarly-output.ts'),
    'utf-8',
  );

  it('uses correct manuscript titles from PDF', () => {
    expect(scholarlySource).toContain('Exact PDF Title');
  });

  it('does NOT use invented titles', () => {
    expect(scholarlySource).not.toContain('Fabricated Title');
  });

  it('includes full author lists', () => {
    expect(scholarlySource).toContain('Last Author, F.');
  });
});
```

### Architecture tests

```typescript
describe('shared scholarly data architecture', () => {
  it('cv.ts imports from scholarly-output.ts', () => {
    expect(cvSource).toContain("from './scholarly-output'");
  });

  it('cv.ts does not contain duplicate definitions', () => {
    const matches = cvSource.match(/export const manuscriptsUnderReview\s*=/g);
    expect(matches).toBeNull();
  });
});
```

### Page content tests

```typescript
describe('publications page', () => {
  it('displays manuscripts under review section', () => {
    expect(source).toContain('Manuscripts Under Review');
  });

  it('uses StatusLabel for manuscript status', () => {
    expect(source).toContain('<StatusLabel status="in-review"');
  });
});
```

## Common Patterns

### Emphasizing author name

All consuming pages use a helper function:

```typescript
function emphasizeAuthor(author: string): string {
  return author === 'Sotelo Flores, J.' ? `<strong>${author}</strong>` : author;
}
```

Then render:

```astro
{
  manuscript.authors.map((author, i) => (
    <Fragment>
      <span set:html={emphasizeAuthor(author)} />
      {i < manuscript.authors.length - 1 && ', '}
    </Fragment>
  ))
}
```

### Linking to research pages

When `projectId` exists:

```astro
{
  manuscript.projectId && (
    <a href={`/research/${manuscript.projectId}`} class="entry__link">
      Related research →
    </a>
  )
}
```

### Status labels

Use `StatusLabel` component with correct status values:

```astro
<StatusLabel status="in-review" />
<StatusLabel status="in-preparation" />
<StatusLabel status="private" />
```

Valid status values defined in `src/types/content.ts`.

## Related Documentation

- `CV_DATA_MODEL.md` — CV-specific data not in scholarly-output.ts
- `PAGE_ARCHITECTURE.md` — Overall page structure
- `CONTENT_COMPONENTS.md` — Reusable components
- `src/types/content.ts` — Type definitions and controlled vocabularies
- `src/utils/content-labels.ts` — Human-readable labels for status values

## Maintenance Notes

### When adding a new manuscript

1. Add entry to `manuscriptsInPreparation` or `manuscriptsUnderReview` array
2. Verify author order matches submission
3. Confirm target journal name is exact
4. Add projectId if corresponding project exists
5. Run tests and validation
6. Verify rendering on /cv, /publications pages

### When a manuscript is published

1. Remove entry from scholarly-output.ts
2. Create entry in `src/content/publications/` collection
3. Update project page to reference publication
4. Run tests and validation
5. Verify all pages update correctly

### When adding a presentation

1. If already presented: Add to `completedPresentations` with confirmed type
2. If abstract submitted: Add to `submittedConferenceAbstracts` without type
3. Verify full author list
4. Use exact conference/venue names
5. Run tests and validation
6. Verify rendering on /cv, /presentations pages

### When adding software

1. Add entry to `researchSoftware` array
2. Write concise, accurate description
3. Add projectId if corresponding project exists
4. Use `private` status in page rendering if not yet public
5. Run tests and validation
6. Verify rendering on /cv, /software pages

## Version History

- **2025-05-15**: Initial documentation for Ticket 013
- Created shared scholarly-output.ts architecture
- Refactored cv.ts to import instead of duplicate
- Launched /publications, /presentations, /software pages
- Established testing patterns for shared data
