import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT } from "./fs";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const ASSET_SUBDIR = "wiki-assets";

/** リポジトリ内の画像・PDF 等を public/wiki-assets/<相対パス> にコピーし、
 *  ブラウザから参照できる URL パスを返す。public/ 配下は .gitignore 対象の生成物。 */
export function copyAssetToPublic(absPath: string): string {
  const rel = path.relative(REPO_ROOT, absPath).split(path.sep).join("/");
  const dest = path.join(PUBLIC_DIR, ASSET_SUBDIR, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(absPath, dest);
  return (
    "/" + [ASSET_SUBDIR, ...rel.split("/")].map(encodeURIComponent).join("/")
  );
}
