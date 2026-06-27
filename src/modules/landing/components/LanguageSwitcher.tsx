import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "../i18n/language";
import { LANGS } from "../i18n/translations";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const current = LANGS.find((l) => l.code === lang);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
      >
        <Globe className="size-4" />
        <span className="min-w-[3ch]">{current?.label}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-card py-1 text-foreground shadow-xl"
        >
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-secondary",
                  l.code === lang && "font-semibold text-ocean-dark",
                )}
                dir={l.dir}
              >
                {l.label}
                {l.code === lang && <Check className="size-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
