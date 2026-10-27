import GraphView from "@/components/GraphView";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function GraphPage() {
  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl font-bold text-ink-900 dark:text-ink-50">全体グラフ</h1>
      <p className="mb-4 text-sm text-ink-600 dark:text-ink-400">
        ノードをドラッグ・ズーム・ホバーできます。クリックでそのページへ移動します。色はカテゴリ(Obsidian のグラフ設定を再現)です。
      </p>
      <GraphView />
    </div>
  );
}
