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
  authorSchema,
  externalLinkSchema,
  imageSchema,
  projectSchema,
  publicationSchema,
  presentationSchema,
  softwareSchema,
  exhibitSchema,
} from '../src/types/content-schemas';

// ------------------------------------------------------------------ //
// Controlled vocabularies                                             //
// ------------------------------------------------------------------ //

describe('controlled vocabularies', () => {
  it('each vocabulary has unique values', () => {
    for (const [name, vocab] of [
      ['PROJECT_STATUSES', PROJECT_STATUSES],
      ['PUBLICATION_STATUSES', PUBLICATION_STATUSES],
      ['PUBLICATION_TYPES', PUBLICATION_TYPES],
      ['PRESENTATION_TYPES', PRESENTATION_TYPES],
      ['SOFTWARE_STATUSES', SOFTWARE_STATUSES],
      ['EXHIBIT_STATUSES', EXHIBIT_STATUSES],
      ['VISIBILITY_VALUES', VISIBILITY_VALUES],
    ] as const) {
      const unique = new Set(vocab);
      expect(unique.size, `${name} contains duplicate values`).toBe(vocab.length);
    }
  });

  it('no vocabulary contains empty strings', () => {
    for (const vocab of [
      PROJECT_STATUSES,
      PUBLICATION_STATUSES,
      PUBLICATION_TYPES,
      PRESENTATION_TYPES,
      SOFTWARE_STATUSES,
      EXHIBIT_STATUSES,
      VISIBILITY_VALUES,
    ]) {
      for (const value of vocab) {
        expect(value.trim().length, `Empty string found in vocabulary`).toBeGreaterThan(
          0,
        );
      }
    }
  });

  it('PUBLICATION_STATUSES and PRESENTATION_TYPES share no values', () => {
    const pubSet = new Set(PUBLICATION_STATUSES as ReadonlyArray<string>);
    for (const type of PRESENTATION_TYPES) {
      expect(pubSet.has(type)).toBe(false);
    }
  });

  it('EXHIBIT_STATUSES contains exactly available and unavailable', () => {
    expect([...EXHIBIT_STATUSES].sort()).toStrictEqual(['available', 'unavailable']);
  });
});

// ------------------------------------------------------------------ //
// Author schema                                                       //
// ------------------------------------------------------------------ //

describe('authorSchema', () => {
  it('validates a valid author with isJoel true', () => {
    const result = authorSchema.safeParse({
      name: 'Joel Sotelo Flores',
      isJoel: true,
      affiliation: 'University Example',
    });
    expect(result.success).toBe(true);
  });

  it('validates a collaborator author with isJoel false', () => {
    const result = authorSchema.safeParse({
      name: 'Jane Collaborator',
      isJoel: false,
    });
    expect(result.success).toBe(true);
  });

  it('fails when name is empty', () => {
    const result = authorSchema.safeParse({ name: '', isJoel: false });
    expect(result.success).toBe(false);
  });

  it('fails when isJoel is missing', () => {
    const result = authorSchema.safeParse({ name: 'Joel Sotelo Flores' });
    expect(result.success).toBe(false);
  });
});

// ------------------------------------------------------------------ //
// External link schema                                                //
// ------------------------------------------------------------------ //

describe('externalLinkSchema', () => {
  it('validates a valid external link', () => {
    const result = externalLinkSchema.safeParse({
      label: 'Project repository',
      url: 'https://github.com/example/repo',
    });
    expect(result.success).toBe(true);
  });

  it('fails when url is not a valid URL', () => {
    const result = externalLinkSchema.safeParse({
      label: 'Bad link',
      url: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });

  it('fails when label is empty', () => {
    const result = externalLinkSchema.safeParse({
      label: '',
      url: 'https://example.com',
    });
    expect(result.success).toBe(false);
  });
});

// ------------------------------------------------------------------ //
// Image schema                                                        //
// ------------------------------------------------------------------ //

describe('imageSchema', () => {
  it('validates an image with required fields', () => {
    const result = imageSchema.safeParse({
      src: '/images/kilauea-lava-fountain.webp',
      alt: 'Lava fountain eruption at Kīlauea, showing segmentation overlay',
    });
    expect(result.success).toBe(true);
  });

  it('fails when alt text is missing', () => {
    const result = imageSchema.safeParse({ src: '/images/example.webp' });
    expect(result.success).toBe(false);
  });

  it('fails when src is empty', () => {
    const result = imageSchema.safeParse({ src: '', alt: 'Description' });
    expect(result.success).toBe(false);
  });
});

// ------------------------------------------------------------------ //
// Project schema                                                      //
// ------------------------------------------------------------------ //

describe('projectSchema', () => {
  const minimalValidProject = {
    title: 'Schema Test Project',
    subtitle: 'Schema validation fixture — not real content',
    summary: 'This project entry exists only to validate the schema.',
    status: 'active' as const,
    startDate: '2025-01',
    researchThemes: ['volcanic imagery'],
    featured: false,
    visibility: 'public' as const,
  };

  it('validates a minimal valid project', () => {
    const result = projectSchema.safeParse(minimalValidProject);
    expect(result.success).toBe(true);
  });

  it('fails when summary is missing', () => {
    const { summary: _omit, ...without } = minimalValidProject;
    const result = projectSchema.safeParse(without);
    expect(result.success).toBe(false);
  });

  it('fails with an invalid status value', () => {
    const result = projectSchema.safeParse({
      ...minimalValidProject,
      status: 'unknown-status',
    });
    expect(result.success).toBe(false);
  });

  it('fails with an invalid visibility value', () => {
    const result = projectSchema.safeParse({
      ...minimalValidProject,
      visibility: 'visible',
    });
    expect(result.success).toBe(false);
  });

  it('validates a complete project with optional fields', () => {
    const result = projectSchema.safeParse({
      ...minimalValidProject,
      endDate: '2026-06',
      institutions: ['Example University'],
      advisor: 'Dr. Advisor Name',
      methods: ['image segmentation', 'temporal analysis'],
      tools: ['Python', 'PyTorch'],
      relatedPublications: ['kilauea-segmentation-2025'],
      sortOrder: 1,
    });
    expect(result.success).toBe(true);
  });
});

// ------------------------------------------------------------------ //
// Publication schema                                                  //
// ------------------------------------------------------------------ //

describe('publicationSchema', () => {
  const joelAuthor = { name: 'Joel Sotelo Flores', isJoel: true };
  const coAuthor = { name: 'Co Author', isJoel: false };

  const publishedFixture = {
    title: 'Schema Test Publication',
    authors: [joelAuthor, coAuthor],
    year: 2025,
    type: 'journal-article' as const,
    status: 'published' as const,
    visibility: 'public' as const,
    featured: false,
    journal: 'Journal of Volcanology and Geothermal Research',
    doi: '10.1016/j.jvolgeores.2025.000000',
    url: 'https://doi.org/10.1016/j.jvolgeores.2025.000000',
  };

  const inPrepFixture = {
    title: 'Schema Test In-Preparation Manuscript',
    authors: [joelAuthor],
    year: 2026,
    type: 'journal-article' as const,
    status: 'in-preparation' as const,
    visibility: 'private' as const,
    featured: false,
  };

  it('validates a published-style fixture with DOI and journal', () => {
    const result = publicationSchema.safeParse(publishedFixture);
    expect(result.success).toBe(true);
  });

  it('validates an in-preparation fixture without DOI or journal metadata', () => {
    const result = publicationSchema.safeParse(inPrepFixture);
    expect(result.success).toBe(true);
  });

  it('fails with an invalid publication status', () => {
    const result = publicationSchema.safeParse({
      ...inPrepFixture,
      status: 'draft',
    });
    expect(result.success).toBe(false);
  });

  it('fails with an invalid URL', () => {
    const result = publicationSchema.safeParse({
      ...publishedFixture,
      url: 'not-a-valid-url',
    });
    expect(result.success).toBe(false);
  });

  it('fails with an empty authors array', () => {
    const result = publicationSchema.safeParse({
      ...inPrepFixture,
      authors: [],
    });
    expect(result.success).toBe(false);
  });

  it('fails when DOI is provided in full URL form', () => {
    const result = publicationSchema.safeParse({
      ...publishedFixture,
      doi: 'https://doi.org/10.1016/j.jvolgeores.2025.000000',
    });
    expect(result.success).toBe(false);
  });
});

// ------------------------------------------------------------------ //
// Presentation schema                                                 //
// ------------------------------------------------------------------ //

describe('presentationSchema', () => {
  const minimalPresentation = {
    title: 'Schema Test Presentation',
    authors: [{ name: 'Joel Sotelo Flores', isJoel: true }],
    date: '2025-12-09',
    event: 'American Geophysical Union Annual Meeting',
    type: 'poster' as const,
    visibility: 'public' as const,
    featured: false,
  };

  it('validates a minimal valid presentation', () => {
    const result = presentationSchema.safeParse(minimalPresentation);
    expect(result.success).toBe(true);
  });

  it('fails when date is not ISO YYYY-MM-DD format', () => {
    const result = presentationSchema.safeParse({
      ...minimalPresentation,
      date: 'December 2025',
    });
    expect(result.success).toBe(false);
  });

  it('fails with an invalid presentation type', () => {
    const result = presentationSchema.safeParse({
      ...minimalPresentation,
      type: 'keynote',
    });
    expect(result.success).toBe(false);
  });

  it('validates an optional recording URL', () => {
    const result = presentationSchema.safeParse({
      ...minimalPresentation,
      recording: 'https://example.com/recording',
    });
    expect(result.success).toBe(true);
  });

  it('fails when recording is not a valid URL', () => {
    const result = presentationSchema.safeParse({
      ...minimalPresentation,
      recording: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });
});

// ------------------------------------------------------------------ //
// Software schema                                                     //
// ------------------------------------------------------------------ //

describe('softwareSchema', () => {
  const privateSoftwareFixture = {
    name: 'Schema Test Tool',
    summary: 'Schema validation fixture — not real software.',
    scientificProblem: 'Validates that the software schema accepts private entries.',
    status: 'private' as const,
    visibility: 'private' as const,
    featured: false,
  };

  it('validates private software without a repository', () => {
    const result = softwareSchema.safeParse(privateSoftwareFixture);
    expect(result.success).toBe(true);
  });

  it('fails when repository is present but not a valid URL', () => {
    const result = softwareSchema.safeParse({
      ...privateSoftwareFixture,
      repository: 'github.com/example/tool',
    });
    expect(result.success).toBe(false);
  });

  it('validates when repository is a valid URL', () => {
    const result = softwareSchema.safeParse({
      ...privateSoftwareFixture,
      repository: 'https://github.com/example/tool',
    });
    expect(result.success).toBe(true);
  });

  it('fails with an invalid software status', () => {
    const result = softwareSchema.safeParse({
      ...privateSoftwareFixture,
      status: 'deprecated',
    });
    expect(result.success).toBe(false);
  });
});

// ------------------------------------------------------------------ //
// Exhibit schema                                                      //
// ------------------------------------------------------------------ //

describe('exhibitSchema', () => {
  const validExhibitFixture = {
    title: 'Schema Test Exhibit',
    summary: 'Schema validation fixture — not a real exhibit.',
    researchProject: 'kilauea-lava-fountain',
    previewImage: {
      src: '/media/previews/schema-test-exhibit.webp',
      alt: 'Schema test exhibit preview image',
    },
    externalUrl: 'https://exhibits.example.com/schema-test',
    status: 'available' as const,
    visible: true,
    featured: false,
  };

  it('validates a valid external exhibit registration', () => {
    const result = exhibitSchema.safeParse(validExhibitFixture);
    expect(result.success).toBe(true);
  });

  it('fails when externalUrl is not a valid URL', () => {
    const result = exhibitSchema.safeParse({
      ...validExhibitFixture,
      externalUrl: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });

  it('enforces required preview alt text', () => {
    const result = exhibitSchema.safeParse({
      ...validExhibitFixture,
      previewImage: { src: '/media/previews/test.webp' },
    });
    expect(result.success).toBe(false);
  });

  it('does not contain any internal runtime configuration fields', () => {
    const shape = exhibitSchema.shape;
    const prohibitedFields = [
      'sceneConfig',
      'modelManifest',
      'checkpointPath',
      'mediaSequence',
      'animationStages',
      'threeJsConfig',
    ];
    for (const field of prohibitedFields) {
      expect(
        field in shape,
        `Exhibit schema must not contain runtime field: ${field}`,
      ).toBe(false);
    }
  });

  it('fails with an invalid exhibit status', () => {
    const result = exhibitSchema.safeParse({
      ...validExhibitFixture,
      status: 'preview',
    });
    expect(result.success).toBe(false);
  });
});
