import type { Feature, FeatureCollection, Geometry } from 'geojson';
import countriesRaw from './geo/south-asia-countries.geojson?raw';
import divisionsRaw from './geo/bangladesh-divisions.geojson?raw';

export interface CountryProperties {
  ADMIN: string;
  ADM0_A3: string;
  NAME: string;
}

export interface DivisionProperties {
  shapeName: string;
  shapeISO: string;
  shapeID: string;
}

export const countryBoundaries = JSON.parse(countriesRaw) as FeatureCollection<Geometry, CountryProperties>;
const rawDivisionBoundaries = JSON.parse(divisionsRaw) as FeatureCollection<Geometry, DivisionProperties>;

function reverseRings(geometry: Geometry): Geometry {
  if (geometry.type === 'Polygon') {
    return { ...geometry, coordinates: geometry.coordinates.map(ring => [...ring].reverse()) };
  }
  if (geometry.type === 'MultiPolygon') {
    return {
      ...geometry,
      coordinates: geometry.coordinates.map(polygon => polygon.map(ring => [...ring].reverse())),
    };
  }
  return geometry;
}

// d3-geo uses spherical winding opposite to RFC 7946 GeoJSON. Reversing the
// rings prevents each division from being interpreted as the rest of Earth.
export const divisionBoundaries: FeatureCollection<Geometry, DivisionProperties> = {
  ...rawDivisionBoundaries,
  features: rawDivisionBoundaries.features.map(feature => ({
    ...feature,
    geometry: reverseRings(feature.geometry),
  })),
};

const divisionNameToId: Record<string, string> = {
  Chittagong: 'chattogram',
  Dhaka: 'dhaka',
  Mymensingh: 'mymensingh',
  Rajshani: 'rajshahi',
  Rangpur: 'rangpur',
  Sylhet: 'sylhet',
  Khulna: 'khulna',
  Barisal: 'barishal',
};

export function getDivisionId(feature: Feature<Geometry, DivisionProperties>): string {
  return divisionNameToId[feature.properties.shapeName] ?? feature.properties.shapeName.toLowerCase();
}
