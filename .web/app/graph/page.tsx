import GraphView from "@/components/GraphView";

export default function GraphPage() {
  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl font-bold text-ink-900 dark:text-ink-50">
        全体グラフ
      </h1>
      <p className="mb-4 text-sm text-ink-600 dark:text-ink-400">
        ノードをドラッグ・ズーム・ホバーできます。クリックでそのページへ移動します。色はカテゴリ(Obsidian
        のグラフ設定を再現)です。
      </p>
      <GraphView />
    </div>
  );
}
