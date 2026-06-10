import { ShieldCheck, Eye, Handshake } from "lucide-react";
import { ABOUT_PARAGRAPHS, IMAGES, VALUE_PILLARS } from "../content";

const PILLAR_ICONS = [ShieldCheck, Eye, Handshake];

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/20">
              <img
                src={IMAGES.about}
                alt="Logistics warehouse operations"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-border bg-card p-5 shadow-xl sm:block lg:-right-6">
              <div className="font-display text-3xl font-semibold text-primary">
                Trust
              </div>
              <div className="text-sm text-muted-foreground">
                at the heart of every shipment
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">
              Who We Are
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              A Partner You Can Rely On
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              {ABOUT_PARAGRAPHS.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Value pillars */}
        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {VALUE_PILLARS.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <div
                key={pillar.title}
                className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-900/5"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-[#0b1f3a] to-cyan-700 text-white shadow-lg">
                  <Icon className="size-6" />
                </div>
                <div className="mt-5 flex items-baseline gap-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <span className="font-urdu text-lg text-cyan-700">
                    {pillar.titleUr}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
