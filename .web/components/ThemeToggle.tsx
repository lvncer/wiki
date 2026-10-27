"use client";

import { useEffect, useState } from "react";
import { isDarkMode, setDarkMode } from "@/lib/theme";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.273c-4.508 0-8.16-3.653-8.16-8.16 0-1.167.244-2.278.683-3.284a9.945 9.945 0 1 0 9.554 11.171Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(isDarkMode());
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDarkMode(next);
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "ライトテーマに切り替え" : "ダークテーマに切り替え"}
      className="rounded-sm border border-ink-300 p-1.5 text-ink-700 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800"
    >
      {mounted ? dark ? <SunIcon /> : <MoonIcon /> : <span className="block h-[18px] w-[18px]" />}
    </button>
  );
}
