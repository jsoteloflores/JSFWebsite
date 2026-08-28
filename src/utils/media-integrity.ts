/**
 * Media integrity checking functions.
 *
 * Pure functions — no filesystem access here.
 * The CLI script (scripts/validate-media.ts) handles I/O.
 * These functions are testable in Vitest without Node fs access.
 */

import type { MediaItem } from '../types/media';

// ------------------------------------------------------------------ //
// Issue type                                                          //
// ------------------------------------------------------------------ //

export interface MediaIssue {
  id: string;
  field: string;
  message: string;
}

// ------------------------------------------------------------------ //
// Registry checks                                                     //
// ------------------------------------------------------------------ //

/** Detects duplicate media IDs in the registry. */
export function checkDuplicateIds(registry: Record<string, MediaItem>): MediaIssue[] {
  const seen = new Set<string>();
  const issues: MediaIssue[] = [];
  for (const id of Object.keys(registry)) {
    if (seen.has(id)) {
      issues.push({ id, field: 'id', message: `Duplicate media ID "${id}"` });
    }
    seen.add(id);
  }
  return issues;
}

/** Verifies no public path begins with docs/ */
export function checkNoDocksPaths(registry: Record<string, MediaItem>): MediaIssue[] {
  const issues: MediaIssue[] = [];
  for (const item of Object.values(registry)) {
    const paths = extractPaths(item);
    for (const p of paths) {
      if (p.startsWith('docs/') || p.startsWith('/docs/')) {
        issues.push({
          id: item.id,
          field: 'src',
          message: `Path "${p}" references docs/ — only public/media/ paths are allowed`,
        });
      }
    }
  }
  return issues;
}

/** Verifies all public paths begin with /media/ */
export function checkPublicPaths(registry: Record<string, MediaItem>): MediaIssue[] {
  const issues: MediaIssue[] = [];
  for (const item of Object.values(registry)) {
    const paths = extractPaths(item);
    for (const p of paths) {
      if (!p.startsWith('/media/')) {
        issues.push({
          id: item.id,
          field: 'src',
          message: `Path "${p}" does not begin with /media/`,
        });
      }
    }
  }
  return issues;
}

/** Verifies all images and videos have non-empty alt text or description. */
export function checkAltText(registry: Record<string, MediaItem>): MediaIssue[] {
  const issues: MediaIssue[] = [];
  for (const item of Object.values(registry)) {
    if (item.kind === 'image') {
      if (!item.alt || item.alt.trim().length === 0) {
        issues.push({ id: item.id, field: 'alt', message: 'Image has empty alt text' });
      }
    } else if (item.kind === 'video') {
      if (!item.description || item.description.trim().length === 0) {
        issues.push({
          id: item.id,
          field: 'description',
          message: 'Video has empty description',
        });
      }
    } else if (item.kind === 'image-pair') {
      if (!item.left.alt || !item.right.alt) {
        issues.push({
          id: item.id,
          field: 'alt',
          message: 'Image pair has missing alt text',
        });
      }
    } else if (item.kind === 'video-pair') {
      if (!item.left.description || !item.right.description) {
        issues.push({
          id: item.id,
          field: 'description',
          message: 'Video pair has missing description',
        });
      }
    }
  }
  return issues;
}

/** Verifies still pairs have matching dimensions. */
export function checkPairDimensions(registry: Record<string, MediaItem>): MediaIssue[] {
  const issues: MediaIssue[] = [];
  for (const item of Object.values(registry)) {
    if (item.kind === 'image-pair') {
      if (
        item.left.width !== item.right.width ||
        item.left.height !== item.right.height
      ) {
        issues.push({
          id: item.id,
          field: 'dimensions',
          message: `Pair dimensions mismatch: left ${item.left.width}×${item.left.height}, right ${item.right.width}×${item.right.height}`,
        });
      }
    }
    if (item.kind === 'video-pair') {
      if (
        item.left.width !== item.right.width ||
        item.left.height !== item.right.height
      ) {
        issues.push({
          id: item.id,
          field: 'dimensions',
          message: `Video pair dimensions mismatch`,
        });
      }
      const durationDiff = Math.abs(
        item.left.durationSeconds - item.right.durationSeconds,
      );
      if (durationDiff > 0.1) {
        issues.push({
          id: item.id,
          field: 'duration',
          message: `Video pair duration mismatch: ${item.left.durationSeconds}s vs ${item.right.durationSeconds}s`,
        });
      }
    }
  }
  return issues;
}

/** Verifies project IDs in the project-media map resolve to real project IDs. */
export function checkProjectIds(
  projectMediaMap: Record<string, unknown>,
  validProjectIds: string[],
): MediaIssue[] {
  const issues: MediaIssue[] = [];
  const validSet = new Set(validProjectIds);
  for (const key of Object.keys(projectMediaMap)) {
    if (!validSet.has(key)) {
      issues.push({
        id: key,
        field: 'projectId',
        message: `Project media map key "${key}" does not match a known project ID`,
      });
    }
  }
  return issues;
}

/** Runs all registry integrity checks. */
export function runAllMediaChecks(registry: Record<string, MediaItem>): MediaIssue[] {
  return [
    ...checkDuplicateIds(registry),
    ...checkNoDocksPaths(registry),
    ...checkPublicPaths(registry),
    ...checkAltText(registry),
    ...checkPairDimensions(registry),
  ];
}

// ------------------------------------------------------------------ //
// Helpers                                                             //
// ------------------------------------------------------------------ //

function extractPaths(item: MediaItem): string[] {
  switch (item.kind) {
    case 'image':
      return [item.src];
    case 'video':
      return [item.src, item.poster];
    case 'image-pair':
      return [item.left.src, item.right.src];
    case 'video-pair':
      return [item.left.src, item.right.src, item.left.poster, item.right.poster];
    case 'derived-graphic':
      return [item.src];
  }
}
