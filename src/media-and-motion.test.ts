import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const app = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');
const generator = readFileSync(new URL('../scripts/generate-attractions.mjs', import.meta.url), 'utf8');

describe('scenic-media and carousel behavior', () => {
  it('shows archived AI illustrations with a visible disclosure label', () => {
    expect(generator).toContain('generatedImagePath(record.id)');
    expect(generator).toContain('const relativePath = `generated/${id}.jpg`;');
    expect(generator).toContain("imageKind: aiImageUrl ? 'ai' : 'none'");
    expect(app).toContain('function PlaceVisual');
    expect(app).toContain("place.imageKind === 'ai' ? 'AI GENERATED ILLUSTRATION'");
  });

  it('keeps the carousel moving unless the visitor is actively dragging it', () => {
    expect(app).toContain('el.scrollLeft += (64 * dt) / 1000;');
    expect(app).not.toContain('onMouseEnter={() => setPaused(true)}');
  });

  it('makes each scenic image enter a shareable place address on double-click', () => {
    expect(app).toContain("window.location.hash = `place/${place.id}`");
    expect(app).toContain('function getStoryFromHash()');
    expect(app).toContain('href={`#place/${place.id}`}');
    expect(app).toContain('onDoubleClick={e => { if (drag.current.moved < 6) window.location.hash = `place/${place.id}`; }}');
    expect(app).not.toContain('<button>{t.details}<ArrowRight size={15} /></button>');
  });

  it('keeps the image link from turning decorative frame corners blue', () => {
    const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');

    expect(css).toContain('.card-visual-link { display: block; cursor: pointer; color: inherit; text-decoration: none; }');
  });

  it('does not show decorative corner frames over scenic images', () => {
    const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');

    expect(css).toContain('.frame-corner { display: none; }');
  });
});
