import { FEATURES } from "../content";
import { Reveal } from "./Reveal";

export function WhyChooseUs() {
  return (
    <section className="bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">
            Why Choose Us
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Built on Trust, Engineered for Reliability
          </h2>
          <p className="mt-4 text-muted-foreground">
            The strengths that make every shipment with us dependable, from
            first quote to final delivery.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal
                key={f.title}
                delay={(i % 3) * 90}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-900/5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0b1f3a] to-cyan-700 text-white shadow-lg">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
