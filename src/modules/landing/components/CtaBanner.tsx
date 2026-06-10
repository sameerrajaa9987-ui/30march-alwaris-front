import { ArrowRight, Clock, Anchor } from "lucide-react";
import { IMAGES } from "../content";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0">
        <img
          src={IMAGES.cta}
          alt="Cargo trucks and container ship at sunset"
          className="size-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0b1f3a]/85" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center justify-center gap-2 text-cyan-300 lg:justify-start">
            <Clock className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              Time, precision &amp; reliability
            </span>
          </div>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Ready to move your cargo with a partner you can trust?
          </h2>
          <p className="mt-4 text-slate-300">
            Let&rsquo;s connect your business across borders. Our team is ready
            to handle every consignment with dedication and accountability.
          </p>
        </div>
        <a
          href="#contact"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 px-8 py-4 text-sm font-semibold text-[#0b1f3a] shadow-xl shadow-cyan-900/40 transition-transform hover:scale-[1.03]"
        >
          <Anchor className="size-4" />
          Get Started Today
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
