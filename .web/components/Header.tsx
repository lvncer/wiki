"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import ThemeToggle from "./ThemeToggle";

// この高さ以上スクロールしたら、記事に集中できるようヘッダーを最小限表示に切り替える。
const SCROLL_THRESHOLD = 48;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-ink-300 bg-white dark:border-ink-700 dark:bg-ink-900">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label="lvncerpedia トップページ"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/pedia-icon.png"
            alt="lvncerpedia"
            width={28}
            height={28}
            priority
            className="rounded-sm"
          />
          {!scrolled && (
            <span className="whitespace-nowrap font-serif text-xl font-bold text-ink-900 dark:text-ink-50">
              lvncerpedia
            </span>
          )}
        </Link>
        {!scrolled && (
          <nav className="flex gap-4 text-sm text-ink-700 dark:text-ink-300">
            <Link href="/" className="hover:underline">
              トップ
            </Link>
            <Link href="/graph" className="hover:underline">
              グラフ
            </Link>
          </nav>
        )}
        <div className="ml-auto flex items-center gap-3">
          <SearchBox compact={scrolled} />
          {!scrolled && <ThemeToggle />}
        </div>
      </div>
    </header>
  );
}
