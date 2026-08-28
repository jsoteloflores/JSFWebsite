# SEO and Metadata Reference

## Production Domain

**Canonical domain:**

```text
https://joelsoteloflores.rocks
```

All canonical URLs, Open Graph URLs, sitemaps, and structured data use this domain.

Do not use:

- `localhost`
- `127.0.0.1`
- `vercel.app` subdomains
- `www.` prefix

---

## Title Conventions

### Homepage

```text
Joel Sotelo Flores | Computational & Physical Volcanology
```

The homepage title does not include a suffix because the full identity is already in the title itself.

### Interior Pages

Pattern: `{Page Title} | Joel Sotelo Flores`

Examples:

- `Research | Joel Sotelo Flores`
- `Publications | Joel Sotelo Flores`
- `Presentations | Joel Sotelo Flores`
- `Software | Joel Sotelo Flores`
- `Curriculum Vitae | Joel Sotelo Flores`
- `About | Joel Sotelo Flores`
- `Page not found | Joel Sotelo Flores`

### Project Pages

Pattern: `{Project Title} | Joel Sotelo Flores`

Examples:

- `Kīlauea Lava-Fountain Computer Vision | Joel Sotelo Flores`
- `Ijen Pyroclast Micro-CT Analysis | Joel Sotelo Flores`

Project titles come from the `title` field in project content collection entries.

---

## Description Conventions

Every route has a unique description. The homepage description is advisor-facing and concise.

### Homepage

```text
Joel Sotelo Flores is an undergraduate researcher in computational and physical volcanology working with computer vision, scientific software, volcanic imagery, and quantitative image analysis.
```

### Research

```text
Research projects in computational and physical volcanology, scientific computer vision, volcanic micro-CT analysis, astronomy, and computational physics.
```

### Publications

```text
Peer-reviewed publications and active manuscripts by Joel Sotelo Flores.
```

### Presentations

```text
Conference presentations and submitted abstracts associated with current and completed research.
```

### Software

```text
Scientific software developed for image-based analysis in physical and computational volcanology.
```

### CV

```text
Curriculum vitae for Joel Sotelo Flores, including research experience, publications, presentations, software, awards, and teaching.
```

### About

```text
About Joel Sotelo Flores, an undergraduate researcher studying physics and earth and environmental geoscience at Washington and Lee University.
```

### Project Pages

Use the `summary` field from each project's content collection entry.

---

## Open Graph Metadata

All pages include Open Graph metadata for social sharing.

### Required Tags

```html
<meta property="og:title" content="{Full Page Title}" />
<meta property="og:description" content="{Page Description}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="{Canonical URL}" />
<meta property="og:image" content="{Social Image URL}" />
<meta property="og:site_name" content="Joel Sotelo Flores" />
```

### Image

Default social preview image:

```text
/social/joel-sotelo-flores-og.jpg
```

Absolute URL in metadata:

```text
https://joelsoteloflores.rocks/social/joel-sotelo-flores-og.jpg
```

Recommended dimensions: **1200 × 630 pixels**

Format: JPG or WebP

File size: < 500 KB preferred, < 1 MB maximum

### OG Type

- Homepage and most pages: `website`
- Project pages may use: `article` (if semantically appropriate)

Currently all pages use `website`.

---

## Twitter Card Metadata

All pages include Twitter Card metadata.

### Required Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{Full Page Title}" />
<meta name="twitter:description" content="{Page Description}" />
<meta name="twitter:image" content="{Social Image URL}" />
```

Twitter uses the same image as Open Graph.

No Twitter account handle is included unless a verified account is provided.

---

## Canonical Links

Every indexable page outputs a canonical link.

```html
<link rel="canonical" href="{Canonical URL}" />
```

Examples:

- `https://joelsoteloflores.rocks/`
- `https://joelsoteloflores.rocks/research`
- `https://joelsoteloflores.rocks/publications`
- `https://joelsoteloflores.rocks/research/kilauea-lava-fountain-computer-vision`

Trailing slashes are handled consistently by Astro.

---

## JSON-LD Structured Data

The homepage includes JSON-LD Person structured data.

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

### Included Fields

- `@type`: `Person`
- `name`: Display name
- `url`: Homepage URL
- `sameAs`: GitHub and LinkedIn profile URLs
- `affiliation`: Current institution
- `description`: Concise professional description

### Excluded Fields

Do **not** include:

- `email`
- `telephone`
- `address`
- `birthDate`
- `alumniOf` (not graduated yet)
- `jobTitle` (use `description` instead for undergraduate status)

Only the homepage includes structured data. Interior pages do not duplicate this.

---

## Sitemap

Generated automatically by `@astrojs/sitemap` integration.

### Configuration

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://joelsoteloflores.rocks',
  integrations: [sitemap()],
});
```

### Output Files

- `sitemap-index.xml` — Index file referencing all sitemaps
- `sitemap-0.xml` — Primary sitemap with all public routes

### Included Routes

- Homepage (`/`)
- `/research`
- `/publications`
- `/presentations`
- `/software`
- `/cv`
- `/about`
- All public project pages (`/research/{slug}`)

### Excluded Routes

- `/404` — Noindexed error page

The CV PDF (`/cv/Joel_Sotelo_Flores_CV.pdf`) does not appear as an HTML sitemap entry but is accessible.

---

## Robots.txt

```text
User-agent: *
Allow: /

Sitemap: https://joelsoteloflores.rocks/sitemap-index.xml
```

All routes are allowed by default.

The 404 page is excluded via `noindex` meta tag rather than robots.txt disallow.

---

## Noindex Rules

Only the 404 page is noindexed.

```html
<meta name="robots" content="noindex" />
```

All other pages (`/cv`, `/software`, `/publications`, `/presentations`, `/research`, `/about`) are indexable.

---

## Favicon and Site Identity

**Status:** Favicon assets need to be created.

Recommended minimal set:

- `favicon.ico` — Legacy browsers
- `favicon.svg` — Modern browsers, scalable
- `apple-touch-icon.png` — iOS home screen

Suggested design:

- Simple abstract mark or initials (`JSF`)
- Uses site wine accent color (`#79242f`)
- Avoids university logos, volcano clip art, emoji

---

## Web App Manifest

**Status:** Not currently implemented. May be added if useful.

If added:

```json
{
  "name": "Joel Sotelo Flores",
  "short_name": "Joel Sotelo Flores",
  "start_url": "/",
  "display": "browser"
}
```

Do **not** turn the portfolio into a Progressive Web App.

No service worker.

---

## BaseLayout Metadata API

The `BaseLayout` component handles all metadata.

### Props Interface

```ts
interface Props {
  title: string;
  description: string;
  contentMode?: 'contained' | 'fluid';
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  includeStructuredData?: boolean;
}
```

### Defaults

- `contentMode`: `'contained'`
- `ogImage`: `'/social/joel-sotelo-flores-og.jpg'`
- `ogType`: `'website'`
- `noindex`: `false`
- `includeStructuredData`: `false`

### Title Handling

Homepage (path `/`):

- Uses `title` prop directly
- Example: `"Joel Sotelo Flores | Computational & Physical Volcanology"`

Interior pages:

- Appends site suffix: `{title} | Joel Sotelo Flores`
- Example: `"Research"` becomes `"Research | Joel Sotelo Flores"`

### Canonical URL

If `canonical` prop is provided and starts with `http`, it's used directly.

Otherwise, the current URL path is combined with the site origin.

### Example Usage

**Homepage:**

```astro
<BaseLayout
  title="Joel Sotelo Flores | Computational & Physical Volcanology"
  description="Joel Sotelo Flores is an undergraduate researcher..."
  includeStructuredData={true}
/>
```

**Interior Page:**

```astro
<BaseLayout
  title="Research"
  description="Research projects in computational and physical volcanology..."
/>
```

**404 Page:**

```astro
<BaseLayout
  title="Page not found"
  description="The requested page could not be found."
  noindex={true}
/>
```

---

## Character Encoding

Special characters are handled correctly:

- `Kīlauea` — Macron character in project titles
- `&amp;` — Ampersand in homepage title
- `WDS 03575-0110` — Hyphens and numbers in project titles

All metadata uses UTF-8 encoding. HTML entities are escaped where appropriate.

---

## Privacy and Analytics

**Current Status:** No analytics tracking.

The site does **not** include:

- Google Analytics
- Google Tag Manager
- Meta Pixel
- Hotjar
- Other tracking scripts

Analytics may be considered after deployment as a separate decision.

---

## Search Console Verification

**Status:** Not added yet.

Google Search Console verification tokens can be added after deployment when a verified account is available.

Do not fabricate verification values.

---

## Testing

Metadata is validated by automated tests in:

```text
tests/metadata.test.ts
```

Tests cover:

- Title patterns (homepage and interior)
- Description uniqueness
- Canonical URLs
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data
- Sitemap presence and content
- Robots.txt configuration
- 404 noindex
- Special character handling
- Production domain usage (no localhost)

Run tests:

```bash
npm test
```

Run only metadata tests:

```bash
npm test -- metadata.test.ts
```

---

## Manual Verification

After deployment, verify metadata using:

**Browser DevTools:**

- View page source
- Inspect `<head>` tags

**Open Graph Debugger:**

- Facebook: https://developers.facebook.com/tools/debug/
- LinkedIn: https://www.linkedin.com/post-inspector/

**Twitter Card Validator:**

- https://cards-dev.twitter.com/validator

**Rich Results Test (Google):**

- https://search.google.com/test/rich-results

**Structured Data Testing Tool:**

- https://validator.schema.org/

---

## Future Enhancements

Potential future improvements (not in scope for Ticket 015):

- Project-specific social images
- Additional structured data types (e.g., ScholarlyArticle for publications)
- Web app manifest for installability
- Additional favicon sizes (192×192, 512×512)
- Breadcrumb structured data for project pages
- Enhanced social previews with dynamic text overlays
- Open Graph video tags for project media

These should be considered only if they provide clear value for the intended academic audience.
