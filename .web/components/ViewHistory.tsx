"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getViewHistory, type ViewHistoryEntry } from "@/lib/history";

export default function ViewHistory() {
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<ViewHistoryEntry[]>([]);

  useEffect(() => {
    setMounted(true);
    setEntries(getViewHistory());
  }, []);

  // 未マウント時は何も表示しない(SSR/CSRのちらつき回避。ThemeToggle と同じ発想)。
  if (!mounted || entries.length === 0) return null;

  return (
    <section aria-labelledby="view-history-heading" className="mt-8">
      <h2
        id="view-history-heading"
        className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400"
      >
        閲覧履歴(最大10件)
      </h2>
      <ul className="divide-y divide-ink-100 dark:divide-ink-800">
        {entries.slice(0, 10).map((e) => (
          <li key={e.slug} className="py-2 text-sm">
            <Link
              href={
                e.slug === ""
                  ? "/"
                  : `/wiki/${e.slug.split("/").map(encodeURIComponent).join("/")}`
              }
              className="hover:underline"
            >
              {e.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
