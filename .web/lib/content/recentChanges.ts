import path from "node:path";
import { REPO_ROOT } from "./fs";
import { fileToSlug } from "./slug";
import { getNoteBySlug } from "./note";

const OWNER = "lvncerpedia";
const REPO = "wiki";
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

export interface RecentChange {
  slug: string;
  title: string;
  date: string; // ISO
  message: string;
}

interface CommitSummary {
  sha: string;
}

interface CommitDetail {
  commit: { author: { date: string } | null; message: string };
  files?: { filename: string }[];
}

function authHeaders(): Record<string, string> | undefined {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return undefined;
  return { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" };
}

/** 直近のコミットを新しい順に辿り、.md ファイルが最後に変更されたコミットを集める。
 *  ビルド時(静的エクスポートの事前レンダリング時)に一度だけ呼ばれる想定。
 *  GITHUB_TOKEN が無い/APIが失敗した場合は空配列を返し、サイトのビルド自体は止めない。 */
export async function getRecentChanges(limit = 8): Promise<RecentChange[]> {
  const headers = authHeaders();
  if (!headers) return [];

  try {
    const listRes = await fetch(`${API_BASE}/commits?per_page=30`, { headers });
    if (!listRes.ok) return [];
    const commits: CommitSummary[] = await listRes.json();

    const seenPaths = new Set<string>();
    const changes: RecentChange[] = [];

    for (const c of commits) {
      if (changes.length >= limit) break;
      const detailRes = await fetch(`${API_BASE}/commits/${c.sha}`, { headers });
      if (!detailRes.ok) continue;
      const detail: CommitDetail = await detailRes.json();
      const date = detail.commit.author?.date;
      if (!date) continue;
      const message = detail.commit.message.split("\n")[0];

      for (const f of detail.files ?? []) {
        if (changes.length >= limit) break;
        if (!f.filename.toLowerCase().endsWith(".md")) continue;
        if (f.filename.startsWith(".web/") || f.filename.startsWith(".github/")) continue;
        if (seenPaths.has(f.filename)) continue;
        seenPaths.add(f.filename);

        const absPath = path.join(REPO_ROOT, f.filename);
        const slug = fileToSlug(absPath);
        const note = getNoteBySlug(slug);
        if (!note) continue; // 存在しない/除外対象のパスは無視

        changes.push({ slug, title: note.title, date, message });
      }
    }
    return changes;
  } catch {
    return [];
  }
}
