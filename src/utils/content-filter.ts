/**
 * Pure filtering and sorting helpers for content query functions.
 *
 * These functions contain the filtering and sorting logic used by
 * src/utils/content-queries.ts, extracted so they can be imported and
 * tested in Vitest without the astro:content build context.
 *
 * Do not import 'astro:content' from this module.
 */

import type { Visibility } from '../types/content';

// ------------------------------------------------------------------ //
// Generic constraints                                                 //
// ------------------------------------------------------------------ //

export interface WithVisibility {
  data: { visibility: Visibility; featured: boolean; sortOrder?: number | undefined };
}

export interface WithDateAndSort {
  data: { sortDate?: string | undefined; date: string };
}

export interface WithYearAndSort {
  data: { year: number; sortDate?: string | undefined };
}

export interface WithExhibitData {
  data: {
    visible: boolean;
    status: 'available' | 'unavailable';
    sortOrder?: number | undefined;
  };
}

// exactOptionalPropertyTypes (from astro/tsconfigs/strictest) requires the
// explicit undefined union so Zod-inferred optional types are assignable.
export interface WithSortOrder {
  data: { sortOrder?: number | undefined };
}

// ------------------------------------------------------------------ //
// Visibility filters                                                  //
// ------------------------------------------------------------------ //

/** Returns entries with visibility === 'public'. */
export function filterPublic<T extends WithVisibility>(entries: T[]): T[] {
  return entries.filter((e) => e.data.visibility === 'public');
}

/** Returns entries that are both public AND featured. */
export function filterFeaturedPublic<T extends WithVisibility>(entries: T[]): T[] {
  return entries.filter(
    (e) => e.data.visibility === 'public' && e.data.featured === true,
  );
}

/** Returns exhibits with visible === true AND status === 'available'. */
export function filterVisibleAvailableExhibits<T extends WithExhibitData>(
  entries: T[],
): T[] {
  return entries.filter(
    (e) => e.data.visible === true && e.data.status === 'available',
  );
}

// ------------------------------------------------------------------ //
// Sort helpers                                                        //
// ------------------------------------------------------------------ //

/** Sorts entries ascending by sortOrder; entries without sortOrder go last. */
export function sortBySortOrderAsc<T extends WithSortOrder>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) => (a.data.sortOrder ?? Infinity) - (b.data.sortOrder ?? Infinity),
  );
}

/** Sorts entries descending by date (ISO string). Uses sortDate when present. */
export function sortByDateDesc<T extends WithDateAndSort>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const aDate = a.data.sortDate ?? a.data.date;
    const bDate = b.data.sortDate ?? b.data.date;
    return bDate.localeCompare(aDate);
  });
}

/** Sorts entries descending by year. Uses sortDate when present. */
export function sortByYearDesc<T extends WithYearAndSort>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const aDate = a.data.sortDate ?? String(a.data.year);
    const bDate = b.data.sortDate ?? String(b.data.year);
    return bDate.localeCompare(aDate);
  });
}
