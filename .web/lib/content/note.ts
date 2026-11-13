import fs from "node:fs";
import path from "node:path";
import { buildContentData, type NoteRecord, type TreeNode } from "./build";

export type { NoteRecord };

const CACHE_FILE = path.resolve(process.cwd(), ".content-cache", "notes.json");
const TREE_CACHE_FILE = path.resolve(
  process.cwd(),
  ".content-cache",
  "tree.json",
);

let cache: Map<string, NoteRecord> | null = null;
let treeCache: TreeNode[] | null = null;

function load(): Map<string, NoteRecord> {
  if (cache) return cache;
  const notes: NoteRecord[] = fs.existsSync(CACHE_FILE)
    ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"))
    : buildContentData().notes;
  cache = new Map(notes.map((n) => [n.slug, n]));
  return cache;
}

/** サイドバーのファイルツリー全体。レイアウト(サーバーコンポーネント)がビルド時に一度読み、
 *  クライアントには props で渡す(ブラウザ側での fetch は行わない)。 */
export function getTree(): TreeNode[] {
  if (treeCache) return treeCache;
  const tree: TreeNode[] = fs.existsSync(TREE_CACHE_FILE)
    ? JSON.parse(fs.readFileSync(TREE_CACHE_FILE, "utf-8"))
    : buildContentData().tree;
  treeCache = tree;
  return treeCache;
}

export function getAllNotes(): NoteRecord[] {
  return [...load().values()];
}

export function getNoteBySlug(slug: string): NoteRecord | undefined {
  return load().get(slug);
}

/** トップレベルカテゴリ(9〜10個)の README 一覧。サイドバー表示用。 */
export function getTopCategories(): { slug: string; title: string }[] {
  return getAllNotes()
    .filter((n) => n.slug !== "" && !n.slug.includes("/"))
    .map((n) => ({ slug: n.slug, title: n.title }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}
