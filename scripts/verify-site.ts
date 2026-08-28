#!/usr/bin/env tsx
/**
 * Site build verification script.
 *
 * Runs after `npm run build` to confirm:
 * - all 13 expected public HTML pages exist in dist/
 * - no unexpected client-side JavaScript is emitted at page level
 * - key content is present in specific pages
 *
 * Usage: npm run site:verify
 * Exit 0: all checks passed
 * Exit 1: one or more checks failed
 */

import { existsSync, readFileSync, readdirSync, type Dirent } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

// ------------------------------------------------------------------ //
// Expected pages                                                      //
// ------------------------------------------------------------------ //

const TOP_LEVEL_PAGES = [
  'index.html',
  'about/index.html',
  'research/index.html',
  'publications/index.html',
  'presentations/index.html',
  'software/index.html',
  'cv/index.html',
];

const PROJECT_IDS = [
  'kilauea-lava-fountain-computer-vision',
  'ijen-pyroclast-microct-analysis',
  'v0499-centauri-photometry',
  'wds-03575-0110-astrometry',
  'nanoparticle-dipole-self-assembly',
  'riesel-sierpinski-computational-number-theory',
];

const PROJECT_PAGES = PROJECT_IDS.map((id) => `research/${id}/index.html`);

const ALL_EXPECTED = [...TOP_LEVEL_PAGES, ...PROJECT_PAGES];

// ------------------------------------------------------------------ //
// Content checks (page path → required substrings)                   //
// ------------------------------------------------------------------ //

const CONTENT_CHECKS: [string, string[]][] = [
  [
    'index.html',
    [
      'Joel Sotelo Flores',
      'Computational',
      'data-section="hero"',
      '/media/projects/kilauea/',
      // sunset hero is in the CSS bundle (_astro/); checked separately below
      'data-section="research-interests"',
      'Research interests',
    ],
  ],
  ['about/index.html', ['Washington and Lee University', 'Physics', 'Mauna Loa']],
  ['research/index.html', ['Current research', 'Kī']],
  ['publications/index.html', ['Peer-reviewed publications', 'Manuscripts']],
  ['presentations/index.html', ['Conference Presentations']],
  [
    'cv/index.html',
    ['Curriculum Vitae', 'Download PDF', 'Education', 'Research Experience'],
  ],
  ['software/index.html', ['Scientific software']],
  ['research/kilauea-lava-fountain-computer-vision/index.html', ['Kīlauea']],
  ['research/ijen-pyroclast-microct-analysis/index.html', ['Ijen']],
  [
    'research/wds-03575-0110-astrometry/index.html',
    ['WDS 03575-0110', 'Journal of Double Star Observations'],
  ],
  ['research/nanoparticle-dipole-self-assembly/index.html', ['Nanoparticle']],
  ['research/riesel-sierpinski-computational-number-theory/index.html', ['Riesel']],
];

// ------------------------------------------------------------------ //
// Unexpected JS check                                                 //
// ------------------------------------------------------------------ //

/**
 * Finds ALL .js and .mjs files anywhere in dist/, including dist/_astro/.
 * Returns a list of relative paths.
 */
function findAllJs(dir: string, relative = ''): string[] {
  const files: string[] = [];
  let entries: Dirent[];
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const name = entry.name;
    const rel = relative ? `${relative}/${name}` : name;
    if (entry.isDirectory()) {
      files.push(...findAllJs(join(dir, name), rel));
    } else if (name.endsWith('.js') || name.endsWith('.mjs')) {
      files.push(rel);
    }
  }
  return files;
}

/**
 * Collects all <script> src references from HTML files in dist/.
 * Returns the set of JavaScript paths referenced by public HTML.
 */
function collectScriptSrcs(dir: string): Set<string> {
  const srcs = new Set<string>();
  let entries: Dirent[];
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return srcs;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const s of collectScriptSrcs(full)) srcs.add(s);
    } else if (entry.name.endsWith('.html')) {
      const html = readFileSync(full, 'utf-8');
      // Match <script src="..."> and <script type="module" src="...">
      const matches = html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi);
      for (const m of matches) {
        if (m[1]) srcs.add(m[1]);
      }
      // Also check for inline scripts (script tags without src)
      if (/<script(?:\s[^>]*)?>(?!\s*<\/script>)/i.test(html)) {
        srcs.add(`__inline_script__:${full.replace(dir, '')}`);
      }
    }
  }
  return srcs;
}

// ------------------------------------------------------------------ //
// Runner                                                              //
// ------------------------------------------------------------------ //

let errors = 0;

function fail(msg: string): void {
  console.error(`[verify] ✗ ${msg}`);
  errors++;
}

function pass(msg: string): void {
  console.log(`[verify] ✓ ${msg}`);
}

if (!existsSync(DIST)) {
  console.error('[verify] dist/ directory not found. Run npm run build first.');
  process.exit(1);
}

console.log('[verify] Checking build output…\n');

// 1. Page existence
for (const page of ALL_EXPECTED) {
  const full = join(DIST, page);
  if (existsSync(full)) {
    pass(`${page}`);
  } else {
    fail(`Missing page: ${page}`);
  }
}

console.log('');

// 2. Content checks
for (const [page, substrings] of CONTENT_CHECKS) {
  const full = join(DIST, page);
  if (!existsSync(full)) continue; // already reported above
  const html = readFileSync(full, 'utf-8');
  for (const s of substrings) {
    if (html.includes(s)) {
      pass(`${page} contains "${s}"`);
    } else {
      fail(`${page} missing expected content: "${s}"`);
    }
  }
}

console.log('');

// 3. JavaScript audit — comprehensive: all dist/ JS + all script tags
console.log('\n[verify] Auditing JavaScript across all of dist/…\n');

const allJsFiles = findAllJs(DIST);
const scriptSrcs = collectScriptSrcs(DIST);

// Report all found JS files
if (allJsFiles.length === 0) {
  pass('No .js or .mjs files found anywhere in dist/');
} else {
  for (const f of allJsFiles) {
    pass(`JS file found: ${f} (inventoried)`);
  }
}

// Check: are any JS files referenced by <script src> in public HTML?
const referencedJs = allJsFiles.filter((f) => {
  const rel = `/${f}`;
  return [...scriptSrcs].some((src) => src === rel || src.endsWith(`/${f}`));
});

if (referencedJs.length === 0) {
  pass('No JavaScript files are referenced by <script> tags in public HTML');
} else {
  for (const f of referencedJs) {
    fail(
      `Browser-delivered JavaScript: ${f} is referenced by a public HTML script tag`,
    );
  }
}

// Check: any inline scripts?
const inlineScripts = [...scriptSrcs].filter((s) => s.startsWith('__inline_script__:'));
if (inlineScripts.length === 0) {
  pass('No inline <script> content in generated HTML');
} else {
  for (const s of inlineScripts) {
    fail(`Inline <script> found in: ${s.replace('__inline_script__:', '')}`);
  }
}

console.log('');

// 4. Media path checks (key pages)
console.log('[verify] Checking media paths in built pages…\n');

const mediaChecks: [string, string[]][] = [
  ['index.html', ['/media/projects/kilauea/']],
  ['about/index.html', ['/media/about/joel-mauna-loa.webp']],
  [
    'research/kilauea-lava-fountain-computer-vision/index.html',
    [
      '/media/projects/kilauea/daytime-fountain-rgb.webp',
      '/media/projects/kilauea/daytime-fountain-mask.png',
    ],
  ],
  [
    'research/ijen-pyroclast-microct-analysis/index.html',
    [
      '/media/projects/ijen/sem-bubble-connectivity-original.webp',
      '/media/projects/ijen/sem-bubble-connectivity-mask.png',
    ],
  ],
];

for (const [page, paths] of mediaChecks) {
  const full = join(DIST, page);
  if (!existsSync(full)) continue;
  const html = readFileSync(full, 'utf-8');
  for (const p of paths) {
    if (html.includes(p)) {
      pass(`${page} contains media path: ${p}`);
    } else {
      fail(`${page} missing expected media path: ${p}`);
    }
  }
}

// 4b. Verify nightsky banner URL appears in the bundled CSS
const astroDir = join(DIST, '_astro');
if (existsSync(astroDir)) {
  const cssFiles = readdirSync(astroDir).filter((f) => f.endsWith('.css'));
  const bannerInCss = cssFiles.some((f) =>
    readFileSync(join(astroDir, f), 'utf-8').includes('kilauea-sunset-hero.webp'),
  );
  if (bannerInCss) {
    pass('kilauea-sunset-hero.webp found in bundled CSS (_astro/)');
  } else {
    fail('kilauea-sunset-hero.webp not found in any bundled CSS file');
  }
}

// 5. CSS blue-color audit — no blue UI accents in authored stylesheets
console.log('\n[verify] Auditing authored CSS for blue UI colors…\n');

import { readdirSync as _rd2 } from 'node:fs';
const CSS_FILES = [
  join(ROOT, 'src/styles/tokens.css'),
  join(ROOT, 'src/styles/global.css'),
];
const BLUE_PATTERNS = [/\b#0000ff\b/i, /\brgb\(\s*0\s*,\s*0\s*,\s*255/i, /\bblue\b/];
let blueFound = false;
for (const cssFile of CSS_FILES) {
  if (!existsSync(cssFile)) continue;
  const css = readFileSync(cssFile, 'utf-8');
  for (const pattern of BLUE_PATTERNS) {
    if (pattern.test(css)) {
      fail(`Blue UI color literal found in ${cssFile}`);
      blueFound = true;
    }
  }
}
if (!blueFound) pass('No blue UI color literals in authored CSS');

// Summary
if (errors === 0) {
  console.log(`\n[verify] All checks passed. 13 pages verified.\n`);
  process.exit(0);
} else {
  console.error(`\n[verify] ${errors} check(s) failed.\n`);
  process.exit(1);
}
