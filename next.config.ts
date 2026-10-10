import type { NextConfig } from "next";

/** Serve the unchanged V3 standalone website through the existing Next.js deployment. */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async rewrites() {
    return [{ source: "/", destination: "/index.html" }];
  },
};

export default nextConfig;
