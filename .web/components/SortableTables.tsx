"use client";

import { useEffect } from "react";

/** 記事内の GFM テーブルを、見出しクリックで並び替えできるようにする(クリックごとに昇順/降順トグル)。
 *  ソート済みの時だけ「デフォルトの並びに戻す」ボタンを出す。
 *  Markdown の生成ロジックには触れず、レンダリング後の DOM を後付けで強化するだけ。 */
export default function SortableTables() {
  useEffect(() => {
    const tables = Array.from(
      document.querySelectorAll<HTMLTableElement>("article table"),
    );
    const cleanups: (() => void)[] = [];

    for (const table of tables) {
      const headerRow = table.tHead?.rows[0];
      const tbody = table.tBodies[0];
      if (!headerRow || !tbody) continue;

      const originalOrder = Array.from(tbody.rows);
      const indicators: HTMLSpanElement[] = [];
      let sortedCol = -1;
      let dir: "asc" | "desc" = "asc";

      const toolbar = document.createElement("div");
      toolbar.className = "mb-1 flex justify-end";
      const resetBtn = document.createElement("button");
      resetBtn.type = "button";
      resetBtn.textContent = "デフォルトの並びに戻す";
      resetBtn.disabled = true;
      resetBtn.className =
        "text-xs text-ink-500 underline decoration-dotted hover:text-ink-800 disabled:invisible dark:text-ink-400 dark:hover:text-ink-100";
      toolbar.appendChild(resetBtn);
      table.parentElement?.insertBefore(toolbar, table);
      cleanups.push(() => toolbar.remove());

      const reset = () => {
        sortedCol = -1;
        indicators.forEach((ind) => (ind.textContent = ""));
        originalOrder.forEach((r) => tbody.appendChild(r));
        resetBtn.disabled = true;
      };
      resetBtn.addEventListener("click", reset);
      cleanups.push(() => resetBtn.removeEventListener("click", reset));

      Array.from(headerRow.cells).forEach((th, colIndex) => {
        th.style.cursor = "pointer";
        th.style.userSelect = "none";
        th.setAttribute("role", "button");
        th.setAttribute("tabindex", "0");
        th.setAttribute(
          "aria-label",
          `${th.textContent?.trim() ?? ""} で並び替え`,
        );

        const indicator = document.createElement("span");
        indicator.className = "ml-1 inline-block text-xs opacity-50";
        th.appendChild(indicator);
        indicators.push(indicator);

        const sort = () => {
          dir = sortedCol === colIndex && dir === "asc" ? "desc" : "asc";
          sortedCol = colIndex;
          resetBtn.disabled = false;
          indicators.forEach(
            (ind, i) =>
              (ind.textContent =
                i === colIndex ? (dir === "asc" ? " ▲" : " ▼") : ""),
          );

          const rows = Array.from(tbody.rows);
          const getValue = (row: HTMLTableRowElement) =>
            row.cells[colIndex]?.textContent?.trim() ?? "";
          const isNumeric = rows.every((r) => {
            const v = getValue(r).replace(/[,%]/g, "");
            return v === "" || !Number.isNaN(Number(v));
          });

          rows.sort((a, b) => {
            const va = getValue(a);
            const vb = getValue(b);
            const cmp = isNumeric
              ? (parseFloat(va.replace(/[,%]/g, "")) || 0) -
                (parseFloat(vb.replace(/[,%]/g, "")) || 0)
              : va.localeCompare(vb, "ja");
            return dir === "asc" ? cmp : -cmp;
          });
          rows.forEach((r) => tbody.appendChild(r));
        };

        const onKey = (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            sort();
          }
        };

        th.addEventListener("click", sort);
        th.addEventListener("keydown", onKey);
        cleanups.push(() => {
          th.removeEventListener("click", sort);
          th.removeEventListener("keydown", onKey);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
