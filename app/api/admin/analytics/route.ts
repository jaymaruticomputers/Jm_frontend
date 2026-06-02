import { NextRequest, NextResponse } from "next/server";
import { isAuthed, readVisits, type Visit } from "../../../_lib/admin";

export const dynamic = "force-dynamic";

const DAY = 24 * 60 * 60 * 1000;

// identity for "unique visitor": cookie id when present, else fall back to UA
const vidOf = (v: Visit) => v.vid || v.ua || "?";

function refDomain(ref: string): string {
  if (!ref) return "Direct / none";
  try {
    const h = new URL(ref).hostname.replace(/^www\./, "");
    return h || "Direct / none";
  } catch {
    return "Direct / none";
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const visits = await readVisits();
  const now = Date.now();

  const within = (ms: number) => visits.filter((v) => now - v.ts < ms);
  const uniq = (arr: Visit[]) => new Set(arr.map(vidOf)).size;

  const v24 = within(DAY);
  const v7 = within(7 * DAY);

  // top pages
  const pageCounts: Record<string, number> = {};
  for (const v of visits) pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
  const topPages = Object.entries(pageCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  // top referrers (where visitors came from)
  const refCounts: Record<string, number> = {};
  for (const v of visits) {
    const d = refDomain(v.ref);
    refCounts[d] = (refCounts[d] || 0) + 1;
  }
  const referrers = Object.entries(refCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // device split
  const devCounts: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
  for (const v of visits) {
    const d = v.dev || "Desktop";
    devCounts[d] = (devCounts[d] || 0) + 1;
  }
  const devices = Object.entries(devCounts)
    .filter(([, c]) => c > 0)
    .map(([name, count]) => ({ name, count }));

  // 14-day series: page views + unique visitors per day
  const byDay: { day: string; views: number; visitors: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * DAY);
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const dayEnd = dayStart + DAY;
    const slice = visits.filter((v) => v.ts >= dayStart && v.ts < dayEnd);
    byDay.push({ day: `${d.getMonth() + 1}/${d.getDate()}`, views: slice.length, visitors: uniq(slice) });
  }

  const recent = visits.slice(-50).reverse();

  return NextResponse.json({
    views: { total: visits.length, last24h: v24.length, last7d: v7.length },
    visitors: { total: uniq(visits), last24h: uniq(v24), last7d: uniq(v7) },
    topPages,
    referrers,
    devices,
    byDay,
    recent,
  });
}
