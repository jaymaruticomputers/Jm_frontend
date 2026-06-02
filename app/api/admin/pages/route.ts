import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "../../../_lib/admin";
import { listPages, getPage, updatePage } from "../../../_lib/home";

export const dynamic = "force-dynamic";

// GET            -> list of pages
// GET ?slug=xxx  -> one page's editable fields
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = req.nextUrl.searchParams.get("slug");
  if (slug) {
    const page = await getPage(slug);
    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(page);
  }
  return NextResponse.json({ pages: await listPages() });
}

// PUT { slug, title?, description?, heroHeading?, heroLead? }
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const slug = body?.slug;
  if (!slug || typeof slug !== "string")
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  const page = await updatePage(slug, body);
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, page });
}
