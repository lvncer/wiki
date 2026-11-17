const SIDEBAR_STORAGE_KEY = "sidebar-open";
const ARTICLE_META_STORAGE_KEY = "article-meta-open";

function getBooleanPreference(key: string, defaultValue: boolean): boolean {
  try {
    const stored = localStorage.getItem(key);
    if (stored === "1") return true;
    if (stored === "0") return false;
  } catch {
    // localStorage が使えない環境(プライベートモード等)では無視する
  }
  return defaultValue;
}

function setBooleanPreference(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, value ? "1" : "0");
  } catch {
    // localStorage が使えない環境(プライベートモード等)では無視する
  }
}

export function getSidebarOpenPreference(defaultOpen: boolean): boolean {
  return getBooleanPreference(SIDEBAR_STORAGE_KEY, defaultOpen);
}

export function setSidebarOpenPreference(open: boolean): void {
  setBooleanPreference(SIDEBAR_STORAGE_KEY, open);
}

export function getArticleMetaOpenPreference(defaultOpen: boolean): boolean {
  return getBooleanPreference(ARTICLE_META_STORAGE_KEY, defaultOpen);
}

export function setArticleMetaOpenPreference(open: boolean): void {
  setBooleanPreference(ARTICLE_META_STORAGE_KEY, open);
}
