import { describe, expect, it } from 'vitest';
import { attractions, regions } from './data';

describe('travel map content', () => {
  it('contains all eight Bangladesh divisions', () => {
    expect(regions).toHaveLength(8);
    expect(new Set(regions.map(region => region.id)).size).toBe(8);
  });

  it('provides trilingual region and city names', () => {
    for (const region of regions) {
      expect(region.name.en).toBeTruthy();
      expect(region.name.zh).toBeTruthy();
      expect(region.name.bn).toBeTruthy();
      expect(region.cities.length).toBeGreaterThan(0);
      for (const city of region.cities) {
        expect(Object.values(city.name).every(Boolean)).toBe(true);
      }
    }
  });

  it('gives every region at least one attraction', () => {
    for (const region of regions) {
      expect(attractions.some(place => place.regionId === region.id)).toBe(true);
    }
  });

  it('keeps every attraction traceable and trilingual', () => {
    const regionIds = new Set(regions.map(region => region.id));
    for (const place of attractions) {
      expect(regionIds.has(place.regionId)).toBe(true);
      expect(Object.values(place.name).every(Boolean)).toBe(true);
      expect(Object.values(place.summary).every(Boolean)).toBe(true);
      expect(Object.values(place.description).every(Boolean)).toBe(true);
      expect(place.source).toBeTruthy();
      expect(place.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
