import type { NextConfig } from "next";
import { buildContentData } from "./lib/content/build";

// dev / build どちらでも next.config.ts の評価時に必ず一度だけ実行される。
// npm run scripts の prebuild ライフサイクル(パッケージマネージャ依存)に頼らないための設計。
buildContentData();

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
