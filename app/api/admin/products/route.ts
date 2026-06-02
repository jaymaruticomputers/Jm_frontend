import { NextRequest, NextResponse } from "next/server";
import {
  isAuthed,
  isValidSlug,
  readCategory,
  writeCategory,
  sanitizeProduct,
} from "../../../_lib/admin";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// GET ?category=slug — list products in a category.
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();
  const slug = req.nextUrl.searchParams.get("category") || "";
  if (!isValidSlug(slug)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  try {
    const data = await readCategory(slug);
    return NextResponse.json({ category: slug, items: data.items });
  } catch {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
}

// POST { category, product, position? } — add a product (default: top of list).
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();
  const body = await req.json().catch(() => null);
  const slug = body?.category;
  if (!isValidSlug(slug)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  const product = sanitizeProduct(body?.product || {});
  if (!product.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const data = await readCategory(slug).catch(() => null);
  if (!data) return NextResponse.json({ error: "Category not found" }, { status: 404 });
  if (body?.position === "bottom") data.items.push(product);
  else data.items.unshift(product);
  await writeCategory(slug, data);
  return NextResponse.json({ ok: true, items: data.items });
}

// PUT { category, index, product } — update a product in place.
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();
  const body = await req.json().catch(() => null);
  const slug = body?.category;
  const index = Number(body?.index);
  if (!isValidSlug(slug)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  const data = await readCategory(slug).catch(() => null);
  if (!data) return NextResponse.json({ error: "Category not found" }, { status: 404 });
  if (!Number.isInteger(index) || index < 0 || index >= data.items.length)
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  data.items[index] = sanitizeProduct({ ...data.items[index], ...body.product });
  await writeCategory(slug, data);
  return NextResponse.json({ ok: true, items: data.items });
}

// DELETE ?category=slug&index=n — remove a product.
export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();
  const slug = req.nextUrl.searchParams.get("category") || "";
  const index = Number(req.nextUrl.searchParams.get("index"));
  if (!isValidSlug(slug)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  const data = await readCategory(slug).catch(() => null);
  if (!data) return NextResponse.json({ error: "Category not found" }, { status: 404 });
  if (!Number.isInteger(index) || index < 0 || index >= data.items.length)
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  const [removed] = data.items.splice(index, 1);
  await writeCategory(slug, data);
  return NextResponse.json({ ok: true, removed, items: data.items });
}
