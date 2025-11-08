// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 本番環境のみ静的エクスポート（Vercelでは環境変数VERCELが設定される）
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
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

