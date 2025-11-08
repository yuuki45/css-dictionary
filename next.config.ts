// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 開発時はoutput: 'export'をコメントアウト
  // 本番ビルド時のみ有効化する
  // output: 'export',
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

