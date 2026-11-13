import ArticleLayout from "@/components/ArticleLayout";
import MarkdownArticle from "@/components/MarkdownArticle";
import { getHomeContent } from "@/lib/content/home";
import { getTopCategories } from "@/lib/content/note";
import DirectoryListing from "@/components/DirectoryListing";

export default function HomePage() {
  const { html } = getHomeContent();

  const categories = getTopCategories().map((c) => ({
    kind: "folder" as const,
    slug: c.slug,
    title: c.title,
  }));

  return (
    <ArticleLayout>
      <MarkdownArticle html={html} />
      <DirectoryListing entries={categories} />
    </ArticleLayout>
  );
}
