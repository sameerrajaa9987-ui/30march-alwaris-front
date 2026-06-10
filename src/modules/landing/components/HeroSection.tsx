import { ArrowRight, ShieldCheck } from "lucide-react";
import { BRAND, IMAGES, STATS } from "../content";
import { TrackQuoteWidget } from "./TrackQuoteWidget";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-brand"
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <img
          src={IMAGES.hero}
          alt="Container ship at sea"
          className="size-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/92 to-brand-deep/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/20 to-brand-deep/70" />
      </div>

      {/* Main content — grows to fill, vertically centered */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-10 px-5 pt-28 pb-12 sm:pt-32 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        {/* Left: oversized editorial headline */}
        <div className="flex-1">
          <span className="kicker flex items-center gap-3 text-[10px] font-semibold uppercase text-ocean-light sm:text-[11px]">
            <span>UAE</span>
            <span className="h-px w-8 bg-ocean-light/40" />
            <span>Global Shipping &amp; Logistics</span>
          </span>

          <h1 className="font-display mt-5 text-[2.6rem] font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Moving Trust
            <br />
            Across <span className="text-ocean-light">Borders</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
            {BRAND.legalName} — NVOCC, freight forwarding, project cargo,
            transportation and 3PL warehousing, managed with integrity,
            precision and unwavering reliability.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition-colors hover:bg-ocean-light"
            >
              Request a Quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-7 flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
            <ShieldCheck className="size-4 shrink-0 text-ocean-light" />
            Trusted handling &middot; transparent pricing &middot; 24/7
            operations
          </div>
        </div>

        {/* Right: track / quote widget */}
        <div className="w-full shrink-0 lg:max-w-sm lg:justify-self-end">
          <TrackQuoteWidget />
        </div>
      </div>

      {/* Stats — in normal flow at the bottom, never overlapping */}
      <div className="border-t border-white/10 bg-brand-deep/50 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:grid-cols-4 sm:divide-x sm:divide-white/10 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="px-2 py-5 sm:px-6 sm:py-6">
              <div className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {s.value}
              </div>
              <div className="kicker mt-1 text-[9px] uppercase text-slate-400 sm:text-[10px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
