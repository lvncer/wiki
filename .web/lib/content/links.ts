import path from "node:path";
import { fileExists, isDirectory, REPO_ROOT } from "./fs";

const SCHEME_RE = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;

export type LinkResolution =
  | { type: "external" }
  | { type: "anchor" }
  | { type: "note"; absPath: string; hash?: string }
  | { type: "directory"; absPath: string } // README.md が暗黙補完される
  | { type: "asset"; absPath: string }
  | { type: "broken"; raw: string };

/** .scripts/gen_index.py の LINK_RE / SCHEME_RE 相当。コードフェンス・インラインコードは
 *  remark の AST 上では code / inlineCode ノードとして link ノードと分離されるため、
 *  ここでは「link/image ノードの href をどう解決するか」だけを担う。 */
export function resolveLink(
  fromAbsFile: string,
  rawHref: string,
): LinkResolution {
  if (!rawHref) return { type: "anchor" };
  if (rawHref.startsWith("#")) return { type: "anchor" };
  if (rawHref.startsWith("//") || SCHEME_RE.test(rawHref))
    return { type: "external" };

  const [withoutHash, hash] = splitHash(rawHref);
  const withoutQuery = withoutHash.split("?")[0];
  let href: string;
  try {
    href = decodeURIComponent(withoutQuery);
  } catch {
    href = withoutQuery;
  }
  if (!href) return { type: "anchor" };

  const targetAbs = path.resolve(path.dirname(fromAbsFile), href);
  const rootWithSep = REPO_ROOT.endsWith(path.sep)
    ? REPO_ROOT
    : REPO_ROOT + path.sep;
  if (targetAbs !== REPO_ROOT && !targetAbs.startsWith(rootWithSep)) {
    // リポジトリ外を指すリンクは外部扱いにして無視する(安全側)
    return { type: "external" };
  }

  if (isDirectory(targetAbs)) {
    const readme = path.join(targetAbs, "README.md");
    return fileExists(readme)
      ? { type: "directory", absPath: targetAbs }
      : { type: "broken", raw: rawHref };
  }
  if (targetAbs.toLowerCase().endsWith(".md")) {
    return fileExists(targetAbs)
      ? { type: "note", absPath: targetAbs, hash }
      : { type: "broken", raw: rawHref };
  }
  return fileExists(targetAbs)
    ? { type: "asset", absPath: targetAbs }
    : { type: "broken", raw: rawHref };
}

function splitHash(href: string): [string, string | undefined] {
  const i = href.indexOf("#");
  if (i === -1) return [href, undefined];
  return [href.slice(0, i), href.slice(i + 1)];
}
