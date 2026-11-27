"use client";

import type MiniSearch from "minisearch";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "./icons";

interface SearchDoc {
  id: string;
  title: string;
  category: string | null;
  slug: string;
  body: string;
}

interface SearchHit {
  id: string;
  title: string;
  category: string | null;
  slug: string;
}

function hrefForSlug(slug: string): string {
  if (slug === "") return "/";
  return `/wiki/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

// 入力ごとに毎回 search() を叩かない(1.8MB の索引を初回だけ読み込むのでタイプ中は特に無駄)。
const SEARCH_DEBOUNCE_MS = 150;

export default function SearchBox({
  compact = false,
}: {
  /** true の場合、初期状態はアイコンのみで、クリックすると入力欄が展開する。 */
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(!compact);
  const [indexLoading, setIndexLoading] = useState(false);
  const indexRef = useRef<MiniSearch<SearchDoc> | null>(null);
  const loadingRef = useRef<Promise<MiniSearch<SearchDoc>> | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // compact 切り替え時(ヘッダーのスクロール連動)に表示状態をリセットする。
  // query はここでは読み取るだけで、変化のたびに畳む/開くを再評価したいわけではないため、
  // 依存配列には compact のみを入れる。
  // biome-ignore lint/correctness/useExhaustiveDependencies: compact の変化時にのみ反応させたい
  useEffect(() => {
    if (!compact) setExpanded(true);
    else if (!query.trim()) setExpanded(false);
  }, [compact]);

  async function ensureIndex(): Promise<MiniSearch<SearchDoc>> {
    if (indexRef.current) return indexRef.current;
    if (!loadingRef.current) {
      setIndexLoading(true);
      loadingRef.current = (async () => {
        const [{ default: MiniSearch }, docs] = await Promise.all([
          import("minisearch"),
          fetch("/generated/search-docs.json").then(
            (r) => r.json() as Promise<SearchDoc[]>,
          ),
        ]);
        const ms = new MiniSearch<SearchDoc>({
          fields: ["title", "body"],
          storeFields: ["title", "category", "slug"],
          searchOptions: { boost: { title: 3 }, fuzzy: 0.2, prefix: true },
        });
        ms.addAll(docs);
        indexRef.current = ms;
        setIndexLoading(false);
        return ms;
      })();
    }
    return loadingRef.current;
  }

  async function runSearch(value: string) {
    const ms = await ensureIndex();
    const hits = ms.search(value).slice(0, 8) as unknown as SearchHit[];
    setResults(hits);
    setOpen(true);
  }

  function handleChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(() => {
      void runSearch(value);
    }, SEARCH_DEBOUNCE_MS);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const showLoading = indexLoading && query.trim().length > 0;
  const showDropdown = open && (results.length > 0 || showLoading);

  if (compact && !expanded) {
    return (
      <button
        type="button"
        onClick={() => {
          setExpanded(true);
          void ensureIndex();
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        title="検索"
        aria-label="検索を開く"
        className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-sm border border-ink-300 text-ink-700 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800"
      >
        <SearchIcon />
      </button>
    );
  }

  return (
    <div className="relative w-full max-w-xs">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onFocus={() => {
          void ensureIndex();
          if (results.length) setOpen(true);
        }}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() =>
          setTimeout(() => {
            setOpen(false);
            if (compact && !query.trim()) setExpanded(false);
          }, 120)
        }
        placeholder="検索"
        aria-label="ウィキ内検索"
        className="h-[34px] w-full rounded-sm border border-ink-300 bg-white px-3 py-1.5 text-sm text-ink-900 focus:border-ink-600 focus:outline-hidden dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100 dark:focus:border-ink-400"
      />
      {showDropdown && (
        <ul className="absolute z-20 mt-1 w-full max-h-80 overflow-auto border border-ink-300 bg-white shadow-xs dark:border-ink-700 dark:bg-ink-800">
          {showLoading && results.length === 0 && (
            <li className="px-3 py-2 text-sm text-ink-500 dark:text-ink-400">
              検索中…
            </li>
          )}
          {results.map((r) => (
            <li
              key={r.id}
              className="border-b border-ink-100 last:border-b-0 dark:border-ink-700"
            >
              <a
                href={hrefForSlug(r.slug)}
                className="block px-3 py-2 text-sm hover:bg-ink-50 dark:hover:bg-ink-700"
              >
                <div className="font-medium text-ink-900 dark:text-ink-100">
                  {r.title}
                </div>
                {r.category && (
                  <div className="text-xs text-ink-500 dark:text-ink-400">
                    {r.category}
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
