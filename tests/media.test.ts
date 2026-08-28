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

const PAGE_BG = '#f6f2f3'; // --color-page (light canvas)
const SURFACE = '#ffffff'; // --color-surface (white panels)
const WCAG_AA_NORMAL = 4.5;

describe('contrast ratios (WCAG AA) — light editorial system', () => {
  // Text tokens that must pass AA on the light canvas
  const textTokens: [string, string][] = [
    ['--color-text (#270c0f)', '#270c0f'],
    ['--color-text-muted (#6b5f62)', '#6b5f62'],
    ['--color-wine (#79242f)', '#79242f'],
    ['--color-accent-hover (#b63a46)', '#b63a46'],
  ];

  for (const [name, hex] of textTokens) {
    it(`${name} on page background meets WCAG AA (4.5:1)`, () => {
      const ratio = contrastRatio(hex, PAGE_BG);
      expect(
        ratio,
        `${name} on page: ${ratio.toFixed(2)}:1 < 4.5:1`,
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it(`${name} on white surface meets WCAG AA (4.5:1)`, () => {
      const ratio = contrastRatio(hex, SURFACE);
      expect(
        ratio,
        `${name} on white: ${ratio.toFixed(2)}:1 < 4.5:1`,
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });
  }

  it('--color-border (#dfd5d8) is decorative — not used as normal text', () => {
    // border color intentionally fails AA for text — not used for text
    const ratio = contrastRatio('#dfd5d8', SURFACE);
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

// ------------------------------------------------------------------ //
// Derived graphics validation (Ticket 010)                            //
// ------------------------------------------------------------------ //

describe('derived graphics integrity', () => {
  const derivedGraphics = Object.values(mediaRegistry).filter(
    (item) => item.kind === 'derived-graphic',
  );

  it('has derived graphics registered', () => {
    expect(derivedGraphics.length).toBeGreaterThan(0);
  });

  for (const graphic of derivedGraphics) {
    if (graphic.kind !== 'derived-graphic') continue;

    describe(`derived graphic: ${graphic.id}`, () => {
      it('has valid source media ID that exists in registry', () => {
        expect(mediaRegistry[graphic.sourceMediaId]).toBeDefined();
      });

      it('has project ID', () => {
        expect(graphic.projectId).toBeTruthy();
      });

      it('SVG file exists', () => {
        const filepath = join(ROOT, 'public', graphic.src);
        expect(existsSync(filepath), `SVG not found: ${graphic.src}`).toBe(true);
      });

      it('SVG file is under 50 KB', () => {
        const filepath = join(ROOT, 'public', graphic.src);
        if (existsSync(filepath)) {
          const stats = readFileSync(filepath);
          const sizeKB = stats.length / 1024;
          expect(sizeKB, `SVG too large: ${sizeKB.toFixed(1)} KB`).toBeLessThan(50);
        }
      });

      it('SVG contains valid viewBox', () => {
        const filepath = join(ROOT, 'public', graphic.src);
        if (existsSync(filepath)) {
          const content = readFileSync(filepath, 'utf-8');
          expect(content).toContain('viewBox');
        }
      });

      it('SVG is marked aria-hidden (decorative)', () => {
        const filepath = join(ROOT, 'public', graphic.src);
        if (existsSync(filepath)) {
          const content = readFileSync(filepath, 'utf-8');
          if (graphic.purpose === 'decorative') {
            expect(content).toContain('aria-hidden="true"');
          }
        }
      });

      it('SVG contains no embedded raster data', () => {
        const filepath = join(ROOT, 'public', graphic.src);
        if (existsSync(filepath)) {
          const content = readFileSync(filepath, 'utf-8');
          expect(content).not.toContain('<image');
          expect(content).not.toContain('data:image/');
        }
      });
    });
  }
});

describe('workflow notation', () => {
  const projectPageSource = readFileSync(
    join(ROOT, 'src/pages/research/[id].astro'),
    'utf-8',
  );

  it('defines workflows for flagship projects', () => {
    expect(projectPageSource).toContain("'kilauea-lava-fountain-computer-vision'");
    expect(projectPageSource).toContain('Field Video');
    expect(projectPageSource).toContain('Segmentation');
  });

  it('renders workflow notation HTML', () => {
    expect(projectPageSource).toContain('workflow-notation');
    expect(projectPageSource).toContain('workflow-notation__stage');
  });

  it('uses accessible arrow separator', () => {
    expect(projectPageSource).toContain('workflow-notation__arrow');
    expect(projectPageSource).toContain('aria-hidden="true"');
  });
});
