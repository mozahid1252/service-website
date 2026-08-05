import type { NextConfig } from "next";

/* Vercel sets VERCEL=1 automatically. On Vercel we always use standalone
   output (NOT static export) so that API routes (/api/chat) work as
   serverless functions. EXPORT_STATIC is only for GitHub Pages builds. */
const isVercel = process.env.VERCEL === "1";
const isExport = !isVercel && process.env.EXPORT_STATIC === "true";
/* GitHub Pages doesn't have VERCEL set, so only GitHub Pages needs the
   /service-website basePath. */
const needsBasePath = isExport && !isVercel;

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" } : { output: "standalone" }),
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
