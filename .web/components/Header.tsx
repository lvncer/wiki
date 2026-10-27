import Link from "next/link";
import SearchBox from "./SearchBox";
import ThemeToggle from "./ThemeToggle";
import CategoryMenu from "./CategoryMenu";
import { getTopCategories } from "@/lib/content/note";

export default function Header() {
  const categories = getTopCategories();

  return (
    <header className="border-b border-ink-300 dark:border-ink-700">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="whitespace-nowrap font-serif text-xl font-bold text-ink-900 dark:text-ink-50">
          lvncerpedia
        </Link>
        <nav className="flex gap-4 text-sm text-ink-700 dark:text-ink-300">
          <Link href="/" className="hover:underline">
            トップ
          </Link>
          <Link href="/graph" className="hover:underline">
            グラフ
          </Link>
          <CategoryMenu categories={categories} />
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <SearchBox />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
