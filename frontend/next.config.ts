import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/tutorials", destination: "/dashboard", permanent: false },
      { source: "/playground", destination: "/tryit", permanent: false },
      { source: "/quizzes/:path*", destination: "/dashboard", permanent: false },
      { source: "/glossary", destination: "/dashboard", permanent: false },
      { source: "/ai-tutor", destination: "/dashboard", permanent: false },
      { source: "/help", destination: "/dashboard", permanent: false },
      { source: "/search", destination: "/dashboard", permanent: false },
      { source: "/about", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
