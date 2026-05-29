import { getStoredJson, setStoredJson } from "./persistence";

export type PreferredMode = "consult" | "study";
export type PreferredTheme = "light" | "dark";

const KEY = "preferred_mode";
const THEME_KEY = "preferred_theme";

export function getPreferredMode(): PreferredMode | null {
  const v = getStoredJson<PreferredMode | null>(KEY, null);
  if (v === "consult" || v === "study") return v;
  return null;
}

export function setPreferredMode(mode: PreferredMode) {
  setStoredJson(KEY, mode);
}

export function getPreferredTheme(): PreferredTheme {
  const v = getStoredJson<PreferredTheme | null>(THEME_KEY, null);
  if (v === "dark" || v === "light") return v;
  return "light";
}

export function setPreferredTheme(theme: PreferredTheme) {
  setStoredJson(THEME_KEY, theme);
}
