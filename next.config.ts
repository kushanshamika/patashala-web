import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add other domains if needed
  },
};

export default nextConfig;
