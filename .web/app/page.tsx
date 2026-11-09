import ArticleLayout from "@/components/ArticleLayout";
import MarkdownArticle from "@/components/MarkdownArticle";
import RecentChanges from "@/components/RecentChanges";
import { getHomeContent } from "@/lib/content/home";
import { getRecentChanges } from "@/lib/content/recentChanges";
import { getTopCategories } from "@/lib/content/note";
import DirectoryListing from "@/components/DirectoryListing";

export default async function HomePage() {
  const { html } = getHomeContent();
  const recentChanges = await getRecentChanges(8);

  const categories = getTopCategories().map((c) => ({
    kind: "folder" as const,
    slug: c.slug,
    title: c.title,
  }));

  return (
    <ArticleLayout>
      <MarkdownArticle html={html} />
      <RecentChanges items={recentChanges} />

      <h1 className="pt-2 my-8 text-2xl font-bold text-ink-900 dark:text-ink-50">
        Categories
      </h1>
      <DirectoryListing entries={categories} />
    </ArticleLayout>
  );
}
