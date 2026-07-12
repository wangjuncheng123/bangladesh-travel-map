import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('regional scenic travel theme', () => {
  const app = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

  it('states the scenic destination theme in all three languages', () => {
    expect(app).toContain("title: 'Bangladesh Scenic Guide'");
    expect(app).toContain("title: '孟加拉风景名胜指南'");
    expect(app).toContain("title: 'বাংলাদেশের দর্শনীয় স্থান'");
  });

  it('describes a region-by-region travel guide', () => {
    expect(app).toContain('A region-by-region guide');
    expect(app).toContain('探索孟加拉各地区的自然风光、历史古迹与特色旅行地。');
    expect(app).toContain('অঞ্চলভিত্তিকভাবে বাংলাদেশের');
  });

  it('uses the travel guide theme in page metadata', () => {
    expect(html).toContain('Bangladesh Scenic Guide — Regional Travel Map');
    expect(html).toContain('scenic landmarks, heritage sites and travel destinations');
  });
});
