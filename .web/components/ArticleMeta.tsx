"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Heading } from "@/lib/content/markdown";
import {
  getArticleMetaOpenPreference,
  setArticleMetaOpenPreference,
} from "@/lib/sidebar";
import { ChevronLeftIcon, CloseIcon, InfoIcon } from "./icons";

function scrollToHeading(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ArticleMetaBody({
  category,
  author,
  updatedAt,
  formattedDate,
  headings,
  onNavigate,
}: {
  category?: string;
  author?: string;
  updatedAt?: string;
  formattedDate?: string;
  headings: Heading[];
  onNavigate?: () => void;
}) {
  return (
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
      {headings.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
            目次
          </h2>
          <nav aria-label="目次" className="p-1">
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
                  <a
                    href={`#${h.id}`}
                    title={h.text}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHeading(h.id);
                      onNavigate?.();
                    }}
                    className="block truncate text-ink-700 hover:underline dark:text-ink-300"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default function ArticleMeta({
  category,
  author,
  updatedAt,
  headings = [],
}: {
  category?: string;
  author?: string;
  updatedAt?: string;
  headings?: Heading[];
}) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Header 側の #article-meta-mobile-slot は記事ページでしか意味を持たないため、
  // 自分(ArticleMeta)が存在するページでだけ Portal でボタンを差し込む。
  const [mobileSlot, setMobileSlot] = useState<HTMLElement | null>(null);

  // 初回マウント後にだけ localStorage の実際の設定へ切り替える(FileTreeSidebar と同じ発想)。
  useEffect(() => {
    setOpen(getArticleMetaOpenPreference(true));
    setMobileSlot(document.getElementById("article-meta-mobile-slot"));
  }, []);

  const hasContent =
    Boolean(category) ||
    Boolean(author) ||
    Boolean(updatedAt) ||
    headings.length > 0;

  if (!hasContent) return null;

  const formattedDate = updatedAt
    ? new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Tokyo",
      }).format(new Date(updatedAt))
    : undefined;

  const mobileButton =
    mobileSlot &&
    createPortal(
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="記事情報を開く"
        className="rounded-sm border border-ink-300 p-1.5 text-ink-700 hover:bg-ink-50 lg:hidden dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800"
      >
        <InfoIcon />
      </button>,
      mobileSlot,
    );

  const mobileOverlay =
    mobileOpen &&
    createPortal(
      <div className="fixed inset-0 z-50 lg:hidden">
        <button
          type="button"
          aria-label="記事情報を閉じる"
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-black/40"
        />
        <aside
          aria-label="記事情報"
          className="absolute top-0 right-0 flex h-full w-72 max-w-[85vw] flex-col overflow-y-auto bg-white shadow-lg dark:bg-ink-900"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-ink-200 px-3 py-2 dark:border-ink-800">
            <span className="text-xs font-semibold tracking-wide text-ink-500 uppercase dark:text-ink-400">
              記事情報
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="記事情報を閉じる"
              className="rounded-sm p-1 text-ink-500 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800"
            >
              <CloseIcon />
            </button>
          </div>
          <ArticleMetaBody
            category={category}
            author={author}
            updatedAt={updatedAt}
            formattedDate={formattedDate}
            headings={headings}
            onNavigate={() => setMobileOpen(false)}
          />
        </aside>
      </div>,
      document.body,
    );

  if (!open) {
    return (
      <>
        {mobileButton}
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
        {mobileOverlay}
      </>
    );
  }

  return (
    <>
      {mobileButton}
      <aside
        aria-label="記事情報"
        className="hidden w-80 flex-col rounded-md border border-ink-200 bg-white shadow-sm lg:fixed lg:top-[75px] lg:right-4 lg:z-20 lg:flex lg:max-h-[calc(100vh-91px)] dark:border-ink-700 dark:bg-ink-900"
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
        <div className="overflow-y-auto">
          <ArticleMetaBody
            category={category}
            author={author}
            updatedAt={updatedAt}
            formattedDate={formattedDate}
            headings={headings}
          />
        </div>
      </aside>
      {mobileOverlay}
    </>
  );
}
