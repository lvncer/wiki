import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import FileTreeSidebar from "@/components/FileTreeSidebar";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "lvncerpedia",
  description: "lvncer's personal knowledge base",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans text-ink-800 dark:bg-ink-900 dark:text-ink-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="mx-auto flex max-w-6xl lg:items-start">
            <FileTreeSidebar />
            <main className="min-w-0 flex-1 px-4 py-8 sm:px-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
