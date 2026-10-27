import fs from "node:fs";
import path from "node:path";

// .web/ 自体はドット始まりなので、この除外ルールだけで自動的に対象外になる。
// .scripts/gen_index.py の EXCLUDE_DIRS と同じ名前を使う。
export const EXCLUDE_DIRS = new Set(["images", "templates"]);

// cwd は `.web/`(next dev / next build の実行ディレクトリ)なので、1つ上がリポジトリルート。
export const REPO_ROOT = path.resolve(process.cwd(), "..");

export function isExcludedName(name: string): boolean {
  return name.startsWith(".") || EXCLUDE_DIRS.has(name);
}

function readDirSafe(dir: string): fs.Dirent[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

/** REPO_ROOT 以下を再帰的に歩いて .md ファイルの絶対パス一覧を返す(gen_index.py の os.walk と同じ除外規則)。 */
export function walkMarkdownFiles(root: string = REPO_ROOT): string[] {
  const out: string[] = [];
  const visit = (dir: string) => {
    for (const entry of readDirSafe(dir)) {
      if (isExcludedName(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        visit(full);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        out.push(full);
      }
    }
  };
  visit(root);
  return out.sort();
}

/** REPO_ROOT 以下の全ディレクトリ(除外規則適用後)の絶対パス一覧を返す。
 *  README.md を持たないフォルダにも最低限のページ(ファイルツリーのみ)を用意するために使う。 */
export function walkDirectories(root: string = REPO_ROOT): string[] {
  const out: string[] = [];
  const visit = (dir: string) => {
    for (const entry of readDirSafe(dir)) {
      if (isExcludedName(entry.name)) continue;
      if (!entry.isDirectory()) continue;
      const full = path.join(dir, entry.name);
      out.push(full);
      visit(full);
    }
  };
  visit(root);
  return out.sort();
}

/** リンク/画像から参照されている非 .md ファイルを静的配信用にコピーする際の存在確認に使う。 */
export function fileExists(absPath: string): boolean {
  try {
    return fs.statSync(absPath).isFile();
  } catch {
    return false;
  }
}

export function isDirectory(absPath: string): boolean {
  try {
    return fs.statSync(absPath).isDirectory();
  } catch {
    return false;
  }
}

export function readFileUtf8(absPath: string): string {
  return fs.readFileSync(absPath, "utf-8");
}

/** REPO_ROOT からの先頭カテゴリ名(例: "software-engineering")。ルートの README.md では undefined。 */
export function topCategoryOf(absPath: string): string | undefined {
  const rel = path.relative(REPO_ROOT, absPath).split(path.sep);
  if (rel.length <= 1) return undefined;
  return rel[0];
}

/** 指定フォルダ直下の子(サブフォルダ・ファイル)を casefold 順で返す。
 *  .scripts/gen_index.py の Wiki.children() と同じ除外規則(ドット始まり・EXCLUDE_DIRS を除外)。 */
export function listImmediateChildren(dirAbsPath: string): {
  dirs: string[];
  files: string[];
} {
  const entries = readDirSafe(dirAbsPath)
    .filter((e) => !isExcludedName(e.name))
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  const dirs: string[] = [];
  const files: string[] = [];
  for (const e of entries) {
    const full = path.join(dirAbsPath, e.name);
    if (e.isDirectory()) dirs.push(full);
    else if (e.isFile()) files.push(full);
  }
  return { dirs, files };
}
