/**
 * Pure content-integrity validation module.
 *
 * This module contains all relationship and safety checking logic.
 * It does NOT import from 'astro:content' and does NOT read the filesystem.
 * The CLI script (scripts/validate-content.ts) handles I/O and calls this module.
 *
 * All functions are pure and testable in Vitest without any Astro context.
 */

import type {
  ProjectFrontmatter,
  PublicationFrontmatter,
  PresentationFrontmatter,
  SoftwareFrontmatter,
  ExhibitFrontmatter,
} from '../types/content-schemas';

// ------------------------------------------------------------------ //
// Collection data container                                           //
// ------------------------------------------------------------------ //

/**
 * Maps collection name → (id → parsed, schema-validated frontmatter).
 * IDs are derived from the Markdown filename (path relative to collection
 * directory, without the .md extension, using forward slashes).
 */
export interface CollectionData {
  projects: Map<string, ProjectFrontmatter>;
  publications: Map<string, PublicationFrontmatter>;
  presentations: Map<string, PresentationFrontmatter>;
  software: Map<string, SoftwareFrontmatter>;
  exhibits: Map<string, ExhibitFrontmatter>;
}

// ------------------------------------------------------------------ //
// Integrity issue types                                               //
// ------------------------------------------------------------------ //

export type IssueKind =
  | 'missing-reference'
  | 'duplicate-id'
  | 'backlink-mismatch'
  | 'visibility-safety'
  | 'unsafe-url';

export interface IntegrityIssue {
  kind: IssueKind;
  /** e.g. "publications/sotelo-flores-2025-jvgr" */
  source: string;
  /** e.g. "relatedProject" */
  field: string;
  message: string;
}

// ------------------------------------------------------------------ //
// Helper                                                              //
// ------------------------------------------------------------------ //

function missingRef(
  source: string,
  field: string,
  missingId: string,
  targetCollection: string,
): IntegrityIssue {
  return {
    kind: 'missing-reference',
    source,
    field,
    message: `references missing ${targetCollection} "${missingId}"`,
  };
}

function containsLocalUrl(value: unknown): boolean {
  if (typeof value === 'string') return value.startsWith('file:///');
  if (Array.isArray(value)) return value.some(containsLocalUrl);
  if (value !== null && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).some(containsLocalUrl);
  }
  return false;
}

// ------------------------------------------------------------------ //
// Duplicate ID checks                                                 //
// ------------------------------------------------------------------ //

/**
 * Detects duplicate IDs supplied during a single parse run.
 * Duplicates can arise if two files resolve to the same collection-relative
 * path (e.g., a file at the root and in a nested folder with the same name).
 */
export function checkDuplicateIds(
  idsByCollection: Record<string, string[]>,
): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];
  for (const [collection, ids] of Object.entries(idsByCollection)) {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) {
        issues.push({
          kind: 'duplicate-id',
          source: `${collection}/${id}`,
          field: 'id',
          message: `duplicate ID "${id}" in collection "${collection}"`,
        });
      }
      seen.add(id);
    }
  }
  return issues;
}

// ------------------------------------------------------------------ //
// Relationship checks                                                 //
// ------------------------------------------------------------------ //

/**
 * Validates every relationship field across all collections.
 * Returns one issue per missing reference; collects all issues in one pass.
 */
export function checkRelationships(data: CollectionData): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];

  const projectIds = new Set(data.projects.keys());
  const publicationIds = new Set(data.publications.keys());
  const presentationIds = new Set(data.presentations.keys());
  const softwareIds = new Set(data.software.keys());
  const exhibitIds = new Set(data.exhibits.keys());

  // Projects → publications, presentations, software, exhibits
  for (const [id, project] of data.projects) {
    const src = `projects/${id}`;
    for (const pubId of project.relatedPublications ?? []) {
      if (!publicationIds.has(pubId)) {
        issues.push(missingRef(src, 'relatedPublications', pubId, 'publication'));
      }
    }
    for (const presId of project.relatedPresentations ?? []) {
      if (!presentationIds.has(presId)) {
        issues.push(missingRef(src, 'relatedPresentations', presId, 'presentation'));
      }
    }
    for (const swId of project.relatedSoftware ?? []) {
      if (!softwareIds.has(swId)) {
        issues.push(missingRef(src, 'relatedSoftware', swId, 'software'));
      }
    }
    if (
      project.relatedExhibit !== undefined &&
      !exhibitIds.has(project.relatedExhibit)
    ) {
      issues.push(missingRef(src, 'relatedExhibit', project.relatedExhibit, 'exhibit'));
    }
  }

  // Publications → project
  for (const [id, pub] of data.publications) {
    if (pub.relatedProject !== undefined && !projectIds.has(pub.relatedProject)) {
      issues.push(
        missingRef(
          `publications/${id}`,
          'relatedProject',
          pub.relatedProject,
          'project',
        ),
      );
    }
  }

  // Presentations → project
  for (const [id, pres] of data.presentations) {
    if (pres.relatedProject !== undefined && !projectIds.has(pres.relatedProject)) {
      issues.push(
        missingRef(
          `presentations/${id}`,
          'relatedProject',
          pres.relatedProject,
          'project',
        ),
      );
    }
  }

  // Software → projects + publications
  for (const [id, sw] of data.software) {
    const src = `software/${id}`;
    for (const projId of sw.relatedProjects ?? []) {
      if (!projectIds.has(projId)) {
        issues.push(missingRef(src, 'relatedProjects', projId, 'project'));
      }
    }
    for (const pubId of sw.relatedPublications ?? []) {
      if (!publicationIds.has(pubId)) {
        issues.push(missingRef(src, 'relatedPublications', pubId, 'publication'));
      }
    }
  }

  // Exhibits → project (required field)
  for (const [id, exhibit] of data.exhibits) {
    if (!projectIds.has(exhibit.researchProject)) {
      issues.push(
        missingRef(
          `exhibits/${id}`,
          'researchProject',
          exhibit.researchProject,
          'project',
        ),
      );
    }
  }

  return issues;
}

// ------------------------------------------------------------------ //
// Backlink checks                                                     //
// ------------------------------------------------------------------ //

/**
 * Verifies project ↔ exhibit backlinks.
 * If a project declares `relatedExhibit`, the exhibit's `researchProject`
 * must point back to that project.
 */
export function checkBacklinks(data: CollectionData): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];

  for (const [projectId, project] of data.projects) {
    const exhibitId = project.relatedExhibit;
    if (exhibitId === undefined) continue;

    const exhibit = data.exhibits.get(exhibitId);
    if (exhibit === undefined) continue; // already caught by checkRelationships

    if (exhibit.researchProject !== projectId) {
      issues.push({
        kind: 'backlink-mismatch',
        source: `projects/${projectId}`,
        field: 'relatedExhibit',
        message:
          `project "${projectId}" declares relatedExhibit "${exhibitId}", ` +
          `but that exhibit's researchProject is "${exhibit.researchProject}"`,
      });
    }
  }

  return issues;
}

// ------------------------------------------------------------------ //
// Visibility safety checks                                            //
// ------------------------------------------------------------------ //

/**
 * Checks high-value visibility mistakes:
 * - a visible exhibit must have status 'available'
 * - no public record may contain a file:/// URL
 */
export function checkVisibilitySafety(data: CollectionData): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];

  // Visible exhibits must be available
  for (const [id, exhibit] of data.exhibits) {
    if (exhibit.visible && exhibit.status !== 'available') {
      issues.push({
        kind: 'visibility-safety',
        source: `exhibits/${id}`,
        field: 'visible',
        message: `exhibit is visible but status is "${exhibit.status}" (must be "available")`,
      });
    }
  }

  // No public record may contain a local filesystem URL
  const publicCollections: [string, Map<string, { visibility: string }>][] = [
    ['projects', data.projects as Map<string, { visibility: string }>],
    ['publications', data.publications as Map<string, { visibility: string }>],
    ['presentations', data.presentations as Map<string, { visibility: string }>],
    ['software', data.software as Map<string, { visibility: string }>],
  ];

  for (const [collection, records] of publicCollections) {
    for (const [id, record] of records) {
      if (record.visibility === 'public' && containsLocalUrl(record)) {
        issues.push({
          kind: 'unsafe-url',
          source: `${collection}/${id}`,
          field: '(url field)',
          message: `public record contains a local file:/// URL`,
        });
      }
    }
  }

  return issues;
}

// ------------------------------------------------------------------ //
// Combined runner                                                     //
// ------------------------------------------------------------------ //

/**
 * Runs all integrity checks and returns the combined issue list.
 * Empty collections produce zero issues.
 */
export function runAllChecks(
  data: CollectionData,
  idsByCollection: Record<string, string[]>,
): IntegrityIssue[] {
  return [
    ...checkDuplicateIds(idsByCollection),
    ...checkRelationships(data),
    ...checkBacklinks(data),
    ...checkVisibilitySafety(data),
  ];
}
