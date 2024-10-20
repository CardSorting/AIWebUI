const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'page.tsx', 'api.ts', 'api.js'],
  reactStrictMode: true,
  images: {
    domains: [
      'fal.media', // Current image domain
      'f005.backblazeb2.com', // Add Backblaze domain
    ],
  },
});