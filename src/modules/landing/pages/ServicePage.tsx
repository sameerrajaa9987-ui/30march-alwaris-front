import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEATURE_ICONS, SERVICE_ICONS, SERVICE_META } from "../content";
import { LanguageProvider } from "../i18n/LanguageContext";
import { useLanguage, useT } from "../i18n/language";
import { LandingNav } from "../components/LandingNav";
import { LandingFooter } from "../components/LandingFooter";
import { Reveal } from "../components/Reveal";

function ServiceShell({ index }: { index: number }) {
  const t = useT();
  const { dir } = useLanguage();
  const service = t.services.items[index];
  const meta = SERVICE_META[index];
  const Icon = SERVICE_ICONS[index];

  // Public site is always light mode; also start each service page at the top.
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    root.classList.remove("dark");
    window.scrollTo(0, 0);
    return () => {
      if (hadDark) root.classList.add("dark");
    };
  }, [index]);

  const others = SERVICE_META.map((m, i) => ({ ...m, i })).filter(
    (m) => m.i !== index,
  );

  return (
    <div
      dir={dir}
      className={cn(
        "landing-scroll min-h-screen bg-background",
        dir === "rtl" && "lang-rtl",
      )}
    >
      <LandingNav hrefPrefix="/" />

      <main>
        {/* Hero band */}
        <section className="relative isolate overflow-hidden bg-brand pt-32 pb-16 lg:pt-40 lg:pb-20">
          <img
            src={meta.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-brand/85" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-deep via-brand-deep/40 to-brand-deep/20" />

          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="kicker flex flex-wrap items-center gap-2 text-[11px] uppercase text-slate-300"
            >
              <Link to="/" className="hover:text-ocean-light">
                {t.serviceDetail.home}
              </Link>
              <ChevronRight data-flip-rtl className="size-3 text-slate-500" />
              <a href="/#services" className="hover:text-ocean-light">
                {t.serviceDetail.services}
              </a>
              <ChevronRight data-flip-rtl className="size-3 text-slate-500" />
              <span className="text-ocean-light">{service.title}</span>
            </nav>

            <div className="mt-8 flex items-start gap-5">
              <span className="hidden size-16 shrink-0 place-items-center rounded-2xl bg-white/10 text-ocean-light ring-1 ring-white/15 sm:grid">
                <Icon className="size-8" />
              </span>
              <div>
                <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
                  {service.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ocean px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition-colors hover:bg-ocean-light"
              >
                {t.nav.getQuote}
                <ArrowRight
                  data-flip-rtl
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="/#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t.serviceDetail.viewAll}
              </a>
            </div>
          </div>
        </section>

        {/* Overview + highlights */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <Reveal>
              <span className="kicker flex items-center gap-3 text-[11px] font-semibold uppercase text-ocean-dark">
                <span>{t.serviceDetail.overview}</span>
                <span className="h-px w-8 bg-ocean-dark/40" />
              </span>
              <h2 className="font-display mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl">
                {t.serviceDetail.whatWeHandle}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <ul className="mt-8 space-y-4">
                {service.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ocean/15 text-ocean-dark">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] leading-relaxed text-foreground">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="lg:pt-10">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/20">
                <img
                  src={meta.image}
                  alt={service.title}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why work with us */}
        <section className="bg-secondary/40 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {t.serviceDetail.whyTitle}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {t.why.features.map((f, i) => {
                const FIcon = FEATURE_ICONS[i];
                return (
                  <Reveal
                    key={f.title}
                    delay={(i % 3) * 80}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand to-ocean text-white shadow">
                      <FIcon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-foreground">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              {t.serviceDetail.otherServices}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => {
                const OIcon = SERVICE_ICONS[o.i];
                return (
                  <Link
                    key={o.slug}
                    to={`/services/${o.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-ocean/50 hover:bg-secondary/50"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-ocean-dark transition-colors group-hover:bg-brand group-hover:text-ocean-light">
                      <OIcon className="size-5" />
                    </span>
                    <span className="text-sm font-medium leading-tight text-foreground">
                      {t.services.items[o.i].title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-start">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {t.serviceDetail.ctaTitle}
              </h2>
              <p className="mt-3 max-w-xl text-slate-300">
                {t.serviceDetail.ctaText}
              </p>
            </div>
            <a
              href="/#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ocean px-8 py-4 text-sm font-semibold text-brand shadow-xl transition-colors hover:bg-ocean-light"
            >
              {t.nav.getQuote}
              <ArrowRight
                data-flip-rtl
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

export function ServicePage() {
  const { slug } = useParams();
  const index = SERVICE_META.findIndex((m) => m.slug === slug);

  // Unknown slug → back to the services section of the landing page.
  if (index === -1) return <Navigate to="/#services" replace />;

  return (
    <LanguageProvider>
      <ServiceShell index={index} />
    </LanguageProvider>
  );
}

export default ServicePage;
