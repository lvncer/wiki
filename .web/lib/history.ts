const HISTORY_STORAGE_KEY = "view-history";
const MAX_ENTRIES = 10;

export interface ViewHistoryEntry {
  slug: string;
  title: string;
  viewedAt: string;
}

export function getViewHistory(): ViewHistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** 記事訪問時に1件記録する。同じ slug の既存エントリは削除してから先頭に挿入し、
 *  常に「最後に見た順」に並べ替える。件数は MAX_ENTRIES で頭打ち。 */
export function addViewHistoryEntry(
  entry: Omit<ViewHistoryEntry, "viewedAt">,
): void {
  try {
    const current = getViewHistory().filter((e) => e.slug !== entry.slug);
    const next = [
      { ...entry, viewedAt: new Date().toISOString() },
      ...current,
    ].slice(0, MAX_ENTRIES);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage が使えない環境(プライベートモード等)では無視する
  }
}
