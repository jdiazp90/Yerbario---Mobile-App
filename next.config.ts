import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default is 1MB — too small for real phone photos, and the cata form
      // can submit two photos (cata + molienda) in a single request.
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
