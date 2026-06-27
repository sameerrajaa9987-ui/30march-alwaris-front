import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { BRAND, NAV_ITEMS, OFFICE } from "../content";
import { useT } from "../i18n/language";
import { LogoMark } from "./Logo";

// Static build year — avoids per-render Date and keeps output deterministic.
const YEAR = 2026;

export function LandingFooter() {
  const t = useT();

  return (
    <footer className="bg-brand-deep text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <LogoMark className="size-10" />
              <span className="font-display text-lg font-semibold">
                {BRAND.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {t.footer.blurb}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="kicker text-sm font-semibold uppercase text-white">
              {t.footer.company}
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_ITEMS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-slate-400 transition-colors hover:text-ocean-light"
                  >
                    {t.nav[l.key]}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to={BRAND.portalPath}
                  className="text-slate-400 transition-colors hover:text-ocean-light"
                >
                  {t.nav.portalLogin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="kicker text-sm font-semibold uppercase text-white">
              {t.footer.services}
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {t.services.items.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-slate-400 transition-colors hover:text-ocean-light"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="kicker text-sm font-semibold uppercase text-white">
              {t.footer.contact}
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5 text-slate-400">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ocean-light" />
                <span>{OFFICE.addressLines.join(", ")}</span>
              </li>
              <li className="flex items-center gap-2.5" dir="ltr">
                <Phone className="size-4 shrink-0 text-ocean-light" />
                <a
                  href={`tel:${OFFICE.phone.replace(/\s/g, "")}`}
                  className="text-slate-400 hover:text-ocean-light"
                >
                  {OFFICE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5" dir="ltr">
                <Mail className="size-4 shrink-0 text-ocean-light" />
                <a
                  href={`mailto:${OFFICE.email}`}
                  className="text-slate-400 hover:text-ocean-light"
                >
                  {OFFICE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row">
          <p>
            &copy; {YEAR} {BRAND.legalName}. {t.footer.rights}
          </p>
          <p className="font-urdu text-base text-slate-400">
            اخلاص &middot; دیانت &middot; خدمت
          </p>
        </div>
      </div>
    </footer>
  );
}
