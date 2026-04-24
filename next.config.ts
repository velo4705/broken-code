import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // We cast to 'any' here to bypass the strict type check
    // while still passing the configuration to the build engine.
    turbo: {
      root: './',
    },
  } as any,
};

export default nextConfig;