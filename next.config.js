/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion']
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
