import { cn } from "@/lib/utils";

/**
 * Brand-graded image. Desaturates the photo and overlays the brand navy via a
 * `color` blend, so any stock photo reads as part of one cohesive branded
 * shoot rather than a random library image. A soft ocean highlight adds depth.
 */
export function DuotoneImage({
  src,
  alt,
  className,
  imgClassName,
  eager = false,
  intensity = "default",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  intensity?: "default" | "strong";
}) {
  return (
    <div className={cn("relative overflow-hidden bg-brand-deep", className)}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className={cn(
          "size-full object-cover",
          intensity === "strong"
            ? "grayscale contrast-[1.05]"
            : "grayscale-[0.65] contrast-[1.03]",
          imgClassName,
        )}
      />
      {/* Navy colour grade */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-brand mix-blend-color",
          intensity === "strong" ? "opacity-80" : "opacity-55",
        )}
      />
      {/* Ocean highlight for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-deep/30 via-transparent to-ocean/15 mix-blend-overlay" />
    </div>
  );
}
