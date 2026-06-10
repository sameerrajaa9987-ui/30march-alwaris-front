import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send, User2 } from "lucide-react";
import { LEADERSHIP, OFFICE } from "../content";

export function ContactSection() {
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

    toast.success("Thank you! Opening your email to send the enquiry.");
    form.reset();
    setSubmitting(false);
  };

  return (
    <section id="contact" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">
            Get In Touch
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Let&rsquo;s Move Forward Together
          </h2>
          <p className="mt-4 text-muted-foreground">
            Reach out to our team for quotes, partnerships or any logistics
            requirement. We respond with clarity and care.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: office + form */}
          <div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <h3 className="text-lg font-semibold text-foreground">
                Head Office
              </h3>
              <p className="mt-1 text-sm font-medium text-cyan-700">
                {OFFICE.agentName}
              </p>

              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3 text-muted-foreground">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-cyan-600" />
                  <span>{OFFICE.addressLines.join(", ")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-5 shrink-0 text-cyan-600" />
                  <a
                    href={`tel:${OFFICE.phone.replace(/\s/g, "")}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {OFFICE.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-5 shrink-0 text-cyan-600" />
                  <a
                    href={`mailto:${OFFICE.email}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {OFFICE.email}
                  </a>
                </li>
              </ul>

              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Office location"
                  className="h-56 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    OFFICE.mapsQuery,
                  )}&output=embed`}
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 rounded-3xl border border-border bg-card p-7"
            >
              <h3 className="text-lg font-semibold text-foreground">
                Send an Enquiry
              </h3>
              <div className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your shipment or requirement..."
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0b1f3a] to-cyan-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] disabled:opacity-60"
                >
                  <Send className="size-4" />
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>

          {/* Right: leadership */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">Our Team</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Speak directly with the people who handle your shipments.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {LEADERSHIP.map((person) => (
                <div
                  key={person.name}
                  className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-cyan-500/40"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-cyan-700">
                      <User2 className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                        {person.role}
                      </div>
                      <div className="mt-0.5 font-medium leading-tight text-foreground">
                        {person.name}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    {person.mobile ? (
                      <a
                        href={`tel:${person.mobile.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Phone className="size-4 text-cyan-600" />
                        {person.mobile}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-muted-foreground/60">
                        <Phone className="size-4" />
                        On request
                      </span>
                    )}
                    {person.email ? (
                      <a
                        href={`mailto:${person.email}`}
                        className="flex items-center gap-2 break-all text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="size-4 text-cyan-600" />
                        {person.email}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-muted-foreground/60">
                        <Mail className="size-4" />
                        On request
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
