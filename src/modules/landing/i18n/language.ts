import { createContext, useContext } from "react";
import type { Dict, Lang } from "./translations";

export type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  t: Dict;
};

export const LanguageCtx = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageCtx);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

/** Convenience hook returning just the translation dictionary. */
export function useT() {
  return useLanguage().t;
}
