import { IMAGES } from "../content";

const ALTS = [
  "Container vessel at sea",
  "Warehouse and storage operations",
  "Multimodal transport at sunset",
  "Cargo ship and road freight",
  "Global cargo shipping",
  "Worldwide logistics network",
];

/**
 * Full-bleed operations gallery of the company's own photography. Shown in full
 * colour (these are showcase images) with a subtle navy vignette and hover zoom
 * to keep them cohesive with the brand.
 */
export function GalleryStrip() {
  return (
    <section className="bg-brand-deep">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {IMAGES.gallery.map((src, i) => (
          <div
            key={src}
            className="group relative aspect-[4/3] overflow-hidden"
          >
            <img
              src={src}
              alt={ALTS[i] ?? "Al Waris logistics operations"}
              loading="lazy"
              className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            {/* subtle navy vignette for cohesion */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-40" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>
        ))}
      </div>
    </section>
  );
}
