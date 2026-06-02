import { promises as fs } from "node:fs";
import path from "node:path";

/* ------------------------------------------------------------------ *
 * JM COMPUTERS — Home-page & page content editing (file-based)
 *
 * The home page and every other page live as HTML strings in
 * app/_content/pages.json. This module parses the structured bits the
 * admin is allowed to edit (home carousels, the Shop-by-Category tiles,
 * the big number stats, plus each page's SEO + hero text) and writes
 * them back without touching anything else.
 * ------------------------------------------------------------------ */

export const PAGES_FILE = path.join(process.cwd(), "app", "_content", "pages.json");

type PagesJson = Record<
  string,
  { title: string; description: string; html: string; dataCategory?: string; templated?: boolean }
>;

export async function readPages(): Promise<PagesJson> {
  return JSON.parse(await fs.readFile(PAGES_FILE, "utf8"));
}

export async function writePages(data: PagesJson): Promise<void> {
  await fs.writeFile(PAGES_FILE, JSON.stringify(data, null, 2), "utf8");
}

/* ---------------- helpers ---------------------------------------- */

// escape plain admin text so it can't break the surrounding HTML
function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function attr(s: string): string {
  return String(s ?? "").replace(/"/g, "");
}
function url(s: string): string {
  return String(s ?? "").replace(/'/g, "");
}

const SECTIONS: Record<string, { start: string; end: string }> = {
  gpu: { start: "<!-- NVIDIA & AMD GRAPHICS CARDS -->", end: "<!-- FEATURED PC BUILD CATEGORIES -->" },
  components: { start: "<!-- PC COMPONENTS -->", end: "<!-- GAMING MONITORS -->" },
  shopCategory: { start: "<!-- SHOP BY CATEGORY -->", end: "<!-- PARTNER BRANDS -->" },
  stats: { start: "<!-- BIG STAT", end: "<!-- TESTIMONIALS -->" },
};

function sliceSection(html: string, key: keyof typeof SECTIONS) {
  const { start, end } = SECTIONS[key];
  const i = html.indexOf(start);
  const j = html.indexOf(end, i + 1);
  if (i < 0 || j < 0) return null;
  return { before: html.slice(0, i), slice: html.slice(i, j), after: html.slice(j) };
}

/* ---------------- types ------------------------------------------ */

export type Card = { title: string; desc: string; link: string; img: string };
export type Tile = { title: string; link: string; img: string };
export type Stat = { count: number; suffix: string; label: string };
export type HomeData = {
  gpu: Card[];
  components: Card[];
  shopCategory: Tile[];
  bigStat: { count: number; suffix: string };
  stats: Stat[];
};

/* ---------------- parse ------------------------------------------ */

function decode(s: string): string {
  // turn the few entities we emit back into plain text for editing
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function parseCards(slice: string): Card[] {
  const re =
    /<article class="rtx-card">[\s\S]*?url\('([^']*)'\)[\s\S]*?<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>\s*<a href="([^"]*)"/g;
  const out: Card[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(slice))) out.push({ img: m[1], title: decode(m[2]), desc: decode(m[3]), link: m[4] });
  return out;
}
function parseBuildCards(slice: string): Card[] {
  const re =
    /<a href="([^"]*)" class="build-card">[\s\S]*?url\('([^']*)'\)[\s\S]*?<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g;
  const out: Card[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(slice))) out.push({ link: m[1], img: m[2], title: decode(m[3]), desc: decode(m[4]) });
  return out;
}
function parseTiles(slice: string): Tile[] {
  const re =
    /<a href="([^"]*)" class="shop-cat-card">[\s\S]*?url\('([^']*)'\)[\s\S]*?<h3 class="shop-cat-name">([\s\S]*?)<\/h3>/g;
  const out: Tile[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(slice))) out.push({ link: m[1], img: m[2], title: decode(m[3]) });
  return out;
}
function parseStats(slice: string): Stat[] {
  const re =
    /<span data-count="(\d+)" data-suffix="([^"]*)">[\s\S]*?<\/span><\/div>\s*<div class="lbl">([\s\S]*?)<\/div>/g;
  const out: Stat[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(slice))) out.push({ count: Number(m[1]), suffix: decode(m[2]), label: decode(m[3]) });
  return out;
}

export async function getHome(): Promise<HomeData> {
  const pages = await readPages();
  const html = pages.index.html;
  const gpuSlice = sliceSection(html, "gpu");
  const compSlice = sliceSection(html, "components");
  const shopSlice = sliceSection(html, "shopCategory");
  const statSlice = sliceSection(html, "stats");
  const bigM = (statSlice?.slice || "").match(/<div class="bignum reveal-zoom" data-count="(\d+)" data-suffix="([^"]*)">/);
  return {
    gpu: gpuSlice ? parseCards(gpuSlice.slice) : [],
    components: compSlice ? parseBuildCards(compSlice.slice) : [],
    shopCategory: shopSlice ? parseTiles(shopSlice.slice) : [],
    bigStat: { count: bigM ? Number(bigM[1]) : 0, suffix: bigM ? bigM[2] : "+" },
    stats: statSlice ? parseStats(statSlice.slice) : [],
  };
}

/* ---------------- serialize -------------------------------------- */

function rtxCard(c: Card): string {
  return `<article class="rtx-card">
        <div class="rtx-img" style="background-image:url('${url(c.img)}')"></div>
        <div class="rtx-body">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.desc)}</p>
          <a href="${attr(c.link)}" class="rtx-cta">See more <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </article>`;
}
function buildCard(c: Card): string {
  return `<a href="${attr(c.link)}" class="build-card">
        <div class="build-img" style="background-image:url('${url(c.img)}')"></div>
        <div class="build-body">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.desc)}</p>
          <span class="build-cta">See more <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>`;
}
function shopTile(t: Tile): string {
  return `<a href="${attr(t.link)}" class="shop-cat-card">
      <div class="shop-cat-img" style="background-image:url('${url(t.img)}')"></div>
      <h3 class="shop-cat-name">${esc(t.title)}</h3>

    </a>`;
}
function statBlock(s: Stat): string {
  return `<div class="bs-stat">
        <div class="num"><span data-count="${Math.max(0, Math.round(s.count))}" data-suffix="${attr(s.suffix)}">0${attr(
    s.suffix
  )}</span></div>
        <div class="lbl">${esc(s.label)}</div>
      </div>`;
}

export async function setHome(patch: Partial<HomeData>): Promise<HomeData> {
  const pages = await readPages();
  let html = pages.index.html;

  const apply = (
    key: keyof typeof SECTIONS,
    cards: string | null,
    container: "track" | "grid"
  ) => {
    if (cards == null) return;
    const s = sliceSection(html, key);
    if (!s) return;
    let newSlice: string;
    if (container === "track") {
      newSlice = s.slice.replace(
        /(<div class="scroll-track stagger reveal">)([\s\S]*?)(<\/div>\s*<button class="scroll-arrow scroll-next")/,
        (_m, open, _mid, tail) => `${open}\n      ${cards}\n    ${tail}`
      );
    } else {
      newSlice = s.slice.replace(
        /(<div class="shop-cat-grid stagger reveal">)([\s\S]*?)(<\/div>\s*<\/section>)/,
        (_m, open, _mid, tail) => `${open}\n      ${cards}\n    ${tail}`
      );
    }
    html = s.before + newSlice + s.after;
  };

  if (patch.gpu) apply("gpu", patch.gpu.map(rtxCard).join("\n      "), "track");
  if (patch.components) apply("components", patch.components.map(buildCard).join("\n      "), "track");
  if (patch.shopCategory) apply("shopCategory", patch.shopCategory.map(shopTile).join("\n    "), "grid");

  if (patch.bigStat) {
    html = html.replace(
      /(<div class="bignum reveal-zoom" data-count=")(\d+)(" data-suffix=")([^"]*)(">)([^<]*)(<\/div>)/,
      (_m, a, _c, b, _s, c, _txt, d) =>
        `${a}${Math.max(0, Math.round(patch.bigStat!.count))}${b}${attr(patch.bigStat!.suffix)}${c}0${attr(
          patch.bigStat!.suffix
        )}${d}`
    );
  }

  if (patch.stats) {
    const s = sliceSection(html, "stats");
    if (s) {
      const blocks = patch.stats.map(statBlock).join("\n      ");
      const newSlice = s.slice.replace(
        /(<div class="bs-stats stagger reveal">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/,
        (_m, open, _mid, tail) => `${open}\n      ${blocks}\n    ${tail}`
      );
      html = s.before + newSlice + s.after;
    }
  }

  pages.index.html = html;
  await writePages(pages);
  return getHome();
}

/* ---------------- page SEO + hero -------------------------------- */

export type PageInfo = { slug: string; title: string; description: string };
export type PageDetail = PageInfo & { heroHeading: string | null; heroLead: string | null };

export async function listPages(): Promise<PageInfo[]> {
  const pages = await readPages();
  return Object.keys(pages)
    .map((slug) => ({ slug, title: pages[slug].title || "", description: pages[slug].description || "" }))
    .sort((a, b) => (a.slug === "index" ? -1 : b.slug === "index" ? 1 : a.slug.localeCompare(b.slug)));
}

export async function getPage(slug: string): Promise<PageDetail | null> {
  const pages = await readPages();
  const p = pages[slug];
  if (!p) return null;
  const h1 = p.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const lead = p.html.match(/<p class="lead">([\s\S]*?)<\/p>/);
  return {
    slug,
    title: p.title || "",
    description: p.description || "",
    heroHeading: h1 ? h1[1].trim() : null,
    heroLead: lead ? lead[1].trim() : null,
  };
}

export async function updatePage(
  slug: string,
  fields: { title?: string; description?: string; heroHeading?: string; heroLead?: string }
): Promise<PageDetail | null> {
  const pages = await readPages();
  const p = pages[slug];
  if (!p) return null;
  if (typeof fields.title === "string") p.title = fields.title.slice(0, 200);
  if (typeof fields.description === "string") p.description = fields.description.slice(0, 400);
  if (typeof fields.heroHeading === "string" && /<h1[^>]*>[\s\S]*?<\/h1>/.test(p.html)) {
    p.html = p.html.replace(/(<h1[^>]*>)([\s\S]*?)(<\/h1>)/, (_m, a, _b, c) => `${a}${esc(fields.heroHeading!)}${c}`);
  }
  if (typeof fields.heroLead === "string" && /<p class="lead">[\s\S]*?<\/p>/.test(p.html)) {
    p.html = p.html.replace(/(<p class="lead">)([\s\S]*?)(<\/p>)/, (_m, a, _b, c) => `${a}${esc(fields.heroLead!)}${c}`);
  }
  await writePages(pages);
  return getPage(slug);
}
