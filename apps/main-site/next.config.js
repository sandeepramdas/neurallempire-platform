/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@neurallempire/ui'],
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
