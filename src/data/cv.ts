/**
 * CV-specific structured data for Joel Sotelo Flores.
 *
 * This module contains information that is genuinely CV-specific and not
 * already present in the site's typed content collections.
 *
 * Where a project or publication already exists in content collections,
 * reference its stable ID rather than duplicating facts.
 *
 * Primary authoritative source:
 * public/cv/Joel_Sotelo_Flores_CV.pdf
 *
 * No CV-specific factual content may be introduced from another source
 * without explicit user approval.
 *
 * Status values must reflect actual publication/submission state:
 * - "published" — peer-reviewed and available
 * - "in-review" — submitted and awaiting decision
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
  /** Study abroad program description */
  studyAbroad: string;
  /** Relevant coursework */
  relevantCoursework: string[];
}

// ------------------------------------------------------------------ //
// Education                                                          //
// ------------------------------------------------------------------ //

export const education: CvEducation = {
  honorsThesisTitle:
    'PyRo-FOAMS: An open-source workflow for automated vesicle segmentation and stereological analysis.',
  studyAbroad:
    'Big Science in 21st Century Europe, including CERN and VIRGO Gravitational Wave Detector; Korean language study at Yonsei University.',
  relevantCoursework: [
    'Volcanology',
    'Modeling and Simulation of Physical Systems',
    'Earth and Environmental Geochemistry',
    'GIS and Remote Sensing',
    'Petrology & Crystallography',
    'Hydrology',
    'Geomorphology',
    'Classical Mechanics',
    'Electricity and Magnetism',
    'Statistical Physics',
    'Quantum Mechanics',
  ],
};

// ------------------------------------------------------------------ //
// Research Experience                                                //
// ------------------------------------------------------------------ //

export const researchExperience: CvResearchExperience[] = [
  {
    roleTitle: 'NSF REU – Computer Vision in Physical Volcanology',
    institution: 'University of Hawaiʻi at Mānoa',
    location: 'Honolulu, HI',
    advisor: 'Natalia Gauer Pasqualon',
    startDate: '2026-06',
    endDate: null,
    bullets: [
      'Developing a computer vision pipeline to segment Kīlauea lava fountain video and support quantitative extraction of eruption parameters from field footage.',
      'Trained U-Net segmentation models to identify lava-fountain regions across changing lighting, viewing geometry, and field conditions.',
      'Built a Python-based labeling and dataset-preparation system for selecting frames, generating masks, tracking video metadata, and organizing model-ready training data.',
      'Collected field footage for Kīlauea Episodes 49 and 50 and documented camera settings, viewing conditions, and observational notes.',
    ],
    projectId: 'kilauea-lava-fountain-computer-vision',
  },
  {
    roleTitle: 'Machine Learning for Micro-CT in Physical Volcanology',
    institution: 'Washington and Lee University',
    location: 'Lexington, VA',
    advisor: 'Nicholas Barber',
    startDate: '2025-06',
    endDate: null,
    bullets: [
      'Conduct computational volcanology research on pyroclastic micro-CT volumes to quantify vesicularity, pore connectivity, permeability, and eruption-related textural characteristics of the 1817 Kawah Ijen eruption to reconstruct eruptive history.',
      'Train and evaluate U-Net-based deep learning models for 3D pore-space segmentation of volcanic clasts, enabling quantitative analysis of connected pore networks.',
      'Built PyRO-FOAMS, a Python-based stereometric analysis program inspired by Shea et al. (2010), to support automated vesicle analysis from 2D thin-section imagery through classical and machine learning computation.',
      'Used Dragonfly and OpenPNM to quantify porosity, permeability, pore connectivity, and anisotropy from segmented pyroclast volumes.',
      'Integrated electron microprobe and scanning electron microscope data to connect textural observations with mineral chemistry, fractionation trends, and pressure-temperature constraints.',
    ],
    projectId: 'ijen-pyroclast-microct-analysis',
  },
  {
    roleTitle: 'Pulsating Star Astronomy',
    institution: 'Washington and Lee University',
    location: 'Lexington, VA',
    advisor: 'David W. Sukow',
    startDate: '2025-03',
    endDate: '2026-04',
    bullets: [
      'Conducted multi-band observational analysis of the RR Lyrae variable star V0499 Centauri.',
      'Analyzed robotic telescope data from the Las Cumbres Observatory global telescope network to construct folded light curves and measure pulsation behavior.',
      'Contributed to period determination using multiple algorithms, including phase dispersion minimization, string length minimization, harmonic analysis of variance, and Lomb-Scargle periodograms.',
      'Supported photometric distance analysis using period-luminosity-metallicity relations, extinction corrections, and comparison with Gaia DR3 parallax measurements.',
    ],
    projectId: 'v0499-centauri-photometry',
  },
  {
    roleTitle: 'Double Star Astrometry',
    institution: 'Washington and Lee University',
    location: 'Lexington, VA',
    advisor: 'David W. Sukow',
    startDate: '2024-10',
    endDate: '2025-04',
    bullets: [
      'Conducted astrometric analysis of the binary star system WDS 03575-0110 using robotic telescope observations from Las Cumbres Observatory.',
      'Used AstroImageJ to measure separation and position angle from observational image data.',
      'Compared new measurements with historical observations and Gaia DR3 data to evaluate common proper motion and refine orbital parameter estimates through novel techniques.',
    ],
    projectId: 'wds-03575-0110-astrometry',
  },
  {
    roleTitle: 'Nanotechnology and Particle Physics',
    institution: 'Washington and Lee University',
    location: 'Lexington, VA',
    advisor: 'Irina Mazilu',
    startDate: '2024-01',
    endDate: '2024-03',
    bullets: [
      'Assisted with laboratory research on electric-field-driven self-assembly of nanoparticles and magnetic dipole systems.',
      'Investigated how dipoles interact, align, and form larger-scale structures under applied electric fields.',
      'Designed experimental apparatuses to observe, measure, and record magnetic dipole interactions.',
    ],
    projectId: 'nanoparticle-dipole-self-assembly',
  },
  {
    roleTitle: 'AIM Research Scholar – Computational Number Theory',
    institution: 'Washington and Lee University',
    location: 'Lexington, VA',
    advisor: 'Carrie Finch-Smith',
    startDate: '2023-06',
    endDate: '2023-08',
    bullets: [
      'Developed an algorithm in R to identify Riesel-Sierpiński numbers within recursive sequences.',
      'Applied computational methods to explore problems in number theory and mathematical pattern recognition.',
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
      'Computer Vision Segmentation of Kīlauea Lava Fountain Video for Physical Eruption Parameter Extraction',
    authors: ['Sotelo Flores, J.', 'Pasqualon, N. G.'],
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
// Presentations                                                      //
// ------------------------------------------------------------------ //

export const completedPresentations: CvPresentation[] = [
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
  },
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
    venue: 'Palais des congrès de Montréal',
    location: 'Montréal, Canada',
    date: '2026-06',
    type: 'oral',
  },
];

export const submittedConferenceAbstracts: CvConferenceAbstract[] = [
  {
    title:
      'Computer Vision Segmentation of Kīlauea Lava Fountain Video for Physical Eruption Parameter Extraction',
    authors: ['Sotelo Flores, J.', 'Pasqualon, N. G.'],
    conference: 'American Geophysical Union Fall Meeting',
    date: '2026-12',
  },
  {
    title:
      'Deep Learning Segmentation and Pore-Network Characterization of Pyroclastic Micro-CT Volumes',
    authors: ['Sotelo Flores, J.', 'Barber, N. D.', 'Handini, E.', 'Berlo, K.'],
    conference: 'American Geophysical Union Fall Meeting',
    date: '2026-12',
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
    institution: 'Green Bank Observatory, Green Bank, WV',
    date: '2025-08',
    bullets: [
      'Gained hands-on experience in pulsar data analysis, radio telescope operations, and radio astronomy research methods.',
      'Built PyTorch machine learning models for detection and classification of galaxy images.',
    ],
  },
  {
    programName: 'Michigan State Nuclear Science Summer School',
    institution:
      'Facility for Rare Isotope Beams, Michigan State University, East Lansing, MI',
    date: '2025-05',
    bullets: [
      'Participated in an intensive program covering nuclear structure, reactions, and astrophysics.',
      'Gained hands-on experience with particle-detection instrumentation and experimental techniques.',
    ],
  },
];

// ------------------------------------------------------------------ //
// Teaching and Mentoring                                             //
// ------------------------------------------------------------------ //

export const teaching: CvTeaching[] = [
  {
    roleTitle: 'Physics and Astronomy Teaching Assistant',
    institution: 'Washington and Lee University, Lexington, VA',
    startDate: '2024-09',
    endDate: '2025-12',
    bullets: [
      'Assisted students in observational astronomy and introductory physics laboratories through hands-on support with data collection, analysis, and interpretation.',
      'Guided students in the use of the Skynet Robotic Telescope Network and Afterglow image-processing software.',
      'Helped students connect astronomical image processing, telescope observations, and physical interpretation of laboratory results.',
    ],
  },
  {
    roleTitle: 'AIM Program Advisor',
    institution: 'Washington and Lee University, Lexington, VA',
    startDate: '2025-06',
    endDate: '2025-07',
    bullets: [
      'Served as a residential and academic mentor for incoming students participating in the AIM Scholars Program.',
      'Supported students during their transition to college by helping build community, encouraging academic confidence, and connecting them with campus resources.',
      'Facilitated group activities and informal advising focused on belonging, collaboration, and navigating university life.',
    ],
  },
];
