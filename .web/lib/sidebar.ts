const SIDEBAR_STORAGE_KEY = "sidebar-open";

export function getSidebarOpenPreference(defaultOpen: boolean): boolean {
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored === "1") return true;
    if (stored === "0") return false;
  } catch {
    // localStorage が使えない環境(プライベートモード等)では無視する
  }
  return defaultOpen;
}

export function setSidebarOpenPreference(open: boolean): void {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, open ? "1" : "0");
  } catch {
    // localStorage が使えない環境(プライベートモード等)では無視する
  }
}
