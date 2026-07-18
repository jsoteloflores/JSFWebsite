/**
 * Server-side content query utilities.
 *
 * These functions are Astro-context only — they use getCollection from
 * 'astro:content' and must not be imported in test files.
 *
 * Filtering and sorting logic lives in content-filter.ts, which is importable
 * in tests without the Astro build context.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import {
  filterPublic,
  filterFeaturedPublic,
  filterVisibleAvailableExhibits,
  sortBySortOrderAsc,
  sortByDateDesc,
  sortByYearDesc,
} from './content-filter';

// ------------------------------------------------------------------ //
// Projects                                                            //
// ------------------------------------------------------------------ //

/** Returns all projects with visibility === 'public', sorted by sortOrder. */
export async function getPublicProjects(): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects');
  return sortBySortOrderAsc(filterPublic(all));
}

/** Returns all featured public projects, sorted by sortOrder. */
export async function getFeaturedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects');
  return sortBySortOrderAsc(filterFeaturedPublic(all));
}

// ------------------------------------------------------------------ //
// Publications                                                        //
// ------------------------------------------------------------------ //

/** Returns all publications with visibility === 'public', sorted by year descending. */
export async function getPublicPublications(): Promise<
  CollectionEntry<'publications'>[]
> {
  const all = await getCollection('publications');
  return sortByYearDesc(filterPublic(all));
}

// ------------------------------------------------------------------ //
// Presentations                                                       //
// ------------------------------------------------------------------ //

/** Returns all presentations with visibility === 'public', sorted by date descending. */
export async function getPublicPresentations(): Promise<
  CollectionEntry<'presentations'>[]
> {
  const all = await getCollection('presentations');
  return sortByDateDesc(filterPublic(all));
}

// ------------------------------------------------------------------ //
// Software                                                            //
// ------------------------------------------------------------------ //

/** Returns all software entries with visibility === 'public', sorted by sortOrder. */
export async function getPublicSoftware(): Promise<CollectionEntry<'software'>[]> {
  const all = await getCollection('software');
  return sortBySortOrderAsc(filterPublic(all));
}

// ------------------------------------------------------------------ //
// Exhibits                                                            //
// ------------------------------------------------------------------ //

/** Returns exhibits that are both visible and have status === 'available'. */
export async function getVisibleExhibits(): Promise<CollectionEntry<'exhibits'>[]> {
  const all = await getCollection('exhibits');
  return sortBySortOrderAsc(filterVisibleAvailableExhibits(all));
}
