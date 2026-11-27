import ArticleLayout from "@/components/ArticleLayout";
import DirectoryListing from "@/components/DirectoryListing";
import MarkdownArticle from "@/components/MarkdownArticle";
import RecentChanges from "@/components/RecentChanges";
import ViewHistory from "@/components/ViewHistory";
import { getHomeContent } from "@/lib/content/home";
import { getRecentChanges, getTopCategories } from "@/lib/content/note";

export default function HomePage() {
  const { html } = getHomeContent();

  const categories = getTopCategories().map((c) => ({
    kind: "folder" as const,
    slug: c.slug,
    title: c.title,
  }));
  const recentChanges = getRecentChanges(5);

  return (
    <ArticleLayout>
      <MarkdownArticle html={html} />
      <DirectoryListing entries={categories} />
      <RecentChanges changes={recentChanges} />
      <ViewHistory />
    </ArticleLayout>
  );
}
