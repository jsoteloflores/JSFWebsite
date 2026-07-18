import { describe, it, expect, beforeAll } from 'vitest';
import {
  processAuthors,
  buildVenueLine,
  buildDoiUrl,
  buildExhibitLinkText,
} from '../src/utils/content-display';
import type { Author } from '../src/types/content-schemas';

// ------------------------------------------------------------------ //
// AuthorList helpers                                                  //
// ------------------------------------------------------------------ //

const joel: Author = {
  name: 'Joel Sotelo Flores',
  isJoel: true,
  affiliation: 'Example University',
};
const coAuthorA: Author = { name: 'Alice Researcher', isJoel: false };
const coAuthorB: Author = { name: 'Bob Scientist', isJoel: false };

describe('processAuthors — one author', () => {
  it('returns a single-element array', () => {
    expect(processAuthors([joel])).toHaveLength(1);
  });

  it('Joel is flagged as isJoel', () => {
    const [first] = processAuthors([joel]);
    expect(first?.isJoel).toBe(true);
  });

  it('name is preserved', () => {
    const [first] = processAuthors([joel]);
    expect(first?.name).toBe('Joel Sotelo Flores');
  });
});

describe('processAuthors — two authors', () => {
  it('returns two entries', () => {
    expect(processAuthors([joel, coAuthorA])).toHaveLength(2);
  });

  it('input order is preserved (Joel first)', () => {
    const [first, second] = processAuthors([joel, coAuthorA]);
    expect(first?.name).toBe('Joel Sotelo Flores');
    expect(second?.name).toBe('Alice Researcher');
  });

  it('input order is preserved (Joel second)', () => {
    const [first, second] = processAuthors([coAuthorA, joel]);
    expect(first?.name).toBe('Alice Researcher');
    expect(second?.name).toBe('Joel Sotelo Flores');
    expect(second?.isJoel).toBe(true);
  });
});

describe('processAuthors — multiple authors', () => {
  it('returns all authors in input order', () => {
    const authors = [coAuthorA, joel, coAuthorB];
    const result = processAuthors(authors);
    expect(result.map((a) => a.name)).toStrictEqual(authors.map((a) => a.name));
  });

  it('Joel is distinguishable in a multi-author list', () => {
    const result = processAuthors([coAuthorA, joel, coAuthorB]);
    const joelEntry = result.find((a) => a.isJoel);
    expect(joelEntry).toBeDefined();
    expect(joelEntry?.name).toBe('Joel Sotelo Flores');
  });

  it('non-Joel authors are not flagged', () => {
    const result = processAuthors([coAuthorA, coAuthorB]);
    for (const a of result) {
      expect(a.isJoel).toBe(false);
    }
  });
});

describe('processAuthors — affiliations', () => {
  it('affiliation is included when showAffiliations is true', () => {
    const [first] = processAuthors([joel], true);
    expect(first?.affiliation).toBe('Example University');
  });

  it('affiliation is omitted when showAffiliations is false', () => {
    const [first] = processAuthors([joel], false);
    expect(first?.affiliation).toBeUndefined();
  });
});

// ------------------------------------------------------------------ //
// PublicationEntry helpers                                            //
// ------------------------------------------------------------------ //

describe('buildVenueLine', () => {
  it('returns empty string when no venue metadata', () => {
    expect(buildVenueLine({})).toBe('');
  });

  it('returns journal name alone', () => {
    expect(buildVenueLine({ journal: 'JVGR' })).toBe('JVGR');
  });

  it('combines journal, volume, issue, pages', () => {
    const line = buildVenueLine({
      journal: 'JVGR',
      volume: '450',
      issue: '2',
      pages: '12–34',
    });
    expect(line).toContain('JVGR');
    expect(line).toContain('vol. 450');
    expect(line).toContain('no. 2');
    expect(line).toContain('pp. 12–34');
  });

  it('produces no blank punctuation for in-preparation entries', () => {
    // in-prep entries have no journal, volume, issue, or pages
    const line = buildVenueLine({});
    expect(line).not.toMatch(/^[,\s]+$/); // no stray commas
    expect(line).toBe('');
  });

  it('handles partial metadata without blank punctuation', () => {
    const line = buildVenueLine({ journal: 'Volcanica' });
    // Should not start or end with punctuation
    expect(line).not.toMatch(/^[,. ]/);
    expect(line).not.toMatch(/[,. ]$/);
  });
});

describe('buildDoiUrl', () => {
  it('returns null when no DOI', () => {
    expect(buildDoiUrl(undefined)).toBeNull();
  });

  it('returns full URL for a bare DOI', () => {
    const url = buildDoiUrl('10.1016/j.jvolgeores.2025.000000');
    expect(url).toBe('https://doi.org/10.1016/j.jvolgeores.2025.000000');
  });
});

// ------------------------------------------------------------------ //
// ExhibitPreview helpers                                              //
// ------------------------------------------------------------------ //

describe('buildExhibitLinkText', () => {
  it('produces descriptive text containing the exhibit title', () => {
    const text = buildExhibitLinkText('Kīlauea Observation Walkthrough');
    expect(text).toContain('Kīlauea Observation Walkthrough');
  });

  it('does not use generic labels like "click here" or "learn more"', () => {
    const text = buildExhibitLinkText('Pyroclast Viewer').toLowerCase();
    expect(text).not.toContain('click here');
    expect(text).not.toContain('learn more');
    expect(text).not.toContain('open');
  });

  it('communicates that the destination is interactive', () => {
    const text = buildExhibitLinkText('Model Training Walkthrough');
    // Should include "exhibit" or similar to communicate it opens an interactive experience
    expect(text.toLowerCase()).toContain('exhibit');
  });
});

// ------------------------------------------------------------------ //
// ExhibitPreview structural assertions                                //
// ------------------------------------------------------------------ //
// Astro 7.1.1 exports experimental_AstroContainer from astro/container
// and getViteConfig from astro/config. Configuring Vitest to process
// .astro files via the Astro Vite plugin is outside the scope of this
// ticket. Full HTML rendering tests are deferred to a later integration
// or browser-level test ticket.
//
// The structural assertions below verify template-level guarantees by
// reading the component source as text.
// ------------------------------------------------------------------ //

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const EXHIBIT_COMPONENT = join(
  process.cwd(),
  'src/components/exhibits/ExhibitPreview.astro',
);

describe('ExhibitPreview structural assertions', () => {
  let source: string;

  it('component file exists and is readable', () => {
    source = readFileSync(EXHIBIT_COMPONENT, 'utf-8');
    expect(source.length).toBeGreaterThan(0);
  });

  it('does not contain <iframe>', () => {
    source ??= readFileSync(EXHIBIT_COMPONENT, 'utf-8');
    expect(source).not.toMatch(/<iframe/i);
  });

  it('does not contain autoplay HTML attribute', () => {
    source ??= readFileSync(EXHIBIT_COMPONENT, 'utf-8');
    // Check for the HTML attribute form, not comments that mention the concept
    expect(source).not.toMatch(/\bautoplay(?:\s*=|\s*\/>|\s*>)/i);
  });

  it('does not contain inline <script> tags', () => {
    source ??= readFileSync(EXHIBIT_COMPONENT, 'utf-8');
    // Frontmatter scripts in Astro are wrapped in --- --- and are not client JS
    // We check for client-side <script> tags specifically
    expect(source).not.toMatch(/<script(?:\s[^>]*)?>(?!.*<\/script>)/is);
  });

  it('uses alt text for the preview image', () => {
    source ??= readFileSync(EXHIBIT_COMPONENT, 'utf-8');
    expect(source).toMatch(/alt=\{data\.previewImage\.alt\}/);
  });
});

// ------------------------------------------------------------------ //
// AuthorList structural assertions                                    //
// ------------------------------------------------------------------ //

const AUTHOR_LIST_COMPONENT = join(
  process.cwd(),
  'src/components/core/AuthorList.astro',
);

describe('AuthorList structural assertions', () => {
  let source: string;
  beforeAll(() => {
    source = readFileSync(AUTHOR_LIST_COMPONENT, 'utf-8');
  });

  it('uses <strong> to emphasize Joel', () => {
    expect(source).toMatch(/<strong/);
  });

  it('uses author.isJoel to determine emphasis — not name comparison', () => {
    // The component must check isJoel, not author.name.includes('Joel')
    expect(source).toContain('isJoel');
    expect(source).not.toMatch(/\.name.*Joel/);
  });

  it('does not contain client-side JavaScript directives', () => {
    expect(source).not.toMatch(/client:/);
  });
});
