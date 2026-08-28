/**
 * Process research graphics — derive visual identity elements from real research media.
 *
 * Extracts contours from approved binary segmentation masks to create
 * lightweight SVG graphics for visual identity.
 *
 * Sources:
 * - Kīlauea: daytime-fountain-mask.png
 * - Ijen: sem-bubble-connectivity-mask.png
 *
 * All derived graphics must be reproducible and scientifically truthful.
 */

import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

interface Point {
  x: number;
  y: number;
}

/**
 * Douglas-Peucker algorithm for polyline simplification.
 * Reduces the number of points while preserving shape.
 */
function douglasPeucker(points: Point[], tolerance: number): Point[] {
  if (points.length <= 2) return points;

  let maxDistance = 0;
  let maxIndex = 0;

  const first = points[0];
  const last = points[points.length - 1];

  // TypeScript safety check
  if (!first || !last) return points;

  // Find point with maximum distance from line
  for (let i = 1; i < points.length - 1; i++) {
    const point = points[i];
    if (!point) continue;
    const distance = perpendicularDistance(point, first, last);
    if (distance > maxDistance) {
      maxDistance = distance;
      maxIndex = i;
    }
  }

  // If max distance is greater than tolerance, recursively simplify
  if (maxDistance > tolerance) {
    const left = douglasPeucker(points.slice(0, maxIndex + 1), tolerance);
    const right = douglasPeucker(points.slice(maxIndex), tolerance);
    return [...left.slice(0, -1), ...right];
  } else {
    return [first, last];
  }
}

/**
 * Calculate perpendicular distance from point to line segment.
 */
function perpendicularDistance(point: Point, lineStart: Point, lineEnd: Point): number {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;

  if (dx === 0 && dy === 0) {
    // Line segment is a point
    return Math.sqrt(
      Math.pow(point.x - lineStart.x, 2) + Math.pow(point.y - lineStart.y, 2),
    );
  }

  const t =
    ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / (dx * dx + dy * dy);

  if (t < 0) {
    return Math.sqrt(
      Math.pow(point.x - lineStart.x, 2) + Math.pow(point.y - lineStart.y, 2),
    );
  } else if (t > 1) {
    return Math.sqrt(
      Math.pow(point.x - lineEnd.x, 2) + Math.pow(point.y - lineEnd.y, 2),
    );
  }

  const projX = lineStart.x + t * dx;
  const projY = lineStart.y + t * dy;

  return Math.sqrt(Math.pow(point.x - projX, 2) + Math.pow(point.y - projY, 2));
}

/**
 * Extract primary exterior contour from binary mask using Moore-Neighbor tracing.
 */
async function extractContour(
  imagePath: string,
): Promise<{ points: Point[]; width: number; height: number }> {
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read image dimensions: ${imagePath}`);
  }

  const { data, info } = await image
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Find the first white pixel (mask boundary start)
  let startX = -1;
  let startY = -1;

  outer: for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const intensity = data[idx] ?? 0; // R channel (binary mask)
      if (intensity > 127) {
        startX = x;
        startY = y;
        break outer;
      }
    }
  }

  if (startX === -1) {
    throw new Error(`No white pixels found in mask: ${imagePath}`);
  }

  // Moore-Neighbor contour tracing
  const contour: Point[] = [];
  const directions = [
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: -1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: -1 },
  ];

  let x = startX;
  let y = startY;
  let dir = 7; // Start checking from upper-left

  const isWhite = (px: number, py: number): boolean => {
    if (px < 0 || px >= width || py < 0 || py >= height) return false;
    const idx = (py * width + px) * channels;
    return (data[idx] ?? 0) > 127;
  };

  const maxIterations = width * height; // Safety limit
  let iterations = 0;

  do {
    contour.push({ x, y });

    // Look for next boundary pixel
    let found = false;
    for (let i = 0; i < 8; i++) {
      const checkDir = (dir + i) % 8;
      const direction = directions[checkDir];
      if (!direction) continue;

      const nextX = x + direction.dx;
      const nextY = y + direction.dy;

      if (isWhite(nextX, nextY)) {
        x = nextX;
        y = nextY;
        dir = (checkDir + 6) % 8; // Turn left
        found = true;
        break;
      }
    }

    if (!found) break;

    iterations++;
    if (iterations > maxIterations) {
      console.warn(`Contour tracing exceeded maximum iterations`);
      break;
    }
  } while (x !== startX || y !== startY || contour.length < 3);

  return { points: contour, width, height };
}

/**
 * Generate SVG from contour points.
 */
function generateSVG(
  points: Point[],
  viewBoxWidth: number,
  viewBoxHeight: number,
  sourceMediaId: string,
): string {
  if (points.length === 0) {
    throw new Error('Cannot generate SVG from empty contour');
  }

  const pathData =
    points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" aria-hidden="true">
  <title>Contour derived from ${sourceMediaId}</title>
  <path d="${pathData}" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/>
</svg>`;
}

/**
 * Process Kīlauea daytime fountain mask.
 */
async function processKilaueaContour() {
  console.log('[graphics] Processing Kīlauea fountain contour…');

  const sourcePath = path.join(
    rootDir,
    'public/media/projects/kilauea/daytime-fountain-mask.png',
  );
  const outputPath = path.join(
    rootDir,
    'public/media/graphics/kilauea-fountain-contour.svg',
  );

  // Extract contour
  const { points, width, height } = await extractContour(sourcePath);
  console.log(`[graphics] Extracted ${points.length} contour points`);

  // Simplify with Douglas-Peucker (tolerance tuned for fountain shape)
  const tolerance = 2.0;
  const simplified = douglasPeucker(points, tolerance);
  console.log(
    `[graphics] Simplified to ${simplified.length} points (tolerance: ${tolerance})`,
  );

  // Generate SVG
  const svg = generateSVG(simplified, width, height, 'daytime-fountain-mask');

  // Ensure output directory exists
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  // Write SVG
  await fs.writeFile(outputPath, svg, 'utf-8');

  const stats = await fs.stat(outputPath);
  console.log(
    `[graphics] ✓ kilauea-fountain-contour.svg (${simplified.length} points, ${Math.round(stats.size / 1024)} KB)`,
  );
}

/**
 * Process Ijen vesicle segmentation mask.
 */
async function processIjenContour() {
  console.log('[graphics] Processing Ijen vesicle contour…');

  const sourcePath = path.join(
    rootDir,
    'public/media/projects/ijen/sem-bubble-connectivity-mask.png',
  );
  const outputPath = path.join(
    rootDir,
    'public/media/graphics/ijen-vesicle-contours.svg',
  );

  try {
    // Extract contour
    const { points, width, height } = await extractContour(sourcePath);
    console.log(`[graphics] Extracted ${points.length} contour points`);

    // Simplify with Douglas-Peucker
    const tolerance = 1.5;
    const simplified = douglasPeucker(points, tolerance);
    console.log(
      `[graphics] Simplified to ${simplified.length} points (tolerance: ${tolerance})`,
    );

    // Generate SVG
    const svg = generateSVG(simplified, width, height, 'sem-bubble-connectivity-mask');

    // Ensure output directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Write SVG
    await fs.writeFile(outputPath, svg, 'utf-8');

    const stats = await fs.stat(outputPath);
    console.log(
      `[graphics] ✓ ijen-vesicle-contours.svg (${simplified.length} points, ${Math.round(stats.size / 1024)} KB)`,
    );
  } catch (error) {
    console.warn(
      `[graphics] ⚠ Could not process Ijen contour (mask may not support clean extraction):`,
      error instanceof Error ? error.message : String(error),
    );
    console.log(
      `[graphics] Ijen vesicle contour generation skipped (source mask unsuitable)`,
    );
  }
}

/**
 * Main execution.
 */
async function main() {
  console.log('[graphics] Generating research-derived visual identity graphics…\n');

  try {
    await processKilaueaContour();
    console.log();
    await processIjenContour();
    console.log();
    console.log('[graphics] All research graphics processed successfully.');
  } catch (error) {
    console.error('[graphics] Error processing graphics:', error);
    process.exit(1);
  }
}

main();
