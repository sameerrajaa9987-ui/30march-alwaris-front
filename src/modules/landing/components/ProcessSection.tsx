import { PROCESS_STEPS } from "../content";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function ProcessSection() {
  return (
    <section className="bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          index="04"
          kicker="How It Works"
          title="From enquiry to delivery"
          description="A clear, transparent process — so you always know exactly where your cargo stands."
        />

        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line on large screens */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-ocean/30 to-transparent lg:block" />

          {PROCESS_STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={s.step}
                delay={i * 100}
                className="relative text-center"
              >
                <div className="relative mx-auto grid size-14 place-items-center rounded-2xl bg-card text-ocean-dark shadow-lg ring-1 ring-border">
                  <Icon className="size-7" />
                  <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-gradient-to-br from-ocean-light to-ocean text-[11px] font-bold text-brand">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
