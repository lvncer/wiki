import ArticleLayout from "@/components/ArticleLayout";
import DirectoryListing from "@/components/DirectoryListing";
import { getTopCategories } from "@/lib/content/note";

export default function CategoriesPage() {
  const categories = getTopCategories().map((c) => ({
    kind: "folder" as const,
    slug: c.slug,
    title: c.title,
  }));

  return (
    <ArticleLayout>
      <h1 className="mb-6 font-serif text-2xl font-bold text-ink-900 dark:text-ink-50">
        カテゴリー
      </h1>
      <DirectoryListing entries={categories} />
    </ArticleLayout>
  );
}
