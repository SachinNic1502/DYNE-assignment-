import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    PRISMA_CLIENT_ENGINE_TYPE: 'library',
  },
};

export default nextConfig;
