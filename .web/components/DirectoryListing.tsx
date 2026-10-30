import Link from "next/link";
import type { DirectoryEntry } from "@/lib/content/build";

function FolderIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1.75 2A1.75 1.75 0 0 0 0 3.75v8.5C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0 0 16 12.25v-7.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2A1.75 1.75 0 0 0 5 1H1.75Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V5h-3.75A1.75 1.75 0 0 1 8 3.25V1.5Z" />
    </svg>
  );
}

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
  );
}
