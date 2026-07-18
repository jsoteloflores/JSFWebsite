/**
 * Server-side content query utilities.
 *
 * These functions are Astro-context only — they use getCollection from
 * 'astro:content' and must not be imported in test files.
 *
 * All filtering is done server-side at build time. No client state.
 */

import { getCollection, type CollectionEntry } from 'astro:content';

// ------------------------------------------------------------------ //
// Projects                                                            //
// ------------------------------------------------------------------ //

/** Returns all projects with visibility === 'public', sorted by sortOrder. */
export async function getPublicProjects(): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects');
  return sortBySortOrder(all.filter((e) => e.data.visibility === 'public'));
}

/** Returns all featured public projects, sorted by sortOrder. */
export async function getFeaturedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects');
  return sortBySortOrder(
    all.filter((e) => e.data.visibility === 'public' && e.data.featured === true),
  );
}

// ------------------------------------------------------------------ //
// Publications                                                        //
// ------------------------------------------------------------------ //

/** Returns all publications with visibility === 'public', sorted by year descending. */
export async function getPublicPublications(): Promise<
  CollectionEntry<'publications'>[]
> {
  const all = await getCollection('publications');
  const visible = all.filter((e) => e.data.visibility === 'public');
  return visible.sort((a, b) => {
    const aDate = a.data.sortDate ?? String(a.data.year);
    const bDate = b.data.sortDate ?? String(b.data.year);
    return bDate.localeCompare(aDate);
  });
}

// ------------------------------------------------------------------ //
// Presentations                                                       //
// ------------------------------------------------------------------ //

/** Returns all presentations with visibility === 'public', sorted by date descending. */
export async function getPublicPresentations(): Promise<
  CollectionEntry<'presentations'>[]
> {
  const all = await getCollection('presentations');
  const visible = all.filter((e) => e.data.visibility === 'public');
  return visible.sort((a, b) => {
    const aDate = a.data.sortDate ?? a.data.date;
    const bDate = b.data.sortDate ?? b.data.date;
    return bDate.localeCompare(aDate);
  });
}

// ------------------------------------------------------------------ //
// Software                                                            //
// ------------------------------------------------------------------ //

/** Returns all software entries with visibility === 'public', sorted by sortOrder. */
export async function getPublicSoftware(): Promise<CollectionEntry<'software'>[]> {
  const all = await getCollection('software');
  return sortBySortOrder(all.filter((e) => e.data.visibility === 'public'));
}

// ------------------------------------------------------------------ //
// Exhibits                                                            //
// ------------------------------------------------------------------ //

/** Returns exhibits that are both visible and have status === 'available'. */
export async function getVisibleExhibits(): Promise<CollectionEntry<'exhibits'>[]> {
  const all = await getCollection('exhibits');
  return sortBySortOrder(
    all.filter((e) => e.data.visible === true && e.data.status === 'available'),
  );
}

// ------------------------------------------------------------------ //
// Shared helpers                                                      //
// ------------------------------------------------------------------ //

// exactOptionalPropertyTypes (enabled in astro/tsconfigs/strictest) requires
// the undefined union to be explicit so Zod-inferred optional types are
// assignable to this constraint.
type WithSortOrder = {
  data: { sortOrder?: number | undefined };
};

function sortBySortOrder<T extends WithSortOrder>(entries: T[]): T[] {
  return entries.sort((a, b) => {
    const aOrder = a.data.sortOrder ?? Infinity;
    const bOrder = b.data.sortOrder ?? Infinity;
    return aOrder - bOrder;
  });
}
