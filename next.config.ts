import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ❌ REMOVE THIS LINE: output: 'export',
  distDir: "out",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;