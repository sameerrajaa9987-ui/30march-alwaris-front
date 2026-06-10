import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "../hooks/useReveal";

/**
 * Wraps children in a scroll-triggered fade/slide reveal.
 * `delay` (ms) lets you stagger items in a grid.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const { ref, visible } = useReveal<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className: cn("reveal", visible && "is-visible", className),
      style: { transitionDelay: visible ? `${delay}ms` : "0ms" },
    },
    children,
  );
}
