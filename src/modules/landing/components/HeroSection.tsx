import { ArrowRight, Globe2, ShieldCheck } from "lucide-react";
import { BRAND, IMAGES, STATS } from "../content";
import { TrackQuoteWidget } from "./TrackQuoteWidget";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0b1f3a]"
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Container ship at sea"
          className="size-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06122a] via-[#06122a]/90 to-[#06122a]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06122a] via-transparent to-[#06122a]/60" />
      </div>

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-24 top-1/4 size-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-16 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_minmax(0,420px)]">
          {/* Left: copy */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
              <Globe2 className="size-3.5" />
              Global Freight &amp; Logistics
            </span>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {BRAND.tagline}
              <span className="block bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                with Every Shipment
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              {BRAND.legalName} delivers NVOCC, freight forwarding, project
              cargo, transportation and 3PL warehousing — managed with
              integrity, precision and unwavering reliability.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-[#0b1f3a] shadow-xl shadow-cyan-900/40 transition-transform hover:scale-[1.03]"
              >
                Request a Quote
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-7 flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="size-4 text-cyan-300" />
              Trusted handling &middot; transparent pricing &middot; 24/7
              operations
            </div>
          </div>

          {/* Right: track / quote widget */}
          <div className="lg:justify-self-end">
            <TrackQuoteWidget />
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white/[0.02] px-5 py-6 text-center"
            >
              <div className="font-display text-2xl font-semibold text-cyan-300 sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
