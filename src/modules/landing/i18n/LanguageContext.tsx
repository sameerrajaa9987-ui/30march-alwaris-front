import { useEffect, useMemo, useState, type ReactNode } from "react";
import { LANGS, TRANSLATIONS, type Lang } from "./translations";
import { LanguageCtx, type LanguageContextValue } from "./language";

const STORAGE_KEY = "alwaris.lang";

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "ar" || stored === "fa") return stored;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const dir = useMemo(
    () => LANGS.find((l) => l.code === lang)?.dir ?? "ltr",
    [lang],
  );

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage failures (private mode) */
    }
  };

  // Reflect language + direction on the document so screen readers and any
  // portalled UI (toasts) inherit it; restored on unmount so the ERP portal is
  // unaffected.
  useEffect(() => {
    const root = document.documentElement;
    const prevLang = root.getAttribute("lang");
    const prevDir = root.getAttribute("dir");
    root.setAttribute("lang", lang);
    root.setAttribute("dir", dir);
    return () => {
      if (prevLang) root.setAttribute("lang", prevLang);
      else root.removeAttribute("lang");
      if (prevDir) root.setAttribute("dir", prevDir);
      else root.removeAttribute("dir");
    };
  }, [lang, dir]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir, setLang, t: TRANSLATIONS[lang] }),
    [lang, dir],
  );

  return <LanguageCtx.Provider value={value}>{children}</LanguageCtx.Provider>;
}
