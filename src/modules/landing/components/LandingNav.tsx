import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, NAV_ITEMS, SERVICE_ICONS, SERVICE_META } from "../content";
import { useT } from "../i18n/language";
import { LogoMark } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * `hrefPrefix` lets pages other than the landing page (e.g. /services/:slug)
 * point the in-page anchors back at the home page — "#about" → "/#about".
 */
export function LandingNav({ hrefPrefix = "" }: { hrefPrefix?: string }) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the services dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      )
        setServicesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [servicesOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-brand/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a
          href={`${hrefPrefix}#home`}
          className="flex items-center gap-3 text-white"
          aria-label={BRAND.name}
        >
          <LogoMark className="size-14 shadow-lg shadow-black/20" />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base font-semibold tracking-tight lg:text-lg">
              {BRAND.name}
            </span>
            <span className="kicker text-[10px] uppercase text-ocean-light/80">
              {t.nav.subBrand}
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((l) =>
            l.key === "services" ? (
              <div
                key={l.href}
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-200 transition-colors hover:text-ocean-light"
                >
                  {t.nav.services}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </button>

                {servicesOpen && (
                  <div className="absolute start-1/2 top-full z-50 w-[30rem] -translate-x-1/2 pt-4 rtl:translate-x-1/2">
                    <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl">
                      <div className="grid grid-cols-2 gap-1">
                        {SERVICE_META.map((m, i) => {
                          const Icon = SERVICE_ICONS[i];
                          return (
                            <Link
                              key={m.slug}
                              to={`/services/${m.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
                            >
                              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-ocean-dark transition-colors group-hover:bg-brand group-hover:text-ocean-light">
                                <Icon className="size-4" />
                              </span>
                              <span className="text-[13px] font-medium leading-tight text-foreground">
                                {t.services.items[i].title}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      <a
                        href={`${hrefPrefix}#services`}
                        onClick={() => setServicesOpen(false)}
                        className="mt-1 flex items-center justify-center gap-1.5 rounded-xl border-t border-border px-3 py-2.5 text-xs font-semibold text-ocean-dark hover:bg-secondary"
                      >
                        {t.serviceDetail.viewAll}
                        <ArrowRight data-flip-rtl className="size-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={l.href}
                href={`${hrefPrefix}${l.href}`}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-ocean-light"
              >
                {t.nav[l.key]}
              </a>
            ),
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            to={BRAND.portalPath}
            className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
          >
            {t.nav.portalLogin}
          </Link>
          <a
            href={`${hrefPrefix}#contact`}
            className="group inline-flex items-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-brand shadow-lg shadow-brand/30 transition-transform hover:scale-[1.03]"
          >
            {t.nav.getQuote}
            <ArrowRight
              data-flip-rtl
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-lg text-white lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-y-auto overscroll-contain border-t border-white/10 bg-brand/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[70vh]" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {NAV_ITEMS.map((l) =>
            l.key === "services" ? (
              <div key={l.href}>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
                >
                  {t.nav.services}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      mobileServicesOpen && "rotate-180",
                    )}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="ms-3 flex flex-col border-s border-white/10 ps-3">
                    {SERVICE_META.map((m, i) => (
                      <Link
                        key={m.slug}
                        to={`/services/${m.slug}`}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-[13px] text-slate-300 hover:bg-white/5 hover:text-ocean-light"
                      >
                        {t.services.items[i].title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={l.href}
                href={`${hrefPrefix}${l.href}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-ocean-light"
              >
                {t.nav[l.key]}
              </a>
            ),
          )}
          <div className="mt-2 flex items-center gap-3 border-t border-white/10 pt-3">
            <LanguageSwitcher />
            <Link
              to={BRAND.portalPath}
              className="flex-1 rounded-full border border-white/20 px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              {t.nav.portalLogin}
            </Link>
            <a
              href={`${hrefPrefix}#contact`}
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-ocean px-4 py-2.5 text-center text-sm font-semibold text-brand"
            >
              {t.nav.getQuote}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
