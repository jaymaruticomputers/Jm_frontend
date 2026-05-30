// Tops up the thin build categories to TARGET items by appending DISTINCT-image
// products (content-hash deduped against existing) from adjacent collections.
const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const TOPUP = {
  // key : ordered adjacent collections to pull distinct-image fillers from
  'build-corporate': ['home-and-office-pc', 'focusx-office-and-home-pc', 'assembled-pc-desktop-cpu', 'custom-prebuilt-gaming-pc'],
};
const TARGET = 15;
const SCAN = 120;

function get(url) { return new Promise((res, rej) => { https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => { if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) { r.resume(); return get(r.headers.location).then(res, rej); } let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); }
function getBuffer(url) { return new Promise((res, rej) => { https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => { if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) { r.resume(); return getBuffer(r.headers.location).then(res, rej); } if (r.statusCode !== 200) { r.resume(); return rej(new Error('HTTP ' + r.statusCode)); } const ch = []; r.on('data', c => ch.push(c)); r.on('end', () => res(Buffer.concat(ch))); }).on('error', rej); }); }
const num = s => Math.round(parseFloat(s || '0'));
const ext = u => { const m = u.split('?')[0].match(/\.(png|jpe?g|webp|gif)$/i); return m ? m[0].toLowerCase() : '.png'; };
async function fetchCollection(handle) { let prods = []; for (let p = 1; p <= 4; p++) { let j; try { j = JSON.parse(await get(`https://elitehubs.com/collections/${handle}/products.json?limit=250&page=${p}`)); } catch (e) { break; } if (!j.products || !j.products.length) break; prods = prods.concat(j.products); if (prods.length >= SCAN) break; } return prods.slice(0, SCAN); }

(async () => {
  const report = [];
  for (const [key, handles] of Object.entries(TOPUP)) {
    const jsonPath = path.join('public', 'eh-data', key + '.json');
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const imgDir = path.join('public', 'eh-images', key);

    // Seed dedup sets from what already exists.
    const seenHash = new Set(), seenName = new Set(data.items.map(i => i.name));
    for (const f of fs.readdirSync(imgDir)) seenHash.add(crypto.createHash('md5').update(fs.readFileSync(path.join(imgDir, f))).digest('hex'));
    const before = data.items.length;
    const sources = new Set(data.sources || []);

    for (const handle of handles) {
      if (data.items.length >= TARGET) break;
      const prods = await fetchCollection(handle);
      for (const prod of prods) {
        if (data.items.length >= TARGET) break;
        const src = (prod.images[0] && prod.images[0].src) || '';
        const name = prod.title.trim();
        if (!src || seenName.has(name)) continue;
        let buf; try { buf = await getBuffer(src); } catch (e) { continue; }
        const hash = crypto.createHash('md5').update(buf).digest('hex');
        if (seenHash.has(hash)) continue;
        seenHash.add(hash); seenName.add(name); sources.add(handle);
        const fname = `${data.items.length + 1}${ext(src)}`;
        fs.writeFileSync(path.join(imgDir, fname), buf);
        const v = prod.variants[0] || {};
        const price = num(v.price);
        data.items.push({ name, price, mrp: num(v.compare_at_price) || price, path: `/eh-images/${key}/${fname}` });
      }
    }

    data.sources = [...sources];
    fs.writeFileSync(jsonPath, JSON.stringify(data), 'utf8');
    report.push(`${key.padEnd(26)} ${before} -> ${data.items.length} items`);
  }
  console.log(report.join('\n'));
})();
