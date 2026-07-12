export type Language = 'en' | 'zh' | 'bn';
export type Localized = Record<Language, string>;

export interface City {
  id: string;
  name: Localized;
  x: number;
  y: number;
  note: Localized;
}

export interface Attraction {
  id: string;
  regionId: string;
  name: Localized;
  type: Localized;
  city: Localized;
  summary: Localized;
  description: Localized;
  hours: Localized;
  ticket: Localized;
  contact: Localized;
  lastVerified: string;
  verified: boolean;
  color: string;
  icon: string;
  source: string;
  sourceUrls: string[];
  verification: Localized;
  bestSeason: Localized;
  location: {
    division: string;
    district: string;
    upazila: string;
    coordinates: { latitude: number; longitude: number } | null;
  };
  parentSite: string;
  imageUrl: string;
  imageKind: 'dataset' | 'ai' | 'none';
}

export interface Region {
  id: string;
  name: Localized;
  path: string;
  center: [number, number];
  summary: Localized;
  cities: City[];
}
