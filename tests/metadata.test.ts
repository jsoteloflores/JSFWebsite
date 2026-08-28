/**
 * SEO and metadata tests (Ticket 015).
 * Validates production metadata, Open Graph, Twitter cards, structured data,
 * canonical URLs, sitemap, and robots.txt configuration.
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');

describe('Ticket 015: SEO and Production Metadata', () => {
  describe('Homepage metadata', () => {
    let homepageHtml: string;

    beforeAll(() => {
      homepageHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');
    });

    it('has correct production title without suffix', () => {
      expect(homepageHtml).toContain(
        '<title>Joel Sotelo Flores | Computational &amp; Physical Volcanology</title>',
      );
    });

    it('has appropriate advisor-facing description', () => {
      expect(homepageHtml).toContain(
        'Joel Sotelo Flores is an undergraduate researcher in computational and physical volcanology',
      );
    });

    it('has canonical URL with production domain', () => {
      expect(homepageHtml).toMatch(
        /<link rel="canonical" href="https:\/\/joelsoteloflores\.rocks\/"/,
      );
    });

    it('has Open Graph title', () => {
      expect(homepageHtml).toContain(
        '<meta property="og:title" content="Joel Sotelo Flores | Computational &amp; Physical Volcanology"',
      );
    });

    it('has Open Graph description', () => {
      expect(homepageHtml).toContain('<meta property="og:description" content=');
    });

    it('has Open Graph type', () => {
      expect(homepageHtml).toContain('<meta property="og:type" content="website"');
    });

    it('has Open Graph URL with production domain', () => {
      expect(homepageHtml).toContain(
        '<meta property="og:url" content="https://joelsoteloflores.rocks/"',
      );
    });

    it('has Open Graph image with production domain', () => {
      expect(homepageHtml).toContain(
        '<meta property="og:image" content="https://joelsoteloflores.rocks/social/joel-sotelo-flores-og.jpg"',
      );
    });

    it('has Open Graph site name', () => {
      expect(homepageHtml).toContain(
        '<meta property="og:site_name" content="Joel Sotelo Flores"',
      );
    });

    it('has Twitter large image card', () => {
      expect(homepageHtml).toContain(
        '<meta name="twitter:card" content="summary_large_image"',
      );
    });

    it('has Twitter title', () => {
      expect(homepageHtml).toContain('<meta name="twitter:title" content=');
    });

    it('has Twitter description', () => {
      expect(homepageHtml).toContain('<meta name="twitter:description" content=');
    });

    it('has Twitter image with production domain', () => {
      expect(homepageHtml).toContain(
        '<meta name="twitter:image" content="https://joelsoteloflores.rocks/social/joel-sotelo-flores-og.jpg"',
      );
    });

    it('has JSON-LD Person structured data', () => {
      expect(homepageHtml).toContain('"@type":"Person"');
      expect(homepageHtml).toContain('"name":"Joel Sotelo Flores"');
      expect(homepageHtml).toContain('"url":"https://joelsoteloflores.rocks/"');
    });

    it('includes GitHub in sameAs array', () => {
      expect(homepageHtml).toContain('"sameAs":["https://github.com/jsoteloflores"');
    });

    it('includes LinkedIn in sameAs array', () => {
      expect(homepageHtml).toContain('"https://www.linkedin.com/in/joelsoteloflores"');
    });

    it('includes affiliation in structured data', () => {
      expect(homepageHtml).toContain('"@type":"CollegeOrUniversity"');
      expect(homepageHtml).toContain('"name":"Washington and Lee University"');
    });

    it('does not include email in structured data', () => {
      // Email should only appear in visible footer, not in JSON-LD
      const jsonLdMatch = homepageHtml.match(
        /<script type="application\/ld\+json">(.*?)<\/script>/,
      );
      if (jsonLdMatch) {
        expect(jsonLdMatch[1]).not.toContain('@wlu.edu');
      }
    });

    it('does not have noindex tag', () => {
      expect(homepageHtml).not.toContain('<meta name="robots" content="noindex"');
    });
  });

  describe('Interior page title pattern', () => {
    it('Research page has site suffix', () => {
      const html = readFileSync(join(distDir, 'research', 'index.html'), 'utf-8');
      expect(html).toContain('<title>Research | Joel Sotelo Flores</title>');
    });

    it('Publications page has site suffix', () => {
      const html = readFileSync(join(distDir, 'publications', 'index.html'), 'utf-8');
      expect(html).toContain('<title>Publications | Joel Sotelo Flores</title>');
    });

    it('Presentations page has site suffix', () => {
      const html = readFileSync(join(distDir, 'presentations', 'index.html'), 'utf-8');
      expect(html).toContain('<title>Presentations | Joel Sotelo Flores</title>');
    });

    it('Software page has site suffix', () => {
      const html = readFileSync(join(distDir, 'software', 'index.html'), 'utf-8');
      expect(html).toContain('<title>Software | Joel Sotelo Flores</title>');
    });

    it('CV page has site suffix', () => {
      const html = readFileSync(join(distDir, 'cv', 'index.html'), 'utf-8');
      expect(html).toContain('<title>Curriculum Vitae | Joel Sotelo Flores</title>');
    });

    it('About page has site suffix', () => {
      const html = readFileSync(join(distDir, 'about', 'index.html'), 'utf-8');
      expect(html).toContain('<title>About | Joel Sotelo Flores</title>');
    });

    it('404 page has site suffix', () => {
      const html = readFileSync(join(distDir, '404.html'), 'utf-8');
      expect(html).toContain('<title>Page not found | Joel Sotelo Flores</title>');
    });
  });

  describe('Route-specific descriptions', () => {
    it('Research page has unique description', () => {
      const html = readFileSync(join(distDir, 'research', 'index.html'), 'utf-8');
      expect(html).toContain(
        'Research projects in computational and physical volcanology',
      );
    });

    it('Publications page has unique description', () => {
      const html = readFileSync(join(distDir, 'publications', 'index.html'), 'utf-8');
      expect(html).toContain(
        'Peer-reviewed publications and active manuscripts by Joel Sotelo Flores',
      );
    });

    it('Presentations page has unique description', () => {
      const html = readFileSync(join(distDir, 'presentations', 'index.html'), 'utf-8');
      expect(html).toContain('Conference presentations and submitted abstracts');
    });

    it('Software page has unique description', () => {
      const html = readFileSync(join(distDir, 'software', 'index.html'), 'utf-8');
      expect(html).toContain('Scientific software developed for image-based analysis');
    });

    it('CV page has unique description', () => {
      const html = readFileSync(join(distDir, 'cv', 'index.html'), 'utf-8');
      expect(html).toContain(
        'Curriculum vitae for Joel Sotelo Flores, including research experience, publications, presentations, software, awards, and teaching',
      );
    });

    it('About page has unique description', () => {
      const html = readFileSync(join(distDir, 'about', 'index.html'), 'utf-8');
      expect(html).toContain(
        'undergraduate researcher studying physics and earth and environmental geoscience',
      );
    });
  });

  describe('Canonical URLs', () => {
    const expectedRoutes = [
      { path: 'index.html', canonical: 'https://joelsoteloflores.rocks/' },
      {
        path: 'research/index.html',
        canonical: 'https://joelsoteloflores.rocks/research',
      },
      {
        path: 'publications/index.html',
        canonical: 'https://joelsoteloflores.rocks/publications',
      },
      {
        path: 'presentations/index.html',
        canonical: 'https://joelsoteloflores.rocks/presentations',
      },
      {
        path: 'software/index.html',
        canonical: 'https://joelsoteloflores.rocks/software',
      },
      { path: 'cv/index.html', canonical: 'https://joelsoteloflores.rocks/cv' },
      {
        path: 'about/index.html',
        canonical: 'https://joelsoteloflores.rocks/about',
      },
    ];

    expectedRoutes.forEach(({ path, canonical }) => {
      it(`${path} has production canonical URL`, () => {
        const html = readFileSync(join(distDir, path), 'utf-8');
        expect(html).toMatch(new RegExp(`<link rel="canonical" href="${canonical}/?"`));
      });
    });

    it('No canonical URLs contain localhost', () => {
      const allHtmlFiles = [
        'index.html',
        'research/index.html',
        'publications/index.html',
        'presentations/index.html',
        'software/index.html',
        'cv/index.html',
        'about/index.html',
        '404.html',
      ];

      allHtmlFiles.forEach((file) => {
        const html = readFileSync(join(distDir, file), 'utf-8');
        const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
        if (canonicalMatch) {
          expect(canonicalMatch[1]).not.toContain('localhost');
          expect(canonicalMatch[1]).not.toContain('127.0.0.1');
        }
      });
    });
  });

  describe('404 page noindex', () => {
    let html404: string;

    beforeAll(() => {
      html404 = readFileSync(join(distDir, '404.html'), 'utf-8');
    });

    it('has noindex meta tag', () => {
      expect(html404).toContain('<meta name="robots" content="noindex"');
    });

    it('still has canonical URL', () => {
      expect(html404).toContain('<link rel="canonical"');
    });

    it('still has Open Graph metadata', () => {
      expect(html404).toContain('<meta property="og:title"');
    });
  });

  describe('Sitemap', () => {
    it('sitemap-index.xml exists', () => {
      expect(existsSync(join(distDir, 'sitemap-index.xml'))).toBe(true);
    });

    it('sitemap-0.xml exists', () => {
      expect(existsSync(join(distDir, 'sitemap-0.xml'))).toBe(true);
    });

    it('sitemap uses production domain', () => {
      const sitemap = readFileSync(join(distDir, 'sitemap-0.xml'), 'utf-8');
      expect(sitemap).toContain('https://joelsoteloflores.rocks');
      expect(sitemap).not.toContain('localhost');
      expect(sitemap).not.toContain('vercel.app');
    });

    it('sitemap includes expected routes', () => {
      const sitemap = readFileSync(join(distDir, 'sitemap-0.xml'), 'utf-8');
      const expectedRoutes = [
        'https://joelsoteloflores.rocks/',
        'https://joelsoteloflores.rocks/research/',
        'https://joelsoteloflores.rocks/publications/',
        'https://joelsoteloflores.rocks/presentations/',
        'https://joelsoteloflores.rocks/software/',
        'https://joelsoteloflores.rocks/cv/',
        'https://joelsoteloflores.rocks/about/',
      ];

      expectedRoutes.forEach((route) => {
        expect(sitemap).toContain(route);
      });
    });

    it('sitemap excludes 404 page', () => {
      const sitemap = readFileSync(join(distDir, 'sitemap-0.xml'), 'utf-8');
      expect(sitemap).not.toContain('/404');
    });
  });

  describe('Robots.txt', () => {
    it('robots.txt exists in dist', () => {
      expect(existsSync(join(distDir, 'robots.txt'))).toBe(true);
    });

    it('robots.txt allows all user agents', () => {
      const robots = readFileSync(join(distDir, 'robots.txt'), 'utf-8');
      expect(robots).toContain('User-agent: *');
      expect(robots).toContain('Allow: /');
    });

    it('robots.txt references sitemap with production domain', () => {
      const robots = readFileSync(join(distDir, 'robots.txt'), 'utf-8');
      expect(robots).toContain(
        'Sitemap: https://joelsoteloflores.rocks/sitemap-index.xml',
      );
    });
  });

  describe('Project page metadata', () => {
    it('Kīlauea project has unique title', () => {
      const html = readFileSync(
        join(
          distDir,
          'research',
          'kilauea-lava-fountain-computer-vision',
          'index.html',
        ),
        'utf-8',
      );
      expect(html).toContain('Kīlauea');
      expect(html).toContain('Joel Sotelo Flores');
    });

    it('Ijen project has unique title', () => {
      const html = readFileSync(
        join(distDir, 'research', 'ijen-pyroclast-microct-analysis', 'index.html'),
        'utf-8',
      );
      expect(html).toContain('Ijen');
      expect(html).toContain('Joel Sotelo Flores');
    });

    it('Project pages have canonical URLs', () => {
      const html = readFileSync(
        join(
          distDir,
          'research',
          'kilauea-lava-fountain-computer-vision',
          'index.html',
        ),
        'utf-8',
      );
      expect(html).toContain('<link rel="canonical"');
      expect(html).toContain('https://joelsoteloflores.rocks');
    });
  });

  describe('Special characters in metadata', () => {
    it('Handles Kīlauea correctly in titles', () => {
      const html = readFileSync(
        join(
          distDir,
          'research',
          'kilauea-lava-fountain-computer-vision',
          'index.html',
        ),
        'utf-8',
      );
      // Should be properly encoded or rendered
      expect(html).toMatch(/K[īi]lauea/);
    });

    it('Handles ampersand correctly in homepage title', () => {
      const html = readFileSync(join(distDir, 'index.html'), 'utf-8');
      expect(html).toContain('Computational &amp; Physical Volcanology');
    });
  });
});
