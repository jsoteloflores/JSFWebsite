import { describe, it, expect } from 'vitest';
import { navigation } from '../src/utils/navigation';

const REQUIRED_ROUTES = [
  '/',
  '/about',
  '/research',
  '/publications',
  '/presentations',
  '/software',
];

describe('navigation', () => {
  it('contains all required routes', () => {
    const hrefs = navigation.map((item) => item.href);
    for (const route of REQUIRED_ROUTES) {
      expect(hrefs, `Missing required route: ${route}`).toContain(route);
    }
  });

  it('has unique labels', () => {
    const labels = navigation.map((item) => item.label);
    const unique = new Set(labels);
    expect(unique.size).toBe(labels.length);
  });

  it('has unique hrefs', () => {
    const hrefs = navigation.map((item) => item.href);
    const unique = new Set(hrefs);
    expect(unique.size).toBe(hrefs.length);
  });

  it('all internal routes begin with /', () => {
    for (const item of navigation) {
      expect(item.href, `Route "${item.label}" does not start with /`).toMatch(/^\//);
    }
  });
});

describe('design tokens', () => {
  it('token names do not contain the word "blue"', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const tokensPath = path.join(process.cwd(), 'src/styles/tokens.css');
    const content = fs.readFileSync(tokensPath, 'utf-8');

    // Extract all CSS custom property names
    const tokenNames = [...content.matchAll(/--[\w-]+/g)].map((m) => m[0]);

    const blueTokens = tokenNames.filter((name) => name.toLowerCase().includes('blue'));
    expect(
      blueTokens,
      `Found prohibited blue token names: ${blueTokens.join(', ')}`,
    ).toHaveLength(0);
  });
});
