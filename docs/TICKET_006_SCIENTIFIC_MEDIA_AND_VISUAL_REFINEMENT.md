# Ticket 006 — Scientific Media System and Flagship Visual Refinement

## Status

Ready for implementation

## Project

Main computational volcanology portfolio for Joel Sotelo Flores

## Scope

1. Formalize all supplied media as approved for repository and public website use
2. Build a reproducible derivative-media pipeline
3. Add typed scientific-media metadata and integrity validation
4. Create accessible static figure, image-pair, and synchronized video-pair components
5. Integrate real media into the homepage, About page, and two flagship volcanology projects
6. Refine the visual hierarchy without replacing the established design system
7. Correct known contrast, spacing-token, and build-verification issues
8. Preserve static Astro output and the portfolio/exhibit boundary

## Governing documents

Before making changes, read:

- `PROJECT_FOUNDATION.md`
- `AGENTS.md`
- `docs/TICKET_001_REPOSITORY_SCAFFOLD.md`
- `docs/TICKET_002_CONTENT_ARCHITECTURE.md`
- `docs/TICKET_003_CONTENT_INTEGRITY_AND_COMPONENTS.md`
- `docs/TICKET_004_VERIFIED_CONTENT_INVENTORY.md`
- `docs/TICKET_005_PUBLIC_PAGE_COMPOSITION.md`
- `docs/CONTENT_MODEL.md`
- `docs/CONTENT_COMPONENTS.md`
- `docs/PAGE_ARCHITECTURE.md`
- `docs/CONTENT_SOURCE_OF_TRUTH.md`
- `docs/MEDIA_SOURCE_OF_TRUTH.md`
- this ticket

These documents are authoritative.

This ticket does **not** authorize:

- changing academic facts or publication statuses
- adding blocked manuscript, presentation, or software records
- adding a public CV
- implementing interactive exhibits
- adding React, Vue, Svelte, GSAP, Three.js, or another client framework
- building an image comparison slider
- autoplaying video
- adding custom web fonts
- adding broad animation systems
- deployment
- analytics
- a CMS
- social-preview generation
- redesigning every page from scratch

---

# 1. Objective

Transform the current text-first portfolio into a visually distinctive computational-volcanology site using Joel’s real scientific and field media.

The current site already has:

- a coherent dark mineral palette
- strong structured content
- six top-level pages
- six static project pages
- a verified profile
- reusable content components
- static output
- no client-side hydration
- a clear observation-versus-analysis visual concept

Ticket 006 should make that concept visible.

The central visual grammar is:

```text
Observation → segmentation → quantitative interpretation
```

The supplied media supports this directly through:

- daytime Kīlauea RGB frame and aligned binary mask
- nighttime Kīlauea RGB frame and aligned binary mask
- synchronized five-second Kīlauea mask and contour-overlay videos
- original SEM image and aligned PyRO-FOAMS mask
- software-interface screenshots
- field and profile photographs

The result should feel more cinematic and scientific without becoming noisy, decorative, or dependent on JavaScript.

---

# 2. Media approval decision

Joel has explicitly approved **all media currently listed in `docs/MEDIA_SOURCE_OF_TRUTH.md`** for:

- storage in the repository
- creation of optimized public derivatives
- use on the public portfolio website

This includes:

- both Kīlauea still-image pairs
- the synchronized Kīlauea video pair
- all supplied personal photographs
- the Kīlauea fountain and sunset photographs
- the group fieldwork photograph
- both software screenshots
- the SEM and PyRO-FOAMS image pair

## 2.1 Required documentation update

Update `docs/MEDIA_SOURCE_OF_TRUTH.md` so that:

- every currently inventoried asset has public-use status `Approved`
- the source folder is described as **repository source media not directly served by the site**, rather than private media
- permission and consent are treated as resolved
- public derivative generation is explicitly authorized
- group-photo use is approved
- software-screenshot use is approved after automated and manual sanitization review
- no approval questions remain as blocking conditions

## 2.2 Scientific uncertainty is not permission uncertainty

Approval does not authorize the agent to invent:

- whether a Kīlauea mask is manual ground truth or model prediction
- whether the green outline is ground truth or inference
- episode numbers
- exact field dates
- photographer names
- SEM operator
- institution-specific acquisition credit
- what white and black pixels represent beyond “binary segmentation mask”
- unpublished sample interpretation

Where scientific provenance remains unspecified, use neutral wording such as:

```text
Binary segmentation mask
Segmentation contour
PyRO-FOAMS segmentation
Field photograph
SEM image
```

Do not use:

```text
Ground truth
Model inference
AI prediction
Episode 49
Episode 50
```

unless those facts are separately documented in an authoritative source.

## 2.3 Credit handling

All assets are approved for use, but explicit photographer or acquisition credits may remain unknown.

Rules:

- do not fabricate a photographer credit
- do not display “Photo by Joel” unless verified
- a missing visible credit does not block use
- retain a typed optional `credit` field for later correction
- use Joel’s name only for derived software outputs when authorship is already established in verified project content

---

# 3. Direct agent prompt

Use the following as the direct prompt to the coding agent:

> Read `AGENTS.md`, `PROJECT_FOUNDATION.md`, Tickets 001–006, all content and page documentation, `CONTENT_SOURCE_OF_TRUTH.md`, and `MEDIA_SOURCE_OF_TRUTH.md` before making changes.
>
> Work only on Ticket 006: Scientific Media System and Flagship Visual Refinement.
>
> Treat every media asset currently inventoried in `MEDIA_SOURCE_OF_TRUTH.md` as approved for repository storage, derivative generation, and public website use. Update that document accordingly.
>
> Do not infer unresolved scientific provenance or photographer credits. Use neutral labels such as “binary segmentation mask,” “segmentation contour,” and “PyRO-FOAMS segmentation.”
>
> Build a reproducible media-derivative workflow, typed public-media registry, media-integrity validation, and static accessible media components. Integrate selected real media into the homepage, About page, Kīlauea project page, and Ijen project page.
>
> Preserve pair alignment and video synchronization. Do not overwrite source media. Do not add an interactive comparison slider, autoplay, hydration, client frameworks, exhibit code, blocked content records, deployment configuration, or a public CV.
>
> Correct the muted-text contrast problem, the missing `--space-10` token, and the incomplete JavaScript build verification described in this ticket.
>
> Run the complete validation suite, including media validation and full build-output inspection. Report all derivatives, dimensions, file sizes, routes changed, and remaining scientific metadata limitations.
>
> Do not begin Ticket 007.

---

# 4. Preflight

Before editing:

1. Run `nvm use`.
2. Confirm Node is `24.x.x`.
3. Confirm Astro is the currently installed version.
4. Run `npm install`.
5. Run `npm run validate`.
6. Confirm all twelve current routes build.
7. Confirm all source media listed in `MEDIA_SOURCE_OF_TRUTH.md` exists under `docs/media/`.
8. Resolve actual filenames and file extensions from the filesystem.
9. Record for each source file:
   - dimensions
   - format
   - byte size
   - EXIF presence
   - color mode
   - video duration when applicable
   - frame rate when applicable
   - frame count when applicable
10. Confirm the three still pairs match in dimensions.
11. Confirm the two videos match in:
    - duration
    - frame rate
    - frame count
    - dimensions
12. Inspect screenshots for:
    - local paths
    - account names
    - private filenames
    - private metadata
    - unpublished or restricted information
13. Inspect the group photograph and personal images for accidental sensitive metadata.
14. Do not alter source media.

If an expected source file is missing, report it and omit only that derivative. Do not fabricate an asset or substitute stock imagery.

---

# 5. Source-media policy

The approved source files may remain committed in `docs/media/`.

Update documentation to distinguish:

```text
docs/media/
```

from:

```text
public/media/
```

Meaning:

- `docs/media/` contains approved source-quality repository media
- `public/media/` contains optimized, sanitized files actually shipped to visitors
- public pages must never reference `docs/media/`
- source files must never be overwritten by the derivative pipeline

Do not remove media from Git history during this ticket.

Do not add `docs/media/` to `.gitignore`.

---

# 6. Reproducible media pipeline

Create a reproducible media-processing workflow.

Suggested files:

```text
scripts/process-media.ts
scripts/validate-media.ts
src/data/media.ts
src/types/media.ts
src/utils/media-integrity.ts
```

The exact organization may vary if a clearer equivalent is used.

## 6.1 Image processing

Use `sharp` directly as a development dependency if it is not already declared.

The image pipeline must:

- read only from `docs/media/`
- write only to `public/media/`
- never overwrite source files
- create deterministic filenames
- remove unnecessary metadata
- preserve aspect ratio
- preserve pair alignment
- create dimensions appropriate for web display
- avoid needless upscaling
- preserve scientifically relevant boundaries
- use lossless output for masks
- generate a machine-readable processing report

## 6.2 Still-image formats

### Photographs

Preferred:

```text
WebP
```

Use high visual quality and strip metadata.

### RGB scientific images

Use:

- WebP when it preserves visual detail adequately
- PNG when exact visual fidelity or transparency requires it

### Binary masks

Use:

```text
PNG
```

or verified lossless WebP.

PNG is preferred for this ticket.

Do not use JPEG for masks.

## 6.3 Pair processing

For each still pair:

- read source dimensions
- assert equal width and height
- use identical resize geometry
- preserve identical displayed boundaries
- produce pair members with matching output dimensions
- fail the processing command if dimensions diverge
- record the resulting width and height in the media registry

Pairs:

```text
daytime RGB ↔ daytime mask
nighttime RGB ↔ nighttime mask
SEM original ↔ PyRO-FOAMS mask
```

## 6.4 Video processing

Use locally installed `ffmpeg` and `ffprobe`.

Do not add a bundled video-processing package.

For:

```text
binarymask5.mov
Greenoutline5.mov
```

the pipeline must:

- treat them as the same sequence
- verify matching source duration
- verify matching frame rate
- verify matching frame count
- verify matching dimensions
- transcode both with identical:
  - trim start
  - trim end
  - frame rate
  - dimensions
  - time base
- create MP4 outputs with broadly supported codecs
- strip unnecessary metadata
- create matching poster frames from the same timestamp
- record output duration and dimensions
- fail when synchronization checks do not pass

Suggested outputs:

```text
public/media/projects/kilauea/fountain-binary-mask.mp4
public/media/projects/kilauea/fountain-outline-overlay.mp4
public/media/projects/kilauea/fountain-binary-mask-poster.webp
public/media/projects/kilauea/fountain-outline-overlay-poster.webp
```

## 6.5 Screenshot processing

Create sanitized derivatives of:

- PyRO-FOAMS screenshot
- FountainLabeller screenshot

The pipeline may crop only:

- operating-system chrome
- irrelevant desktop background
- private path or account regions

Any crop must preserve the relevant application interface.

Do not blur scientific content.

If automated sanitization is unsafe or ambiguous, create a deterministic crop configuration and document the exact crop rectangle.

## 6.6 Processing command

Add:

```text
npm run media:process
```

The command must be safe to rerun.

It should clean only files that it owns under the defined derivative directories.

It must not delete unrelated public files.

---

# 7. Public-media registry

Create a typed registry containing only generated public derivatives.

Suggested location:

```text
src/data/media.ts
```

## 7.1 Media types

Define clear types such as:

```ts
type PublicImage = {
  id: string;
  kind: 'image';
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width: number;
  height: number;
  projectId?: string;
};

type PublicVideo = {
  id: string;
  kind: 'video';
  src: string;
  poster: string;
  description: string;
  caption?: string;
  credit?: string;
  width: number;
  height: number;
  durationSeconds: number;
  projectId?: string;
};

type ImagePair = {
  id: string;
  kind: 'image-pair';
  left: PublicImage;
  right: PublicImage;
  leftLabel: string;
  rightLabel: string;
  caption: string;
};

type VideoPair = {
  id: string;
  kind: 'video-pair';
  left: PublicVideo;
  right: PublicVideo;
  leftLabel: string;
  rightLabel: string;
  caption: string;
};
```

The agent may refine these types, but they must remain:

- explicit
- schema-driven or strongly typed
- suitable for validation
- free from styling instructions
- free from page-component paths

## 7.2 Registry content

Register:

### Kīlauea

- daytime RGB
- daytime mask
- daytime pair
- nighttime RGB
- nighttime mask
- nighttime pair
- binary-mask video
- outline-overlay video
- synchronized video pair
- FountainLabeller screenshot
- Kīlauea fountain photograph
- Kīlauea sunset photograph
- Kīlauea selfie
- Kīlauea full-body portrait
- fieldwork group photograph

### Ijen

- SEM original
- PyRO-FOAMS mask
- SEM/PyRO-FOAMS pair
- PyRO-FOAMS screenshot

### About

- Mauna Loa photograph
- Delicate Arch photograph

A single source derivative may be registered for more than one page role without duplicating the file.

## 7.3 Project-media map

Create a typed project-media map.

Example concept:

```ts
projectMedia = {
  'kilauea-lava-fountain-computer-vision': {
    heroPair: 'kilauea-daytime-pair',
    imagePairs: ['kilauea-daytime-pair', 'kilauea-night-pair'],
    videoPairs: ['kilauea-five-second-pair'],
    screenshots: ['fountainlabeller-interface'],
    fieldImages: ['kilauea-fountain-photo', 'kilauea-sunset'],
  },
  'ijen-pyroclast-microct-analysis': {
    heroPair: 'ijen-sem-pair',
    imagePairs: ['ijen-sem-pair'],
    screenshots: ['pyro-foams-interface'],
  },
};
```

Do not place page-layout class names in this map.

---

# 8. Media integrity validation

Create:

```text
npm run media:validate
```

Validation must check:

- every registry path exists
- every image has nonempty alt text
- every video has a nonempty written description
- every pair references real registry entries
- every still pair has identical output dimensions
- every video pair has matching:
  - dimensions
  - duration within a strict tolerance
  - frame rate
  - frame count when available
- no public path begins with `docs/`
- no registry path uses a Finder-generated source filename
- no binary mask uses JPEG
- no video has autoplay configured in registry data
- every project-media map key resolves to a real project ID
- no duplicate media IDs exist
- all public files are within size budgets or explicitly documented exceptions

Add media validation to the full `npm run validate` chain after content validation and before tests or build.

---

# 9. Scientific media components

Create static Astro components.

Suggested files:

```text
src/components/media/MediaCaption.astro
src/components/media/ScientificFigure.astro
src/components/media/ScientificImagePair.astro
src/components/media/ScientificVideoPair.astro
src/components/media/ProjectHeroMedia.astro
```

## 9.1 `MediaCaption`

Responsibilities:

- render caption
- render optional credit
- keep scientific caption and credit visually distinct
- use semantic `<figcaption>` where appropriate
- avoid tiny low-contrast text

## 9.2 `ScientificFigure`

Responsibilities:

- render one public image
- preserve intrinsic width and height
- prevent layout shift
- support optional label
- support caption and credit
- use `loading="lazy"` except for explicitly above-the-fold media
- use `decoding="async"`
- never crop scientific media by default

## 9.3 `ScientificImagePair`

Responsibilities:

- render an aligned two-panel figure
- show explicit panel labels
- preserve matching display dimensions
- place panels side by side on wide screens
- stack them on narrow screens
- use one shared figure caption
- accept separate alt text
- avoid JavaScript

Labels should be scientifically explicit.

Approved examples:

```text
Original frame
Binary mask
```

```text
SEM image
PyRO-FOAMS segmentation
```

Do not use:

```text
Before
After
AI output
```

## 9.4 `ScientificVideoPair`

Responsibilities:

- render the synchronized five-second pair
- use visible browser controls
- use `muted`
- use `playsinline`
- do not use `autoplay`
- do not use unconditional looping
- display matching poster frames
- show explicit labels
- include a written accessible description for each panel
- preserve synchronization in source files
- require no JavaScript

Approved labels:

```text
Binary mask sequence
RGB sequence with segmentation contour
```

Do not attempt browser-level linked playback controls during this ticket.

The two independent native controls are acceptable because the clips are visibly labeled and share the same duration.

## 9.5 `ProjectHeroMedia`

Responsibilities:

- render a project’s primary pair or image in a wide editorial region
- support Kīlauea and Ijen media without hard-coded project IDs
- preserve scientific labels
- avoid full-bleed viewport takeover
- remain static and readable

---

# 10. Visual-system corrections

## 10.1 Muted-text contrast

The current `--color-stone` is too dark for small normal text on obsidian and basalt surfaces.

Keep `--color-stone` for:

- borders
- dividers
- decorative rules
- non-text ornament

Add a new readable token, for example:

```css
--color-muted-text: #85827a;
```

The exact value may be adjusted after contrast calculation.

Requirements:

- normal text must meet WCAG AA contrast
- captions must meet WCAG AA
- footer text must meet WCAG AA
- metadata must meet WCAG AA
- disabled-looking contrast must not be used for real content
- decorative rules may remain low contrast

Audit all text uses of `--color-stone`.

Replace text uses with:

- `--color-muted-text`
- `--color-ash`
- another compliant existing token

Do not brighten every border.

## 10.2 Missing spacing token

Add:

```css
--space-10: 2.5rem;
```

or replace all uses with an existing intentional token.

Prefer adding the token because the project detail page already uses it.

## 10.3 Image-specific tokens

Add only genuinely reusable tokens, such as:

```css
--media-border-color
--media-caption-width
--media-gap
```

Do not create a large design-token taxonomy.

## 10.4 Project summary crop behavior

The current project image uses:

```css
aspect-ratio: 16 / 9;
object-fit: cover;
```

This may crop scientific boundaries.

Update the component so:

- editorial photographs may use controlled crop behavior
- scientific figures default to `object-fit: contain`
- no mask or SEM image is cropped
- featured media uses explicit intrinsic dimensions

Do not force all project media into one 16:9 shape.

---

# 11. Homepage refinement

The homepage should gain a strong scientific focal point.

## 11.1 Hero composition

Refine the hero into a responsive two-column composition:

### Left

- current eyebrow
- Joel Sotelo Flores
- existing positioning statement
- academic metadata
- existing calls to action

### Right

Use the daytime Kīlauea RGB/mask pair.

Requirements:

- label `Original frame`
- label `Binary mask`
- short shared caption
- load eagerly because it is above the fold
- preserve pair alignment
- stack below hero text on narrow screens
- do not autoplay video in the hero
- do not use a slider
- do not obscure the scientific image with decorative overlays

## 11.2 Featured projects

Replace the current repeated text-row treatment for the two featured projects with alternating editorial features.

### Kīlauea feature

Use:

- project title
- project summary
- status
- themes
- daytime or nighttime pair
- detail-page link

### Ijen feature

Use:

- project title
- project summary
- status
- themes
- SEM/PyRO-FOAMS pair
- detail-page link

Alternate image/text placement on wide screens.

Stack consistently on mobile.

Do not create a rounded-card wall.

## 11.3 Research approach

Retain:

- Observe
- Segment
- Quantify

Refine spacing and line treatment so it visually connects to the paired scientific figures.

Do not add animation.

## 11.4 Performance

The homepage should not load:

- both Kīlauea videos
- all field photographs
- all screenshots
- both About portraits

Only critical homepage media should be requested.

---

# 12. About-page refinement

Add one primary portrait.

Use:

```text
IMG_3387.jpeg — Joel standing on Mauna Loa
```

as the primary About-page image.

Create:

```text
public/media/about/joel-mauna-loa.webp
```

Placement:

- above or integrated with the education sidebar
- visually connected to the volcanic research identity
- responsive at narrow widths
- no circular crop
- no decorative frame that overwhelms the image
- preserve natural composition

Draft alt text:

> Joel Sotelo Flores standing on the volcanic landscape of Mauna Loa.

A visible caption is optional.

The full-body Kīlauea image may appear later on the Kīlauea project page.

Do not add all personal photographs to the About page.

---

# 13. Kīlauea project-page refinement

The Kīlauea detail page should become the strongest project case study.

## 13.1 Hero media

Place the daytime RGB/mask pair between the project header and the metadata/prose layout.

Labels:

```text
Original frame
Binary mask
```

Caption:

> Daytime Kīlauea lava-fountain frame and its aligned binary segmentation mask.

Do not identify the mask as manual or model-generated.

## 13.2 Analysis media section

Add a page-level media section after the verified project prose.

Suggested order:

1. Nighttime RGB/mask pair
2. Synchronized five-second video pair
3. FountainLabeller screenshot
4. Kīlauea fountain field photograph
5. Kīlauea sunset photograph
6. Full-body Kīlauea portrait
7. Group fieldwork photograph

This may use a restrained mixed editorial layout rather than one repetitive gallery grid.

## 13.3 Video labels

Use:

```text
Binary mask sequence
RGB sequence with segmentation contour
```

Caption:

> Two synchronized views of the same five-second Kīlauea sequence.

Do not say “model inference.”

## 13.4 Software screenshot

Label:

```text
FountainLabeller
```

Caption:

> FountainLabeller interface used to select frames, create segmentation masks, and organize model-ready training data.

Only use this caption if the screenshot visibly supports it and no private details remain.

## 13.5 Field context

Use the fountain and sunset photographs to support observation mode.

Avoid presenting decorative scenery as a scientific result.

Keep field imagery visually subordinate to the original/mask and video pairs.

---

# 14. Ijen project-page refinement

## 14.1 Hero media

Use the SEM/PyRO-FOAMS pair between the project header and body layout.

Labels:

```text
SEM image
PyRO-FOAMS segmentation
```

Caption:

> Original SEM image and aligned binary segmentation produced with PyRO-FOAMS.

Do not describe white or black pixel meaning.

Do not display “Site 8” unless it remains visible within the approved image itself.

## 14.2 Methods media

Add the sanitized PyRO-FOAMS interface screenshot after the project prose.

Label:

```text
PyRO-FOAMS
```

Caption:

> PyRO-FOAMS interface used for automated stereometric analysis of pyroclast imagery.

## 14.3 Scope discipline

Do not invent:

- micro-CT visuals not supplied
- 3D pore networks
- permeability figures
- final numerical results
- manuscript figures

The Ijen page may contain fewer media items than the Kīlauea page.

---

# 15. Research index behavior

The Research index should remain scannable.

Do not embed full image pairs for all six projects.

For the two active projects:

- use one compact representative image or paired thumbnail treatment
- retain title, status, themes, and summary
- ensure the media does not dominate the list

For completed projects:

- remain text-first
- do not show placeholders
- do not reuse unrelated volcanology imagery

---

# 16. Software and Presentations pages

Do not populate the software collection merely because screenshots now appear on project pages.

The Software page should remain a factual empty state until software metadata is fully resolved.

Do not add software screenshots there during this ticket.

The Presentations page remains unchanged.

---

# 17. Media performance budgets

Use the following targets.

## Homepage

Total critical still-image transfer:

```text
target: under 1 MB
```

## Individual images

Photographs and RGB scientific images:

```text
target: under 400 KB each
```

Binary masks:

```text
target: under 150 KB each
```

Screenshots:

```text
target: under 500 KB each
```

## Videos

Each five-second MP4:

```text
target: under 3 MB
```

These are targets, not permission to destroy scientific legibility.

Document exceptions.

## Loading

- hero pair: eager
- below-fold stills: lazy
- videos: `preload="metadata"` or `preload="none"`
- screenshots: lazy
- About portrait: lazy unless above the initial viewport

---

# 18. Build verification corrections

The current verifier ignores JavaScript inside `dist/_astro/`.

Correct it.

The verification process must:

1. search all of `dist/` for `.js` and `.mjs`
2. inspect all generated HTML for `<script>` tags
3. report every browser-delivered JavaScript file
4. fail if unexpected client JavaScript exists
5. allow only files proven not to be referenced by public HTML, if such build artifacts exist
6. document any exception precisely

Do not claim “zero client JavaScript” merely because scripts are located inside `_astro/`.

Add checks for:

- homepage media paths
- Kīlauea detail media paths
- Ijen detail media paths
- About portrait path
- no `autoplay` attribute in generated HTML
- video `controls`
- video `muted`
- image width and height attributes where feasible

---

# 19. Testing

## 19.1 Media pipeline tests

Test:

- deterministic output naming
- source files are never overwritten
- pair dimensions remain equal
- mask output remains PNG
- registry paths are public-relative
- duplicate media IDs fail
- missing files fail
- empty alt text fails
- video-pair mismatch fails

Use small synthetic fixtures under `tests/fixtures/` when practical.

Do not duplicate the full production pipeline in test helpers.

## 19.2 Component tests

Add structural or server-rendered tests where supported.

Verify:

### ScientificImagePair

- renders two labeled panels
- renders two distinct alt texts
- renders one shared caption
- emits no script
- emits no comparison-slider controls
- preserves explicit width and height

### ScientificVideoPair

- renders two videos
- both have controls
- both are muted
- neither autoplays
- both have posters
- both have accessible descriptions
- emits no custom script

### ScientificFigure

- renders optional credit only when present
- does not crop by default
- uses lazy loading when requested

## 19.3 Contrast tests

Create a small utility test that verifies the contrast ratio of normal text tokens against:

- obsidian
- basalt

At minimum, validate:

- ivory
- ash
- muted text
- sandstone link text

Do not require decorative border colors to pass normal-text contrast.

## 19.4 Existing tests

All existing tests must continue to pass.

---

# 20. Accessibility

Required:

- descriptive alt text
- visible labels for scientific panels
- captions that explain the pair relationship
- video controls
- no autoplay
- no information dependent on motion
- no information dependent on color alone
- no hover-only captions
- text descriptions for videos
- readable caption contrast
- proper `<figure>` and `<figcaption>` use
- logical heading structure
- responsive stacked media on mobile
- no horizontal overflow at 320px
- focusable controls use compliant focus styling

Do not hide captions visually while exposing them only to screen readers.

---

# 21. Visual restraint

Ticket 006 may refine:

- hero composition
- project-feature hierarchy
- media borders
- captions
- metadata contrast
- spacing rhythm
- wide media regions
- page-specific observation/analysis transitions

Do not add:

- gradients unrelated to imagery
- masks as decorative page backgrounds
- glowing outlines
- animated borders
- parallax
- custom cursors
- infinite marquee
- hover zoom on scientific images
- floating image mosaics
- large rounded-card grids
- fake scientific measurements
- fake contour overlays
- custom fonts

The images themselves should carry the visual impact.

---

# 22. Documentation

## 22.1 Update `docs/MEDIA_SOURCE_OF_TRUTH.md`

Record:

- all assets approved
- no permission blockers
- actual source filenames
- actual dimensions
- actual formats
- actual public derivative filenames
- final neutral captions
- remaining provenance uncertainties
- derivative-generation command
- source-versus-public folder distinction

## 22.2 Create `docs/MEDIA_PIPELINE.md`

Document:

- dependencies
- source folder
- derivative folder
- processing command
- output formats
- pair-preservation rules
- video synchronization rules
- sanitization behavior
- performance targets
- how to add a future asset
- how to rerun validation

## 22.3 Update `docs/CONTENT_COMPONENTS.md`

Document all new media components.

## 22.4 Update `docs/PAGE_ARCHITECTURE.md`

Document:

- homepage hero pair
- featured-project media
- Kīlauea media sequence
- Ijen media sequence
- About portrait
- loading strategy
- no-autoplay rule

## 22.5 Update README

Add:

```text
npm run media:process
npm run media:validate
```

and link to `docs/MEDIA_PIPELINE.md`.

## 22.6 Ticket record

Store this ticket as:

```text
docs/TICKET_006_SCIENTIFIC_MEDIA_AND_VISUAL_REFINEMENT.md
```

---

# 23. Prohibited work

The agent must not:

- change scientific record content
- change project IDs
- change author order
- add blocked publications
- add presentations
- add software records
- add exhibit records
- publish the CV
- add interactive sliders
- add custom synchronized playback JavaScript
- autoplay video
- add custom fonts
- add stock images
- add generated volcano imagery
- add React
- add GSAP
- add Three.js
- add Tailwind
- add a gallery framework
- add a lightbox library
- add analytics
- deploy
- begin Ticket 007

---

# 24. Acceptance criteria

Ticket 006 is complete only when all applicable conditions are met.

## Approval and documentation

- all inventoried source assets are marked approved
- permission is no longer a blocker
- unresolved scientific provenance is documented neutrally
- no photographer credit is fabricated
- source files remain unchanged

## Media pipeline

- `npm run media:process` exists
- `npm run media:validate` exists
- public derivatives are generated deterministically
- metadata is removed from derivatives
- still pairs remain dimensionally aligned
- video pair remains synchronized
- masks remain lossless
- screenshots are sanitized
- processing report is generated

## Registry

- typed public-media registry exists
- typed project-media map exists
- every public path resolves
- every media ID is unique
- every asset has alt text or video description
- project IDs resolve

## Components

- MediaCaption exists
- ScientificFigure exists
- ScientificImagePair exists
- ScientificVideoPair exists
- ProjectHeroMedia exists
- components emit no custom client JavaScript
- components do not query content collections

## Pages

- homepage hero uses Kīlauea image pair
- homepage featured Kīlauea and Ijen projects use real scientific media
- About page uses Mauna Loa portrait
- Kīlauea detail page uses both still pairs
- Kīlauea detail page uses synchronized video pair
- Kīlauea detail page uses approved screenshot and field media
- Ijen detail page uses SEM/PyRO-FOAMS pair
- Ijen detail page uses approved software screenshot
- completed projects remain text-first
- no unapproved placeholder imagery exists

## Visual system

- muted text passes WCAG AA
- `--space-10` is defined or eliminated
- scientific images are not incorrectly cropped
- no blue UI accents added
- no card-wall redesign
- no custom fonts
- no autoplay

## Verification

- all `.js` and `.mjs` files in `dist/` are inspected
- all generated script tags are inspected
- unexpected browser JavaScript fails validation
- all twelve pages still build
- media paths appear on intended routes
- videos have controls and muted attributes
- no autoplay exists

## Required commands

All must pass:

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

`npm run media:process` must also complete successfully from the approved source files.

---

# 25. Manual verification checklist

## Media processing

1. Run `npm run media:process`.
2. Confirm no source file changed.
3. Inspect the processing report.
4. Confirm all public filenames are descriptive.
5. Confirm masks are PNG.
6. Confirm pair dimensions match.
7. Confirm video duration and dimensions match.
8. Confirm screenshots contain no private paths or account names.

## Homepage

9. Open `/`.
10. Confirm hero pair is visible without overwhelming the text.
11. Confirm labels read `Original frame` and `Binary mask`.
12. Confirm pair alignment is exact.
13. Confirm the Kīlauea and Ijen featured sections use their own media.
14. Confirm homepage does not load videos.
15. Test at 320px.
16. Confirm no horizontal scrolling.

## About

17. Open `/about`.
18. Confirm Mauna Loa image is used.
19. Confirm it is not circularly cropped.
20. Confirm education remains easy to scan.
21. Confirm image alt text is accurate.

## Kīlauea project

22. Open `/research/kilauea-lava-fountain-computer-vision`.
23. Confirm daytime pair alignment.
24. Confirm nighttime pair alignment.
25. Confirm neutral mask language.
26. Confirm video labels are accurate.
27. Confirm both videos have controls.
28. Confirm neither video autoplays.
29. Confirm posters correspond to the same moment.
30. Confirm FountainLabeller screenshot is sanitized.
31. Confirm field imagery is subordinate to scientific media.
32. Confirm project metadata remains readable.

## Ijen project

33. Open `/research/ijen-pyroclast-microct-analysis`.
34. Confirm SEM pair alignment.
35. Confirm labels read `SEM image` and `PyRO-FOAMS segmentation`.
36. Confirm no unsupported white/black interpretation appears.
37. Confirm PyRO-FOAMS screenshot is sanitized.
38. Confirm no invented micro-CT or pore-network figure appears.

## Accessibility and contrast

39. Tab through all changed pages.
40. Confirm media controls receive visible focus.
41. Confirm captions are readable.
42. Confirm muted metadata is readable.
43. Test browser zoom at 200%.
44. Confirm pairs stack cleanly.
45. Confirm no content is available only on hover.

## Build

46. Run `npm run build`.
47. Run `npm run site:verify`.
48. Search all `dist/` for `.js` and `.mjs`.
49. Search generated HTML for `<script>`.
50. Confirm no unexpected browser JavaScript exists.
51. Run `git diff`.
52. Confirm academic content records did not change.
53. Confirm source media was not overwritten.

---

# 26. Required completion report

The agent’s final response must use this structure.

## Summary

Describe:

- approval-document update
- media pipeline
- public registry
- components
- page integrations
- contrast and verification corrections

## Source media

List:

- every source file processed
- dimensions
- source format
- source size
- approval status

## Public derivatives

List:

- output path
- output dimensions
- output format
- output size
- source asset
- page role

## Pair validation

Report:

- still-pair dimension matches
- video duration match
- video frame-rate match
- video frame-count match
- poster-frame timestamp

## Components

List every created or materially changed component.

## Routes changed

List each public route whose visual composition changed.

## Modified files

List every created and modified file.

## Validation

Report:

- Node version
- Astro version
- formatting
- lint
- type checking
- content validation
- media validation
- tests
- build
- site verification
- all generated JavaScript files
- all generated script tags
- full validation

## Manual verification

Provide exact commands and the highest-risk visual and scientific checks.

## Remaining limitations

State only real limitations, including:

- segmentation provenance remains neutrally described unless later verified
- photographer credits may remain absent
- no public CV
- no software collection records
- no presentation records
- no exhibit implementation
- no interactive comparison slider
- no custom synchronized video controls
- no custom fonts
- deployment remains out of scope

Do not begin Ticket 007.
