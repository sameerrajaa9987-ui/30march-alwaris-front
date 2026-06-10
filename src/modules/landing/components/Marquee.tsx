import { Ship } from "lucide-react";
import { MARQUEE_ITEMS } from "../content";

/**
 * Kinetic capability ticker — a high-contrast strip that scrolls trade lanes
 * and services. Pauses on hover; respects reduced-motion.
 */
export function Marquee() {
  // Render the list twice so the -50% translate loops seamlessly.
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee-track overflow-hidden border-y border-brand-light/40 bg-brand-deep py-5">
      <div className="marquee">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 whitespace-nowrap px-7"
            aria-hidden={i >= MARQUEE_ITEMS.length}
          >
            <Ship className="size-4 text-ocean" />
            <span className="font-display text-lg font-medium tracking-tight text-slate-200">
              {item}
            </span>
            <span className="ml-3 size-1.5 rounded-full bg-ocean/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
