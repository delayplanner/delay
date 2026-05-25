import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@delay/core",
    "@delay/api",
    "@delay/ui",
    "@tamagui/core",
    "tamagui",
  ],
  experimental: {
    optimizePackageImports: ["@delay/core", "@delay/api"],
  },
};

export default nextConfig;
