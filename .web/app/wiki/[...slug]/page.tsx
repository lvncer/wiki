import { notFound } from "next/navigation";
import ArticleLayout from "@/components/ArticleLayout";
import Backlinks from "@/components/Backlinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import DirectoryListing from "@/components/DirectoryListing";
import MarkdownArticle from "@/components/MarkdownArticle";
import { getAllNotes, getNoteBySlug } from "@/lib/content/note";

export function generateStaticParams() {
  return getAllNotes()
    .filter((n) => n.slug !== "")
    .map((n) => ({ slug: n.slug.split("/") }));
}

export default async function WikiPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
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
