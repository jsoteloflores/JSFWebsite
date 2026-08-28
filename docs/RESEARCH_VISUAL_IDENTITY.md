# Research-Derived Visual Identity

## Purpose

This document describes the research-derived visual identity system introduced in Ticket 010.

The site's visual identity is built from Joel's actual research media, not invented graphics.

Every scientific visual motif originates from:

- approved research images
- approved segmentation masks
- existing verified metadata
- already documented project workflows

If it looks like data, it must come from real data.

---

# Philosophy

The site should feel:

```text
scientific publication
+
field notebook
+
computational volcanology
```

not:

```text
generic "science" graphics
+
fake data visualization
+
decorative tech UI
```

Visual elements communicate:

- project type
- data source
- method
- workflow
- scientific focus

If an element is only decorative, it must be restrained and secondary to actual scientific figures.

---

# Derived Graphics

## Kīlauea Fountain Contour

**Source:** `daytime-fountain-mask.png`

**Output:** `public/media/graphics/kilauea-fountain-contour.svg`

**Extraction method:**

1. Load binary mask with Sharp
2. Moore-Neighbor contour tracing
3. Douglas-Peucker simplification (tolerance: 2.0)
4. SVG generation with proper viewBox

**Result:**

- 152 simplified points
- 2 KB file size
- Preserves recognizable fountain geometry
- Rendered as thin wine-colored outline

**Usage:**

- Appears at bottom of Kīlauea project context rail
- Rendered at 25% opacity
- Hidden on mobile (<900px)
- Used sparingly (1 location per project)

**Accessibility:** `aria-hidden="true"` (decorative, not informative)

---

## Ijen Vesicle Contours

**Source:** `sem-bubble-connectivity-mask.png`

**Output:** `public/media/graphics/ijen-vesicle-contours.svg`

**Extraction method:**

1. Load segmentation mask
2. Moore-Neighbor contour tracing
3. Douglas-Peucker simplification (tolerance: 1.5)
4. SVG generation

**Result:**

- 28 simplified points
- <1 KB file size
- Real vesicle boundary geometry

**Usage:**

- Appears at bottom of Ijen project context rail
- Rendered at 25% opacity
- Hidden on mobile

**Accessibility:** `aria-hidden="true"` (decorative)

---

# Workflow Notation

## Purpose

Show the research process in compact text form using verified workflow stages only.

## Style

- Small sans-serif (0.75rem)
- Uppercase
- Wine color for stages
- Muted arrows (→) between stages
- Horizontal layout with wrapping
- Letter-spacing: 0.06em

## Projects

### Kīlauea

```text
FIELD VIDEO → LABELING → SEGMENTATION → MEASUREMENT
```

All stages verified in project content.

### Ijen

```text
IMAGING → SEGMENTATION → STEREOMETRY → PHYSICAL INTERPRETATION
```

All stages verified in project content.

## Placement

- Between project header and hero media
- Maximum width: 68ch
- Visible on all screen sizes (responsive font sizing)

---

# Scientific Marginalia

## Component

`src/components/core/ScientificMarginalia.astro`

## Purpose

Render verified small-context information in book-like side-note treatment.

## Style

- Small sans (0.6875rem)
- Uppercase
- Wine color
- Generous letter spacing (0.08em)
- Thin vertical rules (left border)
- Substantial whitespace

## Usage

Accepts array of context labels:

```astro
<ScientificMarginalia
  labels={['Field Video', 'Computer Vision', 'Physical Volcanology']}
/>
```

Orientation: `vertical` (default) or `horizontal`

## Guidelines

- Use verified metadata only
- No fabricated dataset numbers
- No invented acquisition details
- Keep labels concise

---

# Media Types

## DerivedGraphic

```ts
export interface DerivedGraphic {
  id: string;
  kind: 'derived-graphic';
  src: string;
  sourceMediaId: string;
  purpose: 'decorative' | 'informative';
  projectId: string;
}
```

**Registered in:** `src/data/media.ts`

**Validation requirements:**

- Source media ID must exist in registry
- Source must belong to appropriate project
- Derived SVG file must exist
- SVG must contain valid viewBox
- File size must be <50 KB (prefer <20 KB)
- No embedded raster data
- No duplicate IDs

---

# Regenerating Graphics

To regenerate derived graphics from source masks:

```bash
npm run graphics:generate
```

This runs `scripts/process-research-graphics.ts`:

1. Loads approved binary masks
2. Extracts contours using Moore-Neighbor tracing
3. Simplifies with Douglas-Peucker algorithm
4. Generates deterministic SVG output
5. Records source relationships

**Output files:**

- `public/media/graphics/kilauea-fountain-contour.svg`
- `public/media/graphics/ijen-vesicle-contours.svg`

**Do not manually edit coordinates** after generation except for formatting/minification.

---

# Prohibited Aesthetics

Do not introduce:

- Reticles, crosshairs, HUD frames
- Fake scale bars
- Artificial timestamps
- Fake coordinates
- Camera overlays
- Bounding boxes
- Matrix grids
- Waveform graphics
- Random particle effects
- Scrolling numbers
- Giant contours behind text
- Contours on every section
- Contours in header/footer
- Background textures
- Animated/morphing contours
- Parallax effects
- Canvas/WebGL rendering

Unless they exist in an actual displayed research product and are scientifically relevant.

---

# Responsive Behavior

## Desktop (>900px)

- Workflow notation: full size (0.75rem)
- Derived graphics: visible in context rail
- Marginalia: vertical orientation with rules

## Tablet (640-900px)

- Workflow notation: slightly smaller (0.6875rem)
- Derived graphics: hidden
- Marginalia: adapts to available space

## Mobile (<640px)

- Workflow notation: compact (0.6875rem)
- Derived graphics: hidden
- Marginalia: horizontal orientation or inline
- No horizontal overflow
- No text wrapping around complex geometry

**Critical:** Never sacrifice mobile readability to preserve decoration.

---

# Accessibility

## Decorative Graphics

```html
<img src="/media/graphics/kilauea-fountain-contour.svg" aria-hidden="true" alt="" />
```

Contours are decorative visual signatures. The scientific concept is already explained in text.

## Informative Graphics

If a derived graphic conveys unique scientific information:

- Provide accessible title
- Add description
- Use appropriate ARIA role

**Default assumption:** derived motif = decorative, actual scientific figure = informative

---

# Performance Budget

**Derived SVG files:**

- Target: <20 KB each
- Hard limit: <50 KB

**Current sizes:**

- Kīlauea fountain: 2 KB ✓
- Ijen vesicles: <1 KB ✓

Do not embed large raster masks to create decorative boundaries.

---

# Project-Specific Identity

## Kīlauea

Visual cues emphasize:

- Fountain silhouette
- Image boundaries
- Temporal imagery
- Video/segmentation workflows

## Ijen

Visual cues emphasize:

- Vesicle geometry
- Specimen texture
- Microscopy
- Segmentation boundaries

## Earlier Projects

No invented project-specific motifs.

Keep typographically driven unless real approved data becomes available.

---

# Maintenance

## When adding new projects

1. Check if approved binary masks or segmentation exists
2. If suitable, generate derived graphic: `npm run graphics:generate`
3. Register in `src/data/media.ts`
4. Add workflow notation if verified stages exist
5. Use ScientificMarginalia for project context
6. Validate with full test suite

## When updating masks

1. Regenerate derived graphics: `npm run graphics:generate`
2. Review visual output for accuracy
3. Confirm file sizes remain within budget
4. Test responsive behavior

---

# Documentation Links

- [Media Pipeline](./MEDIA_PIPELINE.md)
- [Visual System](./VISUAL_SYSTEM.md)
- [Content Components](./CONTENT_COMPONENTS.md)
- [Ticket 010](./TICKET_010_RESEARCH_DERIVED_VISUAL_IDENTITY.md)
