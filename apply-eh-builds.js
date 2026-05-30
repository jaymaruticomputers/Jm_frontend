// Injects the scraped build-* collections into the CATALOG literal in
// public/js/products.js as real entries (replacing any existing build-* block),
// and guards the synthetic BUILD_DEFS loop so it never overwrites real data.
const fs = require('fs');
const file = 'public/js/products.js';
const dataDir = 'public/eh-data';
let src = fs.readFileSync(file, 'utf8');

function disc(p, m) { p = +p; m = +m; if (!m || !p || m <= p) return 0; return Math.round((m - p) / m * 100); }
function rowsFor(items) {
  return items.map(p =>
    `      [${JSON.stringify(p.name)}, ${+p.price}, ${+p.mrp}, ${disc(p.price, p.mrp)}, ${JSON.stringify(p.path)}]`
  ).join(',\n');
}

const keys = fs.readdirSync(dataDir).filter(f => /^build-.*\.json$/.test(f)).map(f => f.replace('.json', ''));
const report = [];

// 1. Remove any existing build-* CATALOG blocks so we can re-insert fresh data.
for (const key of keys) {
  const re = new RegExp(`\\n\\n    '${key}': \\{ pool:'pc', items:\\[[\\s\\S]*?\\n    \\]\\},`);
  if (re.test(src)) { src = src.replace(re, ''); report.push(`CLEAR ${key}`); }
}

// 2. Build and insert fresh blocks right after `const CATALOG = {`.
let block = '';
for (const key of keys) {
  const d = JSON.parse(fs.readFileSync(`${dataDir}/${key}.json`, 'utf8'));
  if (!d.items || !d.items.length) { report.push(`SKIP  ${key} (0 items)`); continue; }
  block += `\n\n    '${key}': { pool:'pc', items:[\n${rowsFor(d.items)}\n    ]},`;
  report.push(`ADD   ${key} -> ${d.items.length}`);
}
const anchor = 'const CATALOG = {';
const ai = src.indexOf(anchor) + anchor.length;
src = src.slice(0, ai) + block + src.slice(ai);

// 3. Guard the synthetic loop so it never overwrites a real CATALOG entry.
const guardAnchor = 'const def = BUILD_DEFS[key];';
if (src.includes(guardAnchor) && !src.includes('if (CATALOG[key]) return; // real data wins')) {
  src = src.replace(guardAnchor, guardAnchor + '\n    if (CATALOG[key]) return; // real data wins');
  report.push('GUARD BUILD_DEFS loop now skips keys with real data');
}

fs.writeFileSync(file, src, 'utf8');
console.log(report.join('\n'));
