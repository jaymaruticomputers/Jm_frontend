import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { NextRequest } from "next/server";

/* ------------------------------------------------------------------ *
 * JM COMPUTERS — Admin data layer (file-based)
 *
 * Products live in /public/eh-data/<category>.json and the storefront
 * renderer (public/js/products.js) reads those files live, so anything
 * the admin saves here shows up on the site immediately.
 *
 * NOTE: this persists to the local filesystem. It works with `next dev`
 * and a long-running Node server (`next start`). On read-only/serverless
 * hosting (e.g. Vercel) the writes will not persist — move the data to a
 * database/object store for that case.
 * ------------------------------------------------------------------ */

export const PUBLIC_DIR = path.join(process.cwd(), "public");
export const DATA_DIR = path.join(PUBLIC_DIR, "eh-data");
export const IMAGES_DIR = path.join(PUBLIC_DIR, "eh-images");
export const VISITS_FILE = path.join(process.cwd(), "data", "visits.json");

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jmadmin";
const SECRET = process.env.ADMIN_SECRET || ADMIN_PASSWORD + "::jm-computers";
export const COOKIE_NAME = "jm_admin";

/* ---------------- Auth (signed cookie, no DB needed) -------------- */

export function makeToken(): string {
  // token = base64(issuedAt).hmac — verified by recomputing the HMAC.
  const issued = Date.now().toString();
  const payload = Buffer.from(issued).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  if (sig.length !== expected.length) return false;
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  // optional expiry: 30 days
  const issued = parseInt(Buffer.from(payload, "base64url").toString(), 10);
  if (!Number.isFinite(issued)) return false;
  return Date.now() - issued < 30 * 24 * 60 * 60 * 1000;
}

export function isAuthed(req: NextRequest): boolean {
  return verifyToken(req.cookies.get(COOKIE_NAME)?.value);
}

/* ---------------- Category / product storage ---------------------- */

export type Product = { name: string; price: number; mrp: number; path: string; oos?: boolean };
export type CategoryFile = { key: string; collectionUrl?: string; items: Product[] };

const SLUG_RE = /^[a-z0-9-]+$/;

export function isValidSlug(slug: string): boolean {
  return typeof slug === "string" && SLUG_RE.test(slug);
}

export async function listCategories(): Promise<{ slug: string; count: number }[]> {
  const files = await fs.readdir(DATA_DIR);
  const out: { slug: string; count: number }[] = [];
  for (const f of files) {
    if (!f.endsWith(".json")) continue;
    const slug = f.replace(/\.json$/, "");
    try {
      const data = await readCategory(slug);
      out.push({ slug, count: data.items.length });
    } catch {
      out.push({ slug, count: 0 });
    }
  }
  out.sort((a, b) => a.slug.localeCompare(b.slug));
  return out;
}

function categoryPath(slug: string): string {
  if (!isValidSlug(slug)) throw new Error("Invalid category");
  return path.join(DATA_DIR, `${slug}.json`);
}

export async function readCategory(slug: string): Promise<CategoryFile> {
  const raw = await fs.readFile(categoryPath(slug), "utf8");
  const data = JSON.parse(raw) as CategoryFile;
  if (!Array.isArray(data.items)) data.items = [];
  return data;
}

export async function writeCategory(slug: string, data: CategoryFile): Promise<void> {
  // Compact single-line JSON to match the existing eh-data files.
  await fs.writeFile(categoryPath(slug), JSON.stringify(data), "utf8");
}

export function sanitizeProduct(p: Partial<Product>): Product {
  return {
    name: String(p.name ?? "").trim().slice(0, 300),
    price: Number.isFinite(Number(p.price)) ? Math.max(0, Math.round(Number(p.price))) : 0,
    mrp: Number.isFinite(Number(p.mrp)) ? Math.max(0, Math.round(Number(p.mrp))) : 0,
    path: String(p.path ?? "").trim().slice(0, 500),
    ...(p.oos ? { oos: true } : {}),
  };
}

/* ---------------- Visit analytics --------------------------------- */

export type Visit = { ts: number; path: string; ref: string; ua: string; vid?: string; dev?: string };

// A random, anonymous visitor id stored in a first-party cookie so we can
// count unique users without any third-party analytics.
export function newVisitorId(): string {
  return crypto.randomBytes(12).toString("hex");
}

// Coarse device classification from the User-Agent string.
export function deviceType(ua: string): "Mobile" | "Tablet" | "Desktop" {
  const s = (ua || "").toLowerCase();
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(s)) return "Tablet";
  if (/mobi|iphone|ipod|android.*mobile|windows phone/.test(s)) return "Mobile";
  return "Desktop";
}

export async function recordVisit(v: Visit): Promise<void> {
  await fs.mkdir(path.dirname(VISITS_FILE), { recursive: true });
  let list: Visit[] = [];
  try {
    list = JSON.parse(await fs.readFile(VISITS_FILE, "utf8"));
    if (!Array.isArray(list)) list = [];
  } catch {
    list = [];
  }
  list.push(v);
  // keep the log bounded
  if (list.length > 20000) list = list.slice(-20000);
  await fs.writeFile(VISITS_FILE, JSON.stringify(list), "utf8");
}

export async function readVisits(): Promise<Visit[]> {
  try {
    const list = JSON.parse(await fs.readFile(VISITS_FILE, "utf8"));
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}
