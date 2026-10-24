import Link from "next/link";
import { getNoteBySlug } from "@/lib/content/note";

export default function Breadcrumbs({ slug }: { slug: string }) {
  if (slug === "") return null;
  const segments = slug.split("/");
  const crumbs: { href: string; label: string }[] = [{ href: "/", label: "lvncerpedia" }];
  let acc = "";
  for (const seg of segments) {
    acc = acc ? `${acc}/${seg}` : seg;
    const note = getNoteBySlug(acc);
    crumbs.push({ href: `/wiki/${acc.split("/").map(encodeURIComponent).join("/")}`, label: note?.title ?? seg });
  }
  return (
    <nav aria-label="breadcrumb" className="mb-4 text-sm text-ink-500">
      {crumbs.map((c, i) => (
        <span key={c.href}>
          {i > 0 && <span className="mx-1">/</span>}
          {i === crumbs.length - 1 ? (
            <span className="text-ink-700">{c.label}</span>
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
