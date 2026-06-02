import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "../../../_lib/admin";
import { getHome, setHome, type HomeData } from "../../../_lib/home";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getHome());
}

// PUT { gpu?, components?, shopCategory?, bigStat?, stats? } — save edited sections.
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as Partial<HomeData>;
  const data = await setHome(body);
  return NextResponse.json({ ok: true, ...data });
}
