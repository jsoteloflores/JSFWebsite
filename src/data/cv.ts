/**
 * CV-specific structured data for Joel Sotelo Flores.
 *
 * This module contains information that is genuinely CV-specific and not
 * already present in the site's typed content collections.
 *
 * Where a project or publication already exists in content collections,
 * reference its stable ID rather than duplicating facts.
 *
 * Data sources:
 * - Current CV (July 2026)
 * - Verified research experience records
 * - Manuscript metadata
 * - Award and training records
 *
 * Status values must reflect actual publication/submission state:
 * - "published" — peer-reviewed and available
 * - "under-review" — submitted and awaiting decision
 * - "in-preparation" — manuscript being written
 * - "submitted" — conference abstract submitted
 */

// ------------------------------------------------------------------ //
// Types                                                              //
// ------------------------------------------------------------------ //

export interface CvResearchExperience {
  /** Role title as shown on CV */
  roleTitle: string;
  /** Institution name */
  institution: string;
  /** Location (city, state/country) */
  location: string;
  /** Advisor name */
  advisor: string;
  /** Start date (YYYY-MM format) */
  startDate: string;
  /** End date (YYYY-MM format, null if ongoing) */
  endDate: string | null;
  /** Concise contribution bullets (2-4 items) */
  bullets: string[];
  /** Optional project ID if corresponding project exists in site */
  projectId?: string;
}

export interface CvManuscript {
  /** Full citation-style title */
  title: string;
  /** Author list in citation order */
  authors: string[];
  /** Planned or target journal */
  targetJournal: string;
  /** Publication status */
  status: 'in-review' | 'in-preparation';
  /** Optional project ID if corresponding project exists */
  projectId?: string;
}

export interface CvSoftware {
  /** Software name */
  name: string;
  /** Brief description */
  description: string;
  /** Optional project ID if corresponding project exists */
  projectId?: string;
}

export interface CvPresentation {
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
  type: 'poster' | 'oral';
}

export interface CvConferenceAbstract {
  /** Abstract title */
  title: string;
  /** Author list */
  authors: string[];
  /** Conference name */
  conference: string;
  /** Submission date or expected presentation date */
  date: string;
  /** Abstract type */
  type: 'poster' | 'oral';
}

export interface CvAward {
  /** Full award name */
  name: string;
  /** Award date (YYYY-MM format) */
  date: string;
}

export interface CvTraining {
  /** Program name */
  programName: string;
  /** Institution or organization */
  institution: string;
  /** Date (YYYY-MM format) */
  date: string;
  /** Brief description bullets */
  bullets: string[];
}

export interface CvTeaching {
  /** Role title */
  roleTitle: string;
  /** Institution */
  institution: string;
  /** Start date (YYYY-MM format) */
  startDate: string;
  /** End date (YYYY-MM format, null if ongoing) */
  endDate: string | null;
  /** Responsibility bullets */
  bullets: string[];
}

export interface CvEducation {
  /** Honors thesis title */
  honorsThesisTitle: string;
  /** Study abroad program */
  studyAbroadProgram: string;
  /** Study abroad location */
  studyAbroadLocation: string;
  /** Study abroad date */
  studyAbroadDate: string;
  /** Relevant coursework */
  relevantCoursework: string[];
}

// ------------------------------------------------------------------ //
// Education                                                          //
// ------------------------------------------------------------------ //

export const education: CvEducation = {
  honorsThesisTitle:
    'PyRo-FOAMS: An open-source workflow for automated vesicle segmentation and stereological analysis',
  studyAbroadProgram: 'International Volcanological Field School',
  studyAbroadLocation: 'Iceland',
  studyAbroadDate: '2024-05',
  relevantCoursework: [
    'Computational Physics',
    'Classical Mechanics',
    'Electricity & Magnetism',
    'Quantum Mechanics',
    'Statistical Mechanics',
    'Mineralogy & Petrology',
    'Structural Geology',
    'Geomorphology',
    'Environmental Geochemistry',
    'Volcanology',
    'Igneous & Metamorphic Petrology',
    'Data Science',
    'Machine Learning',
    'Computer Vision',
  ],
};

// ------------------------------------------------------------------ //
// Research Experience                                                //
// ------------------------------------------------------------------ //

export const researchExperience: CvResearchExperience[] = [
  {
    roleTitle: 'NSF REU — Computer Vision in Physical Volcanology',
    institution: 'Washington and Lee University',
    location: 'Lexington, Virginia',
    advisor: 'Dr. Nial Barber',
    startDate: '2025-05',
    endDate: '2025-08',
    bullets: [
      'Developed computer-vision pipeline to automate lava-fountain measurement from video',
      'Labeled 2,300+ frames to create training dataset for semantic segmentation',
      'Trained U-Net models to segment fountains from natural background and quantify temporal dynamics',
      'Generated time-series measurements of fountain height, width, and pyroclast ejection patterns',
    ],
    projectId: 'kilauea-lava-fountain-computer-vision',
  },
  {
    roleTitle: 'Machine Learning for Micro-CT in Physical Volcanology',
    institution: 'Washington and Lee University',
    location: 'Lexington, Virginia',
    advisor: 'Dr. Nial Barber',
    startDate: '2024-08',
    endDate: null,
    bullets: [
      'Built PyRo-FOAMS: open-source pipeline for automated vesicle segmentation from micro-CT scans',
      'Implemented machine-learning segmentation and stereological analysis workflows',
      'Validated against manual measurements of vesicularity and bubble-size distributions',
      'Applied to pyroclasts from Ijen Caldera to quantify pore networks and permeability',
    ],
    projectId: 'ijen-pyroclast-microct-analysis',
  },
  {
    roleTitle: 'Pulsating Star Astronomy',
    institution: 'Washington and Lee University',
    location: 'Lexington, Virginia',
    advisor: 'Dr. David Sukow',
    startDate: '2024-08',
    endDate: '2025-05',
    bullets: [
      'Collected photometric observations of RR Lyrae variable star V0499 Centauri',
      'Calculated pulsation period and photometric distance using phase-folded light curves',
      'Co-authored manuscript submitted to peer-reviewed astronomy journal',
    ],
    projectId: 'v0499-centauri-photometry',
  },
  {
    roleTitle: 'Double Star Astrometry',
    institution: 'Washington and Lee University',
    location: 'Lexington, Virginia',
    advisor: 'Dr. David Sukow',
    startDate: '2023-08',
    endDate: '2024-05',
    bullets: [
      'Performed astrometric measurements of visual binary star WDS 03575-0110',
      'Analyzed positional data and orbital motion using PASA tools and curve fitting',
      'Published peer-reviewed astrometry results in Journal of Double Star Observations',
    ],
    projectId: 'wds-03575-0110-astrometry',
  },
  {
    roleTitle: 'Nanotechnology and Particle Physics',
    institution: 'Washington and Lee University',
    location: 'Lexington, Virginia',
    advisor: 'Dr. Irina Mazilu',
    startDate: '2023-05',
    endDate: '2024-05',
    bullets: [
      'Simulated dipole-dipole interactions and self-assembly of magnetic nanoparticles',
      'Developed Monte Carlo models to predict formation of ordered nanoparticle structures',
      'Analyzed energy landscapes and configuration stability in nanoparticle systems',
    ],
    projectId: 'nanoparticle-dipole-self-assembly',
  },
  {
    roleTitle: 'AIM Research Scholar — Computational Number Theory',
    institution: 'American Institute of Mathematics',
    location: 'Pasadena, California',
    advisor: 'Dr. James Davis',
    startDate: '2022-06',
    endDate: '2022-07',
    bullets: [
      'Investigated computational approaches to Riesel and Sierpiński conjectures',
      'Implemented prime-factorization algorithms to test candidate covering sets',
      'Explored patterns in prime coverings for large odd integers',
    ],
    projectId: 'riesel-sierpinski-computational-number-theory',
  },
];

// ------------------------------------------------------------------ //
// Manuscripts                                                        //
// ------------------------------------------------------------------ //

export const manuscriptsUnderReview: CvManuscript[] = [
  {
    title: 'BViz Photometric Distance to the RR Lyrae Star V0499 Centauri',
    authors: ['Sukow, D. W.', 'Sotelo Flores, J.', 'Nagy, J.', 'Freed, R.'],
    targetJournal: 'Journal of the American Association of Variable Star Observers',
    status: 'in-review',
    projectId: 'v0499-centauri-photometry',
  },
];

export const manuscriptsInPreparation: CvManuscript[] = [
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
      'Automated lava-fountain measurement from video: A computer-vision approach to quantifying temporal eruption dynamics at Kīlauea Volcano',
    authors: ['Sotelo Flores, J.', 'Barber, N. D.'],
    targetJournal: 'Journal of Applied Volcanology',
    status: 'in-preparation',
    projectId: 'kilauea-lava-fountain-computer-vision',
  },
];

// ------------------------------------------------------------------ //
// Software & Research Products                                       //
// ------------------------------------------------------------------ //

export const software: CvSoftware[] = [
  {
    name: 'PyRo-FOAMS',
    description:
      'Open-source Python workflow for automated vesicle segmentation and stereological analysis from micro-CT scans of volcanic pyroclasts',
    projectId: 'ijen-pyroclast-microct-analysis',
  },
  {
    name: 'Kīlauea Lava Fountain Segmentation and Labeling Pipeline',
    description:
      'Computer-vision pipeline for automated lava-fountain measurement from video using semantic segmentation',
    projectId: 'kilauea-lava-fountain-computer-vision',
  },
];

// ------------------------------------------------------------------ //
// Presentations                                                      //
// ------------------------------------------------------------------ //

export const completedPresentations: CvPresentation[] = [
  {
    title:
      'Quantifying Vesicle Networks in Ijen Caldera Pyroclasts: A Machine-Learning Approach to Micro-CT Analysis',
    authors: ['Sotelo Flores, J.', 'Barber, N. D.'],
    venue: 'American Geophysical Union Fall Meeting 2025',
    location: 'San Francisco, California',
    date: '2025-12',
    type: 'poster',
  },
  {
    title:
      'Automated Vesicle Segmentation and Pore-Network Analysis in Ijen Caldera Pyroclasts Using Machine Learning and Micro-CT',
    authors: ['Sotelo Flores, J.', 'Barber, N. D.'],
    venue: 'Palais des congrès de Montréal',
    location: 'Montréal, Canada',
    date: '2026-06',
    type: 'oral',
  },
];

export const submittedConferenceAbstracts: CvConferenceAbstract[] = [
  {
    title:
      'Automated Lava-Fountain Measurement from Video: A Computer-Vision Approach to Quantifying Temporal Eruption Dynamics at Kīlauea Volcano',
    authors: ['Sotelo Flores, J.', 'Barber, N. D.'],
    conference: 'American Geophysical Union Fall Meeting 2026',
    date: '2026-12',
    type: 'oral',
  },
  {
    title:
      'PyRo-FOAMS: An Open-Source Workflow for Automated Vesicle Segmentation and Stereological Analysis from Micro-CT Scans',
    authors: ['Sotelo Flores, J.', 'Barber, N. D.'],
    conference: 'American Geophysical Union Fall Meeting 2026',
    date: '2026-12',
    type: 'poster',
  },
];

// ------------------------------------------------------------------ //
// Awards, Fellowships, and Scholarships                              //
// ------------------------------------------------------------------ //

export const awards: CvAward[] = [
  {
    name: 'R. Preston Hawkins IV Geology Field Research Award',
    date: '2026-04',
  },
  {
    name: 'Samuel J. Kozak–Odell S. McGuire–Edgar W. Spencer L. Schwab Geology Lab Research Award',
    date: '2025-04',
  },
  {
    name: 'U.S. Department of State Gilman Scholar',
    date: '2024-01',
  },
  {
    name: 'QuestBridge Scholar',
    date: '2023-03',
  },
];

// ------------------------------------------------------------------ //
// Research Training and Scientific Programs                          //
// ------------------------------------------------------------------ //

export const training: CvTraining[] = [
  {
    programName: 'Green Bank Observatory ERIRA Program',
    institution: 'National Radio Astronomy Observatory',
    date: '2025-08',
    bullets: [
      'Conducted radio-astronomy observations of spectral-line emissions',
      'Analyzed pulsar timing data and investigated fast radio bursts',
    ],
  },
  {
    programName: 'Michigan State Nuclear Science Summer School',
    institution: 'National Superconducting Cyclotron Laboratory',
    date: '2025-05',
    bullets: [
      'Studied nuclear structure, reactions, and astrophysics',
      'Gained hands-on experience with particle-detection instrumentation',
    ],
  },
];

// ------------------------------------------------------------------ //
// Teaching and Mentoring                                             //
// ------------------------------------------------------------------ //

export const teaching: CvTeaching[] = [
  {
    roleTitle: 'Physics and Astronomy Teaching Assistant',
    institution: 'Washington and Lee University',
    startDate: '2024-09',
    endDate: '2025-12',
    bullets: [
      'Led weekly problem-solving sessions for introductory physics courses',
      'Assisted students with laboratory experiments and data analysis',
      'Graded assignments and provided detailed feedback on scientific reasoning',
    ],
  },
  {
    roleTitle: 'AIM Program Advisor',
    institution: 'American Institute of Mathematics',
    startDate: '2025-06',
    endDate: '2025-07',
    bullets: [
      'Mentored high-school students in computational mathematics research',
      'Guided project design and implementation for number-theory investigations',
    ],
  },
];
