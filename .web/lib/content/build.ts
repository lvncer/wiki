import fs from "node:fs";
import path from "node:path";
import { colorForCategory } from "./categories";
import {
  splitFrontmatter,
  stripGeneratedIndexBlock,
  titleOf,
} from "./frontmatter";
import {
  listImmediateChildren,
  readFileUtf8,
  topCategoryOf,
  walkDirectories,
  walkMarkdownFiles,
} from "./fs";
import { type LinkedNote, processMarkdown } from "./markdown";
import { fileToSlug } from "./slug";

const CACHE_DIR = path.resolve(process.cwd(), ".content-cache");
const PUBLIC_GENERATED_DIR = path.resolve(process.cwd(), "public", "generated");

export interface DirectoryEntry {
  kind: "folder" | "file";
  slug: string;
  title: string;
}

export interface NoteRecord {
  slug: string;
  title: string;
  category?: string;
  html: string;
  backlinks: { slug: string; title: string }[];
  /** README.md かつ直下に子がある場合のみ: GitHub 風のフォルダ内一覧(サブフォルダ→ファイルの順)。 */
  children?: DirectoryEntry[];
}

interface InternalRecord {
  absPath: string;
  title: string;
  category?: string;
  html: string;
  plainText: string;
  linkedNotes: LinkedNote[];
}

/** 指定フォルダ直下の子(サブフォルダ→ファイルの順)を一覧化する。
 *  GitHub のリポジトリブラウザ相当の一覧を Web 側だけで組み立てる(ソースの .md は変更しない)。
 *  `allSlugs` には実ファイルだけでなく README.md を持たない合成ディレクトリページも含める。 */
function directoryChildrenForDir(
  dirAbsPath: string,
  allSlugs: Set<string>,
): DirectoryEntry[] | undefined {
  const { dirs, files } = listImmediateChildren(dirAbsPath);
  const entries: DirectoryEntry[] = [];

  // 表示名は H1(表記ゆれが大きい)ではなく、実際のフォルダ名・ファイル名をそのまま使う。
  for (const d of dirs) {
    const slug = fileToSlug(path.join(d, "README.md"));
    if (allSlugs.has(slug))
      entries.push({ kind: "folder", slug, title: path.basename(d) });
  }
  for (const f of files) {
    if (!f.toLowerCase().endsWith(".md")) continue;
    if (path.basename(f).toLowerCase() === "readme.md") continue;
    const slug = fileToSlug(f);
    if (allSlugs.has(slug))
      entries.push({ kind: "file", slug, title: path.basename(f, ".md") });
  }
  return entries.length > 0 ? entries : undefined;
}

/** README.md のファイルについてのみ、直下の子を一覧化する(それ以外の .md は一覧を持たない)。 */
function directoryChildrenFor(
  absPath: string,
  allSlugs: Set<string>,
): DirectoryEntry[] | undefined {
  if (path.basename(absPath).toLowerCase() !== "readme.md") return undefined;
  return directoryChildrenForDir(path.dirname(absPath), allSlugs);
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
    // linkedNotes(グラフ・バックリンク用)は元の本文(自動生成ブロック込み)から抽出する。
    // .scripts/gen_index.py --stats のエッジ数(477)はこのブロック内のリンクが大半を占めるため、
    // ここで取りこぼすとグラフがスカスカになる。
    const { html, linkedNotes, plainText } = processMarkdown(absPath, content);
    // 表示用 HTML だけ、GitHub 風の一覧コンポーネントに置き換える自動生成ブロックを取り除く
    // (コメントマーカーはレンダリング後も HTML コメントとして残るため、同じ正規表現で除去できる)。
    const displayHtml = stripGeneratedIndexBlock(html);
    bySlug.set(slug, {
      absPath,
      title,
      category: topCategoryOf(absPath),
      html: displayHtml,
      plainText: plainText.slice(0, 20000),
      linkedNotes,
    });
  }

  // README.md を持たないフォルダにも、最低限ファイルツリーだけは表示できるよう合成ページを用意する
  // (直下に何かしら子がある場合のみ。完全に空のフォルダは対象外)。
  const allSlugs = new Set(bySlug.keys());
  const syntheticDirs: { slug: string; absPath: string }[] = [];
  for (const absPath of walkDirectories()) {
    const slug = fileToSlug(path.join(absPath, "README.md"));
    if (allSlugs.has(slug)) continue;
    const { dirs, files } = listImmediateChildren(absPath);
    if (dirs.length === 0 && files.length === 0) continue;
    allSlugs.add(slug);
    syntheticDirs.push({ slug, absPath });
  }

  const titleBySlug = new Map<string, string>();
  for (const [slug, rec] of bySlug) titleBySlug.set(slug, rec.title);
  for (const { slug, absPath } of syntheticDirs)
    titleBySlug.set(slug, path.basename(absPath));

  // バックリンク(逆引き): UI 表示用なので同じ相手からの重複リンクは1件にまとめる(フォルダ宛リンクも含める)
  const backlinkMap = new Map<string, Set<string>>();
  // グラフのエッジ: .scripts/gen_index.py --stats のエッジ数(=フォルダ宛リンクを除いた全出現回数)と一致させる
  const graphLinks: { source: string; target: string }[] = [];

  for (const [slug, rec] of bySlug) {
    for (const link of rec.linkedNotes) {
      const targetSlug = fileToSlug(link.absPath);
      if (targetSlug === slug) continue;
      if (!allSlugs.has(targetSlug)) continue;
      if (!link.isDirectoryLink)
        graphLinks.push({ source: slug, target: targetSlug });
      if (!backlinkMap.has(targetSlug)) backlinkMap.set(targetSlug, new Set());
      backlinkMap.get(targetSlug)!.add(slug);
    }
  }

  const realNotes: NoteRecord[] = [...bySlug.entries()].map(([slug, rec]) => ({
    slug,
    title: rec.title,
    category: rec.category,
    html: rec.html,
    backlinks: [...(backlinkMap.get(slug) ?? [])]
      .map((s) => ({ slug: s, title: titleBySlug.get(s) ?? s }))
      .sort((a, b) => a.title.localeCompare(b.title, "ja")),
    children: directoryChildrenFor(rec.absPath, allSlugs),
  }));

  const syntheticNotes: NoteRecord[] = syntheticDirs.map(
    ({ slug, absPath }) => {
      const title = path.basename(absPath);
      const virtualReadme = path.join(absPath, "README.md");
      const { html } = processMarkdown(virtualReadme, `# ${title}\n`);
      return {
        slug,
        title,
        category: topCategoryOf(virtualReadme),
        html,
        backlinks: [...(backlinkMap.get(slug) ?? [])]
          .map((s) => ({ slug: s, title: titleBySlug.get(s) ?? s }))
          .sort((a, b) => a.title.localeCompare(b.title, "ja")),
        children: directoryChildrenForDir(absPath, allSlugs),
      };
    },
  );

  const notes: NoteRecord[] = [...realNotes, ...syntheticNotes].sort((a, b) =>
    a.slug.localeCompare(b.slug),
  );

  // --- 内部キャッシュ(public 配下には置かない=ブラウザから直接見えない) ---
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(CACHE_DIR, "notes.json"),
    JSON.stringify(notes),
    "utf-8",
  );

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
    "utf-8",
  );

  const searchDocs = notes.map((n) => ({
    id: n.slug,
    title: n.title,
    category: n.category ?? null,
    slug: n.slug,
    body: bySlug.get(n.slug)?.plainText ?? "",
  }));
  fs.writeFileSync(
    path.join(PUBLIC_GENERATED_DIR, "search-docs.json"),
    JSON.stringify(searchDocs),
    "utf-8",
  );

  return { notes };
}
