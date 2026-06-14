export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "ic-theme";

/** Read the persisted theme, falling back to light. Safe on the server. */
export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" ? "dark" : "light";
}

/** Apply a theme to <html> and persist it. */
export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Inline script (stringified) that sets data-theme before first paint,
 * so there is no light/dark flash on load. Injected in the root layout.
 */
export const NO_FLASH_THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;
