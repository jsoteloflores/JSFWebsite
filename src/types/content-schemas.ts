/**
 * Reusable Zod schemas and inferred types for portfolio content collections.
 *
 * This file imports from 'zod' directly (not 'astro:content') so that schemas
 * can be imported and validated in Vitest tests outside the Astro build context.
 *
 * src/content.config.ts imports these schemas and passes them to defineCollection.
 * Astro's z from 'astro:content' is a direct re-export of zod, so the types
 * are compatible.
 */

import { z } from 'zod';
import {
  PROJECT_STATUSES,
  PUBLICATION_STATUSES,
  PUBLICATION_TYPES,
  PRESENTATION_TYPES,
  SOFTWARE_STATUSES,
  EXHIBIT_STATUSES,
  VISIBILITY_VALUES,
} from './content';

// ------------------------------------------------------------------ //
// Sub-schemas (reusable fragments)                                    //
// ------------------------------------------------------------------ //

/**
 * A single author entry. Author order must be preserved exactly as entered.
 * The isJoel flag must be set explicitly; it is never inferred from the name.
 */
export const authorSchema = z.object({
  name: z.string().min(1, 'Author name must not be empty'),
  isJoel: z.boolean(),
  orcid: z.string().optional(),
  affiliation: z.string().optional(),
});

export const externalLinkSchema = z.object({
  label: z.string().min(1, 'Link label must not be empty'),
  url: z.string().url('External link URL must be a valid URL'),
});

export const imageSchema = z.object({
  src: z.string().min(1, 'Image src must not be empty'),
  alt: z.string().min(1, 'Image alt text must not be empty'),
  caption: z.string().optional(),
  credit: z.string().optional(),
});

export const dateRangeSchema = z.object({
  start: z.string().min(1, 'Start date must not be empty'),
  end: z.string().optional(),
  display: z.string().optional(),
});

// ------------------------------------------------------------------ //
// Project schema                                                      //
// ------------------------------------------------------------------ //

export const projectSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  summary: z.string().min(1),
  status: z.enum(PROJECT_STATUSES),
  startDate: z.string().min(1),
  researchThemes: z.array(z.string().min(1)).min(1),
  featured: z.boolean(),
  visibility: z.enum(VISIBILITY_VALUES),
  // optional
  endDate: z.string().optional(),
  institutions: z.array(z.string()).optional(),
  advisor: z.string().optional(),
  collaborators: z.array(authorSchema).optional(),
  methods: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  featuredImage: imageSchema.optional(),
  relatedPublications: z.array(z.string()).optional(),
  relatedPresentations: z.array(z.string()).optional(),
  relatedSoftware: z.array(z.string()).optional(),
  relatedExhibit: z.string().optional(),
  externalLinks: z.array(externalLinkSchema).optional(),
  sortOrder: z.number().int().optional(),
});

// ------------------------------------------------------------------ //
// Publication schema                                                  //
// ------------------------------------------------------------------ //

/**
 * DOI must be stored in bare form: 10.xxxx/xxxxx
 * Do not store the full https://doi.org/ URL in the doi field.
 */
const doiSchema = z
  .string()
  .regex(
    /^10\.\d{4,}\/\S+$/,
    'DOI must be in bare format: 10.xxxx/xxxxx (do not include https://doi.org/)',
  );

export const publicationSchema = z.object({
  title: z.string().min(1),
  authors: z.array(authorSchema).min(1, 'At least one author is required'),
  year: z.number().int().min(1900).max(2100),
  type: z.enum(PUBLICATION_TYPES),
  status: z.enum(PUBLICATION_STATUSES),
  visibility: z.enum(VISIBILITY_VALUES),
  featured: z.boolean(),
  // optional — not required for in-preparation or submitted work
  journal: z.string().optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  publisher: z.string().optional(),
  doi: doiSchema.optional(),
  url: z.string().url().optional(),
  pdf: z.string().optional(),
  abstract: z.string().optional(),
  citation: z.string().optional(),
  relatedProject: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  submittedDate: z.string().optional(),
  acceptedDate: z.string().optional(),
  publishedDate: z.string().optional(),
  sortDate: z.string().optional(),
});

// ------------------------------------------------------------------ //
// Presentation schema                                                 //
// ------------------------------------------------------------------ //

export const presentationSchema = z.object({
  title: z.string().min(1),
  authors: z.array(authorSchema).min(1, 'At least one author is required'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Presentation date must be ISO format YYYY-MM-DD'),
  event: z.string().min(1),
  type: z.enum(PRESENTATION_TYPES),
  visibility: z.enum(VISIBILITY_VALUES),
  featured: z.boolean(),
  // optional
  location: z.string().optional(),
  abstract: z.string().optional(),
  poster: z.string().optional(),
  slides: z.string().optional(),
  recording: z.string().url().optional(),
  thumbnail: z.string().optional(),
  relatedProject: z.string().optional(),
  contribution: z.string().optional(),
  externalUrl: z.string().url().optional(),
  sortDate: z.string().optional(),
});

// ------------------------------------------------------------------ //
// Software schema                                                     //
// ------------------------------------------------------------------ //

export const softwareSchema = z.object({
  name: z.string().min(1),
  summary: z.string().min(1),
  scientificProblem: z.string().min(1),
  status: z.enum(SOFTWARE_STATUSES),
  visibility: z.enum(VISIBILITY_VALUES),
  featured: z.boolean(),
  // optional — repository is not required (may be private)
  capabilities: z.array(z.string()).optional(),
  roleInPipeline: z.string().optional(),
  repository: z.string().url().optional(),
  doi: doiSchema.optional(),
  documentation: z.string().url().optional(),
  screenshots: z.array(imageSchema).optional(),
  languages: z.array(z.string()).optional(),
  frameworks: z.array(z.string()).optional(),
  relatedProjects: z.array(z.string()).optional(),
  relatedPublications: z.array(z.string()).optional(),
  externalLinks: z.array(externalLinkSchema).optional(),
  sortOrder: z.number().int().optional(),
});

// ------------------------------------------------------------------ //
// Exhibit schema                                                      //
// ------------------------------------------------------------------ //

/**
 * Exhibit records link to external interactive experiences only.
 * No runtime configuration, media manifests, or exhibit source code belongs here.
 * The full exhibit implementation lives in its own separate repository.
 */
export const exhibitSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  researchProject: z.string().min(1),
  previewImage: imageSchema,
  externalUrl: z.string().url('Exhibit external URL must be a valid URL'),
  status: z.enum(EXHIBIT_STATUSES),
  visible: z.boolean(),
  featured: z.boolean(),
  // optional
  estimatedExperienceLength: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  sortOrder: z.number().int().optional(),
});

// ------------------------------------------------------------------ //
// Inferred TypeScript types                                           //
// ------------------------------------------------------------------ //

export type Author = z.infer<typeof authorSchema>;
export type ExternalLink = z.infer<typeof externalLinkSchema>;
export type ImageMeta = z.infer<typeof imageSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;

export type ProjectFrontmatter = z.infer<typeof projectSchema>;
export type PublicationFrontmatter = z.infer<typeof publicationSchema>;
export type PresentationFrontmatter = z.infer<typeof presentationSchema>;
export type SoftwareFrontmatter = z.infer<typeof softwareSchema>;
export type ExhibitFrontmatter = z.infer<typeof exhibitSchema>;
