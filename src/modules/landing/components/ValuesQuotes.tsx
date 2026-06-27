import { Quote as QuoteIcon } from "lucide-react";
import { QUOTES } from "../content";
import { useT } from "../i18n/language";
import { SectionHeader } from "./SectionHeader";

export function ValuesQuotes() {
  const t = useT();
  return (
    <section
      id="values"
      className="relative overflow-hidden bg-brand py-24 lg:py-32"
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
      <div className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-ocean/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeader
          index="05"
          kicker={t.values.kicker}
          title={t.values.title}
          description={t.values.description}
          align="center"
          tone="light"
        />

        <div className="mt-16 space-y-10">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              dir="ltr"
              className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-start backdrop-blur-sm sm:p-12"
            >
              <QuoteIcon className="absolute -top-5 start-8 size-12 text-ocean-light/30" />

              <blockquote className="font-quote text-xl italic leading-relaxed text-slate-100 sm:text-2xl">
                &ldquo;{q.en}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-ocean-light">
                {q.attributionEn}
              </figcaption>

              <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <p className="font-urdu text-2xl leading-loose text-slate-100 sm:text-3xl">
                &ldquo;{q.ur}&rdquo;
              </p>
              <p className="font-urdu mt-3 text-base text-ocean-light">
                {q.attributionUr}
              </p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
