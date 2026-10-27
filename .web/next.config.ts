import type { NextConfig } from "next";
import { buildContentData } from "./lib/content/build";

buildContentData();

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
