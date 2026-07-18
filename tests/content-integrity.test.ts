import { describe, it, expect } from 'vitest';
import {
  checkRelationships,
  checkDuplicateIds,
  checkBacklinks,
  checkVisibilitySafety,
  runAllChecks,
  type CollectionData,
} from '../src/utils/content-integrity';
import type {
  ProjectFrontmatter,
  PublicationFrontmatter,
  PresentationFrontmatter,
  SoftwareFrontmatter,
  ExhibitFrontmatter,
} from '../src/types/content-schemas';

// ------------------------------------------------------------------ //
// Minimal valid fixtures (clearly labeled as test data)              //
// ------------------------------------------------------------------ //

const testProject: ProjectFrontmatter = {
  title: 'Integrity Test Project',
  subtitle: 'Test fixture — not real content',
  summary: 'Used for content-integrity unit tests.',
  status: 'active',
  startDate: '2025-01',
  researchThemes: ['test'],
  featured: false,
  visibility: 'public',
};

const testPublication: PublicationFrontmatter = {
  title: 'Integrity Test Publication',
  authors: [{ name: 'Test Author', isJoel: true }],
  year: 2025,
  type: 'journal-article',
  status: 'in-preparation',
  visibility: 'private',
  featured: false,
};

const testPresentation: PresentationFrontmatter = {
  title: 'Integrity Test Presentation',
  authors: [{ name: 'Test Author', isJoel: true }],
  date: '2025-12-09',
  event: 'Test Conference',
  type: 'poster',
  visibility: 'public',
  featured: false,
};

const testSoftware: SoftwareFrontmatter = {
  name: 'Integrity Test Tool',
  summary: 'Test fixture.',
  scientificProblem: 'Validates integrity module.',
  status: 'experimental',
  visibility: 'private',
  featured: false,
};

const testExhibit: ExhibitFrontmatter = {
  title: 'Integrity Test Exhibit',
  summary: 'Test fixture — not a real exhibit.',
  researchProject: 'test-project',
  previewImage: { src: '/test.webp', alt: 'Test exhibit preview' },
  externalUrl: 'https://exhibits.example.com/test',
  status: 'available',
  visible: true,
  featured: false,
};

function emptyData(): CollectionData {
  return {
    projects: new Map(),
    publications: new Map(),
    presentations: new Map(),
    software: new Map(),
    exhibits: new Map(),
  };
}

// ------------------------------------------------------------------ //
// 1. Empty collections pass                                           //
// ------------------------------------------------------------------ //

describe('empty collections', () => {
  it('produce zero issues', () => {
    const data = emptyData();
    const issues = runAllChecks(data, {
      projects: [],
      publications: [],
      presentations: [],
      software: [],
      exhibits: [],
    });
    expect(issues).toHaveLength(0);
  });
});

// ------------------------------------------------------------------ //
// 2. Valid relationships pass                                         //
// ------------------------------------------------------------------ //

describe('valid relationships', () => {
  it('publication with valid relatedProject passes', () => {
    const data = emptyData();
    data.projects.set('test-project', testProject);
    data.publications.set('test-pub', {
      ...testPublication,
      relatedProject: 'test-project',
    });
    const issues = checkRelationships(data);
    expect(issues).toHaveLength(0);
  });
});

// ------------------------------------------------------------------ //
// 3. Missing publication relatedProject fails                        //
// ------------------------------------------------------------------ //

describe('missing references', () => {
  it('missing publication relatedProject is reported', () => {
    const data = emptyData();
    data.publications.set('test-pub', {
      ...testPublication,
      relatedProject: 'nonexistent-project',
    });
    const issues = checkRelationships(data);
    expect(issues.some((i) => i.source === 'publications/test-pub')).toBe(true);
    expect(issues.some((i) => i.kind === 'missing-reference')).toBe(true);
    expect(issues.some((i) => i.message.includes('nonexistent-project'))).toBe(true);
  });

  it('missing presentation relatedProject is reported', () => {
    const data = emptyData();
    data.presentations.set('test-pres', {
      ...testPresentation,
      relatedProject: 'missing-project',
    });
    const issues = checkRelationships(data);
    expect(issues.some((i) => i.source === 'presentations/test-pres')).toBe(true);
    expect(issues.some((i) => i.message.includes('missing-project'))).toBe(true);
  });

  it('missing software project AND publication references are both reported', () => {
    const data = emptyData();
    data.software.set('test-sw', {
      ...testSoftware,
      relatedProjects: ['missing-project'],
      relatedPublications: ['missing-pub'],
    });
    const issues = checkRelationships(data);
    const swIssues = issues.filter((i) => i.source === 'software/test-sw');
    expect(swIssues.length).toBeGreaterThanOrEqual(2);
    expect(swIssues.some((i) => i.message.includes('missing-project'))).toBe(true);
    expect(swIssues.some((i) => i.message.includes('missing-pub'))).toBe(true);
  });

  it('missing project exhibit reference fails', () => {
    const data = emptyData();
    data.projects.set('test-project', {
      ...testProject,
      relatedExhibit: 'nonexistent-exhibit',
    });
    const issues = checkRelationships(data);
    expect(issues.some((i) => i.source === 'projects/test-project')).toBe(true);
    expect(issues.some((i) => i.message.includes('nonexistent-exhibit'))).toBe(true);
  });

  it('missing exhibit researchProject fails', () => {
    const data = emptyData();
    data.exhibits.set('test-exhibit', {
      ...testExhibit,
      researchProject: 'nonexistent-project',
    });
    const issues = checkRelationships(data);
    expect(issues.some((i) => i.source === 'exhibits/test-exhibit')).toBe(true);
    expect(issues.some((i) => i.message.includes('nonexistent-project'))).toBe(true);
  });

  it('multiple errors are returned together, not just the first', () => {
    const data = emptyData();
    data.publications.set('pub-a', { ...testPublication, relatedProject: 'missing-a' });
    data.publications.set('pub-b', { ...testPublication, relatedProject: 'missing-b' });
    const issues = checkRelationships(data);
    expect(issues.length).toBeGreaterThanOrEqual(2);
  });
});

// ------------------------------------------------------------------ //
// 8. Backlink mismatch fails                                          //
// ------------------------------------------------------------------ //

describe('backlink checks', () => {
  it('project/exhibit backlink mismatch is reported', () => {
    const data = emptyData();
    data.projects.set('project-a', { ...testProject, relatedExhibit: 'exhibit-x' });
    data.projects.set('project-b', testProject);
    // exhibit-x points to project-b, not project-a
    data.exhibits.set('exhibit-x', {
      ...testExhibit,
      researchProject: 'project-b',
    });
    const issues = checkBacklinks(data);
    expect(issues.some((i) => i.kind === 'backlink-mismatch')).toBe(true);
    expect(issues.some((i) => i.source === 'projects/project-a')).toBe(true);
  });

  it('correct backlink produces no issues', () => {
    const data = emptyData();
    data.projects.set('project-a', { ...testProject, relatedExhibit: 'exhibit-x' });
    data.exhibits.set('exhibit-x', {
      ...testExhibit,
      researchProject: 'project-a',
    });
    const issues = checkBacklinks(data);
    expect(issues).toHaveLength(0);
  });
});

// ------------------------------------------------------------------ //
// 9. Duplicate IDs fail                                               //
// ------------------------------------------------------------------ //

describe('duplicate IDs', () => {
  it('duplicate IDs within a collection are reported', () => {
    const issues = checkDuplicateIds({
      projects: ['project-a', 'project-a', 'project-b'],
      publications: [],
      presentations: [],
      software: [],
      exhibits: [],
    });
    expect(issues.some((i) => i.kind === 'duplicate-id')).toBe(true);
    expect(issues.some((i) => i.message.includes('project-a'))).toBe(true);
  });

  it('unique IDs produce no issues', () => {
    const issues = checkDuplicateIds({
      projects: ['alpha', 'beta', 'gamma'],
      publications: ['pub-1'],
      presentations: [],
      software: [],
      exhibits: [],
    });
    expect(issues).toHaveLength(0);
  });
});

// ------------------------------------------------------------------ //
// 10. Unavailable visible exhibit fails                               //
// ------------------------------------------------------------------ //

describe('visibility safety', () => {
  it('visible exhibit with status unavailable is reported', () => {
    const data = emptyData();
    data.exhibits.set('test-exhibit', {
      ...testExhibit,
      visible: true,
      status: 'unavailable',
    });
    const issues = checkVisibilitySafety(data);
    expect(issues.some((i) => i.kind === 'visibility-safety')).toBe(true);
    expect(issues.some((i) => i.source === 'exhibits/test-exhibit')).toBe(true);
  });

  it('visible exhibit with status available produces no issue', () => {
    const data = emptyData();
    data.exhibits.set('test-exhibit', {
      ...testExhibit,
      visible: true,
      status: 'available',
    });
    const issues = checkVisibilitySafety(data);
    expect(issues.filter((i) => i.kind === 'visibility-safety')).toHaveLength(0);
  });

  it('hidden exhibit with unavailable status produces no issue', () => {
    const data = emptyData();
    data.exhibits.set('test-exhibit', {
      ...testExhibit,
      visible: false,
      status: 'unavailable',
    });
    const issues = checkVisibilitySafety(data);
    expect(issues.filter((i) => i.kind === 'visibility-safety')).toHaveLength(0);
  });

  // 11. file:/// URL in a public record fails
  it('public record with file:/// URL is reported', () => {
    const data = emptyData();
    data.publications.set('bad-pub', {
      ...testPublication,
      visibility: 'public',
      url: 'file:///Users/joel/Desktop/paper.pdf',
    });
    const issues = checkVisibilitySafety(data);
    expect(issues.some((i) => i.kind === 'unsafe-url')).toBe(true);
  });

  it('private record with file:/// URL does not trigger unsafe-url check', () => {
    const data = emptyData();
    data.publications.set('private-pub', {
      ...testPublication,
      visibility: 'private',
      url: 'file:///local/draft.pdf',
    });
    const issues = checkVisibilitySafety(data);
    expect(issues.filter((i) => i.kind === 'unsafe-url')).toHaveLength(0);
  });

  it('public record with HTTPS URL is not flagged', () => {
    const data = emptyData();
    data.publications.set('public-pub', {
      ...testPublication,
      visibility: 'public',
      url: 'https://doi.org/10.1016/j.jvolgeores.2025.000000',
    });
    const issues = checkVisibilitySafety(data);
    expect(issues.filter((i) => i.kind === 'unsafe-url')).toHaveLength(0);
  });

  it('public record with HTTP URL is not flagged', () => {
    const data = emptyData();
    data.publications.set('public-pub-http', {
      ...testPublication,
      visibility: 'public',
      url: 'http://example.com/paper.pdf',
    });
    const issues = checkVisibilitySafety(data);
    expect(issues.filter((i) => i.kind === 'unsafe-url')).toHaveLength(0);
  });

  // 12. Multiple errors returned together
  it('multiple visibility errors are all returned', () => {
    const data = emptyData();
    data.exhibits.set('exhibit-a', {
      ...testExhibit,
      visible: true,
      status: 'unavailable',
    });
    data.exhibits.set('exhibit-b', {
      ...testExhibit,
      visible: true,
      status: 'unavailable',
    });
    const issues = checkVisibilitySafety(data);
    expect(
      issues.filter((i) => i.kind === 'visibility-safety').length,
    ).toBeGreaterThanOrEqual(2);
  });
});
