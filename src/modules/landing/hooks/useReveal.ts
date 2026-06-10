import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  if (typeof IntersectionObserver === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Adds a scroll-triggered reveal. Returns a ref to attach to the element and
 * a boolean that flips to true the first time the element scrolls into view.
 * Respects prefers-reduced-motion (starts revealed, no animation).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  // Reduced-motion / SSR start already revealed — set as initial state so the
  // effect never has to call setState synchronously.
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, options]);

  return { ref, visible };
}
