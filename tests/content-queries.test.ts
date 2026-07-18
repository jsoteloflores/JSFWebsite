import { describe, it, expect } from 'vitest';
import {
  filterPublic,
  filterFeaturedPublic,
  filterVisibleAvailableExhibits,
  sortBySortOrderAsc,
  sortByDateDesc,
  sortByYearDesc,
} from '../src/utils/content-filter';

// ------------------------------------------------------------------ //
// Visibility filtering                                                //
// ------------------------------------------------------------------ //

const makeEntry = (
  visibility: 'public' | 'private' | 'embargoed',
  featured = false,
  sortOrder?: number,
) => ({
  data: { visibility, featured, sortOrder },
});

describe('filterPublic', () => {
  it('includes only public entries', () => {
    const entries = [
      makeEntry('public'),
      makeEntry('private'),
      makeEntry('embargoed'),
      makeEntry('public', true),
    ];
    const result = filterPublic(entries);
    expect(result).toHaveLength(2);
    for (const e of result) {
      expect(e.data.visibility).toBe('public');
    }
  });

  it('returns empty array when no public entries', () => {
    expect(filterPublic([makeEntry('private'), makeEntry('embargoed')])).toHaveLength(
      0,
    );
  });
});

describe('filterFeaturedPublic', () => {
  it('requires both public AND featured', () => {
    const entries = [
      makeEntry('public', true), // included
      makeEntry('public', false), // excluded (not featured)
      makeEntry('private', true), // excluded (not public)
    ];
    const result = filterFeaturedPublic(entries);
    expect(result).toHaveLength(1);
    expect(result[0]?.data.visibility).toBe('public');
    expect(result[0]?.data.featured).toBe(true);
  });
});

// ------------------------------------------------------------------ //
// Exhibit filtering                                                   //
// ------------------------------------------------------------------ //

const makeExhibit = (
  visible: boolean,
  status: 'available' | 'unavailable',
  sortOrder?: number,
) => ({
  data: { visible, status, sortOrder },
});

describe('filterVisibleAvailableExhibits', () => {
  it('requires both visible AND available', () => {
    const entries = [
      makeExhibit(true, 'available'), // included
      makeExhibit(false, 'available'), // excluded
      makeExhibit(true, 'unavailable'), // excluded
      makeExhibit(false, 'unavailable'), // excluded
    ];
    expect(filterVisibleAvailableExhibits(entries)).toHaveLength(1);
  });
});

// ------------------------------------------------------------------ //
// sortOrder sorting                                                   //
// ------------------------------------------------------------------ //

describe('sortBySortOrderAsc', () => {
  it('places lower sortOrder values first', () => {
    const entries = [
      makeEntry('public', false, 3),
      makeEntry('public', false, 1),
      makeEntry('public', false, 2),
    ];
    const sorted = sortBySortOrderAsc(entries);
    expect(sorted.map((e) => e.data.sortOrder)).toStrictEqual([1, 2, 3]);
  });

  it('entries with no sortOrder go to the end', () => {
    const entries = [
      makeEntry('public', false, undefined),
      makeEntry('public', false, 1),
    ];
    const sorted = sortBySortOrderAsc(entries);
    expect(sorted[0]?.data.sortOrder).toBe(1);
    expect(sorted[1]?.data.sortOrder).toBeUndefined();
  });

  it('does not crash with all undefined sortOrder', () => {
    const entries = [makeEntry('public'), makeEntry('public')];
    expect(() => sortBySortOrderAsc(entries)).not.toThrow();
  });
});

// ------------------------------------------------------------------ //
// Date sorting                                                        //
// ------------------------------------------------------------------ //

describe('sortByDateDesc', () => {
  it('places newest date first', () => {
    const entries = [
      { data: { date: '2023-06-15', sortDate: undefined } },
      { data: { date: '2025-12-09', sortDate: undefined } },
      { data: { date: '2024-03-01', sortDate: undefined } },
    ];
    const sorted = sortByDateDesc(entries);
    expect(sorted[0]?.data.date).toBe('2025-12-09');
    expect(sorted[2]?.data.date).toBe('2023-06-15');
  });

  it('uses sortDate when provided', () => {
    const entries = [
      { data: { date: '2020-01-01', sortDate: '2025-01-01' } }, // pinned forward
      { data: { date: '2024-06-01', sortDate: undefined } },
    ];
    const sorted = sortByDateDesc(entries);
    expect(sorted[0]?.data.sortDate).toBe('2025-01-01');
  });
});

describe('sortByYearDesc', () => {
  it('places newest year first', () => {
    const entries = [
      { data: { year: 2022, sortDate: undefined } },
      { data: { year: 2025, sortDate: undefined } },
      { data: { year: 2019, sortDate: undefined } },
    ];
    const sorted = sortByYearDesc(entries);
    expect(sorted[0]?.data.year).toBe(2025);
    expect(sorted[2]?.data.year).toBe(2019);
  });
});
