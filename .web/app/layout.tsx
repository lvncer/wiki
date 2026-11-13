import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import FileTreeSidebar from "@/components/FileTreeSidebar";
import Header from "@/components/Header";
import { getTree } from "@/lib/content/note";
import "./globals.css";

export const metadata: Metadata = {
  title: "lvncerpedia",
  description: "lvncer's personal knowledge base",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // ビルド時に一度だけ読んだツリーをそのまま渡す。ブラウザ側での fetch + ローディング表示を無くすため。
  const tree = getTree();
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans text-ink-800 dark:bg-ink-900 dark:text-ink-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <FileTreeSidebar tree={tree} />
          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
