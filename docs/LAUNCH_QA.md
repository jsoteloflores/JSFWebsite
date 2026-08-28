# Launch QA Checklist

## Purpose

This document provides a reusable quality-assurance checklist for validating the portfolio site before deployment or major content updates.

Use this checklist to ensure:

- Content integrity and accuracy
- Responsive behavior across viewports
- Accessibility compliance
- Performance standards
- No placeholder or internal language

---

## Quick validation commands

```bash
npm run format:check
npm run lint
npm run typecheck
npm run content:validate
npm run media:validate
npm run test
npm run build
npm run site:verify
```

All commands must pass before deployment.

---

## Content integrity

### Scholarly output verification

- [ ] All manuscript titles match approved source
- [ ] All author lists match approved source and preserve exact order
- [ ] Publication statuses are accurate (in-review, in-preparation, published)
- [ ] No fabricated DOIs, journals, or acceptance dates
- [ ] Conference presentation locations are verified or omitted
- [ ] Abstract titles match submitted abstracts (not manuscript titles)
- [ ] Software descriptions match actual capabilities

### Negative regression tests

Content must NOT contain:

- [ ] "unresolved questions document"
- [ ] "records are being prepared" or "being withheld"
- [ ] "American Institute of Mathematics" (outdated reference)
- [ ] "James Davis" or "Nial Barber" (corrected author names)
- [ ] "2,300+" (unverified claim)
- [ ] Any TODO, TBD, placeholder markers in public content
- [ ] Lorem ipsum or test data

### Project pages

- [ ] No internal process language ("see internal document", etc.)
- [ ] Research outputs sections are accurate
- [ ] Related publications/presentations sections link correctly
- [ ] No speculative claims about unpublished work

---

## Routes audit

### Verify all expected routes exist

```bash
npm run build
find dist -name "index.html" | sort
```

Expected routes (at minimum):

- `/` (homepage)
- `/about`
- `/cv`
- `/presentations`
- `/publications`
- `/research`
- `/research/kilauea-lava-fountain-computer-vision`
- `/research/ijen-pyroclast-microct-analysis`
- `/research/v0499-centauri-photometry`
- `/research/wds-03575-0110-astrometry`
- `/research/nanoparticle-dipole-self-assembly`
- `/research/riesel-sierpinski-computational-number-theory`
- `/software`
- `/404`

### Verify CV PDF exists

- [ ] `dist/cv/Joel_Sotelo_Flores_CV.pdf` exists
- [ ] Download PDF link works on `/cv` page

---

## Responsive testing matrix

Test all routes at these viewport widths:

| Width  | Priority | Notes            |
| ------ | -------- | ---------------- |
| 320px  | Critical | Minimum mobile   |
| 375px  | Critical | Standard mobile  |
| 768px  | High     | Tablet portrait  |
| 1024px | Medium   | Tablet landscape |
| 1440px | Critical | Standard desktop |
| 1600px | High     | Large desktop    |
| 1920px | Medium   | Full HD          |

### Per-route checklist

- [ ] No horizontal overflow at any test width
- [ ] Navigation remains usable and reachable
- [ ] All interactive elements have adequate touch targets
- [ ] Text remains readable (minimum 16px body)
- [ ] Images scale appropriately
- [ ] No awkward wrapping in headings or author lists
- [ ] Whitespace rhythm is maintained

---

## Navigation audit

- [ ] All nav links resolve correctly
- [ ] Active state appears on current page
- [ ] CV appears before About in navigation order
- [ ] Sticky header does not obscure anchor targets
- [ ] Keyboard navigation reaches all items
- [ ] Focus states are visible
- [ ] No overflow at 320px viewport

---

## Accessibility

### Keyboard navigation

- [ ] All interactive elements reachable via Tab
- [ ] Logical tab order throughout site
- [ ] No keyboard traps
- [ ] Focus states visible on all interactive elements
- [ ] Skip to main content link works

### Semantic HTML

- [ ] Each page has exactly one `<h1>`
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Semantic landmarks used: `<header>`, `<nav>`, `<main>`, `<footer>`
- [ ] Lists use `<ul>`, `<ol>` appropriately
- [ ] Scientific figures use `<figure>` and `<figcaption>`

### Alt text and ARIA

- [ ] All informative images have meaningful alt text
- [ ] Decorative images use empty alt (`alt=""`)
- [ ] No filename-style alt text ("IMG_1234.jpg")
- [ ] No redundant "image of" phrasing
- [ ] Derived graphics use `aria-hidden` where appropriate
- [ ] Navigation has proper `aria-label`

### Contrast and readability

- [ ] Body text meets WCAG AA contrast requirements
- [ ] Link color (wine) is distinguishable and readable
- [ ] Muted text maintains sufficient contrast
- [ ] Status labels are readable
- [ ] Hero text readable against background image

### Motion

- [ ] `prefers-reduced-motion` is respected
- [ ] Nonessential animations disabled when motion reduced
- [ ] All information preserved with motion disabled

---

## Links verification

### Internal links

- [ ] All research project links resolve
- [ ] Related publication links work
- [ ] Related presentation links work
- [ ] Related software links work
- [ ] Navigation links correct
- [ ] No broken internal routes

### External links

- [ ] Email link (`mailto:`) works
- [ ] GitHub link correct and opens in new tab
- [ ] LinkedIn link correct and opens in new tab
- [ ] Publication DOI links work (if present)
- [ ] External links use `rel="noopener noreferrer"`

### Anchor links

- [ ] Section anchors work if present
- [ ] `scroll-margin-top` accounts for sticky header
- [ ] Keyboard navigation to anchors works

---

## Media audit

### Images

- [ ] All images have explicit width and height
- [ ] Responsive images use appropriate sizes
- [ ] Above-fold hero not lazy-loaded
- [ ] Below-fold media uses lazy loading
- [ ] No layout shift during image load
- [ ] Scientific figures have captions
- [ ] Image pairs (e.g., RGB/mask) remain aligned

### Videos

- [ ] No autoplay
- [ ] Controls available
- [ ] `playsinline` attribute present
- [ ] Aspect ratio preserved at all widths
- [ ] Fallback text provided

---

## Performance

### Bundle size

- [ ] No client-side JavaScript unless explicitly needed
- [ ] Homepage initial transfer < 5 MB (ideally < 3 MB)
- [ ] No full-resolution research assets loaded unnecessarily
- [ ] Font loading uses `display=swap`

### Layout shift

- [ ] Media reserves space via dimensions or aspect-ratio
- [ ] No visible content jump during load
- [ ] Fonts load gracefully

---

## HTML validity

- [ ] No duplicate IDs
- [ ] No invalid element nesting
- [ ] No empty anchor elements
- [ ] No malformed markup
- [ ] Authors emphasized with semantic `<strong>`, not `set:html`

---

## Build output verification

### After `npm run build`, inspect dist/

- [ ] 14 pages generated (13 content + 404)
- [ ] CV PDF present in `dist/cv/`
- [ ] No orphan placeholder routes
- [ ] No `.js` or `.mjs` files (static-only site)
- [ ] Media assets properly referenced

### Site verification script

Run `npm run site:verify` and confirm:

- [ ] No JavaScript in output
- [ ] Media paths correct
- [ ] No blue UI colors in authored CSS
- [ ] All expected content present

---

## Visual regression

### Homepage

- [ ] Sunset hero renders correctly at all widths
- [ ] Name and discipline do not wrap awkwardly
- [ ] Featured research sections display properly
- [ ] Kīlauea and Ijen image pairs aligned
- [ ] Research interests readable
- [ ] About preview proportionate

### Project pages

- [ ] Kīlauea derived contour visible but subtle
- [ ] No unintended decorative motifs on other projects
- [ ] Hero media displays correctly
- [ ] Scientific figures render properly
- [ ] Context rail (if present) behaves correctly
- [ ] Mobile layout stacks cleanly

### Scholarly pages

- [ ] Publications page shows all sections
- [ ] Presentations page shows completed and submitted sections
- [ ] Software page uses editorial treatment (no card backgrounds)
- [ ] Author emphasis works correctly
- [ ] Status labels display appropriately

### CV page

- [ ] Layout clean at mobile and desktop
- [ ] Download PDF button prominent
- [ ] All sections present
- [ ] Content matches shared scholarly data sources

### About page

- [ ] Portrait displays correctly
- [ ] Opening hierarchy clear
- [ ] Education sidebar (mobile stacks)
- [ ] Contact links work

---

## Print behavior

### CV page

- [ ] No catastrophic overflow when printed
- [ ] Download PDF remains obvious preferred format

(Elaborate print stylesheets not required; PDF is canonical.)

---

## 404 page

- [ ] Custom 404 page exists
- [ ] Clear messaging
- [ ] Return navigation links work
- [ ] Consistent visual system

---

## Automated test coverage

### Run `npm test` and verify:

- [ ] 296+ tests passing
- [ ] Navigation order correct
- [ ] Critical scholarly titles present
- [ ] Negative regression tests pass (no forbidden content)
- [ ] Shared data architecture intact
- [ ] Heading hierarchy valid across all pages

---

## Pre-deployment checklist

Before deploying:

1. [ ] All automated validation passes
2. [ ] Manual viewport testing complete for critical routes
3. [ ] No placeholder or internal language remains
4. [ ] Scholarly output matches approved CV source
5. [ ] All links verified
6. [ ] Keyboard navigation tested
7. [ ] Performance acceptable
8. [ ] 404 page works

---

## Notes for future QA

- This checklist should be updated when new routes or major features are added
- Viewport testing should include actual devices when possible
- Performance metrics should be measured periodically
- Accessibility audit tools (axe, Lighthouse) provide additional validation

---

## Issues to monitor

Watch for these common regressions:

- Long author lists causing overflow
- Long manuscript titles wrapping awkwardly
- Navigation overflow at narrow widths
- Kīlauea motif becoming too prominent or disappearing unintentionally
- set:html usage creeping back in for author emphasis
- Internal references ("unresolved questions") accidentally added
- Status label confusion (manuscript vs abstract vs software visibility)
