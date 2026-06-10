import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEATURES } from "../content";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

// Bento spans (lg) — deliberately varied tile sizes, not a uniform grid.
const SPANS = [
  "lg:col-span-2 lg:row-span-2", // featured (dark)
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function WhyChooseUs() {
  const [featured, ...rest] = FEATURES;
  const FeaturedIcon = featured.icon;

  return (
    <section className="bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          index="02"
          kicker="Why Choose Us"
          title="Built on trust, engineered for reliability"
          description="The strengths that make every shipment dependable — from first quote to final delivery."
        />

        <div className="mt-14 grid auto-rows-[minmax(170px,auto)] grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Featured dark tile */}
          <Reveal
            className={cn(
              "group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-brand p-8 text-white",
              SPANS[0],
            )}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-ocean/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
            <div className="relative grid size-14 place-items-center rounded-2xl bg-white/10 text-ocean-light ring-1 ring-white/15">
              <FeaturedIcon className="size-7" />
            </div>
            <div className="relative">
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
                {featured.description}
              </p>
            </div>
          </Reveal>

          {/* Remaining tiles */}
          {rest.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal
                key={f.title}
                delay={i * 70}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-7 transition-colors hover:border-ocean/40",
                  SPANS[i + 1],
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-ocean-dark text-white shadow-lg">
                    <Icon className="size-6" />
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ocean" />
                </div>
                <div className="mt-6">
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
