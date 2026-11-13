"use client";

import Link from "next/link";
import type { TreeNode } from "@/lib/content/build";
import { ChevronRightIcon, FileIcon, FolderIcon } from "./icons";

function hrefFor(slug: string): string {
  return slug === ""
    ? "/"
    : `/wiki/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

export default function FileTreeNode({
  node,
  depth,
  expanded,
  activeSlug,
  onToggle,
}: {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  activeSlug: string | null;
  onToggle: (slug: string) => void;
}) {
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
            <FileTreeNode
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
