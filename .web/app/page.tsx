import { getHomeContent } from "@/lib/content/home";
import MarkdownArticle from "@/components/MarkdownArticle";
import ArticleLayout from "@/components/ArticleLayout";

export default function HomePage() {
  const { html } = getHomeContent();

  return (
    <ArticleLayout slug="">
      <MarkdownArticle html={html} />
    </ArticleLayout>
  );
}
