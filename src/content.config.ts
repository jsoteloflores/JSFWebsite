import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  projectSchema,
  publicationSchema,
  presentationSchema,
  softwareSchema,
  exhibitSchema,
} from './types/content-schemas';

/**
 * Portfolio content collections.
 *
 * All schemas are defined in src/types/content-schemas.ts so they can be
 * imported and validated in tests outside the Astro build context.
 *
 * Public content directories remain empty until Ticket 003 (content entry).
 * Only .md files are supported in this ticket. MDX is not enabled.
 */

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: projectSchema,
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: publicationSchema,
});

const presentations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/presentations' }),
  schema: presentationSchema,
});

const software = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/software' }),
  schema: softwareSchema,
});

const exhibits = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/exhibits' }),
  schema: exhibitSchema,
});

export const collections = {
  projects,
  publications,
  presentations,
  software,
  exhibits,
};
