/**
 * Media integrity and contrast tests for Ticket 006.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  mediaRegistry,
  projectMedia,
  kilauea_daytime_pair,
  kilauea_night_pair,
  ijen_sem_pair,
  kilauea_video_pair,
} from '../src/data/media';
import {
  checkDuplicateIds,
  checkNoDocksPaths,
  checkPublicPaths,
  checkAltText,
  checkPairDimensions,
  checkProjectIds,
} from '../src/utils/media-integrity';

const ROOT = process.cwd();

// ------------------------------------------------------------------ //
// Media registry integrity                                            //
// ------------------------------------------------------------------ //

describe('media registry', () => {
  it('has no duplicate IDs', () => {
    const issues = checkDuplicateIds(mediaRegistry);
    expect(issues).toHaveLength(0);
  });

  it('has no docs/ paths', () => {
    const issues = checkNoDocksPaths(mediaRegistry);
    expect(issues).toHaveLength(0);
  });

  it('all paths begin with /media/', () => {
    const issues = checkPublicPaths(mediaRegistry);
    expect(issues).toHaveLength(0);
  });

  it('every image and video has alt text or description', () => {
    const issues = checkAltText(mediaRegistry);
    expect(issues).toHaveLength(0);
  });

  it('still pairs have matching dimensions', () => {
    const issues = checkPairDimensions(mediaRegistry);
    expect(issues).toHaveLength(0);
  });
});

// ------------------------------------------------------------------ //
// Pair dimension accuracy                                             //
// ------------------------------------------------------------------ //

describe('still pair dimension matching', () => {
  it('kilauea daytime pair: members have equal width and height', () => {
    expect(kilauea_daytime_pair.left.width).toBe(kilauea_daytime_pair.right.width);
    expect(kilauea_daytime_pair.left.height).toBe(kilauea_daytime_pair.right.height);
  });

  it('kilauea night pair: members have equal width and height', () => {
    expect(kilauea_night_pair.left.width).toBe(kilauea_night_pair.right.width);
    expect(kilauea_night_pair.left.height).toBe(kilauea_night_pair.right.height);
  });

  it('ijen SEM pair: members have equal width and height', () => {
    expect(ijen_sem_pair.left.width).toBe(ijen_sem_pair.right.width);
    expect(ijen_sem_pair.left.height).toBe(ijen_sem_pair.right.height);
  });
});

// ------------------------------------------------------------------ //
// Mask format — no JPEG masks                                         //
// ------------------------------------------------------------------ //

describe('binary mask formats', () => {
  const maskPaths = [
    kilauea_daytime_pair.right.src,
    kilauea_night_pair.right.src,
    ijen_sem_pair.right.src,
  ];

  for (const p of maskPaths) {
    it(`mask is not JPEG: ${p}`, () => {
      expect(p.toLowerCase()).not.toMatch(/\.jpe?g$/);
    });
  }
});

// ------------------------------------------------------------------ //
// File existence                                                      //
// ------------------------------------------------------------------ //

describe('generated derivative files exist', () => {
  const stillPaths = [
    kilauea_daytime_pair.left.src,
    kilauea_daytime_pair.right.src,
    kilauea_night_pair.left.src,
    kilauea_night_pair.right.src,
    ijen_sem_pair.left.src,
    ijen_sem_pair.right.src,
  ];

  for (const p of stillPaths) {
    it(`file exists: ${p}`, () => {
      const full = join(ROOT, 'public', p);
      expect(existsSync(full), `Missing: ${full}`).toBe(true);
    });
  }

  it('video files noted as pending ffmpeg (registry entries exist)', () => {
    // Videos require ffmpeg — files may not exist yet.
    expect(kilauea_video_pair.left.src).toMatch(/\.mp4$/);
    expect(kilauea_video_pair.right.src).toMatch(/\.mp4$/);
  });
});

// ------------------------------------------------------------------ //
// Project-media map                                                   //
// ------------------------------------------------------------------ //

describe('project-media map', () => {
  it('kilauea project has heroPair', () => {
    expect(
      projectMedia['kilauea-lava-fountain-computer-vision']?.heroPair,
    ).toBeDefined();
  });

  it('ijen project has heroPair', () => {
    expect(projectMedia['ijen-pyroclast-microct-analysis']?.heroPair).toBeDefined();
  });

  it('all map keys resolve to valid project IDs', () => {
    const validIds = [
      'kilauea-lava-fountain-computer-vision',
      'ijen-pyroclast-microct-analysis',
    ];
    const issues = checkProjectIds(projectMedia, validIds);
    expect(issues).toHaveLength(0);
  });
});

// ------------------------------------------------------------------ //
// Contrast verification (token values)                               //
// ------------------------------------------------------------------ //

/**
 * WCAG contrast ratio calculation.
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
function sRGBtoLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(...parseHex(foreground));
  const l2 = relativeLuminance(...parseHex(background));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const OBSIDIAN = '#08090a';
const BASALT = '#141619';
const WCAG_AA_NORMAL = 4.5;

describe('contrast ratios (WCAG AA)', () => {
  // Tokens that carry readable text
  const textTokens: [string, string][] = [
    ['--color-ivory (#f3efe7)', '#f3efe7'],
    ['--color-ash (#aaa69e)', '#aaa69e'],
    ['--color-muted-text (#85827a)', '#85827a'],
    ['--color-sandstone (#aa9767)', '#aa9767'],
  ];

  for (const [name, hex] of textTokens) {
    it(`${name} on obsidian meets WCAG AA (4.5:1)`, () => {
      const ratio = contrastRatio(hex, OBSIDIAN);
      expect(
        ratio,
        `${name} on obsidian: ${ratio.toFixed(2)}:1 < 4.5:1`,
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it(`${name} on basalt meets WCAG AA (4.5:1)`, () => {
      const ratio = contrastRatio(hex, BASALT);
      expect(
        ratio,
        `${name} on basalt: ${ratio.toFixed(2)}:1 < 4.5:1`,
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });
  }

  it('--color-stone (#595b5d) is NOT relied on for normal text (decorative only)', () => {
    // stone fails AA for normal text — this test confirms we know it
    const ratio = contrastRatio('#595b5d', OBSIDIAN);
    expect(ratio).toBeLessThan(WCAG_AA_NORMAL);
  });
});

// ------------------------------------------------------------------ //
// Component structural assertions                                     //
// ------------------------------------------------------------------ //

describe('ScientificImagePair structural assertions', () => {
  const source = readFileSync(
    join(ROOT, 'src/components/media/ScientificImagePair.astro'),
    'utf-8',
  );

  it('renders two panels', () => {
    expect(source).toContain('pair.leftLabel');
    expect(source).toContain('pair.rightLabel');
  });

  it('renders two alt texts', () => {
    expect(source).toContain('pair.left.alt');
    expect(source).toContain('pair.right.alt');
  });

  it('renders a shared caption', () => {
    expect(source).toContain('MediaCaption');
  });

  it('emits no custom script', () => {
    expect(source).not.toMatch(/client:/);
    expect(source).not.toMatch(/<script(?!\s+define:vars)/);
  });

  it('uses explicit width and height attributes', () => {
    expect(source).toContain('width={pair.left.width}');
    expect(source).toContain('height={pair.left.height}');
  });
});

describe('ScientificVideoPair structural assertions', () => {
  const source = readFileSync(
    join(ROOT, 'src/components/media/ScientificVideoPair.astro'),
    'utf-8',
  );

  it('uses controls attribute', () => {
    expect(source).toContain('controls');
  });

  it('uses muted attribute', () => {
    expect(source).toContain('muted');
  });

  it('does not use autoplay HTML attribute', () => {
    // Check for the HTML attribute form, not comments mentioning the concept
    expect(source).not.toMatch(/\bautoplay(?:\s*=|\s*\/>|\s*>)/i);
  });

  it('uses poster attributes', () => {
    expect(source).toContain('poster={pair.left.poster}');
    expect(source).toContain('poster={pair.right.poster}');
  });

  it('provides accessible descriptions', () => {
    expect(source).toContain('pair.left.description');
    expect(source).toContain('pair.right.description');
  });

  it('emits no client: directive', () => {
    expect(source).not.toMatch(/client:/);
  });
});

describe('ScientificFigure structural assertions', () => {
  const source = readFileSync(
    join(ROOT, 'src/components/media/ScientificFigure.astro'),
    'utf-8',
  );

  it('renders optional credit only when present', () => {
    expect(source).toContain('image.credit');
  });

  it('uses object-fit: contain (no crop)', () => {
    expect(source).toContain('contain');
  });

  it('supports lazy loading', () => {
    expect(source).toContain('loading');
  });
});
