import Link from "next/link";

export default function Breadcrumbs({ slug }: { slug: string }) {
  if (slug === "") return null;
  const segments = slug.split("/");
  const crumbs: { href: string; label: string }[] = [
    { href: "/", label: "lvncerpedia" },
  ];
  let acc = "";
  for (const seg of segments) {
    acc = acc ? `${acc}/${seg}` : seg;
    crumbs.push({
      href: `/wiki/${acc.split("/").map(encodeURIComponent).join("/")}`,
      label: seg,
    });
  }
  return (
    <nav
      aria-label="breadcrumb"
      className="mb-4 text-sm text-ink-500 dark:text-ink-400"
    >
      {crumbs.map((c, i) => (
        <span key={c.href}>
          {i > 0 && <span className="mx-1">/</span>}
          {i === crumbs.length - 1 ? (
            <span className="text-ink-700 dark:text-ink-300">{c.label}</span>
          ) : (
            <Link href={c.href} className="hover:underline">
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
