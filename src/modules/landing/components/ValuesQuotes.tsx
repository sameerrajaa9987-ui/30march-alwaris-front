import { Quote as QuoteIcon } from "lucide-react";
import { QUOTES } from "../content";

export function ValuesQuotes() {
  return (
    <section
      id="values"
      className="relative overflow-hidden bg-[#0b1f3a] py-24 lg:py-32"
    >
      {/* Subtle pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Our Guiding Values
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Inspired by Timeless Teachings
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            The principles of Haji Waris Ali Shah&mdash;humility, sincerity and
            unwavering faith&mdash;shape the way we serve every client.
          </p>
        </div>

        <div className="mt-16 space-y-10">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-12"
            >
              <QuoteIcon className="absolute -top-5 left-8 size-12 text-cyan-400/30" />

              <blockquote className="font-display text-xl italic leading-relaxed text-slate-100 sm:text-2xl">
                &ldquo;{q.en}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-cyan-300">
                {q.attributionEn}
              </figcaption>

              <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <p className="font-urdu text-2xl leading-loose text-slate-100 sm:text-3xl">
                &ldquo;{q.ur}&rdquo;
              </p>
              <p className="font-urdu mt-3 text-base text-cyan-300">
                {q.attributionUr}
              </p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
