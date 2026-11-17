"use client";

import { useEffect } from "react";
import { addViewHistoryEntry } from "@/lib/history";

/** 記事ページをマウントするたびに閲覧履歴へ1件追加する(表示は行わない)。 */
export default function ViewHistoryRecorder({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  useEffect(() => {
    addViewHistoryEntry({ slug, title });
  }, [slug, title]);

  return null;
}
