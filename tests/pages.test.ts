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
// CV Source Integrity (Ticket 012)                                   //
// ------------------------------------------------------------------ //

describe('CV source integrity (Ticket 012)', () => {
  const cvDataSource = readFileSync(join(ROOT, 'src', 'data', 'cv.ts'), 'utf-8');

  it('contains correct institutions from PDF', () => {
    expect(cvDataSource).toContain('University of Hawaiʻi at Mānoa');
    expect(cvDataSource).toContain('Washington and Lee University');
    expect(cvDataSource).toContain('Green Bank Observatory');
    expect(cvDataSource).toContain('Facility for Rare Isotope Beams');
  });

  it('contains correct advisor names from PDF', () => {
    expect(cvDataSource).toContain('Natalia Gauer Pasqualon');
    expect(cvDataSource).toContain('Nicholas Barber');
    expect(cvDataSource).toContain('David W. Sukow');
    expect(cvDataSource).toContain('Irina Mazilu');
    expect(cvDataSource).toContain('Carrie Finch-Smith');
  });

  it('contains correct dates from PDF', () => {
    expect(cvDataSource).toContain('2026-06'); // Kīlauea REU start
    expect(cvDataSource).toContain('2023-06'); // AIM start (not 2022)
    expect(cvDataSource).toContain('2023-08'); // AIM end (not 2022)
  });

  it('does NOT contain American Institute of Mathematics hallucination', () => {
    expect(cvDataSource).not.toContain('American Institute of Mathematics');
    expect(cvDataSource).not.toContain('Pasadena');
  });

  it('does NOT contain hallucinated advisor names', () => {
    expect(cvDataSource).not.toContain('James Davis');
    expect(cvDataSource).not.toContain('Nial Barber');
  });

  it('does NOT contain hallucinated institution names', () => {
    expect(cvDataSource).not.toContain('National Superconducting Cyclotron Laboratory');
    expect(cvDataSource).not.toContain('National Radio Astronomy Observatory');
  });

  it('does NOT contain fabricated quantitative data', () => {
    expect(cvDataSource).not.toContain('2,300+');
    expect(cvDataSource).not.toContain('2300');
  });
});

// ------------------------------------------------------------------ //
// Scholarly output source integrity                                   //
// ------------------------------------------------------------------ //

describe('scholarly output data integrity (Ticket 013)', () => {
  const scholarlySource = readFileSync(
    join(ROOT, 'src', 'data', 'scholarly-output.ts'),
    'utf-8',
  );

  it('Kīlauea manuscript uses correct title from PDF', () => {
    expect(scholarlySource).toContain(
      'Computer Vision Segmentation of Kīlauea Lava Fountain Video for Physical Eruption Parameter Extraction',
    );
  });

  it('Kīlauea manuscript does NOT use invented title', () => {
    expect(scholarlySource).not.toContain(
      'Automated lava-fountain measurement from video: A computer-vision approach',
    );
  });

  it('AGU 2025 presentation includes full author list from PDF', () => {
    expect(scholarlySource).toContain('Berlo, K.');
    expect(scholarlySource).toContain('Handini, E.');
    expect(scholarlySource).toContain('Buono, G.');
    expect(scholarlySource).toContain('Pappalardo, L.');
    expect(scholarlySource).toContain('van Hinsberg, V.');
  });

  it('Montréal 2026 presentation includes full author list', () => {
    expect(scholarlySource).toContain('Ratdomopurbo, A.');
    expect(scholarlySource).toContain('Ayuningtyas, T. R.');
  });

  it('Kīlauea manuscript has 9 authors', () => {
    // Match the manuscript title and count commas in author array
    const manuscriptMatch = scholarlySource.match(
      /title:\s*['"]Computer Vision Segmentation of Kīlauea Lava Fountain[\s\S]*?authors:\s*\[([\s\S]*?)\]/,
    );
    expect(manuscriptMatch).toBeTruthy();
    expect(manuscriptMatch).toBeDefined();
    if (manuscriptMatch && manuscriptMatch[1]) {
      const authorsSection = manuscriptMatch[1];
      const authorCount = (authorsSection.match(/'/g) || []).length / 2; // Count string delimiters
      expect(authorCount).toBe(9);
    }
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

// ------------------------------------------------------------------ //
// Scholarly output pages (Ticket 013)                                 //
// ------------------------------------------------------------------ //

describe('publications page', () => {
  let source: string;
  beforeAll(() => {
    source = readPage('publications.astro');
  });

  it('imports from scholarly-output.ts', () => {
    expect(source).toContain("from '../data/scholarly-output'");
  });

  it('displays manuscripts under review section', () => {
    expect(source).toContain('Manuscripts Under Review');
  });

  it('displays manuscripts in preparation section', () => {
    expect(source).toContain('Manuscripts in Preparation');
  });

  it('uses StatusLabel for manuscript status', () => {
    expect(source).toContain('<StatusLabel status="in-review"');
    expect(source).toContain('<StatusLabel status="in-preparation"');
  });

  it('includes "Related research →" links', () => {
    expect(source).toContain('Related research →');
  });

  it('does not contain placeholder language', () => {
    expect(source).not.toContain('being prepared');
    expect(source).not.toContain('Additional records will be added');
  });
});

describe('presentations page', () => {
  let source: string;
  beforeAll(() => {
    source = readPage('presentations.astro');
  });

  it('imports from scholarly-output.ts', () => {
    expect(source).toContain("from '../data/scholarly-output'");
  });

  it('displays conference presentations section', () => {
    expect(source).toContain('Conference Presentations');
  });

  it('displays submitted abstracts section', () => {
    expect(source).toContain('Conference Abstracts Submitted');
  });

  it('renders presentation types (oral/poster)', () => {
    expect(source).toContain('ORAL PRESENTATION');
    expect(source).toContain('POSTER');
  });

  it('includes "Related research →" links', () => {
    expect(source).toContain('Related research →');
  });

  it('does not contain ContentNotice placeholder', () => {
    expect(source).not.toContain('ContentNotice');
    expect(source).not.toContain('being prepared');
  });
});

describe('software page', () => {
  let source: string;
  beforeAll(() => {
    source = readPage('software.astro');
  });

  it('imports from scholarly-output.ts', () => {
    expect(source).toContain("from '../data/scholarly-output'");
  });

  it('uses StatusLabel for software status', () => {
    expect(source).toContain('<StatusLabel status="private"');
  });

  it('includes "Related research →" links', () => {
    expect(source).toContain('Related research →');
  });

  it('does not contain placeholder language', () => {
    expect(source).not.toContain('being withheld');
    expect(source).not.toContain('ContentNotice');
    expect(source).not.toContain('being prepared');
  });

  it('does not contain old research context section', () => {
    expect(source).not.toContain('Research context');
    expect(source).not.toContain('software-context');
  });
});

describe('shared scholarly data architecture', () => {
  let scholarlySource: string;
  let cvSource: string;

  beforeAll(() => {
    scholarlySource = readFileSync(
      join(ROOT, 'src', 'data', 'scholarly-output.ts'),
      'utf-8',
    );
    cvSource = readFileSync(join(ROOT, 'src', 'data', 'cv.ts'), 'utf-8');
  });

  it('scholarly-output.ts exists', () => {
    expect(scholarlySource.length).toBeGreaterThan(0);
  });

  it('scholarly-output.ts exports manuscriptsUnderReview', () => {
    expect(scholarlySource).toContain('export const manuscriptsUnderReview');
  });

  it('scholarly-output.ts exports manuscriptsInPreparation', () => {
    expect(scholarlySource).toContain('export const manuscriptsInPreparation');
  });

  it('scholarly-output.ts exports researchSoftware', () => {
    expect(scholarlySource).toContain('export const researchSoftware');
  });

  it('scholarly-output.ts exports completedPresentations', () => {
    expect(scholarlySource).toContain('export const completedPresentations');
  });

  it('scholarly-output.ts exports submittedConferenceAbstracts', () => {
    expect(scholarlySource).toContain('export const submittedConferenceAbstracts');
  });

  it('cv.ts imports from scholarly-output.ts', () => {
    expect(cvSource).toContain("from './scholarly-output'");
  });

  it('cv.ts re-exports scholarly data', () => {
    expect(cvSource).toContain('export {');
    expect(cvSource).toContain('manuscriptsUnderReview');
    expect(cvSource).toContain('completedPresentations');
  });

  it('cv.ts does not contain duplicate manuscript definitions', () => {
    // Count how many times "export const manuscriptsUnderReview" appears
    const matches = cvSource.match(/export const manuscriptsUnderReview/g);
    // Should only appear in re-export statement, not as a definition
    expect(matches).toBeNull();
  });
});
