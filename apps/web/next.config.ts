import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@delai/core",
    "@delai/api",
    "@delai/ui",
    "@tamagui/core",
    "tamagui",
  ],
  experimental: {
    optimizePackageImports: ["@delai/core", "@delai/api"],
  },
};

export default nextConfig;
