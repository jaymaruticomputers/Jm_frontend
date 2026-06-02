import { NextRequest, NextResponse } from "next/server";
import { isAuthed, listCategories } from "../../../_lib/admin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const categories = await listCategories();
  return NextResponse.json({ categories });
}
