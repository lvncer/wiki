"use client";

import { useEffect, useRef, useState } from "react";
import {
  applyThemePreference,
  getThemePreference,
  setThemePreference,
  type ThemePreference,
} from "@/lib/theme";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "ライト" },
  { value: "dark", label: "ダーク" },
  { value: "system", label: "システム" },
];

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.273c-4.508 0-8.16-3.653-8.16-8.16 0-1.167.244-2.278.683-3.284a9.945 9.945 0 1 0 9.554 11.171Z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

function iconFor(pref: ThemePreference) {
  if (pref === "system") return <SystemIcon />;
  return pref === "dark" ? <MoonIcon /> : <SunIcon />;
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [pref, setPref] = useState<ThemePreference>("system");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPref(getThemePreference());
    setMounted(true);
  }, []);

  // OS のテーマ設定が変わった時、「システム」選択中なら追従させる。
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function onChange() {
      if (getThemePreference() === "system") applyThemePreference("system");
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
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

  function choose(next: ThemePreference) {
    setThemePreference(next);
    setPref(next);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="テーマ設定"
        className="rounded-sm border border-ink-300 p-1.5 text-ink-700 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800"
      >
        {mounted ? iconFor(pref) : <span className="block h-[18px] w-[18px]" />}
      </button>
      {open && (
        <ul
          role="menu"
          aria-label="テーマ設定"
          className="absolute right-0 top-full z-10 mt-2 w-32 rounded-sm border border-ink-300 bg-white py-1 shadow-lg dark:border-ink-700 dark:bg-ink-900"
        >
          {OPTIONS.map((opt) => (
            <li key={opt.value} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={pref === opt.value}
                onClick={() => choose(opt.value)}
                className={
                  "flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-ink-50 dark:hover:bg-ink-800 " +
                  (pref === opt.value
                    ? "font-semibold text-ink-900 dark:text-ink-50"
                    : "text-ink-700 dark:text-ink-300")
                }
              >
                {opt.label}
                {pref === opt.value && <span aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
