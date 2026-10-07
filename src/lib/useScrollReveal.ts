import { useEffect } from "react";

/**
 * Aktiverer de scroll-animationer, der er markeret med data-reveal.
 * Kaldes igen ved rute-skift, saa nye sektioner ogsaa bliver observeret.
 */
export function useScrollReveal(key: string) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (nodes.length === 0) return;

    const revealAll = () => {
      nodes.forEach((node) => node.setAttribute("data-revealed", "true"));
    };

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    nodes.forEach((node) => observer.observe(node));

    // Sikkerhedsnet: hvis noget gaar galt, maa indholdet aldrig blive skjult.
    const safety = window.setTimeout(revealAll, 2500);

    return () => {
      window.clearTimeout(safety);
      observer.disconnect();
    };
  }, [key]);
}
