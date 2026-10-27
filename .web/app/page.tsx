import { getHomeContent } from "@/lib/content/home";
import { getRecentChanges } from "@/lib/content/recentChanges";
import MarkdownArticle from "@/components/MarkdownArticle";
import ArticleLayout from "@/components/ArticleLayout";
import RecentChanges from "@/components/RecentChanges";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function HomePage() {
  const { html } = getHomeContent();
  const recentChanges = await getRecentChanges(8);

  return (
    <ArticleLayout>
      <MarkdownArticle html={html} />
      <RecentChanges items={recentChanges} />
    </ArticleLayout>
  );
}
