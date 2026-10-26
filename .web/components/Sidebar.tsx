import Link from "next/link";
import { getTopCategories } from "@/lib/content/note";

export default function Sidebar({ currentSlug }: { currentSlug: string }) {
  const categories = getTopCategories();
  const currentTop = currentSlug.split("/")[0];

  return (
    <nav aria-label="カテゴリ一覧" className="text-sm">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">カテゴリ</h2>
      <ul className="space-y-1">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/wiki/${c.slug}`}
              className={
                c.slug === currentTop
                  ? "font-semibold text-ink-900 underline dark:text-ink-50"
                  : "text-ink-700 hover:underline dark:text-ink-300"
              }
            >
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
