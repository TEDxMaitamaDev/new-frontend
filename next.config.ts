import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY: 'lbuZbsWupmX9dSGXd4XQLX2BtPlkqYmHJOGJYstvejmGLrXbvPZOMhvKyFpGAvzk'
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
