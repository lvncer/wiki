"use client";

import { useEffect, useState } from "react";
import {
  getArticleMetaOpenPreference,
  setArticleMetaOpenPreference,
} from "@/lib/sidebar";
import { ChevronLeftIcon, CloseIcon } from "./icons";

export default function ArticleMeta({
  category,
  author,
  updatedAt,
}: {
  category?: string;
  author?: string;
  updatedAt?: string;
}) {
  const [open, setOpen] = useState(true);

  // 初回マウント後にだけ localStorage の実際の設定へ切り替える(FileTreeSidebar と同じ発想)。
  useEffect(() => {
    setOpen(getArticleMetaOpenPreference(true));
  }, []);

  if (!category && !author && !updatedAt) return null;

  const formattedDate = updatedAt
    ? new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Tokyo",
      }).format(new Date(updatedAt))
    : undefined;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setArticleMetaOpenPreference(true);
        }}
        aria-label="記事情報を開く"
        className="fixed top-[75px] right-4 z-20 hidden rounded-md border border-ink-300 bg-white p-1.5 text-ink-600 shadow-sm hover:bg-ink-50 lg:block dark:border-ink-700 dark:bg-ink-900 dark:text-ink-400 dark:hover:bg-ink-800"
      >
        <ChevronLeftIcon />
      </button>
    );
  }

  return (
    <aside
      aria-label="記事情報"
      className="hidden w-56 flex-col rounded-md border border-ink-200 bg-white shadow-sm lg:fixed lg:top-[75px] lg:right-4 lg:z-20 lg:flex dark:border-ink-700 dark:bg-ink-900"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-ink-200 px-3 py-2 dark:border-ink-800">
        <span className="text-xs font-semibold tracking-wide text-ink-500 uppercase dark:text-ink-400">
          記事情報
        </span>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setArticleMetaOpenPreference(false);
          }}
          aria-label="記事情報を閉じる"
          className="rounded-sm p-1 text-ink-500 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="space-y-4 p-3 text-sm">
        {category && (
          <div>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
              カテゴリー
            </h2>
            <span className="inline-block rounded-sm border border-ink-300 px-2 py-0.5 text-xs text-ink-700 dark:border-ink-700 dark:text-ink-300">
              {category}
            </span>
          </div>
        )}
        {author && (
          <div>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
              作成者
            </h2>
            <p className="text-ink-700 dark:text-ink-300">{author}</p>
          </div>
        )}
        {formattedDate && (
          <div>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
              最終更新日
            </h2>
            <p className="text-ink-700 dark:text-ink-300">
              <time dateTime={updatedAt}>{formattedDate}</time>
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
