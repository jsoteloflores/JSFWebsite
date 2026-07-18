/**
 * Human-readable display labels for all controlled vocabulary values.
 *
 * This is the single source of truth for UI-facing labels.
 * TypeScript enforces exhaustiveness — every enum value must have a label.
 * Components must use this module rather than rendering raw machine values.
 */

import type {
  ProjectStatus,
  PublicationStatus,
  PublicationType,
  PresentationType,
  SoftwareStatus,
  ExhibitStatus,
  Visibility,
} from '../types/content';
import {
  PROJECT_STATUSES,
  PUBLICATION_STATUSES,
  PUBLICATION_TYPES,
  PRESENTATION_TYPES,
  SOFTWARE_STATUSES,
  EXHIBIT_STATUSES,
  VISIBILITY_VALUES,
} from '../types/content';

// ------------------------------------------------------------------ //
// Exhaustive label maps                                               //
// ------------------------------------------------------------------ //

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  ongoing: 'Ongoing',
  paused: 'Paused',
  archived: 'Archived',
};

export const PUBLICATION_STATUS_LABELS: Record<PublicationStatus, string> = {
  published: 'Published',
  accepted: 'Accepted',
  'in-review': 'In review',
  submitted: 'Submitted',
  'in-preparation': 'In preparation',
};

export const PUBLICATION_TYPE_LABELS: Record<PublicationType, string> = {
  'journal-article': 'Journal article',
  'conference-paper': 'Conference paper',
  'book-chapter': 'Book chapter',
  preprint: 'Preprint',
  thesis: 'Thesis',
};

export const PRESENTATION_TYPE_LABELS: Record<PresentationType, string> = {
  'oral-presentation': 'Oral presentation',
  poster: 'Poster',
  'lightning-talk': 'Lightning talk',
  'invited-talk': 'Invited talk',
  workshop: 'Workshop',
};

export const SOFTWARE_STATUS_LABELS: Record<SoftwareStatus, string> = {
  active: 'Active',
  stable: 'Stable',
  experimental: 'Experimental',
  archived: 'Archived',
  private: 'Private',
};

export const EXHIBIT_STATUS_LABELS: Record<ExhibitStatus, string> = {
  available: 'Available',
  unavailable: 'Unavailable',
};

export const VISIBILITY_LABELS: Record<Visibility, string> = {
  public: 'Public',
  private: 'Private',
  embargoed: 'Embargoed',
};

// ------------------------------------------------------------------ //
// Union type for all labelable values                                 //
// ------------------------------------------------------------------ //

export type LabelableStatus =
  | ProjectStatus
  | PublicationStatus
  | PublicationType
  | PresentationType
  | SoftwareStatus
  | ExhibitStatus;

// Build a combined lookup map at module load time.
const ALL_LABELS: Record<string, string> = {
  ...PROJECT_STATUS_LABELS,
  ...PUBLICATION_STATUS_LABELS,
  ...PUBLICATION_TYPE_LABELS,
  ...PRESENTATION_TYPE_LABELS,
  ...SOFTWARE_STATUS_LABELS,
  ...EXHIBIT_STATUS_LABELS,
};

/**
 * Returns the human-readable label for a controlled vocabulary value.
 * Throws at runtime if a value is not registered (should never happen
 * in a type-checked codebase, but guards against stranded data).
 */
export function getLabel(value: LabelableStatus): string {
  const label = ALL_LABELS[value];
  if (label === undefined) {
    throw new Error(`No display label registered for value: "${value}"`);
  }
  return label;
}

// ------------------------------------------------------------------ //
// Compile-time exhaustiveness proof                                   //
// ------------------------------------------------------------------ //

// These assignments fail if a vocabulary value is added without a label.
const _projectCheck: Record<ProjectStatus, string> = PROJECT_STATUS_LABELS;
const _pubStatusCheck: Record<PublicationStatus, string> = PUBLICATION_STATUS_LABELS;
const _pubTypeCheck: Record<PublicationType, string> = PUBLICATION_TYPE_LABELS;
const _presCheck: Record<PresentationType, string> = PRESENTATION_TYPE_LABELS;
const _swCheck: Record<SoftwareStatus, string> = SOFTWARE_STATUS_LABELS;
const _exhibitCheck: Record<ExhibitStatus, string> = EXHIBIT_STATUS_LABELS;

// Silence unused-variable lint rules without affecting behavior.
void [
  _projectCheck,
  _pubStatusCheck,
  _pubTypeCheck,
  _presCheck,
  _swCheck,
  _exhibitCheck,
  PROJECT_STATUSES,
  PUBLICATION_STATUSES,
  PUBLICATION_TYPES,
  PRESENTATION_TYPES,
  SOFTWARE_STATUSES,
  EXHIBIT_STATUSES,
  VISIBILITY_VALUES,
];
