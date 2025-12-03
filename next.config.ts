import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'learnwithcap.com',
      },
      {
        protocol: 'https',
        hostname: 'course.learnwithcap.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      // Cho phép load ảnh từ bất kỳ nguồn nào trong quá trình dev (tuỳ chọn)
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
  webpack: (config) => {
    if (process.env.NODE_ENV === "development") {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "@dyad-sh/nextjs-webpack-component-tagger",
      });
    }
    return config;
  },
};

export default nextConfig;