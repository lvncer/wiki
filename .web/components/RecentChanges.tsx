import Link from "next/link";
import type { RecentChange } from "@/lib/content/note";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(iso));
}

export default function RecentChanges({
  changes,
}: {
  changes: RecentChange[];
}) {
  if (changes.length === 0) return null;

  return (
    <section aria-labelledby="recent-changes-heading" className="mt-8">
      <h2
        id="recent-changes-heading"
        className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400"
      >
        直近の変更履歴(最大5件)
      </h2>
      <ul className="divide-y divide-ink-100 dark:divide-ink-800">
        {changes.map((c) => (
          <li
            key={c.slug}
            className="flex items-center justify-between gap-4 py-2 text-sm"
          >
            <Link
              href={`/wiki/${c.slug.split("/").map(encodeURIComponent).join("/")}`}
              className="truncate hover:underline"
            >
              {c.title}
            </Link>
            <span className="shrink-0 text-xs text-ink-500 dark:text-ink-400">
              {formatDate(c.updatedAt)}
              {c.author ? ` · ${c.author}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
