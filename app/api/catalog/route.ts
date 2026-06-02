import { NextRequest, NextResponse } from "next/server";
import { isValidSlug, readCategory } from "../../_lib/admin";

export const dynamic = "force-dynamic";

// Public, unauthenticated catalog read used by the storefront renderer
// (public/js/products.js). Returns the live, admin-edited items for a
// category — from Blob on Vercel, or the committed file as a fallback.
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("category") || "";
  if (!isValidSlug(slug)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  try {
    const data = await readCategory(slug);
    return NextResponse.json(
      { category: slug, items: data.items },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
}
