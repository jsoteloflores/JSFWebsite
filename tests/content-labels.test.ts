import { describe, it, expect } from 'vitest';
import {
  PROJECT_STATUSES,
  PUBLICATION_STATUSES,
  PUBLICATION_TYPES,
  PRESENTATION_TYPES,
  SOFTWARE_STATUSES,
  EXHIBIT_STATUSES,
  VISIBILITY_VALUES,
} from '../src/types/content';
import {
  PROJECT_STATUS_LABELS,
  PUBLICATION_STATUS_LABELS,
  PUBLICATION_TYPE_LABELS,
  PRESENTATION_TYPE_LABELS,
  SOFTWARE_STATUS_LABELS,
  EXHIBIT_STATUS_LABELS,
  getLabel,
  type LabelableStatus,
} from '../src/utils/content-labels';

// ------------------------------------------------------------------ //
// Exhaustiveness                                                      //
// ------------------------------------------------------------------ //

describe('content-labels exhaustiveness', () => {
  it('every project status has a label', () => {
    for (const s of PROJECT_STATUSES) {
      expect(
        PROJECT_STATUS_LABELS[s],
        `Missing label for project status: ${s}`,
      ).toBeTruthy();
    }
  });

  it('every publication status has a label', () => {
    for (const s of PUBLICATION_STATUSES) {
      expect(
        PUBLICATION_STATUS_LABELS[s],
        `Missing label for publication status: ${s}`,
      ).toBeTruthy();
    }
  });

  it('every publication type has a label', () => {
    for (const t of PUBLICATION_TYPES) {
      expect(
        PUBLICATION_TYPE_LABELS[t],
        `Missing label for publication type: ${t}`,
      ).toBeTruthy();
    }
  });

  it('every presentation type has a label', () => {
    for (const t of PRESENTATION_TYPES) {
      expect(
        PRESENTATION_TYPE_LABELS[t],
        `Missing label for presentation type: ${t}`,
      ).toBeTruthy();
    }
  });

  it('every software status has a label', () => {
    for (const s of SOFTWARE_STATUSES) {
      expect(
        SOFTWARE_STATUS_LABELS[s],
        `Missing label for software status: ${s}`,
      ).toBeTruthy();
    }
  });

  it('every exhibit status has a label', () => {
    for (const s of EXHIBIT_STATUSES) {
      expect(
        EXHIBIT_STATUS_LABELS[s],
        `Missing label for exhibit status: ${s}`,
      ).toBeTruthy();
    }
  });
});

// ------------------------------------------------------------------ //
// Human-readable values                                               //
// ------------------------------------------------------------------ //

describe('content-labels human-readable values', () => {
  it('publication status labels are not raw machine values', () => {
    for (const [raw, label] of Object.entries(PUBLICATION_STATUS_LABELS)) {
      expect(label, `Label for ${raw} looks like a raw machine value`).not.toBe(raw);
    }
  });

  it('in-preparation renders as "In preparation"', () => {
    expect(getLabel('in-preparation')).toBe('In preparation');
  });

  it('in-review renders as "In review"', () => {
    expect(getLabel('in-review')).toBe('In review');
  });

  it('oral-presentation renders as "Oral presentation"', () => {
    expect(getLabel('oral-presentation')).toBe('Oral presentation');
  });

  it('journal-article renders as "Journal article"', () => {
    expect(getLabel('journal-article')).toBe('Journal article');
  });

  it('unavailable renders as "Unavailable"', () => {
    expect(getLabel('unavailable')).toBe('Unavailable');
  });
});

// ------------------------------------------------------------------ //
// getLabel safety                                                     //
// ------------------------------------------------------------------ //

describe('getLabel', () => {
  it('returns a non-empty string for all labelable statuses', () => {
    const all: LabelableStatus[] = [
      ...PROJECT_STATUSES,
      ...PUBLICATION_STATUSES,
      ...PUBLICATION_TYPES,
      ...PRESENTATION_TYPES,
      ...SOFTWARE_STATUSES,
      ...EXHIBIT_STATUSES,
    ];
    for (const val of all) {
      const label = getLabel(val);
      expect(typeof label).toBe('string');
      expect(label.length).toBeGreaterThan(0);
    }
  });

  it('throws for unregistered values', () => {
    expect(() => getLabel('totally-unknown' as LabelableStatus)).toThrow();
  });

  it('vocabulary arrays and labels remain in sync (same count)', () => {
    expect(Object.keys(PROJECT_STATUS_LABELS).length).toBe(PROJECT_STATUSES.length);
    expect(Object.keys(PUBLICATION_STATUS_LABELS).length).toBe(
      PUBLICATION_STATUSES.length,
    );
    expect(Object.keys(PUBLICATION_TYPE_LABELS).length).toBe(PUBLICATION_TYPES.length);
    expect(Object.keys(PRESENTATION_TYPE_LABELS).length).toBe(
      PRESENTATION_TYPES.length,
    );
    expect(Object.keys(SOFTWARE_STATUS_LABELS).length).toBe(SOFTWARE_STATUSES.length);
    expect(Object.keys(EXHIBIT_STATUS_LABELS).length).toBe(EXHIBIT_STATUSES.length);
    void VISIBILITY_VALUES; // used in exhaustiveness proof; not labeled externally
  });
});
