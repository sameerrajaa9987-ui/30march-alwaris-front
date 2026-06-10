import { Link } from "react-router-dom";
import { Anchor, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, NAV_LINKS, OFFICE, SERVICES } from "../content";

export function LandingFooter() {
  return (
    <footer className="bg-brand-deep text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-ocean-light to-ocean-dark">
                <Anchor className="size-5 text-brand" />
              </span>
              <span className="font-display text-lg font-semibold">
                {BRAND.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {BRAND.shortDescription} Every shipment entrusted to us is
              honoured with dedication and accountability.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-slate-400 transition-colors hover:text-ocean-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to={BRAND.portalPath}
                  className="text-slate-400 transition-colors hover:text-ocean-light"
                >
                  Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-slate-400 transition-colors hover:text-ocean-light"
                  >
                    {s.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5 text-slate-400">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ocean-light" />
                <span>{OFFICE.addressLines.join(", ")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-ocean-light" />
                <a
                  href={`tel:${OFFICE.phone.replace(/\s/g, "")}`}
                  className="text-slate-400 hover:text-ocean-light"
                >
                  {OFFICE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
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
            &copy; {YEAR} {BRAND.legalName}. All rights reserved.
          </p>
          <p className="font-urdu text-base text-slate-400">
            اخلاص &middot; دیانت &middot; خدمت
          </p>
        </div>
      </div>
    </footer>
  );
}

// Static build year — avoids per-render Date and keeps output deterministic.
const YEAR = 2026;
