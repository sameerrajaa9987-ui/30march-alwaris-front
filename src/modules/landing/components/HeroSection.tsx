import { ArrowRight, ShieldCheck } from "lucide-react";
import { IMAGES, STATS } from "../content";
import { useT } from "../i18n/language";
import { TrackQuoteWidget } from "./TrackQuoteWidget";

export function HeroSection() {
  const t = useT();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-brand"
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <img
          src={IMAGES.hero}
          alt="Al Waris container ship at sunset"
          className="size-full object-cover"
          loading="eager"
        />
        {/* Left gradient keeps the headline legible; the sunset shows on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/80 to-brand-deep/25 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-transparent to-brand-deep/40" />
      </div>

      <div className="pointer-events-none absolute -right-24 top-1/4 size-96 rounded-full bg-ocean/20 blur-3xl" />

      {/* Main content */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-10 px-5 pt-28 pb-12 sm:pt-32 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        <div className="flex-1">
          <span className="kicker flex items-center gap-3 text-[10px] font-semibold uppercase text-ocean-light sm:text-[11px]">
            <span>{t.hero.region}</span>
            <span className="h-px w-8 bg-ocean-light/40" />
            <span>{t.hero.kicker}</span>
          </span>

          <h1 className="font-display mt-5 text-[2.6rem] font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t.hero.titlePre}{" "}
            <span className="text-ocean-light">{t.hero.titleHighlight}</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition-colors hover:bg-ocean-light"
            >
              {t.hero.requestQuote}
              <ArrowRight
                data-flip-rtl
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t.hero.exploreServices}
            </a>
          </div>

          <div className="mt-7 flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
            <ShieldCheck className="size-4 shrink-0 text-ocean-light" />
            {t.hero.trustLine}
          </div>
        </div>

        <div className="w-full shrink-0 lg:max-w-sm lg:justify-self-end">
          <TrackQuoteWidget />
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-white/10 bg-brand-deep/50 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:grid-cols-4 sm:divide-x sm:divide-white/10 rtl:sm:divide-x-reverse lg:px-8">
          {STATS.map((s) => (
            <div key={s.labelKey} className="px-2 py-5 sm:px-6 sm:py-6">
              <div className="font-display text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl lg:text-4xl">
                {s.value ?? (s.valueKey ? t.stats[s.valueKey] : "")}
              </div>
              <div className="kicker mt-1 text-[9px] uppercase text-slate-400 sm:text-[10px]">
                {t.stats[s.labelKey]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
