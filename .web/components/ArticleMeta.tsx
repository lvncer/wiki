export default function ArticleMeta({
  category,
  author,
  updatedAt,
}: {
  category?: string;
  author?: string;
  updatedAt?: string;
}) {
  if (!category && !author && !updatedAt) return null;

  const formattedDate = updatedAt
    ? new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Tokyo",
      }).format(new Date(updatedAt))
    : undefined;

  return (
    <aside aria-label="記事情報" className="space-y-4 text-sm">
      {category && (
        <div>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
            カテゴリー
          </h2>
          <span className="inline-block rounded-sm border border-ink-300 px-2 py-0.5 text-xs text-ink-700 dark:border-ink-700 dark:text-ink-300">
            {category}
          </span>
        </div>
      )}
      {author && (
        <div>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
            作成者
          </h2>
          <p className="text-ink-700 dark:text-ink-300">{author}</p>
        </div>
      )}
      {formattedDate && (
        <div>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
            最終更新日
          </h2>
          <p className="text-ink-700 dark:text-ink-300">
            <time dateTime={updatedAt}>{formattedDate}</time>
          </p>
        </div>
      )}
    </aside>
  );
}
