#!/usr/bin/env node
/* Extracts per-page title, description, and body content (minus shared
   nav/footer/FAB) from the original HTML site at ../.. into a single
   pages.json that Next.js pages render via dangerouslySetInnerHTML. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, "..", "..");
const OUT_FILE = path.resolve(__dirname, "..", "app", "_content", "pages.json");

const TEMPLATED_SLUGS = new Set([
  "amd-graphics-card","build-3d-modelling","build-architectural","build-compositing",
  "build-corporate","build-game-dev","build-graphic-design","build-layout-3d",
  "build-music-production","build-streaming-simulator","build-vfx","build-video-editing",
  "cabinet","controllers","cpu-cooler","elgato","gaming-chair","gaming-headphones",
  "gaming-mousepad","gaming-pc","microphones","monitors-by-brand","monitors-by-panel",
  "monitors-by-refresh-rate","monitors-by-resolution","monitors-by-size","motherboard",
  "nvidia-graphics-card","power-supply","processor","ram","storage","streaming-pc","webcam"
]);

const UNIQUE_SLUGS = new Set([
  "index","about","builds","contact","faq","gallery","gaming-keyboard","gaming-mouse",
  "packages","process","products","reviews"
]);

function pickBetween(s, openRE, closeRE) {
  const o = s.search(openRE);
  if (o < 0) return [-1, -1];
  const tail = s.slice(o);
  const cOff = tail.search(closeRE);
  if (cOff < 0) return [-1, -1];
  return [o, o + cOff];
}

const ENTITY_MAP = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "—", ndash: "–", middot: "·", hellip: "…",
  copy: "©", reg: "®", trade: "™",
  laquo: "«", raquo: "»", ldquo: "“", rdquo: "”",
  lsquo: "‘", rsquo: "’", times: "×", deg: "°",
};
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, name) => (ENTITY_MAP[name.toLowerCase()] ?? m));
}

function extractHead(html) {
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const descMatch  = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  return {
    title: titleMatch ? decodeEntities(titleMatch[1].trim()) : "",
    description: descMatch ? decodeEntities(descMatch[1].trim()) : "",
  };
}

function extractBody(html) {
  // body is between <body> and </body>
  const bm = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bm) return "";
  let body = bm[1];

  // Strip nav-wrap div (floating pill nav) — find <div class="nav-wrap"> ... </div>
  body = stripBlock(body, /<div class="nav-wrap">/i, "div");
  // Strip mobile-menu nav
  body = stripBlock(body, /<nav class="mobile-menu"[^>]*>/i, "nav");
  // Strip <footer>...</footer>
  body = stripBlock(body, /<footer[^>]*>/i, "footer");
  // Strip floating WhatsApp FAB
  body = stripBlock(body, /<div class="fab-wa"[^>]*>/i, "div");
  // Strip the two trailing <script> tags
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");

  return body.trim();
}

/* Walks tagged open/close pairs respecting nested same-name tags. */
function stripBlock(src, openRE, tagName) {
  const m = src.match(openRE);
  if (!m) return src;
  const startIdx = m.index;
  const openTag = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  const closeTag = new RegExp(`</${tagName}\\s*>`, "gi");
  openTag.lastIndex = startIdx + m[0].length;
  closeTag.lastIndex = startIdx + m[0].length;
  let depth = 1;
  while (depth > 0) {
    const nextOpen = openTag.exec(src);
    const nextClose = closeTag.exec(src);
    if (!nextClose) return src; // malformed; bail
    if (nextOpen && nextOpen.index < nextClose.index) {
      depth++;
      closeTag.lastIndex = nextOpen.index + nextOpen[0].length;
    } else {
      depth--;
      openTag.lastIndex = nextClose.index + nextClose[0].length;
      if (depth === 0) {
        return (src.slice(0, startIdx) + src.slice(nextClose.index + nextClose[0].length)).trim();
      }
    }
  }
  return src;
}

/* Pull data-category off the shop-grid (for category pages). */
function extractDataCategory(html) {
  const m = html.match(/<div class="shop-grid[^"]*"[^>]*data-category="([^"]+)"/i);
  return m ? m[1] : null;
}

function rewriteAssetPaths(html) {
  return html
    // assets/* -> /*
    .replace(/(["'(=])assets\//g, "$1/")
    // video/* -> /video/*
    .replace(/(["'(=])video\//g, "$1/video/")
    // index.html -> /
    .replace(/href="index\.html"/g, 'href="/"')
    // any-slug.html -> /any-slug   (only when used as a same-folder relative href)
    .replace(/href="([a-z0-9-]+)\.html"/gi, 'href="/$1"');
}

/* Strip the FAB & script paragraph isn't a concern since we strip via tag. */

const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith(".html"));
const out = {};

for (const file of files) {
  const slug = file.replace(/\.html$/, "");
  const full = path.join(SRC_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const head = extractHead(raw);
  let body = extractBody(raw);
  body = rewriteAssetPaths(body);
  const cat = extractDataCategory(raw);
  out[slug] = {
    title: head.title,
    description: head.description,
    html: body,
    ...(cat ? { dataCategory: cat } : {}),
    templated: TEMPLATED_SLUGS.has(slug),
  };
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), "utf8");

const nT = Object.values(out).filter(p => p.templated).length;
const nU = Object.keys(out).length - nT;
console.log(`Wrote ${OUT_FILE} — ${Object.keys(out).length} pages (${nU} unique, ${nT} templated).`);
