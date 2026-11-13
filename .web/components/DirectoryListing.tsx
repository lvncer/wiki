import Link from "next/link";
import type { DirectoryEntry } from "@/lib/content/build";
import { FileIcon, FolderIcon } from "./icons";

function hrefFor(slug: string): string {
  return slug === ""
    ? "/"
    : `/wiki/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

export default function DirectoryListing({
  entries,
}: {
  entries?: DirectoryEntry[];
}) {
  if (!entries || entries.length === 0) return null;
  return (
    <div className="lg:hidden">
      <table className="mb-8 w-full table-fixed border border-ink-200 text-sm dark:border-ink-700">
        <tbody>
          {entries.map((e) => (
            <tr
              key={e.slug}
              className="border-t border-ink-100 first:border-t-0 hover:bg-ink-50 dark:border-ink-800 dark:hover:bg-ink-800"
            >
              <td className="w-8 py-2 pl-3 text-ink-400 dark:text-ink-500">
                <Link href={hrefFor(e.slug)} className="block">
                  {e.kind === "folder" ? <FolderIcon /> : <FileIcon />}
                </Link>
              </td>
              <td className="truncate py-2 pr-3">
                <Link href={hrefFor(e.slug)} className="block hover:underline">
                  {e.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
