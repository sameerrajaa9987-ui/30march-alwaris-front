import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../content";
import { Reveal } from "./Reveal";

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">
            What We Offer
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            End-to-End Logistics Services
          </h2>
          <p className="mt-4 text-muted-foreground">
            From containers to project cargo and warehousing, every solution is
            delivered with care, responsibility and professionalism.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal
                key={service.title}
                as="article"
                delay={(i % 3) * 90}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="absolute right-0 top-0 size-24 translate-x-8 -translate-y-8 rounded-full bg-cyan-500/5 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#0b1f3a] to-cyan-700 text-white shadow-lg shadow-cyan-900/20">
                  <Icon className="size-7" />
                </div>

                <h3 className="relative mt-6 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition-colors group-hover:text-cyan-600"
                >
                  Enquire now
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
