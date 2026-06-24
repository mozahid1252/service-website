import type { NextConfig } from "next";

const isExport = process.env.EXPORT_STATIC === "true";
/* Vercel sets VERCEL=1 automatically. GitHub Pages doesn't, so only
   GitHub Pages needs the /service-website basePath. On Vercel we serve
   from the root so images/PDFs/fonts resolve correctly. */
const isVercel = process.env.VERCEL === "1";
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
