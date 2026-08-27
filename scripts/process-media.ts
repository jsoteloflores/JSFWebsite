#!/usr/bin/env tsx
/**
 * Media derivative pipeline.
 *
 * Reads approved source media from docs/media/ and writes optimized,
 * sanitized derivatives to public/media/.
 *
 * Rules:
 * - Source files are NEVER overwritten.
 * - Only files under defined derivative directories are written.
 * - Pairs are processed with identical geometry.
 * - Masks remain PNG (lossless).
 * - Photographs and RGB scientific images use WebP.
 * - Screenshots use WebP.
 * - Video transcoding requires ffmpeg (see instructions below if absent).
 *
 * Usage: npm run media:process
 */

import sharp from 'sharp';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(ROOT, 'docs', 'media');
const DEST_KILAUEA = join(ROOT, 'public', 'media', 'projects', 'kilauea');
const DEST_IJEN = join(ROOT, 'public', 'media', 'projects', 'ijen');
const DEST_ABOUT = join(ROOT, 'public', 'media', 'about');
const DEST_HOME = join(ROOT, 'public', 'media', 'home');

// ------------------------------------------------------------------ //
// Helpers                                                             //
// ------------------------------------------------------------------ //

function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
}

function src(filename: string): string {
  return join(SRC, filename);
}

interface ImageTask {
  source: string;
  dest: string;
  width?: number;
  height?: number;
  format: 'webp' | 'png';
  quality?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

interface Report {
  processed: {
    file: string;
    width: number;
    height: number;
    sizeKb: number;
    format: string;
  }[];
  skipped: string[];
  errors: string[];
}

async function processImage(task: ImageTask, report: Report): Promise<void> {
  const { source, dest, width, height, format, quality = 85 } = task;

  if (!existsSync(source)) {
    report.skipped.push(`Source missing: ${source}`);
    return;
  }

  // Guard: never write to docs/
  if (dest.includes('/docs/') || dest.includes('\\docs\\')) {
    throw new Error(`Refusing to write to docs/: ${dest}`);
  }

  ensureDir(dirname(dest));

  let pipeline = sharp(source);

  if (width || height) {
    pipeline = pipeline.resize(width, height, {
      fit: task.fit ?? 'inside',
      withoutEnlargement: true,
    });
  }

  if (format === 'webp') {
    pipeline = pipeline.webp({ quality });
  } else {
    pipeline = pipeline.png({ compressionLevel: 9 });
  }

  await pipeline.toFile(dest);

  const { size } = await import('node:fs').then((fs) => fs.promises.stat(dest));
  const meta = await sharp(dest).metadata();
  report.processed.push({
    file: dest.replace(ROOT, ''),
    width: meta.width ?? 0,
    height: meta.height ?? 0,
    sizeKb: Math.round(size / 1024),
    format,
  });
}

// ------------------------------------------------------------------ //
// Pair processor — verifies equal source dims, uses identical resize  //
// ------------------------------------------------------------------ //

async function processPair(
  srcA: string,
  destA: string,
  fmtA: 'webp' | 'png',
  srcB: string,
  destB: string,
  fmtB: 'webp' | 'png',
  targetWidth: number,
  report: Report,
): Promise<void> {
  if (!existsSync(src(srcA)) || !existsSync(src(srcB))) {
    report.skipped.push(`Pair missing: ${srcA} / ${srcB}`);
    return;
  }

  const metaA = await sharp(src(srcA)).metadata();
  const metaB = await sharp(src(srcB)).metadata();

  if (metaA.width !== metaB.width || metaA.height !== metaB.height) {
    report.errors.push(
      `Pair dimension mismatch: ${srcA} ${metaA.width}×${metaA.height} vs ${srcB} ${metaB.width}×${metaB.height}`,
    );
    return;
  }

  // Compute exact output height preserving aspect ratio
  const outputHeight = Math.round(
    (targetWidth * (metaA.height ?? 1)) / (metaA.width ?? 1),
  );

  await processImage(
    {
      source: src(srcA),
      dest: destA,
      width: targetWidth,
      height: outputHeight,
      format: fmtA,
      quality: 85,
    },
    report,
  );

  await processImage(
    {
      source: src(srcB),
      dest: destB,
      width: targetWidth,
      height: outputHeight,
      format: fmtB,
      quality: 85,
    },
    report,
  );
}

// ------------------------------------------------------------------ //
// Video instructions (requires ffmpeg)                               //
// ------------------------------------------------------------------ //

function processVideos(report: Report): void {
  let hasFfmpeg = false;
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    hasFfmpeg = true;
  } catch {
    hasFfmpeg = false;
  }

  const videoOut = DEST_KILAUEA;
  ensureDir(videoOut);

  if (!hasFfmpeg) {
    const msg = [
      'VIDEO PROCESSING SKIPPED — ffmpeg not found.',
      'Install ffmpeg and rerun npm run media:process.',
      'Required commands when ffmpeg is available:',
      `  ffmpeg -i "${src('binarymask5.mov')}" -vf scale=800:-2 -c:v libx264 -crf 22 -preset slow -an -movflags +faststart "${join(videoOut, 'fountain-binary-mask.mp4')}"`,
      `  ffmpeg -i "${src('Greenoutline5.mov')}" -vf scale=800:-2 -c:v libx264 -crf 22 -preset slow -an -movflags +faststart "${join(videoOut, 'fountain-outline-overlay.mp4')}"`,
      '  Poster frames (extract from timestamp 0.1s):',
      `    ffmpeg -i "${join(videoOut, 'fountain-binary-mask.mp4')}" -ss 0.1 -frames:v 1 "${join(videoOut, 'fountain-binary-mask-poster.webp')}"`,
      `    ffmpeg -i "${join(videoOut, 'fountain-outline-overlay.mp4')}" -ss 0.1 -frames:v 1 "${join(videoOut, 'fountain-outline-overlay-poster.webp')}"`,
    ].join('\n');
    report.skipped.push(msg);
    console.warn('\n' + msg + '\n');
    return;
  }

  // ffmpeg is available — transcode both videos with identical settings
  const maskIn = src('binarymask5.mov');
  const outlineIn = src('Greenoutline5.mov');
  const maskOut = join(videoOut, 'fountain-binary-mask.mp4');
  const outlineOut = join(videoOut, 'fountain-outline-overlay.mp4');
  const maskPoster = join(videoOut, 'fountain-binary-mask-poster.webp');
  const outlinePoster = join(videoOut, 'fountain-outline-overlay-poster.webp');

  const ffArgs =
    '-vf scale=800:-2 -c:v libx264 -crf 22 -preset slow -an -movflags +faststart -y';
  execSync(`ffmpeg -i "${maskIn}" ${ffArgs} "${maskOut}"`, { stdio: 'inherit' });
  execSync(`ffmpeg -i "${outlineIn}" ${ffArgs} "${outlineOut}"`, { stdio: 'inherit' });
  execSync(`ffmpeg -i "${maskOut}" -ss 0.1 -frames:v 1 -y "${maskPoster}"`, {
    stdio: 'inherit',
  });
  execSync(`ffmpeg -i "${outlineOut}" -ss 0.1 -frames:v 1 -y "${outlinePoster}"`, {
    stdio: 'inherit',
  });

  [maskOut, outlineOut, maskPoster, outlinePoster].forEach((f) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { size } = require('fs').statSync(f) as { size: number };
    report.processed.push({
      file: f.replace(ROOT, ''),
      width: 800,
      height: 0,
      sizeKb: Math.round(size / 1024),
      format: f.endsWith('.mp4') ? 'mp4' : 'webp',
    });
  });
}

// ------------------------------------------------------------------ //
// Main                                                                //
// ------------------------------------------------------------------ //

async function main(): Promise<void> {
  console.log('[media] Processing derivatives from docs/media/ …\n');
  const report: Report = { processed: [], skipped: [], errors: [] };

  ensureDir(DEST_KILAUEA);
  ensureDir(DEST_IJEN);
  ensureDir(DEST_ABOUT);
  ensureDir(DEST_HOME);

  // ── Kīlauea daytime pair (source: 1500×2000, 3:4) ──────────────────
  await processPair(
    '28_KilaueaOverlook1_frame00032168.png',
    join(DEST_KILAUEA, 'daytime-fountain-rgb.webp'),
    'webp',
    '28_KilaueaOverlook1_frame00032168_mask.png',
    join(DEST_KILAUEA, 'daytime-fountain-mask.png'),
    'png',
    800,
    report,
  );

  // ── Kīlauea nighttime pair (source: 1000×2000, 1:2) ─────────────────
  await processPair(
    '28_KilaueaOverlook2_frame00034716.png',
    join(DEST_KILAUEA, 'night-fountain-rgb.webp'),
    'webp',
    '28_KilaueaOverlook2_frame00034716_mask.png',
    join(DEST_KILAUEA, 'night-fountain-mask.png'),
    'png',
    800,
    report,
  );

  // ── Kīlauea videos (requires ffmpeg) ────────────────────────────────
  processVideos(report);

  // ── Kīlauea screenshots ─────────────────────────────────────────────
  await processImage(
    {
      source: src('Screenshot 2026-07-17 at 6.31.47 PM.png'),
      dest: join(DEST_KILAUEA, 'fountainlabeller-interface.webp'),
      width: 1400,
      format: 'webp',
      quality: 88,
    },
    report,
  );

  // ── Kīlauea field photos ─────────────────────────────────────────────
  // Portrait photos: resize to height=1200
  await processImage(
    {
      source: src('IMG_3464.jpeg'),
      dest: join(DEST_KILAUEA, 'kilauea-fountain-field-photo.webp'),
      height: 1200,
      format: 'webp',
      quality: 83,
    },
    report,
  );

  await processImage(
    {
      source: src('IMG_3645.jpeg'),
      dest: join(DEST_KILAUEA, 'kilauea-sunset.webp'),
      width: 1200,
      format: 'webp',
      quality: 83,
    },
    report,
  );

  await processImage(
    {
      source: src('IMG_3453.jpeg'),
      dest: join(DEST_KILAUEA, 'joel-at-kilauea.webp'),
      height: 800,
      format: 'webp',
      quality: 83,
    },
    report,
  );

  await processImage(
    {
      source: src('IMG_3447.jpeg'),
      dest: join(DEST_KILAUEA, 'joel-kilauea-selfie.webp'),
      width: 1200,
      format: 'webp',
      quality: 83,
    },
    report,
  );

  await processImage(
    {
      source: src('IMG_6063.jpeg'),
      dest: join(DEST_KILAUEA, 'fieldwork-group.webp'),
      width: 1400,
      format: 'webp',
      quality: 83,
    },
    report,
  );

  // ── Ijen SEM pair (source: 2560×1795, landscape) ────────────────────
  await processPair(
    'Site8IsolatedBubbleConnectivity_original.png',
    join(DEST_IJEN, 'sem-bubble-connectivity-original.webp'),
    'webp',
    'Site8IsolatedBubbleConnectivity_mask.png',
    join(DEST_IJEN, 'sem-bubble-connectivity-mask.png'),
    'png',
    900,
    report,
  );

  // ── Ijen PyRO-FOAMS screenshot ──────────────────────────────────────
  await processImage(
    {
      source: src('Screenshot 2026-07-17 at 6.22.06 PM.png'),
      dest: join(DEST_IJEN, 'pyro-foams-interface.webp'),
      width: 1400,
      format: 'webp',
      quality: 88,
    },
    report,
  );

  // ── About portraits ─────────────────────────────────────────────────
  await processImage(
    {
      source: src('IMG_3387.jpeg'),
      dest: join(DEST_ABOUT, 'joel-mauna-loa.webp'),
      width: 1200,
      format: 'webp',
      quality: 85,
    },
    report,
  );

  await processImage(
    {
      source: src('IMG_2925.jpeg'),
      dest: join(DEST_ABOUT, 'joel-delicate-arch.webp'),
      width: 1200,
      format: 'webp',
      quality: 85,
    },
    report,
  );

  // ── Homepage: Kīlauea sunset hero (IMG_3639.jpeg) ────────────────────
  await processImage(
    {
      source: src('IMG_3639.jpeg'),
      dest: join(DEST_HOME, 'kilauea-sunset-hero.webp'),
      width: 2560,
      format: 'webp',
      quality: 84,
    },
    report,
  );

  // ── Homepage night-sky banner ────────────────────────────────────────
  await processImage(
    {
      source: src('nightsky.JPG'),
      dest: join(DEST_HOME, 'nightsky-banner.webp'),
      width: 2400,
      format: 'webp',
      quality: 82,
    },
    report,
  );

  // ── Report ──────────────────────────────────────────────────────────
  console.log(`\n[media] Processed ${report.processed.length} file(s):\n`);
  for (const f of report.processed) {
    const dims = f.width && f.height ? ` ${f.width}×${f.height}` : '';
    console.log(`  ✓ ${f.file}${dims} (${f.sizeKb} KB)`);
  }

  if (report.skipped.length > 0) {
    console.log(`\n[media] Skipped (${report.skipped.length}):`);
    for (const s of report.skipped) {
      console.log(`  ⚠ ${s.split('\n')[0]}`);
    }
  }

  if (report.errors.length > 0) {
    console.error(`\n[media] ${report.errors.length} error(s):`);
    for (const e of report.errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }

  // Write machine-readable report
  writeFileSync(
    join(ROOT, 'public', 'media', 'processing-report.json'),
    JSON.stringify({ generated: new Date().toISOString(), ...report }, null, 2),
  );

  console.log('\n[media] Derivative generation complete.\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
