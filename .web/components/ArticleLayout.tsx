import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function ArticleLayout({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[13rem_1fr]">
      <Sidebar currentSlug={slug} />
      <div>{children}</div>
    </div>
  );
}
