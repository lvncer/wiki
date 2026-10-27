"use client";

import { useEffect } from "react";
import { THEME_CHANGE_EVENT, isDarkMode } from "@/lib/theme";

let idCounter = 0;

/** 記事内の ```mermaid コードブロックを <pre> から図解用のコンテナへ差し替える(一度だけ)。
 *  元のソースは data-mermaid-source に保持し、テーマ切り替え時の再描画に使う。 */
function convertCodeBlocks() {
  const blocks = Array.from(document.querySelectorAll<HTMLElement>("article pre > code.language-mermaid"));
  for (const code of blocks) {
    const pre = code.closest("pre");
    if (!pre) continue;
    const container = document.createElement("div");
    container.className = "mermaid-diagram my-4 flex justify-center overflow-x-auto";
    container.dataset.mermaidSource = code.textContent ?? "";
    pre.replaceWith(container);
  }
}

async function renderAll() {
  const containers = Array.from(
    document.querySelectorAll<HTMLElement>("article .mermaid-diagram[data-mermaid-source]"),
  );
  if (containers.length === 0) return;

  const { default: mermaid } = await import("mermaid");
  mermaid.initialize({ startOnLoad: false, theme: isDarkMode() ? "dark" : "default" });

  for (const container of containers) {
    const source = container.dataset.mermaidSource ?? "";
    try {
      const { svg } = await mermaid.render(`mermaid-${idCounter++}`, source);
      container.innerHTML = svg;
    } catch (err) {
      container.textContent = `Mermaid の描画に失敗しました: ${(err as Error).message}`;
      container.className = "my-4 text-sm text-red-600 dark:text-red-400";
    }
  }
}

export default function MermaidDiagrams() {
  useEffect(() => {
    convertCodeBlocks();
    renderAll();

    window.addEventListener(THEME_CHANGE_EVENT, renderAll);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, renderAll);
  }, []);

  return null;
}
