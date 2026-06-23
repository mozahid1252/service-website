import type { NextConfig } from "next";

const isExport = process.env.EXPORT_STATIC === "true";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" } : { output: "standalone" }),
  ...(isExport ? { basePath: "/portfolio-website" } : {}),
  images: {
    unoptimized: isExport,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isExport ? "/portfolio-website" : "",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
