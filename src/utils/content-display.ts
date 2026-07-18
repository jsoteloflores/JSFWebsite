/**
 * Pure formatting helpers for content component templates.
 *
 * These functions encode the rendering logic used by Astro components.
 * Keeping them here as pure TypeScript allows them to be imported directly
 * in Vitest tests without the Astro build context.
 *
 * Do not import 'astro:content' from this module.
 */

import type { Author, PublicationFrontmatter } from '../types/content-schemas';

// ------------------------------------------------------------------ //
// Author formatting                                                   //
// ------------------------------------------------------------------ //

export interface ProcessedAuthor {
  name: string;
  isJoel: boolean;
  /** Defined only when the caller requested affiliations. */
  affiliation: string | undefined;
}

/**
 * Returns the author list in input order, annotated for rendering.
 * The `isJoel` flag is taken from the data — never inferred from the name.
 * When `showAffiliations` is false, `affiliation` is always `undefined`.
 */
export function processAuthors(
  authors: Author[],
  showAffiliations: boolean = false,
): ProcessedAuthor[] {
  return authors.map((a) => ({
    name: a.name,
    isJoel: a.isJoel,
    affiliation: showAffiliations ? a.affiliation : undefined,
  }));
}

// ------------------------------------------------------------------ //
// Publication formatting                                              //
// ------------------------------------------------------------------ //

/**
 * Builds the venue line from whichever fields are present.
 * Returns an empty string when no venue metadata is available.
 * No blank punctuation is produced for missing fields.
 */
export function buildVenueLine(
  data: Pick<PublicationFrontmatter, 'journal' | 'volume' | 'issue' | 'pages'>,
): string {
  const parts: string[] = [];
  if (data.journal) parts.push(data.journal);
  if (data.volume) parts.push(`vol. ${data.volume}`);
  if (data.issue) parts.push(`no. ${data.issue}`);
  if (data.pages) parts.push(`pp. ${data.pages}`);
  return parts.join(', ');
}

/**
 * Returns the full DOI URL from a bare DOI string, or null when absent.
 * Input must be in bare form (10.xxxx/xxxxx), not a full URL.
 */
export function buildDoiUrl(doi: string | undefined): string | null {
  return doi ? `https://doi.org/${doi}` : null;
}

// ------------------------------------------------------------------ //
// Exhibit formatting                                                  //
// ------------------------------------------------------------------ //

/**
 * Returns descriptive link text for an exhibit.
 * Always names the destination rather than using a generic label.
 */
export function buildExhibitLinkText(title: string): string {
  return `Explore the ${title} exhibit`;
}
