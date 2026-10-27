import matter from "gray-matter";

// .scripts/gen_index.py の BLOCK_RE と同じ範囲(START〜END の HTML コメントに挟まれた
// 自動生成の「## このフォルダの中身」節)。Web 側では GitHub 風の一覧コンポーネントに
// 置き換えるため、本文からはこのブロックだけを取り除く(手書き部分は一切触らない)。
const INDEX_BLOCK_RE =
  /<!--\s*index:start[\s\S]*?-->[\s\S]*?<!--\s*index:end\s*-->/g;

export function stripGeneratedIndexBlock(content: string): string {
  return content.replace(INDEX_BLOCK_RE, "").trim();
}

export function splitFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const { data, content } = matter(raw);
  return { data, content };
}

/** 最初の `# 見出し`(frontmatter はすでに除去済み前提、コードフェンス内は無視)。
 *  .scripts/gen_index.py の title_of() と同じルール。見つからなければ fallback。 */
export function titleOf(content: string, fallback: string): string {
  const lines = content.split(/\r?\n/);
  let fence = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
      fence = !fence;
      continue;
    }
    if (!fence && line.startsWith("# ")) {
      const cleaned = line
        .slice(2)
        .replace(/[[\]]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (cleaned) return cleaned;
    }
  }
  return fallback;
}
