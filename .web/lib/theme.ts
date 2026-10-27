export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "themechange";

export type ThemePreference = "light" | "dark" | "system";

function prefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function getThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system")
      return stored;
  } catch {
    // localStorage が使えない環境(プライベートモード等)では無視する
  }
  return "system";
}

export function isDarkMode(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function resolveIsDark(pref: ThemePreference): boolean {
  return pref === "system" ? prefersDark() : pref === "dark";
}

/** 現在の設定(system ならOS設定)に基づいて <html>.dark クラスを同期する。
 *  OS のテーマ変更を検知した再適用でも使うため、設定の保存は行わない。 */
export function applyThemePreference(pref: ThemePreference): void {
  document.documentElement.classList.toggle("dark", resolveIsDark(pref));
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function setThemePreference(pref: ThemePreference): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    // localStorage が使えない環境(プライベートモード等)では無視する
  }
  applyThemePreference(pref);
}
