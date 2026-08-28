# Manual Asset Creation Required for Ticket 015

## Overview

Ticket 015 metadata implementation is complete. Two manual asset creation tasks remain before deployment.

---

## 1. Social Preview Image

**File:** `public/social/joel-sotelo-flores-og.jpg`

**Status:** ⚠️ NEEDS CREATION

**Source material:** `public/media/home/kilauea-sunset-hero.webp`

### Specifications

- **Dimensions:** 1200 × 630 pixels
- **Format:** JPG (best social platform compatibility)
- **File size:** < 500 KB preferred, < 1 MB maximum
- **Color space:** sRGB

### Design Requirements

**Content:**

- Kīlauea sunset image as background
- Text: "Joel Sotelo Flores"
- Subtitle: "Computational & Physical Volcanology"
- Optional tagline: "Computer Vision · Scientific Software · Volcanic Image Analysis"

**Visual treatment:**

- Typography: Use Inter (site font) for headings
- Color: Wine accent (#79242f) for text or accents
- Background: May need subtle darkening for text contrast
- Style: Restrained, research-focused, academically credible

**What to avoid:**

- CV-style bullet lists
- University logos
- Software icons or fake code
- Overly decorative elements
- QR codes or contact information

### Tools

Use any image editor:

- Photoshop
- GIMP (free)
- Figma (free tier)
- Canva (free tier)
- Affinity Photo

### Process

1. Open `public/media/home/kilauea-sunset-hero.webp`
2. Resize canvas to 1200 × 630 pixels
3. Crop/position sunset imagery appropriately
4. Add subtle darkening overlay if needed for text legibility
5. Add text layers with site typography
6. Export as JPG, optimize for file size
7. Save to `public/social/joel-sotelo-flores-og.jpg`
8. Rebuild site: `npm run build`
9. Verify in Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
10. Verify in LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

---

## 2. Favicon Assets

**Files needed:**

- `public/favicon.ico`
- `public/favicon.svg`
- `public/apple-touch-icon.png`

**Status:** ⚠️ NEEDS CREATION

### Specifications

**favicon.ico:**

- Multi-size ICO format (16×16, 32×32)
- For legacy browser support

**favicon.svg:**

- Scalable vector graphic
- For modern browsers
- Clean rendering at any size

**apple-touch-icon.png:**

- 180 × 180 pixels
- PNG format
- For iOS home screen

### Design Requirements

**Concept:**

- Simple abstract mark OR initials "JSF"
- Wine accent color (#79242f)
- Optional ivory background (#f3efe7)
- Minimal, legible at small sizes
- Professional, academically credible

**What to avoid:**

- University logos
- Volcano clip art
- Emoji
- Overly detailed scientific imagery
- Multiple colors (keep it simple)

### Tools

Use vector editor:

- Figma (free tier, recommended)
- Adobe Illustrator
- Inkscape (free)
- Affinity Designer

### Process

1. Design simple mark/initials in vector editor
2. Keep design minimal and legible at 16×16 pixels
3. Use wine color (#79242f) as primary
4. Export SVG for `favicon.svg`
5. Export 32×32 PNG, convert to ICO for `favicon.ico`
6. Export 180×180 PNG for `apple-touch-icon.png`
7. Place all three files in `public/`
8. Add HTML to `src/layouts/BaseLayout.astro` `<head>`:
   ```html
   <link rel="icon" type="image/x-icon" href="/favicon.ico" />
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   ```
9. Rebuild site: `npm run build`
10. Test in multiple browsers (Chrome, Firefox, Safari)
11. Test on iOS device

---

## Verification After Asset Creation

Once both assets are created:

1. **Build site:**

   ```bash
   npm run build
   ```

2. **Check files exist:**

   ```bash
   ls -lh dist/social/joel-sotelo-flores-og.jpg
   ls -lh dist/favicon.*
   ls -lh dist/apple-touch-icon.png
   ```

3. **Test social preview:**
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - Paste homepage URL: https://joelsoteloflores.rocks

4. **Test favicons:**
   - Open site in Chrome, Firefox, Safari
   - Check browser tab shows icon
   - Check on iOS home screen if applicable
   - Verify in browser DevTools

5. **Run full validation:**
   ```bash
   npm run validate
   ```

---

## Timeline

**Recommended:** Create these assets before Ticket 016 (production deployment).

**Estimated time:** 1-2 hours total for both assets

**Can deploy without these:** Technically yes, but social sharing and browser identity will be incomplete.

---

## Questions or Issues?

If asset creation is challenging:

1. **Social preview:** Can use a solid color background with text only as a temporary solution
2. **Favicons:** Can use a simple text-based SVG with "JSF" initials
3. **Professional help:** Consider hiring a designer on Fiverr for $10-20

The metadata infrastructure is ready - only the image files need to be created manually.
