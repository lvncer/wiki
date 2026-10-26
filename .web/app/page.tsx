import { getHomeContent } from "@/lib/content/home";
import { getRecentChanges } from "@/lib/content/recentChanges";
import MarkdownArticle from "@/components/MarkdownArticle";
import ArticleLayout from "@/components/ArticleLayout";
import RecentChanges from "@/components/RecentChanges";

export default async function HomePage() {
  const { html } = getHomeContent();
  const recentChanges = await getRecentChanges(8);

  return (
    <ArticleLayout slug="">
      <MarkdownArticle html={html} />
      <RecentChanges items={recentChanges} />
    </ArticleLayout>
  );
}
