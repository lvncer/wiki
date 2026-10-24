import fs from "node:fs";
import path from "node:path";
import { walkMarkdownFiles, topCategoryOf, readFileUtf8 } from "./fs";
import { splitFrontmatter, titleOf } from "./frontmatter";
import { processMarkdown, type LinkedNote } from "./markdown";
import { fileToSlug } from "./slug";
import { colorForCategory } from "./categories";

const CACHE_DIR = path.resolve(process.cwd(), ".content-cache");
const PUBLIC_GENERATED_DIR = path.resolve(process.cwd(), "public", "generated");

export interface NoteRecord {
  slug: string;
  title: string;
  category?: string;
  html: string;
  backlinks: { slug: string; title: string }[];
}

interface InternalRecord {
  absPath: string;
  title: string;
  category?: string;
  html: string;
  plainText: string;
  linkedNotes: LinkedNote[];
}

function fallbackTitleFor(absPath: string, slug: string): string {
  if (slug === "") return "lvncerpedia";
  const base = path.basename(absPath);
  if (base.toLowerCase() === "readme.md") {
    return path.basename(path.dirname(absPath));
  }
  return base.replace(/\.md$/i, "");
}

/** リポジトリ全体を一度だけ読み、本文HTML・検索用プレーンテキスト・グラフ用エッジを生成する。
 *  next.config.ts から dev / build の両方で必ず一度呼ばれる(npm スクリプトのライフサイクルに依存しない)。 */
export function buildContentData(): { notes: NoteRecord[] } {
  const files = walkMarkdownFiles();
  const bySlug = new Map<string, InternalRecord>();

  for (const absPath of files) {
    const raw = readFileUtf8(absPath);
    const { content } = splitFrontmatter(raw);
    const slug = fileToSlug(absPath);
    const title = titleOf(content, fallbackTitleFor(absPath, slug));
    const { html, linkedNotes, plainText } = processMarkdown(absPath, content);
    bySlug.set(slug, {
      absPath,
      title,
      category: topCategoryOf(absPath),
      html,
      plainText: plainText.slice(0, 20000),
      linkedNotes,
    });
  }

  // バックリンク(逆引き): UI 表示用なので同じ相手からの重複リンクは1件にまとめる(フォルダ宛リンクも含める)
  const backlinkMap = new Map<string, Set<string>>();
  // グラフのエッジ: .scripts/gen_index.py --stats のエッジ数(=フォルダ宛リンクを除いた全出現回数)と一致させる
  const graphLinks: { source: string; target: string }[] = [];

  for (const [slug, rec] of bySlug) {
    for (const link of rec.linkedNotes) {
      const targetSlug = fileToSlug(link.absPath);
      if (targetSlug === slug) continue;
      if (!bySlug.has(targetSlug)) continue;
      if (!link.isDirectoryLink) graphLinks.push({ source: slug, target: targetSlug });
      if (!backlinkMap.has(targetSlug)) backlinkMap.set(targetSlug, new Set());
      backlinkMap.get(targetSlug)!.add(slug);
    }
  }

  const notes: NoteRecord[] = [...bySlug.entries()]
    .map(([slug, rec]) => ({
      slug,
      title: rec.title,
      category: rec.category,
      html: rec.html,
      backlinks: [...(backlinkMap.get(slug) ?? [])]
        .map((s) => ({ slug: s, title: bySlug.get(s)!.title }))
        .sort((a, b) => a.title.localeCompare(b.title, "ja")),
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  // --- 内部キャッシュ(public 配下には置かない=ブラウザから直接見えない) ---
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(path.join(CACHE_DIR, "notes.json"), JSON.stringify(notes), "utf-8");

  // --- ブラウザから fetch される生成物 ---
  fs.mkdirSync(PUBLIC_GENERATED_DIR, { recursive: true });

  const graphNodes = notes.map((n) => ({
    id: n.slug,
    title: n.title,
    category: n.category ?? null,
    color: colorForCategory(n.category),
  }));
  fs.writeFileSync(
    path.join(PUBLIC_GENERATED_DIR, "graph.json"),
    JSON.stringify({ nodes: graphNodes, links: graphLinks }),
    "utf-8"
  );

  const searchDocs = notes.map((n) => ({
    id: n.slug,
    title: n.title,
    category: n.category ?? null,
    slug: n.slug,
    body: bySlug.get(n.slug)!.plainText,
  }));
  fs.writeFileSync(path.join(PUBLIC_GENERATED_DIR, "search-docs.json"), JSON.stringify(searchDocs), "utf-8");

  return { notes };
}
