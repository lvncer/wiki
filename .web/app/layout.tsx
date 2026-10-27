import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "lvncerpedia",
  description: "個人の学習メモ Wiki(Obsidian Vault を Web 公開)",
};

// ハイドレーション前に <html> へ dark クラスを同期的に付与し、テーマのちらつき(FOUC)を防ぐ。
// キー名 "theme" は lib/theme.ts の THEME_STORAGE_KEY と一致させること。
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||((!t||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-white font-sans text-ink-800 dark:bg-ink-900 dark:text-ink-100">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
