import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEADERSHIP, OFFICE, OFFICES } from "../content";
import { useT } from "../i18n/language";
import { SectionHeader } from "./SectionHeader";

export function ContactSection() {
  const t = useT();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    // Front-end only: hand off to the user's mail client.
    const subject = encodeURIComponent(`Quote enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${OFFICE.email}?subject=${subject}&body=${body}`;

    toast.success(t.contact.contactToast);
    form.reset();
    setSubmitting(false);
  };

  return (
    <section id="contact" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          index="07"
          kicker={t.contact.kicker}
          title={t.contact.title}
          description={t.contact.description}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: office + form */}
          <div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <h3 className="text-lg font-semibold text-foreground">
                {t.contact.offices}
              </h3>

              <div className="mt-5 divide-y divide-border">
                {OFFICES.map((office) => (
                  <div
                    key={office.region}
                    className="py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="kicker text-[11px] font-semibold uppercase text-ocean-dark">
                        {office.region}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                          office.primary
                            ? "bg-ocean/15 text-ocean-dark"
                            : "bg-secondary text-muted-foreground",
                        )}
                      >
                        {office.primary
                          ? t.contact.headOffice
                          : t.contact.branch}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-foreground">
                      {office.company}
                    </p>

                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex gap-3 text-muted-foreground">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-ocean-dark" />
                        <span>{office.addressLines.join(", ")}</span>
                      </li>
                      {office.phone && (
                        <li className="flex items-center gap-3" dir="ltr">
                          <Phone className="size-4 shrink-0 text-ocean-dark" />
                          <a
                            href={`tel:${office.phone.replace(/\s/g, "")}`}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {office.phone}
                          </a>
                        </li>
                      )}
                      {office.email && (
                        <li className="flex items-center gap-3" dir="ltr">
                          <Mail className="size-4 shrink-0 text-ocean-dark" />
                          <a
                            href={`mailto:${office.email}`}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {office.email}
                          </a>
                        </li>
                      )}
                    </ul>

                    <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                      <iframe
                        title={`${office.region} office location`}
                        className="h-48 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(
                          office.mapsQuery,
                        )}&output=embed`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 rounded-3xl border border-border bg-card p-7"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {t.contact.sendEnquiry}
              </h3>
              <div className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    required
                    placeholder={t.contact.namePh}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t.contact.emailPh}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                  />
                </div>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={t.contact.messagePh}
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] disabled:opacity-60"
                >
                  <Send className="size-4" />
                  {t.contact.sendBtn}
                </button>
              </div>
            </form>
          </div>

          {/* Right: leadership */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {t.contact.ourTeam}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.contact.ourTeamSub}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {LEADERSHIP.map((person) => (
                <div
                  key={person.name}
                  className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-ocean/40"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-ocean-dark">
                      <User2 className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wide text-ocean-dark">
                        {t.contact.roles[person.roleKey]}
                      </div>
                      <div className="mt-0.5 font-medium leading-tight text-foreground">
                        {person.name}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm" dir="ltr">
                    {person.mobile ? (
                      <a
                        href={`tel:${person.mobile.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Phone className="size-4 text-ocean-dark" />
                        {person.mobile}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-muted-foreground/60">
                        <Phone className="size-4" />
                        {t.contact.onRequest}
                      </span>
                    )}
                    {person.email ? (
                      <a
                        href={`mailto:${person.email}`}
                        className="flex items-center gap-2 break-all text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="size-4 text-ocean-dark" />
                        {person.email}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-muted-foreground/60">
                        <Mail className="size-4" />
                        {t.contact.onRequest}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
