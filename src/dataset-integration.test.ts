import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { attractions } from './data';

describe('generated attraction dataset', () => {
  it('loads the full CSV attraction catalogue', () => {
    expect(attractions.length).toBeGreaterThan(100);
  });

  it('covers all eight Bangladesh divisions', () => {
    const regionIds = new Set(attractions.map(place => place.regionId));
    expect(regionIds).toEqual(new Set(['barishal', 'chattogram', 'dhaka', 'khulna', 'mymensingh', 'rajshahi', 'rangpur', 'sylhet']));
  });

  it('regenerates website data before development, testing and builds', () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    expect(pkg.scripts['generate:data']).toBeTruthy();
    expect(pkg.scripts.dev).toContain('generate:data');
    expect(pkg.scripts.test).toContain('generate:data');
    expect(pkg.scripts.build).toContain('generate:data');
  });

  it('assigns a multi-division attraction to its first listed division', () => {
    const bridge = attractions.find(place => place.name.en === 'Hardinge Bridge');
    expect(bridge?.regionId).toBe('rajshahi');
    expect(bridge?.location.division).toBe('Rajshahi, Khulna');
  });

  it('preserves location, season, verification and source links from the CSV', () => {
    const sundarbans = attractions.find(place => place.id === 'BD-POI-0001');

    expect(sundarbans?.location.division).toBe('Khulna');
    expect(sundarbans?.location.coordinates).toEqual({ latitude: 21.75, longitude: 88.75 });
    expect(sundarbans?.bestSeason.en).toContain('November');
    expect(sundarbans?.verification.en).toContain('verified');
    expect(sundarbans?.sourceUrls).toContain('https://whc.unesco.org/en/list/798');
  });
});
