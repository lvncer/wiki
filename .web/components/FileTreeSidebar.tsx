"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { TreeNode } from "@/lib/content/build";
import {
  getSidebarOpenPreference,
  setSidebarOpenPreference,
} from "@/lib/sidebar";
import FileTreeNode from "./FileTreeNode";
import { ChevronRightIcon, CloseIcon } from "./icons";

function slugFromPathname(pathname: string): string | null {
  if (pathname === "/") return "";
  if (pathname.startsWith("/wiki/")) {
    return pathname
      .slice("/wiki/".length)
      .split("/")
      .map(decodeURIComponent)
      .join("/");
  }
  return null;
}

function ancestorSlugsOf(slug: string): string[] {
  const parts = slug.split("/").filter(Boolean);
  const chain: string[] = [];
  for (let i = 1; i < parts.length; i++)
    chain.push(parts.slice(0, i).join("/"));
  return chain;
}

export default function FileTreeSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [tree, setTree] = useState<TreeNode[] | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const nodeBySlug = useRef<Map<string, TreeNode>>(new Map());

  // 初回マウント後にだけ localStorage の実際の設定へ切り替える(ThemeToggle の mounted ガードと同じ発想)。
  useEffect(() => {
    setOpen(getSidebarOpenPreference(true));
  }, []);

  // ツリーデータはこのコンポーネントがマウントされている間、一度だけ取得する
  // (layout.tsx はクライアント遷移をまたいでマウントされ続けるため、ページ遷移ごとの再取得は不要)。
  useEffect(() => {
    fetch("/generated/tree.json")
      .then((r) => r.json())
      .then((data: TreeNode[]) => {
        const map = new Map<string, TreeNode>();
        const visit = (nodes: TreeNode[]) => {
          for (const n of nodes) {
            map.set(n.slug, n);
            if (n.children) visit(n.children);
          }
        };
        visit(data);
        nodeBySlug.current = map;
        setTree(data);
      });
  }, []);

  // ページ遷移ごとに現在地の祖先フォルダだけを「追加」で展開する(既に手動展開した他の枝は保持する)。
  useEffect(() => {
    if (!tree) return;
    const activeSlug = slugFromPathname(pathname);
    if (activeSlug === null || !nodeBySlug.current.has(activeSlug)) return;
    const toExpand = ancestorSlugsOf(activeSlug);
    if (nodeBySlug.current.get(activeSlug)?.kind === "folder") {
      toExpand.push(activeSlug);
    }
    if (toExpand.length === 0) return;
    setExpanded((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (const s of toExpand) {
        if (!next.has(s)) {
          next.add(s);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [pathname, tree]);

  const activeSlug = useMemo(() => slugFromPathname(pathname), [pathname]);

  function toggle(slug: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setSidebarOpenPreference(true);
        }}
        aria-label="ファイルツリーを開く"
        className="fixed top-[75px] left-4 z-20 hidden rounded-md border border-ink-300 bg-white p-1.5 text-ink-600 shadow-sm hover:bg-ink-50 lg:block dark:border-ink-700 dark:bg-ink-900 dark:text-ink-400 dark:hover:bg-ink-800"
      >
        <ChevronRightIcon />
      </button>
    );
  }

  return (
    <aside className="hidden w-56 overflow-y-auto rounded-md border border-ink-200 bg-white shadow-sm lg:fixed lg:top-[75px] lg:left-4 lg:z-20 lg:block lg:h-[calc(100vh-91px)] dark:border-ink-700 dark:bg-ink-900">
      <div className="flex items-center justify-between border-b border-ink-200 px-3 py-2 dark:border-ink-800">
        <span className="text-xs font-semibold tracking-wide text-ink-500 uppercase dark:text-ink-400">
          ファイル
        </span>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setSidebarOpenPreference(false);
          }}
          aria-label="ファイルツリーを閉じる"
          className="rounded-sm p-1 text-ink-500 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800"
        >
          <CloseIcon />
        </button>
      </div>
      <nav aria-label="ファイルツリー" className="py-1">
        {tree === null && (
          <p className="px-3 py-2 text-sm text-ink-500 dark:text-ink-400">
            読み込み中…
          </p>
        )}
        {tree?.map((node) => (
          <FileTreeNode
            key={node.slug}
            node={node}
            depth={0}
            expanded={expanded}
            activeSlug={activeSlug}
            onToggle={toggle}
          />
        ))}
      </nav>
    </aside>
  );
}
