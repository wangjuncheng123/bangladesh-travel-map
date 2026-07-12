import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const app = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');

describe('data-backed attraction details', () => {
  it('renders the additional location, season, verification and source fields', () => {
    expect(app).toContain('place.bestSeason[lang]');
    expect(app).toContain('place.location.coordinates');
    expect(app).toContain('place.verification[lang]');
    expect(app).toContain('place.sourceUrls.map');
  });
});
