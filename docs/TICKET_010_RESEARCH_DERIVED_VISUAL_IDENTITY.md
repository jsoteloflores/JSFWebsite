# Ticket 010 — Research-Derived Visual Identity and Scientific Marginalia

## Objective

Introduce a restrained visual identity derived from Joel’s actual research media and scientific workflows.

The site now has:

- a stable light editorial visual system
- a full-bleed Kīlauea homepage hero
- bespoke homepage research features
- advisor-focused homepage copy
- scientific case-study project pages
- real scientific figures and media
- clear navigation and interaction states

The next goal is **not** another layout redesign.

Instead, add a small set of recurring visual details derived from real research data so the site feels unmistakably connected to Joel’s computational volcanology work.

Primary ideas:

- real lava-fountain segmentation contours
- real vesicle / segmentation geometry where appropriate
- restrained scientific marginalia
- project-context labels
- subtle measurement / observation notation
- project-specific visual accents built from existing research data

The result should feel:

```text
scientific publication
+
field notebook
+
computational volcanology
```

not:

```text
generic “science” graphics
+
fake data visualization
+
decorative tech UI
```

---

# 1. Core principle

Every scientific visual motif introduced in this ticket must originate from:

- an approved real research image
- an approved segmentation mask
- existing verified metadata
- an already documented project workflow

Do not fabricate:

- graphs
- measurements
- coordinates
- contours
- waveform traces
- numerical annotations
- timestamps
- sample IDs
- scientific diagrams

for decorative purposes.

If it looks like data, it must come from real data.

---

# 2. Primary visual signature: Kīlauea contour

Use one of the existing approved Kīlauea binary segmentation masks to derive a simple exterior contour.

Preferred source:

```text
daytime Kīlauea binary mask
```

Generate a vectorized or simplified contour from the actual mask boundary.

The contour may be used as a restrained recurring visual signature.

## Requirements

The contour must:

- follow the actual binary-mask boundary
- preserve recognizable overall fountain geometry
- be simplified enough for efficient SVG rendering
- contain no invented measurements
- contain no filled area by default
- render as a thin line
- use the site’s wine-red visual language
- remain visually secondary to actual scientific figures

Do not manually redraw it approximately.

---

# 3. Contour derivative pipeline

Create a reproducible contour-generation step.

Suggested:

```text
scripts/process-research-graphics.ts
```

or extend the current media-processing system if appropriate.

Preferred output:

```text
public/media/graphics/kilauea-fountain-contour.svg
```

The script should:

1. load the approved binary mask
2. identify the primary exterior contour
3. simplify the contour while retaining its shape
4. normalize it into an SVG `viewBox`
5. output deterministic SVG
6. strip unnecessary metadata
7. record the source media ID

Do not use OCR or manual tracing.

---

# 4. Contour simplification

The SVG should not contain thousands of unnecessary points.

Use a geometric simplification method such as:

```text
Douglas–Peucker
```

or an equivalent deterministic algorithm.

Test multiple tolerances and choose one that:

- retains the fountain silhouette
- removes pixel stair-stepping
- remains lightweight
- does not materially alter the shape

Document the tolerance used.

---

# 5. Kīlauea contour usage

Use the contour sparingly.

Approved uses:

### Project-detail section transition

A partial contour may appear near the beginning or end of the Kīlauea case study.

Example:

```text
                  thin real fountain contour
             /\/\/\____/\__
          __/             \__
      ___/                    \

METHODS
```

The contour should never interfere with text.

### Project-context rail accent

A small outline may appear beside:

```text
KĪLAUEA
```

or at the bottom of the context rail.

### Homepage Current Research

A very small contour fragment may appear as a subtle visual signature near the Kīlauea project number or label.

Do **not** place a giant contour behind homepage text.

---

# 6. Do not overuse the contour

The same contour should not appear:

- in every section
- behind every heading
- in the header
- in the footer
- as a background texture
- around every button

Target:

```text
1–2 contour uses on Kīlauea project page
0–1 very subtle use on homepage
```

That is enough.

---

# 7. Ijen visual signature

Do not reuse the lava-fountain contour on Ijen.

The Ijen project should have a visual accent derived from its own scientific media.

Preferred source:

```text
Site8IsolatedBubbleConnectivity_mask.png
```

Potential derived graphic:

- one or more real vesicle boundaries
- outer geometry from actual segmented objects
- a simplified crop of the existing PyRO-FOAMS segmentation

Choose a restrained element that visually communicates:

```text
texture / vesicles / segmentation
```

without pretending to be a quantitative plot.

---

# 8. Ijen derived graphic

Generate a simplified vector graphic from the approved segmentation mask.

Suggested output:

```text
public/media/graphics/ijen-vesicle-contours.svg
```

Possible approach:

- extract several representative closed boundaries from the real segmentation
- retain their relative geometry
- simplify for web rendering
- render as thin wine-colored outlines

Do not rearrange the boundaries into a more attractive composition.

If the source does not produce a visually useful graphic without altering scientific geometry, do not create one.

The ticket may proceed with only the Kīlauea contour if necessary.

---

# 9. Project-specific identity

The goal is subtle distinction:

## Kīlauea

Visual cues may emphasize:

- fountain silhouette
- image boundaries
- temporal imagery
- video / segmentation

## Ijen

Visual cues may emphasize:

- vesicle geometry
- specimen texture
- microscopy
- segmentation boundaries

## Earlier projects

Do not invent project-specific motifs.

Keep them typographically driven unless real approved data is available later.

---

# 10. Scientific marginalia system

Add a small reusable component for editorial project marginalia.

Suggested:

```text
src/components/core/ScientificMarginalia.astro
```

or:

```text
src/components/projects/ProjectMarginalia.astro
```

This should render verified small-context information in a book-like side-note treatment.

Examples:

```text
FIELD VIDEO
KĪLAUEA
2026
```

or:

```text
SEM
PYROCLAST TEXTURE
SEGMENTATION
```

Only use values derived from existing project metadata or approved context.

Do not invent dataset numbers or acquisition details.

---

# 11. Marginalia visual style

Use:

- small sans or mono
- uppercase where appropriate
- wine text
- generous letter spacing
- thin vertical or horizontal rules
- substantial whitespace

Avoid:

- pills
- badges
- colored blocks
- icons
- fake instrumentation labels

Conceptually:

```text
│ FIELD VIDEO
│ COMPUTER VISION
│ PHYSICAL VOLCANOLOGY
```

rather than:

```text
[ FIELD VIDEO ] [ CV ] [ VOLCANO ]
```

---

# 12. Project context rail refinement

If Ticket 009 introduced the editorial context rail, use this ticket only for subtle refinement.

Potential enhancement:

```text
PROJECT CONTEXT

ACTIVE
Jun 2026 – present

────────────

University of Hawaiʻi at Mānoa

Natalia Gauer Pasqualon

────────────

COMPUTER VISION
PHYSICAL VOLCANOLOGY
FIELD VIDEO

             [small contour]
```

Do not reintroduce cards.

Do not substantially change the rail width or page layout.

---

# 13. Section-intro details

Allow some project-detail sections to use restrained editorial metadata above the heading.

Example:

```text
METHOD / IMAGE SEGMENTATION

Methods
```

or:

```text
OBSERVATION / FIELD VIDEO

Data and observations
```

These labels must correspond to the section’s actual content.

Do not add one above every section.

Target:

```text
maximum 2–3 per flagship project
```

---

# 14. Avoid fake scientific-interface aesthetics

Do not introduce:

- reticles
- crosshairs
- HUD frames
- fake scale bars
- artificial timestamps
- fake coordinates
- camera overlays
- bounding boxes
- matrix grids
- waveform graphics
- random particle effects
- scrolling numbers

unless they exist in an actual displayed research product and are scientifically relevant.

The site should look scientific because it contains science, not because it imitates a fictional instrument interface.

---

# 15. Figure captions

Refine figure-caption hierarchy slightly.

Preferred structure:

```text
Original frame                         Binary mask

[image]                                [image]

Daytime Kīlauea lava-fountain frame and aligned binary segmentation mask.
```

Optional small context:

```text
SEGMENTATION / DAYTIME VIDEO
```

Do not reintroduce homepage figure numbering.

On project pages, figure numbers remain optional and should only exist if already useful after Ticket 009.

---

# 16. Scientific transformations

Where two pieces of media show a real transformation, allow a minimal directional indicator.

Example:

```text
Original frame        →        Binary mask
```

or:

```text
SEM image             →        PyRO-FOAMS segmentation
```

This may be used:

- between labels
- in a caption
- as a small visual cue

Do not draw large workflow arrows over the images.

---

# 17. Homepage restraint

The homepage is now approved.

Do not redesign it.

Allowed homepage modifications:

- one subtle Kīlauea contour accent near the first Current Research feature
- minor marginalia treatment if it clearly improves project identity

Do not change:

- hero composition
- hero text
- hero image
- project feature layout
- Research Interests
- About preview
- Publication
- Contact

If the contour makes the homepage feel busier, omit it entirely there.

---

# 18. Kīlauea project page priority

Spend most of the visual-signature effort on Kīlauea.

Suggested usage:

### Near project opening

Small contour graphic adjacent to project-context information.

### Between major narrative regions

One subtle partial contour may act as a transition between:

```text
Data / observations
```

and:

```text
Methods
```

or another scientifically logical transition.

Do not use the contour as a divider if it makes the page harder to read.

---

# 19. Ijen project page priority

Use Ijen-specific geometry only if the derived segmentation produces a clean and truthful visual.

Potential placement:

- near context rail
- near PyRO-FOAMS methods section
- as a quiet boundary element near the specimen imagery

Do not compete with the actual SEM image.

---

# 20. Real research process notation

Introduce a very limited, reusable textual process notation.

For Kīlauea:

```text
FIELD VIDEO → LABELING → SEGMENTATION → MEASUREMENT
```

For Ijen:

```text
IMAGING → SEGMENTATION → STEREOMETRY → PHYSICAL INTERPRETATION
```

Use only if every stage is supported by existing verified project content.

Preferred placement:

- near the project introduction
- or before Methods

Style:

- small sans / mono
- wine separators
- no boxes

Do not make these enormous diagrams.

---

# 21. Advisor-facing purpose

Every visual addition should help a prospective advisor understand one of:

- project type
- data source
- method
- workflow
- scientific focus

If an element is only decorative, remove it.

---

# 22. Responsive behavior

Derived graphics must behave gracefully.

At:

```text
320px
375px
768px
```

- contours may shrink
- optional decorative contour fragments may disappear
- marginalia should move inline
- no SVG may cause horizontal overflow
- no text should wrap around complicated contour geometry

Never sacrifice mobile readability to preserve decoration.

---

# 23. SVG accessibility

Decorative derived contours:

```html
aria-hidden="true"
```

They should not be announced to screen readers if the same scientific concept is already explained in text.

If a derived graphic conveys unique scientific information, provide:

- accessible title
- description
- appropriate role

Default assumption:

```text
derived motif = decorative
actual scientific figure = informative
```

---

# 24. Performance

Derived SVG files should be very small.

Target:

```text
< 50 KB each
```

Prefer:

```text
< 20 KB
```

Do not embed large raster masks merely to create decorative boundaries.

---

# 25. Reproducibility

Document the relationship:

```text
source media ID
→ contour extraction
→ simplification settings
→ output SVG
```

Do not manually edit output SVG coordinates after generation except for formatting/minification.

Any visual motif should be reproducible from the source data.

---

# 26. Suggested source/output map

## Kīlauea

Source:

```text
approved daytime binary mask
```

Output:

```text
public/media/graphics/kilauea-fountain-contour.svg
```

## Ijen

Source:

```text
Site8IsolatedBubbleConnectivity_mask.png
```

Possible output:

```text
public/media/graphics/ijen-vesicle-contours.svg
```

Only create Ijen output if scientifically faithful and visually usable.

---

# 27. Media registry

Register derived graphics separately from normal scientific figures.

Suggested type:

```ts
type DerivedGraphic = {
  id: string;
  kind: 'derived-graphic';
  src: string;
  sourceMediaId: string;
  purpose: 'decorative' | 'informative';
  projectId: string;
};
```

Do not give decorative graphics alt text pretending they are figures.

---

# 28. Validation

Add checks that:

- source media ID exists
- source belongs to appropriate project
- derived SVG exists
- SVG contains a valid `viewBox`
- file size is within budget
- project ID resolves
- no duplicate IDs
- output contains no embedded raster data unless explicitly intended

---

# 29. Documentation

Create:

```text
docs/RESEARCH_VISUAL_IDENTITY.md
```

Document:

- purpose
- philosophy
- Kīlauea contour source
- extraction method
- Ijen source if used
- appropriate uses
- prohibited uses
- marginalia rules
- workflow notation
- accessibility rules
- how to generate graphics again

Update:

```text
docs/VISUAL_SYSTEM.md
docs/MEDIA_PIPELINE.md
docs/CONTENT_COMPONENTS.md
```

Store ticket as:

```text
docs/TICKET_010_RESEARCH_DERIVED_VISUAL_IDENTITY.md
```

---

# 30. Tests

Add tests for:

- Kīlauea contour generation is deterministic
- output SVG has valid viewBox
- contour source resolves
- no oversized SVG
- no invented text embedded in SVG
- decorative graphics use `aria-hidden`
- workflow notation uses only approved project terms
- mobile output contains no horizontal overflow structurally where testable

---

# 31. Do not alter content

Do not change:

- project summaries
- research-interest text
- publication metadata
- dates
- advisors
- institution names
- project statuses
- project Markdown

This is a visual-identity ticket.

---

# 32. Prohibited work

Do not:

- redesign homepage
- redesign project layouts
- add new photographs
- add animation
- animate contours
- draw contour on scroll
- add parallax
- add Canvas/WebGL
- add Three.js
- add SVG morphing
- add project-specific color themes
- fabricate scientific diagrams
- add fake measurements
- add fake scale bars
- add fake coordinates
- add graphs
- add dark mode
- deploy
- begin SEO/deployment work

---

# 33. Acceptance criteria

Complete when:

## Kīlauea

- one real mask-derived contour exists
- contour generation is reproducible
- contour is lightweight SVG
- source relationship is documented
- contour appears subtly on Kīlauea case study
- contour does not compete with scientific media

## Ijen

Either:

- a truthful segmentation-derived contour motif is created and used sparingly

or:

- documented decision explains why the supplied mask does not support a useful derived motif without distortion

Both outcomes are acceptable.

## Marginalia

- restrained project marginalia treatment exists
- uses verified metadata only
- no pill/badge visual style
- does not overwhelm project pages

## Workflow notation

- may appear on flagship projects
- uses verified workflow stages only
- remains compact

## Technical

- no client JavaScript added
- no fabricated scientific data
- all derived graphics validate
- responsive behavior is clean
- all existing tests pass

---

# 34. Manual verification

Inspect Kīlauea at:

```text
320
375
768
1024
1440
1600
```

Confirm:

- contour reads as a subtle scientific signature
- contour is clearly secondary to actual figures
- no decorative element makes the page harder to scan
- context rail remains readable
- workflow notation helps rather than distracts

Inspect Ijen:

- derived geometry, if present, is faithful to real segmentation
- actual SEM imagery remains dominant

Inspect homepage:

- no visual clutter introduced
- hero unchanged
- project-feature layout unchanged

---

# 35. Validation

Run:

```text
npm run media:process
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

Add a research-graphics validation command to `validate` if a separate script is introduced.

---

# 36. Agent completion report

## Summary

Describe the research-derived visual system.

## Kīlauea contour

Report:

- source asset
- extraction method
- simplification algorithm
- simplification tolerance
- SVG dimensions/viewBox
- final size
- page placement

## Ijen geometry

Report:

- whether implemented
- source
- method
- or reason for intentionally omitting

## Marginalia

Describe where and how it is used.

## Workflow notation

List the exact project workflows rendered.

## Modified files

List all created and modified files.

## Validation

Report every command.

## Manual verification

List the highest-risk visual checks.

## Remaining limitations

Include only genuine deferred items.

Do not begin deployment, SEO, or social-preview work.
