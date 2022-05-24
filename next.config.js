/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STRIPE_PUBLIC: process.env.STRIPE_PUBLIC
  }
}

module.exports = nextConfig
