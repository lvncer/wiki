"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./icons";

const SCROLL_THRESHOLD = 300;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="一番上に戻る"
      aria-label="一番上に戻る"
      className="fixed bottom-6 right-6 z-40 rounded-full border border-ink-300 bg-white p-2.5 text-ink-700 shadow-lg hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700"
    >
      <ArrowUpIcon />
    </button>
  );
}
