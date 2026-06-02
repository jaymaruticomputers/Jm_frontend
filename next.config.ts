import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The admin data layer (app/_lib/admin.ts) builds fs paths from process.cwd()
  // into /public, so @vercel/nft can't tell which files the route touches and
  // conservatively bundles ALL of /public — including the hundreds of MB in
  // public/eh-images — into every API function, blowing past Vercel's 300 MB
  // limit. These assets are served by the CDN as static files; a function never
  // needs them in its own bundle, so exclude them from the API route traces.
  outputFileTracingExcludes: {
    "/api/**": ["public/eh-images/**", "public/**/*.{jpg,jpeg,png,webp,gif,avif}"],
  },
};

export default nextConfig;
