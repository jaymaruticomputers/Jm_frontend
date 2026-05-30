// Rebuilds public/eh-data/build-*.json + public/eh-images/build-*/ with up to
// TARGET products per category, each with a DISTINCT image (deduped by image
// content hash, not URL — the store reuses one photo under many filenames).
// Pulls from sibling collections (different brands) in order to fill the count.
const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const SOURCES = {
  'build-game-dev':            ['game-development-pc', 'game-development-pcs', 'ai-development-pc', 'coding-pcs'],
  'build-streaming-simulator': ['flight-simulator-pc', 'desktop-streaming-pc'],
  'build-music-production':    ['ableton-pc', 'fl-studio-pc', 'adobe-audition-pc', 'cubase-pc', 'pro-tools-pc'],
  'build-video-editing':       ['editing-pc', 'davinci-editing-pcs', 'adobe-editing-pcs'],
  'build-layout-3d':           ['blender-rendering-pcs', '3dsmax-rendering-pc'],
  'build-architectural':       ['architectural-pc'],
  'build-3d-modelling':        ['3d-modelling-pc'],
  'build-vfx':                 ['cinema-4d-rendering-pc', 'houdini-rendering-pcs'],
  'build-compositing':         ['adobe-after-effects-rendering-pc'],
  'build-graphic-design':      ['adobe-illustrator-pc', 'adobe-photoshop-pc', 'figma-pc', 'coreldraw-pc', 'canva-pc'],
  'build-corporate':           ['coding-pcs', 'home-and-office-pc', 'focusx-office-and-home-pc', 'brand-loyalty-pc'],
};
const TARGET = 15;
const SCAN_PER_COLLECTION = 120; // how many products to consider per collection

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) { r.resume(); return get(r.headers.location).then(res, rej); }
      let d = ''; r.on('data', c => d += c); r.on('end', () => res(d));
    }).on('error', rej);
  });
}
function getBuffer(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) { r.resume(); return getBuffer(r.headers.location).then(res, rej); }
      if (r.statusCode !== 200) { r.resume(); return rej(new Error('HTTP ' + r.statusCode)); }
      const chunks = []; r.on('data', c => chunks.push(c)); r.on('end', () => res(Buffer.concat(chunks)));
    }).on('error', rej);
  });
}
const num = s => Math.round(parseFloat(s || '0'));
const ext = u => { const m = u.split('?')[0].match(/\.(png|jpe?g|webp|gif)$/i); return m ? m[0].toLowerCase() : '.png'; };

async function fetchCollection(handle) {
  let prods = [];
  for (let p = 1; p <= 4; p++) {
    let j; try { j = JSON.parse(await get(`https://elitehubs.com/collections/${handle}/products.json?limit=250&page=${p}`)); } catch (e) { break; }
    if (!j.products || !j.products.length) break;
    prods = prods.concat(j.products);
    if (prods.length >= SCAN_PER_COLLECTION) break;
  }
  return prods.slice(0, SCAN_PER_COLLECTION);
}

(async () => {
  const report = [];
  for (const [key, handles] of Object.entries(SOURCES)) {
    const imgDir = path.join('public', 'eh-images', key);
    fs.rmSync(imgDir, { recursive: true, force: true });
    fs.mkdirSync(imgDir, { recursive: true });

    const items = [];
    const seenHash = new Set(), seenName = new Set();
    let usedCollections = 0;

    for (const handle of handles) {
      if (items.length >= TARGET) break;
      const prods = await fetchCollection(handle);
      let usedFromThis = false;
      for (const prod of prods) {
        if (items.length >= TARGET) break;
        const src = (prod.images[0] && prod.images[0].src) || '';
        const name = prod.title.trim();
        if (!src || seenName.has(name)) continue;
        let buf; try { buf = await getBuffer(src); } catch (e) { continue; }
        const hash = crypto.createHash('md5').update(buf).digest('hex');
        if (seenHash.has(hash)) continue; // identical photo already used
        seenHash.add(hash); seenName.add(name);
        const fname = `${items.length + 1}${ext(src)}`;
        fs.writeFileSync(path.join(imgDir, fname), buf);
        const v = prod.variants[0] || {};
        const price = num(v.price);
        items.push({ name, price, mrp: num(v.compare_at_price) || price, path: `/eh-images/${key}/${fname}` });
        usedFromThis = true;
      }
      if (usedFromThis) usedCollections++;
    }

    fs.writeFileSync(path.join('public', 'eh-data', key + '.json'),
      JSON.stringify({ key, collectionUrl: `https://elitehubs.com/collections/${handles[0]}`, sources: handles, items }), 'utf8');
    report.push(`${key.padEnd(28)} ${String(items.length).padStart(2)} items / all unique images (used ${usedCollections} collection${usedCollections > 1 ? 's' : ''})`);
  }
  console.log(report.join('\n'));
})();
