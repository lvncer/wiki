import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug } from "@/lib/content/note";
import MarkdownArticle from "@/components/MarkdownArticle";
import Breadcrumbs from "@/components/Breadcrumbs";
import Backlinks from "@/components/Backlinks";
import ArticleLayout from "@/components/ArticleLayout";
import DirectoryListing from "@/components/DirectoryListing";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export function generateStaticParams() {
  return getAllNotes()
    .filter((n) => n.slug !== "")
    .map((n) => ({ slug: n.slug.split("/") }));
}

export default async function WikiPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: segments } = await params;
  const slug = segments.join("/");
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <ArticleLayout>
      <Breadcrumbs slug={slug} />
      <DirectoryListing entries={note.children} />
      <MarkdownArticle html={note.html} />
      <Backlinks backlinks={note.backlinks} />
    </ArticleLayout>
  );
}
