import { NextRequest, NextResponse } from "next/server";
import { ADMIN_PASSWORD, COOKIE_NAME, makeToken, isAuthed } from "../../../_lib/admin";

export const dynamic = "force-dynamic";

// GET — report whether the current request is authenticated.
export async function GET(req: NextRequest) {
  return NextResponse.json({ authed: isAuthed(req) });
}

// POST { password } — log in.
export async function POST(req: NextRequest) {
  let password = "";
  try {
    const body = await req.json();
    password = String(body?.password ?? "");
  } catch {
    /* ignore */
  }
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
  return res;
}

// DELETE — log out.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
