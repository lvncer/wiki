"use client";

import Link from "next/link";
import { memo } from "react";
import type { TreeNode } from "@/lib/content/build";
import { ChevronRightIcon, FileIcon, FolderIcon } from "./icons";

function hrefFor(slug: string): string {
  return slug === ""
    ? "/"
    : `/wiki/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

interface FileTreeNodeProps {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  activeSlug: string | null;
  onToggle: (slug: string) => void;
}

function FileTreeNodeBase({
  node,
  depth,
  expanded,
  activeSlug,
  onToggle,
}: FileTreeNodeProps) {
  // フォルダ自身の README.md も通常のファイル行として一覧に出るため、
  // アクティブハイライトはその実ファイル行だけに付ける(フォルダ行には付けない)。
  const isActive = node.kind === "file" && node.slug === activeSlug;
  const indent = { paddingLeft: `${depth * 14 + 8}px` };
  const rowClass =
    "flex w-full items-center gap-1.5 py-1 pr-2 text-left text-sm hover:bg-ink-50 dark:hover:bg-ink-800 " +
    (isActive
      ? "bg-ink-100 font-semibold text-ink-900 dark:bg-ink-800 dark:text-ink-50"
      : "text-ink-700 dark:text-ink-300");

  if (node.kind === "folder") {
    const isOpen = expanded.has(node.slug);
    return (
      <div>
        <button
          type="button"
          onClick={() => onToggle(node.slug)}
          aria-expanded={isOpen}
          style={indent}
          className={rowClass}
        >
          <span
            className={`shrink-0 text-ink-400 transition-transform dark:text-ink-500 ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            <ChevronRightIcon />
          </span>
          <span className="shrink-0 text-ink-400 dark:text-ink-500">
            <FolderIcon />
          </span>
          <span className="truncate">{node.title}</span>
        </button>
        {isOpen &&
          node.children?.map((child) => (
            <FileTreeNodeMemo
              key={child.slug}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              activeSlug={activeSlug}
              onToggle={onToggle}
            />
          ))}
      </div>
    );
  }

  return (
    <Link
      href={hrefFor(node.slug)}
      aria-current={isActive ? "page" : undefined}
      style={indent}
      className={rowClass}
    >
      <span className="shrink-0 pl-[18px] text-ink-400 dark:text-ink-500">
        <FileIcon />
      </span>
      <span className="truncate">{node.title}</span>
    </Link>
  );
}

/** `expanded` は toggle 1回ごとに新しい Set が渡ってくる(参照は常に変わる)。
 *  ファイル行は `expanded` を見ないので常にスキップ可能。閉じたフォルダは子を描画しないので
 *  自分の開閉状態だけ見れば十分。ただし「開いている」フォルダは、どこかの子孫フォルダが
 *  開閉されたとき(= Set の参照が変わったとき)に新しい `expanded` を子へ伝える必要があるため、
 *  自分の開閉状態が同じでも Set の参照が変わっていたら再レンダーさせる
 *  (ここを自分の slug だけで判定すると、祖先フォルダが再レンダーをスキップして孫フォルダの
 *  開閉が子へ伝わらなくなるバグになる)。 */
function propsEqual(prev: FileTreeNodeProps, next: FileTreeNodeProps): boolean {
  if (
    prev.node !== next.node ||
    prev.depth !== next.depth ||
    prev.activeSlug !== next.activeSlug ||
    prev.onToggle !== next.onToggle
  ) {
    return false;
  }
  if (prev.node.kind === "file") return true;

  const prevOpen = prev.expanded.has(prev.node.slug);
  const nextOpen = next.expanded.has(next.node.slug);
  if (prevOpen !== nextOpen) return false;
  if (!nextOpen) return true;
  return prev.expanded === next.expanded;
}

// 子の再帰呼び出しも memo 経由にするため、自分自身(FileTreeNodeBase)の中では
// このラップ済みコンポーネントを参照する(素の関数を直接呼ぶと子では memo が効かない)。
const FileTreeNodeMemo = memo(FileTreeNodeBase, propsEqual);

export default FileTreeNodeMemo;
