/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize performance
  reactStrictMode: true,
  
  // Suppress Vercel feedback widget errors (if not using it)
  // These errors are harmless but noisy in console
  
  // Optimize images if using next/image
  images: {
    domains: [],
  },
  
  // Reduce bundle size
  swcMinify: true,
  
  // Performance optimizations
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;

