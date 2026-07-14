import { IMAGES, PILLAR_ICONS } from "../content";
import { useT } from "../i18n/language";
import { DuotoneImage } from "./DuotoneImage";

export function AboutSection() {
  const t = useT();

  return (
    <section id="about" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <DuotoneImage
              src={IMAGES.about}
              alt="Logistics warehouse operations"
              className="aspect-[4/5] w-full rounded-3xl shadow-2xl shadow-slate-900/20"
            />
            <div className="absolute -bottom-6 -end-2 hidden rounded-2xl border border-border bg-card p-5 shadow-xl sm:block lg:-end-6">
              <div className="font-display text-3xl font-semibold text-primary">
                {t.about.badge}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.about.badgeSub}
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="kicker flex items-center gap-3 text-[11px] font-semibold uppercase text-ocean-dark">
              <span>01</span>
              <span className="h-px w-8 bg-ocean-dark/40" />
              <span>{t.about.kicker}</span>
            </span>
            <h2 className="font-display mt-5 text-3xl font-semibold leading-[1.05] text-foreground sm:text-4xl lg:text-[2.75rem]">
              {t.about.title}
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              {t.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Value pillars */}
        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {t.about.pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <div
                key={pillar.title}
                className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-ocean/40 hover:shadow-xl hover:shadow-brand/5"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand to-ocean text-white shadow-lg">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {pillar.title}
                </h3>
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
