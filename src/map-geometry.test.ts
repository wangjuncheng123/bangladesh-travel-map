import { existsSync, readFileSync } from 'node:fs';
import { geoMercator, geoPath } from 'd3-geo';
import { describe, expect, it } from 'vitest';
import { countryBoundaries, divisionBoundaries } from './geo-data';

const countriesPath = new URL('./geo/south-asia-countries.geojson', import.meta.url);
const divisionsPath = new URL('./geo/bangladesh-divisions.geojson', import.meta.url);

describe('real map geometry', () => {
  it('ships local country and division boundary data', () => {
    expect(existsSync(countriesPath)).toBe(true);
    expect(existsSync(divisionsPath)).toBe(true);
  });

  it('includes Bangladesh and its surrounding countries', () => {
    const data = JSON.parse(readFileSync(countriesPath, 'utf8'));
    const codes = data.features.map((feature: { properties: { ADM0_A3: string } }) => feature.properties.ADM0_A3);
    expect(codes).toEqual(expect.arrayContaining(['BGD', 'IND', 'MMR', 'NPL', 'BTN']));
  });

  it('includes the eight Bangladesh divisions with detailed geometry', () => {
    const data = JSON.parse(readFileSync(divisionsPath, 'utf8'));
    expect(data.features).toHaveLength(8);
    for (const feature of data.features) {
      expect(JSON.stringify(feature.geometry).length).toBeGreaterThan(1000);
    }
  });

  it('projects every division inside the Bangladesh map viewport', () => {
    const projection = geoMercator().center([90.15, 24.3]).scale(3850).translate([380, 365]);
    const path = geoPath(projection);

    for (const feature of divisionBoundaries.features) {
      const [[left, top], [right, bottom]] = path.bounds(feature);
      expect(right - left).toBeLessThan(760);
      expect(bottom - top).toBeLessThan(720);
    }
  });

  it('attributes both geographic boundary sources in the interface', () => {
    const source = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');
    expect(source).toContain('Natural Earth');
    expect(source).toContain('geoBoundaries');
  });

  it('makes Bangladesh the dominant shape in the map viewport', () => {
    const source = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');
    const scale = Number(source.match(/geoMercator\(\).*?\.scale\((\d+)\)/s)?.[1]);
    const projection = geoMercator().center([90.15, 24.3]).scale(scale).translate([380, 365]);
    const bangladesh = countryBoundaries.features.find(feature => feature.properties.ADM0_A3 === 'BGD');
    expect(bangladesh).toBeTruthy();

    const [[, top], [, bottom]] = geoPath(projection).bounds(bangladesh!);
    expect((bottom - top) / 720).toBeGreaterThan(0.9);
  });

  it('uses the division geometry itself as the Bangladesh outer border', () => {
    const source = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');
    expect(source).toContain('id="neighbor-border-mask"');
    expect(source).toContain('mask="url(#neighbor-border-mask)"');
    expect(source).not.toContain('className="homeland-outline"');
  });
});
