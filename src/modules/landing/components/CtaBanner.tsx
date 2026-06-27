import { ArrowRight, Clock, Anchor } from "lucide-react";
import { IMAGES } from "../content";
import { useT } from "../i18n/language";

export function CtaBanner() {
  const t = useT();

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0">
        <img
          src={IMAGES.cta}
          alt="Cargo trucks and container ship at sunset"
          className="size-full object-cover grayscale-[0.55] contrast-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand opacity-40 mix-blend-color" />
        <div className="absolute inset-0 bg-brand/85" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-start">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center justify-center gap-2 text-ocean-light lg:justify-start">
            <Clock className="size-4" />
            <span className="kicker text-xs font-semibold uppercase">
              {t.cta.kicker}
            </span>
          </div>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mt-4 text-slate-300">{t.cta.subtitle}</p>
        </div>
        <a
          href="#contact"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ocean px-8 py-4 text-sm font-semibold text-brand shadow-xl shadow-brand/40 transition-transform hover:scale-[1.03]"
        >
          <Anchor className="size-4" />
          {t.cta.button}
          <ArrowRight
            data-flip-rtl
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
}
