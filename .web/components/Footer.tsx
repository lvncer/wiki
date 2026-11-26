import GitHubLink from "./GitHubLink";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-300 bg-white dark:border-ink-700 dark:bg-ink-900">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-16 text-sm text-ink-500 sm:px-6 dark:text-ink-400">
        <p>&copy; {year} lvncerpedia</p>
        <GitHubLink />
      </div>
    </footer>
  );
}
