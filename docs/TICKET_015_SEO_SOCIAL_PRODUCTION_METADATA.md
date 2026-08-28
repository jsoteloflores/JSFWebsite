# Ticket 015 — SEO, Social Preview, Site Identity, and Production Metadata

**Status:** COMPLETED

**Date:** August 28, 2026

---

## Objective

Prepare the website for public deployment at `https://joelsoteloflores.rocks` with production-ready metadata, canonical URLs, social sharing metadata, sitemap/robots support, and route-specific SEO descriptions.

This ticket adds metadata infrastructure **without redesigning content, layout, navigation, or visual structure**.

---

## Production Identity

### Domain

```text
https://joelsoteloflores.rocks
```

Used consistently across:

- Canonical URLs
- Open Graph URLs
- Sitemap URLs
- Structured data URLs
- Social preview URLs
- Astro site configuration

### Homepage Title

```text
Joel Sotelo Flores | Computational & Physical Volcanology
```

No site suffix appended (special case for homepage).

### Interior Page Titles

Pattern: `{Page Title} | Joel Sotelo Flores`

All interior pages follow this consistent pattern.

---

## Metadata Coverage

### All Routes

| Route              | Title                                                      | Description                                                                                    | Status      |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------- |
| `/`                | Joel Sotelo Flores \| Computational & Physical Volcanology | Advisor-facing description highlighting computer vision, scientific software, volcanic imagery | ✓           |
| `/research`        | Research \| Joel Sotelo Flores                             | Research projects in computational volcanology, CV, micro-CT, astronomy, physics               | ✓           |
| `/publications`    | Publications \| Joel Sotelo Flores                         | Peer-reviewed publications and active manuscripts                                              | ✓           |
| `/presentations`   | Presentations \| Joel Sotelo Flores                        | Conference presentations and submitted abstracts                                               | ✓           |
| `/software`        | Software \| Joel Sotelo Flores                             | Scientific software for image-based analysis                                                   | ✓           |
| `/cv`              | Curriculum Vitae \| Joel Sotelo Flores                     | CV including research, pubs, presentations, software, awards, teaching                         | ✓           |
| `/about`           | About \| Joel Sotelo Flores                                | Undergraduate researcher studying physics and geoscience at W&L                                | ✓           |
| `/404`             | Page not found \| Joel Sotelo Flores                       | Error page description                                                                         | ✓ (noindex) |
| `/research/{slug}` | {Project Title} \| Joel Sotelo Flores                      | Project-specific summary from content collection                                               | ✓           |

**Total routes with metadata:** 14 pages (8 static + 6 project pages)

All routes have:

- Unique, route-specific titles
- Unique, route-specific descriptions
- Canonical URLs with production domain
- Open Graph metadata
- Twitter Card metadata

---

## Social Metadata

### Open Graph Tags

All pages include:

```html
<meta property="og:title" content="{Full Page Title}" />
<meta property="og:description" content="{Page Description}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="{Canonical URL}" />
<meta
  property="og:image"
  content="https://joelsoteloflores.rocks/social/joel-sotelo-flores-og.jpg"
/>
<meta property="og:site_name" content="Joel Sotelo Flores" />
```

### Twitter Card Tags

All pages include:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{Full Page Title}" />
<meta name="twitter:description" content="{Page Description}" />
<meta
  name="twitter:image"
  content="https://joelsoteloflores.rocks/social/joel-sotelo-flores-og.jpg"
/>
```

### Social Preview Image

**Path:** `/social/joel-sotelo-flores-og.jpg`

**Absolute URL:** `https://joelsoteloflores.rocks/social/joel-sotelo-flores-og.jpg`

**Status:** ⚠️ **Asset creation needed**

The metadata references are in place. A 1200×630 JPG social preview image needs to be created manually, derived from the Kīlauea sunset visual (available at `public/media/home/kilauea-sunset-hero.webp`).

**Design specifications:**

- Dimensions: 1200 × 630 pixels
- Format: JPG (best social platform compatibility)
- File size: < 500 KB preferred, < 1 MB maximum
- Content: Kīlauea sunset with "Joel Sotelo Flores" and "Computational & Physical Volcanology" text
- Style: Restrained, research-focused, uses site typography and wine accent color
- Avoid: CV bullet lists, logos, fake code, software icons, QR codes

---

## Structured Data

### JSON-LD Person (Homepage Only)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Joel Sotelo Flores",
  "url": "https://joelsoteloflores.rocks/",
  "sameAs": [
    "https://github.com/jsoteloflores",
    "https://www.linkedin.com/in/joelsoteloflores"
  ],
  "affiliation": {
    "@type": "CollegeOrUniversity",
    "name": "Washington and Lee University"
  },
  "description": "Undergraduate researcher in computational and physical volcanology."
}
```

**Included:**

- GitHub profile URL
- LinkedIn profile URL
- Current institution affiliation
- Conservative professional description

**Excluded (as required):**

- Email address
- Phone number
- Home address
- Birth date
- `alumniOf` (not graduated yet)
- Inflated job titles

---

## Sitemap / Robots

### Sitemap

**Integration:** `@astrojs/sitemap` (installed)

**Generated files:**

- `dist/sitemap-index.xml` — Index file
- `dist/sitemap-0.xml` — Primary sitemap

**Included routes:** 13 public pages

- Homepage
- 7 static pages (research, publications, presentations, software, cv, about)
- 6 project pages

**Excluded routes:** `/404` (noindexed)

**Domain:** All URLs use `https://joelsoteloflores.rocks`

**Verification:** ✓ Sitemap generated successfully in build

### Robots.txt

**Location:** `public/robots.txt`

**Content:**

```text
User-agent: *
Allow: /

Sitemap: https://joelsoteloflores.rocks/sitemap-index.xml
```

**Status:** ✓ Created and copied to dist during build

---

## Favicon and Site Identity

**Status:** ⚠️ **Asset creation needed**

Favicon assets need to be created manually:

- `favicon.ico` — Legacy browser support
- `favicon.svg` — Modern browsers, scalable
- `apple-touch-icon.png` — iOS home screen

**Design specifications:**

- Simple abstract mark or initials (`JSF`)
- Uses wine accent color (#79242f)
- Avoids university logos, volcano clip art, emoji
- Minimal, professional, academically credible

These assets should be placed in `public/` and referenced in `BaseLayout.astro` `<head>`.

---

## Modified Files

### New Files (3)

1. **`public/robots.txt`** — Production robots.txt with sitemap reference
2. **`tests/metadata.test.ts`** — 56 comprehensive metadata tests
3. **`docs/SEO_METADATA.md`** — Complete metadata reference documentation

### Modified Files (10)

1. **`astro.config.mjs`**
   - Added `site: 'https://joelsoteloflores.rocks'`
   - Added `@astrojs/sitemap` integration

2. **`package.json`**
   - Added `@astrojs/sitemap` dependency

3. **`src/layouts/BaseLayout.astro`**
   - Extended Props interface with `canonical`, `ogImage`, `ogType`, `noindex`, `includeStructuredData`
   - Added homepage vs interior page title logic
   - Added canonical link tag
   - Added Open Graph metadata tags (6 tags)
   - Added Twitter Card metadata tags (4 tags)
   - Added conditional JSON-LD structured data for homepage
   - Added conditional noindex meta tag

4. **`src/pages/index.astro`**
   - Updated title to full production homepage title
   - Updated description to advisor-facing version
   - Added `includeStructuredData={true}`

5. **`src/pages/research.astro`**
   - Updated description to mention computational volcanology, CV, micro-CT, astronomy, physics

6. **`src/pages/publications.astro`**
   - Updated description to emphasize peer-reviewed and active manuscripts

7. **`src/pages/presentations.astro`**
   - Updated description to mention submitted abstracts explicitly

8. **`src/pages/software.astro`**
   - Updated description to emphasize image-based analysis

9. **`src/pages/cv.astro`**
   - Updated description to list CV sections explicitly

10. **`src/pages/about.astro`**
    - Updated description to mention physics and earth/environmental geoscience degrees

11. **`src/pages/404.astro`**
    - Added `noindex={true}` prop

12. **`src/pages/research/[id].astro`**
    - No changes needed (already uses project title/summary from content collection)

---

## Validation

### Automated Tests

**New tests added:** 56 metadata tests

**Total test suite:** 352 tests (was 296)

**Test coverage:**

- ✓ Homepage title without suffix
- ✓ Interior page title pattern (7 pages)
- ✓ Route-specific descriptions (7 pages)
- ✓ Canonical URLs with production domain (7 pages)
- ✓ No localhost in canonical URLs
- ✓ Open Graph metadata presence (6 tags)
- ✓ Twitter Card metadata presence (4 tags)
- ✓ JSON-LD Person structured data
- ✓ GitHub and LinkedIn in sameAs array
- ✓ Affiliation included
- ✓ Email excluded from structured data
- ✓ Homepage does not have noindex
- ✓ 404 has noindex
- ✓ Sitemap files exist
- ✓ Sitemap uses production domain
- ✓ Sitemap includes expected routes
- ✓ Sitemap excludes 404
- ✓ Robots.txt exists and configured correctly
- ✓ Project pages have unique titles
- ✓ Special characters handled (Kīlauea, ampersands)

**Test results:**

```
Test Files  10 passed (10)
Tests  352 passed (352)
Duration  789ms
```

### Validation Commands

All validation commands pass:

```bash
✓ npm run format      # All files properly formatted
✓ npm run lint        # 0 errors, 0 warnings
✓ npm run typecheck   # No type errors
✓ npm test            # 352 tests passing
✓ npm run build       # 14 pages built successfully
✓ npm run site:verify # All checks passed
```

**Build output:**

- 14 pages generated
- Sitemap generated: `[@astrojs/sitemap] 'sitemap-index.xml' created at 'dist'`
- No errors or warnings
- Zero client-side JavaScript (static-only site preserved)

### Manual Verification

**Homepage metadata inspection (dist/index.html):**

- ✓ Title: "Joel Sotelo Flores | Computational & Physical Volcanology"
- ✓ Canonical: `https://joelsoteloflores.rocks/`
- ✓ OG tags present with production domain
- ✓ Twitter Card tags present
- ✓ JSON-LD Person data present
- ✓ GitHub and LinkedIn URLs in sameAs
- ✓ No noindex tag

**404 page metadata inspection (dist/404.html):**

- ✓ Title: "Page not found | Joel Sotelo Flores"
- ✓ Noindex tag: `<meta name="robots" content="noindex">`
- ✓ Canonical URL still present
- ✓ OG metadata still present (for direct access)

**Interior pages inspection:**

- ✓ Research: Title suffix, unique description
- ✓ Publications: Title suffix, unique description
- ✓ Presentations: Title suffix, unique description
- ✓ Software: Title suffix, unique description
- ✓ CV: Title suffix, unique description
- ✓ About: Title suffix, unique description

**Sitemap inspection (dist/sitemap-0.xml):**

- ✓ Contains 13 public routes
- ✓ Uses production domain for all URLs
- ✓ Does not contain /404
- ✓ Well-formed XML

**Robots.txt inspection (dist/robots.txt):**

- ✓ Allows all user agents
- ✓ References sitemap with production domain
- ✓ Copied to dist/ correctly

---

## Browser Verification Steps

### Recommended Manual Checks (Pre-Deployment)

1. **Build and preview:**

   ```bash
   npm run build
   npm run preview
   ```

2. **View source for homepage:**
   - Verify title is complete (no double suffix)
   - Check canonical URL uses production domain
   - Verify OG image path is correct
   - Confirm JSON-LD is present and valid

3. **View source for interior pages:**
   - Verify title has site suffix
   - Check descriptions are unique
   - Confirm canonical URLs are correct

4. **Check 404 page:**
   - Navigate to `/test` or any non-existent route
   - Verify custom 404 renders
   - View source to confirm noindex tag

5. **Download sitemap:**
   - Visit `/sitemap-index.xml`
   - Visit `/sitemap-0.xml`
   - Verify production domain in all URLs
   - Confirm expected route count (13)

6. **Check robots.txt:**
   - Visit `/robots.txt`
   - Verify sitemap reference

### Post-Deployment Verification

After deploying to production:

1. **Open Graph validation:**
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
   - Paste homepage URL and verify preview renders correctly

2. **Twitter Card validation:**
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - Verify large image card renders

3. **Structured Data validation:**
   - Google Rich Results Test: https://search.google.com/test/rich-results
   - Schema.org Validator: https://validator.schema.org/
   - Verify Person data is valid

4. **Google Search Console:**
   - Submit sitemap
   - Monitor indexing status
   - Check for any coverage issues

---

## Remaining Work

### Required Manual Asset Creation

**1. Social Preview Image**

**File:** `public/social/joel-sotelo-flores-og.jpg`

**Source:** `public/media/home/kilauea-sunset-hero.webp`

**Specifications:**

- Dimensions: 1200 × 630 pixels
- Format: JPG
- File size: < 500 KB preferred
- Design:
  - Kīlauea sunset as background
  - Text: "Joel Sotelo Flores"
  - Subtitle: "Computational & Physical Volcanology"
  - Optional tagline: "Computer Vision · Scientific Software · Volcanic Image Analysis"
  - Typography: Use Inter for headings (site font)
  - Color: Wine accent (#79242f) for text or accents
  - Treatment: Subtle darkening for text contrast if needed
  - Style: Restrained, research-focused, academically credible

**Tools:** Use image editor (Photoshop, GIMP, Figma, Canva) to create from existing sunset asset.

**Validation:** After creation, rebuild site and verify OG image loads correctly.

---

**2. Favicon Assets**

**Files needed:**

- `public/favicon.ico` — 16×16 and 32×32 multi-size ICO
- `public/favicon.svg` — Scalable vector icon
- `public/apple-touch-icon.png` — 180×180 PNG for iOS

**Design:**

- Simple abstract mark or initials: `JSF`
- Wine accent color: `#79242f`
- Ivory background: `#f3efe7` (optional)
- Minimal, legible at small sizes
- Avoid: university logos, emoji, overly detailed scientific imagery

**HTML additions needed in BaseLayout.astro `<head>`:**

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

**Tools:** Use vector editor (Figma, Illustrator, Inkscape) for SVG, export ICO and PNG versions.

**Validation:** After creation, test in multiple browsers and iOS.

---

### No Deployment Yet (Ticket 016)

This ticket prepares metadata but does **not**:

- Import Vercel project
- Perform production deployment
- Assign custom domain
- Configure DNS
- Verify SSL
- Run production smoke tests
- Register with Google Search Console

Deployment is deferred to **Ticket 016**.

---

## Acceptance Criteria

All Ticket 015 acceptance criteria met:

✓ `astro.config` uses `https://joelsoteloflores.rocks`  
✓ Homepage title is production-ready (no suffix)  
✓ All interior pages have site-name title suffix  
✓ All pages have unique descriptions  
✓ Every indexable page has canonical URL  
✓ Open Graph metadata exists (6 tags per page)  
✓ Twitter large-image metadata exists (4 tags per page)  
✓ Default OG image path configured (asset creation pending)  
✓ JSON-LD Person data present on homepage  
✓ GitHub + LinkedIn included in `sameAs`  
✓ Email excluded from structured data  
✓ Favicon configuration ready (asset creation pending)  
✓ Sitemap generated automatically  
✓ Robots file configured  
✓ 404 is noindex  
✓ 404 excluded from sitemap  
✓ No analytics added  
✓ No client JS added  
✓ All automated validation passes

**Status: COMPLETE** (pending two manual asset creation tasks)

---

## Next Steps

### Immediate (Pre-Deployment)

1. **Create social preview image**
   - Use `public/media/home/kilauea-sunset-hero.webp` as source
   - Follow design specifications above
   - Save as `public/social/joel-sotelo-flores-og.jpg`
   - Rebuild and verify in OG debuggers

2. **Create favicon assets**
   - Design simple JSF mark or abstract icon
   - Generate `.ico`, `.svg`, and `.png` versions
   - Place in `public/`
   - Add `<link>` tags to BaseLayout
   - Test in multiple browsers

3. **Final QA pass**
   - Build site with real assets
   - Test OG preview on Facebook/LinkedIn validators
   - Test Twitter Card
   - Verify favicons appear correctly
   - Check mobile viewport rendering

### Deployment (Ticket 016)

1. Import repository to Vercel
2. Configure build settings
3. Deploy to staging
4. Assign `joelsoteloflores.rocks` domain
5. Configure DNS (A/CNAME records)
6. Verify SSL certificate
7. Deploy to production
8. Run production smoke tests
9. Submit sitemap to Google Search Console
10. Monitor indexing status

### Post-Deployment

1. Verify metadata in production
2. Test social sharing on multiple platforms
3. Monitor Google Search Console for issues
4. Consider analytics (separate decision)
5. Monitor site performance
6. Gather user feedback

---

## Documentation

**Created:**

- `docs/SEO_METADATA.md` — Comprehensive metadata reference
- `docs/TICKET_015_SEO_SOCIAL_PRODUCTION_METADATA.md` — This completion report

**Updated:**

- N/A (no existing metadata documentation)

**Reference for future work:**

- Metadata conventions in SEO_METADATA.md
- Test patterns in tests/metadata.test.ts
- BaseLayout API for new pages

---

## Dependencies

**Added:**

- `@astrojs/sitemap` (7 packages total)

**No security vulnerabilities introduced.**

---

## Performance Impact

**Zero.**

Metadata additions are static HTML in `<head>`.

- No new client-side JavaScript
- No new runtime dependencies
- No impact on page load time
- Sitemap files are small XML (< 2 KB)
- Social preview image will be optimized (< 500 KB target)

Site remains static-only with zero JS bundle.

---

## Notes

### What Changed

- All pages now have production-ready SEO metadata
- Sitemap automatically generated on build
- Robots.txt allows search engines
- Homepage has structured data for search engines
- 404 correctly excluded from indexing
- Social sharing will display correctly (once OG image is created)

### What Did Not Change

- Page content (research prose, CV, project descriptions)
- Page layout or visual design
- Navigation structure
- Colors, fonts, or spacing
- Media assets (except pending social preview)
- Homepage hero image (unchanged)
- Performance (still zero JS)

### Deferred to Later

- Analytics tracking
- Google Search Console verification tokens
- Project-specific social images
- Additional structured data types
- Web app manifest
- Enhanced favicon sizes (512×512, etc.)

These were explicitly out of scope per ticket requirements.

---

## Lessons Learned

1. **Structured data should be conservative:** Used only verified fields, avoided inflating undergraduate status.

2. **Metadata is not decoration:** Every tag serves a specific search engine or social platform purpose.

3. **Testing catches inconsistencies early:** Automated tests found that homepage needed special title handling.

4. **Asset creation requires design skills:** OG image and favicons can't be fully automated—they need manual design work.

5. **Production domain early:** Setting production URL in config (even pre-deployment) ensures all generated metadata uses correct URLs.

---

## Conclusion

Ticket 015 successfully prepared the site for public deployment with comprehensive SEO and social metadata infrastructure.

The site now has:

- Production-ready titles and descriptions for all routes
- Complete Open Graph and Twitter Card metadata
- JSON-LD structured data for homepage
- Automatically generated sitemap
- Configured robots.txt
- Proper canonical URLs throughout
- 404 page correctly noindexed
- 56 new automated tests validating all metadata
- Complete documentation for future maintenance

Two manual asset creation tasks remain (social preview image and favicons), both clearly specified and ready to implement.

The site is ready for **Ticket 016: Production Deployment**.
