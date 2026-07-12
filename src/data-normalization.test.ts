import { describe, expect, it } from 'vitest';
import { resolveRegionId } from '../scripts/attraction-data.mjs';

describe('attraction data normalization', () => {
  it('uses the first listed division for a cross-division place on the map', () => {
    expect(resolveRegionId('Rajshahi, Khulna')).toBe('rajshahi');
  });
});
