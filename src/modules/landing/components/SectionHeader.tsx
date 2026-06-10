import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * Editorial section header — left-aligned by default with a monospace index
 * kicker ("01 — WHO WE ARE") and an oversized heading. Deliberately breaks the
 * centered "eyebrow + heading + paragraph" template.
 */
export function SectionHeader({
  index,
  kicker,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light"; // text colour on light vs dark backgrounds
  className?: string;
}) {
  const onDark = tone === "light";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <span
          className={cn(
            "kicker flex items-center gap-3 text-[11px] font-semibold uppercase",
            align === "center" && "justify-center",
            onDark ? "text-ocean-light" : "text-ocean-dark",
          )}
        >
          <span>{index}</span>
          <span
            className={cn(
              "h-px w-8",
              onDark ? "bg-ocean-light/40" : "bg-ocean-dark/40",
            )}
          />
          <span>{kicker}</span>
        </span>
        <h2
          className={cn(
            "font-display mt-5 text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-[2.75rem]",
            onDark ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
      </div>

      {description && (
        <p
          className={cn(
            "max-w-md text-[15px] leading-relaxed",
            align === "center" && "mx-auto",
            onDark ? "text-slate-300" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
