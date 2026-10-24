import Link from "next/link";
import SearchBox from "./SearchBox";

export default function Header() {
  return (
    <header className="border-b border-ink-300">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="whitespace-nowrap font-serif text-xl font-bold text-ink-900">
          lvncerpedia
        </Link>
        <nav className="flex gap-4 text-sm text-ink-700">
          <Link href="/" className="hover:underline">
            トップ
          </Link>
          <Link href="/graph" className="hover:underline">
            グラフ
          </Link>
        </nav>
        <div className="ml-auto">
          <SearchBox />
        </div>
      </div>
    </header>
  );
}
