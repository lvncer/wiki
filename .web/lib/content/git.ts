import { execFileSync } from "node:child_process";
import path from "node:path";
import { REPO_ROOT } from "./fs";

export interface GitFileInfo {
  createdAuthor: string;
  createdAt: string;
  lastUpdatedAuthor: string;
  lastUpdatedAt: string;
}

// 行の先頭に付けてコミット区切り行だと分かるようにするマーカー。ファイルパスには
// 現れない制御文字なので、"\x01区切りのフィールド" を誤ってパスと混同しない。
const COMMIT_PREFIX = "\x02";
const FIELD_SEP = "\x01";

/** リポジトリ全履歴を1回の `git log` でまとめて読み、ファイルパス(リポジトリルート相対、
 *  例 "wiki/software-engineering/README.md")ごとに最初の出現(=最新コミット)と
 *  最後の出現(=最古コミット)を畳み込む。476ファイル分を個別に `git log` するより大幅に速い。
 *  shallow clone・git 不在・リポジトリ外では空の Map を返す(ビルドを落とさない)。 */
function loadGitHistory(): Map<string, GitFileInfo> {
  const result = new Map<string, GitFileInfo>();
  let output: string;
  try {
    output = execFileSync(
      "git",
      [
        "-c",
        "core.quotepath=false", // 日本語ファイル名が8進数エスケープされるのを防ぐ
        "log",
        `--format=${COMMIT_PREFIX}%H${FIELD_SEP}%an${FIELD_SEP}%aI`,
        "--name-only",
        "--",
        "wiki",
      ],
      { cwd: REPO_ROOT, encoding: "utf-8", maxBuffer: 1024 * 1024 * 16 },
    );
  } catch {
    return result;
  }

  let currentAuthor = "";
  let currentDate = "";
  for (const line of output.split("\n")) {
    if (line.startsWith(COMMIT_PREFIX)) {
      const [, author, date] = line.slice(1).split(FIELD_SEP);
      currentAuthor = author ?? "";
      currentDate = date ?? "";
      continue;
    }
    const file = line.trim();
    if (!file) continue;

    const existing = result.get(file);
    if (!existing) {
      result.set(file, {
        createdAuthor: currentAuthor,
        createdAt: currentDate,
        lastUpdatedAuthor: currentAuthor,
        lastUpdatedAt: currentDate,
      });
    } else {
      // git log はコミットを新しい順に出すので、同じパスを再度見た時点のコミットの方が古い
      // = 作成者・作成日時として上書きする(ループの最後に残った値が最古になる)。
      existing.createdAuthor = currentAuthor;
      existing.createdAt = currentDate;
    }
  }

  return result;
}

let cached: Map<string, GitFileInfo> | null = null;

/** absPath(wiki/ 配下の .md の絶対パス)に対応する git 履歴情報。
 *  shallow clone や未コミットファイルでは undefined。 */
export function gitInfoFor(absPath: string): GitFileInfo | undefined {
  if (!cached) cached = loadGitHistory();
  const rel = path.relative(REPO_ROOT, absPath).split(path.sep).join("/");
  return cached.get(rel);
}
