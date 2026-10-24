import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";
import { resolveLink } from "./links";
import { fileToSlug } from "./slug";
import { copyAssetToPublic } from "./assets";

type MdastLike = Parameters<typeof visit>[0];
type LinkNode = {
  type: "link";
  url: string;
  data?: { hProperties?: Record<string, unknown> };
};
type ImageNode = { type: "image"; url: string };
type HastElement = {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
};

export interface LinkedNote {
  absPath: string;
  /** true ならフォルダ宛リンク(README.md を暗黙補完)。.scripts/gen_index.py --stats の
   *  「フォルダ宛リンク」と同じ扱いで、バックリンクには含めるがグラフのエッジからは除外する。 */
  isDirectoryLink: boolean;
}

export interface MarkdownResult {
  html: string;
  /** グラフのエッジ・バックリンク計算に使う、解決できたノートリンク一覧(重複あり得る)。 */
  linkedNotes: LinkedNote[];
  /** 検索インデックス用のプレーンテキスト。 */
  plainText: string;
}

/** 通常の Markdown リンク構文 `[text](url)` / `![alt](src)` の url を解決し、
 *  サイト内パス(/wiki/...)やコピー後のアセットパス(/wiki-assets/...)に書き換える。 */
function noteOrDirSlugUrl(absPath: string, hash?: string): string {
  const slug = fileToSlug(absPath);
  const base = slug === "" ? "/" : `/wiki/${slug.split("/").map(encodeURIComponent).join("/")}`;
  return hash ? `${base}#${hash}` : base;
}

function rewriteUrl(fromAbsFile: string, rawUrl: string, collected: LinkedNote[]): string {
  const res = resolveLink(fromAbsFile, rawUrl);
  switch (res.type) {
    case "note":
      collected.push({ absPath: res.absPath, isDirectoryLink: false });
      return noteOrDirSlugUrl(res.absPath, res.hash);
    case "directory": {
      const readme = path.join(res.absPath, "README.md");
      collected.push({ absPath: readme, isDirectoryLink: true });
      return noteOrDirSlugUrl(readme);
    }
    case "asset":
      return copyAssetToPublic(res.absPath);
    case "external":
    case "anchor":
      return rawUrl;
    case "broken":
    default:
      return "#";
  }
}

function remarkRewriteLinks(fromAbsFile: string, collected: LinkedNote[]) {
  return (tree: MdastLike) => {
    visit(tree, "link", (node) => {
      const n = node as unknown as LinkNode;
      const before = n.url;
      n.url = rewriteUrl(fromAbsFile, before, collected);
      if (n.url === "#" && before !== "#") {
        n.data = {
          ...n.data,
          hProperties: { ...n.data?.hProperties, className: "broken-link", title: `リンク先が見つかりません: ${before}` },
        };
      }
    });
    visit(tree, "image", (node) => {
      const n = node as unknown as ImageNode;
      const res = resolveLink(fromAbsFile, n.url);
      if (res.type === "asset") n.url = copyAssetToPublic(res.absPath);
    });
  };
}

function rehypeRewriteRawHtml(fromAbsFile: string, collected: LinkedNote[]) {
  return (tree: MdastLike) => {
    visit(tree, "element", (node) => {
      const el = node as unknown as HastElement;
      if (!el.properties) return;
      if (el.tagName === "img" && typeof el.properties.src === "string") {
        const res = resolveLink(fromAbsFile, el.properties.src);
        if (res.type === "asset") el.properties.src = copyAssetToPublic(res.absPath);
      }
      if (el.tagName === "a" && typeof el.properties.href === "string") {
        el.properties.href = rewriteUrl(fromAbsFile, el.properties.href, collected);
      }
    });
  };
}

export function processMarkdown(absFile: string, content: string): MarkdownResult {
  const linkedNotes: LinkedNote[] = [];

  const mdastTree = unified().use(remarkParse).use(remarkGfm).parse(content);
  const plainText = mdastToString(mdastTree);

  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => remarkRewriteLinks(absFile, linkedNotes))
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(() => rehypeRewriteRawHtml(absFile, linkedNotes))
    .use(rehypeStringify)
    .processSync(content);

  return { html: String(file), linkedNotes, plainText };
}
