import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('map pointer interaction', () => {
  it('keeps decorative map layers from intercepting region clicks', () => {
    const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
    const mapGridRule = css.match(/\.map-grid\s*\{([^}]+)\}/)?.[1] ?? '';

    expect(mapGridRule).toContain('pointer-events: none');
  });

  it('uses a standard click handler for every selectable map region', () => {
    const source = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');

    expect(source).toContain('onClick={() => onSelect(id)}');
    expect(source).toContain('onPointerDown={() => onSelect(id)}');
  });

  it('uses the SVG viewport for projected region zoom transforms', () => {
    const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
    const transformRule = css.match(/\.country-transform\s*\{([^}]+)\}/)?.[1] ?? '';

    expect(transformRule).toContain('transform-box: view-box');
  });

  it('uses an SVG transform attribute so selected maps remain visible on mobile browsers', () => {
    const source = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');

    expect(source).toContain('<g className="country-transform" transform={transform}>');
    expect(source).not.toContain('<g className="country-transform" style={{ transform }}>');
  });

  it('does not apply a drop-shadow filter to the full country geometry group', () => {
    const source = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');

    expect(source).not.toContain('<g filter="url(#mapShadow)">');
  });

  it('caps the Chinese hero title on tablet and mobile layouts', () => {
    const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');

    expect(css).toContain('.hero h1 { font-size: clamp(38px, 8vw, 54px); }');
    expect(css).toContain(':lang(zh-CN) .hero h1 { font-size: clamp(36px, 7.5vw, 50px); }');
  });

  it('keeps the hero title area free of the journey kicker', () => {
    const source = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');

    expect(source).not.toContain('<span className="eyebrow"><span className="red-dot" />{t.kicker}</span>');
  });

  it('keeps the map prominent and removes the retired footer', () => {
    const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
    const source = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');

    expect(css).toContain('.map-stage { height: min(78vh, 650px); margin-top: -25px; }');
    expect(source).not.toContain('<footer>');
  });

  it('allows vertically scrolling the full page on mobile', () => {
    const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');

    expect(css).toContain('.app { min-height: 100vh; overflow-x: hidden; }');
    expect(css).not.toContain('.app { min-height: 100vh; overflow: hidden; }');
  });
});
