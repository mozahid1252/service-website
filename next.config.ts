import type { NextConfig } from "next";

/* Vercel sets VERCEL=1 automatically. On Vercel we do NOT set output —
   Vercel handles the output format automatically for Next.js projects.
   EXPORT_STATIC is only for GitHub Pages builds (output: export). */
const isVercel = process.env.VERCEL === "1";
const isExport = !isVercel && process.env.EXPORT_STATIC === "true";
/* GitHub Pages doesn't have VERCEL set, so only GitHub Pages needs the
   /service-website basePath. */
const needsBasePath = isExport && !isVercel;

const nextConfig: NextConfig = {
  /* Only set output for non-Vercel builds (GitHub Pages static export).
     On Vercel, don't set output — Vercel handles it automatically. */
  ...(isExport ? { output: "export" as const } : {}),
  ...(needsBasePath ? { basePath: "/service-website" } : {}),
  images: {
    unoptimized: isExport,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: needsBasePath ? "/service-website" : "",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
