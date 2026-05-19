import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
  experimental: {
    turbo: {
      root: __dirname,
    },
  } as Record<string, unknown>,
};

export default nextConfig;
