import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY: 'lbuZbsWupmX9dSGXd4XQLX2BtPlkqYmHJOGJYstvejmGLrXbvPZOMhvKyFpGAvzk',
    NEXT_PUBLIC_API_BASE_URL: 'https://server.tedxmaitama.com/api'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'server.tedxmaitama.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
