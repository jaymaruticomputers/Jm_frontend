import { NextRequest, NextResponse } from "next/server";
import { recordVisit, newVisitorId, deviceType } from "../../_lib/admin";

export const dynamic = "force-dynamic";

const VID_COOKIE = "jm_vid";

// Public endpoint hit by a small beacon on every page view. Best-effort:
// never throws back to the client, never blocks rendering. Also assigns a
// persistent anonymous visitor id so the admin can count unique users.
export async function POST(req: NextRequest) {
  // resolve / create the anonymous visitor id
  let vid = req.cookies.get(VID_COOKIE)?.value || "";
  const isNew = !vid;
  if (!vid) vid = newVisitorId();

  try {
    const text = await req.text();
    let path = "/";
    try {
      const parsed = JSON.parse(text || "{}");
      if (parsed && typeof parsed.path === "string") path = parsed.path;
    } catch {
      /* ignore malformed body */
    }
    if (path.length > 300) path = path.slice(0, 300);
    const ref = (req.headers.get("referer") || "").slice(0, 300);
    const ua = (req.headers.get("user-agent") || "").slice(0, 300);
    if (!path.startsWith("/admin")) {
      await recordVisit({ ts: Date.now(), path, ref, ua, vid, dev: deviceType(ua) });
    }
  } catch {
    /* swallow — analytics must never break the site */
  }

  const res = new NextResponse(null, { status: 204 });
  if (isNew) {
    res.cookies.set(VID_COOKIE, vid, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
    });
  }
  return res;
}
