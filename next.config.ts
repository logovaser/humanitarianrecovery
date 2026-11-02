import type { NextConfig } from "next";

const r2PublicUrl = process.env.R2_PUBLIC_URL ?? "";
const r2Hostname = r2PublicUrl ? new URL(r2PublicUrl).hostname : "";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Image uploads go through Server Actions, which default to a 1 MB body.
      // 6 MB leaves room for the form-data overhead on a 5 MB image.
      bodySizeLimit: "6mb",
    },
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: r2Hostname ? [{ protocol: "https", hostname: r2Hostname }] : [],
  },
};

export default nextConfig;
