#!/usr/bin/env tsx
/**
 * Site build verification script.
 *
 * Runs after `npm run build` to confirm:
 * - all 12 expected public HTML pages exist in dist/
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
  ['index.html', ['Joel Sotelo Flores', 'Computational']],
  ['about/index.html', ['Washington and Lee University', 'Physics']],
  ['research/index.html', ['Current volcanology research', 'Kī']],
  ['publications/index.html', ['Peer-reviewed publications']],
  ['presentations/index.html', ['verified conference metadata']],
  ['software/index.html', ['canonical names']],
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
 * Checks that no .js files exist outside of dist/_astro/.
 * Client bundles would appear at page level or as separate module files.
 */
function findPageLevelJs(dir: string, relative = ''): string[] {
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
      if (name === '_astro') continue; // build assets — expected
      files.push(...findPageLevelJs(join(dir, name), rel));
    } else if (name.endsWith('.js') || name.endsWith('.mjs')) {
      files.push(rel);
    }
  }
  return files;
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

// 3. No unexpected page-level JS
const unexpectedJs = findPageLevelJs(DIST);
if (unexpectedJs.length === 0) {
  pass('No unexpected client JavaScript found outside _astro/');
} else {
  for (const f of unexpectedJs) {
    fail(`Unexpected JS file: ${f}`);
  }
}

console.log('');

// Summary
if (errors === 0) {
  console.log(`[verify] All checks passed. 12 pages verified.\n`);
  process.exit(0);
} else {
  console.error(`[verify] ${errors} check(s) failed.\n`);
  process.exit(1);
}
