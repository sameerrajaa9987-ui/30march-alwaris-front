import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "../i18n/language";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function FaqSection() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeader
          index="06"
          kicker={t.faq.kicker}
          title={t.faq.title}
          align="center"
        />

        <div className="mt-12 space-y-3">
          {t.faq.items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 60}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                  >
                    <span className="text-sm font-semibold text-foreground sm:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-ocean-dark transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
