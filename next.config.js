/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  pwa: {
    dest: "public",
  },
  reactStrictMode: true,
  images: {
    domains: ["media-exp1.licdn.com"],
  },
};

module.exports = withPWA({ nextConfig });
