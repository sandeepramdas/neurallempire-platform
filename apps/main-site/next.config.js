/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@neurallempire/ui'],
  // Remove static export to enable dynamic admin features
  // output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
