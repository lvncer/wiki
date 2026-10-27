import path from "node:path";
import { fileExists, REPO_ROOT } from "./fs";

function toPosix(p: string): string {
  return p.split(path.sep).join("/");
}

/** 絶対パスの .md ファイルを URL スラッグ(先頭末尾 "/" なし、"/" 区切り)に変換する。
 *  ルートの README.md は "" (トップページ)。各フォルダの README.md はそのフォルダ自身のスラッグになる。 */
export function fileToSlug(absPath: string): string {
  const rel = toPosix(path.relative(REPO_ROOT, absPath));
  if (rel === "README.md") return "";
  if (rel.endsWith("/README.md")) return rel.slice(0, -"/README.md".length);
  return rel.slice(0, -".md".length);
}

/** スラッグを generateStaticParams 用のセグメント配列に変換する(デコード済み文字列のまま、Next.js がエンコードを担う)。 */
export function slugToSegments(slug: string): string[] {
  return slug.split("/").filter(Boolean);
}

export function segmentsToSlug(segments: string[]): string {
  return segments.join("/");
}

/** スラッグから実体ファイルを解決する。「note.md」と「note/README.md」の両方を試す。 */
export function slugToFile(slug: string): string | undefined {
  if (slug === "") {
    const root = path.join(REPO_ROOT, "README.md");
    return fileExists(root) ? root : undefined;
  }
  const asNote = path.join(REPO_ROOT, ...slug.split("/")) + ".md";
  if (fileExists(asNote)) return asNote;
  const asDir = path.join(REPO_ROOT, ...slug.split("/"), "README.md");
  if (fileExists(asDir)) return asDir;
  return undefined;
}

export function parentSlugOf(slug: string): string | undefined {
  if (slug === "") return undefined;
  const parts = slug.split("/");
  parts.pop();
  return parts.join("/");
}
