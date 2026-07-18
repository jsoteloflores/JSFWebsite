/**
 * Controlled vocabularies for all portfolio content collections.
 *
 * These arrays are the single source of truth for status enums.
 * They are imported by Zod schemas, future UI components, and tests.
 * Do not duplicate these values elsewhere.
 */

// ------------------------------------------------------------------ //
// Project                                                             //
// ------------------------------------------------------------------ //

export const PROJECT_STATUSES = [
  'active',
  'completed',
  'ongoing',
  'paused',
  'archived',
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

// ------------------------------------------------------------------ //
// Publication                                                         //
// ------------------------------------------------------------------ //

export const PUBLICATION_STATUSES = [
  'published',
  'accepted',
  'in-review',
  'submitted',
  'in-preparation',
] as const;

export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];

export const PUBLICATION_TYPES = [
  'journal-article',
  'conference-paper',
  'book-chapter',
  'preprint',
  'thesis',
] as const;

export type PublicationType = (typeof PUBLICATION_TYPES)[number];

// ------------------------------------------------------------------ //
// Presentation                                                        //
// ------------------------------------------------------------------ //

export const PRESENTATION_TYPES = [
  'oral-presentation',
  'poster',
  'lightning-talk',
  'invited-talk',
  'workshop',
] as const;

export type PresentationType = (typeof PRESENTATION_TYPES)[number];

// ------------------------------------------------------------------ //
// Software                                                            //
// ------------------------------------------------------------------ //

export const SOFTWARE_STATUSES = [
  'active',
  'stable',
  'experimental',
  'archived',
  'private',
] as const;

export type SoftwareStatus = (typeof SOFTWARE_STATUSES)[number];

// ------------------------------------------------------------------ //
// Exhibit                                                             //
// ------------------------------------------------------------------ //

export const EXHIBIT_STATUSES = ['available', 'unavailable'] as const;

export type ExhibitStatus = (typeof EXHIBIT_STATUSES)[number];

// ------------------------------------------------------------------ //
// Shared visibility                                                   //
// ------------------------------------------------------------------ //

export const VISIBILITY_VALUES = ['public', 'private', 'embargoed'] as const;

export type Visibility = (typeof VISIBILITY_VALUES)[number];
