const fs = require('fs');
const path = 'public/js/products.js';
let src = fs.readFileSync(path, 'utf8');
const dataDir = 'public/eh-data';
const inlineKeys = ['gaming-mouse', 'gaming-keyboard']; // not in CATALOG -> add new entries

function disc(p, m) {
  p = Number(p); m = Number(m);
  if (!m || !p || m <= p) return 0;
  return Math.round((m - p) / m * 100);
}
function rowsFor(items) {
  return items.map(p =>
    `      [${JSON.stringify(p.name)}, ${Number(p.price)}, ${Number(p.mrp)}, ${disc(p.price, p.mrp)}, ${JSON.stringify(p.path)}]`
  ).join(',\n');
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
const report = [];
const toAdd = [];

for (const f of files) {
  const d = JSON.parse(fs.readFileSync(dataDir + '/' + f, 'utf8'));
  if (!d.items || d.items.length === 0) { report.push(`SKIP  ${d.key} (0 items)`); continue; }
  const rows = rowsFor(d.items);
  if (inlineKeys.includes(d.key)) { toAdd.push({ key: d.key, rows, count: d.items.length }); continue; }

  const startMarker = `'${d.key}': { pool:'`;
  const si = src.indexOf(startMarker);
  if (si < 0) { report.push(`MISS  ${d.key} (not in CATALOG)`); continue; }
  const itemsKw = src.indexOf('items:[', si);
  const itemsStart = itemsKw + 'items:['.length;
  const itemsEnd = src.indexOf(']}', itemsStart); // array close + object close
  if (itemsKw < 0 || itemsEnd < 0) { report.push(`ERR   ${d.key} (markers not found)`); continue; }
  src = src.slice(0, itemsStart) + '\n' + rows + '\n    ' + src.slice(itemsEnd);
  report.push(`OK    ${d.key} -> ${d.items.length}`);
}

if (toAdd.length) {
  const anchor = 'const CATALOG = {';
  const ai = src.indexOf(anchor) + anchor.length;
  let block = '';
  for (const t of toAdd) {
    block += `\n\n    '${t.key}': { pool:'headphones', items:[\n${t.rows}\n    ]},`;
    report.push(`ADD   ${t.key} -> ${t.count} (new CATALOG entry)`);
  }
  src = src.slice(0, ai) + block + src.slice(ai);
}

fs.writeFileSync(path, src, 'utf8');
console.log(report.join('\n'));
