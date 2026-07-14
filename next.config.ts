import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixes the Cross-origin request warning for your local network IP
  allowedDevOrigins: ['192.168.31.153', '192.168.31.153:3000'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-4073fd5b337344249e057b7aafa6bb8a.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.coachingkart.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;