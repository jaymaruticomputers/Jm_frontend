import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";
import { isAuthed, isValidSlug, IMAGES_DIR, useBlob } from "../../../_lib/admin";

export const dynamic = "force-dynamic";

const ALLOWED = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);

// POST multipart/form-data { category, file } — saves the image under
// /public/eh-images/<category>/ and returns its web path.
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Bad form data" }, { status: 400 });

  const category = String(form.get("category") || "");
  const file = form.get("file");
  if (!isValidSlug(category)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });

  const origExt = (file.name.split(".").pop() || "").toLowerCase();
  const ext = ALLOWED.has(origExt) ? origExt : "jpg";

  // build a safe, unique filename from the (optional) provided base name
  const baseRaw = String(form.get("filename") || file.name.replace(/\.[^.]+$/, "") || "image");
  const base =
    baseRaw
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "image";
  const stamp = Date.now().toString(36);
  const filename = `${base}-${stamp}.${ext}`;

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > 8 * 1024 * 1024)
    return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });

  // On Vercel (read-only FS) store the image in Blob and return its public
  // URL; locally write it under /public/eh-images and return the web path.
  if (useBlob()) {
    const { url } = await put(`eh-images/${category}/${filename}`, buf, {
      access: "public",
      contentType: file.type || undefined,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return NextResponse.json({ ok: true, path: url });
  }

  const dir = path.join(IMAGES_DIR, category);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buf);

  return NextResponse.json({ ok: true, path: `/eh-images/${category}/${filename}` });
}
