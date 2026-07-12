import type { Attraction, Region } from './types';
import { generatedAttractions } from './generated-attractions';

export const regions: Region[] = [
  {
    id: 'rangpur', name: { en: 'Rangpur', zh: '朗布尔', bn: 'রংপুর' },
    path: 'M305 62 L414 48 L454 104 L426 174 L342 191 L282 145 Z', center: [365, 118],
    summary: { en: 'Northern plains, rivers and historic estates.', zh: '北部平原、河流与历史庄园。', bn: 'উত্তরের সমভূমি, নদী ও ঐতিহাসিক জমিদারবাড়ি।' },
    cities: [
      { id: 'rangpur-city', name: { en: 'Rangpur', zh: '朗布尔', bn: 'রংপুর' }, x: 365, y: 120, note: { en: 'Regional capital', zh: '地区首府', bn: 'বিভাগীয় শহর' } },
      { id: 'dinajpur', name: { en: 'Dinajpur', zh: '迪纳杰布尔', bn: 'দিনাজপুর' }, x: 314, y: 100, note: { en: 'Historic temple city', zh: '历史寺庙城市', bn: 'ঐতিহাসিক মন্দিরের শহর' } },
    ],
  },
  {
    id: 'rajshahi', name: { en: 'Rajshahi', zh: '拉杰沙希', bn: 'রাজশাহী' },
    path: 'M282 145 L342 191 L353 285 L291 337 L190 315 L181 227 L225 161 Z', center: [270, 244],
    summary: { en: 'Silk, mango orchards and layers of ancient Bengal.', zh: '丝绸、芒果园与古孟加拉文明。', bn: 'রেশম, আমবাগান ও প্রাচীন বাংলার ঐতিহ্য।' },
    cities: [
      { id: 'rajshahi-city', name: { en: 'Rajshahi', zh: '拉杰沙希', bn: 'রাজশাহী' }, x: 250, y: 265, note: { en: 'Silk city', zh: '丝绸之城', bn: 'রেশম নগরী' } },
      { id: 'bogura', name: { en: 'Bogura', zh: '博格拉', bn: 'বগুড়া' }, x: 306, y: 213, note: { en: 'Gateway to Mahasthangarh', zh: '通往马哈斯坦加尔的门户', bn: 'মহাস্থানগড়ের প্রবেশদ্বার' } },
    ],
  },
  {
    id: 'mymensingh', name: { en: 'Mymensingh', zh: '迈门辛', bn: 'ময়মনসিংহ' },
    path: 'M342 191 L426 174 L469 227 L453 318 L385 329 L353 285 Z', center: [405, 252],
    summary: { en: 'River landscapes and the cultural heart of central Bengal.', zh: '河流景观与孟加拉中部文化腹地。', bn: 'নদীমাতৃক প্রকৃতি ও মধ্য বাংলার সাংস্কৃতিক প্রাণকেন্দ্র।' },
    cities: [
      { id: 'mymensingh-city', name: { en: 'Mymensingh', zh: '迈门辛', bn: 'ময়মনসিংহ' }, x: 408, y: 263, note: { en: 'City by the Brahmaputra', zh: '布拉马普特拉河畔城市', bn: 'ব্রহ্মপুত্রের তীরের শহর' } },
    ],
  },
  {
    id: 'sylhet', name: { en: 'Sylhet', zh: '锡尔赫特', bn: 'সিলেট' },
    path: 'M426 174 L516 171 L580 215 L554 285 L453 318 L469 227 Z', center: [505, 240],
    summary: { en: 'Tea gardens, wetlands and misty green hills.', zh: '茶园、湿地与雾气缭绕的青山。', bn: 'চা-বাগান, হাওর আর কুয়াশাঘেরা সবুজ পাহাড়।' },
    cities: [
      { id: 'sylhet-city', name: { en: 'Sylhet', zh: '锡尔赫特', bn: 'সিলেট' }, x: 512, y: 235, note: { en: 'Tea country hub', zh: '茶乡中心', bn: 'চা-অঞ্চলের কেন্দ্র' } },
      { id: 'srimangal', name: { en: 'Sreemangal', zh: '斯里曼加尔', bn: 'শ্রীমঙ্গল' }, x: 496, y: 278, note: { en: 'Tea capital', zh: '茶叶之都', bn: 'চায়ের রাজধানী' } },
    ],
  },
  {
    id: 'dhaka', name: { en: 'Dhaka', zh: '达卡', bn: 'ঢাকা' },
    path: 'M353 285 L385 329 L453 318 L478 407 L420 464 L336 422 L291 337 Z', center: [386, 365],
    summary: { en: 'A vibrant capital shaped by rivers, empires and craft.', zh: '一座由河流、帝国与手工艺塑造的活力首都。', bn: 'নদী, সাম্রাজ্য ও কারুশিল্পে গড়া প্রাণবন্ত রাজধানী।' },
    cities: [
      { id: 'dhaka-city', name: { en: 'Dhaka', zh: '达卡', bn: 'ঢাকা' }, x: 390, y: 370, note: { en: 'National capital', zh: '国家首都', bn: 'জাতীয় রাজধানী' } },
      { id: 'narayanganj', name: { en: 'Narayanganj', zh: '纳拉扬甘杰', bn: 'নারায়ণগঞ্জ' }, x: 407, y: 397, note: { en: 'River port', zh: '河港城市', bn: 'নদীবন্দর' } },
    ],
  },
  {
    id: 'khulna', name: { en: 'Khulna', zh: '库尔纳', bn: 'খুলনা' },
    path: 'M190 315 L291 337 L336 422 L316 542 L250 589 L176 525 L151 405 Z', center: [249, 439],
    summary: { en: 'Mangrove wilderness, waterways and historic mosques.', zh: '红树林荒野、水道与历史清真寺。', bn: 'ম্যানগ্রোভ অরণ্য, জলপথ ও ঐতিহাসিক মসজিদ।' },
    cities: [
      { id: 'khulna-city', name: { en: 'Khulna', zh: '库尔纳', bn: 'খুলনা' }, x: 254, y: 447, note: { en: 'Gateway to the Sundarbans', zh: '通往孙德尔本斯的门户', bn: 'সুন্দরবনের প্রবেশদ্বার' } },
      { id: 'bagerhat', name: { en: 'Bagerhat', zh: '巴盖尔哈德', bn: 'বাগেরহাট' }, x: 273, y: 490, note: { en: 'Historic mosque city', zh: '历史清真寺之城', bn: 'ঐতিহাসিক মসজিদের শহর' } },
    ],
  },
  {
    id: 'barishal', name: { en: 'Barishal', zh: '巴里萨尔', bn: 'বরিশাল' },
    path: 'M336 422 L420 464 L411 556 L355 606 L316 542 Z', center: [367, 502],
    summary: { en: 'A serene delta of floating markets and endless rivers.', zh: '由水上市场和无尽河流构成的宁静三角洲。', bn: 'ভাসমান বাজার আর অসংখ্য নদীর শান্ত বদ্বীপ।' },
    cities: [
      { id: 'barishal-city', name: { en: 'Barishal', zh: '巴里萨尔', bn: 'বরিশাল' }, x: 368, y: 500, note: { en: 'River city', zh: '河流之城', bn: 'নদীর শহর' } },
    ],
  },
  {
    id: 'chattogram', name: { en: 'Chattogram', zh: '吉大港', bn: 'চট্টগ্রাম' },
    path: 'M453 318 L554 285 L582 366 L546 462 L537 562 L493 671 L433 612 L411 556 L420 464 L478 407 Z', center: [494, 459],
    summary: { en: 'Hill tracts, sea beaches and the country’s great port.', zh: '山地、海滩与孟加拉国最大的港口。', bn: 'পার্বত্য অঞ্চল, সমুদ্রসৈকত ও দেশের প্রধান বন্দর।' },
    cities: [
      { id: 'chattogram-city', name: { en: 'Chattogram', zh: '吉大港', bn: 'চট্টগ্রাম' }, x: 510, y: 441, note: { en: 'Port city', zh: '港口城市', bn: 'বন্দরনগরী' } },
      { id: 'coxsbazar', name: { en: "Cox's Bazar", zh: '科克斯巴扎尔', bn: 'কক্সবাজার' }, x: 511, y: 552, note: { en: 'Coastal city', zh: '滨海城市', bn: 'উপকূলীয় শহর' } },
    ],
  },
];

const common = {
  hours: { en: 'Verify with the official authority before visiting', zh: '参观前请向官方机构核实', bn: 'ভ্রমণের আগে সংশ্লিষ্ট কর্তৃপক্ষের সঙ্গে যাচাই করুন' },
  ticket: { en: 'Pending verification', zh: '待核实', bn: 'যাচাই বাকি' },
  contact: { en: 'Official contact pending verification', zh: '官方联系方式待核实', bn: 'সরকারি যোগাযোগ যাচাই বাকি' },
};

// Legacy display samples retained for reference only. The application renders
// the generated CSV dataset exported below.
export const sampleAttractions = [
  { id: 'tajhat-palace', regionId: 'rangpur', name: { en: 'Tajhat Palace', zh: '塔杰哈特宫', bn: 'তাজহাট জমিদার বাড়ি' }, type: { en: 'History', zh: '历史', bn: 'ইতিহাস' }, city: { en: 'Rangpur', zh: '朗布尔', bn: 'রংপুর' }, summary: { en: 'A stately early twentieth-century palace.', zh: '一座庄严的二十世纪初宫殿。', bn: 'বিংশ শতাব্দীর শুরুর দিকের রাজকীয় প্রাসাদ।' }, description: { en: 'An elegant former zamindar residence now associated with the region’s museum heritage.', zh: '昔日优雅的扎明达尔宅邸，如今与当地博物馆文化紧密相连。', bn: 'সাবেক জমিদারদের এই নান্দনিক বাসভবন এখন অঞ্চলের জাদুঘর ঐতিহ্যের অংশ।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#b66b44', icon: '♜', source: 'Google Maps — manual verification required' },
  { id: 'kantajew-temple', regionId: 'rangpur', name: { en: 'Kantajew Temple', zh: '坎塔吉寺', bn: 'কান্তজিউ মন্দির' }, type: { en: 'Religion', zh: '宗教', bn: 'ধর্মীয়' }, city: { en: 'Dinajpur', zh: '迪纳杰布尔', bn: 'দিনাজপুর' }, summary: { en: 'Terracotta artistry in northern Bengal.', zh: '孟加拉北部精美的赤陶艺术。', bn: 'উত্তর বাংলার অপূর্ব টেরাকোটা শিল্প।' }, description: { en: 'A celebrated Hindu temple noted for richly detailed terracotta panels.', zh: '一座以丰富精细的赤陶嵌板闻名的印度教寺庙。', bn: 'সূক্ষ্ম টেরাকোটা ফলকের জন্য বিখ্যাত একটি হিন্দু মন্দির।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#d79045', icon: '◆', source: 'Google Maps — manual verification required' },
  { id: 'mahasthangarh', regionId: 'rajshahi', name: { en: 'Mahasthangarh', zh: '马哈斯坦加尔遗址', bn: 'মহাস্থানগড়' }, type: { en: 'History', zh: '历史', bn: 'ইতিহাস' }, city: { en: 'Bogura', zh: '博格拉', bn: 'বগুড়া' }, summary: { en: 'One of Bengal’s earliest urban archaeological sites.', zh: '孟加拉最早的城市考古遗址之一。', bn: 'বাংলার প্রাচীনতম নগর প্রত্নস্থলগুলোর একটি।' }, description: { en: 'An ancient fortified settlement that preserves layers of Bengal’s long history.', zh: '一座古老的防御城市遗址，保存着孟加拉悠久历史的多重印记。', bn: 'প্রাচীন এই দুর্গনগরীতে বাংলার দীর্ঘ ইতিহাসের নানা স্তর সংরক্ষিত।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#7f5d3d', icon: '▥', source: 'Google Maps — manual verification required' },
  { id: 'puthia-temples', regionId: 'rajshahi', name: { en: 'Puthia Temple Complex', zh: '普蒂亚寺庙群', bn: 'পুঠিয়া মন্দির চত্বর' }, type: { en: 'Culture', zh: '文化', bn: 'সংস্কৃতি' }, city: { en: 'Rajshahi', zh: '拉杰沙希', bn: 'রাজশাহী' }, summary: { en: 'A remarkable ensemble of temples and palaces.', zh: '由寺庙与宫殿组成的非凡建筑群。', bn: 'মন্দির ও প্রাসাদের এক অনন্য সমাহার।' }, description: { en: 'A historic complex known for ornate temple architecture and a grand palace setting.', zh: '一处以华美寺庙建筑和宏伟宫殿环境著称的历史建筑群。', bn: 'অলংকৃত মন্দির স্থাপত্য ও রাজবাড়ির জন্য পরিচিত ঐতিহাসিক চত্বর।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#a65536', icon: '♜', source: 'Google Maps — manual verification required' },
  { id: 'birishiri', regionId: 'mymensingh', name: { en: 'Birishiri', zh: '比里希里', bn: 'বিরিশিরি' }, type: { en: 'Nature', zh: '自然', bn: 'প্রকৃতি' }, city: { en: 'Netrokona', zh: '内德罗戈纳', bn: 'নেত্রকোণা' }, summary: { en: 'Blue-green water, clay hills and quiet countryside.', zh: '蓝绿色水域、黏土山丘与宁静乡野。', bn: 'নীল-সবুজ জল, মাটির পাহাড় ও শান্ত গ্রামবাংলা।' }, description: { en: 'A scenic northern landscape known for its distinctive hills, waterways and cultural setting.', zh: '一片以独特山丘、水道和人文环境闻名的北部景观。', bn: 'স্বতন্ত্র পাহাড়, জলপথ ও সাংস্কৃতিক পরিবেশের জন্য পরিচিত উত্তরাঞ্চলের এক মনোরম স্থান।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#4b8a7a', icon: '≈', source: 'Google Maps — manual verification required' },
  { id: 'ratargul', regionId: 'sylhet', name: { en: 'Ratargul Swamp Forest', zh: '拉塔古尔沼泽森林', bn: 'রাতারগুল জলাবন' }, type: { en: 'Nature', zh: '自然', bn: 'প্রকৃতি' }, city: { en: 'Sylhet', zh: '锡尔赫特', bn: 'সিলেট' }, summary: { en: 'A freshwater swamp forest shaped by monsoon waters.', zh: '由季风水系塑造的淡水沼泽森林。', bn: 'বর্ষার জলে রূপ বদলানো মিঠাপানির জলাবন।' }, description: { en: 'A seasonal wetland forest where waterways weave between dense green trees.', zh: '一片季节性湿地森林，水道在浓密绿树间蜿蜒。', bn: 'ঘন সবুজ গাছের মাঝ দিয়ে জলপথ বয়ে চলা ঋতুভিত্তিক জলাবন।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#287362', icon: '♧', source: 'Google Maps — manual verification required' },
  { id: 'lalbagh-fort', regionId: 'dhaka', name: { en: 'Lalbagh Fort', zh: '拉尔巴格堡', bn: 'লালবাগ কেল্লা' }, type: { en: 'History', zh: '历史', bn: 'ইতিহাস' }, city: { en: 'Dhaka', zh: '达卡', bn: 'ঢাকা' }, summary: { en: 'A Mughal-era landmark in the heart of Old Dhaka.', zh: '位于老达卡中心的莫卧儿时代地标。', bn: 'পুরান ঢাকার প্রাণকেন্দ্রে মুঘল আমলের নিদর্শন।' }, description: { en: 'An unfinished Mughal fort complex with gardens and monumental architecture.', zh: '一座未完工的莫卧儿堡垒建筑群，拥有花园与纪念性建筑。', bn: 'বাগান ও স্মারক স্থাপত্যসমৃদ্ধ অসমাপ্ত মুঘল দুর্গ চত্বর।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#b34936', icon: '♜', source: 'Google Maps — manual verification required' },
  { id: 'sonargaon', regionId: 'dhaka', name: { en: 'Sonargaon', zh: '索纳尔冈', bn: 'সোনারগাঁও' }, type: { en: 'Culture', zh: '文化', bn: 'সংস্কৃতি' }, city: { en: 'Narayanganj', zh: '纳拉扬甘杰', bn: 'নারায়ণগঞ্জ' }, summary: { en: 'A former capital rich in architecture and folk heritage.', zh: '一座建筑与民俗遗产丰富的古都。', bn: 'স্থাপত্য ও লোকঐতিহ্যে সমৃদ্ধ প্রাচীন রাজধানী।' }, description: { en: 'A historic area connecting medieval Bengal, merchant architecture and living craft traditions.', zh: '一片连接中世纪孟加拉、商人建筑与活态手工传统的历史区域。', bn: 'মধ্যযুগীয় বাংলা, বণিক স্থাপত্য ও জীবন্ত কারুশিল্পের ঐতিহ্যকে যুক্ত করা ঐতিহাসিক এলাকা।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#c6873e', icon: '⌂', source: 'Google Maps — manual verification required' },
  { id: 'sundarbans', regionId: 'khulna', name: { en: 'The Sundarbans', zh: '孙德尔本斯红树林', bn: 'সুন্দরবন' }, type: { en: 'Nature', zh: '自然', bn: 'প্রকৃতি' }, city: { en: 'Khulna region', zh: '库尔纳地区', bn: 'খুলনা অঞ্চল' }, summary: { en: 'The world’s great mangrove wilderness.', zh: '世界著名的红树林荒野。', bn: 'বিশ্বের অনন্য ম্যানগ্রোভ অরণ্য।' }, description: { en: 'A vast tidal mangrove ecosystem of rivers, islands and exceptional biodiversity.', zh: '由河流、岛屿和丰富生物多样性构成的广阔潮汐红树林生态系统。', bn: 'নদী, দ্বীপ ও অসাধারণ জীববৈচিত্র্যে ভরা বিশাল জোয়ারভাটা-নির্ভর ম্যানগ্রোভ বাস্তুতন্ত্র।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#275c4b', icon: '♧', source: 'Google Maps — manual verification required' },
  { id: 'sixty-dome', regionId: 'khulna', name: { en: 'Sixty Dome Mosque', zh: '六十圆顶清真寺', bn: 'ষাট গম্বুজ মসজিদ' }, type: { en: 'Religion', zh: '宗教', bn: 'ধর্মীয়' }, city: { en: 'Bagerhat', zh: '巴盖尔哈德', bn: 'বাগেরহাট' }, summary: { en: 'A monumental mosque of historic Bengal.', zh: '孟加拉历史上的宏伟清真寺。', bn: 'ঐতিহাসিক বাংলার এক অনন্য মসজিদ।' }, description: { en: 'A celebrated brick mosque forming part of Bagerhat’s historic architectural landscape.', zh: '一座著名的砖砌清真寺，是巴盖尔哈德历史建筑景观的重要组成部分。', bn: 'বাগেরহাটের ঐতিহাসিক স্থাপত্যের অংশ এই বিখ্যাত ইটের মসজিদ।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#8b6547', icon: '◉', source: 'Google Maps — manual verification required' },
  { id: 'floating-market', regionId: 'barishal', name: { en: 'Floating Guava Market', zh: '水上番石榴市场', bn: 'ভাসমান পেয়ারা বাজার' }, type: { en: 'Culture', zh: '文化', bn: 'সংস্কৃতি' }, city: { en: 'Jhalokathi', zh: '恰洛卡蒂', bn: 'ঝালকাঠি' }, summary: { en: 'A seasonal market unfolding across the waterways.', zh: '在水道间铺展的季节性市场。', bn: 'জলপথজুড়ে বসা মৌসুমি বাজার।' }, description: { en: 'Boats gather with local produce in a living river-market tradition.', zh: '载满当地农产品的小船汇聚于此，延续着鲜活的河上市集传统。', bn: 'স্থানীয় ফল নিয়ে নৌকার সমাবেশে জীবন্ত থাকে নদীকেন্দ্রিক বাজারের ঐতিহ্য।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#5f8d4d', icon: '≈', source: 'Google Maps — manual verification required' },
  { id: 'cox-bazar-beach', regionId: 'chattogram', name: { en: "Cox's Bazar Beach", zh: '科克斯巴扎尔海滩', bn: 'কক্সবাজার সমুদ্রসৈকত' }, type: { en: 'Nature', zh: '自然', bn: 'প্রকৃতি' }, city: { en: "Cox's Bazar", zh: '科克斯巴扎尔', bn: 'কক্সবাজার' }, summary: { en: 'A sweeping shore on the Bay of Bengal.', zh: '孟加拉湾沿岸绵延的海滩。', bn: 'বঙ্গোপসাগরের বিস্তৃত সমুদ্রসৈকত।' }, description: { en: 'A broad coastal landscape of sea, sand and long horizons.', zh: '一片由大海、沙滩与辽阔天际线构成的滨海景观。', bn: 'সমুদ্র, বালু আর দিগন্তজোড়া আকাশের বিস্তৃত উপকূলীয় দৃশ্য।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#2d7893', icon: '≈', source: 'Google Maps — manual verification required' },
  { id: 'rangamati', regionId: 'chattogram', name: { en: 'Rangamati', zh: '兰加马蒂', bn: 'রাঙামাটি' }, type: { en: 'Nature', zh: '自然', bn: 'প্রকৃতি' }, city: { en: 'Rangamati', zh: '兰加马蒂', bn: 'রাঙামাটি' }, summary: { en: 'Lake country among the green hill tracts.', zh: '绿色丘陵间的湖泊之乡。', bn: 'সবুজ পাহাড়ের বুকে হ্রদের দেশ।' }, description: { en: 'A hill landscape centered on waterways and the cultural diversity of the Chittagong Hill Tracts.', zh: '一片以水域和吉大港山区多元文化为核心的丘陵景观。', bn: 'জলপথ ও পার্বত্য চট্টগ্রামের সাংস্কৃতিক বৈচিত্র্যকে ঘিরে গড়া পাহাড়ি জনপদ।' }, ...common, lastVerified: '2026-07-11', verified: false, color: '#3e7855', icon: '△', source: 'Google Maps — manual verification required' },
];

export const attractions: Attraction[] = generatedAttractions;
