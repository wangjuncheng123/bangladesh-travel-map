import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseCsv, resolveRegionId } from './attraction-data.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const inputPath = `${root}data/bangladesh_attractions.csv`;
const outputPath = `${root}src/generated-attractions.ts`;

const rows = parseCsv(readFileSync(inputPath, 'utf8'));
const headers = rows.shift().map((header, index) => index === 0 ? header.replace(/^\uFEFF/, '') : header);
const records = rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));

function categoryPresentation(record) {
  const combined = `${record.category_group} ${record.category}`.toLowerCase();
  if (combined.includes('relig') || combined.includes('mosque') || combined.includes('temple') || combined.includes('宗教')) {
    return { color: '#a65536', icon: '◉', bn: 'ধর্ম ও প্রত্নতত্ত্ব' };
  }
  if (combined.includes('nature') || combined.includes('forest') || combined.includes('beach') || combined.includes('自然')) {
    return { color: '#287362', icon: '≈', bn: 'প্রকৃতি' };
  }
  return { color: '#8b6547', icon: '♜', bn: 'ইতিহাস ও সংস্কৃতি' };
}

const pending = {
  en: 'Pending verification',
  zh: '待核实',
  bn: 'যাচাই বাকি',
};

function seasonPresentation(value) {
  if (value.includes('雨季')) {
    return { en: 'Monsoon and post-monsoon (June–November)', zh: value, bn: 'বর্ষা ও বর্ষা-পরবর্তী সময় (জুন–নভেম্বর)' };
  }
  if (value.includes('旱季')) {
    return { en: 'Dry season (November–March)', zh: value, bn: 'শুষ্ক মৌসুম (নভেম্বর–মার্চ)' };
  }
  return { en: 'November–March is generally the most comfortable period', zh: value || '通常11月至次年3月天气较舒适', bn: 'সাধারণত নভেম্বর থেকে মার্চ ভ্রমণের জন্য আরামদায়ক' };
}

function verificationPresentation(status) {
  if (status.includes('景点级权威来源已核实')) {
    return { en: 'Source verified', zh: '景点级权威来源已核实', bn: 'নির্দিষ্ট কর্তৃপক্ষের উৎস যাচাইকৃত' };
  }
  if (status.includes('旅游局目录匹配')) {
    return { en: 'Tourism directory matched', zh: '旅游局目录匹配', bn: 'পর্যটন ডিরেক্টরির সঙ্গে মিলেছে' };
  }
  return pending;
}

function sourceUrls(value) {
  return value.split(' | ').filter(url => /^https?:\/\//.test(url));
}

function coordinates(record) {
  const latitude = Number(record.latitude);
  const longitude = Number(record.longitude);
  return Number.isFinite(latitude) && Number.isFinite(longitude) ? { latitude, longitude } : null;
}

function generatedImagePath(id) {
  const relativePath = `generated/${id}.jpg`;
  return existsSync(`${root}public/${relativePath}`) ? relativePath : '';
}

const attractions = records.map(record => {
  const presentation = categoryPresentation(record);
  const regionId = resolveRegionId(record.division);
  const nameEn = record.name_en || record.id;
  const nameZh = record.name_zh || nameEn;
  const nameBn = record.name_bn || nameEn;
  const district = record.district || record.division;
  const summaryEn = `${nameEn} is a ${record.category || 'travel destination'} in ${district}, ${record.division}.`;
  const summaryZh = record.description_zh || `${nameZh}位于孟加拉国${record.division}地区。`;
  const summaryBn = `${nameBn} — ${district}, ${record.division}.`;
  const status = record.verification_status || '';
  const sources = sourceUrls(record.source_urls || '');
  const aiImageUrl = generatedImagePath(record.id);

  return {
    id: record.id,
    regionId,
    name: { en: nameEn, zh: nameZh, bn: nameBn },
    type: { en: record.category || 'Travel destination', zh: record.category_group || record.category || '旅游胜地', bn: presentation.bn },
    city: { en: district, zh: district, bn: district },
    summary: { en: summaryEn, zh: summaryZh, bn: summaryBn },
    description: { en: summaryEn, zh: summaryZh, bn: summaryBn },
    hours: record.opening_hours ? { en: record.opening_hours, zh: record.opening_hours, bn: record.opening_hours } : pending,
    ticket: record.ticket_price ? { en: record.ticket_price, zh: record.ticket_price, bn: record.ticket_price } : pending,
    contact: record.contact ? { en: record.contact, zh: record.contact, bn: record.contact } : pending,
    lastVerified: record.last_verified || '2026-07-11',
    verified: status.includes('已核实') && !status.includes('待人工复核') && !status.includes('待补'),
    color: presentation.color,
    icon: presentation.icon,
    source: record.source_urls || 'Source pending verification',
    sourceUrls: sources,
    verification: verificationPresentation(status),
    bestSeason: seasonPresentation(record.best_season || ''),
    location: {
      division: record.division,
      district,
      upazila: record.upazila_or_thana || '',
      coordinates: coordinates(record),
    },
    parentSite: record.parent_site || '',
    imageUrl: aiImageUrl,
    imageKind: aiImageUrl ? 'ai' : 'none',
  };
});

const generated = `// Generated from data/bangladesh_attractions.csv. Do not edit manually.\n` +
  `import type { Attraction } from './types';\n\n` +
  `export const generatedAttractions = ${JSON.stringify(attractions, null, 2)} satisfies Attraction[];\n`;

writeFileSync(outputPath, generated);
console.log(`Generated ${attractions.length} attractions from CSV.`);
