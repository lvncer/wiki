"use client";

import { useRef, useState } from "react";
import type MiniSearch from "minisearch";

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

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const indexRef = useRef<MiniSearch<SearchDoc> | null>(null);
  const loadingRef = useRef<Promise<MiniSearch<SearchDoc>> | null>(null);

  async function ensureIndex(): Promise<MiniSearch<SearchDoc>> {
    if (indexRef.current) return indexRef.current;
    if (!loadingRef.current) {
      loadingRef.current = (async () => {
        const [{ default: MiniSearch }, docs] = await Promise.all([
          import("minisearch"),
          fetch("/generated/search-docs.json").then((r) => r.json() as Promise<SearchDoc[]>),
        ]);
        const ms = new MiniSearch<SearchDoc>({
          fields: ["title", "body"],
          storeFields: ["title", "category", "slug"],
          searchOptions: { boost: { title: 3 }, fuzzy: 0.2, prefix: true },
        });
        ms.addAll(docs);
        indexRef.current = ms;
        return ms;
      })();
    }
    return loadingRef.current;
  }

  async function handleChange(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    const ms = await ensureIndex();
    const hits = ms.search(value).slice(0, 8) as unknown as SearchHit[];
    setResults(hits);
    setOpen(true);
  }

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="search"
        value={query}
        onFocus={() => {
          void ensureIndex();
          if (results.length) setOpen(true);
        }}
        onChange={(e) => void handleChange(e.target.value)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder="検索"
        aria-label="ウィキ内検索"
        className="w-full rounded border border-ink-300 bg-white px-3 py-1.5 text-sm text-ink-900 focus:border-ink-600 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100 dark:focus:border-ink-400"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full max-h-80 overflow-auto border border-ink-300 bg-white shadow-sm dark:border-ink-700 dark:bg-ink-800">
          {results.map((r) => (
            <li key={r.id} className="border-b border-ink-100 last:border-b-0 dark:border-ink-700">
              <a href={hrefForSlug(r.slug)} className="block px-3 py-2 text-sm hover:bg-ink-50 dark:hover:bg-ink-700">
                <div className="font-medium text-ink-900 dark:text-ink-100">{r.title}</div>
                {r.category && <div className="text-xs text-ink-500 dark:text-ink-400">{r.category}</div>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
