import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Anchor, ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, NAV_LINKS } from "../content";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0b1f3a]/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5 text-white">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 shadow-lg shadow-cyan-900/40">
            <Anchor className="size-5 text-[#0b1f3a]" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight">
              {BRAND.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/80">
              Shipping &amp; Logistics
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-cyan-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to={BRAND.portalPath}
            className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
          >
            Portal Login
          </Link>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-[#0b1f3a] shadow-lg shadow-cyan-900/30 transition-transform hover:scale-[1.03]"
          >
            Get a Quote
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
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
          "overflow-hidden border-t border-white/10 bg-[#0b1f3a]/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-300"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-3 border-t border-white/10 pt-3">
            <Link
              to={BRAND.portalPath}
              className="flex-1 rounded-full border border-white/20 px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              Portal Login
            </Link>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-2.5 text-center text-sm font-semibold text-[#0b1f3a]"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
