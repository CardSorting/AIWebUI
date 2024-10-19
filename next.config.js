const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  pageExtensions: ['page.tsx', 'api.ts', 'api.js'],
  reactStrictMode: true,
  images: {
    domains: [
      'fal.media', // Current image domain
      // 'example.com', // Add more domains as needed
    ],
  },
});