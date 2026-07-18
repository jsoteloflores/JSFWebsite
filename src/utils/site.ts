/**
 * Site-level utilities shared across pages.
 *
 * These are pure functions that do not import from astro:content.
 */

/** Returns the canonical URL path for a project detail page. */
export function projectUrl(id: string): string {
  return `/research/${id}`;
}
