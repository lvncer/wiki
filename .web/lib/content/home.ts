import fs from "node:fs";
import path from "node:path";
import { splitFrontmatter } from "./frontmatter";
import { processMarkdown } from "./markdown";

// ルートの README.md(Obsidian / .scripts/gen_index.py 用)とは別の、
// サイトのトップページ専用コンテンツ。.web/ 内なので gen_index.py / sync_wiki_topics.py には影響しない。
const HOME_CONTENT_PATH = path.resolve(process.cwd(), "content", "home.md");

export interface HomeContent {
  title: string;
  html: string;
}

export function getHomeContent(): HomeContent {
  const raw = fs.readFileSync(HOME_CONTENT_PATH, "utf-8");
  const { data, content } = splitFrontmatter(raw);
  const { html } = processMarkdown(HOME_CONTENT_PATH, content);
  const title = typeof data.title === "string" ? data.title : "lvncerpedia";
  return { title, html };
}
