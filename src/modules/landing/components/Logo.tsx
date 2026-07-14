import { cn } from "@/lib/utils";

/**
 * Al Waris brand mark — the client's official logo, shown on a white rounded
 * tile so it reads cleanly on the navy navbar and dark footer.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-xl bg-white",
        className,
      )}
    >
      <img
        src="/alwaris-logo.png"
        alt="Al Waris Shipping Lines LLC"
        className="size-full object-contain p-1"
      />
    </span>
  );
}
