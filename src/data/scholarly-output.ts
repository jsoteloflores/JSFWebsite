/**
 * Shared scholarly output data for Joel Sotelo Flores.
 *
 * This module contains manuscripts, presentations, abstracts, and software
 * that are active or completed but not yet part of content collections.
 *
 * These records are consumed by:
 * - /cv
 * - /publications
 * - /presentations
 * - /software
 *
 * Primary authoritative source:
 * public/cv/Joel_Sotelo_Flores_CV.pdf
 *
 * Status progression:
 * - Manuscripts: in-preparation → in-review → published collection
 * - Abstracts: submitted → completed presentation
 * - Software: research software → public repository/release
 *
 * Published peer-reviewed publications remain in the publications collection.
 */

// ------------------------------------------------------------------ //
// Types                                                              //
// ------------------------------------------------------------------ //

export type ManuscriptStatus = 'in-review' | 'in-preparation';

export interface ScholarlyManuscript {
  /** Full citation-style title */
  title: string;
  /** Author list in citation order */
  authors: string[];
  /** Planned or target journal */
  targetJournal: string;
  /** Publication status */
  status: ManuscriptStatus;
  /** Optional project ID if corresponding project exists */
  projectId?: string;
}

export interface ResearchSoftware {
  /** Software name */
  name: string;
  /** Brief description */
  description: string;
  /** Optional project ID if corresponding project exists */
  projectId?: string;
}

export type PresentationType = 'poster' | 'oral';

export interface ScholarlyPresentation {
  /** Presentation title */
  title: string;
  /** Author list */
  authors: string[];
  /** Conference or venue name */
  venue: string;
  /** Location (city, state/country) */
  location: string;
  /** Date (YYYY-MM format) */
  date: string;
  /** Presentation type */
  type: PresentationType;
  /** Optional project ID if corresponding project exists */
  projectId?: string;
}

export interface SubmittedConferenceAbstract {
  /** Abstract title */
  title: string;
  /** Author list */
  authors: string[];
  /** Conference name */
  conference: string;
  /** Submission date or expected presentation date */
  date: string;
  /** Optional project ID if corresponding project exists */
  projectId?: string;
}

// ------------------------------------------------------------------ //
// Manuscripts Under Review                                           //
// ------------------------------------------------------------------ //

export const manuscriptsUnderReview: ScholarlyManuscript[] = [
  {
    title: 'BViz Photometric Distance to the RR Lyrae Star V0499 Centauri',
    authors: ['Sukow, D. W.', 'Sotelo Flores, J.', 'Nagy, J.', 'Freed, R.'],
    targetJournal: 'Journal of the American Association of Variable Star Observers',
    status: 'in-review',
    projectId: 'v0499-centauri-photometry',
  },
];

// ------------------------------------------------------------------ //
// Manuscripts in Preparation                                         //
// ------------------------------------------------------------------ //

export const manuscriptsInPreparation: ScholarlyManuscript[] = [
  {
    title:
      'PyRo-FOAMS: An open-source workflow for automated vesicle segmentation and stereological analysis',
    authors: ['Sotelo Flores, J.', 'Barber, N. D.'],
    targetJournal: 'Volcanica',
    status: 'in-preparation',
    projectId: 'ijen-pyroclast-microct-analysis',
  },
  {
    title:
      'Computer Vision Segmentation of Kīlauea Lava Fountain Video for Physical Eruption Parameter Extraction',
    authors: [
      'Sotelo Flores, J.',
      'Gauer Pasqualon, N.',
      'Patrick, M. R.',
      'Anderson, K.',
      'Tisdale, C. M.',
      'Forshaw, R. E. L.',
      'Houghton, B. F.',
      'Llewellin, E. W.',
      'Santos, I.',
    ],
    targetJournal: 'Journal of Applied Volcanology',
    status: 'in-preparation',
    projectId: 'kilauea-lava-fountain-computer-vision',
  },
];

// ------------------------------------------------------------------ //
// Research Software                                                  //
// ------------------------------------------------------------------ //

export const researchSoftware: ResearchSoftware[] = [
  {
    name: 'PyRo-FOAMS',
    description:
      "Python workflow for vesicle segmentation and stereological analysis, built as an evolution of Shea et al.'s FOAMS (2010) work.",
    projectId: 'ijen-pyroclast-microct-analysis',
  },
  {
    name: 'Kīlauea Lava Fountain Segmentation and Labeling Pipeline',
    description:
      'Computer-vision and labeling workflow for segmentation and quantitative analysis of Kīlauea lava-fountain video.',
    projectId: 'kilauea-lava-fountain-computer-vision',
  },
];

// ------------------------------------------------------------------ //
// Completed Presentations                                            //
// ------------------------------------------------------------------ //

export const completedPresentations: ScholarlyPresentation[] = [
  {
    title:
      'Textural and Chemical Reconstructions of the 1817 Kawah Ijen Eruption: 3D Deep Learning Segmentation and Chemical Depictions of Pyroclasts',
    authors: [
      'Sotelo Flores, J.',
      'Barber, N. D.',
      'Berlo, K.',
      'Handini, E.',
      'Buono, G.',
      'Pappalardo, L.',
      'van Hinsberg, V.',
    ],
    venue: 'American Geophysical Union Fall Meeting',
    location: 'San Francisco, CA',
    date: '2025-12',
    type: 'poster',
    projectId: 'ijen-pyroclast-microct-analysis',
  },
  {
    title:
      'A field-based and 2D/3D stereological analysis of pyroclasts from the Ijen Caldera Complex: new insights into eruptive history and processes.',
    authors: [
      'Barber, N. D.',
      'Sotelo Flores, J.',
      'Surya, G. P.',
      'Handini, E.',
      'Berlo, K.',
      'van Hinsberg, V.',
      'Buono, G.',
      'Pappalardo, L.',
      'Ratdomopurbo, A.',
      'Ayuningtyas, T. R.',
    ],
    venue: 'Palais des congrès de Montréal',
    location: 'Montréal, Canada',
    date: '2026-06',
    type: 'oral',
    projectId: 'ijen-pyroclast-microct-analysis',
  },
];

// ------------------------------------------------------------------ //
// Submitted Conference Abstracts                                     //
// ------------------------------------------------------------------ //

export const submittedConferenceAbstracts: SubmittedConferenceAbstract[] = [
  {
    title:
      'Computer Vision Segmentation of Kīlauea Lava Fountain Video for Physical Eruption Parameter Extraction',
    authors: [
      'Sotelo Flores, J.',
      'Gauer Pasqualon, N.',
      'Patrick, M. R.',
      'Anderson, K.',
      'Tisdale, C. M.',
      'Forshaw, R. E. L.',
      'Houghton, B. F.',
      'Llewellin, E. W.',
      'Santos, I.',
    ],
    conference: 'American Geophysical Union Fall Meeting',
    date: '2026-12',
    projectId: 'kilauea-lava-fountain-computer-vision',
  },
  {
    title:
      'Deep Learning Segmentation and Pore-Network Characterization of Pyroclastic Micro-CT Volumes',
    authors: ['Sotelo Flores, J.', 'Barber, N. D.', 'Handini, E.', 'Berlo, K.'],
    conference: 'American Geophysical Union Fall Meeting',
    date: '2026-12',
    projectId: 'ijen-pyroclast-microct-analysis',
  },
];
