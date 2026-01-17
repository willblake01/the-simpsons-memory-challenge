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

export default nextConfig;
