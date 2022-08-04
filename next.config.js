/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
  },
  reactStrictMode: true,
  images: {
    domains: ["media-exp1.licdn.com"],
  },
};

module.exports = withPWA({ nextConfig });
