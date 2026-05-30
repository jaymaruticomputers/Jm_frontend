import type { MetadataRoute } from "next";
import pagesData from "./_content/pages.json";

const SITE_URL = "https://www.jmcomputer.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = Object.keys(pagesData as Record<string, unknown>);
  const lastModified = new Date();

  // Home page (the "index" entry is served at "/")
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
  ];

  // Every other content page lives at /<slug>
  for (const slug of slugs) {
    if (slug === "index") continue;
    entries.push({
      url: `${SITE_URL}/${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return entries;
}
