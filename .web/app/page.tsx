import { notFound } from "next/navigation";
import { getNoteBySlug } from "@/lib/content/note";
import MarkdownArticle from "@/components/MarkdownArticle";
import Backlinks from "@/components/Backlinks";
import ArticleLayout from "@/components/ArticleLayout";
import DirectoryListing from "@/components/DirectoryListing";

export default function HomePage() {
  const note = getNoteBySlug("");
  if (!note) notFound();

  return (
    <ArticleLayout slug="">
      <DirectoryListing entries={note.children} />
      <MarkdownArticle html={note.html} />
      <Backlinks backlinks={note.backlinks} />
    </ArticleLayout>
  );
}
