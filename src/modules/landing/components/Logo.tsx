import { cn } from "@/lib/utils";

/**
 * Authored brand mark — an abstract "cargo in motion" monogram: stacked
 * container bars with the top bar extending into a forward arrow (movement
 * across borders). Custom SVG, not a stock icon, so the identity reads bespoke.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid place-items-center rounded-xl bg-brand ring-1 ring-white/10",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="size-2/3"
        aria-hidden="true"
      >
        {/* top bar → arrow (motion) */}
        <path
          d="M6 10h14l4 4-4 4"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ocean-light"
        />
        {/* stacked cargo bars */}
        <path
          d="M6 16h10"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="text-white/85"
        />
        <path
          d="M6 22h16"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="text-white/55"
        />
      </svg>
    </span>
  );
}
