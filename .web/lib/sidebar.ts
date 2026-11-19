const SIDEBAR_STORAGE_KEY = "sidebar-open";
const SIDEBAR_WIDTH_STORAGE_KEY = "sidebar-width";
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

function getNumberPreference(key: string, defaultValue: number): number {
  try {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      const parsed = Number(stored);
      if (Number.isFinite(parsed)) return parsed;
    }
  } catch {
    // localStorage が使えない環境(プライベートモード等)では無視する
  }
  return defaultValue;
}

function setNumberPreference(key: string, value: number): void {
  try {
    localStorage.setItem(key, String(value));
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

export function getSidebarWidthPreference(defaultWidth: number): number {
  return getNumberPreference(SIDEBAR_WIDTH_STORAGE_KEY, defaultWidth);
}

export function setSidebarWidthPreference(width: number): void {
  setNumberPreference(SIDEBAR_WIDTH_STORAGE_KEY, width);
}
