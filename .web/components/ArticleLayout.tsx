import type { ReactNode } from "react";

export default function ArticleLayout({
  children,
  meta,
}: {
  children: ReactNode;
  meta?: ReactNode;
}) {
  if (!meta) {
    return <div className="mx-auto max-w-4xl">{children}</div>;
  }
  return (
    <div className="mx-auto max-w-5xl lg:flex lg:items-start lg:gap-8">
      <div className="min-w-0 flex-1 lg:max-w-4xl">{children}</div>
      <div className="mt-6 lg:mt-0 lg:w-56 lg:shrink-0">{meta}</div>
    </div>
  );
}
