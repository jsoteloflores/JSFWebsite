/**
 * Public profile data for Joel A. Sotelo Flores.
 *
 * Source: docs/CONTENT_SOURCE_OF_TRUTH.md (CV snapshot, July 2026)
 * Resolved decisions: docs/CONTENT_QUESTIONS.md Q1–Q3 (July 2026)
 *
 * This object contains only information verified for public display.
 * Private fields (GPA, home address, phone) are intentionally excluded.
 *
 * displayName vs fullName:
 *   - displayName ("Joel Sotelo Flores") is used sitewide for headers,
 *     navigation, and social previews.
 *   - fullName ("Joel A. Sotelo Flores") is retained for author entries
 *     in publication citations and source metadata, where the middle
 *     initial appears on the published record.
 *
 * cvPath now contains the approved public PDF for download.
 */

export interface Profile {
  /** Full legal name as shown on the CV. Used in citation author entries. */
  fullName: string;
  /** Public professional display name used sitewide. */
  displayName: string;
  /** Current degree-granting institution. */
  institution: string;
  /** Current location, approved for public display. */
  location: string;
  /** Degree programs in progress. */
  degrees: string[];
  /** Expected graduation date. */
  expectedGraduation: string;
  /** Institutional academic email, verified for public use. */
  academicEmail: string;
  /** GitHub profile URL. */
  githubUrl: string;
  /** LinkedIn profile URL. */
  linkedInUrl: string;
  /** Public CV PDF path for download. */
  cvPath: string;
  /** Current academic stage. */
  currentAcademicStage: string;
  /** Concise research interests synthesized from CV research experience. */
  researchInterests: string[];
}

export const profile: Profile = {
  fullName: 'Joel A. Sotelo Flores',
  displayName: 'Joel Sotelo Flores',
  institution: 'Washington and Lee University',
  location: 'Lexington, Virginia',
  degrees: ['B.S. Physics', 'B.S. Earth and Environmental Geoscience'],
  expectedGraduation: 'June 2027',
  academicEmail: 'jsoteloflores@mail.wlu.edu',
  githubUrl: 'https://github.com/jsoteloflores',
  linkedInUrl: 'https://www.linkedin.com/in/joelsoteloflores',
  cvPath: '/cv/Joel_Sotelo_Flores_CV.pdf',
  currentAcademicStage: 'Undergraduate student',
  researchInterests: [
    'computational volcanology',
    'physical volcanology',
    'computer vision for eruption imagery',
    'eruption dynamics',
    'high-temperature experimental petrology',
    'machine learning for volcanic analysis and signal processing',
    'micro-CT analysis',
    'pore-network and permeability analysis',
    'scientific software development',
  ],
};
