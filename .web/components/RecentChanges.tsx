import Link from "next/link";
import type { RecentChange } from "@/lib/content/recentChanges";

function hrefFor(slug: string): string {
  return slug === "" ? "/" : `/wiki/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" });
}

export default function RecentChanges({ items }: { items: RecentChange[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12 border-t border-ink-200 pt-4 dark:border-ink-700">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
        最近の更新
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((c) => (
          <li key={c.slug} className="flex flex-wrap items-baseline gap-x-2">
            <span className="w-24 shrink-0 text-ink-500 dark:text-ink-400">{formatDate(c.date)}</span>
            <Link href={hrefFor(c.slug)} className="text-ink-800 hover:underline dark:text-ink-200">
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
