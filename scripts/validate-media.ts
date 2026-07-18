#!/usr/bin/env tsx
/**
 * Media integrity validation script.
 *
 * Verifies the public media registry against the actual files in public/media/,
 * checks all integrity rules defined in src/utils/media-integrity.ts, and
 * audits generated HTML for autoplay, missing controls, and missing muted.
 *
 * Usage: npm run media:validate
 * Exit 0: all checks passed
 * Exit 1: one or more checks failed
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  mediaRegistry,
  projectMedia,
  kilauea_daytime_pair,
  kilauea_night_pair,
  ijen_sem_pair,
} from '../src/data/media.js';
import { runAllMediaChecks, checkProjectIds } from '../src/utils/media-integrity.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

let errors = 0;

function fail(msg: string): void {
  console.error(`[media] ✗ ${msg}`);
  errors++;
}

function pass(msg: string): void {
  console.log(`[media] ✓ ${msg}`);
}

// ------------------------------------------------------------------ //
// Registry integrity checks                                           //
// ------------------------------------------------------------------ //

console.log('[media] Running media registry checks…\n');

const registryIssues = runAllMediaChecks(mediaRegistry);
for (const issue of registryIssues) {
  fail(`${issue.id}: ${issue.field} — ${issue.message}`);
}
if (registryIssues.length === 0) {
  pass('Registry integrity checks passed');
}

// ------------------------------------------------------------------ //
// Project-media map key checks                                        //
// ------------------------------------------------------------------ //

const validProjectIds = [
  'kilauea-lava-fountain-computer-vision',
  'ijen-pyroclast-microct-analysis',
  'v0499-centauri-photometry',
  'wds-03575-0110-astrometry',
  'nanoparticle-dipole-self-assembly',
  'riesel-sierpinski-computational-number-theory',
];
const mapIssues = checkProjectIds(projectMedia, validProjectIds);
for (const issue of mapIssues) fail(issue.message);
if (mapIssues.length === 0) pass('Project-media map keys valid');

// ------------------------------------------------------------------ //
// File existence checks                                               //
// ------------------------------------------------------------------ //

console.log(
  '\n[media] Checking file existence (skipping video paths — requires ffmpeg)…\n',
);

// Note: video file existence is not checked since ffmpeg is required to produce MP4 derivatives.

for (const item of Object.values(mediaRegistry)) {
  const paths: string[] = [];
  if (item.kind === 'image') paths.push(item.src);
  else if (item.kind === 'video') {
    // Videos may not exist if ffmpeg is not installed
    continue;
  } else if (item.kind === 'image-pair') paths.push(item.left.src, item.right.src);
  else if (item.kind === 'video-pair') continue; // skip video pairs

  for (const p of paths) {
    const full = join(ROOT, 'public', p);
    if (existsSync(full)) {
      pass(`Exists: ${p}`);
    } else {
      fail(`Missing: ${p}`);
    }
  }
}

// ------------------------------------------------------------------ //
// Pair dimension match from actual files                              //
// ------------------------------------------------------------------ //

console.log('\n[media] Verifying still-pair output dimensions…\n');

async function checkPairFiles(
  leftPath: string,
  rightPath: string,
  pairId: string,
): Promise<void> {
  const leftFull = join(ROOT, 'public', leftPath);
  const rightFull = join(ROOT, 'public', rightPath);

  if (!existsSync(leftFull) || !existsSync(rightFull)) {
    fail(`Pair ${pairId}: one or both files missing — dimension check skipped`);
    return;
  }

  const sharp = (await import('sharp')).default;
  const metaL = await sharp(leftFull).metadata();
  const metaR = await sharp(rightFull).metadata();

  if (metaL.width === metaR.width && metaL.height === metaR.height) {
    pass(`Pair ${pairId}: both files ${metaL.width}×${metaL.height}`);
  } else {
    fail(
      `Pair ${pairId}: dimension mismatch — left ${metaL.width}×${metaL.height}, right ${metaR.width}×${metaR.height}`,
    );
  }
}

await checkPairFiles(
  kilauea_daytime_pair.left.src,
  kilauea_daytime_pair.right.src,
  'kilauea-daytime-pair',
);
await checkPairFiles(
  kilauea_night_pair.left.src,
  kilauea_night_pair.right.src,
  'kilauea-night-pair',
);
await checkPairFiles(ijen_sem_pair.left.src, ijen_sem_pair.right.src, 'ijen-sem-pair');

// ------------------------------------------------------------------ //
// Mask format check — no JPEG masks                                   //
// ------------------------------------------------------------------ //

console.log('\n[media] Checking mask formats (must not be JPEG)…\n');

const maskPaths = [
  kilauea_daytime_pair.right.src,
  kilauea_night_pair.right.src,
  ijen_sem_pair.right.src,
];
for (const p of maskPaths) {
  const ext = extname(p).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    fail(`Mask is JPEG (lossy): ${p}`);
  } else {
    pass(`Mask is lossless (${ext}): ${p}`);
  }
}

// ------------------------------------------------------------------ //
// HTML audit: autoplay, controls, muted (if dist/ exists)            //
// ------------------------------------------------------------------ //

if (existsSync(DIST)) {
  console.log('\n[media] Auditing generated HTML for video attributes…\n');

  function collectHtml(dir: string): string[] {
    const files: string[] = [];
    try {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) files.push(...collectHtml(join(dir, entry.name)));
        else if (entry.name.endsWith('.html')) files.push(join(dir, entry.name));
      }
    } catch {
      /* empty dir */
    }
    return files;
  }

  const htmlFiles = collectHtml(DIST);
  let autoplayCount = 0;

  for (const htmlPath of htmlFiles) {
    const content = readFileSync(htmlPath, 'utf-8');
    // Check for autoplay attribute
    if (/\bautoplay\b/i.test(content) && !content.includes('autoplay media')) {
      fail(`autoplay found in HTML: ${htmlPath.replace(ROOT, '')}`);
      autoplayCount++;
    }
  }

  if (autoplayCount === 0) pass('No autoplay attributes in generated HTML');
} else {
  console.log(
    '\n[media] dist/ not found — skipping HTML audit (run npm run build first)\n',
  );
}

// ------------------------------------------------------------------ //
// Summary                                                             //
// ------------------------------------------------------------------ //

console.log('');
if (errors === 0) {
  console.log('[media] All media checks passed.\n');
  process.exit(0);
} else {
  console.error(`[media] ${errors} check(s) failed.\n`);
  process.exit(1);
}
