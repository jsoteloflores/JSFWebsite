/**
 * Page structure tests for Ticket 005.
 *
 * Verifies source-level invariants: placeholder copy is gone, no CV links,
 * no client hydration, project detail route uses static generation.
 * Build-output verification is handled by npm run site:verify.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { projectUrl } from '../src/utils/site';

const ROOT = process.cwd();
const PAGES_DIR = join(ROOT, 'src', 'pages');
const PROJECT_DETAIL = join(PAGES_DIR, 'research', '[id].astro');

// ------------------------------------------------------------------ //
// Helper                                                              //
// ------------------------------------------------------------------ //

function readPage(filename: string): string {
  return readFileSync(join(PAGES_DIR, filename), 'utf-8');
}

function collectAstroFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      files.push(...collectAstroFiles(join(dir, entry.name)));
    } else if (extname(entry.name) === '.astro') {
      files.push(join(dir, entry.name));
    }
  }
  return files;
}

const allPageFiles = collectAstroFiles(PAGES_DIR);

// ------------------------------------------------------------------ //
// Scaffold placeholder removal                                        //
// ------------------------------------------------------------------ //

const PLACEHOLDER_PHRASES = [
  'This page will present Joel',
  'This page will introduce Joel',
  'This page will list Joel',
];

describe('scaffold placeholders are removed', () => {
  it('no page contains the old placeholder copy', () => {
    for (const filePath of allPageFiles) {
      const content = readFileSync(filePath, 'utf-8');
      for (const phrase of PLACEHOLDER_PHRASES) {
        expect(content, `Placeholder found in ${filePath}`).not.toContain(phrase);
      }
    }
  });
});

// ------------------------------------------------------------------ //
// Required page files                                                 //
// ------------------------------------------------------------------ //

describe('required page files exist', () => {
  const REQUIRED = [
    'index.astro',
    'about.astro',
    'research.astro',
    'publications.astro',
    'presentations.astro',
    'software.astro',
  ];

  for (const file of REQUIRED) {
    it(`${file} exists`, () => {
      expect(() => readPage(file)).not.toThrow();
    });
  }

  it('project detail route exists', () => {
    expect(() => readFileSync(PROJECT_DETAIL, 'utf-8')).not.toThrow();
  });
});

// ------------------------------------------------------------------ //
// Project detail structural checks                                   //
// ------------------------------------------------------------------ //

describe('project detail route', () => {
  let source: string;
  beforeAll(() => {
    source = readFileSync(PROJECT_DETAIL, 'utf-8');
  });

  it('uses getStaticPaths for static generation', () => {
    expect(source).toContain('getStaticPaths');
  });

  it('uses render from astro:content to render body', () => {
    expect(source).toContain('render');
    expect(source).toContain('astro:content');
  });

  it('does not contain client: hydration directives', () => {
    expect(source).not.toMatch(/client:/);
  });
});

// ------------------------------------------------------------------ //
// Global page invariants                                              //
// ------------------------------------------------------------------ //

describe('all pages', () => {
  it('no page (except CV) contains a CV download link', () => {
    for (const filePath of allPageFiles) {
      // Skip CV page itself
      if (filePath.includes('cv.astro')) continue;

      const content = readFileSync(filePath, 'utf-8');
      expect(content, `CV link found in ${filePath}`).not.toMatch(/href=.*cv.*\.pdf/i);
      expect(content, `CV button found in ${filePath}`).not.toMatch(
        /download.*cv|cv.*download/i,
      );
    }
  });

  it('no page imports from docs/source-materials', () => {
    for (const filePath of allPageFiles) {
      const content = readFileSync(filePath, 'utf-8');
      expect(content, `Internal docs import in ${filePath}`).not.toContain(
        'source-materials',
      );
    }
  });

  it('no page contains client: hydration directives', () => {
    for (const filePath of allPageFiles) {
      const content = readFileSync(filePath, 'utf-8');
      expect(content, `client: directive in ${filePath}`).not.toMatch(/client:/);
    }
  });

  it('no page contains iframe elements', () => {
    for (const filePath of allPageFiles) {
      const content = readFileSync(filePath, 'utf-8');
      expect(content, `iframe in ${filePath}`).not.toMatch(/<iframe/i);
    }
  });
});

// ------------------------------------------------------------------ //
// projectUrl helper                                                   //
// ------------------------------------------------------------------ //

import { beforeAll } from 'vitest';

describe('projectUrl helper', () => {
  const PROJECT_IDS = [
    'kilauea-lava-fountain-computer-vision',
    'ijen-pyroclast-microct-analysis',
    'v0499-centauri-photometry',
    'wds-03575-0110-astrometry',
    'nanoparticle-dipole-self-assembly',
    'riesel-sierpinski-computational-number-theory',
  ];

  for (const id of PROJECT_IDS) {
    it(`projectUrl("${id}") returns /research/${id}`, () => {
      expect(projectUrl(id)).toBe(`/research/${id}`);
    });
  }

  it('all project URLs begin with /research/', () => {
    for (const id of PROJECT_IDS) {
      expect(projectUrl(id)).toMatch(/^\/research\//);
    }
  });
});

// ------------------------------------------------------------------ //
// CV page                                                             //
// ------------------------------------------------------------------ //

describe('CV page (Ticket 011)', () => {
  let cvSource: string;

  beforeAll(() => {
    cvSource = readPage('cv.astro');
  });

  it('cv.astro exists', () => {
    expect(cvSource).toBeTruthy();
  });

  it('imports CV data from src/data/cv', () => {
    expect(cvSource).toContain("from '../data/cv'");
  });

  it('imports profile from src/data/profile', () => {
    expect(cvSource).toContain("from '../data/profile'");
  });

  it('renders Education section', () => {
    expect(cvSource).toContain('id="education"');
    expect(cvSource).toContain('education.');
  });

  it('renders Research Experience section', () => {
    expect(cvSource).toContain('id="research-experience"');
    expect(cvSource).toContain('researchExperience');
  });

  it('renders Publications & Manuscripts section', () => {
    expect(cvSource).toContain('id="publications"');
    expect(cvSource).toContain('manuscriptsUnderReview');
    expect(cvSource).toContain('manuscriptsInPreparation');
  });

  it('renders peer-reviewed publications subsection', () => {
    expect(cvSource).toContain('Peer-Reviewed Publications');
  });

  it('renders manuscripts under review subsection', () => {
    expect(cvSource).toContain('Manuscripts Under Review');
    expect(cvSource).toContain('status="in-review"');
  });

  it('renders manuscripts in preparation subsection', () => {
    expect(cvSource).toContain('Manuscripts in Preparation');
    expect(cvSource).toContain('status="in-preparation"');
  });

  it('renders Software & Research Products section', () => {
    expect(cvSource).toContain('id="software"');
    expect(cvSource).toContain('software.');
  });

  it('renders Presentations section', () => {
    expect(cvSource).toContain('id="presentations"');
    expect(cvSource).toContain('completedPresentations');
  });

  it('renders completed presentations separately from submitted abstracts', () => {
    expect(cvSource).toContain('Completed Presentations');
    expect(cvSource).toContain('Conference Abstracts Submitted');
    expect(cvSource).toContain('submittedConferenceAbstracts');
  });

  it('renders submitted abstracts with clear status', () => {
    expect(cvSource).toContain('Abstract submitted');
  });

  it('renders Awards section', () => {
    expect(cvSource).toContain('id="awards"');
    expect(cvSource).toContain('awards.');
  });

  it('renders Research Training section', () => {
    expect(cvSource).toContain('id="training"');
    expect(cvSource).toContain('training.');
  });

  it('renders Teaching & Mentoring section', () => {
    expect(cvSource).toContain('id="teaching"');
    expect(cvSource).toContain('teaching.');
  });

  it('includes Download PDF button with profile.cvPath', () => {
    expect(cvSource).toContain('profile.cvPath');
    expect(cvSource).toContain('Download PDF');
    expect(cvSource).toContain('download');
  });

  it('does not embed PDF via iframe', () => {
    expect(cvSource).not.toMatch(/<iframe/i);
  });

  it('does not contain client: hydration directives', () => {
    expect(cvSource).not.toMatch(/client:/);
  });

  it('links research experiences to project pages where projectId exists', () => {
    expect(cvSource).toContain('/research/');
    expect(cvSource).toContain('View research');
  });

  it('uses StatusLabel component for publication status', () => {
    expect(cvSource).toContain('StatusLabel');
  });
});

// ------------------------------------------------------------------ //
// Navigation                                                          //
// ------------------------------------------------------------------ //

describe('navigation (Ticket 011)', () => {
  it('includes CV tab', () => {
    const navSource = readFileSync(
      join(ROOT, 'src', 'utils', 'navigation.ts'),
      'utf-8',
    );
    expect(navSource).toContain("label: 'CV'");
    expect(navSource).toContain("href: '/cv'");
  });

  it('CV tab appears before About tab', () => {
    const navSource = readFileSync(
      join(ROOT, 'src', 'utils', 'navigation.ts'),
      'utf-8',
    );
    const cvIndex = navSource.indexOf("label: 'CV'");
    const aboutIndex = navSource.indexOf("label: 'About'");
    expect(cvIndex).toBeGreaterThan(0);
    expect(aboutIndex).toBeGreaterThan(cvIndex);
  });
});

// ------------------------------------------------------------------ //
// Profile CV path                                                     //
// ------------------------------------------------------------------ //

describe('profile CV path (Ticket 011)', () => {
  it('profile contains cvPath field', () => {
    const profileSource = readFileSync(
      join(ROOT, 'src', 'data', 'profile.ts'),
      'utf-8',
    );
    expect(profileSource).toContain('cvPath:');
    expect(profileSource).toContain('/cv/Joel_Sotelo_Flores_CV.pdf');
  });

  it('Profile interface includes cvPath', () => {
    const profileSource = readFileSync(
      join(ROOT, 'src', 'data', 'profile.ts'),
      'utf-8',
    );
    expect(profileSource).toMatch(/cvPath.*string/);
  });
});
