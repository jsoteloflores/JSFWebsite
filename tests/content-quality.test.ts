/**
 * Content quality tests for Ticket 004 profile and collection entries.
 *
 * These tests verify the profile object and Markdown content files for
 * common quality and integrity issues. They do NOT duplicate the full
 * schema validation performed by npm run content:validate.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { profile } from '../src/data/profile';

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, 'src', 'content');
const PUBLIC_CONTENT_DIRS = [
  join(CONTENT_DIR, 'projects'),
  join(CONTENT_DIR, 'publications'),
  join(CONTENT_DIR, 'presentations'),
  join(CONTENT_DIR, 'software'),
  join(CONTENT_DIR, 'exhibits'),
];

// ------------------------------------------------------------------ //
// Profile object                                                      //
// ------------------------------------------------------------------ //

describe('profile', () => {
  it('has a non-empty fullName', () => {
    expect(profile.fullName.trim().length).toBeGreaterThan(0);
  });

  it('has a non-empty institution', () => {
    expect(profile.institution.trim().length).toBeGreaterThan(0);
  });

  it('has at least one degree', () => {
    expect(profile.degrees.length).toBeGreaterThan(0);
    for (const d of profile.degrees) {
      expect(d.trim().length).toBeGreaterThan(0);
    }
  });

  it('academicEmail looks like an email', () => {
    expect(profile.academicEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('githubUrl is a valid HTTPS URL', () => {
    expect(profile.githubUrl).toMatch(/^https:\/\//);
  });

  it('linkedInUrl is a valid HTTPS URL', () => {
    expect(profile.linkedInUrl).toMatch(/^https:\/\//);
  });

  it('has at least one research interest', () => {
    expect(profile.researchInterests.length).toBeGreaterThan(0);
    for (const interest of profile.researchInterests) {
      expect(interest.trim().length).toBeGreaterThan(0);
    }
  });

  it('has a non-empty academic stage', () => {
    expect(profile.currentAcademicStage.trim().length).toBeGreaterThan(0);
  });

  it('displayName is a non-empty string', () => {
    expect(profile.displayName.trim().length).toBeGreaterThan(0);
  });

  it('displayName does not include the middle initial', () => {
    // The sitewide display name is "Joel Sotelo Flores" (no middle initial).
    // The full legal name with initial is reserved for citation author entries.
    expect(profile.displayName).not.toContain(' A. ');
  });

  it('location is a non-empty string', () => {
    expect(profile.location.trim().length).toBeGreaterThan(0);
  });

  it('does not contain a cvPath field', () => {
    // CV path omitted pending updates to manuscript titles and DOIs (Q3).
    expect('cvPath' in profile).toBe(false);
  });
});

// ------------------------------------------------------------------ //
// Content file quality                                                //
// ------------------------------------------------------------------ //

function collectMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectMarkdownFiles(full));
    } else if (extname(entry) === '.md' && entry !== '.gitkeep') {
      files.push(full);
    }
  }
  return files;
}

const PLACEHOLDER_PATTERNS = [/\bTODO\b/i, /\bTBD\b/i, /\bPLACEHOLDER\b/i];
const FORBIDDEN_TITLE_SUFFIXES = /\b(final2|new-final|use-this|v2|draft)\b/i;
const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const allMarkdownFiles = PUBLIC_CONTENT_DIRS.flatMap((dir) =>
  collectMarkdownFiles(dir),
);

describe('content file quality', () => {
  it('collects at least one Markdown file', () => {
    // After Ticket 004 there should be 7 entries (6 projects + 1 publication).
    expect(allMarkdownFiles.length).toBeGreaterThanOrEqual(7);
  });

  it('no content file contains placeholder markers', () => {
    for (const filePath of allMarkdownFiles) {
      const content = readFileSync(filePath, 'utf-8');
      for (const pattern of PLACEHOLDER_PATTERNS) {
        expect(pattern.test(content), `Placeholder marker found in ${filePath}`).toBe(
          false,
        );
      }
    }
  });

  it('no content filename contains forbidden working-status suffixes', () => {
    for (const filePath of allMarkdownFiles) {
      const name = filePath.split('/').pop()?.replace(/\.md$/, '') ?? '';
      expect(
        FORBIDDEN_TITLE_SUFFIXES.test(name),
        `Forbidden suffix in filename: ${name}`,
      ).toBe(false);
    }
  });

  it('all content IDs follow the lowercase kebab-case naming policy', () => {
    for (const filePath of allMarkdownFiles) {
      const name = filePath.split('/').pop()?.replace(/\.md$/, '') ?? '';
      expect(
        ID_PATTERN.test(name),
        `ID "${name}" does not match lowercase kebab-case policy`,
      ).toBe(true);
    }
  });
});
