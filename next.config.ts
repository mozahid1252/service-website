import type { NextConfig } from "next";

const isExport = process.env.EXPORT_STATIC === "true";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" } : { output: "standalone" }),
  ...(isExport ? { basePath: "/portfolio-website" } : {}),
  images: {
    unoptimized: isExport,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
