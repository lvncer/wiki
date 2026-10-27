"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CategoryMenu({ categories }: { categories: { slug: string; title: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="hover:underline"
      >
        カテゴリー
      </button>
      {open && (
        <ul
          role="menu"
          aria-label="カテゴリ一覧"
          className="absolute left-0 top-full z-10 mt-2 w-48 rounded-sm border border-ink-300 bg-white py-1 shadow-lg dark:border-ink-700 dark:bg-ink-900"
        >
          {categories.map((c) => (
            <li key={c.slug} role="none">
              <Link
                href={`/wiki/${c.slug}`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-3 py-1.5 text-sm text-ink-700 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
