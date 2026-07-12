import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Compass, ExternalLink, Info, MapPin, MousePointer2, Pause, X } from 'lucide-react';
import { geoMercator, geoPath } from 'd3-geo';
import { attractions, regions } from './data';
import { countryBoundaries, divisionBoundaries, getDivisionId } from './geo-data';
import type { Attraction, Language } from './types';

const ui = {
  en: {
    title: 'Bangladesh Scenic Guide', intro: 'A region-by-region guide to Bangladesh’s scenic landmarks, heritage sites and memorable travel destinations.',
    select: 'Select a region', cities: 'Cities & gateways', places: 'Scenic places to visit', drag: 'Drag to explore', auto: 'Auto drifting',
    details: 'Discover this place', full: 'Read the full story', close: 'Close', verified: 'Verified', pending: 'Pending verification',
    hours: 'Opening hours', ticket: 'Tickets', contact: 'Contact', source: 'Source', checked: 'Last checked', back: 'Back to map',
    location: 'Location', season: 'Best season', coordinates: 'Coordinates', verification: 'Verification', sources: 'Source links', unavailable: 'Not provided',
    noImage: 'Official image pending', story: 'The story', facts: 'Visitor information', map: 'Return to all regions',
  },
  zh: {
    title: '孟加拉风景名胜指南', intro: '探索孟加拉各地区的自然风光、历史古迹与特色旅行地。',
    select: '选择地区', cities: '城市与门户', places: '地区风景名胜', drag: '拖动浏览', auto: '自动漫游',
    details: '发现这个地方', full: '阅读完整介绍', close: '关闭', verified: '已核实', pending: '待核实',
    hours: '开放时间', ticket: '门票', contact: '联系方式', source: '数据来源', checked: '最后核实', back: '返回地图',
    location: '位置', season: '最佳季节', coordinates: '坐标', verification: '核实状态', sources: '来源链接', unavailable: '暂未提供',
    noImage: '官方图片待确认', story: '景点故事', facts: '游客信息', map: '返回全部地区',
  },
  bn: {
    title: 'বাংলাদেশের দর্শনীয় স্থান', intro: 'অঞ্চলভিত্তিকভাবে বাংলাদেশের প্রাকৃতিক সৌন্দর্য, ঐতিহ্য ও দর্শনীয় ভ্রমণস্থান খুঁজে দেখুন।',
    select: 'অঞ্চল বেছে নিন', cities: 'শহর ও প্রবেশদ্বার', places: 'দর্শনীয় স্থানসমূহ', drag: 'টেনে দেখুন', auto: 'স্বয়ংক্রিয় ভ্রমণ',
    details: 'স্থানটি জানুন', full: 'পুরো গল্প পড়ুন', close: 'বন্ধ করুন', verified: 'যাচাইকৃত', pending: 'যাচাই বাকি',
    hours: 'খোলার সময়', ticket: 'টিকিট', contact: 'যোগাযোগ', source: 'তথ্যসূত্র', checked: 'শেষ যাচাই', back: 'মানচিত্রে ফিরুন',
    location: 'অবস্থান', season: 'ভ্রমণের উপযুক্ত সময়', coordinates: 'স্থানাঙ্ক', verification: 'যাচাই অবস্থা', sources: 'উৎস লিংক', unavailable: 'এখনও দেওয়া হয়নি',
    noImage: 'সরকারি ছবি যাচাই বাকি', story: 'স্থানের গল্প', facts: 'ভ্রমণ তথ্য', map: 'সব অঞ্চলে ফিরুন',
  },
};

const langs: { id: Language; label: string }[] = [
  { id: 'en', label: 'EN' }, { id: 'zh', label: '中文' }, { id: 'bn', label: 'বাংলা' },
];

function NoImage({ place, lang, large = false }: { place: Attraction; lang: Language; large?: boolean }) {
  return (
    <div className={`no-image ${large ? 'no-image--large' : ''}`} style={{ '--place-color': place.color } as React.CSSProperties}>
      <div className="grain" />
      <span className="place-symbol" aria-hidden="true">{place.icon}</span>
      <span className="no-image-label">{ui[lang].noImage}</span>
      <span className="frame-corner frame-corner--a" /><span className="frame-corner frame-corner--b" />
    </div>
  );
}

function PlaceVisual({ place, lang, large = false }: { place: Attraction; lang: Language; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!place.imageUrl || failed) return <NoImage place={place} lang={lang} large={large} />;
  return <div className={`place-image ${large ? 'place-image--large' : ''}`}>
    <img src={place.imageUrl} alt={place.name[lang]} loading={large ? 'eager' : 'lazy'} onError={() => setFailed(true)} />
    <span className="image-credit">{place.imageKind === 'ai' ? 'AI GENERATED ILLUSTRATION' : 'SOURCE IMAGE · DATASET PROVIDED'}</span>
    <span className="frame-corner frame-corner--a" /><span className="frame-corner frame-corner--b" />
  </div>;
}

function sourceLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function BangladeshMap({ selected, onSelect, lang }: { selected: string | null; onSelect: (id: string) => void; lang: Language }) {
  const selectedRegion = regions.find(r => r.id === selected);
  const projection = useMemo(() => geoMercator().center([90.15, 24.3]).scale(6100).translate([380, 365]), []);
  const path = useMemo(() => geoPath(projection), [projection]);
  const selectedFeature = divisionBoundaries.features.find(feature => getDivisionId(feature) === selected);
  const selectedCenter = selectedFeature ? path.centroid(selectedFeature) : [380, 365];
  const transform = selectedRegion
    ? `translate(${380 - selectedCenter[0] * 1.08} ${360 - selectedCenter[1] * 1.08}) scale(1.08)`
    : 'translate(0 0) scale(1)';
  const cityCoordinates: Record<string, [number, number]> = {
    'rangpur-city': [89.25, 25.74], dinajpur: [88.64, 25.63], 'rajshahi-city': [88.60, 24.37], bogura: [89.37, 24.85],
    'mymensingh-city': [90.41, 24.75], 'sylhet-city': [91.87, 24.89], srimangal: [91.73, 24.31], 'dhaka-city': [90.41, 23.81],
    narayanganj: [90.50, 23.62], 'khulna-city': [89.54, 22.85], bagerhat: [89.79, 22.66], 'barishal-city': [90.37, 22.70],
    'chattogram-city': [91.83, 22.36], coxsbazar: [91.98, 21.43],
  };
  const countryLabels = [
    { code: 'IND', name: 'INDIA', at: [87.0, 25.0] as [number, number] },
    { code: 'NPL', name: 'NEPAL', at: [85.5, 27.9] as [number, number] },
    { code: 'BTN', name: 'BHUTAN', at: [90.5, 27.6] as [number, number] },
    { code: 'MMR', name: 'MYANMAR', at: [93.5, 22.4] as [number, number] },
  ];

  return (
    <div className="map-stage" aria-label="Interactive map of Bangladesh">
      <div className="map-grid" />
      <svg className="map-svg" viewBox="0 0 760 720" role="img" aria-label="Bangladesh regions">
        <desc>Boundary data: Natural Earth and geoBoundaries.</desc>
        <defs>
          <pattern id="riverPattern" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M-5 15 Q 6 5 18 15 T 41 15" fill="none" stroke="rgba(255,255,255,.035)" strokeWidth="1" /></pattern>
          <mask id="neighbor-border-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="760" height="720">
            <rect x="0" y="0" width="760" height="720" fill="white" />
            {divisionBoundaries.features.map(feature => (
              <path key={`mask-${getDivisionId(feature)}`} d={path(feature) ?? undefined} fill="black" stroke="black" strokeWidth="7" />
            ))}
          </mask>
        </defs>
        <g className="country-transform" transform={transform}>
          <g>
            <g mask="url(#neighbor-border-mask)">
              {countryBoundaries.features.filter(feature => feature.properties.ADM0_A3 !== 'BGD').map(feature => (
                <path key={feature.properties.ADM0_A3} d={path(feature) ?? undefined} className="neighbor-country" />
              ))}
            </g>
            {divisionBoundaries.features.map(feature => {
              const id = getDivisionId(feature);
              const region = regions.find(item => item.id === id);
              return <path key={id} d={path(feature) ?? undefined}
                data-region-id={id}
                className={`region-shape ${selected === id ? 'is-selected' : ''} ${selected && selected !== id ? 'is-muted' : ''}`}
                tabIndex={0} role="button" aria-label={region?.name[lang] ?? feature.properties.shapeName}
                onPointerDown={() => onSelect(id)}
                onClick={() => onSelect(id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onSelect(id); }} />;
            })}
          </g>
          {divisionBoundaries.features.map(feature => {
            const id = getDivisionId(feature);
            const region = regions.find(item => item.id === id);
            const [x, y] = path.centroid(feature);
            return <text key={`${id}-label`} x={x} y={y} className={`region-label ${selected && selected !== id ? 'is-muted' : ''}`}>{region?.name[lang] ?? feature.properties.shapeName}</text>;
          })}
          {selectedRegion?.cities.map(city => (
            <g key={city.id} className="city-marker" transform={`translate(${projection(cityCoordinates[city.id] ?? [90.41, 23.81])?.join(' ')})`}>
              <circle r="4" /><circle className="city-ring" r="9" />
              <text x="13" y="4">{city.name[lang]}</text>
            </g>
          ))}
          <g className="neighbor-labels" aria-hidden="true">
            {countryLabels.map(label => { const point = projection(label.at); return point ? <text key={label.code} x={point[0]} y={point[1]}>{label.name}</text> : null; })}
            {(() => { const point = projection([90.2, 20.4]); return point ? <text x={point[0]} y={point[1]}>BAY OF BENGAL</text> : null; })()}
          </g>
        </g>
      </svg>
      <div className="map-compass" aria-hidden="true"><span>N</span><Compass size={22} /></div>
      <div className="map-scale" aria-hidden="true"><span />100 km</div>
    </div>
  );
}

function Filmstrip({ items, lang, compact = false }: { items: Attraction[]; lang: Language; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, lastX: 0, lastT: 0, velocity: 0, moved: 0 });
  const raf = useRef<number>(0);
  const [isDragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const t = ui[lang];

  useEffect(() => {
    const el = ref.current;
    if (!el || items.length < 2 || isDragging || paused) return;
    let last = performance.now();
    const move = (now: number) => {
      const dt = Math.min(now - last, 40); last = now;
      el.scrollLeft += (64 * dt) / 1000;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) el.scrollLeft = 0;
      raf.current = requestAnimationFrame(move);
    };
    raf.current = requestAnimationFrame(move);
    return () => cancelAnimationFrame(raf.current);
  }, [items, isDragging, paused]);

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false; setDragging(false);
    const el = ref.current; if (!el) return;
    let velocity = Math.max(-2.2, Math.min(2.2, drag.current.velocity));
    let last = performance.now();
    const inertia = (now: number) => {
      const dt = Math.min(now - last, 32); last = now;
      el.scrollLeft -= velocity * dt;
      velocity *= Math.pow(0.95, dt / 16.67);
      if (Math.abs(velocity) > 0.01) raf.current = requestAnimationFrame(inertia);
      else window.setTimeout(() => setPaused(false), 1800);
    };
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(inertia);
  };

  return (
    <section className={`film-section ${compact ? 'film-section--compact' : ''}`} aria-labelledby="places-heading">
      <div className="section-head">
        <div><span className="eyebrow">CURATED HIGHLIGHTS</span><h2 id="places-heading">{t.places}</h2></div>
        <div className="film-hint"><MousePointer2 size={15} /> {t.drag}<span /> <Pause size={13} /> {t.auto}</div>
      </div>
      <div className="film-mask">
        <div ref={ref} className={`filmstrip ${isDragging ? 'is-dragging' : ''}`}
          onPointerDown={e => { const el = ref.current; if (!el) return; cancelAnimationFrame(raf.current); drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, lastX: e.clientX, lastT: performance.now(), velocity: 0, moved: 0 }; setDragging(true); setPaused(true); el.setPointerCapture(e.pointerId); }}
          onPointerMove={e => { const el = ref.current; if (!el || !drag.current.active) return; const now = performance.now(); const dx = e.clientX - drag.current.lastX; const dt = Math.max(1, now - drag.current.lastT); drag.current.velocity = dx / dt; drag.current.moved += Math.abs(dx); el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX); drag.current.lastX = e.clientX; drag.current.lastT = now; }}
          onPointerUp={endDrag} onPointerCancel={endDrag}>
          {items.map((place, index) => (
            <article key={place.id} className="place-card">
              <div className="film-perf film-perf--top" /><a href={`#place/${place.id}`} className="card-visual-link" aria-label={place.name[lang]} onClick={e => e.preventDefault()} onDoubleClick={e => { if (drag.current.moved < 6) window.location.hash = `place/${place.id}`; }}><PlaceVisual place={place} lang={lang} /></a>
              <div className="card-copy"><div className="card-meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{place.type[lang]}</span></div><h3>{place.name[lang]}</h3><p><MapPin size={14} />{place.city[lang]}</p></div>
              <div className="film-perf film-perf--bottom" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailModal({ place, lang, onClose, onFull }: { place: Attraction; lang: Language; onClose: () => void; onFull: () => void }) {
  const t = ui[lang];
  const coordinates = place.location.coordinates;
  const location = [place.location.district, place.location.division].filter(Boolean).join(' · ');
  useEffect(() => { const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); document.addEventListener('keydown', fn); return () => document.removeEventListener('keydown', fn); }, [onClose]);
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <article className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="icon-button modal-close" onClick={onClose} aria-label={t.close}><X /></button>
      <div className="modal-media"><PlaceVisual place={place} lang={lang} large /><div className="modal-number">{place.icon}</div></div>
      <div className="modal-content">
        <div className="modal-topline"><span>{place.type[lang]}</span><span className={`status ${place.verified ? 'verified' : ''}`}>{place.verified ? <Check size={13} /> : <Info size={13} />}{place.verification[lang]}</span></div>
        <h2 id="modal-title">{place.name[lang]}</h2><p className="modal-summary">{place.summary[lang]}</p><p className="modal-description">{place.description[lang]}</p>
        <dl className="fact-grid">
          <div><dt>{t.location}</dt><dd>{location || t.unavailable}</dd></div><div><dt>{t.season}</dt><dd>{place.bestSeason[lang]}</dd></div>
          <div><dt>{t.coordinates}</dt><dd>{place.location.coordinates ? <a href={`https://www.openstreetmap.org/?mlat=${coordinates?.latitude}&mlon=${coordinates?.longitude}#map=14/${coordinates?.latitude}/${coordinates?.longitude}`} target="_blank" rel="noreferrer">{coordinates?.latitude.toFixed(4)}, {coordinates?.longitude.toFixed(4)} <ExternalLink size={11} /></a> : t.unavailable}</dd></div><div><dt>{t.checked}</dt><dd>{place.lastVerified}</dd></div>
          <div><dt>{t.hours}</dt><dd>{place.hours[lang]}</dd></div><div><dt>{t.ticket}</dt><dd>{place.ticket[lang]}</dd></div>
          <div><dt>{t.contact}</dt><dd>{place.contact[lang]}</dd></div><div><dt>{t.verification}</dt><dd>{place.verification[lang]}</dd></div>
        </dl>
        <div className="source-line"><span>{t.sources}</span><div className="source-links">{place.sourceUrls.map(source => <a key={source} href={source} target="_blank" rel="noreferrer">{sourceLabel(source)} <ExternalLink size={10} /></a>)}</div></div>
        <button className="primary-button" onClick={onFull}>{t.full}<ChevronRight size={18} /></button>
      </div>
    </article>
  </div>;
}

function StoryPage({ place, lang, onBack }: { place: Attraction; lang: Language; onBack: () => void }) {
  const t = ui[lang];
  return <main className="story-page">
    <header className="story-header"><button className="back-button" onClick={onBack}><ArrowLeft size={18} />{t.back}</button><span className="story-mark">বাংলাদেশ</span></header>
    <section className="story-hero"><PlaceVisual place={place} lang={lang} large /><div className="story-title"><span>{place.type[lang]} · {place.city[lang]}</span><h1>{place.name[lang]}</h1><p>{place.summary[lang]}</p></div></section>
    <section className="story-body"><article><span className="eyebrow">{t.story}</span><h2>{place.name[lang]}</h2><p>{place.description[lang]}</p><p>{place.summary[lang]} {place.description[lang]}</p></article><aside><span className="eyebrow">{t.facts}</span><dl><div><dt>{t.hours}</dt><dd>{place.hours[lang]}</dd></div><div><dt>{t.ticket}</dt><dd>{place.ticket[lang]}</dd></div><div><dt>{t.contact}</dt><dd>{place.contact[lang]}</dd></div><div><dt>{t.checked}</dt><dd>{place.lastVerified}</dd></div></dl><div className="pending-note"><Info size={17} />{t.pending}</div></aside></section>
  </main>;
}

function getStoryFromHash() {
  const id = decodeURIComponent(window.location.hash.replace(/^#place\//, ''));
  return attractions.find(place => place.id === id) ?? null;
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selected, setSelected] = useState<string | null>(null);
  const [modal, setModal] = useState<Attraction | null>(null);
  const [story, setStory] = useState<Attraction | null>(() => getStoryFromHash());
  const t = ui[lang];
  const current = regions.find(r => r.id === selected);
  const places = useMemo(() => attractions.filter(a => a.regionId === selected), [selected]);

  useEffect(() => {
    const syncStory = () => setStory(getStoryFromHash());
    window.addEventListener('hashchange', syncStory);
    return () => window.removeEventListener('hashchange', syncStory);
  }, []);

  const openStory = (place: Attraction) => {
    if (window.location.hash !== `#place/${place.id}`) window.location.hash = `place/${place.id}`;
    setStory(place);
  };

  const closeStory = () => {
    window.history.pushState('', '', `${window.location.pathname}${window.location.search}`);
    setStory(null);
  };

  if (story) return <div lang={lang === 'zh' ? 'zh-CN' : lang}><StoryPage place={story} lang={lang} onBack={closeStory} /></div>;

  return <div className="app" lang={lang === 'zh' ? 'zh-CN' : lang}>
    <header className="topbar"><a className="brand" href="#top" aria-label="Explore Bangladesh home"><span className="brand-sun" /><span>EXPLORE<br /><b>BANGLADESH</b></span></a><nav className="language-switcher" aria-label="Language">{langs.map(l => <button key={l.id} className={lang === l.id ? 'active' : ''} onClick={() => setLang(l.id)}>{l.label}</button>)}</nav></header>
    <main id="top">
      <section className={`hero ${selected ? 'has-selection' : ''}`}>
        <div className="hero-copy"><h1>{current ? current.name[lang] : t.title}</h1><p>{current ? current.summary[lang] : t.intro}</p>{selected && <><div className="selected-cities"><span>{t.cities}</span>{current?.cities.map(city => <div key={city.id}><MapPin size={12} /><strong>{city.name[lang]}</strong><small>{city.note[lang]}</small></div>)}</div><button className="reset-button" onClick={() => setSelected(null)}><ArrowLeft size={16} />{t.map}</button></>}</div>
        <BangladeshMap selected={selected} onSelect={id => setSelected(id)} lang={lang} />
        {current && <Filmstrip items={places} lang={lang} compact />}
        {!selected && <div className="select-prompt"><span>{t.select}</span><div className="prompt-line" /><ArrowRight /></div>}
        <div className="vertical-label">RIVERS · CULTURE · HERITAGE</div>
      </section>
    </main>
    {modal && <DetailModal place={modal} lang={lang} onClose={() => setModal(null)} onFull={() => { openStory(modal); setModal(null); }} />}
  </div>;
}
