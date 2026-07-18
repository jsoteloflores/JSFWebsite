#!/usr/bin/env tsx
/**
 * Content integrity validation script.
 *
 * Discovers Markdown files in all five collection directories, parses
 * frontmatter, validates with shared Zod schemas, then runs cross-collection
 * relationship and safety checks via src/utils/content-integrity.ts.
 *
 * Usage:  npm run content:validate
 * Exit 0: all checks passed (including empty collections)
 * Exit 1: one or more validation errors found
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { ZodError } from 'zod';
import {
  projectSchema,
  publicationSchema,
  presentationSchema,
  softwareSchema,
  exhibitSchema,
} from '../src/types/content-schemas.js';
import { runAllChecks, type CollectionData } from '../src/utils/content-integrity.js';
import type {
  ProjectFrontmatter,
  PublicationFrontmatter,
  PresentationFrontmatter,
  SoftwareFrontmatter,
  ExhibitFrontmatter,
} from '../src/types/content-schemas.js';

// ------------------------------------------------------------------ //
// Paths                                                               //
// ------------------------------------------------------------------ //

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONTENT_DIR = join(ROOT, 'src', 'content');

const COLLECTION_DIRS = {
  projects: join(CONTENT_DIR, 'projects'),
  publications: join(CONTENT_DIR, 'publications'),
  presentations: join(CONTENT_DIR, 'presentations'),
  software: join(CONTENT_DIR, 'software'),
  exhibits: join(CONTENT_DIR, 'exhibits'),
} as const;

type CollectionName = keyof typeof COLLECTION_DIRS;

// ------------------------------------------------------------------ //
// File discovery                                                      //
// ------------------------------------------------------------------ //

function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...findMarkdownFiles(full));
    } else if (extname(entry) === '.md' && entry !== '.gitkeep') {
      files.push(full);
    }
  }
  return files;
}

function deriveId(filePath: string, baseDir: string): string {
  const rel = relative(baseDir, filePath);
  return rel.replace(/\.md$/, '').replace(/\\/g, '/');
}

// ------------------------------------------------------------------ //
// YAML date coercion                                                  //
// ------------------------------------------------------------------ //

/**
 * gray-matter/js-yaml auto-parses YYYY-MM-DD values as JS Date objects.
 * Our Zod schemas expect ISO strings. This function converts recursively.
 */
function coerceDates(value: unknown): unknown {
  if (value instanceof Date) {
    const iso = value.toISOString();
    // Return YYYY-MM-DD for date-only values (time is midnight UTC)
    return iso.slice(0, 10);
  }
  if (Array.isArray(value)) return value.map(coerceDates);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        coerceDates(v),
      ]),
    );
  }
  return value;
}

// ------------------------------------------------------------------ //
// Error reporting                                                     //
// ------------------------------------------------------------------ //

let errorCount = 0;

function reportError(prefix: string, message: string): void {
  console.error(`[content] ${prefix}:\n  ${message}\n`);
  errorCount++;
}

function reportZodError(source: string, err: ZodError): void {
  const lines = err.issues
    .map((e) => `  ${e.path.join('.')} — ${e.message}`)
    .join('\n');
  console.error(`[content] ${source}: schema validation failed\n${lines}\n`);
  errorCount++;
}

// ------------------------------------------------------------------ //
// Main                                                                //
// ------------------------------------------------------------------ //

const collections: CollectionData = {
  projects: new Map<string, ProjectFrontmatter>(),
  publications: new Map<string, PublicationFrontmatter>(),
  presentations: new Map<string, PresentationFrontmatter>(),
  software: new Map<string, SoftwareFrontmatter>(),
  exhibits: new Map<string, ExhibitFrontmatter>(),
};

const idsByCollection: Record<string, string[]> = {
  projects: [],
  publications: [],
  presentations: [],
  software: [],
  exhibits: [],
};

// Validate schemas for each collection
const schemas: Record<
  CollectionName,
  {
    safeParse: (
      data: unknown,
    ) => { success: true; data: unknown } | { success: false; error: ZodError };
  }
> = {
  projects: projectSchema,
  publications: publicationSchema,
  presentations: presentationSchema,
  software: softwareSchema,
  exhibits: exhibitSchema,
};

console.log('[content] Validating content collections…\n');

for (const [collection, dir] of Object.entries(COLLECTION_DIRS) as [
  CollectionName,
  string,
][]) {
  const files = findMarkdownFiles(dir);

  for (const filePath of files) {
    const id = deriveId(filePath, dir);
    const source = `${collection}/${id}`;

    idsByCollection[collection]?.push(id);

    let raw: string;
    try {
      raw = readFileSync(filePath, 'utf-8');
    } catch (e) {
      reportError(source, `could not read file: ${String(e)}`);
      continue;
    }

    const { data: frontmatter } = matter(raw);
    const coerced = coerceDates(frontmatter);
    const result = schemas[collection].safeParse(coerced);

    if (!result.success) {
      reportZodError(source, result.error as ZodError);
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (collections[collection] as Map<string, any>).set(id, result.data);
  }
}

// Run cross-collection integrity checks
const issues = runAllChecks(collections, idsByCollection);

for (const issue of issues) {
  reportError(`${issue.source}`, `${issue.field} ${issue.message}`);
}

// Summary
if (errorCount === 0) {
  console.log('[content] All content collections passed validation.\n');
  process.exit(0);
} else {
  console.error(`[content] ${errorCount} error(s) found. Fix before proceeding.\n`);
  process.exit(1);
}
