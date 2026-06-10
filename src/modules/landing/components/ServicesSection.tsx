import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../content";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          index="03"
          kicker="What We Offer"
          title="End-to-end logistics, under one roof"
          description="From containers to project cargo and warehousing — every solution delivered with care, responsibility and professionalism."
        />

        {/* Editorial numbered list — magazine index, not a card grid */}
        <div className="mt-14 border-t border-border">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal
                key={service.title}
                as="article"
                delay={(i % 3) * 60}
              >
                <a
                  href="#contact"
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-border py-7 transition-colors hover:bg-secondary/40 sm:grid-cols-[5rem_1.2fr_2fr_auto] sm:gap-8 sm:px-4"
                >
                  <span className="kicker text-sm font-semibold text-ocean-dark sm:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-ocean-dark transition-colors group-hover:bg-brand group-hover:text-ocean-light">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {service.title}
                    </h3>
                  </div>

                  <p className="hidden text-sm leading-relaxed text-muted-foreground sm:block">
                    {service.description}
                  </p>

                  <span className="grid size-10 place-items-center justify-self-end rounded-full border border-border text-muted-foreground transition-all group-hover:border-ocean group-hover:bg-ocean group-hover:text-brand">
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
