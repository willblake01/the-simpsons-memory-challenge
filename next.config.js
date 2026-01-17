/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.glitch.com"
      },
    ],
  },
};

module.exports = nextConfig;
