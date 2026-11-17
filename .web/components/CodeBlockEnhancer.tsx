"use client";

import { useEffect } from "react";

// icons.tsx の既存アイコン規約(viewBox 0 0 16 16 / stroke currentColor / aria-hidden)に揃えた
// SVG。DOM 文字列として注入するため React コンポーネントではなく文字列で持つ。
const COPY_ICON_SVG =
  '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="5" width="9" height="9" rx="1.5"></rect><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"></path></svg>';
const CHECK_ICON_SVG =
  '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 5"></path></svg>';

function buttonHtml(label: string, icon: string): string {
  return `${icon}<span>${label}</span>`;
}

/** 記事内のコードブロックに言語バッジ(language-xxx クラスがある場合のみ)とコピーボタンを
 *  付ける。Mermaid 用の pre は MermaidDiagrams が別途 replaceWith で置き換えるため除外する
 *  (処理順の競合でツールバーだけ図の上に残るのを防ぐ)。 */
function enhanceCodeBlocks() {
  const blocks = Array.from(
    document.querySelectorAll<HTMLElement>("article pre > code"),
  );
  for (const code of blocks) {
    if (code.classList.contains("language-mermaid")) continue;
    const pre = code.closest("pre");
    if (!pre) continue;
    // 既に処理済み(React の effect 二重実行等)ならスキップ。
    if (pre.parentElement?.classList.contains("code-block")) continue;

    const langClass = Array.from(code.classList).find((c) =>
      c.startsWith("language-"),
    );
    const lang = langClass ? langClass.slice("language-".length) : null;

    const wrapper = document.createElement("div");
    wrapper.className = "code-block my-4 overflow-hidden rounded-md";

    const toolbar = document.createElement("div");
    toolbar.className =
      "flex items-center justify-between gap-2 bg-ink-800 px-3 py-1.5 dark:bg-ink-950";

    const label = document.createElement("span");
    label.className = "font-mono text-xs text-ink-300";
    label.textContent = lang ?? "";
    toolbar.appendChild(label);

    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-xs text-ink-300 hover:bg-ink-700 hover:text-white";
    button.setAttribute("aria-label", "コードをコピー");
    button.innerHTML = buttonHtml("コピー", COPY_ICON_SVG);

    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(code.textContent ?? "").then(() => {
        button.innerHTML = buttonHtml("コピーしました", CHECK_ICON_SVG);
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          button.innerHTML = buttonHtml("コピー", COPY_ICON_SVG);
        }, 1500);
      });
    });
    toolbar.appendChild(button);

    pre.classList.add("!mt-0", "!rounded-t-none");
    pre.replaceWith(wrapper);
    wrapper.append(toolbar, pre);
  }
}

export default function CodeBlockEnhancer() {
  useEffect(() => {
    enhanceCodeBlocks();
  }, []);

  return null;
}
