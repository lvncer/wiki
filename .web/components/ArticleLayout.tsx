import type { ReactNode } from "react";

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl">{children}</div>;
}
