import SortableTables from "./SortableTables";

export default function MarkdownArticle({ html }: { html: string }) {
  // コンテンツはリポジトリ所有者自身が書いた信頼済みの Markdown のみ(外部入力なし)。
  return (
    <>
      <article className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      <SortableTables />
    </>
  );
}
