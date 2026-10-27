import Link from "next/link";

export default function Backlinks({
  backlinks,
}: {
  backlinks: { slug: string; title: string }[];
}) {
  if (backlinks.length === 0) return null;
  return (
    <aside className="mt-12 border-t border-ink-200 pt-4 text-sm dark:border-ink-700">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
        このページにリンクしているページ
      </h2>
      <ul className="list-inside list-disc space-y-1 text-ink-700 dark:text-ink-300">
        {backlinks.map((b) => (
          <li key={b.slug}>
            <Link
              href={
                b.slug === ""
                  ? "/"
                  : `/wiki/${b.slug.split("/").map(encodeURIComponent).join("/")}`
              }
              className="hover:underline"
            >
              {b.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
