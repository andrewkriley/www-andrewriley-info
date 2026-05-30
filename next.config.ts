import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  allowedDevOrigins: ["localhost", "127.0.0.1", "10.54.254.11"],
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/impact",
        destination: "/lead",
        permanent: true,
      },
      {
        source: "/djriles",
        destination: "/play",
        permanent: true,
      },
      {
        source: "/make",
        destination: "/build",
        permanent: true,
      },
      {
        source: "/create",
        destination: "/play",
        permanent: true,
      },
      {
        source: "/letscollaborate",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/archives",
        destination: "/build#build-writing",
        permanent: true,
      },
      {
        source: "/writing",
        destination: "/build#build-writing",
        permanent: true,
      },
      {
        source: "/categories/technology",
        destination: "/build",
        permanent: true,
      },
      {
        source: "/categories/home",
        destination: "/build",
        permanent: true,
      },
      {
        source: "/categories/music",
        destination: "/play",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
