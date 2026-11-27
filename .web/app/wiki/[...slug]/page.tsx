import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleMeta from "@/components/ArticleMeta";
import Backlinks from "@/components/Backlinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import DirectoryListing from "@/components/DirectoryListing";
import MarkdownArticle from "@/components/MarkdownArticle";
import ViewHistoryRecorder from "@/components/ViewHistoryRecorder";
import { getAllNotes, getNoteBySlug } from "@/lib/content/note";

export function generateStaticParams() {
  return getAllNotes()
    .filter((n) => n.slug !== "")
    .map((n) => ({ slug: n.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug: segments } = await params;
  const note = getNoteBySlug(segments.join("/"));
  if (!note) return {};

  const description = note.description ?? `${note.title} についてのノート`;
  return {
    title: note.title,
    description,
    openGraph: { title: note.title, description, type: "article" },
  };
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
    <>
      <ArticleMeta
        category={note.category}
        author={note.author}
        updatedAt={note.updatedAt}
        headings={note.headings}
      />
      <ArticleLayout>
        <Breadcrumbs slug={slug} />
        <DirectoryListing entries={note.children} />
        <MarkdownArticle html={note.html} />
        <Backlinks backlinks={note.backlinks} />
        <ViewHistoryRecorder slug={note.slug} title={note.title} />
      </ArticleLayout>
    </>
  );
}
