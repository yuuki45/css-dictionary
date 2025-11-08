// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的サイトとしてエクスポート
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

